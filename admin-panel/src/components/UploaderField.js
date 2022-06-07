import React,{useState,useEffect} from "react";
import { LinearProgress } from "@mui/material";
import Button from "@mui/material/Button";
import { ImageField, ImageInput, useInput } from "react-admin";
import API, { BASE_URL } from "@/functions/API";
import { showFiles } from "@/components";
import { useWatch } from "react-hook-form";

API.defaults.headers.common["Content-Type"] = "multipart/form-data";

export default (props) => {
  // console.clear();
  // console.log("props", props);
  let valuesphotos = useWatch({ name: "photos" });
  let valuesthumbnail = useWatch({ name: "thumbnail" });

  // let {values} = useFormState();
  let { field } = useInput(props);
  // console.log("input", field);

  const [gallery, setGallery] = useState(valuesphotos || []);
  const [progress, setProgress] = useState(0);
  console.log('props.photos',valuesthumbnail);

  const [v, setV] = useState(valuesthumbnail || "");
  console.log('props.v',v);

  useEffect(() => {
    console.log('React.useEffect UploaderField');
    if (field.value) setV(field.value);
  }, []);

  const handleUpload = (files) => {
    // console.log('hanfleUpload');
    let file = files[0];

    if (!file) return;

    let formData = new FormData();
    formData.append("file", file);
    formData.append("type", file.type);
    API.post("/admin/product/fileUpload", formData, {
      onUploadProgress: (e) => {
        let p = Math.floor((e.loaded * 100) / e.total);
        setProgress(p);
      }
    })
      .then(({ data = {} }) => {
        if (data.success) {
          let { url, type, _id } = data.media;
          let a = [...valuesphotos, { url, type, _id }];

          setProgress(0);
          gallery.push(url);
          console.log("gallery", gallery);
          if (data.media && data.media.url) {
            setGallery(gallery);
            valuesphotos = gallery;
            props.inReturn(gallery);
          }
          // console.log('props',props);
        }
      })
      .catch((err) => {
        console.log("error", err);
        setProgress(0);
      });
  };
  const deletFromObject = (e, photo, key) => {
    e.preventDefault();
    // console.log('deletFromObject');
    let cc = [];
    // console.log('valuesphotos',valuesphotos);

    gallery.forEach((item) => {
      if (item !== photo) {
        cc.push(item);
      }
    });
    setGallery(cc);
    setProgress(0);
    props.setPhotos(cc);

    // console.log('valuesphotos',valuesphotos);

  };
  const removeK = (g) => {
    // e.preventDefault();
    let c = [];
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
  // console.log('valuesphotos', valuesphotos);
  return (
    <>
      <ImageInput
        {...props}
        {...field}
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
      <div className={"galley"}>
        {(gallery && gallery.length > 0) && gallery.map((photo, key) => {
          console.log('photo', valuesthumbnail);
          console.log('v', v);
          return <div key={key} className={"hytrdf " + (v === photo ? "active" : "")}><img onClick={() => {
            props.thep(photo);
            setV(photo);
          }} src={BASE_URL + "/" + photo}/>
            <div className={"bottom-actions"}><Button
              onClick={(e) => deletFromObject(e, photo, key)}>delete</Button></div>
          </div>;
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
