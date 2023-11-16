import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import MyOrderContent from './MyOrderContent';


function MyOrder() {

  const order1 = {
    orderPrice:'10000',
    recipientPhone:'01011111111',
    recipientName: '김성주',
    recipientZipcode: '1111',
    recipientAddr: '기본주소',
    recipientDetailAddr: '상세주소',
    regDatetime: '2023-09-01 15:00:00',
    mdfDatetime: '2023-09-01 15:00:00',
    orderStatus: 'Y'
  }

  const order2 = {
    orderPrice:'20000',
    recipientPhone:'01011111111',
    recipientName: '김성주2',
    recipientZipcode: '1111',
    recipientAddr: '기본주소',
    recipientDetailAddr: '상세주소',
    regDatetime: '2023-09-01 15:00:00',
    mdfDatetime: '2023-09-01 15:00:00',
    orderStatus: 'N'
  }

  const order3 = {
    orderPrice:'10000',
    recipientPhone:'01011111111',
    recipientName: '김성주',
    recipientZipcode: '1111',
    recipientAddr: '기본주소',
    recipientDetailAddr: '상세주소',
    regDatetime: '2023-09-01 15:00:00',
    mdfDatetime: '2023-09-01 15:00:00',
    orderStatus: 'Y'
  }


  const orderlist = [order1, order2, order3]

  const [selected, setSelected] = useState([]);

  const onClick = (e) => {
    setSelected(e.target.value);
  };

  useEffect(()=>{
    console.log(selected);
  }, [selected])

  // let content = (selected === 'Delivered') ? 
  // <MyOrderContent orderlist = {orderlist.filter((item)=>item.orderStatus === 'N')}/> : 
  // <MyOrderContent orderlist = {orderlist.filter((item)=>item.orderStatus === 'Y')} />;

  let content = (
    (selected === 'Delivered') ? <MyOrderContent orderlist = {orderlist.filter((item)=>item.orderStatus === 'Y')}/> : 
    (selected === 'Canceled') ? <MyOrderContent orderlist = {orderlist.filter((item)=>item.orderStatus === 'N')} />:
    null
  )

  return (
      <>
        <h2>마이오더</h2>
        <div>
          <button value={'Delivered'} onClick = {onClick}>Delivered</button>
          <button value={'Canceled'} onClick = {onClick}>Canceled</button>
        </div>
        <div>
          {/* <MyOrderContent /> */}
          {content}
        </div>
      
      
      </>
  );
};

export default MyOrder;
