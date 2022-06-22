import React from 'react';
import { toggleSidebar } from '#c/functions/index';
import { useSelector } from 'react-redux';
<<<<<<< HEAD

=======
// import {logoImg} from '#c/assets/index';
// import {Link} from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
>>>>>>> 496de9eb5f488a591bacfd6f8d28b7e365dbd606
export default function NavbarToggle(props) {
  const menu = useSelector((st) => !!st.store.menuVisible);
  // const searchform = useSelector((st) => !!st.store.searchvisible);

  const handleClick = () => toggleSidebar(menu);

  return (
<<<<<<< HEAD
    <div className={"nav toggle-sidebar xtazin2 nonestf "}>
=======
    [
      <div className={"nav toggle-sidebar xtazin2 nonestf "}>
>>>>>>> 496de9eb5f488a591bacfd6f8d28b7e365dbd606
      <div

        onClick={handleClick}
        className="nav-link nav-link-icon toggle-sidebar d-sm-inline d-md-inline  text-center">
<<<<<<< HEAD
        <i className="material-icons">&#xE5D2;</i>
      </div>
    </div>
=======
        <MenuIcon/>
      </div>
    </div>

    ]
>>>>>>> 496de9eb5f488a591bacfd6f8d28b7e365dbd606
  );
}
