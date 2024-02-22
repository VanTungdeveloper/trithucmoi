import { useState } from 'react';

// export interface UserToken {
//   token: string;
//   // Add more properties if needed
// }

export default function useToken(): {
  token: string | null;
  saveToken: (userToken: string) => void;
} {
  const getToken = (): string | null => {
    const tokenString = localStorage.getItem('token');
    const userToken: string | null = tokenString ? JSON.parse(tokenString) : null;
    return userToken ?? null;
  };

  const [token, setToken] = useState<string | null>(getToken());

  const saveToken = (userToken: string): void => {
    localStorage.setItem('token', JSON.stringify(userToken));
    setToken(userToken);
  };

  return {
    token,
    saveToken,
  };
}
