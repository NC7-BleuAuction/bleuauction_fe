import React, { useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from './MyOrderContent.module.css';
import { sendAxiosRequest } from '../utility/common';



function StoreOrder() {

  const accessToken = sessionStorage.getItem('accessToken');
  const [orders, setOrders] = useState([]);

  // useEffect(()=>{
  //   axios.get('/api/store/order')
  //   .then(response => setOrders(response.data))
  //     .catch(error => console.log(error));
  //   console.log(orders);
  // }, [])

  useEffect(() => {
    const successCallback = (response) => {
      console.log('응답 데이터:', response.data);
      setOrders(response.data);
    };

    const errorCallback = (error) => {
      console.error('주문 정보를 가져오는 데 실패했습니다.', error);
    };

    // sendAxiosRequest 함수 호출
    sendAxiosRequest('/api/store/order', 'GET', null, successCallback, errorCallback, null, accessToken);
  }, []);



  return (
    <>
    <h1>주문확인</h1>
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
        <Link className="text-ellipsis" to={`/order/detail/${order && order.orderNo}`} style={{ color: '#909090' }}>
        주문 상세보기
        </Link>

      
        </div>
      
      <div className={styles.order_result_box}>
      <td>총액: {order.orderPrice}</td>
      <br/>
      <td>주문타입: {order.orderType === 'Q' ? '퀵배송' : order.orderType === 'T' ? '포장' : '기타'}</td>
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

export default StoreOrder;
