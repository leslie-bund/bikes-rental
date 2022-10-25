import AuthContext from "../context/AuthContext";
import { useContext } from "react";
import { Navigate } from "react-router-dom";


const MngrGuard = ({ children }: any) => {
  const { user } = useContext(AuthContext);

  return user?.role === 'manager' ? <>{children}</> : <Navigate to="/home/avail-bikes" />;
};

export default MngrGuard