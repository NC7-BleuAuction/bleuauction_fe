import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Chatbot from './Chatbot.css';

const Chatbot = () => {
  const [chatbotResponse, setChatbotResponse] = useState('');

  const handleChatbotRequest = async () => {
    try {
      const endpoint = 'https://p1cr9em9wk.apigw.ntruss.com/custom/v1/';

      const data = {
        version: '1.0',
        userId: 'user123',
        userIp: '192.168.0.1',
        timestamp: Date.now(),
        content: [{
          type: 'text',
          data: {
            details: 'Hello, this is a message from the frontend.'
          }
        }],
        event: 'message'
      };

      const headers = {
        'Content-Type': 'application/json',
        'x-ncp-apigw-zone_cd': 'PUBLIC',
        'X-NCP-TRACE-ID': 'v12shy2lcf9oka0fqm9lcdzezw'
      };

      const response = await axios.post(endpoint, data, { headers });
      setChatbotResponse(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    handleChatbotRequest();
  }, []);

  return (
    <div className="chatContainer">
      <div className="chatHeader">
        <h2>챗봇</h2>
      </div>
      <div className="chatBody">
        <div className="chatMessage">
          <p className="botMessage">{chatbotResponse}</p>
        </div>
      </div>
      <div className="chatFooter">
        <input type="text" placeholder="메시지를 입력하세요" className="inputField" />
        <button className="sendButton">전송</button>
      </div>
    </div>
  );
};

export default Chatbot;
