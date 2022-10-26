import axios from "axios";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import { Plain, CancelReserve, Rated } from "../components";

interface IBike {
  _id: string;
  model: string;
  color: string;
  location: string;
  rating: number[] | number;
  nextAvailableDate: string;
}

interface IReserve {
  _id: string;
  bike_id: IBike;
  startDate: string;
  endDate: string;
}

const BASEURL = process.env.REACT_APP_BASEURL;

const MyReservation = () => {
  const { token } = useContext(AuthContext);
  const [next, setNext] = useState([] as IReserve[]);
  const [current, setCurrent] = useState([] as IReserve[]);
  const [past, setPast] = useState([] as IReserve[]);
  // const []

  const queryApi = async () => {
    try {
      const response = await axios.get(`${BASEURL}/user/my`, {
        headers: {
          authorization: token as string,
        },
      });
      if (response.status === 200) {
        // window.alert(JSON.stringify(response.data.data, null, 2));
        setNext(
          response.data.data.filter((ele: IReserve) => {
            return new Date(ele.startDate).getTime() > new Date().getTime();
          })
        );
        setPast(
          response.data.data.filter((ele: IReserve) => {
            return new Date().getTime() > new Date(ele.endDate).getTime();
          })
        );
        setCurrent(
          response.data.data.filter((ele: IReserve) => {
            return (
              !(new Date().getTime() > new Date(ele.endDate).getTime()) &&
              !(new Date(ele.startDate).getTime() > new Date().getTime())
            );
          })
        );
      }
    } catch (error: any) {
      console.error("Reservation Error: ", error);
    }
  };

  useEffect(() => {
    queryApi();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="card mb-4 mt-4">
        <div className="card-header">
          <h4>Incoming Reservations</h4>
        </div>
        <div className="row p-4">
        {next.length > 0 ? (
            next.map((ele) => (
              <CancelReserve
                _id={ele._id}
                bike_id={ele.bike_id}
                endDate={ele.endDate}
                startDate={ele.startDate}
                updateFunc={() => { queryApi() }}
              />
            ))
          ) : (
            <p className="lead text-center">No New Reservations</p>
          )}
        </div>
      </div>
      <div className="card mb-4">
        <div className="card-header">
          <h4>Pending Reservations</h4>
        </div>
        <div className="row p-3">
          {current.length > 0 ? (
            current.map((ele) => (
              <Plain
                _id={ele._id}
                bike_id={ele.bike_id}
                endDate={ele.endDate}
                startDate={ele.startDate}
              />
            ))
          ) : (
            <p className="lead text-center">No Reserved Bikes</p>
          )}
        </div>
      </div>
      <div className="card mb-4">
        <div className="card-header">
          <h4>Past Reservations</h4>
        </div>
        <div className="row p-3">
        {past.length > 0 ? (
            past.map((ele) => (
              <Rated
                ele={ele.bike_id}
                updateFunc={() => { queryApi() }}
              />
            ))
          ) : (
            <p className="lead text-center p-3">No Past Reservations</p>
          )}
        </div>
      </div>
    </>
  );
};

export default MyReservation;
