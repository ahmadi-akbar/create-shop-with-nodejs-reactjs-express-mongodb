import React from 'react';
import {useRecordContext,useTranslate,TextField} from 'react-admin';
import API from '@/functions/API';

API.defaults.headers.common['Content-Type'] = 'multipart/form-data';

export default ({}) => {
  const record = useRecordContext();
  const translate = useTranslate();

    return (
        <>
<<<<<<< HEAD
          {record.title && <a target={'_blank'} href={'https://gameboss.shop/p/'+record._id+'/'+record.title[translate('lan')]}><TextField source={"title."+translate('lan')} label={translate('pos.title')} sortable={false}/></a>}
=======
          {record.title && <a target={'_blank'} href={'http://localhost:3001/p/'+record._id+'/'+record.title[translate('lan')]}><TextField source={"title."+translate('lan')} label={translate('pos.title')} sortable={false}/></a>}
>>>>>>> 496de9eb5f488a591bacfd6f8d28b7e365dbd606
        </>
    );

};
