import React, { useEffect, useReducer, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './MyOrderContent.module.css';


function MyOrderContent({orderlist}) {


  // const [orders, setOrders] = useState(orderlist);

  // useEffect(()=>{
  //   console.log(orders);
  // }, [orders])

  // function onClick() {
  //   console.log(orders);
  // }

  const orders = orderlist;

  return (
    <>
    {orders.map((item)=>(
    <div key={item.index}>
  
    {/* <button onClick={onClick} >버튼</button> */}
    <div className={styles.order_box}>
      <div className={styles.order_store_title}>
        <span>name</span>
      </div>
      
      <div className={styles.order_item_box}>
        <img src='/images/fresh.png'/>
        <span>fishname</span>
        <span>fishcount</span>
        <span>price</span>
      </div>
      
      <div className={styles.order_result_box}>
        <span>총액: price</span>
        <span>주문일: date</span>
      </div>
      </div>
   
    </div>
  ))}
       </>
  );
}

export default MyOrderContent;
