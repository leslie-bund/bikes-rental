import axios from "axios";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";

interface IBike {
  _id: string;
  model: string;
  color: string;
  location: string;
  rating: number[] | number;
  nextAvailableDate: string;
}

interface IProps {
  _id: string;
  bike_id: IBike;
  startDate: string;
  endDate: string;
  updateFunc: () => void;
}

const BASEURL = process.env.REACT_APP_BASEURL;

const CancelReserve = ({
  startDate,
  endDate,
  bike_id: ele,
  _id,
  updateFunc,
}: IProps) => {
  const { token } = useContext(AuthContext);
  //   const navigate = useNavigate()
  const cancel = async () => {
    try {
      const result = await axios.delete(
        `${BASEURL}/user/cancel-reserve/${_id}`,
        {
          headers: {
            authorization: token as string,
          },
        }
      );
      if (result.status === 200) {
        updateFunc();
      }
    } catch (error) {}
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
            <button
              className="btn btn-sm btn-danger text-white"
              onClick={() => {
                cancel();
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CancelReserve;
