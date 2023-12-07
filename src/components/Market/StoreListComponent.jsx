import StoreListItem from './StoreListItem';
import styles from './StoreList.module.css';

function StoreListComponent({ storeList, scrollMoveTop }) {
  return (
    <>
      <div className={styles.storeListBox}>
        {storeList.map((store, index) => (
          <StoreListItem key={index} data={store} />
        ))}
      </div>
      <div id="topBtnDiv" onClick={scrollMoveTop}>
        ↑
      </div>
    </>
  );
}

export default StoreListComponent;
