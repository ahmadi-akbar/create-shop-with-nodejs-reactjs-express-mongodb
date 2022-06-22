import React from 'react';
import clsx from 'clsx';
import {Container, Navbar} from 'shards-react';
import NavbarToggle from './NavbarToggle';
import SearchToggle from './SearchToggle';
import NavbarSearch from './NavbarSearch';
<<<<<<< HEAD
import {logoImg} from '#c/assets/index';
import { useSelector } from 'react-redux';

import MainCats from './NavbarNav/MainCats';
=======
import { useSelector } from 'react-redux';

import MainCats from './NavbarNav/MainCats';
import {logoImg} from '#c/assets/index';

>>>>>>> 496de9eb5f488a591bacfd6f8d28b7e365dbd606
import {Link} from 'react-router-dom';
// import Logo from '#c/images/logo-256x512.png';
import NavbarMobileButton from './NavbarMobileButton';

export default function MainMobileNavbar({layout, stickyTop = true, onChange}) {
  const classes = clsx('main-navbar main-mobile', 'bg-white', stickyTop && 'sticky-top');
  const searchform = useSelector((st) => !!st.store.searchvisible);

  // let searchform = '';
console.log("MainMobileNavbar",logoImg);
  return (
    <div className={classes}>
      <Container className="p-0 bgblurbefore">
        <Navbar type="light" className="align-items-stretch flex-md-nowrap p-0 bgblur">
          <NavbarToggle/>
          <SearchToggle/>

<<<<<<< HEAD
          <div className={"nav d-table m-auto oiuytrt tm-ksa-logo-parent2 nonestf " + searchform}>
            <Link to="/">{logoImg && <img style={{maxWidth: 58}} src={logoImg} alt="mainNavBar logo"/>}</Link>
=======

          {/*center logo*/}
          <div className={"nav d-table m-auto oiuytrt tm-ksa-logo-parent2 nonestf " + searchform}>
            {/*<Link to="/">{logoImg && <img style={{maxWidth: 58}} src={logoImg} alt="mainNavBar logo"/>}</Link>*/}
>>>>>>> 496de9eb5f488a591bacfd6f8d28b7e365dbd606
          </div>

          <NavbarMobileButton/>
          {/*<NavbarNavMobile/>*/}


        </Navbar>
      </Container>
      {searchform && <NavbarSearch type={'append'}/>}

    </div>
  );
}
