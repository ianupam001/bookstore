import { Auth } from 'src/api/auth';
import { useState, useEffect } from 'react';

export function useAuth() {
 const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user') || 'null'));

 useEffect(() => {
   if (user) {
     localStorage.setItem('user', JSON.stringify(user));
   }
 }, [user]);
 
  const signIn = async (username: string, password: string) => {
    try {
      const response = await Auth.login(username, password);
      if (response?.data?.token) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('at-token', response.data.token);
        setUser(response.data.user);
      }
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('at-token');
  };

  return { user, signIn, signOut };
}
