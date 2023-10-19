import React, { useState } from 'react';
import axios from 'axios';
import styles from './SideBar.module.css';
import { Link } from 'react-router-dom';
import Chat from '../Chat/Chat';

function SideBar() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    return (
        <div className={styles.sideBarBox}>
            <Link to="/MenuRegisterationForm">등록</Link>
            <Link to="/">오늘의 <br />방사능</Link>
            <Link to="#" onClick={toggleModal}>챗봇</Link>
            {isModalOpen && <Chat closeModal={toggleModal} />}
        </div>
    );
}

export default SideBar;
