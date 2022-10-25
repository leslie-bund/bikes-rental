import axios from "axios";
import { useState, useContext, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import { InfoTable, MngrGuard } from "../components";
import { useParams } from "react-router-dom";

interface IBike {
  _id: string;
  model: string;
  color: string;
  location: string;
  rating: number[] | number;
  nextAvailableDate: string;
}

interface IUser {
  name: string;
  email: string;
  role: string;
  _id?: string;
}

export interface IReserve {
  _id: string;
  user_id: IUser;
  bike_id: IBike;
  startDate: string;
  endDate: string;
}

const BASEURL = process.env.REACT_APP_BASEURL;

const Reservations = () => {
  const { token } = useContext(AuthContext);
  const { mode } = useParams();
  const [data, setData] = useState([] as IReserve[]);

  const queryApi = async () => {
    let url;
    switch (mode) {
      case "bikes":
        url = `${BASEURL}/mngr/reservations?mode=${mode}`;
        break;
      case "users":
        url = `${BASEURL}/mngr/reservations?mode=${mode}`;
        break;
      default:
        url = `${BASEURL}/mngr/reservations`;
        break;
    }
    try {
      const response = await axios.get(url, {
        headers: {
          authorization: token as string,
        },
      });
      if (response.status === 200 || response.status === 304) {
        setData(response.data.data);
      }
    } catch (error: any) {
      console.error(error);
    }
    // Call Api and switch check mode in scope, log the data and use the interface to type the info board, then know how to pass the props to be displayed with the display functions(more on display functions)....in infoTable.
  };

  useEffect(() => {
    queryApi();
  }, [mode]);

  return (
    <>
      <MngrGuard>
        {data.length > 0 ? (
          <InfoTable
            data={data}
            colOneTitle={`${mode === "default" ? "" : mode} Details`}
            colTwoTitle={`Start date`}
            colThreeTitle={`End date`}
            col1Func={infoDisplay}
            col2Func={dateDisplay}
            col3Func={dateDisplay}
          />
        ) : (
          <div className="d-flex p-5 justify-content-center align-items-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
      </MngrGuard>
    </>
  );
};

export default Reservations;

const infoDisplay = ({
  user_id,
  bike_id,
}: {
  user_id: IUser;
  bike_id: IBike;
}) => {
  return (
    <>
      <div
        className="row p-1"
        key={(bike_id && bike_id?._id) + (user_id && user_id?._id)}
      >
        {user_id instanceof Object && (
          <div className="col">
            <div className="card p-1">
              <b>{user_id?.name}</b>
              <small className="text-muted">{user_id?.email}</small>
              <small className="text-muted">
                <em className={`badge ${user_id?.role === 'manager' ? 'bg-success text-light' : 'bg-warning text-dark'} fw-bold`}>{user_id?.role}</em>
              </small>
            </div>
          </div>
        )}
        {bike_id instanceof Object && (
          <div className="col">
            <div className="card p-1">
              <b>{bike_id?.model}</b>
              <small style={{ color: `${bike_id?.color}` }}>
                {bike_id?.color}
              </small>
              <small className="text-muted">{bike_id?.location}</small>
              <small className="text-muted">
                Rating:{" "}
                {
                  +(
                    (bike_id?.rating as number[]).reduce(
                      (acc: number, ele: number) => acc + ele,
                      0
                    ) / (bike_id?.rating as number[]).length || 0
                  ).toFixed(2)
                }
              </small>
              <small className="text-muted">
                <input
                  type="checkbox"
                  checked={
                    new Date(bike_id?.nextAvailableDate).getTime() >
                    new Date().getTime()
                      ? false
                      : true
                  }
                  readOnly={true}
                />
                &nbsp; Available now
              </small>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

const dateDisplay = (x: string) => {
  return new Date(x).toDateString() || "Nil";
};
