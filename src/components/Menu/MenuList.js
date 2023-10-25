import React from 'react';

function MenuList({ menus }) {

  // 메뉴 아이템을 위한 인라인 스타일. 필요에 따라 수정할 수 있습니다.
  const menuItemStyle = {
    border: '1px solid #ddd',
    padding: '10px',
    marginBottom: '10px',
    textAlign: 'center',
    width: '690px',
  };

  return (
    <div style={menuListStyle}>
      <ul style={{ listStyleType: 'none' }}>
        {menus.map(menu => (
          <li key={menu.menuNo} style={menuItemStyle}>
            {menu.menuAttaches &&
                menu.menuAttaches.map(attach => (
                    <img src={`https://kr.object.ncloudstorage.com/bleuauction-bucket/${attach.filePath}` + `${attach.saveFilename}`} alt={attach.originFilename} style={{ width: '100%', height: 'auto' }} />)
                )}
            <h2>{menu.menuName}</h2>
            <h5><b>{menu.menuSize === 'L' ? '<대(大)>' : menu.menuSize === 'M' ? '<중(中)>' : '<소(小)>'}</b></h5>
            <p>{menu.menuPrice.toLocaleString()} (원)</p>
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

