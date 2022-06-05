import React from 'react';
import {ReferenceInput, SelectInput, useInput} from 'react-admin';
import API from '@/functions/API';

API.defaults.headers.common['Content-Type'] = 'multipart/form-data';
var ckjhg = {};
var hasTriggered = false;
export default (props) => {
    // console.log('props.record.options', props.record.options);
    // const {input} = useInput(props);
    // const [v, setV] = React.useState([]);
    // const [g, setG] = React.useState([]);
    // const [d, setD] = React.useState([]);
    // const [progress, setProgress] = React.useState(0);

    // React.useEffect(() => {
    //
    //     getData();
    //     // if (input.value) setV(input.value);
    // }, []);

    // console.log('Object.keys(props.record.options)', Object.keys(props.record.options));
    return (
        <>

            {props.record && props.record.options && Object.keys(props.record.options).map((item, index) => {
                return <div key={index}>{(item) + " : " + props.record.options[item] + "\n"}</div>;
            })}
        </>
    );

};
