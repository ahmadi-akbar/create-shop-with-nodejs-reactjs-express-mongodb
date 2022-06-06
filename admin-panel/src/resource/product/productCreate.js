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
    UploaderField
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
const typeChoices4 = [
    {
        id: 'normal',
        name: 'عادی',
    },
    {
        id: 'variable',
        name: 'متغیر',
    }
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

function thelF(values) {
    // console.log('change files field', values);

    valuess['files'].push({
        url: values
    });
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

const PostPagination = props => <Pagination rowsPerPageOptions={[10, 25, 50, 100]} {...props} />;

const useQuickFilterStyles = makeStyles(theme => ({
    chip: {
        marginBottom: theme.spacing(1),
    },
}));
const QuickFilter = ({label}) => {
    const translate = useTranslate();
    const classes = useQuickFilterStyles();
    return <Chip className={classes.chip} label={translate(label)}/>;
};
// const useStyles = makeStyles(theme => ({
//     productItem: {
//         variable:
//             theme.palette.type === 'dark'
//                 ? '#535353'
//                 : `linear-gradient(to right, #8975fb 0%, #746be7 35%), linear-gradient(to bottom, #8975fb 0%, #6f4ceb 50%), #6f4ceb`,
//
//         normal: '#fff'
//     },
//
// }));


const postRowStyle = (record, index) => {
    // const classes = useStyles();
    // console.log('useStyles',classes.productItem);
    return ({
        backgroundColor: record.type === 'variable' ? '#9f9f9f' : '#ee811d',
    })
};

const postRowClass = (record, index) => {
    // const classes = useStyles();
    // console.log('useSt yles',classes.productItem);
    return (record.type === 'variable' ? 'hgvfcd' : 'white')
};
const PostFilter = (props) => {
    const translate = useTranslate();

    return(
        <Filter {...props}>
            {/*<TextInput label="Search" source="search" alwaysOn/>*/}
            <SearchInput source="Search" placeholder={translate('product.search')} alwaysOn/>
            <SearchInput source="category" placeholder={translate('product.category')} alwaysOn/>
            {/*<SearchInput source="firstCategory" placeholder={'نام'} alwaysOn/>*/}
            {/*<SearchInput source="lastName" placeholder={'نام خانوادگی'} alwaysOn/>*/}
            {/*<SelectInput source="firstCategory" label={'دسته بندی اول'}  emptyValue={null} choices={typeChoices4}/>*/}
            {/*<SelectInput source="secondCategory" label={'دسته بندی دوم'}  emptyValue={null} choices={typeChoices3}/>*/}
            {/*<SelectInput source="thirdCategory" label={'دسته بندی سوم'}  emptyValue={null} choices={typeChoices3}/>*/}

        </Filter>
    );
}
const exporter = posts => {
    console.clear();
    let allpros = [];
    const postsForExport = posts.map(post => {
        const {backlinks, author, ...postForExport} = post; // omit backlinks and author

        postForExport._id = post._id; // add a field
        // console.log(post.title)

        if (post.title)
            postForExport.title = post.title.fa; // add a field
        postForExport.type = post.type; // add a field
        if (post.firstCategory) {
        //     postForExport.firstCategory = post.firstCategory._id; // add a field
        //     postForExport.firstCategory = post.firstCategory.name.fa; // add a field
            // delete post.firstCategory;
        }
        if (post.secondCategory) {
            // postForExport.secondCategory = post.secondCategory._id; // add a field
            postForExport.secondCategory = post.secondCategory.name.fa; // add a field
            delete post.secondCategory;

        }
        if (post.thirdCategory) {

            // postForExport.thirdCategory = post.thirdCategory._id; // add a field
            postForExport.thirdCategory = post.thirdCategory.name.fa; // add a field
            delete post.thirdCategory;

        }
        // postForExport.combinations = post.combinations; // add a field
        if (post.type == 'variable') {
            // postForExport.price=[];
            // postForExport.salePrice=[];
            // postForExport.in_stock=[];
            // postForExport.quantity=[];
            // allpros.pop();
            post.combinations.map((com, i) => {
                allpros.push({
                    _id: post._id,
                    title: postForExport.title,
                    price: com.price,
                    salePrice: com.salePrice,
                    in_stock: com.in_stock,
                    quantity: com.quantity,
                    type: post.type,
                    views: post.views.length,
                    options: com.options ? Object.values(com.options).toString() : '',
                    combination_id: (i + 1),
                    firstCategory:post.firstCategory.name.fa || ''
                })
                // delete postForExport.combinations[i].id;
                // delete postForExport.combinations[i]['id'];
                // delete postForExport.combinations[i].product_id;
                // delete postForExport.combinations[i].inventory_status;
                // delete postForExport.combinations[i].oversell;
                // delete postForExport.combinations[i].sku;
                // delete postForExport.combinations[i].barcode;
                // delete postForExport.combinations[i].weight;
                // delete postForExport.combinations[i].visible;
                // delete postForExport.combinations[i].optionsId;
                // delete postForExport.combinations[i].sale_type;
                // delete postForExport.combinations[i].sale_price;
                // delete postForExport.combinations[i].sale_amount;
                // delete postForExport.combinations[i].scheduled_discount_start;
                // delete postForExport.combinations[i].scheduled_discount_start_utc;


            });
        } else if (post.type == 'normal') {
            allpros.push({
                _id: post._id,
                title: postForExport.title,
                price: post.price,
                salePrice: post.salePrice,
                in_stock: post.in_stock,
                quantity: post.quantity,
                type: post.type,
                views: post.views.length,
                firstCategory:post.firstCategory.name.fa || ''


            })
        }
        delete postForExport.active;
        delete postForExport.countries;
        delete postForExport.categories;
        delete postForExport.catChoosed;
        delete postForExport.addToCard;
        delete postForExport.countryChoosed;
        delete postForExport.gtin;
        delete postForExport.getContactData;
        delete postForExport.mainCountryList;
        delete postForExport.views;
        delete postForExport.transaction;
        delete postForExport.t;
        delete postForExport.mainList;
        // delete postForExport.firstCategory;
        delete postForExport.options;
        // delete postForExport.secondCategory;
        // delete postForExport.thirdCategory;
        delete postForExport.updatedAt;
        delete postForExport.createdAt;
        delete postForExport.thumbnail;
        delete postForExport.status;
        delete postForExport.title;
        delete postForExport.combinations;
        delete postForExport.id;
        return postForExport;
    });
    console.log('postsForExport', allpros);
    jsonExport(allpros, {
        headers: ['_id', 'title', 'type', 'price', 'salePrice', 'in_stock', 'quantity','firstCategory'] // order fields in the export
    }, (err, csv) => {
        console.log('ForExport', allpros);
        const BOM = '\uFEFF'
        downloadCSV(`${BOM} ${csv}`, 'posts'); // download as 'posts.csv` file
    });
};
const useDatagridStyles = makeStyles({
    total: {fontWeight: 'bold'},
});

const ListActions = (props) => {
    // All configuration options are optional
    const config = {
        // Enable logging
        logging: true,
        // Disable "import new" button
        // disableImportNew: false,
        // Disable "import overwrite" button
        // disableImportOverwrite: false,
        // // A function to translate the CSV rows on import
        // preCommitCallback?: (action: "create" | "overwrite", values: any[]) => Promise<any[]>;
        // // A function to handle row errors after import
        // postCommitCallback?: (error: any) => void;
        // Transform rows before anything is sent to dataprovider
        transformRows: (csvRows) => {
            console.log('csvRows', csvRows);
            // let update = [], create = [];
            let array = [];
            const postsForExport = csvRows.map(row => {
                console.log('row', row);

                row._id = row[' _id'];
                if (row._id)
                    array.push({
                        _id: row._id
                    })
                // else
                // delete row.photos;
                delete row[' _id'];
                delete row['id'];
                delete row.firstCategory_name_ru;
                delete row.secondCategory_name_ru;
                delete row.thirdCategory_name_ru;
                row.title = {
                    en: row.title_en,
                    fa: row.title_fa,
                    ru: row.title_ru,
                    uz: row.title_uz
                };
                delete row.title_en;
                delete row.title_ru;
                delete row.title_uz;
                delete row.createdAt;
                delete row.updatedAt;
                // if (row._id) {
                //     update.push(row);
                // } else {
                //     create.push(row);
                // }
                // if()

                return row;
            });
            console.log('ForImport', postsForExport);
            // API.post('/admin/product/importproductsfromcsv', JSON.stringify(postsForExport))
            //     .then(({data = {}}) => {
            // const refresh = useRefresh();
            // refresh();
            // alert('it is ok');
            // window.location.reload();
            // if (data.success) {
            //     values = [];
            //     valuess = [];
            // }
            // })
            // .catch((err) => {
            //     console.log('error', err);
            // });
        },
        validateRow: async (row) => {
            console.log('row', row);
            if (row.id) {
                // throw new Error("AAAA");
            }
        },
        postCommitCallback: reportItems => {
            console.log('reportItems', {reportItems});
        },
        // Async function to Validate a row, reject the promise if it's not valid
        parseConfig: {
            dynamicTyping: true
            // complete: function(results, file) {
            //     console.log("Parsing complete:", results, file);
            // },
            // preview:1
        }
    }
    return (
        <TopToolbar>
            {/*<FilterButton/>*/}
            <CreateButton/>
            <ExportButton maxResults={10000000}/>
            {/*<CreateButton basePath={basePath} />*/}
            {/*<ImportButton {...props} {...config} />*/}
            {/* Add your custom actions */}
            {/*<Button*/}
            {/*onClick={() => {*/}
            {/*alert('Your custom action');*/}
            {/*}}*/}
            {/*label="Show calendar"*/}
            {/*>*/}
            {/*<IconEvent/>*/}
            {/*</Button>*/}
        </TopToolbar>
    );
}

// actions={<PostListActions />}
const list = (props) => {
    // console.clear();
    // console.log('props', props);
    const translate = useTranslate();

    return (

        <List  {...props} filters={<PostFilter/>} pagination={<PostPagination/>} actions={<ListActions/>}
               exporter={exporter}>
            <Datagrid optimized rowStyle={postRowStyle}>
                <SimpleImageField label={translate('product.image')}/>

                <ShowLink source={"title."+translate('lan')} label={translate('product.title')} sortable={false}/>
                {/*<CustomTextInput source="description.fa" label="description" sortable={false}/>*/}

                <FunctionField label={translate('product.categories')}
                               render={record => {


                                   return (
                                       <div className={'categories'}>
                                           {record.firstCategory && <div>
                                               <ChipField source={"firstCategory.name."+translate('lan')} label={translate('product.firstCategory')}
                                                          sortable={false}/>
                                           </div>}
                                           {record.secondCategory && <div>
                                               <ChipField source={"secondCategory.name."+translate('lan')} label={translate('product.secondCategory')}
                                                          sortable={false}/>
                                           </div>}
                                           {record.thirdCategory && <div>
                                               <ChipField source={"thirdCategory.name."+translate('lan')} label={translate('product.thirdCategory')}
                                                          sortable={false}/>
                                           </div>}
                                       </div>
                                   )
                               }}/>

                {/*<NumberField source="price" label="قیمت" sortable={false}/>*/}
                {/*<TextInput source="title.fa" label="Title" value="title.fa"/>*/}
                {/*<NumberField source="salePrice" label="قیمت تخفیف خورده" sortable={false}/>*/}
                {/*<BooleanField source="in_stock" label="موجودی"/>*/}
                {/*<NumberField source="quantity" label="مقدار" sortable={false}/>*/}
                {/*<FunctionField label="نوع"*/}
                {/*render={record => `${record.combinations && record.combinations.length ? 'مادر' : 'ساده'}`}/>*/}
                {/*<FileChips source="photos" sortable={false}/>*/}
                <FunctionField label={translate('product.prices')}
                               render={record => {
                                   let tt = translate('product.outOfStock'), thecl = 'erro';

                                   if (record.type == 'variable') {
                                       if (record.combinations) {
                                           record.combinations.map((comb, key) => {
                                               if (comb.in_stock == true) {
                                                   tt = translate('product.stock');
                                                   thecl = 'succ';
                                               }
                                           });
                                           return (
                                               <div className={'stockandprice ' + thecl}>

                                                   <div className='theDate hoverparent'>
                                                       <Chip className={thecl} label={tt}></Chip>
                                                       <div className='theDate thehover'>
                                                           {record.combinations.map((comb, key) => {
                                                               return (<div className={'cobm flex-d cobm' + key}>
                                                                   <div className={'flex-1'}>
                                                                       {comb.options && <div
                                                                           className={''}>{Object.keys(comb.options).map((item, index) => {
                                                                           return <div
                                                                               key={index}>{(item) + " : " + comb.options[item] + "\n"}</div>;

                                                                       })}</div>}
                                                                   </div>
                                                                   <div className={'flex-1'}>

                                                                       {comb.price && <div className={'FDFD'}>
                                                                           <span>{translate('product.price')}</span><span>{comb.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
                                                                       </div>}
                                                                   </div>
                                                                   <div className={'flex-1'}>

                                                                       {comb.salePrice && <div className={'vfdsf'}>
                                                                           <span>{translate('product.salePrice')}</span><span>{comb.salePrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
                                                                       </div>}
                                                                   </div>
                                                                   <div className={'flex-1'}>

                                                                       {comb.in_stock && <div className={''}>
                                                                           <span>{(comb.in_stock == true ? translate('product.inStock') : translate('product.outOfStock'))}</span>
                                                                       </div>}
                                                                   </div>
                                                                   <div className={'flex-1'}>

                                                                       {comb.quantity &&
                                                                       <div className={''}>
                                                                           <span>{comb.quantity}</span>
                                                                       </div>}
                                                                   </div>
                                                               </div>);
                                                           })}
                                                       </div>
                                                   </div>
                                               </div>
                                           );

                                       }

                                   } else {
                                       if (record.in_stock == true) {
                                           tt = translate('product.inStock');
                                           thecl = 'succ';
                                       }
                                       return (<div className={'cobm flex-d cobm'}>
                                           <div className={'flex-1'}>
                                               <span>{translate('product.price')}:</span><span>{record.price && record.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
                                           </div>
                                           <div className={'flex-1'}>
                                               <span>{translate('product.salePrice')}:</span><span>{record.salePrice && record.salePrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
                                           </div>
                                           <div className={'flex-1'}>

                                               <span>{translate('product.stock')}:</span><Chip className={thecl}
                                                                        label={tt}></Chip><span></span>
                                           </div>
                                           <div className={'flex-1'}><span>{translate('product.count')}:</span><span>{record.quantity}</span>
                                           </div>
                                       </div>)

                                   }

                               }}/>


                <FunctionField label={translate('product.date')}
                               render={record => (
                                   <div className='theDate'>
                                       <div>
                                           {translate('product.createdAt')+': ' + `${dateFormat(record.createdAt)}`}
                                       </div>
                                       <div>
                                           {translate('product.updatedAt')+': ' + `${dateFormat(record.updatedAt)}`}
                                       </div>

                                       {record.views && <div>
                                           {translate('product.viewsCount')+': ' + `${(record.views.length)}`}
                                       </div>}
                                   </div>
                               )}/>

                <EditButton/>
                <FunctionField label={translate('product.copy')}
                               render={record => (
                                   <Button
                                       color="primary"
                                       size="small"
                                       onClick={() => {
                                           // console.log('data', record._id);
                                           API.post('/admin/product/copy/' + record._id, null)
                                               .then(({data = {}}) => {
                                                   // console.log('data', data._id);
                                                   props.history.push('/product/' + data._id);
                                                   // ale/rt('done');
                                               })
                                               .catch((err) => {
                                                   console.log('error', err);
                                               });
                                       }}>
                                       کپی
                                   </Button>)}/>
                <FunctionField label={translate('product.activities')}
                               render={record => (
                                   <a href={'/#/action?filter=%7B%22product"%3A"'+record._id+'"%7D&order=ASC&page=1&perPage=10&sort=id/'} target={'_blank'}
                                       color="primary"
                                       size="small"
                                       onClick={() => {
                                           // console.log('data', record._id);
                                           // API.post('/admin/action?filter=%7B%22product"%3A"'+record._id+'"%7D&order=ASC&page=1&perPage=10&sort=id/', null)
                                           //     .then(({data = {}}) => {
                                           //         // console.log('data', data._id);
                                           //         props.history.push('/product/' + data._id);
                                           //         // ale/rt('done');
                                           //     })
                                           //     .catch((err) => {
                                           //         console.log('error', err);
                                           //     });
                                       }}>
                                       {translate('product.activities')}
                                   </a>)}/>
            </Datagrid>
        </List>
    );
};
const CustomToolbar = props => (
    <Toolbar {...props} className={'dfghjk'}>
        <SaveButton/>
        <DeleteButton mutationMode="pessimistic"/>
    </Toolbar>
);
const tabs = [
    {id: 0, name: 'محتوا'},
    {id: 1, name: 'دسته بندی'},
    {id: 2, name: 'قیمت و موجودی'},
    {id: 3, name: 'ویدیو و تصاویر'},
    {id: 4, name: 'ویژگی ها'},
    {id: 5, name: 'تنظیمات ربات'},
    {id: 6, name: 'تنظیمات محصول'},
];

function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{p: 3}}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const TabbedDatagrid = (props) => {
    const listContext = useListContext();
    const {ids, filterValues, setFilters, displayedFilters} = listContext;
    const classes = useDatagridStyles();
    const translate = useTranslate();

    const [cart, setCart] = useState([]);
    const [processing, setProcessing] = useState([]);
    const [indoing, setIndoing] = useState([]);
    const [makingready, setMakingready] = useState([]);
    const [inpeyk, setInpeyk] = useState([]);
    const [cancel, setCancel] = useState([]);
    const [complete, setComplete] = useState([]);
    const [checkout, setCheckout] = useState([]);
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        console.log('newValue', newValue);
        if (newValue || newValue == 0)
            setValue(newValue);
    };
    const totals = 0;

    // useEffect(() => {
    //     if (filterValues)
    //         if (ids && ids !== filterValues.status) {
    //             switch (filterValues.status) {
    //                 case 'processing':
    //                     setProcessing(ids);
    //                     break;
    //                 case 'indoing':
    //                     setIndoing(ids);
    //                     break;
    //                 case 'makingready':
    //                     setMakingready(ids);
    //                     break;
    //                 case 'inpeyk':
    //                     setInpeyk(ids);
    //                     break;
    //                 case 'cancel':
    //                     setCancel(ids);
    //                     break;
    //                 case 'complete':
    //                     setComplete(ids);
    //                     break;
    //             }
    //         }
    // }, [ids, filterValues.status]);

    // const handleChange = useCallback(
    //     (event, value) => {
    //         setFilters &&
    //         setFilters(
    //             {...filterValues, status: value},
    //             displayedFilters
    //         );
    //     },
    //     [displayedFilters, filterValues, setFilters]
    // );
    //
    // const selectedIds =
    //     filterValues.status === 'cart'
    //         ? cart
    //         : filterValues.status === 'checkout'
    //         ? checkout
    //         : cart;

    return (
        <Fragment>
            <div className={'mb-20'}></div>

            <TextInput source={"title."+translate('lan')} label={translate('product.title')} className={'width100 mb-20'} validate={Val.req}/>

            <Box>
                <Tabs
                    variant="fullWidth"
                    centered
                    value={value}
                    indicatorColor="primary"
                    onChange={handleChange}
                >
                    {tabs.map((choice, dd) => (
                        <Tab
                            key={choice.id}
                            label={
                                totals[choice.name]
                                    ? `${choice.name} (${totals[choice.name]})`
                                    : choice.name
                            }
                            // value={choice.id}
                            onClick={handleChange}
                            {...a11yProps(dd)}
                        />
                    ))}
                </Tabs>
            </Box>
            <Box>
            <TabPanel value={value} index={0}>

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
                <TextInput multiline fullWidth source="description" label={translate('product.description')}/>
                {/*<RichTextInput source="description" />*/}
            </TabPanel>
            <TabPanel value={value} index={1}>

                <div className={'mb-20'}></div>
                <BooleanInput source="story"  label={translate('product.story')}/>
                <TextInput source="miniTitle"  label={translate('product.miniTitle')}/>

                <CatRefField label={translate('product.firstCategory')} returnToHome={returnToHome} returnCatsValues={returnCatsValues}
                             record={props.record} source="firstCategory"
                             reference="category"
                             url={'/category/f/0/1000'} surl={'/category/s'}/>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <div className={'mb-20'}></div>

                <SelectInput
                    label={translate('product.type')}

                    fullWidth
                    className={'mb-20'}
                    source="type"
                    choices={typeChoices4}

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


            </TabPanel>
            <TabPanel value={value} index={3}>
                <UploaderField
                    label={translate('product.photo')}
                    accept="image/*"
                    source="photos"
                    multiple={true}

                    thep={theP}
                    setPhotos={setPhotos}
                    inReturn={thel}
                />

            </TabPanel>
            <TabPanel value={value} index={4}>
                <div className={'mb-20'}></div>

                <ArrayInput source="extra_attr" label={'ویژگی های اضافه'}>
                    <SimpleFormIterator {...props}>

                        <FormDataConsumer>
                            {({getSource, scopedFormData}) =>
                                ([
                                    <div className={'mb-20'}></div>,

                                        <TextInput
                                            fullWidth
                                            source={getSource('title')}
                                            label="ورود عنوان"
                                            record={scopedFormData}
                                        />,
                                        <TextInput
                                            fullWidt h
                                            source={getSource('des')}
                                            label="توضیحات"
                                            record={scopedFormData}
                                        />]
                                )
                            }
                        </FormDataConsumer>
                    </SimpleFormIterator>
                </ArrayInput>
                <ArrayInput source="labels">
                    <SimpleFormIterator {...props}>

                        <FormDataConsumer>
                            {({getSource, scopedFormData}) =>
                                (
                                    <TextInput
                                        fullWidth
                                        source={getSource('title')}
                                        label="Title"
                                        record={scopedFormData}
                                    />
                                )
                            }
                        </FormDataConsumer>
                    </SimpleFormIterator>
                </ArrayInput>


            </TabPanel>

            <TabPanel value={value} index={5}>
                <ArrayInput source="sources" fullWidth>
                    <SimpleFormIterator {...props} fullWidth>

                        <FormDataConsumer fullWidth>
                            {({getSource, scopedFormData}) =>
                                (
                                    <TextInput
                                        fullWidth
                                        source={getSource('url')}
                                        label="url"
                                        record={scopedFormData}
                                    />
                                )
                            }
                        </FormDataConsumer>
                    </SimpleFormIterator>
                </ArrayInput>


            </TabPanel>
            <TabPanel value={value} index={6}>
                <SelectInput
                    source="status"
                    choices={[
                        {id: 'published', name: 'منتشر شده'},
                        {id: 'processing', name: 'پیش نویس'},
                        {id: 'deleted', name: 'زباله دان'},
                    ]}
                />
            </TabPanel>
            </Box>
            <Divider/>

            <div>
            </div>

        </Fragment>
    );
};

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
                choices={typeChoices4}

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

const create = (props) => (
    <Create {...props}>
        <Form>


        </Form>
    </Create>
);

export default create;
