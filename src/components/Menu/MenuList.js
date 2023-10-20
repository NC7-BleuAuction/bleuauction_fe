import React from 'react';

function MenuList({ menus }) {

  // 메뉴 아이템을 위한 인라인 스타일. 필요에 따라 수정할 수 있습니다.
  const menuItemStyle = {
    border: '1px solid #ddd',
    padding: '10px',
    marginBottom: '10px',
    textAlign: 'center',
    width: '300px',
  };

  return (
    <div style={menuListStyle}>
      <ul style={{ listStyleType: 'none' }}>
        {menus.map(menu => (
          <li key={menu.menuNo} style={menuItemStyle}>
            {menu.menuAttaches && <img src={menu.menuAttaches} alt={menu.menuName} style={{ width: '100%', height: 'auto' }} />}
            <h2>{menu.menuName}</h2>
            <p>{menu.menuSize}</p>
            <p>{menu.menuPrice}</p>
            <p>{menu.menuContent}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

const menuListStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center', 
  margin: 'auto',
  paddingTop: '10px', 
  // width: '100%',
};

export default MenuList;
