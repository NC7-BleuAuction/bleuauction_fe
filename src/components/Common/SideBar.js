import React, { useState } from 'react';
import axios from 'axios';
import styles from './SideBar.module.css';
import { Link } from 'react-router-dom';
import Chat from '../Chat/Chat';
import OS from '../OS/OS';

function SideBar() {
    const [isRaysModalOpen, setIsRaysModalOpen] = useState(false);

    const openRaysModal = () => {
        setIsRaysModalOpen(true);
    };

    const closeRaysModal = () => {
        setIsRaysModalOpen(false);
    };

    const [isChatModalOpen, setIsChatModalOpen] = useState(false);

    const toggleChatModal = () => {
        setIsChatModalOpen(!isChatModalOpen);
    };

    return (
        <div className={styles.sideBarBox}>
            <Link to='/StoreItemAdd'>등록</Link>
            <Link to="#" onClick={openRaysModal}>오늘의 <br />방사능</Link>
            <Link to="#" onClick={toggleChatModal}>챗봇</Link> {/* 챗봇 모달을 열기 위한 함수를 추가합니다. */}
            {isRaysModalOpen && <OS closeModal={closeRaysModal} />} {/* 오늘의 방사능 모달(OS)가 열려 있을 때에만 OS 컴포넌트를 렌더링합니다. */}
            {isChatModalOpen && <Chat closeModal={toggleChatModal} />} {/* 챗봇 모달이 열려 있을 때에만 Chat 컴포넌트를 렌더링합니다. */}
        </div>
    );
}

export default SideBar;
