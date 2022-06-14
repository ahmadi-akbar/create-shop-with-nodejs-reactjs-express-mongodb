import React , {useState} from "react";
// import MuiGridList from '@mui/material/GridList';
import { ImageListItem } from "@mui/material";
import { SketchPicker } from 'react-color';


const ColorPicker = (props) => {
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  let {color} = props;
// console.log('color',props);
 return <div>
   <button className={'the-color-swatch'} onClick={()=>setDisplayColorPicker(true)}>
     <div style={{backgroundColor:color}} className={'the-color'}/>
   </button>
   {displayColorPicker && <div className={'the-color-popover'}><div className={'the-color-cover'} onClick={()=>setDisplayColorPicker(false)}/><SketchPicker {...props}/>x</div>}
 </div>
};

export default ColorPicker;
