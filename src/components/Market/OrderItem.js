import React, { useState, useEffect } from 'react';
import './OrderModal.css';
import { useUser } from '../Auth/UserContext';

function OrderItem({ menu, update }) {
  console.log(menu)


  return (
    <>
    <div className='order-item-box'>
      
      <div style={{overflow:'hidden'}}>
        <img src='/images/fish1.jpg'/>
      </div>

      <div>
        <p>{menu.menuName}</p>
      </div>

      <div>
        <p>{menu.menuSize}</p>
      </div>

      <div>
       <p>{menu.menuPrice}</p>
      </div>

      <div>
        {/* <button onClick={()=>setCount(count + 1)}>+</button> */}
        <input
              type="number"
              name='count'
              value={menu.count}
              onChange={update}
            />
        {/* <button onClick={()=>setCount(count + 1)}>-</button> */}
      </div>
      
    </div>
    </>
  );
}

          

export default OrderItem;
