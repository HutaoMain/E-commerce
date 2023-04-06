import React from "react";

const GoogleLoginButton = () => {
  //   const handleGoogleLogin = () => {
  //     window.open(`${import.meta.env.VITE_APP_API_URL}/auth/facebook`);
  //   };

  const handleGoogleLogin = () => {
    window.open(
      `${import.meta.env.VITE_APP_API_URL}/oauth2/authorization/google`,
      "_self"
    );
  };

  return (
    <div>
      <button onClick={handleGoogleLogin}>Login with Google</button>
    </div>
  );
};

export default GoogleLoginButton;
