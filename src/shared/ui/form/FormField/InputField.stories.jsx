import { expect } from 'storybook/test';
import InputField from './InputField';

const meta = {
  component: InputField,
  tags: ['ai-generated'],
};

export default meta;

export const Primary = {
  args: {
    label: 'Tên đăng nhập',
    placeholder: 'Nhập email hoặc username',
    icon: 'lucide:user',
    name: 'username',
  },
  play: async ({ canvas, userEvent }) => {
    const input = canvas.getByPlaceholderText('Nhập email hoặc username');
    await userEvent.type(input, 'researcher@vnu.edu.vn');
    await expect(input).toHaveValue('researcher@vnu.edu.vn');
  },
};

export const WithError = {
  args: {
    label: 'Mật khẩu',
    placeholder: 'Nhập mật khẩu',
    type: 'password',
    error: 'Mật khẩu phải có ít nhất 8 ký tự',
    icon: 'lucide:lock',
    name: 'password',
  },
  play: async ({ canvas }) => {
    const alert = canvas.getByRole('alert');
    await expect(alert).toHaveTextContent('Mật khẩu phải có ít nhất 8 ký tự');
    const input = canvas.getByPlaceholderText('Nhập mật khẩu');
    await expect(input).toHaveAttribute('aria-invalid', 'true');
  },
};

export const Disabled = {
  args: {
    label: 'Email cơ quan',
    value: 'readonly@vnu.edu.vn',
    disabled: true,
    name: 'email',
  },
};
