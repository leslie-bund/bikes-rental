import { IReserve } from "../pages/Reservations";

interface IProps {
  data: Partial<IReserve>[];
  colOneTitle: string;
  colTwoTitle: string;
  colThreeTitle: string;
  col1Func: (x: any) => string | JSX.Element;
  col2Func: (x: any) => string | JSX.Element;
  col3Func: (x: any) => string | JSX.Element;
  updateFunc?: () => void;
}

const InfoTable = ({
  data,
  colOneTitle,
  colTwoTitle,
  colThreeTitle,
  col1Func,
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
            {data.map((ele, ind: number) => {
              return (
                <tr key={(ele?._id as string) + ind}>
                  <th scope="row">{++ind}</th>
                  <td>{col1Func(ele)}</td>
                  <td>{col2Func(ele.startDate)}</td>
                  <td>{col3Func(ele.endDate)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default InfoTable;
