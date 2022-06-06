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
const url = window.ADMIN_;
// import TelegramPushSmsButton from './../components/TelegramPushSmsButton';
//
// const smsFilter = props => (
//     <Filter {...props}>
//         <TextInput label="Search" source="q" alwaysOn/>
//         <ReferenceInput
//             label="User"
//             source="userId"
//             reference="users"
//
//         >
//             <SelectInput optionText="name"/>
//         </ReferenceInput>
//     </Filter>
// );
const SmsEditActions = ({basePath, data, resource}) => (
    <CardActions>
        <ShowButton record={data}/>
        <RefreshButton/>
        <Button
            color="primary"
            size="small"
            onClick={() => {
                // console.log('data', data.id);
                let option = {
                    headers: {
                        lan: 'ar',
                    },
                };
                option['headers']['token'] = localStorage.getItem('token');

                axios
                    .sms(url + '/sms/telegram/' + data.id, {}, option)
                    .then(function (response) {
                        // console.log('fetched!');
                        // resolve(response);
                        // response.json();
                    })
                    .catch(function (error) {
                        // console.log(error);
                        // reject(error);
                    });
                // fetch(`/comments/${data.id}`, { method: 'POST'})
                //     .then(() => {
                //         // showNotification('Comment approved');
                //         // push('/comments');
                //     })
                //     .catch((e) => {
                //         console.error(e);
                //         // showNotification('Error: comment not approved', 'warning')
                //     });
            }}>
            ارسال به تلگرام
        </Button>
    </CardActions>
);

export const smsList = (props) => {
  const translate = useTranslate();
  return(
    // filters={<smsFilter/>}

    <List {...props}>
      <Datagrid>
        <TextField source="phoneNumber" label={translate('resources.sms.receiver')}/>
        <TextField source="message" label={translate('resources.sms.message')}/>
        <TextField source="status" label={translate('resources.sms.status')}/>
        <TextField source="from" label={translate('resources.sms.sender')}/>


        {/*<TextField source="customer.firstName" label="نام فرستنده"/>*/}
        {/*<TextField source="customer.lastName" label="نام خانوادگی فرستنده"/>*/}
        <DateField source="createdAt" showTime label={translate('resources.sms.createdAt')}/>
        <DateField source="updatedAt" showTime label={translate('resources.sms.updatedAt')}/>
        {/*<EditButton />*/}
        {/*<ShowButton/>*/}
        <DeleteButton />
      </Datagrid>
    </List>
  );
}

// const smsTitle = ({record}) => {
//     return <span>sms {record ? `"${record.title}"` : ''}</span>;
// };

export const smsEdit = (props) => (
    <Edit actions={<SmsEditActions/>} {...props}>
        <SimpleForm>
            {/*<ReferenceInput label="دسته اول" source="firstCategory" reference="category">*/}
            {/*<SelectInput optionText="name" optionValue="id"/>*/}
            {/*</ReferenceInput>*/}
            {/*<ReferenceInput label="دسته دوم" source="secondCategory" reference="category" >*/}
            {/*<SelectInput optionText="name" optionValue="id"/>*/}
            {/*</ReferenceInput>*/}
            {/*<ReferenceInput label="دسته سوم" source="thirdCategory" reference="category" >*/}
            {/*<SelectInput optionText="name" optionValue="id"/>*/}
            {/*</ReferenceInput>*/}
            {/*<ReferenceInput label="مشتری" source="customer" reference="customer">*/}
            {/*<SelectInput optionText="phoneNumber" optionValue="id"/>*/}
            {/*</ReferenceInput>*/}
            <TextInput source="phoneNumber" label="شماره موبایل"/>
            <TextInput multiline source="message" label="متن"/>
            <SelectInput
                source="status"
                choices={[
                    {id: 'send', name: 'ارسال'},
                    {id: 'unsend', name: 'در دست بررسی'},
                    {id: 'deleted', name: 'حذف شده'},
                ]}
            />
        </SimpleForm>
    </Edit>
);

export const smsCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="phoneNumber" label="شماره موبایل"/>
            <TextInput multiline source="message" label="متن"/>
            {/*<SelectInput*/}
            {/*source="status"*/}
            {/*choices={[*/}
            {/*{ id: 'send', name: 'ارسال' },*/}
            {/*{ id: 'unsend', name: 'در دست بررسی' },*/}
            {/*{ id: 'deleted', name: 'حذف شده' },*/}
            {/*]}*/}
            {/*/>*/}
        </SimpleForm>
    </Create>
);
export const smsShow = props => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="title.fa" label="عنوان"/>
            <TextField source="mainCategory.name" label="عنوان"/>
            <RichTextField source="description.fa" label="متن"/>
            <DateField label="منتشر شده در" source="createdAt"/>
            <DateField label="بروزرسانی شده در" source="updatedAt"/>

        </SimpleShowLayout>
    </Show>
);

export default smsCreate;
