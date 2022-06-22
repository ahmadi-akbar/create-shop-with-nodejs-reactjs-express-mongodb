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
<<<<<<< HEAD
=======
import CloseIcon from '@mui/icons-material/Close';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
>>>>>>> 496de9eb5f488a591bacfd6f8d28b7e365dbd606
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
<<<<<<< HEAD
      <i className="material-icons">close</i>{t("out of stock")}</div>
  }
  if(item.type==='normal'){
    if(item.quantity===0 || !item.in_stock)
      return <div className={'outOfStock '+item.type}><i className="material-icons">close</i>{t("out of stock")}</div>
=======
      <CloseIcon/>{t("out of stock")}</div>
  }
  if(item.type==='normal'){
    if(item.quantity===0 || !item.in_stock)
      return <div className={'outOfStock '+item.type}><CloseIcon/>{t("out of stock")}</div>
>>>>>>> 496de9eb5f488a591bacfd6f8d28b7e365dbd606
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
<<<<<<< HEAD
      return <div className={'outOfStock variablestock'}><i className="material-icons">close</i>{t("out of stock")}</div>
=======
      return <div className={'outOfStock variablestock'}><CloseIcon/>{t("out of stock")}</div>
>>>>>>> 496de9eb5f488a591bacfd6f8d28b7e365dbd606
    }
  }

  return (
    <div className="AddToCardButton">
      {(count !== 0) && <Button size="md" className={'kjhgfgh'} theme="primary">
<<<<<<< HEAD
        <i className="material-icons left" onClick={(e) => {
          removeItem(item);
        }}>remove</i>
        {count}
        <i className="material-icons" onClick={(e) => {
          // console/.log('item',item);
          // return;
=======
        <RemoveCircleOutlineIcon className={"left"} onClick={(e) => {
          removeItem(item);
        }} />
        {count}
        <AddCircleOutlineIcon className={""} onClick={(e) => {
>>>>>>> 496de9eb5f488a591bacfd6f8d28b7e365dbd606
          addItem(item).then((x)=>{
            toast(t('Added to cart successfully!'), {
              type: 'success'
            })
          });
<<<<<<< HEAD

        }}>add</i>
      </Button>}
      {count === 0 &&
      <Button size="md" className={'kjhgfgh'} theme="primary" onClick={(e) => {
=======
        }} />
      </Button>}
      {count === 0 &&
      <Button size="md" className={'kjhgfgh empty-card'} theme="primary" onClick={(e) => {
>>>>>>> 496de9eb5f488a591bacfd6f8d28b7e365dbd606
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
<<<<<<< HEAD
        {!item.single && <i className="material-icons center">shopping_cart</i>}
=======
        {!item.single && <ShoppingBagIcon className="center"/>}
>>>>>>> 496de9eb5f488a591bacfd6f8d28b7e365dbd606
        {item.single && <span>{t("add to cart")}</span>}
      </Button>}
      {children}
    </div>
  );
}

export default withTranslation()(AddToCardButton);
