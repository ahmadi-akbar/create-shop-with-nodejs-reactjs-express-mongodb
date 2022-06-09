import React, { useEffect, useState } from "react";
import { LinearProgress } from "@mui/material";
import Button from "@mui/material/Button";
import { ImageField, ImageInput, useInput } from "react-admin";
import API, { BASE_URL } from "@/functions/API";
import { showFiles } from "@/components";
import { useWatch } from "react-hook-form";
import DeleteIcon from "@mui/icons-material/Delete";

API.defaults.headers.common["Content-Type"] = "multipart/form-data";

export default (props) => {
  let {photo,v,onImageClick,deletFromObject,unicKey}=props;
  // console.log("Show///ImageField...",photo,unicKey);

  return <div className={"hytrdf " + (v === photo ? "active" : "")}>
    <img onClick={()=>onImageClick(photo)} src={BASE_URL + "/" + photo}/>
    <div className={"bottom-actions"}>
      <Button onClick={() => deletFromObject( photo, unicKey)}>
        <DeleteIcon/>
      </Button>
    </div>
  </div>;
};
