import axios from "axios";
import { useState, useContext, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import { useParams } from "react-router-dom";

const BASEURL = process.env.REACT_APP_BASEURL;

interface IBike {
    _id: string;
    model: string;
    color: string;
    location: string;
    rating: number[] | number;
    nextAvailableDate: string;
  }

const SingleBike = () => {
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const [bikeData, setBikeData] = useState<IBike | null>(null);

  const hintUser = async () => {
    try {
      const res = await axios.get(`${BASEURL}/mngr/get-bike/${id}`, {
        headers: {
          authorization: token as string,
        },
      });
      if (res.status === 200 || res.status === 304) {
        setBikeData(res.data.data);
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
          {bikeData ? (
            <div className="card mb-2 p-4">
              <b>{bikeData?.model}</b>
              <small className="text-muted">{bikeData?.color}</small>
              <small className="text-muted">
                <em>
                  <b>Location:&nbsp;</b>
                </em>
                {bikeData?.location}
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

export default SingleBike;
