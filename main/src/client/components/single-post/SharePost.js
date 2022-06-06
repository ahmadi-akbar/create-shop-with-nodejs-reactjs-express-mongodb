import React from 'react';
import {MainUrl} from '#c/functions/index';
// import {toast} from "react-toastify/dist/index";
import {FormInput, InputGroup, InputGroupAddon, InputGroupText} from 'shards-react';
import * as NT from '#c/functions/NativeHelper';

import {toast} from 'react-toastify';
import {withTranslation} from 'react-i18next'

const SharePost = ({params,t, i18n}) => {
  // console.clear();
  // console.log('params', params);
  // console.log('photos', photos[0]);

  // const getShareLink = () => {
  //   return '/' + encodeURI(window.location.href);
  // }
  return (
    <InputGroup
      className="TextToCopydd mt-4"
      onClick={() => {
        NT.CopyToClipboard(window.location.href);
        toast.success(t('link copied!'));
      }}>
      <InputGroupAddon type="prepend">
        <InputGroupText>
          <i className="material-icons mr-1">share</i> {t('share')}
        </InputGroupText>
      </InputGroupAddon>
      <FormInput className="ltr" value={window.location.href} disabled/>
    </InputGroup>

  );
};

export default withTranslation()(SharePost);
