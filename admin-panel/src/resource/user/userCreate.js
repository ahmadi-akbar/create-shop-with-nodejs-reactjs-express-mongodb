import {
  BooleanField,
  Edit,
  Create,
  Datagrid,
  TextField,
  EmailField,
  DateField,
  EditButton,
  DeleteButton,
  TextInput,
  PasswordInput,
  BooleanInput,
  useTranslate
} from 'react-admin';
import { List, SimpleForm } from '@/components';

export const userCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput disabled source="id" label="شناسه" />
      <TextInput source="nickname" label="لقب" />
      <TextInput source="email" type="email" label="ایمیل" />
      <TextInput source="username" label="نام کاربری" />
      <PasswordInput source="password" label="رمز عبور" />
      <BooleanInput source="active" label="فعال/غیرفعال" />
    </SimpleForm>
  </Create>
);
export default userCreate;
