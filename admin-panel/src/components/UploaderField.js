import React from 'react';
import {LinearProgress} from '@mui/material';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import {FileField,ImageField,ImageInput, FileInput, useInput} from 'react-admin';
import API, {BASE_URL} from '@/functions/API';
import {showFiles} from '@/components';
import {useFormState} from 'react-final-form';

API.defaults.headers.common['Content-Type'] = 'multipart/form-data';

export default (props) => {
    // console.clear();
    let {values} = useFormState();
    // console.log('props.photos',values.photos);
    let {input} = useInput(props);
    // const [v, setV] = React.useState([]);
    let [gallery, setGallery] = React.useState(values.photos || []);
    let [progress, setProgress] = React.useState(0);
    let [v, setV] = React.useState(values.thumbnail || '');

    React.useEffect(() => {
        // console.log('React.useEffect UploaderField');
        if (input.value) setV(input.value);
    }, []);
    React.useEffect(() => {
        // console.log('React.useEffect gallery', gallery);

    }, [gallery]);
    React.useEffect(() => {
        // console.log('React.useEffect props',values);

    }, [values]);
    const handleUpload = (files) => {
        // console.log('hanfleUpload');
        let file = files[0];

        if (!file) return;

        let formData = new FormData();
        formData.append('file', file);
        formData.append('type', file.type);
        API.post('/admin/product/fileUpload', formData, {
            onUploadProgress: (e) => {
                let p = Math.floor((e.loaded * 100) / e.total);
                setProgress(p);
            },
        })
            .then(({data = {}}) => {
                if (data.success) {
                    let {url, type, _id} = data.media;
                    let a = [...values.photos, {url, type, _id}];
                    // setV(a);
                    setProgress(0);
                    gallery.push(url);
                    console.log('gallery', gallery);
                    if (data.media && data.media.url) {
                        // setV([]);
                        // localStorage.files = [];
                        setGallery(gallery);
                        values.photos=gallery;
                        props.inReturn(gallery)
                    }
                    // console.log('props',props);
                }
            })
            .catch((err) => {
                console.log('error', err);
                setProgress(0);
            });
    };
    const deletFromObject = (e, photo, key) => {
        e.preventDefault();
        // console.log('deletFromObject');
        var cc = [];
        // console.log('values.photos',values.photos);

        gallery.forEach((item) => {
            if (item !== photo) {
                cc.push(item);
            }
        });
        setGallery(cc);
        setProgress(0);
        props.setPhotos(cc);

        // console.log('values.photos',values.photos);

    };
    const removeK = (g) => {
        // e.preventDefault();
        var c = [];
        gallery.map((gal, t) => {
            if (g !== t)
                c.push(gal);
        });
        // console.log('g', g);
        setGallery(c);
    };

    // React.useEffect(() => {
    //     // console.log('set localStorage');
    //     // localStorage.files = JSON.stringify(v);
    // }, [v]);
    // console.log('props', props);
    // console.log('input', input);
    // console.log('values.photos', values.photos);
    return (
        <>
            <ImageInput
                {...props}
                {...input}
                options={{
                    onDrop: handleUpload
                }}>
                <ImageField
                    source="src"
                    title="title"
                    target="_blank"
                    rel="noreferrer noopener"
                />
            </ImageInput>
            <div className={'galley'}>
                {(gallery && gallery.length>0)  && gallery.map((photo, key) => {
                    // console.log('photo', photo);
                    // console.log('v', v);
                    return <div key={key} className={'hytrdf ' + (v === photo ? 'active' : '')}><img onClick={() => {
                        props.thep(photo);
                        setV(photo)
                    }} src={BASE_URL + '/' + photo}/>
                        <div className={'bottom-actions'}><Button
                            onClick={(e) => deletFromObject(e, photo, key)}>delete</Button></div>
                    </div>
                })}

            </div>
            {progress ? (
                <LinearProgress variant="determinate" value={progress}/>
            ) : null}
            {/*{gallery && gallery.map((gal, g) => {*/}
                {/*return (<div key={g} className={'hgfdsdf'}><Button color="primary" size="small" onClick={() => {*/}
                    {/*removeK(g)*/}
                {/*}}><DeleteIcon/></Button><img*/}
                    {/*src={BASE_URL + "/" + gal}/></div>);*/}
            {/*})}*/}

        </>
    );
};
