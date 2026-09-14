import * as projectApi from '../../project/api/project.api';
import keywordApi from '../api/keywordApi';

/**
 * Chuẩn hóa pagination từ nhiều dạng response khác nhau của backend.
 *
 * @param {Object} pagination - Pagination raw từ API.
 * @param {number} fallbackLimit - Limit fallback nếu API không trả.
 * @returns {Object} Pagination đã chuẩn hóa.
 */
export function normalizePagination(pagination, fallbackLimit = 20) {
  const page = Number(pagination?.page || 1);
  const limit = Number(pagination?.limit || fallbackLimit);
  const total = Number(pagination?.total || 0);
  const totalPages = Number(pagination?.total_pages || pagination?.totalPages || Math.max(1, Math.ceil(total / limit)) || 1);

  return { page, limit, total, total_pages: totalPages };
}

/**
 * Lấy mảng items từ các response shape phổ biến.
 *
 * @param {*} payload - Payload data từ API.
 * @returns {Array} Danh sách item đã tách ra.
 */
function extractItems(payload) {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.items)) return payload.items;
  if (Array.isArray(payload?.keywords)) return payload.keywords;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.articles)) return payload.articles;
  return [];
}

/**
 * Chuẩn hóa keyword item để UI dùng field nhất quán.
 *
 * @param {Object} item - Keyword item từ API.
 * @returns {Object} Keyword item đã chuẩn hóa.
 */
export function normalizeKeyword(item) {
  const id = item.keyword_id || item.id || item.keywordId;
  const name = item.display_name || item.keyword || item.name || item.term || 'Unnamed keyword';
  const articleCount = item.article_count ?? item.count ?? item.total_articles ?? item.totalArticles ?? 0;

  return {
    ...item,
    keyword_id: id,
    id,
    display_name: name,
    article_count: Number(articleCount || 0),
  };
}

/**
 * Chuẩn hóa response danh sách keywords.
 *
 * @param {Object} response - Axios response.
 * @param {number} fallbackLimit - Limit fallback.
 * @returns {{items: Array, pagination: Object}}
 */
export function normalizeKeywordListResponse(response, fallbackLimit = 20) {
  const payload = response?.data?.data ?? response?.data ?? response;
  const items = extractItems(payload).map(normalizeKeyword);

  return {
    items,
    pagination: normalizePagination(payload?.pagination, fallbackLimit),
  };
}

/**
 * Chuẩn hóa response chi tiết keyword.
 *
 * @param {Object} response - Axios response.
 * @returns {Object|null} Keyword detail đã chuẩn hóa.
 */
export function normalizeKeywordDetailResponse(response) {
  const payload = response?.data?.data ?? response?.data ?? response;
  if (!payload || Array.isArray(payload)) return null;
  return normalizeKeyword(payload);
}

/**
 * Chuẩn hóa article item để UI có thể dùng article_id nhất quán.
 *
 * @param {Object} item - Article item từ API.
 * @returns {Object} Article item đã chuẩn hóa.
 */
export function normalizeKeywordArticle(item) {
  const articleId = item.article_id || item.id || item.articleId;
  const journal = item.journal || {};

  return {
    ...item,
    article_id: articleId,
    id: articleId,
    journal_name: item.journal_name || journal.display_name || journal.name,
    citations_count: item.citations_count ?? item.citation_count ?? item.citations ?? 0,
  };
}

/**
 * Chuẩn hóa response bài báo liên quan keyword.
 *
 * @param {Object} response - Axios response.
 * @param {number} fallbackLimit - Limit fallback.
 * @returns {{items: Array, pagination: Object}}
 */
export function normalizeKeywordArticlesResponse(response, fallbackLimit = 10) {
  const payload = response?.data?.data ?? response?.data ?? response;
  const items = extractItems(payload).map(normalizeKeywordArticle);

  return {
    items,
    pagination: normalizePagination(payload?.pagination, fallbackLimit),
  };
}






/**
 * Service xử lý logic Keyword Tracking (Trending, Watch List, Articles)
 */
const keywordService = {
  /**
   * Lấy danh sách keyword trending của dự án
   * @param {number|string} projectId - ID dự án
   * @param {number} limit - Giới hạn số lượng
   * @param {string} sortBy - Tiêu chí sắp xếp
   * @returns {Promise<Array>} Danh sách keyword
   */
  async getTrendingKeywords(projectId, limit = 20, sortBy = 'count') {
    const res = await projectApi.getTrendingKeywordsApi(projectId, limit, sortBy);
    return res.data?.data?.keywords || res.data?.keywords || [];
  },

  /**
   * Lấy các bài báo liên quan đến các keyword đang theo dõi
   * @param {number|string} projectId - ID dự án
   * @returns {Promise<Array>} Danh sách bài báo
   */
  async getWatchedKeywordArticles(projectId) {
    const firstResponse = await projectApi.getWatchedKeywordArticlesApi(projectId, 1, 50);
    const firstItems = firstResponse.data?.data || firstResponse.data?.articles || [];
    const totalPages = Number(firstResponse.data?.pagination?.total_pages || 1);

    if (totalPages <= 1) return firstItems;

    const remainingResponses = await Promise.all(
      Array.from({ length: totalPages - 1 }, (_, index) =>
        projectApi.getWatchedKeywordArticlesApi(projectId, index + 2, 50)),
    );

    return remainingResponses.reduce(
      (items, response) => items.concat(response.data?.data || response.data?.articles || []),
      firstItems,
    );
  },

  /**
   * Theo dõi danh sách keyword mới
   * @param {number|string} projectId - ID dự án
   * @param {Array<string>} keywordsList - Danh sách keyword
   * @returns {Promise<Object>} Kết quả trả về
   */
  async watchKeywords(projectId, keywordsList) {
    const res = await projectApi.watchKeywordsApi(projectId, keywordsList);
    return res.data;
  },

  /**
   * Tìm keyword hiện có theo tên để lấy ID mà API watch-list yêu cầu.
   */
  async findKeywordByName(keywordName) {
    const normalizedName = keywordName.trim().toLocaleLowerCase();
    const response = await keywordApi.getKeywords({
      keyword: keywordName.trim(),
      page: 1,
      limit: 20,
    });
    const { items } = normalizeKeywordListResponse(response, 20);

    return items.find(
      (item) => item.display_name?.trim().toLocaleLowerCase() === normalizedName,
    ) || null;
  },

  /**
   * Cập nhật toàn bộ danh sách keyword đang theo dõi
   * @param {number|string} projectId - ID dự án
   * @param {Array<string>} keywordsList - Danh sách keyword
   * @returns {Promise<Object>} Kết quả trả về
   */
  async updateWatchedKeywords(projectId, keywordsList) {
    const res = await projectApi.updateWatchedKeywordsApi(projectId, keywordsList);
    return res.data;
  },

  /**
   * Xóa một keyword khỏi danh sách theo dõi
   * @param {number|string} projectId - ID dự án
   * @param {number|string} keywordId - ID keyword
   * @returns {Promise<Object>} Kết quả trả về
   */
  async unwatchKeyword(projectId, keywordId) {
    const res = await projectApi.unwatchKeywordApi(projectId, keywordId);
    return res.data;
  }
};

export default keywordService;

