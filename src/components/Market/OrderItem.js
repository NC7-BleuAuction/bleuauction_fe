import React, { useState, useEffect } from 'react';
import './OrderModal.css';
import { useUser } from '../Auth/UserContext';

function OrderItem({ key, menu, orderMenu, update }) {
  // console.log(menu)
  const [localItem, setLocalItem] = useState(menu);

  const handleNameChange = (e) => {
    if (e.target.value >= 0) {
      const newName = e.target.value;
      setLocalItem({ ...localItem, count: newName });
      update({ ...localItem, count: newName });
      // update(localItem)
      console.log('발동')
    }
  }


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
              value={localItem.count}
              onChange={handleNameChange}
            />
        {/* <button onClick={()=>setCount(count + 1)}>-</button> */}
      </div>
      
    </div>
    </>
  );
}

          

export default OrderItem;
