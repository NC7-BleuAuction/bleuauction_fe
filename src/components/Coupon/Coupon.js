import React, { useState }from 'react';

function Coupon({ coupon }) {
    const [isRedeemed, setIsRedeemed] = useState(false); // 쿠폰 상태를 관리하는 로컬 상태

    const handleCouponClick = () => {
      // 쿠폰이 클릭되면 isRedeemed 상태를 업데이트
      setIsRedeemed(true);
      // 여기에 추가적인 쿠폰 받아지는 로직을 추가할 수 있습니다.
      console.log(`${coupon.title} has been redeemed!`);
    }
  
    // 쿠폰이 받아진 경우, 스타일 또는 내용을 변경
    const redeemedStyle = isRedeemed ? { backgroundColor: 'lightgray' } : {};

  return (
    <div style={{ ...couponStyle, ...redeemedStyle }} onClick={handleCouponClick}>
      <p style={{ margin: 0 }}>{coupon.title}</p>
      <p style={{ margin: 0 }}>{coupon.description}</p>
    </div>
  );
}

const couponStyle = {
    display: 'flex', // flexbox layout을 사용
    flexDirection: 'column', // children을 세로 방향으로 배열
    // justifyContent: 'space-between', // title과 description 사이에 공간을 최대로
    border: '1px solid #0063F9',
    padding: '10px',
    margin: '0 5px',
    borderRadius: '8px',
    width: '300px', // 가로 길이를 원하는 만큼 조절
    height: '100px', // 세로 길이를 원하는 만큼 조절 (선택사항)
    cursor: 'pointer', // 클릭 가능한 요소임을 표시

  };

export default Coupon;
