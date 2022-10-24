import { useContext } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { userNav, mngrNav } from "./data/sidebar.data";

const SideBar = () => {
  const { user } = useContext(AuthContext);
  return (
    <>
      <div className="card mb-3 p-4">
        {userNav.map((ele) => (
          <div className="mb-3" key={ele?.id}>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "text-white text-start btn bg-secondary text-decoration-none"
                  : "text-dark text-decoration-none "
              }
              to={ele?.path}
            >
              <span className="d-inline-block me-3">
                <ele.icon />
              </span>
              {ele?.label}
            </NavLink>
          </div>
        ))}
      </div>
      {user.role === "manager" ? (
        <div className="card mb-3 p-4">
          {mngrNav.map((ele) => (
            <div className="mb-3" key={ele?.id}>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "text-white text-start btn bg-secondary text-decoration-none"
                    : "text-dark text-decoration-none "
                }
                to={ele?.path}
              >
                <span className="d-inline-block me-3">
                  <ele.icon />
                </span>
                {ele?.label}
              </NavLink>
            </div>
          ))}
        </div>
      ) : null}
    </>
  );
};

export default SideBar;
