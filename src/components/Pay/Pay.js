import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import swal from 'sweetalert';
// import { response } from 'express';
// import { error } from 'console';

const Payment = () => {
  useEffect(() => {
    const jquery = document.createElement("script");
    jquery.src = "http://code.jquery.com/jquery-1.12.4.min.js";
    const iamport = document.createElement("script");
    iamport.src = "https://cdn.iamport.kr/v1/iamport.js";
    document.head.appendChild(jquery);
    document.head.appendChild(iamport);
    return () => {
      document.head.removeChild(jquery);
      document.head.removeChild(iamport);
    };
  }, []);

  function sendAxiosRequest(url, method, params, successCallback, errorCallback) {
    console.log(url);
    const axiosConfig = {
      timeout: 5000,
      url: url,
      method: method,
    };
    if (params != null)
      axiosConfig.params = params;
    axios(axiosConfig).then(successCallback).catch(errorCallback);
  }

  const memberNo = 1;
  const payNo = 1;
  const orderNo = 1;
  const [member, setMember] = useState(null);
  const [pay, setPay] = useState(null);
  const [order, setOrder] = useState(null);

  useEffect(() => {
    // Fetch member data
    sendAxiosRequest(`/api/member/${memberNo}`, 'GET', null,
      response => {

        console.log('Member data:', response.data);
        setMember(response.data); // Update member state
      },
      error => {
        console.error('Error fetching member data:', error);
      }
    );

    // Fetch order data
    sendAxiosRequest(`/api/order/detail/${orderNo}`, 'GET', null,
      response => {
        console.log('Order data:', response.data);
        setOrder(response.data); // Update order state
      },
      error => {
        console.error('Error fetching order data:', error);
      }
    );
  }, []); // Empty dependency array to ensure this effect runs only once

  const requestPay = () => {
    console.log('memberState', member);
    console.log('orderState', order);

    const { IMP } = window;
    const buyerEmail = member ? member.memberEmail : '';
    const buyerName = member ? member.memberName : '';
    const buyerTel = member ? member.memberPhone : '';
    const name = order ? order.orderNo : '';
    const buyerAddr = order ? order.resipientAddr : '';
    const buyerPostcode = order ? order.resipientZipcode : '';
    const amount = order.orderPrice;

    IMP.init('imp11340204');

    IMP.request_pay({
      pg: 'kakaopay.TC0ONETIME',
      pay_method: 'card',
      merchant_uid: new Date().getTime(),
      name: name,
      amount: amount,
      buyer_email: buyerEmail,
      buyer_name: buyerName,
      buyer_tel: buyerTel,
      buyer_addr: buyerAddr,
      buyer_postcode: buyerPostcode,
    }, async (rsp) => {
      console.log('rsp: ', rsp);
      try {
        const { data } = await axios.post('http://localhost:8080/api/pay/verifyIamport/' + rsp.imp_uid);
        if (rsp.paid_amount === amount) {
          alert('결제 성공!');
          const testPay = {
            // "payType": "C",
            // "orderStatus": "Y",
            // "payNo": 123,
            orderNo: order.orderNo,
            payPrice: amount,
            payStatus: rsp.success ? 'Y' : 'N'
            // "payDatetime": "2023-10-18T12:34:56",  // 예: ISO 8601 형식의 날짜 및 시간
            // "payCancelDatetime": "2023-10-18T14:45:00"  // 예: ISO 8601 형식의 날짜 및 시간
          }

          console.log('testPay.payStatus: ', testPay.payStatus);

          axios.post('/api/pay/createPayment', testPay, {
            headers: {
              'Content-Type': 'application/json',
            },
          })
            .then(response => {
              console.log('Pay data:', response.data);
              setPay(response.data);
            })
            .catch(error => {
              console.error('Error fetching pay data:', error);
            });

        } else if (rsp.paid_amount == amount) {
          alert('결제 성공?');
        } else {
          alert('결제 실패?');
        }
      } catch (error) {
        console.error('Error while verifying payment:', error);
        alert('결제 실패');
      }
    });
  };

  return (
    <div>
      <button onClick={requestPay}>결제하기</button>
    </div>
  );
};

export default Payment;

