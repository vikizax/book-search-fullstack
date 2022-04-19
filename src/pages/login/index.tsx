import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../../components/loginButton";
import { useEffect } from "react";
export default function Login() {
  const { isAuthenticated, isLoading } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/search");
  }, [isLoading]);

  return (
    <>
      <h1>SIGN IN</h1>
      <LoginButton />
    </>
  );
}
