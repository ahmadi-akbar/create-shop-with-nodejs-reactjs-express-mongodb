import {
  Create,
  DeleteButton,
  SaveButton,
  SelectInput,
  TextInput,
  Toolbar,
  useForm,
  Edit,
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
} from "@/components";
import { makeStyles } from "@mui/styles";
import { Val } from "@/Utils";
import React from "react";
import { RichTextInput } from "ra-input-rich-text";
<<<<<<< HEAD
=======
import Form from "./postForm";
>>>>>>> 496de9eb5f488a591bacfd6f8d28b7e365dbd606

export const postEdit = (props) => {
  console.log('props',props);
  const translate=useTranslate();
  return(
    <Edit {...props}>
<<<<<<< HEAD
      <SimpleForm>
        <TextInput disabled source="id"/>
        <TextInput source={"title." + translate("lan")} fullWidth label={translate("resources.post.title")}
                   className={"width100 mb-20"}/>
        <TextInput source="slug" fullWidth label={translate("resources.post.slug")} className={"width100 mb-20 ltr"}/>
        <TextInput multiline fullWidth source="excerpt" label={translate("resources.post.excerpt")}/>
        <RichTextInput multiline fullWidth source="description" label={translate("resources.post.description")}/>
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
      </SimpleForm>
=======
     <Form></Form>
>>>>>>> 496de9eb5f488a591bacfd6f8d28b7e365dbd606
    </Edit>
  );
}

export default postEdit;
