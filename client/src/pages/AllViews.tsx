import { InfoTable } from "../components";
import { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BsFillTrashFill, BsFillBrushFill } from "react-icons/bs";
import axios from "axios";
import AuthContext from "../context/AuthContext";

const BASEURL = process.env.REACT_APP_BASEURL;

const AllViews = () => {
  const { mode } = useParams();
  const [param, setParam] = useState(mode);
  const [data, setData] = useState([]);
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const queryApi = async () => {
    try {
      const response = await axios.get(`${BASEURL}/mngr/all-${param}s`, {
        headers: {
          authorization: token as string,
        },
      });
      if (response.status === 200 || response.status === 304) {
        setData(response.data.data);
      }
      return;
    } catch (error: any) {
        console.error(error)
    }
  };

  const deleteApi = async (id: string) => {
    try {
      const response = await axios.delete(
        `${BASEURL}/mngr/del-${param}/${id}`,
        {
          headers: {
            authorization: token as string,
          },
        }
      );
      if (response.status === 200 || response.status === 304) {
        queryApi();
      }
      return;
    } catch (error: any) {}
  };

  const DelButton = (id: string) => {
    return (
      <>
        <button
          className="btn btn-danger text-light"
          onClick={() => {
            deleteApi(id);
          }}
        >
          Delete <BsFillTrashFill />
        </button>
      </>
    );
  };

  const editApi = (id: string) => {
    navigate(`/home/edit-${param}/${id}`);
  };

  const EditButton = (id: string) => {
    return (
      <>
        <button
          className="btn btn-warning text-dark"
          onClick={() => {
            editApi(id);
          }}
        >
          Edit <BsFillBrushFill />
        </button>
      </>
    );
  };

  const util = (x: any) => {
    return { [`${param}_id`]: x };
  };

  useEffect(() => {
    queryApi();

    return () => { setParam(mode) }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return param ? (
    <>
      <InfoTable
        data={data}
        colOneTitle={
          (param as string) &&
          param?.split("")[0].toUpperCase() + (param as string).slice(1)
        }
        colTwoTitle={""}
        colThreeTitle={""}
        col2Func={DelButton}
        col3Func={EditButton}
        updateFunc={util}
      />
    </>
  ) : (
    <div className="d-flex p-5 justify-content-center align-items-center">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

// const All = () => {
//     const { mode } = useParams();
//     return (<AllViews mode={mode as string} />)
// }
export default AllViews;
