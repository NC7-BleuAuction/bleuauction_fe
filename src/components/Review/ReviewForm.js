import '../utility/common.css';
import React, {useState, useEffect} from 'react';
import {formToJSON} from 'axios';
import {useUser} from '../Auth/UserContext';
import {
    scrollMoveTop,
    sendAxiosMultipartRequest,
    sendAxiosRequest,
    dateFormatParse,
    handleInputChange,
    accessTokenRefresh, getAccessToken, isTokenExpired, isNotNullOrNonEmpty
} from '../utility/common';


function ReviewForm(props) {
    const [accessToken, setAccessToken] = useState(getAccessToken('a'));
    const [store, setStore] = useState(props.store);

    // 로그인 확인
    if (!isTokenExpired(accessToken)) {
        return (
            <div id='maindDiv' className="review-main-div">
                <div id='mainContentDiv' className="ba-main-content-div">
                    <ReviewWriteForm store={store}></ReviewWriteForm>
                    <ReviewListDiv store={store} ></ReviewListDiv>
                </div>
                <div id="topBtnDiv" onClick={scrollMoveTop}>↑</div>
            </div>
        );
    }
}


function ReviewWriteForm(props) {
    const [accessToken, setAccessToken] = useState(getAccessToken('a'));
    const [tokenMember, setTokenMember] = useState(getAccessToken('d'));
    let [store, setStore] = useState(props.store);
    let [reviewFreshness, setReviewFreshness] = useState('M');

    if (!isTokenExpired(accessToken)) {
        return (
            <form id="reviewWriteForm" encType='multipart/form-data' className='ba-form'>
                <label htmlFor='storeNo'><input id='storeNo' name='storeNo' value={store.storeNo}
                                                hidden readOnly></input></label>
                <label htmlFor='memberNo'><input id='memberNo' name='memberNo' value={tokenMember.sub}
                                                 hidden readOnly></input></label>
                <img className='ba-member-profile'
                     src='http://fvhsczepiibf19983519.cdn.ntruss.com/member/defaultProfile.jpg?type=f&w=50&h=50&ttype=jpg'></img>
                <sapn className='ba-font-name'>{tokenMember.memberName}</sapn>
                <span className='ba-font-title'>신선도 :</span>
                <label htmlFor='freshness-low' className='ba-freshness'><img src='/images/low.png'/><input
                    type="radio" id='freshness-low' name='reviewFreshness' value={'L'}
                    checked={reviewFreshness === 'L'}
                    onChange={() => setReviewFreshness('L')}></input></label>
                <label htmlFor='freshness-medium' className='ba-freshness'><img
                    src='/images/mid.png'/><input type="radio" id='freshness-medium'
                                                  name='reviewFreshness' value={'M'}
                                                  checked={reviewFreshness === 'M'}
                                                  onChange={() => setReviewFreshness('M')}></input></label>
                <label htmlFor='freshness-high' className='ba-freshness'><img
                    src='/images/high.png'/><input type="radio" id='freshness-high'
                                                   name='reviewFreshness' value={'H'}
                                                   checked={reviewFreshness === 'H'}
                                                   onChange={() => setReviewFreshness('H')}></input></label>
                <div>
                    <textarea name="reviewContent" className='ba-textarea'/>
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

                        let inputFile = document.querySelector('input[type="file"]');
                        if (inputFile.files.length > 0) {
                            let files = inputFile.files;
                            for (let i = 0; i < files.length; i++) {
                                formData.append("multipartFiles", files[i]);
                            }
                        }

                        console.log('여기다.');
                        console.log('formToJSON', formToJSON(formData));
                        sendAxiosMultipartRequest('/api/review/add', formData,
                            response => {
                                console.log('/api/review/add =======> ', response.data);
                                console.log('props.accessToken', accessToken)
                                if (isNotNullOrNonEmpty(response.data)) {
                                    alert('리뷰를 성공적으로 작성하였습니다!');
                                    // window.location.reload();
                                }

                            }, error => console.log(error), accessToken);

                    }}>리뷰작성
                    </button>
                    <label htmlFor='fileInput' className='ba-file-label'>파일 첨부</label><span
                    id='fileInfoSpan'></span>
                    <input type='file' id='fileInput' multiple hidden className='ba-file-btn'
                           onChange={(e) => {
                               let files = e.target.files;
                               console.log(files);
                               let fileInfoStr;
                               for (let i = 0; i < 2; i++) {
                                   fileInfoStr = (i === 0) ? fileInfoStr + ' ' + files[i].name + ', ' : fileInfoStr + ' ' + files[i].name;
                               }
                               document.getElementById('fileInfoSpan').textContent = '파일명: ' + fileInfoStr + ' 등 ' + files.length + '개의 첨부파일';
                           }}/>
                </div>
            </form>
        );
    }
}

function ReviewListDiv(props) {
    const pageRowCnt = 4;
    let [accessToken, setAccessToekn] = useState(getAccessToken('a'));
    let [tokenMember, setTokenMember] = useState(getAccessToken('d'));
    let [store, setStore] = useState(props.store);
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
                sendAxiosRequest(`/api/review/list?storeNo=${store.storeNo}&startPage=${startPageNo}`, 'GET', null, response => {
                    console.log('/api/review/list?storeNo=${store.storeNo}&startPage=${startPageNo} ==> :', response.data);
                    if (isNotNullOrNonEmpty(response.data)) {
                        let addReviewList = response.data;
                        setNewAddLength(response.data.length);
                        let newReviewList = [...reviewList, ...addReviewList];
                        setStartPageNo(Math.floor(newReviewList.length / pageRowCnt));
                        setReviewList(newReviewList);
                    }

                }, error => console.log(error), null, accessToken)
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, [startPageNo, reviewList]);

    useEffect(() => {
        sendAxiosRequest(`/api/review/list?storeNo=${store.storeNo}`, "GET", null,
            response => {
                console.log('/api/review/list => ', response.data);
                if (isNotNullOrNonEmpty(response.data)) {
                    let initReviewList = response.data;
                    setReviewList(initReviewList);
                    setNewAddLength(initReviewList.length);
                    setStartPageNo(Math.floor(newAddLength / pageRowCnt));
                }

            }, error => console.log(error), null, accessToken)
    }, []);

    if (isNotNullOrNonEmpty(reviewList)) {
        return (
            <div id="reviewListDiv" className='review-list-div'>
                {reviewList.length > 0 && reviewList.map((review, index) => (
                    <div key={index} className='review-div'>
                        <form id={'reviewUpdateForm' + index}>
                            <input id={'reviewNo' + index} name='reviewNo' hidden
                                   value={review.reviewNo}/>

                            <div className='ba-title-container'>
                                <img className='ba-member-profile'
                                     src='http://fvhsczepiibf19983519.cdn.ntruss.com/member/defaultProfile.jpg?type=f&w=50&h=50&ttype=jpg'/>
                                <div className='ba-title-info'>
                                    <b>{review.member.memberName}</b>
                                    <span><b>작성일:</b><input type='text'
                                                            value={dateFormatParse(new Date(review.mdfDatetime))}
                                                            className='ba-input-text'
                                                            disabled/></span>
                                </div>
                                <div className='ba-title-freshness'>
                                    <span className='ba-font-title'>신선도 :</span>
                                    <label htmlFor='freshness-low'>
                                        <img src='/images/low.png'/>
                                        <input type="radio" name='reviewFreshness' value={'L'}
                                               checked={review.reviewFreshness === 'L'}
                                               onChange={(e) => handleInputChange(e, index, reviewList, setReviewList)}/>
                                    </label>
                                    <label htmlFor='freshness-mid'>
                                        <img src='/images/mid.png'/>
                                        <input type="radio" name='reviewFreshness' value={'M'}
                                               checked={review.reviewFreshness === 'M'}
                                               onChange={(e) => handleInputChange(e, index, reviewList, setReviewList)}/>
                                    </label>
                                    <label htmlFor='freshness-high'>
                                        <img src='/images/high.png'/>
                                        <input type="radio" name='reviewFreshness' value={'H'}
                                               checked={review.reviewFreshness === 'H'}
                                               onChange={(e) => handleInputChange(e, index, reviewList, setReviewList)}/>
                                    </label>
                                </div>
                            </div>

                            <hr/>
                            <div>
                                {review.reviewAttaches.length > 0 && (
                                    <div className='ba-img-list-div'>
                                        <img id={'defaultImg' + index} className='ba-img-first'
                                             src={`http://kr.object.ncloudstorage.com/bleuauction-bucket/review/${review.reviewAttaches.length > 0 ? review.reviewAttaches[0].saveFilename : ''}`}/>

                                        <div className='ba-div-col-sort'>
                                            {
                                                review.reviewAttaches.map((attach) => (
                                                        <div>
                                                            <img className='ba-img-sub-list-div'
                                                                 src={`http://kr.object.ncloudstorage.com/bleuauction-bucket/review/${attach.saveFilename}`}
                                                                 onMouseEnter={(e) => {
                                                                     let targetImgSrc = e.target.src;
                                                                     let defaultImgId = 'defaultImg' + index;
                                                                     console.log(targetImgSrc);
                                                                     let defaultImg = document.getElementById(defaultImgId);
                                                                     console.log(defaultImg);
                                                                     defaultImg.src = targetImgSrc;
                                                                 }}/>
                                                        </div>
                                                    )
                                                )
                                            }
                                        </div>
                                    </div>
                                )}
                                {review.member.memberNo == tokenMember.sub ?
                                    (<textarea name='reviewContent' value={review.reviewContent}
                                               className='ba-textarea'
                                               onChange={(e) => handleInputChange(e, index, reviewList, setReviewList)}/>)
                                    : (<textarea name='reviewContent' value={review.reviewContent}
                                                 className='ba-textarea-disabled' readOnly/>
                                    )}
                            </div>

                            {review.member.memberNo == tokenMember.sub ?
                                (<div className='ba-btn-div'>
                                    <div className='ba-file-list'>
                                        {review.reviewAttaches.map((attach) => (
                                            <div key={attach.fileNo} className="ba-file-item">
                                                <li>{attach.originFilename}</li>
                                                <p className="ba-delete-text" onClick={() => {
                                                    sendAxiosRequest(`/api/review/deleteFile?fileNo=${attach.fileNo}`, 'GET', null,
                                                        response => {
                                                            console.log(response.data);
                                                            window.location.reload();
                                                            alert(response.data.originFilename + '(이)가 삭제되었습니다!');
                                                        },
                                                        error => {
                                                            console.log(error);
                                                        }
                                                    , null, accessToken);
                                                }}>[삭제]</p>
                                            </div>
                                        ))}
                                    </div>

                                    <button type='button' className='ba-btn ba-margin-right20'
                                            onClick={() => {
                                                let obj = new FormData(document.getElementById('reviewUpdateForm' + index));
                                                console.log(obj);
                                                sendAxiosRequest('/api/review/update', 'POST', obj, response => {
                                                    console.log(response.data);
                                                    console.log('리뷰변경 성공!');
                                                    window.location.reload();
                                                    alert('리뷰를 성공적으로 변경하였습니다!');
                                                }, error => console.log(error), null, accessToken);
                                            }}>리뷰수정
                                    </button>
                                    <button type='button' className='ba-btn ba-margin-right10'
                                            onClick={
                                                () => {
                                                    sendAxiosRequest(`/api/review/delete?reviewNo=${review.reviewNo}`, 'GET', null, response => {
                                                        console.log(response.data);
                                                        window.location.reload();
                                                        alert('리뷰가 성공적으로 삭제되었습니다!');
                                                    }, error => {
                                                        console.log(error);
                                                    }, null, accessToken);
                                                }}>리뷰삭제
                                    </button>
                                </div>) : (<div></div>)
                            }

                            <div className='ba-text-right'>
                                <button type='button' className='ba-small-btn' onClick={() => {
                                    selectedReviewNo === review.reviewNo ? setSelectedReviewNo(null) : setSelectedReviewNo(review.reviewNo);
                                }}>답글
                                </button>
                            </div>
                        </form>

                        {
                            selectedReviewNo == review.reviewNo && (
                                <AnswerForm reviewNo={review.reviewNo} />
                            )
                        }
                    </div>
                ))
                }
            </div>
        );
    }

}

function AnswerForm(props) {
    const [accessToken, setAccessToken] = useState(getAccessToken('a'));
    const [tokenMember, setTokenMember] = useState(getAccessToken('a'));
    return (
        <div>
            <hr/>
            <div className='ba-text-right'>
                <button type='button' className='ba-small-btn' onClick={() => {
                    document.getElementById('answerWriteFormDiv').style.display = 'block';
                }}>답글작성✍️
                </button>
            </div>
            <div id="answerWriteFormDiv">
                <h4 className='ba-font-title'>답글작성</h4>
                <form id="answerWriteForm">
                    <input name='reviewNo' hidden value={props.reviewNo}></input>
                    <input name='memberNo' hidden value={tokenMember.sub}></input>
                    <button type='button' className='ba-close-btn' onClick={
                        () => {
                            document.getElementById('answerWriteFormDiv').style.display = 'none';

                        }
                    }>x
                    </button>
                    <div>
                        <textarea id='answerContent' name='answerContent' className='ba-small-textarea'></textarea>
                    </div>
                    <div className='ba-btn-div'>
                        <button type='button' className='ba-btn ba-margin-right40' onClick={() => {
                            let obj = document.getElementById('answerWriteForm');
                            let answerContentValue = document.getElementById('answerContent').value;
                            if (answerContentValue.trim().length < 1) {
                                alert('작성하실 답급 내용을 입력해주세요!');
                                return;
                            }
                            sendAxiosRequest('/api/answer/add', 'POST', obj,
                                response => {
                                    alert('답글을 성공적으로 작성하였습니다!');
                                    // window.location.reload();
                                    console.log(response.data);
                                }, error => console.log(error), null, accessToken);
                        }}>작성하기
                        </button>
                    </div>
                </form>
            </div>
            <AnswerListDiv accessToken={accessToken} reviewNo={props.reviewNo} ></AnswerListDiv>
        </div>
    );
}

function AnswerListDiv(props) {
    const pageRowCnt = 2;
    const [accessToken, setAccessToken] = useState(getAccessToken('a'));
    const [tokenMember, setTokenMember] = useState(getAccessToken('d'));
    let [answerList, setAnswerList] = useState([]);
    let [startPageNo, setStartPageNo] = useState(0);


    useEffect(() => {
        sendAxiosRequest(`/api/answer/list?reviewNo=${props.reviewNo}`, "GET", null,
            response => {
                let asnwerList = response.data.answerList;
                let totalRows = response.data.totalRows;
                console.log('최초 렌더시 totalRow');
                console.log(totalRows);
                console.log('최초 렌더시 asnwerList.length');
                console.log(asnwerList.length);

                if (totalRows > asnwerList.length) {
                    console.log(document.querySelector('.ba-more-btn'));
                    document.querySelector('.ba-more-btn').hidden = false;
                }
                setAnswerList(response.data.answerList);
                setStartPageNo(response.data.answerList.length / 2);
            }, error => console.log(error), null, accessToken);

        return () => {
        }
    }, []);

    return (
        <div id="answerListDiv" className='answer-list-div'>
            {answerList.map((answer, index) => (

                < div className='answer-div' key={index}>
                    <form id={'answerUpdateForm' + index}>
                        <div className='ba-title-container'>
                            <img className='ba-member-profile'
                                 src='http://fvhsczepiibf19983519.cdn.ntruss.com/member/defaultProfile.jpg?type=f&w=50&h=50&ttype=jpg'/>
                            <div className='ba-title-info'>
                                <b>{answer.member.memberName}</b>
                                <span><b>작성일:</b><input type='text'
                                                        value={dateFormatParse(new Date(answer.mdfDatetime))}
                                                        className='ba-input-text' disabled/></span>
                            </div>
                        </div>
                        {answer.member.memberNo == tokenMember.sub ?
                            (
                                <div>
                                    <input type='text' name='answerNo' hidden
                                           value={answer.answerNo}/>
                                    <input type='text' name='reviewNo' hidden
                                           value={answer.reviewNo}/>
                                    <input type='text' name='memberNo' hidden
                                           value={answer.member.memberNo}/>

                                    <textarea name='answerContent' value={answer.answerContent}
                                              className='ba-textarea' onChange={(e) => {
                                        handleInputChange(e, index, answerList, setAnswerList);
                                    }}/>
                                    <div className='ba-btn-div'>
                                        <button type='button' className='ba-btn ba-margin-right20'
                                                onClick={
                                                    () => {
                                                        let obj = new FormData(document.getElementById('answerUpdateForm' + index));
                                                        console.log(obj);
                                                        sendAxiosRequest(`/api/answer/update?`, 'POST', obj, response => {
                                                            window.location.reload();
                                                            alert('답글이 성공적으로 변경되었습니다!');
                                                        }, error => {
                                                            console.log(error);
                                                        }, null, accessToken);
                                                    }
                                                }>답글수정
                                        </button>
                                        <button type='button' className='ba-btn ba-margin-right80'
                                                onClick={
                                                    () => {
                                                        sendAxiosRequest(`/api/answer/delete?answerNo=${answer.answerNo}&memberNo=${answer.member.memberNo}`, 'GET', null, response => {
                                                            window.location.reload();
                                                            alert('답글이 성공적으로 삭제되었습니다!');
                                                        }, error => {
                                                            console.log(error);
                                                        }, null, accessToken);
                                                    }
                                                }>답글삭제
                                        </button>
                                    </div>
                                </div>)
                            : (<textarea name='answerContent' value={answer.answerContent}
                                         className='ba-textarea-disabled'/>)}
                    </form>
                </div>
            ))
            }
            <div className='ba-btn-div'>
                <button type='button' className='ba-more-btn' hidden onClick={(e) => {
                    sendAxiosRequest(`/api/answer/list?reviewNo=${props.reviewNo}&startPage=${startPageNo}`, "GET", null,
                        response => {
                            console.log(response.data);
                            let totalRows = response.data.totalRows;
                            let appendAnswerList = response.data.answerList;
                            let newAnswerList = [...answerList, ...appendAnswerList];
                            setAnswerList(newAnswerList);
                            setStartPageNo(newAnswerList.length / 2);
                            if (totalRows <= newAnswerList.length) {
                                e.target.hidden = true;
                            }

                        }, error => {
                            console.log(error);
                        }, null, accessToken)
                }}>더 보기
                </button>
            </div>
        </div>
    );
}


export default ReviewForm;
