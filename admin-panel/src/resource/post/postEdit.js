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
import Form from "./postForm";

export const postEdit = (props) => {
  console.log('props',props);
  const translate=useTranslate();
  return(
    <Edit {...props}>
     <Form></Form>
    </Edit>
  );
}

export default postEdit;
