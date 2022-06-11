import React from "react";
import { useTranslate } from "react-admin";

import { BASE_URL } from "@/functions/API";
import { UploaderField } from "@/components";


const Configuration = () => {
  const translate = useTranslate();
  return (<UploaderField
    label={translate("resources.product.photo")}
    accept="image/*"
    source="photos"
    multiple={true}
    thep={theP}
    setPhotos={setPhotos}
    inReturn={thel}
  />);
};
export default Configuration;