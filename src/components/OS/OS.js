import React, { useState } from 'react';
import styles from './OS.module.css';

const safetyData = {
  강원: '초록색',
  경기: '초록색',
  경남: '초록색',
  경북: '초록색',
  부산: '초록색',
  울산: '초록색',
  인천: '초록색',
  전남: '초록색',
  전북: '초록색',
  제주: '초록색',
  충남: '초록색',
};

const OS = ({ closeModal }) => {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    closeModal(); // Close modal function
  };

  const handleOutsideClick = (e) => {
    if (e.target === e.currentTarget) {
      handleCloseModal();
    }
  };

  if (!isModalOpen) {
    return null;
  }

  return (
    <div className={styles.modal} onClick={handleOutsideClick}>
      <div className={styles.modalContent}>
        <span className={styles.title}>오늘의 방사능</span>
        <span className={styles.close} onClick={handleCloseModal}>
          &times;
        </span>
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.blackText}>지역</th>
                <th className={styles.blackText}>상태</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(safetyData).map((region, index) => (
                <tr key={index}>
                  <td className={styles.blackText}>{region}</td>
                  <td className={styles.blackText}>
                    <div className={`${styles.circle} ${styles[safetyData[region]]} ${styles.blink}`} />
                    {safetyData[region] === '초록색' ? '안전' : ''}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className={styles.disclaimer}>
            매일 최신화됨. 자세한 정보는{' '}
            <a href="https://www.mof.go.kr/oceansafety" target="_blank" rel="noreferrer">
              여기
            </a>
            를 참조하세요.
          </div>
        </div>
      </div>
    </div>
  );
};

export default OS;