import React from 'react';
import {
    ArrayInput,
    FormDataConsumer,
    FunctionField,
    NumberInput,
    required,
    SelectArrayInput,
    SelectInput,
    SimpleFormIterator,
    TextInput,
    useTranslate
} from 'react-admin';
import API from '@/functions/API';
import {numberWithCommas} from '@/functions';
import Select from 'react-select';
import {useFormState} from 'react-final-form';

import {
    CatRefField,
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

API.defaults.headers.common['Content-Type'] = 'multipart/form-data';
var ckjhg = {};
var hasTriggered = false;
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
    },
    {
        id: false,
        name: 'موجود نیست',
    },
    {
        id: true,
        name: 'موجود هست',
    },
];
const typeChoices3 = [
    {
        id: '',
        name: 'بدون وضعیت',
    },
    {
        id: false,
        name: 'موجود نیست',
    },
    {
        id: true,
        name: 'موجود هست',
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

export default (props) => {
    // console.clear()/;
    let {values} = useFormState();
    let translate = useTranslate();
    let lan=translate('lan');

    // console.log('edit options props', values);
    // const {input} = useInput(props);
    // const [display, setDisplay] = React.useState(true);
    const [options, setOptions] = React.useState(values.options || [{_id: 0, name: '', values: []}]);
    const [type, setType] = React.useState(values.type);
    const [change, setChanger] = React.useState(true);
    const [TheformData, setTheformData] = React.useState(values.formData);
    // const [selectS, setSelectS] = React.useState([true, true]);
    const [name, setName] = React.useState('');
    const [changes, setChanges] = React.useState(false);
    const [child, setChild] = React.useState([]);
    const [attributes, setAttributes] = React.useState({});
    const [attributesList, setAttributesList] = React.useState([]);
    // console.log('propsvalues', props, values);
    // const [g, setG] = React.useState([]);
    // const [d, setD] = React.useState([]);
    // const [progress, setProgress] = React.useState(0);
    const handleVariables = (e) => {
        e.preventDefault();
        // console.clear();

        // console.log('options', options);
        // console.log('attributes', attributes);
        // console.log('child', child);
        let cds = [];
        // if (options)
        //     options.forEach((attr, s) => {
        //         let vals = [];
        //         // if (attr.values)
        //         //     attr.values.forEach((val, s2) => {
        //         //         vals.push({
        //         //             id: s2,
        //         //             name: val.name.fa
        //         //         })
        //         //     });
        //         cds.push({
        //             values: vals,
        //             name: attr.label,
        //             id: s
        //         })
        //s
        //     });
        // console.log('cds', cds);
        // setOptions(cds);
        // console.log(props);
        var y = props.onCreateCombinations(options);
        values.combinations = y;
        values.options = options;
        // values.formData.combinations = y;
        // props.record.options = options;
        setChanges(!changes);
        // console.log(props);
    };
    const handleAdd = (e) => {
        e.preventDefault();
        // let t=options;
        // console.log('options', options);
        // options.push({name:'',values:''});
        // setDisplay(false);
        setOptions(options => [...options, {name: '', values: []}]);
        // setDisplay(true);
    };
    const handleRemove = (e, op) => {
        e.preventDefault();
        let tl = [];
        options.map((option, key) => {
            // console.log('op , key', op, key)
            if (op !== key) {
                tl.push(option);
            }
        })
        // options.push({name:'',values:''});
        // setDisplay(false);
        // console.log('options', tl);

        setOptions(tl);
        // setDisplay(true);
    };
    const chooseValue = (op, ff) => {
        let cds = [];
        // console.log('chooseValue', op, ff);
        if (op)
            op.forEach((uf, s) => {
                cds.push({
                    name: uf.label,
                    id: s
                });

            });
        // setOptions();/
        options[ff].values = cds;
        // console.log('options', options);

        // console.log('chooseValue res', cds);
        setOptions(options);

    }
    const chooseOptionName = (ff, op) => {
        // return;
        console.log('== >  chooseOptionName', op, options, ff, attributes);
        options[op]._id = ff.value;
        options[op].name = ff.label
        options[op].values = ff.values;
        options[op].isDisabled=true;
        console.log('options', options);
        setOptions(options);
        setChanger(!change);
        // API.get('/admin/attributes/' + op.value, {}, {})
        //     .then(({data = []}) => {
        //         console.log('data', data);
        //         var cds = [];
        //         data.values.forEach((uf, s) => {
        //             cds.push({
        //                 value: uf.name.fa,
        //                 label: uf.name.fa,
        //                 key: s
        //             })
        //
        //         });
        //         child[op.key] = data.values;
        //         console.log('child', child);
        //         setChild(child);
        //         // setSelectS([false, true, true]);
        //         // changeSecondInput(defaultV);
        //     });
    }
    const getData = () => {

        API.get('/admin/attributes/', {}, {})
            .then(({data = []}) => {
                var cds = [];
                data.forEach((uf, s) => {
                    cds[uf.name[lan]] = ({
                        values: uf.values,
                        value: uf.name[lan],
                        label: uf.name[lan],
                        key: s
                    })
                    attributesList.push({
                        values: uf.values,
                        value: uf.name[lan],
                        label: uf.name[lan],
                        key: s
                    })
                });
                // console.clear();
                // console.log('data.values', cds);
                setAttributes(cds);
                // setSelectS([false, false]);
                // setName(name.fa);
                // setSelectS([false, true, true]);
                // changeSecondInput(defaultV);
            });
    };
    React.useEffect(() => {

        getData();
        // if (input.value) setV(input.value);
    }, []);
    // React.useEffect(() => {
    //     console.log('options',options);
    //     setOptions(options => [...options, {name: '', values: ''}]);

    // setOptions(oldArray => [...oldArray, newElement]);
// setDisplay(true);
    // getData();
    // if (input.value) setV(input.value);
    // }, [options]);

    // console.log('childattributes', options, attributes, child, type, TheformData, props.type);
    console.log('\n\n= = > now rendering () ...');
    // {

    // if (attributes) {
    console.log('#attributes ', attributes);


    return [(values.type === 'variable') ? ([options.map((option, op) => {
        let tchild = [], tchildname;
        let DefaultValues = [];
        console.log('#op:', op, ' option', option, option.name);
        if (attributes[option.name] && attributes[option.name].values) {
            // console.log('attributes[op].values', attributes[op].values);

            if (attributes[option.name].label == option.name)
                attributes[option.name].values.map((at) => {
                    tchildname = attributes[option.name].value;
                    tchild.push({
                        value: at.name[lan],
                        label: at.name[lan],
                    })
                });

        }
        if (options[op] && options[op].values) {

            options[op].values.map((at) => {
                DefaultValues.push({
                    value: at.name,
                    label: at.name,
                })
            });
        }
        console.log('#tchildname ', tchildname);
        // console.log('#tchild ',   tchild,);
        console.log('#DefaultValues ', DefaultValues);

        return ([<div key={op} className={'row mb-20'}>
            <div style={{direction: 'rtl'}}>#{op}</div>
            <div className={'col-md-4'}>
                <Select isRtl={true}
                    // isLoading={selectS[op]}
                    // isDisabled={selectS[op]}
                        className={'zindexhigh'}
                        onChange={(e) => chooseOptionName(e, op)}
                        defaultValue={{value: option['name'], label: option['name']}}
                        options={attributesList}/>
            </div>
            {tchild && <div className={'col-md-4'}>
                <Select isRtl={true}
                        isMulti
                    // isLoading={selectS[op]}
                    // isDisabled={selectS[op]}
                        className={'zindexhigh'}
                        onChange={(e) => chooseValue(e, op)}
                        defaultValue={DefaultValues}
                        options={tchild}/>
            </div>}
            <div className={'col-md-4'}>
                <button onClick={(e) => {
                    handleRemove(e, op);
                }}>-
                </button>
            </div>
        </div>
        ])
    }), <button onClick={(e) => {
        handleAdd(e);
    }}>
        {translate('product.addAttr')}
    </button>, <button onClick={(e) => {
        handleVariables(e);
    }}>{translate('product.createComb')}
    </button>]) : '',

        values.type === 'normal' ? (
                [<div className={'row mb-20'}>
                    <div className={'col-md-6'}>
                        <SelectInput
                            fullWidth

                            label={translate('product.stock')}
                            // record={scopedFormData}

                            source={'in_stock'}

                            choices={typeChoices3}
                            // formClassName={cls.f2}
                        />
                    </div>
                    <div className={'col-md-6'}>
                        <NumberInput
                            fullWidth

                            source={'quantity'}

                            label={translate('product.quantity')}
                            // record={scopedFormData}
                        />
                    </div>
                </div>,
                    <div className={'row mb-20'}>
                        <div className={'col-md-6'}>
                            <TextInput
                                fullWidth
                                // record={scopedFormData}

                                source={'price'}
                                className={'ltr'}

                                label={translate('product.price')}
                                format={v => {
                                    if (!v) return;

                                    return v.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                                }}
                                parse={v => {
                                    if (!v) return;

                                    return v.toString().replace(/,/g, '');

                                }}

                            />
                        </div>
                        <div className={'col-md-6'}>
                            <TextInput
                                fullWidth
                                // record={scopedFormData}

                                source={'salePrice'}
                                className={'ltr'}

                                label={translate('product.salePrice')}
                                format={v => {
                                    if (!v) return;

                                    return v.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                                }}
                                parse={v => {
                                    if (!v) return;

                                    return v.toString().replace(/,/g, '');

                                }}

                            />
                        </div>
                    </div>]
            ) :
            values.type === 'variable' ? (
                <ArrayInput source="combinations" label={translate('product.combinations')}>
                    <SimpleFormIterator {...values} disableRemove disableAdd>
                        <FormDataConsumer>
                            {({getSource, scopedFormData}) => {
                                // console.log('scopedFormData', scopedFormData);
                                return (
                                    <div className={'row'}>
                                        <div className={'col-md-3'}>
                                            <ShowOptions source={getSource('options')} label="" sortable={false}
                                                         record={scopedFormData}
                                            />
                                        </div>
                                        <div className={'col-md-3'}>

                                            <SelectInput
                                                label={translate('product.stock')}
                                                source={getSource('in_stock')}
                                                choices={typeChoices2}
                                                record={scopedFormData}

                                            />
                                        </div>
                                        <div className={'col-md-3'}>

                                            <NumberInput
                                                fullWidth
                                                source={getSource('quantity')}
                                                record={scopedFormData}

                                                label={translate('product.quantity')}
                                            />
                                        </div>
                                        <div className={'col-md-3 ltr'}>
                                            {/*<FunctionField label="قیمتس"*/}
                                            {/*render={record => {*/}
                                            {/*console.log('record',record);*/}
                                            {/*return ( )*/}
                                            {/*}*/}
                                            {/*}/>*/}
                                            <TextInput
                                                fullWidth
                                                record={scopedFormData}
                                                className={'ltr'}
                                                value={'fds'}
                                                source={getSource('price')}
                                                format={v => {
                                                    if (!v) return;

                                                    return v.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                                                }}
                                                parse={v => {
                                                    if (!v) return;

                                                    return v.toString().replace(/,/g, '');

                                                }}
                                                // parse={e=>{
                                                //     console.log('e',e);
                                                //     return e.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}
                                                // validate={[required()]}
                                                label={translate('product.price')}
                                            />
                                        </div>


                                        <div className={'col-md-3'}>

                                            <TextInput
                                                fullWidth
                                                className={'ltr'}

                                                source={getSource('salePrice')}
                                                record={scopedFormData}
                                                format={v => {
                                                    if (!v) return;
                                                    return v.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                                                }}
                                                parse={v => {
                                                    if (!v) return;

                                                    return v.toString().replace(/,/g, '');

                                                }}
                                                label={translate('product.salePrice')}
                                            />
                                        </div>
                                    </div>
                                )
                            }
                            }
                        </FormDataConsumer>
                    </SimpleFormIterator>
                </ArrayInput>

            ) : ''
    ];
    // }
    // else
    //     return <></>;
    // }
    // return <button onClick={(e) => {
    //     handleAdd();
    // }}>افزودن ویژگی
    // </button>


};
