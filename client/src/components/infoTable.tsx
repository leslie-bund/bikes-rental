import { IReserve } from "../pages/Reservations";
import {Link} from "react-router-dom"

interface IProps {
  data: IReserve[];
  colOneTitle: string;
  colTwoTitle: string;
  colThreeTitle: string;
  col2Func: (x: any) => string | JSX.Element;
  col3Func: (x: any) => string | JSX.Element;
  updateFunc?: (x: any) => any;
}


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

const InfoTable = ({
  data,
  colOneTitle,
  colTwoTitle,
  colThreeTitle,
  col2Func,
  col3Func,
  updateFunc,
}: IProps) => {
  return (
    <>
      <div className="container-fluid">
        <table className="table table-responsive-sm">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">{colOneTitle}</th>
              <th scope="col">{colTwoTitle}</th>
              <th scope="col">{colThreeTitle}</th>
            </tr>
          </thead>
          <tbody>
            {data.map((ele: IReserve, ind: number) => {
                if(ele.startDate && ele.endDate) {
                    return (
                      <tr key={(ele?._id as string) + ind}>
                        <th scope="row">{++ind}</th>
                        <td>{infoDisplay(ele)}</td>
                        <td>{col2Func(ele.startDate)}</td>
                        <td>{col3Func(ele.endDate)}</td>
                      </tr>
                    );
                }
                return (
                    <tr key={(ele?._id as string) + ind}>
                      <th scope="row">{++ind}</th>
                      <td>{updateFunc && infoDisplay(updateFunc(ele))}</td>
                      <td>{col2Func(ele._id)}</td>
                      <td>{col3Func(ele._id)}</td>
                    </tr>
                )
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

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
              <Link to={`/home/one-user/${user_id?._id}`} className="card p-1 text-decoration-none">
                <b className="text-dark">{user_id?.name}</b>
                <small className="text-muted">{user_id?.email}</small>
                <small className="text-muted">
                  <em className={`badge ${user_id?.role === 'manager' ? 'bg-success text-light' : 'bg-warning text-dark'} fw-bold`}>{user_id?.role}</em>
                </small>
              </Link>
            </div>
          )}
          {bike_id instanceof Object && (
            <div className="col">
              <Link to={`/home/one-bike/${bike_id?._id}`} className="card p-1 text-decoration-none">
                <b className="text-dark">{bike_id?.model}</b>
                <small style={{ color: `${bike_id?.color}` }}>
                  {bike_id?.color}
                </small>
                <small className="text-muted">{bike_id?.location}</small>
                <small className="text-muted">
                  Rating:{" "}
                  {
                    +(
                      (bike_id?.rating as number[])?.reduce(
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
              </Link>
            </div>
          )}
        </div>
      </>
    );
  };
  

export default InfoTable;
