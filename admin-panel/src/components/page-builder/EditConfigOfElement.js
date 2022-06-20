import React, { useState } from "react";
import { Button } from "@mui/material";
import { Draggable, Dropzone } from "react-page-maker";
import { BlockPicker } from "react-color";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import CustomModal from "@/components/CustomModal";

const EditConfigOfElement = (props) => {
  const [modal, setModal] = useState(false);
  const { defaultForm } = props;
  // let defaultFormArr = Object.keys(defaultForm);

  const toggleBox = (e) => {
    e.preventDefault();
    console.log("box");
    console.log("EditConfigOfElement props", props);
    // let temp=modal;
    setModal(!modal);
    // return !temp;
  };
  console.log("defaultForm", defaultForm);
  if (!defaultForm) {
    return <></>;
  }
  return ([<CustomModal {...props} className={"page-editor-modal"} open={modal} onClose={e => toggleBox(e)} key={1}>{
    defaultForm.map((er, r) => {
      console.log('er',er);
      if (er.type === "color") {
        return <BlockPicker
          color={er.defaultValue || "#ccc"}
          onChangeComplete={(e)=>{}}
        />;
      }else if (er.type === "select-options") {
        return <select>
          <option></option>
        </select>;
      }else if (er.type === "text") {
        return <input defaultValue={er.defaultValue} name={er.name} placeholder={er.label}/>;
      } else
        return <input defaultValue={er.defaultValue}/>;
    })

  }</CustomModal>,
    <Button onClick={(e) => toggleBox(e)} key={2}>
      <SettingsApplicationsIcon/>

    </Button>
  ]);
};
//
// DraggableLayout.propTypes = {
//   id: PropTypes.string.isRequired,
//   showBasicContent: PropTypes.bool.isRequired
// };

export default EditConfigOfElement;
