import React, { useEffect, useState } from 'react';
import './OrderModal.css';
import OrderItem from './OrderItem';
import { sendAxiosRequest } from '../utility/common';
import Payment from '../Pay/Pay';
import axios from 'axios';
import { useNavigate } from 'react-router';
import jwtDecode from 'jwt-decode';

const OrderModal = ({ store, menus, isOpen, onClose, setMenuData }) => {
  const accessToken = sessionStorage.getItem('accessToken');
  const navigate = useNavigate();

  const [orderMenus, setOrderMenus] = useState([])
  const [member, setMember] = useState(null);
  const [activeSection, setActiveSection] = useState('orderInfo'); // 현재 활성화된 섹션을 추적
  const [order, setOrder] = useState({
    orderType: "Q",
    orderPrice:0,
    orderRequest:'',
    recipientPhone:'',
    recipientName:'',
    recipientZipcode:'',
    recipientAddr:'',
    recipientDetailAddr:'',
    orderStatus:'',
  })
  const [pay, setPay] = useState(null);


  // OrderItem 변경 사항 적용
  const updateMenuCount = (updateMenu)=> { 
    const updatedItems = menus?.map((menu) =>menu.menuNo === updateMenu.menuNo ? updateMenu : menu);
    setMenuData(updatedItems)
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setActiveSection('deliveryMethod');
  }
  
  // 수령 방식 변경 사항을 저장
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setOrder(prevDetails => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleOrderPrice = (totalPrice) => setOrder({...order, orderPrice: totalPrice})

  const handleOrderMenu = (totalOrders) => setOrderMenus({totalOrders});

  const createOrderMenu = async (totalOrders) => {
    
    // Create order menus
    for (const orderMenu of totalOrders) {
      const data2 = new FormData();
      data2.append('menuNo', orderMenu.menuNo);
      data2.append('orderMenuCount', orderMenu.orderMenuCount);

      await sendAxiosRequest(
        '/api/ordermenu/new', 
        'POST', 
        data2, 
        response => {
          if (response.data && response.data.length > 0) {
            console.log("주문메뉴 생성에 성공했습니다:", response.data);
            // console.log('orderMenu=> : ', orderMenu);
            console.log(typeof(orderMenu.menuNo))
          }
        }, 
        error => {
          console.error("주문메뉴 생성에 실패했습니다:", error);
          navigate("/market/detail"); //종원 추가
        }, 
        'multipart/form-data', 
        accessToken
      );
    }
  } 

  const handleOrder = async (e) => {  
    e.preventDefault();
    // try {
    let totalPrice = 0;
    let totalOrders = [];
  
    // Order menu creation
    menus.filter((menu) => menu.count !== 0).map((menu) => {
      totalPrice += menu.count * menu.menuPrice;
      totalOrders.push({
        menuNo: Number(menu.menuNo),
        orderMenuCount: Number(menu.count),
      });
    });
  
    handleOrderMenu(totalOrders);
    handleOrderPrice(totalPrice);

    // Create the order
    const orderData = {
      orderType: order.orderType,
      orderPrice: order.orderPrice,
      orderRequest: order.orderRequest,
      recipientPhone: order.recipientPhone,
      recipientName: order.recipientName,
      recipientZipcode: order.recipientZipcode,
      recipientAddr: order.recipientAddr,
      recipientDetailAddr: order.recipientDetailAddr,
      orderStatus: order.orderStatus,
    };
  
    // Make the order creation request
    const orderResponse = await axios.post(
      '/api/order/new', 
      orderData, 
      { headers: { 'Content-Type': 'multipart/form-data' }}
    );
  
    console.log("주문 생성에 성공했습니다:", orderResponse.data);
    createOrderMenu(totalOrders);

      // if (response.data && response.data.length > 0) {
      //   console.log("주문메뉴 생성에 성공했습니다:", response.data);
      // }
    
  
      // Redirect or perform other actions after order creation
      // navigate('/success'); // Adjust the path as needed
    // } catch (error) {
    //   console.error("주문 생성 또는 처리 중 오류가 발생했습니다:", error);
    // }
    // navigate("/market/detail");

    console.log('memberState', member);
    console.log('orderState', order);
    console.log('totalPrice', totalPrice)

    const { IMP } = window;
    

    const buyerEmail = member ? member.memberEmail : '';
    const buyerName = member ? member.memberName : '';
    const buyerTel = member ? member.memberPhone : '';
    const name = order ? order.orderNo : '1';
    const buyerAddr = order ? order.resipientAddr : '';
    const buyerPostcode = order ? order.resipientZipcode : '';
    const amount = order.orderPrice;


    const RequestDto = {
      pg: 'kakaopay.TC0ONETIME',
      pay_method: 'card',
      merchant_uid: new Date().getTime(),
      name: '응애1',
      amount: amount,
      buyer_email: buyerEmail,
      buyer_name: buyerName,
      buyer_tel: buyerTel,
      buyer_addr: buyerAddr,
      buyer_postcode: buyerPostcode,
    }
    console.log('reqestDto', RequestDto)
    IMP.init('imp11340204');

    IMP.request_pay(RequestDto, async (rsp) => {
      console.log('rsp: ', rsp);
      try {
        const { data } = await axios.post('/api/pay/verifyIamport/' + rsp.imp_uid);
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


  useEffect(() => {
    const jquery = document.createElement("script");
    jquery.src = "http://code.jquery.com/jquery-1.12.4.min.js";
    const iamport = document.createElement("script");
    iamport.src = "https://cdn.iamport.kr/v1/iamport.js";
    document.head.appendChild(jquery);
    document.head.appendChild(iamport);
    sendAxiosRequest(`/api/member/${jwtDecode(accessToken).sub}`, 'GET', null, (response) => {
      console.log("응답 성공",response.data)
      setMember(response.data)
    }, (error) => {
      console.log("응답 실패",error);
    }, null, accessToken);
    return () => {
      document.head.removeChild(jquery);
      document.head.removeChild(iamport);
    };

  }, []);


  const switchSection = (section) => {
    setActiveSection(section);
  };

  if (!isOpen) return null;


  return (
    <div className="orderModalBackground">
      <div className="orderModalContainer">
        <div className="orderModalHeader">
          <button className="closeButton" onClick={onClose}>X</button>
        </div>

        <div className="sectionButtons">
          <button onClick={() => (switchSection('orderInfo'), console.log(order))}>주문 정보</button>
          <button onClick={() => (switchSection('deliveryMethod'), console.log(order))}>수령 방식</button>
        </div>

        {activeSection === 'orderInfo' && (
          <form onSubmit={handleSubmit}>
            <h2>주문 정보</h2>

            <div>
              {menus?.map((menu) => 
                <OrderItem key={menu.menuNo} menu={menu}  update = {updateMenuCount} />
              )}
            </div>

            <button type="submit">주문 정보 제출</button>
          </form>
        )}

        {activeSection === 'deliveryMethod' && (
          <div>
            {/* 수령 방식 선택 부분 */}
            <h2>수령 방식</h2>

            <div>
              <label>
                <input
                  type="radio"
                  name="orderType"
                  value="Q"
                  checked={order.orderType === "Q"}
                  onChange={handleInputChange}
                />
                퀵배송
              </label>
              
              <label>
                <input
                  type="radio"
                  name="orderType"
                  value="T"
                  checked={order.orderType === "T"}
                  onChange={handleInputChange}
                />
                포장
              </label>
            </div>

            <h2>수령 정보</h2>
            <div className='delivery'>
              <input
              type="text"
              name="recipientName"
              placeholder="이름"
              value={order.recipientName}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="recipientPhone"
              placeholder="전화번호"
              value={order.recipientPhone}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="recipientZipcode"
              placeholder="우편번호"
              value={order.recipientZipcode}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="recipientAddr"
              placeholder="기본주소"
              value={order.recipientAddr}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="recipientDetailAddr"
              placeholder="상세주소"
              value={order.recipientDetailAddr}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="orderRequest"
              placeholder="요청사항"
              value={order.orderRequest}
              onChange={handleInputChange}
              required
            />
            {/* <button onClick={handleOrder}>응애결제하기</button> */}
            {/* <Payment orderData={order} saveOrder={handleOrder} /> */}
            <div>
              <button onClick={handleOrder}>결제하기</button>
            </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

          

export default OrderModal;
