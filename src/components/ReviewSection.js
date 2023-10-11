import React, { useState } from 'react';
import ReviewForm from './ReviewForm';
import ReviewList from './ReviewList';

function ReviewSection() {
  // 초기 상태에는 빈 리뷰 배열 또는 샘플 리뷰 데이터를 사용
  const [reviews, setReviews] = useState([]);

  // ReviewForm에서 호출되는 함수로, 새 리뷰를 reviews 상태에 추가
  const addReview = (newReview) => {
    setReviews(prevReviews => [...prevReviews, newReview]);
  };

  return (
    <div>
      {/* addReview 함수를 prop으로 전달 */}
      <ReviewForm addReview={addReview} />
      {/* 현재 reviews 상태를 prop으로 전달*/}
      <ReviewList reviews={reviews} />
    </div>
  );
}

export default ReviewSection;
