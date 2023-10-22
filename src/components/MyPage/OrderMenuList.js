import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './MyOrderContent.module.css';

function OrderMenuList() {
  const [orderMenus, setOrderMenus] = useState([]);
  const [menus, setMenus] = useState([]); // 메뉴 정보를 저장할 배열

  const { orderNo } = useParams();

  useEffect(() => {
    axios.get(`/api/ordermenu/order/${orderNo}`)
      .then(response => {
        setOrderMenus(response.data);

        fetchMenuInfo(response.data);
      })
      .catch(error => console.log(error));
  }, [orderNo]);

  // 메뉴 정보를 가져오는 함수
  const fetchMenuInfo = (orderMenus) => {
    const menuNos = orderMenus.map(orderMenu => orderMenu.menuNo);
    const menuData = [];

    const fetchMenuData = async () => {
      for (const menuNo of menuNos) {
        try {
          const response = await axios.get(`/api/menu/detail/${menuNo}`);
          menuData.push(response.data);
        } catch (error) {
          console.log(error);
        }
      }
      setMenus(menuData);
    };

    fetchMenuData();
  };


  return (
    <>
      <h1>주문 목록</h1>
      <div className={styles.order_store_title}>
          
            </div>
         
      {orderMenus.length > 0 ? (
        orderMenus.map((orderMenu, index) => (
          <div key={orderMenu.orderMenuNo} className={styles.order_box}>
            <div className={styles.order_store_title}>
              <p>주문수량: {orderMenu.orderMenuCount}</p>
            </div>
            <div className={styles.order_item_box}>
              <img src="/images/fresh.png" alt="menu" />
              {menus[index] ? (
                <div>
                  {/* <p>메뉴번호: {menus[index].menuNo}</p> */}
                  <p>메뉴이름: {menus[index].menuName}</p>
                  <p>메뉴가격: {menus[index].menuPrice}</p>
                </div>
              ) : (
                <p>메뉴 정보 없음</p>
              )}
               
            </div>
          </div>
          
        ))
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}

export default OrderMenuList;
