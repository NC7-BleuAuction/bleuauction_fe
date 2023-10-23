import React, { useState, useEffect } from 'react';
import './OrderModal.css';

const OrderModal = ({ menus, isOpen, onClose }) => {

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

const [count, setCount] = useState(0)


  // const handleItem = (order) => {
  //   // 자식 컴포넌트의 스테이트 값을 받아서 처리
  //   console.log('자식 컴포넌트의 스테이트:', order);
  // };



  // 폼 제출 핸들러: 여기에서 API 호출 등을 할 수 있습니다.
  const handleSubmit = (event) => {
    event.preventDefault();
    // 여기에서 주문 정보를 처리합니다 (예: API 호출)
    console.log('주문 정보:', order, '배송 방식:', order.orderType);
    onClose(); 
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setOrder(prevDetails => ({
      ...prevDetails,
      [name]: value,
    }));
  };


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
              {menus.map((menu) => 
                // <OrderItem menu={menu} handleItem={handleItem} key={menu.menuNo} />

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
                  <input
                        type="number"
                        value={count}
                        onChange={(e) => (setCount(e.target.value))}
                      />
                </div>
                
              </div>
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
                  value='P'
                  checked={order.orderType === 'P'}
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
            <button onClick={() => {console.log(order)}}>배송 방식 제출</button>
          </div>
        )}

      </div>
    </div>
  );
};



// function OrderItem({ menu, handleItem }) {

//   const [count, setCount] = useState(0)

//   useEffect(() => {
//     // 자식 컴포넌트의 스테이트가 변경될 때 콜백 함수 호출
//     handleItem(count);
//     console.log("handleItem 호출", count)
//   }, [count]);

//   const handleCount = (e)=> {
//     if (e.target.value >= 0) {
//       setCount(e.target.value)
//     } else {
//       setCount(0)
//     }
//   };


//   return (
//     <>
//     <div className='order-item-box'>
      
//       <div style={{overflow:'hidden'}}>
//         <img src='/images/fish1.jpg'/>
//       </div>

//       <div>
//         <p>{menu.menuName}</p>
//       </div>

//       <div>
//         <p>{menu.menuSize}</p>
//       </div>

//       <div>
//        <p>{menu.menuPrice}</p>
//       </div>

//       <div>
//         {/* <button onClick={()=>setCount(count + 1)}>+</button> */}
//         <input
//               type="number"
//               value={count}
//               onChange={handleCount}
//             />
//         {/* <button onClick={()=>setCount(count + 1)}>-</button> */}
//       </div>
      
//     </div>
//     </>
//   );
// }

          

export default OrderModal;
