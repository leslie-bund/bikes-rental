import { ChangeEvent, useState, useContext, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AuthContext from "../context/AuthContext";

const BASEURL = process.env.REACT_APP_BASEURL;

const NewBike = () => {
  const [formData, setFormData] = useState({});
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASEURL}/mngr/create-bike`, formData, {
        headers: {
          authorization: token as string,
        },
      });
      if (res.status === 200) {
        window.alert(res.data.data);
        navigate(`/home/one-bike/${res.data.data._id}`);
      }
      return;
    } catch (error: any) {
      console.error(error);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <div className="container pt-5">
        <div className="card px-1 mb-3">
          <h2>Add new Bike</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-floating mb-1">
            <input
              type="text"
              name="model"
              className="form-control"
              id="floatingInput"
              placeholder="mercedes CLA"
              onChange={handleChange}
              onInput={handleChange}
            />
            <label htmlFor="floatingInput">Model</label>
          </div>
          <div className="form-floating mb-1">
            <input
              type="text"
              className="form-control"
              id="floatingPassword"
              name="color"
              placeholder="Color"
              onChange={handleChange}
              onInput={handleChange}
            />
            <label htmlFor="floatingPassword">Color</label>
          </div>
          <div className="form-floating mb-5">
            <input
              type="text"
              className="form-control"
              name="location"
              id="floatingConfPassword"
              placeholder="Location"
              onChange={handleChange}
              onInput={handleChange}
            />
            <label htmlFor="floatingConfPassword">Location</label>
          </div>
          <button className="w-100 btn btn-lg btn-primary" type="submit">
            Add Bike
          </button>
          <p className="mt-5 mb-3 text-muted">&copy; 2019–2022</p>
        </form>
      </div>
    </>
  );
};

export default NewBike;
