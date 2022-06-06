import React from 'react';
import {withTranslation} from 'react-i18next';
import _truncate from 'lodash/truncate';
import {Link} from 'react-router-dom';
import Theprice from "#c/components/single-post/Theprice";

import {dFormat, PriceFormat} from '#c/functions/utils';
import {addItem, MainUrl, removeItem} from '#c/functions/index';
import {defaultImg} from '#c/assets/index';
import {store} from "#c/functions/store";
import AddToCardButton from "#c/components/components-overview/AddToCardButton";

function PostCard({onClick, item, t}) {
  // let card = store.getState().store.card || [];
  let date = dFormat(item.updatedAt, t);
  let price = null;
  let salePrice = null;
  if (item.price) price = PriceFormat(item.price);
  if (item.salePrice) salePrice = PriceFormat(item.salePrice);
  let backgroundImage = defaultImg;
  if (item.photos && item.photos[0])
    backgroundImage = MainUrl + "/" + item.photos[0];
  if (item.thumbnail)
    backgroundImage = MainUrl + "/" + item.thumbnail;
  let title = encodeURIComponent(item.slug);
  // console.log('item.labels', item.labels);
  return (
    <div
      className="mb-4 ad-card-col nbghjk "
    >
      <div
        className="ad-card-main-div rounded-circle"
      >
        {(item.labels && item.labels.length > 0) && <div className={'the-labels'}>{item.labels.map((lab, k) => {
          return <div className={'the-label'} key={k}>{lab && lab.title}</div>;
        })}</div>}
        <div
          className="card-post__image"
          onClick={onClick}
        ><Link to={'/p/' + item._id + '/' + title}><img alt={item.title} loading={'lazy'} src={
          backgroundImage || defaultImg
        }/></Link></div>

      </div>
      <div className={'item-miniTitle mt-2'}>{item.miniTitle}</div>

    </div>
  );
}

export default withTranslation()(PostCard);
