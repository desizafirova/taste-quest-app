import axios, { AxiosError } from 'axios';
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

type LoginContextProps = {
  loginStatus: boolean;
  setLoginStatus: (status: boolean) => void;
  checkLoginStatus: () => void;
  loadingLogin: boolean;
};

const LoginContext = createContext<LoginContextProps | undefined>(undefined);

export const LoginProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [loginStatus, setLoginStatus] = useState(false);
  const [loadingLogin, setLoadingLogin] = useState(true);

  const checkLoginStatus = useCallback(async () => {
    try {
      const response = await axios.get(
        'http://localhost:3001/auth/isUserAuth',
        {
          withCredentials: true, // ✅ Send cookies
        }
      );

      if (response.data.auth) {
        setLoginStatus(true);
      } else {
        setLoginStatus(false);
      }
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 401) {
        console.warn('Token expired or not valid.');
      } else {
        console.error('Error checking login status:', error);
      }
      setLoginStatus(false);
    } finally {
      setLoadingLogin(false);
    }
  }, []);

  useEffect(() => {
    checkLoginStatus(); // Check authentication on initial load
  }, []);

  return (
    <LoginContext.Provider
      value={{ loginStatus, setLoginStatus, checkLoginStatus, loadingLogin }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export const useLogin = () => {
  const context = useContext(LoginContext);
  if (!context) {
    throw new Error('useLogin must be used within a LoginProvider');
  }
  return context;
};
