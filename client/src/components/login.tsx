import { ChangeEvent, FormEvent, useState, useContext } from "react";
import AuthContext from '../context/AuthContext'

interface ILoginForm {
    email: string,
    password: string
}

const Login = () => {
    const { login } = useContext(AuthContext)
    const [formData, setFormData] = useState({ } as ILoginForm)

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(formData?.email && formData?.password){
            login(formData)
        }
    }

    return (<>
        <form onSubmit={handleSubmit}>
              <div className="form-floating mb-1">
                <input
                  type="email"
                  className="form-control"
                  id="floatingInput1"
                  name="email"
                  placeholder="name@example.com"
                  onChange={handleChange}
                  onInput={handleChange}
                />
                <label htmlFor="floatingInput1">Email address</label>
              </div>
              <div className="form-floating mb-5">
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  id="floatingPassword1"
                  placeholder="Password"
                  onInput={handleChange}
                  onChange={handleChange}
                />
                <label htmlFor="floatingPassword1">Password</label>
              </div>

              <button className="w-100 btn btn-lg btn-primary" type="submit">
                Log in
              </button>
              <p className="mt-5 mb-3 text-muted">&copy; 2019–2022</p>
            </form>
    </>)
}

export default Login;