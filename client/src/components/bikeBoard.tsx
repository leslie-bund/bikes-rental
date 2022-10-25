import { useEffect, useState } from "react";
import { BsPenFill } from "react-icons/bs";
import { Link } from "react-router-dom";

interface IBike {
  _id: string;
  model: string;
  color: string;
  location: string;
  rating: number[] | number;
  nextAvailableDate: string;
}

type IProps = {
  data: IBike[];
  model?: string;
  color?: string;
  location?: string;
  rate: string;
};

const BikeBoard = ({ data, model, color, location, rate }: IProps) => {
  const [result, setResult] = useState<IBike[]>([]);

  useEffect(() => {
    if (model || color || location || rate) {
      // window.alert(model)
      setResult(
        Array.from(
          new Set(
            [
              ...data.filter((ele) => ele.model === model),
              ...data.filter((ele) => ele.color === color),
              ...data.filter((ele) => ele.location === location),
              // eslint-disable-next-line eqeqeq
              ...data.filter(
                (ele) => rate && (ele.rating as unknown as string) >= rate
              ),
            ].flat()
          ).values()
        )
      );
    } else {
      setResult(data);
    }
  }, [model, color, location, rate, data]);

  return (
    <div className="row pt-3">
      {result.length > 0 ? (
        result.map((ele) => (
          <div className="col-sm-4 col-md-3 col-lg-2 mb-2" key={ele?._id}>
            <div className="card">
              <div className="card-body d-flex flex-column p-2">
                <b>{ele?.model}</b>
                <small>{ele?.color}</small>
                <small>{ele?.location}</small>
                <small>Rating: {ele?.rating}</small>
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
                <Link
                  to={`/home/reserve-bike/${ele?._id}`}
                  className="btn btn-sm btn-outline-secondary text-decoration-none fw-bold"
                >
                  <BsPenFill /> Reserve
                </Link>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="lead">No Bikes Available</p>
      )}
    </div>
  );
};

export default BikeBoard;
