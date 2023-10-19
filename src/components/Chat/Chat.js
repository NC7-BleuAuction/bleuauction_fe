import React, { useState, useRef, useEffect } from 'react';
import { MessageBox, ChatList } from 'react-chat-elements';
import 'react-chat-elements/dist/main.css';
import axios from 'axios';

const Chat = ({ closeModal }) => {
    const [chatMessage, setChatMessage] = useState('');
    const [response, setResponse] = useState('');
    const [messages, setMessages] = useState([]);
    const chatContainerRef = useRef(null);

    const handleMessage = async () => {
        try {
            const response = await axios.post('/api/chat/message', chatMessage, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            setMessages((prevMessages) => [
                ...prevMessages,
                {
                    position: 'right',
                    type: 'text',
                    text: chatMessage,
                    date: new Date(),
                },
                {
                    position: 'left',
                    type: 'text',
                    text: response.data,
                    date: new Date(),
                },
            ]);

            setResponse(response.data);
            setChatMessage('');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleMessage();
        }
    };

    useEffect(() => {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }, [messages]);

    const handleOutsideClick = (e) => {
        if (e.target.classList.contains('chat-modal-container')) {
            closeModal();
        }
    };

    return (
        <div
            className="chat-modal-container"
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                zIndex: 9999,
            }}
            onClick={handleOutsideClick}
        >
            <div
                style={{
                    backgroundColor: '#2F80ED',
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '20px',
                    maxWidth: '600px',
                    width: '70%',
                    borderRadius: '20px',
                    position: 'relative',
                    maxHeight: '100%',
                    overflow: 'auto',
                }}
            >
                <ChatList
                    className="chat-list"
                    dataSource={[
                        {
                            avatar: 'https://www.pngfind.com/pngs/m/676-6764066_fish-cartoon-images-fish-logo-png-transparent-png.png',
                            alt: 'Fish',
                            title: 'BA_ChatBot',
                            subtitle: '무엇이든 물어보세요',
                            date: new Date(),
                            unread: 0,
                        },
                    ]}
                    style={{ marginBottom: '20px' }}
                />
                <div
                    ref={chatContainerRef}
                    style={{ flex: '1', overflowY: 'auto', marginTop: '10px' }}
                >
                    {messages.map((message, index) => (
                        <MessageBox
                            key={index}
                            position={message.position}
                            type={message.type}
                            text={message.text}
                            date={message.date}
                            avatar={
                                message.position === 'left'
                                    ? 'https://www.pngfind.com/pngs/m/676-6764066_fish-cartoon-images-fish-logo-png-transparent-png.png'
                                    : null
                            }
                            text={message.text}
                            title={message.position === 'left' ? 'BA_ChatBot' : 'You'}
                            titleColor={message.position === 'left' ? '#FFFFFF' : '#4CAF50'}
                            textFontSize={16}
                            textFontColor="#333"
                            style={{
                                backgroundColor: message.position === 'left' ? '#FFFFFF' : '#DCF8C6',
                                borderRadius: message.position === 'left' ? '0px 10px 10px 10px' : '10px 0px 10px 10px',
                                padding: '10px 15px',
                                maxWidth: '70%',
                                alignSelf: message.position === 'left' ? 'flex-start' : 'flex-end',
                                marginBottom: 10,
                            }}
                        />
                    ))}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
                    <input
                        type="text"
                        value={chatMessage}
                        onChange={(e) => setChatMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        style={{ flex: '1', padding: '15px', borderRadius: '30px', border: 'none', fontSize: '16px' }}
                        placeholder="메시지를 입력하세요..."
                    />
                    <button
                        onClick={handleMessage}
                        style={{
                            marginLeft: '10px',
                            padding: '15px 25px',
                            borderRadius: '30px',
                            border: 'none',
                            backgroundColor: '#4CAF50',
                            color: '#fff',
                            cursor: 'pointer',
                            fontSize: '16px',
                        }}
                    >
                        보내기
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Chat;
