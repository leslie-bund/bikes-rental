import axios from "axios";
import { FormEvent, useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const BASEURL = process.env.REACT_APP_BASEURL;

const ReserveBike = () => {
  const { token } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(
    {} as { startDate: string; endDate: string }
  );

  const [err1, setErr1] = useState(false);
  const [err2, setErr2] = useState(false);

  const queryApi: () => Promise<void> = async () => {
    try {
      const response = await axios.post(
        `${BASEURL}/user/reserve-bike/${id}`,
        formData,
        {
          headers: {
            authorization: token as string,
          },
        }
      );
      if (response.status === 200) {
        navigate("/home/my-reserve");
      }
    } catch (error: any) {
      console.error("Reservation Error: ", error);
    }
  };

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (formData.endDate === formData.startDate) {
      setErr2(true);
      setErr1(true);
      return;
    } else if (!formData.endDate) {
      setErr2(true);
      return;
    } else if (!formData.startDate) {
      setErr1(true);
      return;
    } else if (
      new Date(formData?.startDate).getTime() >
      new Date(formData?.endDate).getTime()
    ) {
      setErr2(true);
      setErr1(true);
      return;
    } else {
      queryApi();
    }
  }

  return (
    <>
      <h1 className="card mt-0 mb-3 ps-2 mt-3 mx-4">Reserve a Bike</h1>
      <form onSubmit={handleSubmit}>
        <div className="row g-3 m-3">
          <div className="col-md-6">
            <label htmlFor="start">
              <small>Start Date</small>
            </label>
            <input
              type="date"
              className={`form-control ${err1 && "border border-danger"}`}
              name="startDate"
              id="start"
              value={formData?.startDate}
              onChange={(e: any) => {
                setErr2(false);
                setErr1(false);
                setFormData({
                  ...formData,
                  [e.target.name]:
                    new Date(e.target?.value).getTime() > new Date().getTime()
                      ? e.target?.value
                      : new Date()
                          .toLocaleDateString()
                          .split("/")
                          .reverse()
                          .join("-"),
                });
              }}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="end">
              <small>End Date</small>
            </label>
            <input
              type="date"
              className={`form-control ${err2 && "border border-danger"}`}
              name="endDate"
              id="end"
              value={formData?.endDate}
              onChange={(e: any) => {
                setErr2(false);
                setErr1(false);
                setFormData({
                  ...formData,
                  [e.target.name]:
                    new Date(e.target?.value).getTime() >
                    new Date(formData?.startDate).getTime()
                      ? e.target?.value
                      : new Date(
                          new Date(formData?.startDate).setDate(
                            new Date(formData?.startDate).getDate() + 1
                          )
                        )
                          .toLocaleDateString()
                          .split("/")
                          .reverse()
                          .join("-"),
                });
              }}
            />
          </div>
          <div className="col">
            <input type="submit" value="Reserve" />
          </div>
        </div>
      </form>
    </>
  );
};

export default ReserveBike;
