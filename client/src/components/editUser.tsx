import axios from "axios";
import { ChangeEvent, useState, FormEvent, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { NewUser } from "../pages";

interface IsignUp {
  name: string;
  email: string;
  role?: string;
  password: string;
  confirmPassword: string;
}

const BASEURL = process.env.REACT_APP_BASEURL;

const EditForm = () => {
  const [formData, setFormData] = useState({} as IsignUp);
  const { token } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState<IsignUp | null>(null)
  const { id } = useParams();
  const navigate = useNavigate();

  const handleChange = (
    event: ChangeEvent<HTMLInputElement & HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const hintUser = async () => {
    try {
      const res = await axios.get(`${BASEURL}/mngr/get-user/${id}`, {
        headers: {
          authorization: token as string,
        },
      });
      if (res.status === 200 || res.status === 304) {
        setUserInfo(res.data.data)
      }
    } catch (error: any) {
      console.error(error);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.patch(
        `${BASEURL}/mngr/edit-user/${id}`,
        formData,
        {
          headers: {
            authorization: token as string,
          },
        }
      );
      if (res.status === 200) {
        window.alert(JSON.stringify(res.data.data, null, 2));
        navigate(`/home/one-user/${res.data.data._id}`);
      }
    } catch (error: any) {
      console.error(error);
    }
  };

  useEffect(() => {
    hintUser();
  }, [])
  

  return (
    <div className="container pt-5">
      {userInfo && <div className="card mb-2 p-4">
        <b>{userInfo?.name}</b>
        <small className="text-muted">{userInfo?.email}</small>
        <small className="text-muted"><em><b>Role:&nbsp;</b></em>{userInfo?.role}</small>
      </div>}
      <form onSubmit={handleSubmit}>
        <div className="form-floating mb-1">
          <input
            type="text"
            className="form-control"
            id="floatingName"
            name="name"
            placeholder="name@example.com"
            onChange={handleChange}
            onInput={handleChange}
          />
          <label htmlFor="floatingName">Full name</label>
        </div>
        <div className="form-floating mb-1">
          <select
            name="role"
            className="form-select"
            id="floatingInput"
            placeholder="name@example.com"
            onChange={handleChange}
          >
            <option value="">Choose</option>
            <option value="user">User</option>
            <option value="manager">Manager</option>
          </select>
          <label htmlFor="floatingInput">Role</label>
        </div>
        <div className="form-floating mb-1">
          <input
            type="email"
            name="email"
            className="form-control"
            id="floatingInput"
            placeholder="name@example.com"
            onChange={handleChange}
            onInput={handleChange}
          />
          <label htmlFor="floatingInput">Email address</label>
        </div>
        <div className="form-floating mb-1">
          <input
            type="password"
            className="form-control"
            id="floatingPassword"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            onInput={handleChange}
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>
        <div className="form-floating mb-5">
          <input
            type="password"
            className="form-control"
            name="confirmPassword"
            id="floatingConfPassword"
            placeholder="Password"
            onChange={handleChange}
            onInput={handleChange}
          />
          <label htmlFor="floatingConfPassword">Confirm password</label>
        </div>
        <button className="w-100 btn btn-lg btn-primary" type="submit">
          Save
        </button>
        <p className="mt-5 mb-3 text-muted">&copy; 2019–2022</p>
      </form>
    </div>
  );
};

export default EditForm;
