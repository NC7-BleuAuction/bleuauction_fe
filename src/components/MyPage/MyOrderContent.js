import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import styles from './MyOrderContent.module.css';


function MyOrderContent({selectd}) {

  const order = {

  }

  // let [selected, setSelected] = useState('');

  // const onClick = (e) => {
  //   setSelected(e.target.value);
  // };

  // useEffect(()=>{
  //   console.log(selected);
  // }, [selected])

  return (
    <>
    <div className={styles.order_box}>
      <div className={styles.order_store_title}>
        <span>storename</span>
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
    </>
  );
}

export default MyOrderContent;
