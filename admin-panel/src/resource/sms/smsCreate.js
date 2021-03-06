import {

    Create,
    Datagrid,
    DateField,
    DeleteButton,
    Edit,
    EditButton,
    ReferenceField,
    RefreshButton,
    SelectInput,
    ShowButton,
    TextField,
    TextInput,
  useTranslate
} from 'react-admin';
import CardActions from '@mui/material/CardActions';
import {Textsms as Icon,Send} from '@mui/icons-material';
import Button from '@mui/material/Button';
import axios from 'axios';
import {List, SimpleForm} from '@/components';

const SmsEditActions = ({basePath, data, resource}) => (
    <CardActions>
        <ShowButton record={data}/>
        <RefreshButton/>
    </CardActions>
);




export const smsCreate = (props) => {
  const translate = useTranslate();

  return(
    <Create {...props}>
      <SimpleForm>
        <TextInput source="phoneNumber" label={translate("resources.sms.phoneNumber")} fullWidth/>
        <TextInput multiline source="message" label={translate("resources.sms.message")} fullWidth/>
      </SimpleForm>
    </Create>
  );
};


export default smsCreate;
