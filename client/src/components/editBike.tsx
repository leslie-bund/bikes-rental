import axios from "axios";
import { ChangeEvent, useState, FormEvent, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";


interface IBike {
    _id: string;
    model: string;
    color: string;
    location: string;
    rating: number[] | number;
    nextAvailableDate: string;
  }

const BASEURL = process.env.REACT_APP_BASEURL;

const EditBikeForm = () => {
  const [formData, setFormData] = useState({} as IBike);
  const { token } = useContext(AuthContext);
  const [bikeInfo, setBikeInfo] = useState<IBike | null>(null)
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
      const res = await axios.get(`${BASEURL}/mngr/get-bike/${id}`, {
        headers: {
          authorization: token as string,
        },
      });
      if (res.status === 200 || res.status === 304) {
        setBikeInfo(res.data.data)
      }
    } catch (error: any) {
      console.error(error);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.patch(
        `${BASEURL}/mngr/edit-bike/${id}`,
        formData,
        {
          headers: {
            authorization: token as string,
          },
        }
      );
      if (res.status === 200) {
        window.alert(JSON.stringify(res.data.data, null, 2));
        navigate(`/home/one-bike/${res.data.data._id}`);
      }
    } catch (error: any) {
      console.error(error);
    }
  };

  useEffect(() => {
    hintUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  

  return (
    <div className="container pt-5">
      {bikeInfo && <div className="card mb-2 pb-3">
        <div className="card-header mb-3"><span className="lead text-muted badge bg-gray">Editing</span></div>
        <b className="ms-3">{bikeInfo?.model}</b>
        <small className="ms-3 text-muted">{bikeInfo?.location}</small>
        <small className="ms-3 text-muted"><em><b>Next availability:&nbsp;</b></em>{new Date(bikeInfo?.nextAvailableDate).toDateString()}</small>
      </div>}
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
          Save
        </button>
        <p className="mt-5 mb-3 text-muted">&copy; 2019–2022</p>
      </form>
    </div>
  );
};

export default EditBikeForm;
