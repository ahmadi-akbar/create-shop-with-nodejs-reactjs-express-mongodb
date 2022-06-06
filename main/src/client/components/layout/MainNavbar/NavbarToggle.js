import React from 'react';
import { toggleSidebar } from '#c/functions/index';
import { useSelector } from 'react-redux';

export default function NavbarToggle(props) {
  const menu = useSelector((st) => !!st.store.menuVisible);
  // const searchform = useSelector((st) => !!st.store.searchvisible);

  const handleClick = () => toggleSidebar(menu);

  return (
    <div className={"nav toggle-sidebar xtazin2 nonestf "}>
      <div

        onClick={handleClick}
        className="nav-link nav-link-icon toggle-sidebar d-sm-inline d-md-inline  text-center">
        <i className="material-icons">&#xE5D2;</i>
      </div>
    </div>
  );
}
