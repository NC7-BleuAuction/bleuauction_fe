import React from 'react';
import styles from './MyPage/MyPageContainer.module.css';

function MyPageStateBar({ member, stateBar, page, setPage }) {

  return (
    <div className={styles.stateBar}>
      {Object.keys(stateBar).map((state) => (
        <div key = {state}
        className={page === state ? styles.selected : styles.not_selected}
        onClick={() => {
          setPage(state);
        }}>
          <p className={styles.link}>{state}</p>
        </div>
      ))}
    </div>
  );
}

export default MyPageStateBar;
