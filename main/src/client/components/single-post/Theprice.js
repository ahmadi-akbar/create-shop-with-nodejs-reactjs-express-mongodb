import React from 'react';
import {withTranslation} from 'react-i18next';
import {addBookmark, arrayMin, getContactData} from '#c/functions/index';
import {store} from "#c/functions/store";

import {dFormat, PriceFormat} from '#c/functions/utils';

class Theprice extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      // phoneNumber: '',
      // email: '',
      // lan: store.getState().store.lan,
      // optionsId: {},
      // combinationsTemp: {},

    };
  }


  render() {
    let {price, salePrice, t, className, combinations, type} = this.props;
    if (price) price = PriceFormat(price);
    if (salePrice) salePrice = PriceFormat(salePrice);

    let array_price = [];
    if (combinations && combinations.length>0) {
      price = null;
      salePrice = null;
      combinations.map((comb) => {
        let pri=parseInt(comb.price);
        let spri=parseInt(comb.salePrice);
        if (comb.in_stock)
          if (spri && spri != null && spri > 0)
            array_price.push((spri));
          else if (pri && pri != null && pri > 0)
            array_price.push((pri));

      });
      // console.log(array_price);
      // return 'از' + arrayMin(array_price);
      let min = arrayMin(array_price);
      if (min) {
        price = PriceFormat(min);
      }
    }
    if(price==0 || price==null ){
      return <></>;
    }
    return (
      <div className={'thePrice rtl ' + className}>
        <div className={'only-price'}> {Boolean(!salePrice && price!=null) &&
          <div className={'wer  mt-2 pandnotsp'}>
                <span className="card-non-title-item">
                          {(type === 'variable' && 'از ')}
                  {price + t(' UZS')}
                </span>
          </div>
        }</div>
        <div className={'with-sale-price'}>{Boolean(salePrice && salePrice!==null) && (
          <div className={'wer  mt-2 pandsp'}>
                <span className="card-non-title-item">
                  {salePrice + t(' UZS')}
                </span>
            <span className="card-non-title-item ml-2">
                  <del>{price + t(' UZS')}</del>
                </span>
          </div>
        )}
        </div>
      </div>
    );
  }
}

export default withTranslation()(Theprice);
