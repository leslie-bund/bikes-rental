import AuthContext from "../context/AuthContext";
import { useContext } from "react";
import axios from "axios";
import {} from "react-icons/bs";

interface IBike {
  _id: string;
  model?: string;
  color?: string;
  location?: string;
  rating?: number[] | number;
  nextAvailableDate: string;
}

interface IProps {
  updateFunc: () => void;
  ele: IBike;
}

const BASEURL = process.env.REACT_APP_BASEURL;

const Rated = ({ ele, updateFunc }: IProps) => {
  const { token } = useContext(AuthContext);

  const queryApi = async (rate: string) => {
    try {
      const res = await axios.patch(
        `${BASEURL}/user/rate-bike/${ele._id}`,
        {
          rating: rate,
        },
        {
          headers: {
            authorization: token as string,
          },
        }
      );
      if (res.status === 200) {
        updateFunc();
      }
    } catch (error: any) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="col-sm-4 col-md-3 col-lg-2 mb-2">
        <div className="card">
          <div className="card-body d-flex flex-column p-2">
            <b>{ele?.model}</b>
            <small>{ele?.color}</small>
            <small>{ele?.location}</small>
            <small>
              Rating:{" "}
              {(
                (ele?.rating as number[]).reduce(
                  (acc: number, ele: number) => acc + ele,
                  0
                ) / (ele?.rating as number[]).length || 0
              ).toFixed(2)}
            </small>
            <small>
              <input
                type="checkbox"
                checked={
                  new Date(ele?.nextAvailableDate).getTime() >
                  new Date().getTime()
                    ? false
                    : true
                }
                readOnly={true}
              />
              &nbsp; Available now
            </small>
          </div>
          <div className="card-footer">
            <div className="input-group input-group-sm">
              <span className="input-group-text " id="inputGroup-sizing-sm">
                Rate
              </span>
              <select
                className="form-select"
                id="rateSelect"
                aria-label="Rating"
                onChange={(e) => {
                  queryApi(e.target.value);
                }}
              >
                <option></option>
                {[5, 4, 3, 2, 1].map((ele, ind) => (
                  <option key={"-" + ele + ind} value={ele}>
                    {ele}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Rated;
