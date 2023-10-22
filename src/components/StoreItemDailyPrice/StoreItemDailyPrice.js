import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './StoreItemDailyPrice.css';
import { sendAxiosRequest, accessTokenRefresh, refreshTokenInvalid } from '../utility/common';

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
  const [summaryData, setSummaryData] = useState([]);
  const [averagePrice, setAveragePrice] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedOrigin, setSelectedOrigin] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true); // 임시 false
  const accessToken = sessionStorage.getItem('accessToken');

  const handsontableInstance = useRef(null);

  function calculateAverage(arr) {
    if (arr.length === 0) {
      return 0; // 빈 배열의 경우 평균은 0
    }

    const sum = arr.reduce((total, current) => total + current, 0);
    return sum / arr.length;
  }


  useEffect(() => {

    if (accessToken) {   // AccessToken이 있을 때만 요청 

      // 요청 헤더에 엑세스 토큰 추가
      const config = {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      };

      console.log('StoreItemDailyPrice.js headers: ', config);

      axios.get('/api/sidp/list', config)
        .then(response => {
          if (response.data) {
            let sidpList = response.data;
            // 추가할 빈 로우 생성
            const emptyRow = {
              'daliyPriceDate': '',
              'itemCode': '',
              'itemName': '',
              'itemSize': '',
              'wildFarmStatus': '',
              'originStatus': '',
              'originPlaceStatus': '',
              'dailyPrice': '',

            };

            // 초기 데이터에 빈 로우 추가
            sidpList.push(emptyRow);

            // 평균 가격 계산
            const columnData = sidpList.map((sidp) => sidp.dailyPrice);
            const avg = calculateAverage(columnData);
            const formattedAvg = avg.toFixed(2);
            setAveragePrice(formattedAvg.toLocaleString());

            setItems(sidpList);
            setTimeout(() => {
              setLoading(false);
            }, 10);
          }
        }).catch(error => {
          const errorData = error.response.data;
          console.log('errorData: ', errorData);
          if (errorData === 'E') { // 토큰이 있으나 만료
            accessTokenRefresh();
          } else if (errorData === 'I') { // 토큰이 아예없거나 유효하지 않은 토큰
            refreshTokenInvalid();
          }
          setLoading(false);
        });
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
  console.log('transformedData: ', transformedData);


  return (
    <div className="daily-box">
      <div className="filter-buttons">
        <p>품목 카테고리 선택:</p>
        {Object.keys(categoryOptions).map((code) => (
          <button
            key={code}
            className={selectedCategory === code ? 'selected' : ''}
            onClick={() => setSelectedCategory(code)}
          >
            {categoryOptions[code]}
          </button>
        ))}
      </div>
      <div className="origin-buttons">
        <p>원산지 선택:</p>
        {Object.keys(originOptions).map((code) => (
          <button
            key={code}
            className={selectedOrigin === code ? 'selected' : ''}
            onClick={() => setSelectedOrigin(code)}
          >
            {originOptions[code]}
          </button>
        ))}
      </div>
      <div className="carousel">
        <h2>추천하는 오늘의 생선</h2>
        {/* <Carousel showArrows={true}>
          {recommendationItems.map((item) => (
            <div key={item.id}>
              <img src={item.image} alt={item.name} />
              <p className="legend">{item.name}</p>
            </div>
          ))}
        </Carousel> */}
      </div>
      <h1>오늘의 시세</h1>
      <div class="controlsQuickFilter">
        <label htmlFor="columns" class="selectColumn">선택항목 :</label>
        <select name="columns" id="columns">
          <option value="0">기준날짜</option>
          <option value="1">품목구분</option>
          <option value="2">품목명</option>
          <option value="3">품목크기</option>
          <option value="4">자연/양식</option>
          <option value="5">국산/수입</option>
          <option value="6">원산지</option>
          <option value="7">품목가격(원)</option>
        </select>
      </div>
      <div class="controlsQuickFilter">
        <input id="filterField" type="text" placeholder="Filter" />
      </div>
      <br />
      <div id="exampleQuickFilter"></div>
      <div className="price-list">
        {loading ? (
          <p>로딩 중...</p>
        ) :
          (<div>
            <HotTable
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

                  // 초기 정렬
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
                columnSummary: [
                  {
                    reversedRowCoords: true,
                    sourceColumn: 7,
                    type: 'average',
                    destinationRow: 0,
                    destinationColumn: 7,
                    forceNumeric: true,
                    className: 'htMiddle',
                  }
                ],
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
                      pattern: '0,0.00'
                    }
                  },
                ],

                // className: 'exampleQuickFilter',
                afterFilter() {
                  const handsontableInstance = this;
                  // get the `Filters` plugin, so you can use its API
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

                  transformedData[transformedData.length - 1].dailyPrice = Math.floor(avg).toLocaleString() + ' (원)';

                  document.getElementById('inputAvg').innerHTML = '<strong>평균</strong> : ' + Math.floor(avg).toLocaleString() + ' (원)';
                  document.getElementById('inputSum').innerHTML = '<strong>합계</strong> : ' + total.toLocaleString() + ' (원)';
                  this.render();

                },
              }}

              cells={(row, col) => {
                const cellProperties = {};
                cellProperties.renderer = firstRowRenderer; // 사용자 정의 렌더러 함수를 셀에 적용
                return cellProperties;
              }}

            />
            <div className='ba-span-div'>
              <span id='inputAvg'><strong>평균</strong> : 0 (원)</span>
              <span id='inputSum'><strong>합계</strong> : 0 (원)</span>
            </div>
          </div>
          )}
      </div>
    </div>
  );
}

export default StoreItemDailyPrice;