import React  from 'react';
import {Navbar} from 'shards-react';
import {withTranslation} from 'react-i18next';

import {toggleCardbar} from '#c/functions/index';

import {useSelector} from 'react-redux';

import {logoImg} from '#c/assets/index';
<<<<<<< HEAD

=======
import CloseIcon from '@mui/icons-material/Close';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
>>>>>>> 496de9eb5f488a591bacfd6f8d28b7e365dbd606

function CardbarMainNavbar({t, hideLogoText = false}) {
  const cardVisible = useSelector((st) => !!st.store.cardVisible);
  const card = useSelector((st) => st.store.card);


  const handleToggleCardbar = () => toggleCardbar(cardVisible);
  let count = 0;
  if (card && card.length) {
    count = card.length;
  }
  return (
    <div className="main-navbar">
      <Navbar
        className="align-items-stretch bg-white flex-md-nowrap border-bottom p-0"
        type="light">
        <div
          className="d-sm-inline "
        >
          <div className={'jhgfdfg'}>
<<<<<<< HEAD
            <i className="material-icons ddds">shopping_cart</i>
=======
            <ShoppingBagIcon/>
>>>>>>> 496de9eb5f488a591bacfd6f8d28b7e365dbd606
            {count}<span className={'ml-1 mr-2'}>{t('item')}</span>
          </div>
        </div>
        {/* eslint-disable-next-line */}
        <div
          className="toggle-sidebar d-sm-inline"
          onClick={handleToggleCardbar}>
<<<<<<< HEAD
          <i className="material-icons">close</i>
=======
          <CloseIcon/>
>>>>>>> 496de9eb5f488a591bacfd6f8d28b7e365dbd606
        </div>
      </Navbar>
    </div>
  );
}

export default withTranslation()(CardbarMainNavbar);
