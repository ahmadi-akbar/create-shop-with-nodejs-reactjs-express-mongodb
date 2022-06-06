import React from 'react';
import clsx from 'clsx';
import {Container, Navbar} from 'shards-react';
import NavbarToggle from './NavbarToggle';
import SearchToggle from './SearchToggle';
import NavbarSearch from './NavbarSearch';
import {logoImg} from '#c/assets/index';
import { useSelector } from 'react-redux';

import MainCats from './NavbarNav/MainCats';
import {Link} from 'react-router-dom';
// import Logo from '#c/images/logo-256x512.png';
import NavbarMobileButton from './NavbarMobileButton';

export default function MainMobileNavbar({layout, stickyTop = true, onChange}) {
  const classes = clsx('main-navbar main-mobile', 'bg-white', stickyTop && 'sticky-top');
  const searchform = useSelector((st) => !!st.store.searchvisible);

  // let searchform = '';

  return (
    <div className={classes}>
      <Container className="p-0 bgblurbefore">
        <Navbar type="light" className="align-items-stretch flex-md-nowrap p-0 bgblur">
          <NavbarToggle/>
          <SearchToggle/>

          <div className={"nav d-table m-auto oiuytrt tm-ksa-logo-parent2 nonestf " + searchform}>
            <Link to="/"><img style={{maxWidth: 58}} src={logoImg} alt="logo"/></Link>
          </div>

          <NavbarMobileButton/>
          {/*<NavbarNavMobile/>*/}


        </Navbar>
      </Container>
      {searchform && <NavbarSearch type={'append'}/>}

    </div>
  );
}
