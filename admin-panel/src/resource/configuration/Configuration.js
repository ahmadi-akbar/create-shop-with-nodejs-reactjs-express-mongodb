import * as React from "react";
import { useState } from "react";
// import { useLocation } from 'react-router-dom';
import { useForm } from "react-hook-form";
import API, { BASE_URL } from "@/functions/API";
import { ShowImageField } from "@/components";
import { Form, ImageField, ImageInput, required, SaveButton, TextInput, useNotify, useTranslate } from "react-admin";
import InputColor from "react-input-color";

import { Box, Card, CardActions, CircularProgress, Input } from "@mui/material";

const Configuration = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  // register("title", { value: "data" });
  // console.log(watch("title"));
  // watch("title");

  const [loading, setLoading] = useState(false);
  const [color, setColor] = React.useState({});
  const [theData, setTheData] = React.useState({});
  const translate = useTranslate();
  const notify = useNotify();
  // const login = useLogin();
  // const location = useLocation();
  const handleNotif = (t) => {
    notify((t), { type: "success" });
  };
  const handleUpload = (files) => {
    // let GalleryTemp = gallery;
    // console.log("hanfleUpload");
    let file = files[0];

    if (!file) return;
    setLoading(true);
    let formData = new FormData();
    formData.append("file", file);
    formData.append("type", file.type);
    API.post("/settings/fileUpload", formData, {
      onUploadProgress: (e) => {
        // let p = Math.floor((e.loaded * 100) / e.total);
        // setProgress(p);
      }
    })
      .then(({ data = {} }) => {
        setLoading(false);
        console.log({ ...theData, ...data });
        // setTheData({...theData})
        handleNotif("resources.settings.logoUploadedSuccessfully");
      });
  };
  React.useEffect(() => {
    console.log("getData", getData());

    // setCombs(record);
  }, []);
  React.useEffect(() => {
    console.log("theData", theData);

    // setCombs(record);
  }, [theData]);
  const getData = () => {

    setLoading(true);

    API.get("/settings/configuration").then(({ data = {} }) => {
      setLoading(false);
      setTheData(data);
      return data;
    });
  };

  const handleChange = event => {
    setTheData({ ...theData, title: event.target.value })};

  const onSubmit = () => {


    API.put("/settings/configuration", JSON.stringify(
      {
        title: theData.title
      }
    )).then(({ data = {} }) => {
      setLoading(false);
      setTheData(data);
      console.log("data", data);
      return data;
    });
  };
  // const onSubmit = (auth) => {
  //   setLoading(true);
  //
  // };
  console.log("theData",  theData);
  if(!theData) return;
  let { _id, logo, title, ADMIN_ROUTE, BASE_URL, SHOP_URL,ADMIN_URL } = theData;
  return (
    <Form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Box>
        <Card sx={{ padding: "1em" }}>
          <Box>
            <Box>

              <div className={"row"}>


                <div className={"col-md-3"}>
                  <label className={"the-label"}>

                    {translate("resources.settings.currentLogo")}
                  </label>
                  <ShowImageField photo={logo} className={"width100"}/>
                </div>
                <div className={"col-md-9"}>
                  <ImageInput
                    className={"the-label show-image-uploader"}
                    source={"logo"}
                    label={translate("resources.settings.uploadLogo")}
                    accept="image/*"
                    options={{
                      onDrop: handleUpload
                    }}>
                    <ImageField
                      source="src"
                      title="title"
                    />
                  </ImageInput>
                </div>
              </div>
            </Box>
            <Box>

              {title && <TextInput
                autoFocus
                fullWidth
                label={translate("resources.settings.title")}

                source="title"
                disabled={loading}
                defaultValue={title}
                {...register('title')}
                onChange={(event)=>{handleChange(event)}}
              />}

            </Box>
            <Box>
              <TextInput
                autoFocus
                className={"ltr"}
                source="BASE_URL"
                label={("BASE_URL")}
                disabled={loading}
                validate={required()}
                fullWidth
                defaultValue={window.BASE_URL || BASE_URL}

              />
            </Box>
            <Box>
              <TextInput
                autoFocus
                className={"ltr"}

                source="SHOP_URL"
                label={("SHOP_URL")}
                disabled={loading}
                validate={required()}
                fullWidth
                defaultValue={window.SHOP_URL || SHOP_URL}

              />
            </Box>
            <Box>
              <TextInput
                autoFocus
                className={"ltr"}

                source="ADMIN_URL"
                label={("ADMIN_URL")}
                disabled={loading}
                validate={required()}
                fullWidth
                defaultValue={window.ADMIN_URL || ADMIN_URL}

              />
            </Box>
            <Box>
              <TextInput
                autoFocus
                source="ADMIN_ROUTE"
                className={"ltr"}

                label={("ADMIN_ROUTE")}
                disabled={loading}
                validate={required()}
                fullWidth
                defaultValue={window.ADMIN_ROUTE || ADMIN_ROUTE}

              />
            </Box>
            <Box>
              <div className={"row"}>
                <div className={"col-md-2"}>
                  <label className={"the-label"}>

                    {translate("resources.settings.primaryColor")}
                  </label>
                  <InputColor
                    className={"input-color width100"}
                    initialValue="#ee811d"
                    onChange={setColor}
                    placement="right"
                  />
                </div>
                <div className={"col-md-2"}>
                  <label className={"the-label"}>

                    {translate("resources.settings.secondaryColor")}
                  </label>
                  <InputColor
                    className={"input-color width100"}

                    initialValue="#2d3488"
                    onChange={setColor}
                    placement="right"
                  />
                </div>
                <div className={"col-md-2"}>
                  <label className={"the-label"}>
                    {translate("resources.settings.textColor")}
                  </label>
                  <InputColor
                    className={"input-color width100"}
                    initialValue="#000000"
                    onChange={setColor}
                    placement="right"
                  />
                </div>
                <div className={"col-md-2"}>
                  <label className={"the-label"}>
                    {translate("resources.settings.bgColor")}
                  </label>
                  <InputColor
                    className={"input-color width100"}

                    initialValue="#ffffff"
                    onChange={setColor}
                    placement="right"
                  />
                </div>
                <div className={"col-md-2"}>

                </div>
                <div className={"col-md-2"}>

                </div>
              </div>
            </Box>
            <Box>

            </Box>

          </Box>
          <CardActions sx={{ padding: "0 1em 1em 1em" }}>
            <SaveButton
              variant="contained"
              type="submit"
              color="primary"
              disabled={loading}
              // saving={onSubmit}
            >
              {loading && (
                <CircularProgress size={25} thickness={2}/>
              )}
              {translate("resources.settings.save")}
            </SaveButton>
          </CardActions>
        </Card>
      </Box>
    </Form>
  );

};


export default Configuration;
