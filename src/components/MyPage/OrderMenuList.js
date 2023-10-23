  import React, { useEffect, useState } from 'react';
  import { useParams } from 'react-router-dom';
  import axios from 'axios';
  import styles from './MyOrderContent.module.css';

  function OrderMenuList() {
    const [orderMenus, setOrderMenus] = useState([]);
    const [menus, setMenus] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0); // 총합계를 저장할 상태 추가
  
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
  
        // 메뉴의 가격을 모두 더한 총합계 계산
        const total = menuData.reduce((acc, menu) => acc + menu.menuPrice, 0);
        setTotalPrice(total);
      };
  
      fetchMenuData();
    };
  
    return (
      <>
        <h1>주문 목록</h1>
        <div className={styles.order_store_title}></div>
  
        {orderMenus.length > 0 ? (
          orderMenus.map((orderMenu, index) => (
            <div key={orderMenu.orderMenuNo} className={styles.order_box}>
              <div className={styles.order_store_title}>
                <p>주문수량: {orderMenu.orderMenuCount}</p>
              </div>
              <div className={styles.order_item_box}>
                {menus[index] ? (
                  <div>
                    {menus[index].menuAttaches && menus[index].menuAttaches[0] ? (
                      <img
                        src={`https:kr.object.ncloudstorage.com/bleuauction-bucket/menu/${menus[index].menuAttaches[0].saveFilename}`}
                        alt={menus[index].menuAttaches[0].originFilename}
                      />
                    ) : (
                      <img src="/images/fresh.png" alt="menu" />
                    )}
                    <p>메뉴이름: {menus[index].menuName}</p>
                    <p>메뉴가격: {menus[index].menuPrice}</p>
                  </div>
                ) : (
                  <div>
                    <p>메뉴 정보 없음</p>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
  
        <p>총액: {totalPrice}</p> {/* 총합계 출력 */}
      </>
    );
  }
  
  export default OrderMenuList;
  