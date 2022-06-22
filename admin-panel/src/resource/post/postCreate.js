import {
  Create,
  DeleteButton,
  SaveButton,
  SelectInput,
  TextInput,
  Toolbar,
  useForm,
  useRecordContext,
  useTranslate
} from "react-admin";
import API, { BASE_URL } from "@/functions/API";
import { dateFormat } from "@/functions";
import _ from "lodash";
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
<<<<<<< HEAD
} from "@/components";
import { makeStyles } from "@mui/styles";
import { Val } from "@/Utils";
import React from "react";
import { RichTextInput } from "ra-input-rich-text";

let valuess = { "photos": [], "files": [], thumbnail: "" };

function setPhotos(values) {
  console.log("setPhotos", values);
  valuess["photos"] = values;
}

function save(values) {
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

  console.log("last values: ", values);
  // return;
  if (values._id) {
    // delete values.photos;
    delete values.category;
    delete values.catChoosed;
    delete values.files;
    console.log("last values (edit): ", values);

    API.put("/post/" + values._id, JSON.stringify({ ...values }))
      .then(({ data = {} }) => {
        // const refresh = useRefresh();
        // refresh();
        // alert('it is ok');
        // showNotification(translate('post.updated'));
        window.location.reload();
        if (data.success) {
          values = [];
          valuess = [];
        }
      })
      .catch((err) => {
        console.log("error", err);
      });
  } else {
    if (valuess.photos) {
      values.photos = valuess.photos;
    }
    if (valuess.files) {
      values.files = valuess.files;
    }
    API.post("/post/", JSON.stringify({ ...values }))
      .then(({ data = {} }) => {
        // showNotification(translate('post.created'));
        if (data._id) {
          window.location.href = "/#/post/" + data._id;
          values = [];
          valuess = [];
        }
      })
      .catch((err) => {
        console.log("error", err);
      });
  }
}

const CustomToolbar = props => (
  <Toolbar {...props} className={"dfghjk"}>
    <SaveButton/>
    <DeleteButton mutationMode="pessimistic"/>
  </Toolbar>
);
const Form = ({ children, ...props }) => {
  console.log("vprops", props);
  // save={save}
  const translate = useTranslate();
  // const record = useRecordContext();
  // if (record)
  //   valuess["photos"] = record.photos || [];
  return (
    <SimpleForm {...props} toolbar={<CustomToolbar/>} onSubmit={save} className={"d-flex"}>
      {/*<TabbedDatagrid/>*/}
      <TextInput source={"title." + translate("lan")} fullWidth label={translate("resources.post.title")}
                 className={"width100 mb-20"}
                 validate={Val.req}/>

      <div className={"mb-20"}></div>
      <div className={"mb-20"}></div>

      <TextInput source="slug" fullWidth label={translate("resources.post.slug")} className={"width100 mb-20 ltr"}/>
      <TextInput multiline fullWidth source="excerpt" label={translate("resources.post.excerpt")}/>
      <RichTextInput multiline fullWidth source="description" label={translate("resources.post.description")}/>

      <div className={"mb-20"}></div>

      <SelectInput
        label={translate("resources.post.kind")}
        defaultValue={"post"}
        source="kind"
        choices={[
          { id: "post", name: translate("resources.post.post") },
          { id: "page", name: translate("resources.post.page") }
        ]}
      />
      <SelectInput
        label={translate("resources.post.status")}
        defaultValue={"processing"}
        source="status"
        choices={[
          { id: "published", name: translate("resources.post.published") },
          { id: "processing", name: translate("resources.post.processing") },
          { id: "deleted", name: translate("resources.post.deleted") }
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
=======

} from "@/components";
import { makeStyles } from "@mui/styles";
import { Val } from "@/Utils";
import Form from "./postForm";

import React from "react";
>>>>>>> 496de9eb5f488a591bacfd6f8d28b7e365dbd606


const create = (props) => (
  <Create {...props}>
    <Form>


    </Form>
  </Create>
);

export default create;
