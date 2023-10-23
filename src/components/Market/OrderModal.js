import React, { useState, useEffect } from 'react';
import './OrderModal.css';
import { useUser } from '../Auth/UserContext';
import OrderItem from './OrderItem';
import { sendAxiosRequest } from '../utility/common';
import Payment from '../Pay/Pay';
import { formToJSON } from 'axios';

const OrderModal = ({ store, menus, isOpen, onClose, setMenuData }) => {

  
const {user, login, logout} = useUser();

const [order, setOrder] = useState({
  orderType:'Q',
  orderPrice:0,
  orderRequest:'',
  recipientPhone:'',
  recipientName:'',
  recipientZipcode:'',
  recipientAddr:'',
  recipientDetailAddr:'',
  orderStatus:'',
})

  // OrderItem 변경 사항 적용
    const updateMenuCount = (updateMenu)=> { 
      const updatedItems = menus?.map((menu) =>
      menu.menuNo === updateMenu.menuNo ? updateMenu : menu
    );
      setMenuData(
        updatedItems
      )
  };


  const [orderMenus, setOrderMenus] = useState([])

  let totalPrice = 0
  let totalOrders = [];
  
 
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


  // order, orderMenu 생성 및 결제 진행
  const handleOrder = (event) => {
    event.preventDefault();
    // console.log(orderMenus)


   // orderMenu 생성
    menus.filter((menu) => menu.count !== 0).map((menu) => {
      
      totalPrice += menu.count * menu.menuPrice

      totalOrders.push({
        menuNo: Number(menu.menuNo),
        orderMenuCount: Number(menu.count),
        // orderNo: 0,
        // memberNo:0,
      })
    })
    
    setOrderMenus(totalOrders)



    setOrder({
      ...order, orderPrice: totalPrice
    })

    // console.log(orderMenus)
    // console.log(typeof(orderMenus[0].menuNo))


    // 주문 생성
    sendAxiosRequest('/api/order/new', 'POST', order, response => {
      if (response.data && response.data.length > 0) {
        console.log("주문 생성에 성공했습니다:", response.data);
      }
    }, error => {
      console.error("주문 생성에 실패했습니다:", error);
    });

    
    //주문 메뉴 추가 생성
    setTimeout(() => {
      orderMenus.map((orderMenu) => {
        console.log('orderMenu=> : ', orderMenu);

        sendAxiosRequest('/api/ordermenu/new', 'POST', orderMenu, response => {
          if (response.data && response.data.length > 0) {
            console.log("주문메뉴 생성에 성공했습니다:", response.data);
            // console.log('orderMenu=> : ', orderMenu);
            console.log(typeof(orderMenu.menuNo))
          }
        }, error => {
          console.error("주문메뉴 생성에 실패했습니다:", error);
        });
      })
    }, 6000);

    
    
  }


  const [activeSection, setActiveSection] = useState('orderInfo'); // 현재 활성화된 섹션을 추적

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
          <button onClick={() => switchSection('orderInfo')}>주문 정보</button>
          <button onClick={() => switchSection('deliveryMethod')}>수령 방식</button>
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
                  value='Q'
                  checked={order.orderType === 'Q'}
                  onChange={handleInputChange}
                />
                퀵배송
              </label>
              <label>
                <input
                  type="radio"
                  name="orderType"
                  value='T'
                  checked={order.orderType === 'T'}
                  onChange={handleInputChange}
                />
                포장
              </label>
            </div>

            <h2>수령 정보</h2>
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
            <button onClick={handleOrder}>결제하기</button>
            {/* <Payment onClick={handleOrder}>결제하기</Payment> */}
          </div>
        )}

      </div>
    </div>
  );
};

          

export default OrderModal;
