import { useContext, useEffect, useState, useRef, useCallback } from "react";
import AuthContext from "../context/AuthContext";
import { BikeBoard } from "../components";
import axios from "axios";

interface IBike {
  _id: string;
  model: string;
  color: string;
  location: string;
  rating: number[] | number;
}

const BASEURL = process.env.REACT_APP_BASEURL;

const AllBikes = () => {
  const { token } = useContext(AuthContext);
  const [result, setResult] = useState([] as IBike[]);
  const [date, setDate] = useState(new Date());
  const [location, setLocation] = useState([] as string[]);
  const [color, setColor] = useState([] as string[]);

  const [colorRef, setColorRef] = useState("");
  const [locationRef, setLocationRef] = useState("");
  const [modelRef, setModelRef] = useState("");
  const [rateRef, setRateRef] = useState("");

  useEffect(() => {
    const queryApi = async () => {
      try {
        const res = await axios.get(`${BASEURL}/user/available-bikes/${date}`, {
          headers: {
            authorization: token as string,
          },
        });
        if (res.status === 200 || res.status === 304) {
          setResult(
            res.data.data.map((ele: IBike) => {
              ele.rating =
                (ele?.rating as number[]).reduce(
                  (acc: number, ele: number) => acc + ele,
                  0
                ) / (ele?.rating as number[]).length || 0;
              return ele;
            })
          );
          const locationSet = new Set<string>(
            res.data.data.map((ele: IBike): string => ele.location)
          );
          const colorSet = new Set<string>(
            res.data.data.map((ele: IBike): string => ele.color)
          );
          setLocation(Array.from(locationSet.values()));
          setColor(Array.from(colorSet.values()));
        }
      } catch (error: any) {
        console.error(error);
      }
    };
    queryApi();
  }, [date]);

  return (
    <>
      <div className="row p-5">
        <div className="col-sm-12 col-md-10 offset-md-1 pb-4">
          <div className="card d-flex justify-content-center align-items-center">
            <input
              type="date"
              className="form-control"
              name="dates"
              id=""
              onChange={(e: any) => {
                setDate(e.target?.value);
              }}
            />
          </div>
          <div className="mt-3 mb-2">
            <div className="row g-2">
              <div className="col-sm">
                <label htmlFor="modelSelect" className="text-muted">
                  <small>Model</small>
                </label>
                <select
                  className="form-select"
                  id="modelSelect"
                  aria-label="Model"
                  onChange={(e) => {
                    setModelRef(e.target.value);
                  }}
                >
                  <option></option>
                  {result.map((ele, ind) => (
                    <option key={ele.model + ind} value={ele?.model}>
                      {ele.model}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-sm">
                <label htmlFor="colorSelect" className="text-muted">
                  <small>Color</small>
                </label>
                <select
                  className="form-select"
                  id="colorSelect"
                  aria-label="Color"
                  onChange={(e) => {
                    setColorRef(e.target.value);
                  }}
                >
                  <option></option>
                  {color.map((ele, ind) => (
                    <option key={ele + ind} value={ele}>
                      {ele}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-sm">
                <label htmlFor="locationSelect" className="text-muted">
                  <small>Location</small>
                </label>
                <select
                  className="form-select"
                  id="locationSelect"
                  aria-label="Location"
                  onChange={(e) => {
                    setLocationRef(e.target.value);
                  }}
                >
                  <option></option>
                  {location.map((ele, ind) => (
                    <option key={ele + ind} value={ele}>
                      {ele}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-sm">
                <label htmlFor="rateSelect" className="text-muted">
                  <small>Rating</small>
                </label>
                <select
                  className="form-select"
                  id="rateSelect"
                  aria-label="Rating"
                  onChange={(e) => {
                    setRateRef(e.target.value);
                  }}
                >
                  <option></option>
                  {[5, 4, 3, 2, 1, 0].map((ele, ind) => (
                    <option key={"-" + ele + ind} value={ele}>
                      {ele}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
        {result.length > 0 ? (
          <BikeBoard
            data={result}
            model={modelRef}
            location={locationRef}
            rate={rateRef}
            color={colorRef}
          />
        ) : (
          <p className="lead text-center">No Bikes Available</p>
        )}
      </div>
    </>
  );
};

export default AllBikes;
