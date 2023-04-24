import { useState } from 'react';

export function useMessage(initialValues) {
  const [message, setMessage] = useState(initialValues);

  const handleMessage = (mes) => setMessage(mes);
  return [message, handleMessage];
}
