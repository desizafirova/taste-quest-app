import axios from 'axios';
import React, {
  createContext,
  ReactNode,
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

  const checkLoginStatus = async () => {
    try {
      const response = await axios.get('http://localhost:3001/isUserAuth', {
        withCredentials: true, // ✅ Send cookies
      });

      if (response.data.auth) {
        setLoginStatus(true);
        setLoadingLogin(false);
      } else {
        setLoginStatus(false);
      }
    } catch (error) {
      console.error('Error checking login status:', error);
      setLoginStatus(false);
      setLoadingLogin(false);
    }
  };

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
