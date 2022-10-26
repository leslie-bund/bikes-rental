import axios from "axios";
import { useState, useContext, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import { useParams } from "react-router-dom";

const BASEURL = process.env.REACT_APP_BASEURL;

interface IsignUp {
  name: string;
  email: string;
  role?: string;
  password: string;
  confirmPassword: string;
}

const SingleUser = () => {
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const [userData, setUserData] = useState<IsignUp | null>(null);

  const hintUser = async () => {
    try {
      const res = await axios.get(`${BASEURL}/mngr/get-user/${id}`, {
        headers: {
          authorization: token as string,
        },
      });
      if (res.status === 200 || res.status === 304) {
        setUserData(res.data.data);
      }
    } catch (error: any) {
      console.error(error);
    }
  };

  useEffect(() => {
    hintUser();
  }, []);

  return (
    <>
      <div className="row m-3">
        <div className="col-sm-6 col-lg-4">
          {userData ? (
            <div className="card mb-2 p-4">
              <b>{userData?.name}</b>
              <small className="text-muted">{userData?.email}</small>
              <small className="text-muted">
                <em>
                  <b>Role:&nbsp;</b>
                </em>
                {userData?.role}
              </small>
            </div>
          ) : (
            <div className="d-flex p-5 justify-content-center align-items-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SingleUser;
