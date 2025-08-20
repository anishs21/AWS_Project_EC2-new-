import React, { useState } from 'react';
import ClientLogin from '../components/ClientLogin';
import UserLogin from '../components/AdminLogin';

const LoginSwitcher = () => {
  const [isClientLogin, setIsClientLogin] = useState(true);

  return (
    <>
      {isClientLogin ? (
        <ClientLogin onSwitch={() => setIsClientLogin(false)} />
      ) : (
        <UserLogin onSwitch={() => setIsClientLogin(true)} />
      )}
    </>
  );
};

export default LoginSwitcher;
