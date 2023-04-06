import React from "react";

const FbLoginButton = () => {
  //   const handleFacebookLogin = () => {
  //     window.open(`${import.meta.env.VITE_APP_API_URL}/auth/facebook`);
  //   };

  const handleFacebookLogin = () => {
    window.open(
      `${import.meta.env.VITE_APP_API_URL}/oauth2/authorization/facebook`,
      "_self"
    );
  };

  return (
    <div>
      <button onClick={handleFacebookLogin}>Login with Facebook</button>
    </div>
  );
};

export default FbLoginButton;
