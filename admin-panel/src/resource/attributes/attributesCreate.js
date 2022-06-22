<<<<<<< HEAD
import {
    ArrayInput,
    BooleanInput,
    ChipField,
    Create,
    Datagrid,
    DeleteButton,
    Edit,
    EditButton,
    FormDataConsumer,
    ReferenceField,
    ReferenceInput,
    SelectInput,
    SimpleFormIterator,
    SingleFieldList,
    TextField,
    TextInput,
    useTranslate
} from 'react-admin';
import {CategoryRounded as Icon,ControlPointDuplicate} from '@mui/icons-material';
import {Divider} from '@mui/material';
import {List, SimpleForm, UploaderField} from '@/components';
import useStyles from '@/styles';
import {Val} from '@/Utils';

const defaultValues = {
    values: [
        {
            name: {
                fa: ''
            },
            slug: '',
        },
    ],
};


const Form = ({children, ...rest}) => {
    const cls = useStyles();
    const translate = useTranslate();

    return (
        <SimpleForm {...rest} defaultValues={defaultValues}>
            <TextInput source="name.fa" label={translate('resources.attributes.name')}/>
            <TextInput source="slug" label={translate('resources.attributes.slug')}/>


            <Divider fullWidth/>

            <ArrayInput source="values" label={translate('resources.attributes.values')}>
                <SimpleFormIterator {...rest}>
                    <TextInput source="name.fa" label={translate('resources.attributes.name')} multiline fullWidth/>
                    <TextInput source="slug" label={translate('resources.attributes.slug')} className={'ltr'} multiline fullWidth/>
                </SimpleFormIterator>
            </ArrayInput>
        </SimpleForm>
    );
=======
import { ArrayInput, Create, SelectInput, SimpleFormIterator, TextInput, useTranslate } from "react-admin";
import { Divider } from "@mui/material";
import { List, SimpleForm, UploaderField } from "@/components";
import useStyles from "@/styles";
import { Val } from "@/Utils";
import Form  from "./attributesForm";

const defaultValues = {
  values: [
    {
      name: {
        fa: ""
      },
      slug: ""
    }
  ]
>>>>>>> 496de9eb5f488a591bacfd6f8d28b7e365dbd606
};


const create = (props) => (
<<<<<<< HEAD
    <Create {...props}>
        <Form/>
    </Create>
=======
  <Create {...props}>
    <Form/>
  </Create>
>>>>>>> 496de9eb5f488a591bacfd6f8d28b7e365dbd606
);

export default create;
