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
  };

  useEffect(() => {
    queryApi();
  // eslint-disable-next-line react-hooks/exhaustive-deps
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

const dateDisplay = (x: string) => {
  return new Date(x).toDateString() || "Nil";
};

export default Reservations;


