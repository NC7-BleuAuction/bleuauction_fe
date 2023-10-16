import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import MyOrderContent from './MyOrderContent';


function MyOrder() {

  const order = {

  }

  const [selected, setSelected] = useState('');

  const onClick = (e) => {
    setSelected(e.target.value);
  };

  useEffect(()=>{
    console.log(selected);
  }, [selected])

  let content;
  
  switch (selected) {
    case 'Delivered' :
      content = <MyOrderContent/>;
      break;
    case 'Processing' :
        content = <MyOrderContent/>;
        break;
    case 'Canceled' :
      content = <MyOrderContent/>;
      break;
    default: 
      content = null;
      break;
  }
  

  return (
      <>
        <h2>마이오더</h2>
        <div>
          <button value={'Delivered'} onClick = {onClick}>Delivered</button>
          <button value={'Processing'} onClick = {onClick}>Processing</button>
          <button value={'Canceled'} onClick = {onClick}>Canceled</button>
        </div>
        <div>
          {/* <MyOrderContent/> */}
          {content}
        </div>
      
      
      </>
  );
};

export default MyOrder;
