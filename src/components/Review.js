import './Review.css';
import React, { useState, useEffect, useRef } from 'react';
import axios, { formToJSON } from 'axios';

function sendAxiosRequest(url, method, params, successCallback, errorCallback) {
  console.log(url);
  const axiosConfig = {
    setTimeout: 5000,
    url: url,
    method: method,
  };
  if (params != null)
    axiosConfig.params = params;
  axios(axiosConfig).then(successCallback).catch(errorCallback);
}

function dateFormatParse(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
}


function handleInputChange(e, index, state, stateSetter) {
  let { name, value } = e.target;
  let deepCopyState = [...state];
  deepCopyState[index] = {
    ...deepCopyState[index],
    [name]: value,
  };
  stateSetter(deepCopyState);
};


function Review() {
  return (
    <div id='maindDiv' className="ba-main-div">
      <div id='mainTitleDiv' className="ba-main-title-div">리뷰</div>
      <div id='mainContentDiv' className="ba-main-content-div">
        <ReviewWriteForm></ReviewWriteForm>
        <ReviewListDiv></ReviewListDiv>
      </div>
    </div >
  );
}


function ReviewWriteForm() {
  const [storeNo, setStoreNo] = useState(1);
  const [memberNo, setMemberNo] = useState(1);
  const [reviewFreshness, setReviewFreshness] = useState('M');

  return (
    <form id="reviewWriteForm" className='ba-form'>
      <label htmlFor='storeNo'>가게번호<input id='storeNo' name='storeNo' value={storeNo} onChange={(e) => setStoreNo(e.target.value)}></input></label>
      <label htmlFor='memberNo'>회원번호<input id='memberNo' name='memberNo' value={memberNo} onChange={(e) => setMemberNo(e.target.value)}></input></label>
      <span>신선도 : </span>
      <label htmlFor='freshness-low'>낮음<input type="radio" id='freshness-low' name='reviewFreshness' value={'L'} checked={reviewFreshness === 'L'} onChange={() => setReviewFreshness('L')}></input></label>
      <label fhtmlForor='freshness-medium'>중간<input type="radio" id='freshness-medium' name='reviewFreshness' value={'M'} checked={reviewFreshness === 'M'} onChange={() => setReviewFreshness('M')}></input></label>
      <label htmlFor='freshness-high'>높음<input type="radio" id='freshness-high' name='reviewFreshness' value={'H'} checked={reviewFreshness === 'H'} onChange={() => setReviewFreshness('H')}></input></label>
      <textarea name="reviewContent" className='ba-textarea'></textarea>
      <button type='button' onClick={() => {
        let jsonObj = formToJSON(document.getElementById('reviewWriteForm'));
        console.log(jsonObj);
        if (jsonObj.reviewContent.trim().length < 1) {
          alert('작성하실 리뷰 내용을 입력해주세요!');
          return;
        }
        sendAxiosRequest('http://localhost:8080/review/add/sendAxios', 'POST', jsonObj,
          response => {
            alert('리뷰를 성공적으로 작성하였습니다!');
            console.log(response.data);
          }, error => console.log(error));
      }}>리뷰작성</button>
    </form >
  );
}

function ReviewListDiv() {
  const pageRowCnt = 4;
  let [startPageNo, setStartPageNo] = useState(0);
  let [reviewData, setReviewData] = useState([]);
  let [selectedReviewNo, setSelectedReviewNo] = useState(null);
  let [newAddLength, setNewAddLength] = useState(pageRowCnt);

  useEffect(() => {
    const handleScroll = () => {
      if (newAddLength < pageRowCnt) {
        return;
      }
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.scrollHeight - 100
      ) {

        console.log("스크롤 이벤트 핸들러 작동");
        sendAxiosRequest(`http://localhost:8080/review/list/sendAxios?startPage=${startPageNo}`, 'GET', null, response => {
          let addReviewList = response.data;
          setNewAddLength(response.data.length);
          let newReviewList = [...reviewData, ...addReviewList];

          setStartPageNo(Math.floor(newReviewList.length / pageRowCnt));
          setReviewData(newReviewList);
        }, error => console.log(error))
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, [startPageNo, reviewData]);

  useEffect(() => {
    // 초기 데이터 로딩 및 startPage 설정
    sendAxiosRequest("http://localhost:8080/review/list/sendAxios", "GET", null,
      response => {
        console.log('아무것도 못받아오냐?');
        setReviewData(response.data);
        setStartPageNo(Math.floor(response.data.length / pageRowCnt));
        console.log(response.data);
      }, error => console.log(error));
  }, []); // 비어있는 의존성 배열을 사용하여 한 번만 실행



  return (
    <div id="reviewListDiv" className='review-list-div'>
      {reviewData.map((review, index) => (
        <div key={index} className='review-div'>
          <form id={'reviewUpdateForm' + index}>
            <input id={'reviewNo' + index} name='reviewNo' value={review.reviewNo}></input>
            <textarea name='reviewContent' value={review.reviewContent} onChange={(e) => handleInputChange(e, index, reviewData, setReviewData)}></textarea>
            <span>신선도 : </span>
            <label htmlFor='freshness-low'>낮음<input type="radio" name='reviewFreshness' value={'L'} checked={review.reviewFreshness === 'L' ? true : false} onChange={(e) => handleInputChange(e, index, reviewData, setReviewData)}></input></label>
            <label htmlFor='freshness-low'>중간<input type="radio" name='reviewFreshness' value={'M'} checked={review.reviewFreshness === 'M' ? true : false} onChange={(e) => handleInputChange(e, index, reviewData, setReviewData)}></input></label>
            <label htmlFor='freshness-low'>높음<input type="radio" name='reviewFreshness' value={'H'} checked={review.reviewFreshness === 'H' ? true : false} onChange={(e) => handleInputChange(e, index, reviewData, setReviewData)}></input></label>
            <button type='button' onClick={() => {
              let jsonObj = formToJSON(new FormData(document.getElementById('reviewUpdateForm' + index)));
              console.log(jsonObj);
              sendAxiosRequest('http://localhost:8080/review/update/sendAxios', 'POST', jsonObj, response => {
                console.log(response.data);
                alert('리뷰를 성공적으로 변경하였습니다!');
              }, error => console.log(error));
            }}>리뷰수정</button>
            <button type='button' onClick={
              () => {
                sendAxiosRequest(`http://localhost:8080/review/delete/sendAxios?reviewNo=${review.reviewNo}`, 'GET', null, response => {
                  console.log(response.data);
                  alert('리뷰가 성공적으로 삭제되었습니다!');
                }, error => {
                  console.log(error);
                });
              }}>리뷰삭제</button>
          </form>
          <button type='button' onClick={() => {
            selectedReviewNo === review.reviewNo ? setSelectedReviewNo(null) : setSelectedReviewNo(review.reviewNo);
          }}>답글⬇️</button>
          {selectedReviewNo === review.reviewNo && (
            <AnswerForm reviewNo={review.reviewNo} />
          )}
        </div>
      ))
      }
    </div >
  );
}

function AnswerForm(props) {
  return (
    <div>
      <form id="answerWriteForm" className='ba-form'>
        리뷰번호<input name='reviewNo' value={props.reviewNo}></input>
        회원번호<input name='memberNo' value={1}></input>
        <textarea name='answerContent'></textarea>

        <button type='button' onClick={() => {
          let jsonObj = formToJSON(document.getElementById('answerWriteForm'));
          console.log(jsonObj);
          if (jsonObj.answerContent.trim().length < 1) {
            alert('작성하실 답급 내용을 입력해주세요!');
            return;
          }
          sendAxiosRequest('http://localhost:8080/answer/add/sendAxios', 'POST', jsonObj,
            response => {
              alert('답글을 성공적으로 작성하였습니다!');
              console.log(response.data);
            }, error => console.log(error));
        }}>답글작성</button>
      </form >
      <AnswerListDiv reviewNo={props.reviewNo}></AnswerListDiv>
    </div>
  );
}

function AnswerListDiv(props) {
  let [answerList, setAnswerList] = useState([]);
  let [startPageNo, setStartPageNo] = useState(0);


  useEffect(() => {
    sendAxiosRequest(`http://localhost:8080/answer/list/sendAxios?reviewNo=${props.reviewNo}`, "GET", null,
      response => {
        console.log(response.data);
        setAnswerList(response.data);

        setStartPageNo(response.data.length / 2);
        console.log(answerList);
      }, error => console.log(error));

    return () => {
    }
  }, []);

  return (
    <div id="answerListDiv" className='answer-list-div'>
      {answerList.map((answer, index) => (
        <div key={index}>
          <form id={'answerUpdateForm' + index}>
            <input name='reviewNo' value={props.reviewNo}></input>
            <input name='answerNo' value={answer.answerNo}></input>
            <textarea name='answerContent' value={answer.answerContent} className='ba-textarea' onChange={(e) => {
              handleInputChange(e, index, answerList, setAnswerList);
            }}></textarea>
            <button type='button' onClick={
              () => {
                let jsonObj = formToJSON(new FormData(document.getElementById('answerUpdateForm' + index)));
                console.log(jsonObj);
                sendAxiosRequest(`http://localhost:8080/answer/update/sendAxios?`, 'POST', jsonObj, response => {
                  console.log(response.data);
                  alert('답글이 성공적으로 변경되었습니다!');
                }, error => {
                  console.log(error);
                });
              }
            } >답글수정</button>
            <button type='button' onClick={
              () => {
                sendAxiosRequest(`http://localhost:8080/answer/delete/sendAxios?answerNo=${answer.answerNo}`, 'GET', null, response => {
                  console.log(response.data);
                  alert('답글이 성공적으로 삭제되었습니다!');
                }, error => {
                  console.log(error);
                });
              }
            }>답글삭제</button>


          </form>
        </div >
      ))
      }
      <button type='button' onClick={() => {
        sendAxiosRequest(`http://localhost:8080/answer/list/sendAxios?reviewNo=11&startPage=${startPageNo}`, "GET", null,
          response => {
            console.log(response.data);
            let newAnswerList = [...answerList, ...response.data];
            setAnswerList(newAnswerList);
            console.log(newAnswerList.length / 2);
            setStartPageNo(newAnswerList.length / 2);
          }, error => {
            console.log(error);
          })
      }}>...더 보기➕</button>
    </div >
  );
}



export default Review;
