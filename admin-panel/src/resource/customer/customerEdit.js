import {
    BooleanField,
    BooleanInput,
    Create,
    Datagrid,
    DateField,
    DeleteButton,
    Edit,
    EditButton,
    EmailField,
    FunctionField,
    Filter,
    ImageField,
    ImageInput,
    NumberField,
    NumberInput,
    RichTextField,
    SearchInput,
    Show,
    ShowButton,
    Pagination,
    SimpleShowLayout,
    TextField,
    TextInput,
} from 'react-admin';
import {dateFormat} from '@/functions';
import {CategoryRounded as Icon,Group,GroupAdd} from '@mui/icons-material';
import {List, SimpleForm} from '@/components';

export const customerEdit = (props) => {
    console.log('props',props);
    return(
    <Edit {...props}>
      <SimpleForm>
        <TextInput disabled source="id"/>
        <TextInput source="firstName" label={'نام'}/>
        <TextInput source="lastName" label={'نام خانوادگی'}/>
        <TextInput source="internationalCode" label={'کد ملی'}/>
        <TextInput source="email" type="email"/>
        <TextInput source="phoneNumber" label={'شماره موبایل'}/>
        <TextInput source="countryCode"/>
        <TextInput source="activationCode"/>
        <BooleanInput source="active"/>
        <ImageInput source="photos[0]" label="Profile photo" accept="image/*">
          <ImageField source="url" title="title"/>
        </ImageInput>
      </SimpleForm>
    </Edit>
  );
}


export default customerEdit;
