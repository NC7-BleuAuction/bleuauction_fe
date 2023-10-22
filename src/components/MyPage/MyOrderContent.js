import React, { useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from './MyOrderContent.module.css';
import OrderMenuList from './OrderMenuList';


function MyOrderContent() {

  const [orders, setOrders] = useState([]);

  useEffect(()=>{
    axios.get('/api/order')
    .then(response => setOrders(response.data))
      .catch(error => console.log(error));
    console.log(orders);
  }, [])

  // function onClick() {
  //   console.log(orders);
  // }

  // const orders = orderlist;

  return (
    <>
    {orders.map(order=>(
    <tr key={order.orderNo}>
    <div>
  
    {/* <button onClick={onClick} >버튼</button> */}
    <div className={styles.order_box}>
      <div className={styles.order_store_title}>
      <td>주문 번호 : {order.orderNo}</td>
      <br/>
      <td>주문일: {new Date(order.regDatetime).toLocaleDateString()}</td>
      </div>
      
      <div className={styles.order_item_box}>
        <img src='/images/fresh.png'/>
        <Link className="text-ellipsis" to={`/mypage/ordermenu/detail/${order && order.orderNo}`} style={{ color: '#909090' }}>
        주문 상세보기
        </Link>
        {/* {order.OrderMenus.map(orderMenu => (
          <div key={orderMenu.orderMenuNo}>
            <td>주문메뉴번호{orderMenu.orderMenuNo}</td>
            <td>메뉴번호{orderMenu.menuNo}</td>
            <td>주문수량{orderMenu.menuNo}</td>
          </div>
        ))}  */}       
        
      </div>
      
      <div className={styles.order_result_box}>
      <td>총액: {order.orderPrice}</td>
      <br/>
      <td>요청사항: {order.orderRequest}</td>
      <br/>
      <td>핸드폰 번호: {order.recipientPhone}</td>
      <br/>
      <td>수령자: {order.recipientName}</td>
      <br/>
      <td>우편번호: {order.recipientZipcode}</td>
      <br/>
      <td>주소: {order.recipientAddr}</td>
      <br/>
      <td>상세주소: {order.recipientDetailAddr}</td>


      </div>
      </div>
   
    </div>
    </tr>
  ))}
       </>
  );
}

export default MyOrderContent;
