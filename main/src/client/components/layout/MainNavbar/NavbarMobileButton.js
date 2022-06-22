<<<<<<< HEAD
import {Logout, toggleCardbar, toggleSearch} from '#c/functions/index';
import {useSelector} from 'react-redux';

import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {Collapse, DropdownMenu, DropdownToggle, NavLink} from "shards-react";
import {withTranslation} from 'react-i18next';
import store from "../../../functions/store";

function NavbarMobileButton({t}) {
=======
import { Logout, toggleCardbar, toggleSearch } from "#c/functions/index";
import { useSelector } from "react-redux";

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Collapse, DropdownMenu, DropdownToggle, NavLink } from "shards-react";
import { withTranslation } from "react-i18next";
import store from "../../../functions/store";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { logoImg } from "#c/assets/index";
import PersonIcon from "@mui/icons-material/Person";

function NavbarMobileButton({ t }) {
>>>>>>> 496de9eb5f488a591bacfd6f8d28b7e365dbd606
  // const searchform = useSelector((st) => !!st.store.searchvisible);
  const cardVisible = useSelector((st) => !!st.store.cardVisible);
  let [user, setuser] = useState(store.getState().store.user);

  let [count, setcount] = useState(0);
  let card = useSelector((st) => st.store.card || []);
  let [visible, setVisible] = useState(false);
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    return;

    // console.log('useEffect card', card);
    setcount(card.length);

  }, [card]);
  useEffect(() => {
    return;
    window.onscroll = () => {
      setOffset(window.pageYOffset);
      // console.log('setOffset', offset);
<<<<<<< HEAD
    }
=======
    };
>>>>>>> 496de9eb5f488a591bacfd6f8d28b7e365dbd606
  }, []);
  const toggleProfileActions = () => {
    // console.log('toggleProfileActions');
    setVisible(!visible);

<<<<<<< HEAD
  }
  // const handleClick = () => toggleSearch(searchform);
  const handleCard = () => toggleCardbar(cardVisible);
  {/*<nav className={"nav posabt  xtazin nonestf"}>*/}
  // </nav>
  return (
      [
      <div
        className="nav-link posrel nav-link-icon  d-sm-inline d-md-inline text-center" key={0}>
        {(user && user.phoneNumber && user.token) && [
          <DropdownToggle caret={false} tag={NavLink} dropup={"true"} className="text-nowrap px-3 helldone dfghjiouyt"
                          onClick={() => {
                            toggleProfileActions()
                          }} key={0}>
            <i className="material-icons">person</i>

=======
  };
  // const handleClick = () => toggleSearch(searchform);
  const handleCard = () => toggleCardbar(cardVisible);
  {/*<nav className={"nav posabt  xtazin nonestf"}>*/
  }
  // </nav>
  return (
    [
      <div
        className="nav-link NavbarMobileButton posrel nav-link-icon  d-sm-inline d-md-inline text-center" key={0}>
        {(user && user.phoneNumber && user.token) && [
          <DropdownToggle caret={false} tag={NavLink} dropup={"true"} className="text-nowrap px-3 mbu-navbar dfghjiouyt"
                          onClick={() => {
                            toggleProfileActions();
                          }} key={0}>
            <PersonIcon/>
>>>>>>> 496de9eb5f488a591bacfd6f8d28b7e365dbd606
          </DropdownToggle>
          ,
          <Collapse tag={DropdownMenu} center={true} small={true} open={visible} key={1}>
            <Link

<<<<<<< HEAD
              className={'dropdown-item'}
              to={'/profile/'}>
              {t('profile')}
=======
              className={"dropdown-item"}
              to={"/profile/"}>
              {t("profile")}
>>>>>>> 496de9eb5f488a591bacfd6f8d28b7e365dbd606

            </Link>
            <Link

<<<<<<< HEAD
              className={'dropdown-item'}
              to={'/my-orders/'}>
              {t('my orders')}
=======
              className={"dropdown-item"}
              to={"/my-orders/"}>
              {t("my orders")}
>>>>>>> 496de9eb5f488a591bacfd6f8d28b7e365dbd606


            </Link>
            <Link

<<<<<<< HEAD
              className={'dropdown-item'}
              to={'/wishlist/'}>
              {t('Wishlist')}


            </Link>
            <hr className={'logoutred'}/>
            <Link

              className={'dropdown-item logoutred'}
              to={'/'}
=======
              className={"dropdown-item"}
              to={"/wishlist/"}>
              {t("Wishlist")}


            </Link>
            <hr className={"logoutred"}/>
            <Link

              className={"dropdown-item logoutred"}
              to={"/"}
>>>>>>> 496de9eb5f488a591bacfd6f8d28b7e365dbd606
              onClick={() => {
                Logout();
              }}
            >
<<<<<<< HEAD
              {t('logout')}
=======
              {t("logout")}
>>>>>>> 496de9eb5f488a591bacfd6f8d28b7e365dbd606


            </Link>

          </Collapse>]}
        {(!user || !user.phoneNumber || !user.token) &&

        <Link
<<<<<<< HEAD
           to={'/login/'} className={'p-0 text-nowrap px-3 helldone dfghjiouyt marginauto'}>
          <i className="material-icons">person</i>
=======
          to={"/login/"} className={"p-0 text-nowrap px-3 mbu-navbar dfghjiouyt marginauto"}>
          <PersonIcon/>
>>>>>>> 496de9eb5f488a591bacfd6f8d28b7e365dbd606
        </Link>

        }
      </div>,
<<<<<<< HEAD
        <div

          onClick={handleCard}
          className="nav-link posrel nav-link-icon  d-sm-inline d-md-inline  text-center"
          key={1}
        >
          <i className="material-icons">shopping_cart</i>
          {count != 0 && <span className={'badge'}>{count}</span>}
        </div>]
=======
      <div

        onClick={handleCard}
        className="nav-link posrel nav-link-icon  d-sm-inline d-md-inline  text-center"
        key={1}
      >
        <div className={"p-0 text-nowrap px-3 mbu-navbar dfghjiouyt marginauto"}>
          <ShoppingBagIcon/>
          {count != 0 && <span className={"badge"}>{count}</span>}
        </div>
      </div>,
      <Link to="/">
        <div className={"p-0 text-nowrap px-3 mbu-navbar dfghjiouyt marginauto"}>
          {logoImg && <div className={"logo-wrapper-mobile-menu"}><img
            style={{ maxWidth: "45px", width: "44px", height: "35px"}} src={logoImg}
            alt="mainNavBar logo"/></div>}
        </div>
      </Link>
    ]
>>>>>>> 496de9eb5f488a591bacfd6f8d28b7e365dbd606
  );
}

export default withTranslation()(NavbarMobileButton);

