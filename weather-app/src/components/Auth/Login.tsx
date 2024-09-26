import { GoogleLogin, googleLogout } from 'react-oauth/google';
import { useAuth } from '../../context/AuthContext';
import jwt_decode from 'jwt-decode';

const Login: React.FC = () => {
  const { login } = useAuth();

  const handleLoginSuccess = (credentialResponse: any) => {
    const decoded: any = jwt_decode(credentialResponse.credential);
    login({
      name: decoded.name,
      email: decoded.email,
      picture: decoded.picture,
    });
  };

  return (
    <div>
      <h1>Inicia sesión con Google</h1>
      <GoogleLogin
        onSuccess={handleLoginSuccess}
        onError={() => {
          console.log('Login Failed');
        }}
      />
    </div>
  );
};

export default Login;
