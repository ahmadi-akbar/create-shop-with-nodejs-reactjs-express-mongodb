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
export const userList = (props) => {
  const translate=useTranslate();
  return(
    <List {...props}>
      <Datagrid>
        {/*<TextField source="id"/>*/}
        <EmailField source="email" label="email" />
        <TextField source="username" label="username" />
        <TextField source="nickname" label="nickname" />
        <DateField source="createdAt" showTime label="created at" />
        <DateField source="updatedAt" showTime label="updated at" />
        <BooleanField source="active" label="active/deactive" />
        <EditButton />
        <DeleteButton />
      </Datagrid>
    </List>
  );
}


export default userList;
