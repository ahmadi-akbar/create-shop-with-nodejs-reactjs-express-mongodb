import React, {useEffect, useState} from 'react';

import {Button} from 'shards-react';
import {withTranslation} from 'react-i18next';

import {dFormat, PriceFormat} from '#c/functions/utils';
import {addItem, MainUrl, removeItem} from '#c/functions/index';
import {defaultImg} from '#c/assets/index';
import {store} from "#c/functions/store";
import {useSelector} from 'react-redux';
import { useNavigate } from "react-router-dom"
import {toast} from "react-toastify";
function AddToCardButton({item, text = '',variable=false,children, t}) {
  let [count, setcount] = useState(0);
  let [Navigate, SetNavigate] = useState(null);
  let card = useSelector((st) => st.store.card || []);
  let history = useNavigate();
  // useEffect(() => {
  //   console.log('useEffect count...',count);
  //   return;
  //   // setcount(count);
  // }, [count]);
  // useEffect(() => {
  //   return;
  //   console.log('useEffect card...',card);
  //
  //   let find = false;
  //   card.map((isx, xs) => {
  //     if (isx._id === item._id) {
  //       find = true;
  //     }
  //   });
  //   if (!find) {
  //     count = 0;
  //     // setcount(count);
  //
  //   }
  // }, [card]);
  card.map((isx, xs) => {
    if (isx._id === item._id) {
      count = (isx.count);
    }
  });
  const refreshCard = ()=>{

  };
  if (Navigate) {
    console.log('Navigate',Navigate);
    // history(Navigate)
    // return <Navigate to={Navigate}/>;
  }
  if ((item.single && !item.in_stock) || (item.single && !item.quantity)) {
    return <div className={'outOfStock '+item.type}>
      <i className="material-icons">close</i>{t("out of stock")}</div>
  }
  if(item.type==='normal'){
    if(item.quantity===0 || !item.in_stock)
      return <div className={'outOfStock '+item.type}><i className="material-icons">close</i>{t("out of stock")}</div>
  }

  let mojud=false;
  if(variable && !item.single){
    if(item.combinations) {
      item.combinations.map((com) => {
        if (com.in_stock) {
          mojud = true;
        }
      })
    }
    if(!mojud){
      return <div className={'outOfStock variablestock'}><i className="material-icons">close</i>{t("out of stock")}</div>
    }
  }

  return (
    <div className="AddToCardButton">
      {(count !== 0) && <Button size="md" className={'kjhgfgh'} theme="primary">
        <i className="material-icons left" onClick={(e) => {
          removeItem(item);
        }}>remove</i>
        {count}
        <i className="material-icons" onClick={(e) => {
          // console/.log('item',item);
          // return;
          addItem(item).then((x)=>{
            toast(t('Added to cart successfully!'), {
              type: 'success'
            })
          });

        }}>add</i>
      </Button>}
      {count === 0 &&
      <Button size="md" className={'kjhgfgh'} theme="primary" onClick={(e) => {
        if (text && text === t('options') && !item.single) {
          let title=encodeURIComponent(item.title.fa.replace(/\\|\//g,''));
          SetNavigate('/p/' + item._id + '/' + title);
        }
        else {
          // console.log('item',item);
          // return;
          addItem(item).then((x) => {
            toast(t('Added to cart successfully!'), {
              type: 'success'
            })
          });
        }
      }}>
        {!item.single && <span>{text}</span>}
        {!item.single && <i className="material-icons center">shopping_cart</i>}
        {item.single && <span>{t("add to cart")}</span>}
      </Button>}
      {children}
    </div>
  );
}

export default withTranslation()(AddToCardButton);
