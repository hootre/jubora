import { useState } from 'react';

export const useMessage = () => {
  const [messages, setMessages] = useState([]);

  const handleMessage = (message) => {
    setMessages((prevMessages) => prevMessages.concat([message]));
    setTimeout(() => {
      setMessages((prevMessages) => prevMessages.slice(1));
    }, 5000);
  };
  console.log(messages);
  if (messages === undefined) {
    throw new Error('useMessage must be used within a MessageContext.Provider');
  }

  return [messages, handleMessage];
};
