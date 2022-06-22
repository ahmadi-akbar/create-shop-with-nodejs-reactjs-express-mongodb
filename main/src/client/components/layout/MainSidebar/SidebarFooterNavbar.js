import React from 'react';
import {Navbar, NavbarBrand} from 'shards-react';
import {withTranslation} from 'react-i18next';

import {toggleSidebar} from '#c/functions/index';
import {useSelector} from 'react-redux';

import {logoImg} from '#c/assets/index';
<<<<<<< HEAD
=======
import CloseIcon from '@mui/icons-material/Close';
>>>>>>> 496de9eb5f488a591bacfd6f8d28b7e365dbd606


function SidebarFooterNavbar({t, hideLogoText = false}) {
  const menu = useSelector((st) => !!st.store.menuVisible);

  const handleToggleSidebar = () => toggleSidebar(menu);

  return (

    <Navbar
      className="align-items-stretch bg-white flex-md-nowrap footer-nav-bar p-0"
      type="light">

      <div
        className="toggle-sidebar d-sm-inline"
        onClick={handleToggleSidebar}>
<<<<<<< HEAD
        <i className="material-icons">close</i>
=======
        <CloseIcon/>
>>>>>>> 496de9eb5f488a591bacfd6f8d28b7e365dbd606
      </div>
    </Navbar>

  );
}

export default withTranslation()(SidebarFooterNavbar);
