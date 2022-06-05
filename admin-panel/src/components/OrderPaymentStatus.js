import React from "react";


export default (props) => {
  return [
    {
      id: 'notpaid',
      name: 'notpaid',
      color: 'warn'

    },
    {
      id: 'unsuccessful',
      name: 'unsuccessful',
      color: 'erro'

    },
    {
      id: 'paid',
      name: 'paid',
      color: 'succ'
    }
  ];
};
