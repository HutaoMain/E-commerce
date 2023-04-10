import { AiFillFacebook } from "react-icons/ai";
import "./FbLoginButton.css";

const FbLoginButton = () => {
  const handleFacebookLogin = () => {
    window.open(
      `${import.meta.env.VITE_APP_API_URL}/oauth2/authorization/facebook`,
      "_self"
    );
  };

  return (
    <div>
      <button className="facebook-login-btn" onClick={handleFacebookLogin}>
        <AiFillFacebook color="14A2F9" />
        Login with Facebook
      </button>
    </div>
  );
};

export default FbLoginButton;
