import React, { createContext, ReactNode, useContext, useState } from 'react';

type LoginContextProps = {
  loginStatus: boolean;
  setLoginStatus: (status: boolean) => void;
};

const LoginContext = createContext<LoginContextProps | undefined>(undefined);

export const LoginProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [loginStatus, setLoginStatus] = useState(false);

  return (
    <LoginContext.Provider value={{ loginStatus, setLoginStatus }}>
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
