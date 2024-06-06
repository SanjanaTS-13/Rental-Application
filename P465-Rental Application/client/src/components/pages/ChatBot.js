import React, { useState } from 'react';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';

const ChatBot = () => {
  const [messages, setMessages] = useState([
    {
      message: "Hello, Hoosier! Ask me anything!",
      sentTime: "just now",
      sender: "ChatGPT",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const API_KEY = "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"; // Hardcoded API key

  const handleSend = async (message) => {
    const newMessage = {
      message,
      direction: 'outgoing',
      sender: 'user',
    };

    const newMessages = [...messages, newMessage];

    setMessages(newMessages);

    setIsTyping(true);

    // Call OpenAI API directly
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + API_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: 'Explain things like you\'re talking to a software professional with 2 years of experience.' },
            ...newMessages.map((msg) => ({ role: msg.sender === 'ChatGPT' ? 'assistant' : 'user', content: msg.message })),
          ],
        }),
      });

      const data = await response.json();

      const responseMessage = {
        message: data.choices[0].message.content,
        sender: 'ChatGPT',
      };

      setMessages([...newMessages, responseMessage]);
      setIsTyping(false);
    } catch (error) {
      console.error('Error:', error);
      setIsTyping(false);
    }
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
    const chatPopup = document.getElementById('chatPopup');
    if (chatPopup) {
      chatPopup.style.display = isChatOpen ? 'none' : 'block';
    }
  };

  return (
    <div style={{ position: 'fixed', bottom: 10, right: 10, zIndex: 1000, maxWidth: '250px' }}>
      <MainContainer style={{ height: '350px', overflowY: 'auto', backgroundColor: 'rgb(9, 9, 9)', color: 'white', borderRadius: '8px', display: 'none' }} id="chatPopup">
        <ChatContainer>
          <MessageList
            scrollBehavior="smooth"
            typingIndicator={isTyping ? <TypingIndicator content="Hoosier is typing" /> : null}
          >
            {messages.map((message, i) => (
              <Message
                key={i}
                model={message}
                style={{ color: 'white' }}
              />
            ))}
          </MessageList>
          <MessageInput
            placeholder="Type message here"
            onSend={handleSend}
            style={{ border: '1px solid white', borderRadius: '8px', color: 'white' }}
            inputStyle={{ '::placeholder': { color: 'white' } }}
          />
        </ChatContainer>
      </MainContainer>
      <button onClick={toggleChat}> {isChatOpen ? 'Close Chat' : 'Chat with Us'} </button>
    </div>
  );
};

export default ChatBot;
