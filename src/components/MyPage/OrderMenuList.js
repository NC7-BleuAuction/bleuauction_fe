  import React, { useEffect, useState } from 'react';
  import { useParams } from 'react-router-dom';
  import axios from 'axios';



  const styles = {
    container: {
      maxWidth: '600px', // 주문 목록의 최대 너비를 조정합니다.
      margin: '0 auto', // 페이지 중앙에 배치합니다.
      padding: '20px',
      backgroundColor: '#f5f5f5',
      borderRadius: '5px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    orderItem: {
      display: 'flex', // flexbox 레이아웃을 사용합니다.
      marginBottom: '15px',
      padding: '10px',
      borderRadius: '5px',
      backgroundColor: '#ffffff',
      alignItems: 'center',
    },
    imageContainer: {
      marginRight: '20px', // 이미지와 텍스트 정보 사이의 간격을 조정합니다.
    },
    image: {
      width: '100px', // 이미지 크기를 조정합니다. 필요에 따라 값 변경 가능
      height: '100px',
      objectFit: 'cover',
      borderRadius: '5px',
    },
    info: {
      display: 'flex',
      flexDirection: 'column', // 텍스트 정보를 세로로 정렬합니다.
    },
  };

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
    //   <>
    //     <h1>주문 목록</h1>
    //     <div className={styles.order_store_title}></div>
  
    //     {orderMenus.length > 0 ? (
    //       orderMenus.map((orderMenu, index) => (
    //         <div key={orderMenu.orderMenuNo} className={styles.order_box}>
    //           <div className={styles.order_store_title}>
    //             <p>주문수량: {orderMenu.orderMenuCount}</p>
    //           </div>
    //           <div className={styles.order_item_box}>
    //             {menus[index] ? (
    //               <div>
    //                 {menus[index].menuAttaches && menus[index].menuAttaches[0] ? (
    //                   <img
    //                     src={`https:kr.object.ncloudstorage.com/bleuauction-bucket/menu/${menus[index].menuAttaches[0].saveFilename}`}
    //                     alt={menus[index].menuAttaches[0].originFilename}
    //                   />
    //                 ) : (
    //                   <img src="/images/fresh.png" alt="menu" />
    //                 )}
    //                 <p>메뉴이름: {menus[index].menuName}</p>
    //                 <p>메뉴가격: {menus[index].menuPrice}</p>
    //               </div>
    //             ) : (
    //               <div>
    //                 <p>메뉴 정보 없음</p>
    //               </div>
    //             )}
    //           </div>
    //         </div>
    //       ))
    //     ) : (
    //       <p>Loading...</p>
    //     )}
  
    //     <p>총액: {totalPrice}</p> {/* 총합계 출력 */}
    //   </>
    // );

      <div style={styles.container}>
        <h1>주문 목록</h1>
        {orderMenus.length > 0 ? (
          orderMenus.map((orderMenu, index) => (
            <div key={orderMenu.orderMenuNo} style={styles.orderItem}>
              <div style={styles.imageContainer}>
                {menus[index] && menus[index].menuAttaches && menus[index].menuAttaches[0] ? (
                  <img
                    src={`https://kr.object.ncloudstorage.com/bleuauction-bucket/menu/${menus[index].menuAttaches[0].saveFilename}`}
                    alt={menus[index].menuAttaches[0].originFilename}
                    style={styles.image}
                  />
                ) : (
                  <img src="/images/fresh.png" alt="menu" style={styles.image} />
                )}
              </div>
              <div style={styles.info}>
                <p>메뉴이름: {menus[index] ? menus[index].menuName : '정보 없음'}</p>
                <p>메뉴가격: {menus[index] ? menus[index].menuPrice : '0'}</p>
                <p>주문수량: {orderMenu.orderMenuCount}</p>
              </div>
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
        <div>총액: {totalPrice}</div>
      </div>
    );
  }
  
  export default OrderMenuList;
  