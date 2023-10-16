import './Review.css';
import React, { useState, useEffect } from 'react';
import axios, { formToJSON } from 'axios';

function sendAxiosRequest(url, method, params, successCallback, errorCallback) {
  console.log(url);
  const axiosConfig = {
    timeout: 5000,
    url: url,
    method: method,
  };
  if (params != null)
    axiosConfig.params = params;
  axios(axiosConfig).then(successCallback).catch(errorCallback);
}

function sendAxiosMultipartRequest(url, formData, successCallback, errorCallback) {
  console.log(url);
  const axiosConfig = {
    timeout: 5000,
    url: url,
    method: 'POST',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  };
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


function scrollMoveTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function ReviewForm() {
  let [loginUser, setLoginUser] = useState(null);

  useEffect(() => {
    sendAxiosRequest("/api/member/loginCheck", "GET", null,
      response => {
        let repLoginUser = response.data.loginUser;
        if (repLoginUser === null) {
          window.location.href = '/main';
        } else {
          setLoginUser(repLoginUser);
        }
      }, error => console.log(error));
  }, []);

  // 로그인 확인
  console.log(loginUser);

  if (loginUser != null && loginUser != undefined) {
    return (
      <div id='maindDiv' className="review-main-div">
        <div id='mainContentDiv' className="ba-main-content-div">
          <ReviewWriteForm loginUser={loginUser}></ReviewWriteForm>
          <ReviewListDiv></ReviewListDiv>
        </div>
        <div id="topBtnDiv" onClick={scrollMoveTop}>↑</div>
      </div >

    );
  }
}


function ReviewWriteForm(props) {
  let [loginUser, setLoginUser] = useState(props.loginUser);
  let [storeNo, setStoreNo] = useState(1);
  let [memberNo, setMemberNo] = useState(1);
  let [reviewFreshness, setReviewFreshness] = useState('M');

  if (loginUser != null && loginUser != undefined) {

    return (
      <form id="reviewWriteForm" encType='multipart/form-data' className='ba-form'>
        <label htmlFor='storeNo'><input id='storeNo' name='storeNo' value={storeNo} hidden onChange={(e) => setStoreNo(e.target.value)}></input></label>
        <label htmlFor='memberNo'><input id='memberNo' name='memberNo' value={loginUser.memberNo} hidden onChange={(e) => setMemberNo(e.target.value)}></input></label>
        <img className='ba-member-profile' src='http://fvhsczepiibf19983519.cdn.ntruss.com/member/defaultProfile.jpg?type=f&w=50&h=50&ttype=jpg' ></img>
        <sapn className='ba-font-name'>{loginUser.memberName}</sapn>
        <span className='ba-font-title'>신선도 :</span>
        <label htmlFor='freshness-low' className='ba-freshness'><img src='/images/low.png' /><input type="radio" id='freshness-low' name='reviewFreshness' value={'L'} checked={reviewFreshness === 'L'} onChange={() => setReviewFreshness('L')}></input></label>
        <label htmlFor='freshness-medium' className='ba-freshness'><img src='/images/mid.png' /><input type="radio" id='freshness-medium' name='reviewFreshness' value={'M'} checked={reviewFreshness === 'M'} onChange={() => setReviewFreshness('M')}></input></label>
        <label htmlFor='freshness-high' className='ba-freshness'><img src='/images/high.png' /><input type="radio" id='freshness-high' name='reviewFreshness' value={'H'} checked={reviewFreshness === 'H'} onChange={() => setReviewFreshness('H')}></input></label>
        <div>
          <textarea name="reviewContent" className='ba-textarea' />
        </div>
        <div className='ba-text-left'>
          <button type='button' className='ba-btn ba-margin-right10' onClick={() => {
            let formData = new FormData(document.getElementById('reviewWriteForm'));
            let reviewContentLength = formData.get('reviewContent').trim().length;
            console.log(reviewContentLength);

            if (reviewContentLength < 1) {
              alert('작성하실 리뷰 내용을 입력해주세요!');
              return;
            }

            let fileInput = document.querySelector('input[type="file"]');
            for (let i = 0; i < fileInput.files.length; i++) {
              formData.append("multipartFiles", fileInput.files[i]);
            }

            sendAxiosMultipartRequest('/api/review/add', formData,
              response => {
                alert('리뷰를 성공적으로 작성하였습니다!');
                console.log(response.data);
              }, error => console.log(error));
          }}>리뷰작성</button>
          <label htmlFor='fileInput' className='ba-file-label'>파일 첨부</label><span id='fileInfoSpan'></span>
          <input type='file' id='fileInput' multiple hidden className='ba-file-btn' onChange={(e) => {
            let files = e.target.files;
            console.log(files);
            let fileInfoStr;
            for (let i = 0; i < 2; i++) {
              fileInfoStr = (i === 0) ? fileInfoStr + ' ' + files[i].name + ', ' : fileInfoStr + ' ' + files[i].name;
            }
            document.getElementById('fileInfoSpan').textContent = '파일명: ' + fileInfoStr + ' 등 ' + files.length + '개의 첨부파일';
          }} />
        </div>

      </form >
    );
  }
}

function ReviewListDiv(props) {
  const pageRowCnt = 4;
  let [loginUser, setLoginUser] = useState(props.loginUser);
  let [startPageNo, setStartPageNo] = useState(0);
  let [reviewList, setReviewList] = useState([]);
  let [selectedReviewNo, setSelectedReviewNo] = useState(null);
  let [newAddLength, setNewAddLength] = useState(pageRowCnt);

  useEffect(() => {
    const handleScroll = () => {
      console.log(newAddLength);
      if (newAddLength < pageRowCnt) {
        return;
      }
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.scrollHeight - 100
      ) {

        console.log("스크롤 이벤트 핸들러 작동");
        sendAxiosRequest(`/api/review/list?startPage=${startPageNo}`, 'GET', null, response => {
          console.log(response.data);
          let addReviewList = response.data.reviewList;
          setNewAddLength(response.data.reviewList.length);
          let newReviewList = [...reviewList, ...addReviewList];

          setStartPageNo(Math.floor(newReviewList.length / pageRowCnt));
          setReviewList(newReviewList);
        }, error => console.log(error))
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, [startPageNo, reviewList]);

  useEffect(() => {
    sendAxiosRequest("/api/review/list", "GET", null,
      response => {
        console.log(response.data);
        let data = response.data;
        setLoginUser(data.loginUser);
        setReviewList(data.reviewList);
        setNewAddLength(data.reviewList.length);
        setStartPageNo(Math.floor(newAddLength / pageRowCnt));
      }, error => console.log(error));
  }, []);



  return (
    <div id="reviewListDiv" className='review-list-div'>
      {reviewList.map((review, index) => (
        <div key={index} className='review-div'>
          <form id={'reviewUpdateForm' + index}>
            <input id={'reviewNo' + index} name='reviewNo' hidden value={review.reviewNo} />

            <div className='ba-title-container'>
              <img className='ba-member-profile' src='http://fvhsczepiibf19983519.cdn.ntruss.com/member/defaultProfile.jpg?type=f&w=50&h=50&ttype=jpg' />
              <div className='ba-title-info'>
                <b>{review.member.memberName}</b>
                <span><b>작성일:</b><input type='text' value={dateFormatParse(new Date(review.mdfDatetime))} className='ba-input-text' disabled /></span>
              </div>
              <div className='ba-title-freshness'>
                <span className='ba-font-title'>신선도 :</span>
                <label htmlFor='freshness-low'>
                  <img src='/images/low.png' />
                  <input type="radio" name='reviewFreshness' value={'L'} checked={review.reviewFreshness === 'L'} onChange={(e) => handleInputChange(e, index, reviewList, setReviewList)} />
                </label>
                <label htmlFor='freshness-mid'>
                  <img src='/images/mid.png' />
                  <input type="radio" name='reviewFreshness' value={'M'} checked={review.reviewFreshness === 'M'} onChange={(e) => handleInputChange(e, index, reviewList, setReviewList)} />
                </label>
                <label htmlFor='freshness-high'>
                  <img src='/images/high.png' />
                  <input type="radio" name='reviewFreshness' value={'H'} checked={review.reviewFreshness === 'H'} onChange={(e) => handleInputChange(e, index, reviewList, setReviewList)} />
                </label>
              </div>
            </div>

            <hr />
            <div>
              {review.reviewAttaches.length > 0 && (
                <div className='ba-img-list-div'>
                  <img id={'defaultImg' + index} className='ba-img-first' src={`https://kr.object.ncloudstorage.com/bleuauction-bucket/review/${review.reviewAttaches.length > 0 ? review.reviewAttaches[0].saveFilename : ''}`} />

                  <div className='ba-div-col-sort'>
                    {
                      review.reviewAttaches.map((attach) => (
                        <div>
                          <img className='ba-img-sub-list-div' src={`https://kr.object.ncloudstorage.com/bleuauction-bucket/review/${attach.saveFilename}`} onMouseEnter={(e) => {
                            let targetImgSrc = e.target.src;
                            let defaultImgId = 'defaultImg' + index;
                            console.log(targetImgSrc);
                            let defaultImg = document.getElementById(defaultImgId);
                            console.log(defaultImg);
                            defaultImg.src = targetImgSrc;
                          }} />
                        </div>
                      )
                      )
                    }
                  </div>
                </div>
              )}
              {review.member.memberNo == loginUser.memberNo ?
                (<textarea name='reviewContent' value={review.reviewContent} className='ba-textarea' onChange={(e) => handleInputChange(e, index, reviewList, setReviewList)} />)
                : (<textarea name='reviewContent' value={review.reviewContent} className='ba-textarea-disabled' readOnly />
                )}
            </div>

            {review.member.memberNo == loginUser.memberNo ?
              (<div className='ba-btn-div'>
                <div className='ba-file-list'>
                  {review.reviewAttaches.map((attach) => (
                    <div key={attach.fileNo} className="ba-file-item">
                      <li>{attach.originFilename}</li>
                      <p className="ba-delete-text" onClick={() => {
                        sendAxiosRequest(`/api/review/deleteFile?fileNo=${attach.fileNo}`, 'GET', null,
                          response => {
                            console.log(response.data);
                            alert(response.data.originFilename + '(이)가 삭제되었습니다!');
                          },
                          error => {
                            console.log(error);
                          }
                        );
                      }}>[삭제]</p>
                    </div>
                  ))}
                </div>

                <button type='button' className='ba-btn ba-margin-right20' onClick={() => {
                  let jsonObj = formToJSON(new FormData(document.getElementById('reviewUpdateForm' + index)));
                  console.log(jsonObj);
                  sendAxiosRequest('/api/review/update', 'POST', jsonObj, response => {
                    console.log(response.data);
                    alert('리뷰를 성공적으로 변경하였습니다!');
                  }, error => console.log(error));
                }}>리뷰수정</button>
                <button type='button' className='ba-btn ba-margin-right10' onClick={
                  () => {
                    sendAxiosRequest(`/api/review/delete?reviewNo=${review.reviewNo}`, 'GET', null, response => {
                      console.log(response.data);
                      alert('리뷰가 성공적으로 삭제되었습니다!');
                    }, error => {
                      console.log(error);
                    });
                  }}>리뷰삭제</button>
              </div>) : (<div></div>)
            }

            <div className='ba-text-right'>
              <button type='button' className='ba-small-btn' onClick={() => {
                selectedReviewNo === review.reviewNo ? setSelectedReviewNo(null) : setSelectedReviewNo(review.reviewNo);
              }}>답글목록</button>
            </div>
          </form>

          {
            selectedReviewNo == review.reviewNo && (
              <AnswerForm reviewNo={review.reviewNo} loginUser={loginUser} />
            )
          }
        </div >
      ))
      }
    </div >
  );
}

function AnswerForm(props) {
  return (
    <div>
      <hr />
      <div className='ba-text-right'>
        <button type='button' className='ba-small-btn' onClick={() => {
          document.getElementById('answerWriteFormDiv').style.display = 'block';
        }}>답글작성✍️</button>
      </div>
      <div id="answerWriteFormDiv">
        <h4 className='ba-font-title'>답글작성</h4>
        <form id="answerWriteForm">
          <input name='reviewNo' hidden value={props.reviewNo}></input>
          <input name='memberNo' hidden value={1}></input>
          <button type='button' className='ba-close-btn' onClick={
            () => {
              document.getElementById('answerWriteFormDiv').style.display = 'none';

            }
          }>x</button>
          <div>
            <textarea name='answerContent' className='ba-small-textarea'></textarea>
          </div>
          <div className='ba-btn-div'>
            <button type='button' className='ba-btn ba-margin-right40' onClick={() => {
              let jsonObj = formToJSON(document.getElementById('answerWriteForm'));
              console.log(jsonObj);
              if (jsonObj.answerContent.trim().length < 1) {
                alert('작성하실 답급 내용을 입력해주세요!');
                return;
              }
              sendAxiosRequest('/api/answer/add', 'POST', jsonObj,
                response => {
                  alert('답글을 성공적으로 작성하였습니다!');
                  console.log(response.data);
                }, error => console.log(error));
            }}>작성하기</button>
          </div>
        </form >
      </div>
      <AnswerListDiv reviewNo={props.reviewNo} loginUser={props.loginUser}></AnswerListDiv>
    </div >
  );
}

function AnswerListDiv(props) {
  const pageRowCnt = 2;
  let [answerList, setAnswerList] = useState([]);
  let [startPageNo, setStartPageNo] = useState(0);


  useEffect(() => {
    sendAxiosRequest(`/api/answer/list?reviewNo=${props.reviewNo}`, "GET", null,
      response => {
        if (response.data.length <= 1) {
          return;
        }
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

        < div className='answer-div' key={index} >
          <form id={'answerUpdateForm' + index}>
            <input name='reviewNo' value={props.reviewNo} hidden></input>
            <input name='answerNo' value={answer.answerNo} hidden></input>
            <div className='ba-title-container'>
              <div className='ba-margin-right-auto'>{answer.member.memberName}</div>
              <b>작성일:</b><input type='text' value={dateFormatParse(new Date(answer.mdfDatetime))} className='ba-input-text' disabled></input>
            </div>
            {answer.member.memberNo == props.loginUser.memberNo ?
              (
                <div>
                  <textarea name='answerContent' value={answer.answerContent} className='ba-textarea' onChange={(e) => {
                    handleInputChange(e, index, answerList, setAnswerList);
                  }} />
                  <div className='ba-btn-div'>
                    <button type='button' className='ba-btn ba-margin-right20' onClick={
                      () => {
                        let jsonObj = formToJSON(new FormData(document.getElementById('answerUpdateForm' + index)));
                        console.log(jsonObj);
                        sendAxiosRequest(`/api/answer/update?`, 'POST', jsonObj, response => {
                          console.log(response.data);
                          alert('답글이 성공적으로 변경되었습니다!');
                        }, error => {
                          console.log(error);
                        });
                      }
                    } >답글수정</button>
                    <button type='button' className='ba-btn ba-margin-right80' onClick={
                      () => {
                        sendAxiosRequest(`/api/answer/delete?answerNo=${answer.answerNo}`, 'GET', null, response => {
                          console.log(response.data);
                          alert('답글이 성공적으로 삭제되었습니다!');
                        }, error => {
                          console.log(error);
                        });
                      }
                    }>답글삭제</button>
                  </div>
                </div>)
              : (<textarea name='answerContent' value={answer.answerContent} className='ba-textarea-disabled' />)}
          </form>
        </div >
      ))
      }
      <div className='ba-btn-div'>
        <button type='button' className='ba-more-btn' onClick={(e) => {
          sendAxiosRequest(`/api/answer/list?reviewNo=${props.reviewNo}&startPage=${startPageNo}`, "GET", null,
            response => {
              console.log(response.data);
              if (response.data.length < 1) {
                console.log(e.target);
                e.target.style.display = 'none';
              }
              let newAnswerList = [...answerList, ...response.data];
              setAnswerList(newAnswerList);
              setStartPageNo(newAnswerList.length / 2);
            }, error => {
              console.log(error);
            })
        }}>더 보기</button>
      </div>
    </div >
  );
}


export default ReviewForm;
