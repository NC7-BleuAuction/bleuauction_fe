import React, { useState } from 'react';
import './OrderModal.css'; // 모달에 대한 CSS 스타일 (별도로 작성 필요)

const OrderModal = ({ isOpen, onClose }) => {

  // 여기에 필요한 state를 추가할 수 있습니다. 예: 선택한 메뉴, 수령 방식 등
  const [deliveryMethod, setDeliveryMethod] = useState('quick'); // 기본값으로 'quick' 배송 방식 선택
  const [contactDetails, setContactDetails] = useState({ // 수령 정보를 위한 상태
    name: '',
    phone: '',
    zipCode: '',
    address: '',
    detailedAddress: '',
  });

  // 폼 제출 핸들러: 여기에서 API 호출 등을 할 수 있습니다.
  const handleSubmit = (event) => {
    event.preventDefault();
    // 여기에서 주문 정보를 처리합니다 (예: API 호출)
    console.log('주문 정보:', contactDetails, '배송 방식:', deliveryMethod);
    onClose(); // 모달 닫기
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setContactDetails(prevDetails => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const [activeSection, setActiveSection] = useState('orderInfo'); // 현재 활성화된 섹션을 추적


    // 섹션을 전환하는 함수
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

                {/* 섹션 선택 버튼들 */}
        <div className="sectionButtons">
          <button onClick={() => switchSection('orderInfo')}>주문 정보</button>
          <button onClick={() => switchSection('deliveryMethod')}>수령 방식</button>
        </div>

        {activeSection === 'orderInfo' && (
          <form onSubmit={handleSubmit}>
            {/* 주문 정보 입력 부분 */}
            <h2>주문 정보</h2>
            {/* 주문 정보 입력 필드들... */}
            <div>
              <OrderItem/>
              <OrderItem/>
            </div>
            {/* ... */}
            {/* 주문 정보 제출 버튼 */}
            <button type="submit">주문 정보 제출</button>
          </form>
        )}

        {activeSection === 'deliveryMethod' && (
          <div>
            {/* 수령 방식 선택 부분 */}
            <h2>수령 방식</h2>
            <div>
              {/* 배송 방식 라디오 버튼들... */}
              <label>
                <input
                  type="radio"
                  name="deliveryMethod"
                  value="quick"
                  checked={deliveryMethod === 'quick'}
                  onChange={() => setDeliveryMethod('quick')}
                />
                퀵배송
              </label>
              <label>
                <input
                  type="radio"
                  name="deliveryMethod"
                  value="packaging"
                  checked={deliveryMethod === 'packaging'}
                  onChange={() => setDeliveryMethod('packaging')}
                />
                포장
              </label>
            </div>
            {/* 수령 정보 입력 필드들... */}
            <h2>수령 정보</h2>
            <input
            type="text"
            name="name"
            placeholder="이름"
            value={contactDetails.name}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="전화번호"
            value={contactDetails.phone}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="zipCode"
            placeholder="우편번호"
            value={contactDetails.zipCode}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="address"
            placeholder="기본주소"
            value={contactDetails.address}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="detailedAddress"
            placeholder="상세주소"
            value={contactDetails.detailedAddress}
            onChange={handleInputChange}
            required
          />
            {/* ... (이름, 전화번호 등) */}
            {/* ... */}
            {/* 배송 방식 제출 버튼 (필요하다면) */}
            <button onClick={() => { /* 배송 방식 관련 처리 */ }}>배송 방식 제출</button>
          </div>
        )}

        {/* 추가적으로 필요한 내용들... */}
      </div>
    </div>
  );
};



function OrderItem() {

  const [count, setCount] = useState(0)

  const handleCount = (e)=> {
    if (e.target.value >= 0) {
      setCount(e.target.value)
    } else {
      setCount(0)
    }
  };


  return (
    <>
    <div className='order-item-box'>
      
      <div style={{overflow:'hidden'}}>
        <img src='/images/fish1.jpg'/>
      </div>

      <div>
        <p>name</p>
      </div>

      <div>
        <p>size</p>
      </div>

      <div>
        <p>price</p>
      </div>

      <div>
        {/* <button onClick={()=>setCount(count + 1)}>+</button> */}
        <input
              type="number"
              value={count}
              onChange={handleCount}
            />
        {/* <button onClick={()=>setCount(count + 1)}>-</button> */}
      </div>




    </div>
    </>
  );
}

          

export default OrderModal;
