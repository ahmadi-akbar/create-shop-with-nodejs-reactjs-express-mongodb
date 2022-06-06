import {
    ArrayInput,
    AutocompleteInput,
    BooleanField,
    BooleanInput,

    ChipField,
    CloneButton,
    Create,
    CreateButton,
    Datagrid,
    DatagridRow,
    DeleteButton,
    downloadCSV,
    Edit,
    EditButton,
    ExportButton,
    Filter,
    FormDataConsumer,
    FunctionField,
    ImageField,
    ListButton,
    NumberField,
    NumberInput,
    Pagination,
    ReferenceArrayField,
    ReferenceArrayInput,
    ReferenceInput,
    RefreshButton,
    SaveButton,
    SearchInput,
    SelectArrayInput,
    SelectInput,
    ShowButton,
    showNotification,
    SimpleFormIterator,
    SingleFieldList,
    TextField,
    TextInput,
    Toolbar,
    TopToolbar,
    useForm,
    useListContext,
    useRefresh,
    useTranslate
} from 'react-admin';
import CardActions from '@mui/material/CardActions';
import jsonExport from 'jsonexport/dist';
// import { RichTextInput } from 'ra-input-rich-text';
// import {ImportButton} from "react-admin-import-csv";

import API, {BASE_URL} from '@/functions/API';
import {dateFormat} from '@/functions';
import _ from 'lodash';
import {
    CatRefField,
    EditOptions,
    FileChips,
    List,
    ShowDescription,
    showFiles,
    ShowLink,
    ShowOptions,
    ShowPictures,
    SimpleForm,
    SimpleImageField,
    UploaderField,
  ProductType
} from '@/components';
import {Box, Chip, Divider, Tab, Tabs} from '@mui/material';
import { makeStyles} from '@mui/styles';
import {LocalMall, Storefront} from '@mui/icons-material';
import {Val} from '@/Utils';
import React, {Fragment, useState} from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TelegramPushPostButton from '@/components/TelegramPushPostButton';
// import { useHistory/ } from 'react-router';
// const [v, setV] = React.useState(false);

const typeChoices = [
    {
        id: 'file',
        name: 'File',
    },
    {
        id: 'text',
        name: 'Text',
    },
];
const typeChoices2 = [
    {
        id: '',
        name: 'نامشخص',
        color: 'warn'

    },
    {
        id: false,
        name: 'موجود نیست',
        color: 'erro'

    },
    {
        id: true,
        name: 'موجود هست',
        color: 'succ'

    },
];
const typeChoices3 = [
    {
        id: '',
        name: 'بدون وضعیت',
        color: 'warn'

    },

    {
        id: false,

        name: 'موجود نیست',
        color: 'erro'

    },
    {
        id: true,
        name: 'موجود هست',
        color: 'succ'

    },
];

function CustomTextInput({record}) {
    const {description = {}} = record;

    return <span>{_.truncate(description.fa, {length: 80})}</span>;
}

var valuess = {'photos': [], 'files': [], thumbnail: ''};

function setPhotos(values) {

    // let {values} = useFormState();
    console.log('setPhotos', values);
    valuess['photos'] = values;
    // setV(!v);
    // this.forceUpdate();
}

function returnToHome(values) {
    // console.log('returnToHome', values);
    valuess['firstCategory'] = values['firstCategory'];
    valuess['secondCategory'] = values['secondCategory'];
    valuess['thirdCategory'] = values['thirdCategory'];
}

function onCreateCombinations(options) {
    // console.log('onCreateCombinations', options);
    let combCount = 1;
    let combinationsTemp = [];
    let combinations = [];
    let counter = 0;
    options.forEach((opt, key) => {
        let optemp = {};
        let theVals = [];
        opt.values.forEach((val, key2) => {
            theVals.push({[opt.name]: val.name});
            // optemp[opt.name] = val.name;


            //     counter++;
            //     combinations.push({
            //         options:optemp
            //     });
        });
        combinationsTemp.push(theVals);

    });
    // console.log('combinationsTemp', combinationsTemp);
    var ttt = cartesian(combinationsTemp);
    // console.log('ttt', ttt);

    ttt.forEach((tt, key) => {
        let obj = {};
        tt.forEach((ther, key) => {
            // obj[key]=ther;
            Object.assign(obj, ther);
        })
        combinations.push({
            id: key,
            options: obj,
            in_stock: false,
            price: null,
            salePrice: null,
            quantity: 0,
        });

    });
    // (id, path, rowRecord) => form.change('combinations', combinations)
    // console.log('combinations', combinations);
    return combinations;

}

function cartesian(args) {
    var r = [], max = args.length - 1;

    function helper(arr, i) {
        for (var j = 0, l = args[i].length; j < l; j++) {
            var a = arr.slice(0); // clone arr
            a.push(args[i][j]);
            if (i == max)
                r.push(a);
            else
                helper(a, i + 1);
        }
    }

    helper([], 0);
    return r;
}

function returnCatsValues() {
    // console.log('returnCatsValues', values);
    return ({
        firstCategory: valuess['firstCategory'],
        secondCategory: valuess['secondCategory'],
        thirdCategory: valuess['thirdCategory']
    });
}

function thel(values) {
    console.log('change photos field', values);

    valuess['photos'] = values;
    // console.log(values);

}

function theP(values) {
    console.log('change thumbnail field', values);
    valuess['thumbnail'] = values;
    // console.log(values);

}


function save(values) {
    // const translate = useTranslate();

    // let {values} = useFormState();
// console.clear();
//     console.log('product values', values);
//     console.log('product valuess', valuess);
    // dataProvider.createOne(values).then(()=>{
    //     console.log('hell yeah');
    // })
    // return;
    // values={...valuess};
    if (valuess.firstCategory) {
        // console.log('let us set firstCategory');
        values.firstCategory = valuess.firstCategory;

    }
    if (valuess.secondCategory) {
        // console.log('let us set secondCategory');

        values.secondCategory = valuess.secondCategory;

    }
    if (valuess.thirdCategory) {
        // console.log('let us set thirdCategory');

        values.thirdCategory = valuess.thirdCategory;

    }
    if (valuess.thumbnail) {
        values.thumbnail = valuess.thumbnail;

    }
    if (valuess.photos) {
        values.photos = valuess.photos;
        // valuess['photos']
    }

    console.log('last values: ', values);
    // return;
    if (values._id) {
        // delete values.photos;
        delete values.questions;
        delete values.nextproduct;
        delete values.category;
        delete values.catChoosed;
        delete values.files;
        console.log('last values (edit): ', values);

        API.put('/admin/product/' + values._id, JSON.stringify({...values}))
            .then(({data = {}}) => {
                // const refresh = useRefresh();
                // refresh();
                // alert('it is ok');
                // showNotification(translate('product.updated'));
                window.location.reload();
                if (data.success) {
                    values = [];
                    valuess = [];
                }
            })
            .catch((err) => {
                console.log('error', err);
            });
    } else {
        if (valuess.photos) {
            values.photos = valuess.photos;
        }
        if (valuess.files) {
            values.files = valuess.files;
        }
        API.post('/admin/product/', JSON.stringify({...values}))
            .then(({data = {}}) => {
                // showNotification(translate('product.created'));
                if (data._id) {
                    window.location.href = "/#/product/"+data._id;
                    values = [];
                    valuess = [];
                }
            })
            .catch((err) => {
                console.log('error', err);
            });
    }
}


const CustomToolbar = props => (
    <Toolbar {...props} className={'dfghjk'}>
        <SaveButton/>
        <DeleteButton mutationMode="pessimistic"/>
    </Toolbar>
);



const Form = ({children, ...props}) => {
    console.log('vprops', props);
    // save={save}
    const translate = useTranslate();

    valuess['photos'] = props.record.photos || [];
    return (
        <SimpleForm {...props} toolbar={<CustomToolbar/>} save={save} className={'d-flex'}>
            {/*<TabbedDatagrid/>*/}
            <TextInput source={"title."+translate('lan')} label={translate('product.title')} className={'width100 mb-20'} validate={Val.req}/>

            <div className={'mb-20'}></div>
            <div className={'mb-20'}></div>

            <TextInput source="slug" label={translate('product.slug')} className={'width100 mb-20 ltr'}/>
            {/*<NumberInput*/}
            {/*source="minScore"*/}
            {/*label="Min Score"*/}
            {/*validate={Val.req}*/}
            {/*min={0}*/}
            {/*/>*/}
            <TextInput multiline fullWidth source="excerpt" label={translate('product.excerpt')}/>
            <TextInput multiline fullWidth source="description" label={translate('product.description')} />

            <div className={'mb-20'}></div>
            <BooleanInput source="story" label={translate('product.story')} />
            <TextInput source="miniTitle" label={translate('product.miniTitle')}/>

            <CatRefField  label={translate('product.firstCategory')} returnToHome={returnToHome} returnCatsValues={returnCatsValues}
                         record={props.record} source="firstCategory"
                         reference="category"
                         url={'/category/f/0/1000'} surl={'/category/s'}/>



            <div className={'mb-20'}></div>

            <SelectInput
                label={translate('product.type')}
                fullWidth
                className={'mb-20'}
                source="type"
                choices={ProductType()}

            />

            {/*<ShowDescription*/}
            {/*className={'mb-20'}*/}
            {/*source="sections"*/}
            {/*label="توضیحات"*/}
            {/*/>*/}

            <div className={'mb-20'}></div>
            <FormDataConsumer>
                {({formData = {}}) =>
                    (<EditOptions record={props.record} onCreateCombinations={onCreateCombinations}
                                  formData={formData}
                                  type={formData.type}/>)

                }
            </FormDataConsumer>
            {/*<ShowPictures source="photos" thep={theP} setPhotos={setPhotos}/>*/}


            <UploaderField

                label={translate('product.photo')}

                accept="image/*"
                source="photos"
                multiple={true}

                thep={theP}
                setPhotos={setPhotos}
                inReturn={thel}
            />

            <div className={'mb-20'}></div>

            <ArrayInput source="extra_attr"
                        label={translate('product.extra_attr')}
>
                <SimpleFormIterator {...props}>

                    <FormDataConsumer>
                        {({getSource, scopedFormData}) =>
                            ([
                                    <div className={'mb-20'}></div>,

                                    <TextInput
                                        fullWidth
                                        source={getSource('title')}
                                        label={translate('product.title')}

                                        record={scopedFormData}
                                    />,
                                    <TextInput
                                        fullWidth
                                        source={getSource('des')}
                                        label={translate('product.description')}


                                        record={scopedFormData}
                                    />]
                            )
                        }
                    </FormDataConsumer>
                </SimpleFormIterator>
            </ArrayInput>
            <ArrayInput source="labels" label={translate('product.labels')}>
                <SimpleFormIterator {...props}>

                    <FormDataConsumer>
                        {({getSource, scopedFormData}) =>
                            (
                                <TextInput
                                    fullWidth
                                    source={getSource('title')}

                                    label={translate('product.title')}

                                    record={scopedFormData}
                                />
                            )
                        }
                    </FormDataConsumer>
                </SimpleFormIterator>
            </ArrayInput>


            <ArrayInput source="sources" label={translate('product.sources')} fullWidth>
                <SimpleFormIterator {...props} fullWidth>

                    <FormDataConsumer fullWidth>
                        {({getSource, scopedFormData}) =>
                            (
                                <TextInput
                                    fullWidth
                                    source={getSource('url')}

                                    label={translate('product.url')}

                                    record={scopedFormData}
                                />
                            )
                        }
                    </FormDataConsumer>
                </SimpleFormIterator>
            </ArrayInput>
            <SelectInput
                label={translate('product.status')}

                source="status"
                choices={[
                    {id: 'published', name: translate('product.published')},
                    {id: 'processing', name: translate('product.processing')},
                    {id: 'deleted', name: translate('product.deleted')},
                ]}
            />
            {/*<ReferenceArrayInput label="انتخاب عنوان" source={getSource('title')}*/}
            {/*reference="attributes" filter={{f: true}}>*/}

            {/*<AutocompleteInput optionText="name.fa"*/}
            {/*optionValue="name.fa"/></ReferenceArrayInput>,*/}


            {children}
        </SimpleForm>
    );
};
const PostEditActions = ({basePath, data, resource}) => (
    <CardActions>
        {/*<ShowButton  record={data} />*/}
        {/*<RefreshButton />*/}
        <TelegramPushPostButton record={data}/>

    </CardActions>
);
const edit = (props) => (
    <Edit actions={<PostEditActions/>} {...props}>
        <Form>

        </Form>
    </Edit>
);



export default edit;
