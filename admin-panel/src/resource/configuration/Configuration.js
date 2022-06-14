import * as React from "react";
import { useState } from "react";
// import { useLocation } from 'react-router-dom';
import { useForm } from "react-hook-form";
import API, { BASE_URL } from "@/functions/API";
import { ColorPicker, ShowImageField } from "@/components";
import { Box, Card, CardActions, CircularProgress } from "@mui/material";
import {useRefresh, Form, ImageField, ImageInput, SaveButton, TextInput, useNotify, useTranslate } from "react-admin";
// import {  } from 'react-hook-form';
const Configuration = (props) => {
  const refresh = useRefresh();
  const { register, handleSubmit, formState: { errors }, setValue, getValues } = useForm({
    defaultValues: {
      title: "",
      primaryColor: "#ee811d",
      secondaryColor: "#2d3488",
      textColor: "#000000",
      bgColor: "#ffffff",
      footerBgColor: "#ffffff"
    }
  });
  // const { setValue } = useFormContext();
  // const theTitle = useWatch({ name: "title" });

  // const {
  //   register,
  //   formState: { errors },
  // } = useFormContext();
  // register("title", { value: "data" });
  // console.log(watch("title"));
  // watch("title");
  // console.log("watch", watch('title'));

  const [loading, setLoading] = useState(false);
  let [counter, setCounter] = useState(0);
  // const [color, setColor] = React.useState({
  //   primaryColor: "#ee811d",
  //   secondaryColor: "#2d3488",
  //   textColor: "#000000",
  //   bgColor: "#ffffff",
  //   footerBgColor: "#ffffff"
  // });

  const [theData, setTheData] = React.useState(false);
  const translate = useTranslate();
  const notify = useNotify();
  // const login = useLogin();
  // const location = useLocation();
  const setTheColor = (t, e) => {
    console.log(t, e.hex);
    setValue(t, e.hex);
    setCounter(counter++);
    // console.log("getValuszses", getValues());
    // color[t] = e.hex;
    // console.log('{...color}',{...color});
    // setColor({ ...color });
  };
  const setTheValue = (e) => {
    console.log(e.target.value);
  };
  const handleNotif = (t,type='success') => {
    notify((t), { type: type });
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
      .then(p=>{
        setLoading(false);
        console.log(p);
        window.location.reload();
        // refresh();/
        // setCounter(counter++);
        // setTheData({...theData})
        handleNotif("resources.settings.logoUploadedSuccessfully");
      });
  };
  React.useEffect(() => {
    console.log("getData", getData());

    // setCombs(record);
  }, []);
  // React.useEffect(() => {
  //   console.log("theData", theData);

  // setCombs(record);
  // }, [theData]);
  const getData = () => {

    setLoading(true);

    API.get("/settings/configuration").then(({ data = {} }) => {
      setLoading(false);
      Object.keys(data).forEach(d => {
        setValue(d, data[d]);
      });
      // console.log(d);

      // setValue("title",data.title);
      setTheData(true);
      return data;
    });
  };

  const handleChange = (t, value) => {
    setValue(t, value);
    // setTheData({ ...theData, title: event.target.value });
  };

  const onSubmit = (theData) => {
    console.clear();
    console.log("data", theData);

    API.put("/settings/configuration", JSON.stringify(
      theData
    )).then(({ data = {} }) => {
      setLoading(false);
      // setTheData(data);
      console.log("data", data);
      if(data.success) {
        handleNotif("resources.settings.UpdatedSuccessfully");

      }else{
        handleNotif("resources.settings.sthWrong","error");

      }
      return data;

    });
  };


  if(!theData){
    return <></>;
  }
  if(theData) {
    let {
      _id, logo, title, ADMIN_ROUTE, BASE_URL, SHOP_URL, ADMIN_URL,
      primaryColor,
      secondaryColor,
      bgColor,
      textColor,
      footerBgColor
    } = getValues();
    return (
      <Form onSubmit={handleSubmit(onSubmit)} noValidate {...props}>
        <Box>
          <Card sx={{ padding: "1em" }}>
            <Box>
              <Box>

                <div className={"row"}>


                  <div className={"col-md-3"}>
                    <label className={"the-label"}>

                      {translate("resources.settings.currentLogo")}
                    </label>
                    <ShowImageField photo={logo} className={"width100"} deleteFunction={false}/>
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

                <TextInput
                  autoFocus
                  fullWidth
                  label={translate("resources.settings.title")}
                  source="title"
                  disabled={loading}
                  defaultValue={title}
                  onChange={(event) => {
                    handleChange("title", event.target.value);
                  }}
                />

              </Box>
              <Box>
                <TextInput
                  autoFocus
                  className={"ltr"}
                  source="BASE_URL"
                  label={("BASE_URL")}
                  disabled={loading}
                  // validate={required()}
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
                  // validate={required()}
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
                  // validate={required()}
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
                  // validate={required()}
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
                    <ColorPicker
                      className={"input-color"}
                      color={primaryColor}
                      onChange={(e) => setTheColor("primaryColor", e)}

                      placement="right"
                    />
                  </div>
                  <div className={"col-md-2"}>
                    <label className={"the-label"}>

                      {translate("resources.settings.secondaryColor")}
                    </label>
                    <ColorPicker
                      className={"input-color"}

                      color={secondaryColor}
                      onChange={(e) => setTheColor("secondaryColor", e)}

                      placement="right"
                    />
                  </div>
                  <div className={"col-md-2"}>
                    <label className={"the-label"}>
                      {translate("resources.settings.textColor")}
                    </label>
                    <ColorPicker
                      className={"input-color"}
                      color={textColor}
                      onChange={(e) => setTheColor("textColor", e)}

                      placement="right"
                    />
                  </div>
                  <div className={"col-md-2"}>
                    <label className={"the-label"}>
                      {translate("resources.settings.bgColor")}
                    </label>
                    <ColorPicker
                      className={"input-color"}

                      color={bgColor}
                      onChange={(e) => setTheColor("bgColor", e)}

                      placement="right"
                    />
                  </div>
                  <div className={"col-md-2"}>
                    <label className={"the-label"}>
                      {translate("resources.settings.footerBgColor")}
                    </label>
                    <ColorPicker
                      className={"input-color"}

                      color={footerBgColor}
                      onChange={(e) => setTheColor("footerBgColor", e)}
                      placement="right"
                    />
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
                alwaysEnable
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
  }
};


export default Configuration;
