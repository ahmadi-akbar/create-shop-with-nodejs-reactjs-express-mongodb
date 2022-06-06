import {Logout, toggleCardbar, toggleSearch} from '#c/functions/index';
import {useSelector} from 'react-redux';

import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {Collapse, DropdownMenu, DropdownToggle, NavLink} from "shards-react";
import {withTranslation} from 'react-i18next';
import store from "../../../functions/store";

function NavbarMobileButton({t}) {
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
    }
  }, []);
  const toggleProfileActions = () => {
    // console.log('toggleProfileActions');
    setVisible(!visible);

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

          </DropdownToggle>
          ,
          <Collapse tag={DropdownMenu} center={true} small={true} open={visible} key={1}>
            <Link

              className={'dropdown-item'}
              to={'/profile/'}>
              {t('profile')}

            </Link>
            <Link

              className={'dropdown-item'}
              to={'/my-orders/'}>
              {t('my orders')}


            </Link>
            <Link

              className={'dropdown-item'}
              to={'/wishlist/'}>
              {t('Wishlist')}


            </Link>
            <hr className={'logoutred'}/>
            <Link

              className={'dropdown-item logoutred'}
              to={'/'}
              onClick={() => {
                Logout();
              }}
            >
              {t('logout')}


            </Link>

          </Collapse>]}
        {(!user || !user.phoneNumber || !user.token) &&

        <Link
           to={'/login/'} className={'p-0 text-nowrap px-3 helldone dfghjiouyt marginauto'}>
          <i className="material-icons">person</i>
        </Link>

        }
      </div>,
        <div

          onClick={handleCard}
          className="nav-link posrel nav-link-icon  d-sm-inline d-md-inline  text-center"
          key={1}
        >
          <i className="material-icons">shopping_cart</i>
          {count != 0 && <span className={'badge'}>{count}</span>}
        </div>]
  );
}

export default withTranslation()(NavbarMobileButton);

