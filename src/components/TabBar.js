import React from 'react';

function TabBar({ activeTab, onTabClick }) {
  return (
    <div style={tabBarStyle}>
      <button 
        style={activeTab === 'info' ? activeTabStyle : tabStyle} 
        onClick={() => onTabClick('info')}
      >
        가게정보
      </button>
      <button 
        style={activeTab === 'menu' ? activeTabStyle : tabStyle} 
        onClick={() => onTabClick('menu')}
      >
        메뉴
      </button>
      <button 
        style={activeTab === 'review' ? activeTabStyle : tabStyle} 
        onClick={() => onTabClick('review')}
      >
        리뷰
      </button>
    </div>
  );
}

const tabBarStyle = {
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  padding: '10px',
  border: '2px solid #ccc',
  borderRadius: '10px',
  width: '70%', // 이 값을 조절하여 탭바 전체의 길이를 설정하세요.
  margin: '0 auto', // 탭바를 화면 중앙에 위치시키기 위한 설정
};

const tabStyle = {
  padding: '10px 20px',
  fontSize: '16px',
  border: 'none',
  background: 'none',
  cursor: 'pointer',
  color: '#000',
  borderRadius: '10px',
};

const activeTabStyle = {
  ...tabStyle,
  border: 'none',
  backgroundColor: '#ddd', // 활성 탭의 배경색
  color: '#fff', // 활성 탭의 텍스트 색상
};

export default TabBar;
