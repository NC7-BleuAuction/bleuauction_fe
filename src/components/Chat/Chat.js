import React, { useState } from 'react';
import { MessageBox, ChatList } from 'react-chat-elements';
import 'react-chat-elements/dist/main.css';
import axios from 'axios';

const Chat = () => {
    const [chatMessage, setChatMessage] = useState('');
    const [response, setResponse] = useState('');
    const [messages, setMessages] = useState([]);

    const handleMessage = async () => {
        try {
            const response = await axios.post('/chat/message', chatMessage, {
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

            setResponse(response.data); // Set the response data from the server
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

    return (
        <div style={{ backgroundColor: '#2F80ED', height: '80vh', display: 'flex', flexDirection: 'column', padding: '20px', maxWidth: '500px', margin: 'auto', borderRadius: '10px' }}>
            <ChatList
                className="chat-list"
                dataSource={[
                    {
                        avatar: 'https://www.pngfind.com/pngs/m/676-6764066_fish-cartoon-images-fish-logo-png-transparent-png.png',
                        alt: 'Fish',
                        title: 'BA_ChatBot',
                        subtitle: 'Welcome to the Bleuauction!',
                        date: new Date(),
                        unread: 0,
                    },
                ]}
            />
            <div style={{ flex: '1', marginBottom: '20px' }}>
                {messages.map((message, index) => (
                    <MessageBox
                        key={index}
                        position={message.position}
                        type={message.type}
                        text={message.text}
                        date={message.date}
                        avatar={message.position === 'left' ? 'https://www.pngfind.com/pngs/m/676-6764066_fish-cartoon-images-fish-logo-png-transparent-png.png' : null}
                    />
                ))}
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <input
                    type="text"
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    onKeyPress={handleKeyPress} // Add this line to handle the key press event
                    style={{ flex: '1', padding: '10px', borderRadius: '5px', border: 'none' }}
                />
                <button onClick={handleMessage} style={{ marginLeft: '10px', padding: '10px', borderRadius: '5px', border: 'none', backgroundColor: '#4CAF50', color: '#fff', cursor: 'pointer' }}>Send</button>
            </div>
        </div>
    );
};

export default Chat;
