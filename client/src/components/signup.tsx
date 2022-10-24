import { ChangeEvent, useState, FormEvent, useContext } from "react";
import AuthContext from "../context/AuthContext";



interface IsignUp {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const Signup = () => {

    const [formData, setFormData] = useState({ } as IsignUp)
    const { signup } = useContext(AuthContext);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        signup(formData);
    }

    return (<>
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
                Sign in
              </button>
              <p className="mt-5 mb-3 text-muted">&copy; 2019–2022</p>
            </form>
    </>)
}

export default Signup;