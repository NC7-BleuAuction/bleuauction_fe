import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './StoreItemDailyPrice.css';
import { sendAxiosRequest, accessTokenRefresh, refreshTokenInvalid, isTokenExpired, getAccessToken, isNullUndefinedOrEmpty } from '../utility/common';

// handsontable라이브러리 관련 import
import 'handsontable/dist/handsontable.full.min.css';
import Handsontable from 'handsontable/base';
import { registerAllModules } from 'handsontable/registry';
import { HotTable } from '@handsontable/react';
import { registerRenderer, textRenderer } from 'handsontable/renderers';

registerAllModules();

const sizeOptions = {
  S: '소 (0KG~1KG 이하)',
  M: '중 (1KG~3KG 이하)',
  L: '대 (3KG 초과)',
};

const categoryOptions = {
  S: '생선(횟감)',
  F: '생선(비횟감)',
  C: '갑각류',
  M: '패류',
  E: '기타',
};

const originOptions = {
  D: '국내산',
  I: '수입산',
};

const originPlaceOptions = {
  ES: '동해',
  WS: '서해',
  SS: '남해',
  JJ: '제주',
  WD: '완도',
  JP: '일본',
  CN: '중국',
  RU: '러시아',
  NW: '노르웨이',
};

const wildFarmOptions = {
  W: '자연산',
  F: '양식',
};

const recommendationItems = [
  {
    id: 1,
    image: 'item1.jpg',
    name: '추천 상품 1',
  },
  {
    id: 2,
    image: 'item2.jpg',
    name: '추천 상품 2',
  },
];


function firstRowRenderer(instance, td, row, col, prop, value, cellProperties) {
  textRenderer.apply(this, arguments);
  td.style.fontSize = '20px';
  td.style.padding = '20px';
  td.style.color = 'black';
  td.style.border = 'solid 2px white';
  td.style.background = '#f2f2f2';
}


function StoreItemDailyPrice() {
  const [totalDailyPrice, setTotalDailyPrice] = useState(0);
  const [averageDailyPrice, setAverageDailyPrice] = useState(0);
  const [items, setItems] = useState([]);
  const accessToken = sessionStorage.getItem('accessToken');


  useEffect(() => {
    if (!isTokenExpired(accessToken)) {   // AccessToken이 있을 때만 요청 
      sendAxiosRequest('/api/sidp/list', 'GET', null, response => {
        if (response.data) {
          let sidpList = response.data;
          const columnData = sidpList.map((sidp) => sidp.dailyPrice);
          const total = columnData.reduce((acc, current) => acc + current, 0);
          const avg = total / (sidpList.length || 1); // 0으로 나누는 것을 방지

          // 상태 업데이트
          setTotalDailyPrice(total);
          setAverageDailyPrice(avg);
          setItems(sidpList);
        }
      }, error => {
        if (error.response.data) {
          const errorData = error.response.data;
          console.log('errorData: ', errorData);
          if (errorData === 'E') { // 토큰이 있으나 만료
            accessTokenRefresh();
          } else if (errorData === 'I') { // 토큰이 아예없거나 유효하지 않은 토큰
            refreshTokenInvalid();
          }
        }
      }, null, accessToken);
    }
  }, [accessToken]); // accessToken이 변경될 때만 실행

  const transformedData = items.map((item) => {
    return {
      'daliyPriceDate': item.daliyPriceDate,
      'itemCode': categoryOptions[item.itemCode],
      'itemName': item.itemName,
      'itemSize': sizeOptions[item.itemSize],
      'wildFarmStatus': wildFarmOptions[item.wildFarmStatus],
      'originStatus': originOptions[item.originStatus],
      'originPlaceStatus': originPlaceOptions[item.originPlaceStatus],
      'dailyPrice': item.dailyPrice,
    };
  });

  // items 배열이 비어있을 때, 빈 행 추가
  if (items.length === 0) {
    transformedData.push({
      'daliyPriceDate': '품목에 대한 시세 데이터가 존재하지 않습니다!',
      'itemCode': '',
      'itemName': '',
      'itemSize': '',
      'wildFarmStatus': '',
      'originStatus': '',
      'originPlaceStatus': '',
      'dailyPrice': '',
    });
  }

  console.log(items.length);
  const mergeCells = items.length === 0 ? [
    {
      row: 0,
      col: 0,
      rowspan: 1,
      colspan: 8,
    }
  ] : [];
  console.log('transformedData: ', transformedData);

  return (
    <div className="daily-box">
      <h1>오늘의 시세</h1>
      <br />
      <div className="ba-price-list-div">
        <div>
          <HotTable
            mergeCells={mergeCells}
            licenseKey="non-commercial-and-evaluation"
            colHeaders={['기준날짜', '품목구분', '품목명', '품목크기', '자연/양식', '국산/수입', '원산지', '품목가격(원)',]}
            data={transformedData}
            formattedAvg={'0,0,0'}
            rowHeaders={true}
            colWidths={[250, 200, 200, 300, 200, 250, 200, 250]}
            columnHeaderHeight={50}
            filters={true}
            dropdownMenu={true}
            customBorders={true}
            settings={{
              columnSorting: {
                headerAction: true,
                multiColumnSorting: true,
                sortEmptyCells: false, // 빈 셀 정렬제외
                indicator: true, // 정렬순서 표시
                initialConfig: {
                  column: 1,
                  sortOrder: 'desc',
                },
              },
              className: 'customFilterButtonExample1',
              width: 'auto',
              height: 'auto',
              rowHeights: 60,
              readOnly: true,
              afterGetColHeader: function (col, th) {
                var cellWidth = this.getColWidth(col); // 각 열 헤더의 배경색을 셀 넓이만큼 설정
                th.style.backgroundColor = '#0056b3'; // 배경색을 변경하려면 원하는 색상으로 수정
                th.style.color = 'white';
                th.style.fontWeight = 'bold';
                th.className = 'htMiddle';
              },
              afterGetRowHeader: function (row, th) {
                th.style.backgroundColor = '#0056b3';
                th.style.color = 'white';
                th.style.fontWeight = 'bold';
                th.style.fontSize = '20px';
                th.className = 'htMiddle';
              },
              columns: [
                {
                  title: '기준날짜',
                  type: 'date',
                  className: 'htMiddle',
                  dateFormat: 'YYYY-MM-DD',
                  data: 'daliyPriceDate',
                },
                {
                  title: '품목구분',
                  type: 'text',
                  className: 'htLeft htMiddle',
                  data: 'itemCode',
                },
                {
                  title: '품목명',
                  type: 'text',
                  className: 'htLeft htMiddle',
                  data: 'itemName',
                },
                {
                  title: '품목크기',
                  type: 'text',
                  className: 'htLeft htMiddle',
                  data: 'itemSize',
                },
                {
                  title: '자연/양식',
                  type: 'text',
                  className: 'htLeft htMiddle',
                  data: 'wildFarmStatus',
                },
                {
                  title: '국내산/수입산',
                  type: 'text',
                  className: 'htLeft htMiddle',
                  data: 'originStatus',
                },
                {
                  title: '원산지',
                  type: 'text',
                  data: 'originPlaceStatus',
                  className: 'htLeft htMiddle',
                },
                {
                  title: '품목가격(원)',
                  type: 'numeric',
                  data: 'dailyPrice',
                  className: 'htRight htMiddle',
                  numericFormat: {
                    pattern: '0,0'
                  }
                },
              ],
              afterFilter() {
                const handsontableInstance = this;
                const filters = handsontableInstance.getPlugin('Filters');
                console.log('filters: ', filters.filtersRowsMap.indexedValues);

                let filteredList = filters.filtersRowsMap.indexedValues;


                let total = 0;
                let avg = 0;
                let totalCnt = 0;
                for (let i = 0; i < filteredList.length - 1; i++) {
                  if (!filteredList[i]) {
                    total += transformedData[i].dailyPrice;
                    totalCnt++;
                  }
                }

                avg = total / (totalCnt == 0 ? 1 : totalCnt);
                console.log('total(합계): ', total);
                console.log('avg(평균): ', avg);

                setTotalDailyPrice(total);
                setAverageDailyPrice(avg);
              },
            }}

            cells={(row, col) => {
              const cellProperties = {};
              cellProperties.renderer = firstRowRenderer; // 사용자 정의 렌더러 함수를 셀에 적용
              return cellProperties;
            }}

          />
          <div className="ba-span-div">
            <span><strong>합계:</strong> {totalDailyPrice.toLocaleString()} (원)</span>
            <span><strong>평균:</strong> {Math.floor(averageDailyPrice).toLocaleString()} (원)</span>
          </div>
        </div>

      </div>
    </div>
  );
}

export default StoreItemDailyPrice;