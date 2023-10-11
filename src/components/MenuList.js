import React from 'react';
import MenuItem from './MenuItem';

function MenuList() {
  const menuItems = [
    {
      name: '연어',
      imageUrl: '/images/salmon.png', 
      sizes: [
        { name: '소', price: 30000 },
        { name: '중', price: 40000 },
        { name: '대', price: 50000 },
      ],
    },
    {
      name: '방어',
      imageUrl: '/images/bang.png',
      sizes: [
        { name: '소', price: 15000 },
        { name: '중', price: 20000 },
        { name: '대', price: 25000 },
      ],
    },
    {
      name: '우럭',
      imageUrl: '/images/cry.png',
      sizes: [
        { name: '소', price: 15000 },
        { name: '중', price: 20000 },
        { name: '대', price: 25000 },
      ],
    },
  ];

  return (
    <div style={menuListStyle}>
      {menuItems.map(item => (
        <MenuItem key={item.name} name={item.name} sizes={item.sizes} imageUrl={item.imageUrl} />
      ))}
    </div>
  );
}

const menuListStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center', // 수직 방향으로도 가운데 정렬
  margin: 'auto', // 컨테이너를 화면 가운데로 이동
  paddingTop: '10px', 
};

export default MenuList;
