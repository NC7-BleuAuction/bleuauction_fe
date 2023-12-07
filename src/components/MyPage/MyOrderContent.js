import React, { useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from './MyOrderContent.module.css';
import OrderMenuList from './OrderMenuList';
import { sendAxiosRequest } from '../../lib/common';

function MyOrderContent() {
  const accessToken = sessionStorage.getItem('accessToken');
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const successCallback = (response) => {
      console.log('응답 데이터:', response.data);
      setOrders(response.data);
    };

    const errorCallback = (error) => {
      console.error('주문 정보를 가져오는 데 실패했습니다.', error);
    };

    // sendAxiosRequest 함수 호출
    sendAxiosRequest(
      '/api/order',
      'GET',
      null,
      successCallback,
      errorCallback,
      null,
      accessToken
    );
  }, []);

  // function onClick() {
  //   console.log(orders);
  // }

  // const orders = orderlist;

  //   return (
  //     <>
  //     {orders.map(order=>(
  //     <tr key={order.orderNo}>
  //     <div>

  //     {/* <button onClick={onClick} >버튼</button> */}
  //     <div className={styles.order_box}>
  //       <div className={styles.order_store_title}>
  //       <td>주문 번호 : {order.orderNo}</td>
  //       <br/>
  //       <td>주문일: {new Date(order.regDatetime).toLocaleDateString()}</td>
  //       </div>

  //       <div className={styles.order_item_box}>
  //         <img src='/images/fresh.png'/>
  //         <Link className="text-ellipsis" to={`/mypage/ordermenu/detail/${order && order.orderNo}`} style={{ color: '#909090' }}>
  //         주문 상세보기
  //         </Link>
  //         {/* {order.OrderMenus.map(orderMenu => (
  //           <div key={orderMenu.orderMenuNo}>
  //             <td>주문메뉴번호{orderMenu.orderMenuNo}</td>
  //             <td>메뉴번호{orderMenu.menuNo}</td>
  //             <td>주문수량{orderMenu.menuNo}</td>
  //           </div>
  //         ))}  */}

  //       </div>

  //       <div className={styles.order_result_box}>
  //       <td>총액: {order.orderPrice}</td>
  //       <br/>
  //       <td>주문타입: {order.orderType === 'Q' ? '퀵배송' : order.orderType === 'T' ? '포장' : '기타'}</td>
  //       <br/>
  //       <td>요청사항: {order.orderRequest}</td>
  //       <br/>
  //       <td>핸드폰 번호: {order.recipientPhone}</td>
  //       <br/>
  //       <td>수령자: {order.recipientName}</td>
  //       <br/>
  //       <td>우편번호: {order.recipientZipcode}</td>
  //       <br/>
  //       <td>주소: {order.recipientAddr}</td>
  //       <br/>
  //       <td>상세주소: {order.recipientDetailAddr}</td>

  //       </div>
  //       </div>

  //     </div>
  //     </tr>
  //   ))}
  //        </>
  //   );
  // }

  return (
    <div className={styles.orderListContainer}>
      {orders.map((order) => (
        <div key={order.orderNo} className={styles.orderCard}>
          <div className={styles.orderHeader}>
            <p>주문 번호 : {order.orderNo}</p>
            <Link
              to={`/mypage/ordermenu/detail/${order.orderNo}`}
              className={styles.detailLink}
            >
              주문 상세보기
            </Link>
          </div>

          <div className={styles.orderContent}>
            <div className={styles.orderImage}>
              <img src="/images/fresh.png" alt="Order" />
            </div>
            <div className={styles.orderDetails}>
              {/* Additional order details can be structured here */}
              <p>총액: {order.orderPrice}</p>
              <p>
                주문타입:{' '}
                {order.orderType === 'Q'
                  ? '퀵배송'
                  : order.orderType === 'T'
                  ? '포장'
                  : '기타'}
              </p>
              <p>요청사항: {order.orderRequest}</p>
              <p>핸드폰 번호: {order.recipientPhone}</p>
              <p>수령자: {order.recipientName}</p>
              <p>우편번호: {order.recipientZipcode}</p>
              <p>주소: {order.recipientAddr}</p>
              <p>상세주소: {order.recipientDetailAddr}</p>
              <p>주문일: {new Date(order.regDatetime).toLocaleDateString()}</p>
              {/* ... other order-related information ... */}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MyOrderContent;
