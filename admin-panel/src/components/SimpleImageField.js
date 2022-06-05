import React from 'react';
import {useRecordContext} from 'react-admin';
import API from '@/functions/API';
import {ShopURL} from '@/functions/API';


API.defaults.headers.common['Content-Type'] = 'multipart/form-data';

export default ({}) => {
  const record = useRecordContext();

    return (
        <div className={'thumbnail'}>
            {record.thumbnail && <img src={ShopURL+'/'+record.thumbnail}
                                      srcSet={ShopURL + "/" + record.thumbnail}
            />}

        </div>
    );
};
