import React from 'react';



export default function PageBuilder({ elements }) {
  console.log('elements',elements)
  return (
    <div className={'elements'}>
      {elements.map((element, index) => {
        let {type}=element;
        switch(type){
          case 'SLIDER':
            return "slider";
          default :
            return <></>
        }
        // return (<div className={'element-'+index} key={index}>
        //   {element.id}
        // </div>)
      })}
      </div>
  );
}
