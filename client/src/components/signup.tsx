import axios from "axios";
import { ChangeEvent, useState, FormEvent, useContext } from "react";
import AuthContext from "../context/AuthContext";

interface IsignUp {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const BASEURL = process.env.REACT_APP_BASEURL

const Signup = () => {
  const [formData, setFormData] = useState({} as IsignUp);
  const { signup, user, token } = useContext(AuthContext);
  const [newUserRole, setNewUserRole] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newUserRole) {
      signup(formData);
    } else {
      create(formData);
    }
  };

  async function create(input: IsignUp) {
    try {
      const result = await axios.post(`${BASEURL}/mngr/create`, input, {
        headers: {
          authorization: token as string,
        },
      });
      if (result.status === 200) {
        window.alert('Account Created Successfully')
      }
      return;
    } catch (error: any) {
      console.log("### Sign up Result ###", error);
      window.alert(JSON.stringify(error));
    }
  }

  return (
    <>
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
        {user.role !== "manager" ? null : (
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              onChange={() => { setNewUserRole(!newUserRole) }}
              id="flexCheckIndeterminate"
            />
            <label
              className="form-check-label"
              htmlFor="flexCheckIndeterminate"
            >
              Manager
            </label>
          </div>
        )}
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
          {user.role !== "manager" ? "Sign in" : "Create User"}
        </button>
        <p className="mt-5 mb-3 text-muted">&copy; 2019???2022</p>
      </form>
    </>
  );
};

export default Signup;
