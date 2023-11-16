import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './SideBar.module.css';
import { Link } from 'react-router-dom';
import Chat from '../Chat/Chat';
import OS from '../OS/OS';

function SideBar() {

    const [isRaysModalOpen, setIsRaysModalOpen] = useState(false);
    const [isChatModalOpen, setIsChatModalOpen] = useState(false);
    const [scrollPosition, setScrollPosition] = useState(window.pageYOffset);

    const  openRaysModal = () => {
        setIsRaysModalOpen(true);
    };

    const closeRaysModal = () => {
        setIsRaysModalOpen(false);
    };

    const toggleChatModal = () => {
        setIsChatModalOpen(!isChatModalOpen);
    };

    useEffect(() => {
        const handleScroll = () => {
            setScrollPosition(window.pageYOffset);
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div
            className={styles.sideBarBox}
            style={{ top: `${200 + scrollPosition}px` }} // 여기서 움직임을 처리합니다.
        >
            <Link to="/StoreItemAdd">등록</Link>
            <Link to="#" onClick={openRaysModal}>
                오늘의 <br />방사능
            </Link>
            <Link to="#" onClick={toggleChatModal}>
                챗봇
            </Link>
            {isRaysModalOpen && <OS closeModal={closeRaysModal} />}
            {isChatModalOpen && <Chat closeModal={toggleChatModal} />}
        </div>
    );
}

export default SideBar;
