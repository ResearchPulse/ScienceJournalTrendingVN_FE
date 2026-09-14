import React from 'react';
import { useTranslation } from 'react-i18next';
import Button from '../../../shared/ui/components/Button/Button';

/**
 * Thẻ form thông tin tài khoản: các trường chỉnh sửa, nút lưu và danger zone.
 */
export default function ProfileFormCard({
  formData = {},
  setField = () => {},
  onSave = () => {},
  isSaving = false,
  onRequestDelete = () => {},
  onLogout = () => {},
}) {
  const { i18n } = useTranslation();
  const isVi = i18n.resolvedLanguage?.startsWith('vi');

  const cardTitle = isVi ? 'Thông tin tài khoản' : 'Account information';
  const lastNameLabel = isVi ? 'HỌ' : 'LAST NAME';
  const firstNameLabel = isVi ? 'TÊN' : 'FIRST NAME';
  const emailLabel = isVi ? 'ĐỊA CHỈ EMAIL' : 'EMAIL ADDRESS';
  const roleLabel = isVi ? 'VAI TRÒ / CHỨC DANH' : 'ROLE / TITLE';
  const researcherText = isVi ? 'Nhà nghiên cứu' : 'Researcher';
  const genderLabel = isVi ? 'GIỚI TÍNH' : 'GENDER';
  const maleOption = isVi ? 'Nam' : 'Male';
  const femaleOption = isVi ? 'Nữ' : 'Female';
  const dobLabel = isVi ? 'NGÀY SINH' : 'DATE OF BIRTH';
  const logoutText = isVi ? 'Đăng xuất' : 'Log out';
  const savingText = isVi ? 'Đang lưu...' : 'Saving...';
  const saveChangesText = isVi ? 'Lưu thay đổi' : 'Save changes';
  const dangerZoneTitle = isVi ? 'Khu vực nguy hiểm' : 'Danger Zone';
  const dangerZoneDesc = isVi ? 'Hành động này sẽ xóa tài khoản vĩnh viễn.' : 'This action will delete your account permanently.';
  const deleteAccountText = isVi ? 'Xóa tài khoản' : 'Delete account';

  return (
    <div className="profile-card">
      <h2>{cardTitle}</h2>

      <div className="form-grid">
        <div className="form-group">
          <label>{lastNameLabel}</label>
          <input
            type="text"
            value={formData.last_name || ''}
            onChange={(e) => setField('last_name', e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>{firstNameLabel}</label>
          <input
            type="text"
            value={formData.first_name || ''}
            onChange={(e) => setField('first_name', e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>{emailLabel}</label>
          <input type="email" value={formData.email || ''} readOnly className="readonly-input" />
        </div>

        <div className="form-group">
          <label>{roleLabel}</label>
          <input
            type="text"
            value={formData.role || researcherText}
            readOnly
            className="readonly-input"
          />
        </div>

        <div className="form-group">
          <label>{genderLabel}</label>
          <select
            value={formData.gender ? 'male' : 'female'}
            onChange={(e) => setField('gender', e.target.value === 'male')}
          >
            <option value="male">{maleOption}</option>
            <option value="female">{femaleOption}</option>
          </select>
        </div>

        <div className="form-group">
          <label>{dobLabel}</label>
          <input
            type="date"
            value={formData.date_of_birth || ''}
            onChange={(e) => setField('date_of_birth', e.target.value)}
          />
        </div>
      </div>

      <div className="form-group full-width">
        <label>AVATAR URL</label>
        <input
          type="text"
          value={formData.url_image || ''}
          onChange={(e) => setField('url_image', e.target.value)}
          placeholder="https://example.com/avatar.png"
        />
      </div>

      <div className="button-area d-flex gap-3 justify-content-end align-items-center mt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onLogout}
        >
          {logoutText}
        </Button>
        <Button
          type="button"
          variant="primary"
          onClick={onSave}
          loading={isSaving}
          disabled={isSaving}
        >
          {isSaving ? savingText : saveChangesText}
        </Button>
      </div>

      <div className="danger-zone mt-5 p-4 rounded-3" style={{ border: '1px solid rgba(239, 68, 68, 0.2)', background: 'rgba(239, 68, 68, 0.04)' }}>
        <h3 className="text-danger mb-1" style={{ fontSize: '1.1rem' }}>{dangerZoneTitle}</h3>
        <p className="text-muted-custom small mb-3">{dangerZoneDesc}</p>
        <Button
          type="button"
          variant="danger"
          size="sm"
          onClick={onRequestDelete}
        >
          {deleteAccountText}
        </Button>
      </div>
    </div>
  );
}
