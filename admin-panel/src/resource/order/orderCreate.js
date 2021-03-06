import {
    ArrayField,
    BooleanField,
    Create,
    Datagrid,
    DateField,
    Edit,
    EditButton,
    Filter,
    FunctionField,
    ListContextProvider,
    NumberField,
    NumberInput,
    Pagination,
    ReferenceField,
    // Responsive,
    SearchInput,
    SelectField,
    SelectInput,
    Show,
    ShowButton,
    SimpleList,
    SimpleShowLayout,
    TextField,
    TextInput,
    TopToolbar,
    useListContext,
  useTranslate
} from 'react-admin';
import {Box, Chip, Divider, Tab, Tabs} from '@mui/material';

import Button from '@mui/material/Button';
import {AddShoppingCartOutlined, HelpRounded, Receipt} from '@mui/icons-material';
import {List, PrintOrder, PrintPack, SimpleForm,OrderStatus,OrderPaymentStatus} from '@/components';
import {dateFormat} from '@/functions';
import API, {BASE_URL} from '@/functions/API';
import {makeStyles} from '@mui/styles';
import React, {Fragment, useCallback, useEffect, useState} from 'react';
// import { useTranslate } from "react-admin/dist/index";


function save(values) {

    API.post('/order/', JSON.stringify({...values}))
        .then(({data = {}}) => {
            // alert('it is ok');

            if (data.success) {
                // values = [];
                // data.url = [];
                var theUrl = document.getElementById('theUrl');
                theUrl.value = data.url;
            }
        })
        .catch((err) => {
            console.log('error', err);
        });

}

const Form = ({children, ...props}) => {
  const translate = useTranslate();

  return (
        <SimpleForm {...props} onSubmit={save()} className={'d-flex'}>

            <NumberInput source="amount" label={translate("resources.order.amountToPay")} className={'width100 mb-20 ltr'} fullWidth/>
            <input id={'theUrl'}></input>
            {children}
        </SimpleForm>
    );
};

const create = (props) => (
    <Create {...props}>
        <Form>


        </Form>
    </Create>
);


export default create;
