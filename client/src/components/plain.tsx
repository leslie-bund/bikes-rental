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
}

const Plain = ({ startDate, endDate, bike_id: ele }: IProps) => {
  return (
    <>
      <div className="col-sm-4 col-md-3 col-lg-2 mb-2" key={ele?._id}>
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
            <small className="text-muted">
              {new Date(startDate).toDateString()} -{" "}
              {new Date(endDate).toDateString()}
            </small>
          </div>
        </div>
      </div>
    </>
  );
};

export default Plain;
