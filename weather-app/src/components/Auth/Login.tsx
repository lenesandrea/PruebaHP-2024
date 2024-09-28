import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../../context/AuthContext';
import { jwtDecode } from 'jwt-decode';

const Login: React.FC = () => {
  const { login } = useAuth();

  const handleLoginSuccess = (credentialResponse: any) => {
    const decoded = jwtDecode(credentialResponse.credential) as any;
    
    // Call the login function with user info and the token
    login({
      name: decoded.name,
      email: decoded.email,
      picture: decoded.picture
    }, credentialResponse.credential);
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
