import { createContext, useState } from "react";
import { Routes, useNavigate } from "react-router-dom";
import axios from "axios";

const BASEURL = process.env.REACT_APP_BASEURL;
const AuthContext = createContext({} as IContext);

interface IUser {
  name: string;
  email: string;
  role: string;
}

interface IContext {
  loggedIn: boolean;
  token: string | unknown;
  user: IUser;
  login: (input: Ilogin) => void | Promise<void>;
  signup: (input: IsignUp) => void | Promise<void>;
}

interface Ilogin {
  email: string;
  password: string;
}

interface IsignUp {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

function AuthContextProvider(props: any) {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState("");
  const [user, setUser] = useState({} as IUser);

  async function login(input: Ilogin) {
    try {
      const result = await axios.post(`${BASEURL}/user/login`, input);
      if (result.status === 200 && result.data?.data?.token) {
        setToken(result.data.data.token);
        setUser(result.data.data?.result);
        setLoggedIn(true);
        navigate("/home/avail-bikes");
      }
    } catch (error: unknown) {
      console.error("### Login Result ###", error);
      window.alert(JSON.stringify(error));
    }
  }

  async function signup(input: IsignUp) {
    try {
      const result = await axios.post(`${BASEURL}/user/signup`, input);
      if (result.status === 200) {
        setUser(result.data.data?.result);
        window.alert('Account Created Successfully')
      }
    } catch (error: any) {
      console.log("### Sign up Result ###", error);
      window.alert(JSON.stringify(error));
    }
  }

  //  useEffect(() => {
  //   getLoggedIn();
  //  }, []);

  return (
    <>
      <AuthContext.Provider value={{ loggedIn, token, user, login, signup }}>
        <Routes>{props.children}</Routes>
      </AuthContext.Provider>
    </>
  );
}

export default AuthContext;
export { AuthContextProvider };
