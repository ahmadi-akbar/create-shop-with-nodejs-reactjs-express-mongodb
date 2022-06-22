import React from 'react';
import { toggleSearch } from '#c/functions/index';
import { useSelector } from 'react-redux';
<<<<<<< HEAD

=======
import SearchIcon from '@mui/icons-material/Search';
>>>>>>> 496de9eb5f488a591bacfd6f8d28b7e365dbd606
export default function NavbarToggle(props) {
  const searchform = useSelector((st) => !!st.store.searchvisible);

  const handleClick = () => toggleSearch(searchform);

  return (
    <div className={"nav toggle-sidebar xtazin2 nonestf "+searchform}>
      <div
        onClick={handleClick}
        className={"nav-link nav-link-icon toggle-sidebar d-sm-inline d-md-inline  text-center "}>
<<<<<<< HEAD
        <i className="material-icons">search</i>
=======
        <SearchIcon/>
>>>>>>> 496de9eb5f488a591bacfd6f8d28b7e365dbd606
      </div>
    </div>
  );
}
