import { Edit, RefreshButton, ShowButton,useRecordContext } from "react-admin";
import CardActions from "@mui/material/CardActions";
import Form from "./productForm";

import TelegramPushPostButton from "@/components/TelegramPushPostButton";

const PostEditActions = ({ basePath, data, resource }) => (
  <CardActions>
    <ShowButton record={data}/>
    <RefreshButton/>
    <TelegramPushPostButton record={data}/>

  </CardActions>
);
const edit = (props) => {
  return(
    <Edit actions={<PostEditActions/>} {...props}>
      <Form>

      </Form>
    </Edit>
  );
}


export default edit;
