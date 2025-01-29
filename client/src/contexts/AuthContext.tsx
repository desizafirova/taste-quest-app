import React, { createContext, useState, useContext, useEffect } from 'react';
import Cookies from 'js-cookie';

interface AuthContextProps {
  isAuthenticated: boolean;
  user: { email: string; name: string } | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ email: string; name: string } | null>(
    null
  );

  useEffect(() => {
    // Check if access token exists
    const token = Cookies.get('access_token');
    if (token) {
      fetch(
        `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${token}`
      )
        .then((res) => res.json())
        .then((data) => {
          setUser({ email: data.email, name: data.name });
          setIsAuthenticated(true);
        })
        .catch(() => {
          Cookies.remove('access_token');
        });
    }
  }, []);

  function login(token: string) {
    Cookies.set('access_token', token);

    fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${token}`)
      .then((res) => res.json())
      .then((data) => {
        console.log('Google User Info:', data);
        if (data.email) {
          setUser({ email: data.email, name: data.name });
          setIsAuthenticated(true);
        } else {
          console.error('Invalid token: No email in user data');
        }
      })
      .catch((err) => {
        console.error('Error fetching user data:', err);
        setIsAuthenticated(false);
      });
  }

  const logout = () => {
    Cookies.remove('access_token');
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
