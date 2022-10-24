import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import SideBar from "./sidebar";
import "../App.css";

interface IProps {
  children: JSX.Element[];
}

const AuthGuard = ({ children }: IProps) => {
  const { loggedIn } = useContext(AuthContext);

  return loggedIn ? <>{children}</> : <Navigate to="/" />;
};

const Dashboard = (props: any) => {
    const { user } = useContext(AuthContext)
  return (
    <AuthGuard>
      <nav>
        <div className="d-flex border justify-content-between px-3">
          <div className="align-self-center">
            <span
              className="d-inline-block me-2"
              // type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasScrolling"
              aria-controls="offcanvasScrolling"
              role="button"
            >
              <span className="d-block icon-hamburger-bar "></span>
              <span className="d-block icon-hamburger-bar "></span>
              <span className="d-block icon-hamburger-bar "></span>
            </span>
            <span className="d-inline-block App-logo mt-1">🚴🏾‍♂️</span>
          </div>
          <span className="d-block py-1">
            <p className="m-0">{user?.name}</p>
            <small className="text-muted">{user?.email}</small>
          </span>
        </div>
      </nav>
      <div
        className="offcanvas offcanvas-start"
        data-bs-scroll="true"
        data-bs-backdrop="false"
        tabIndex={-1}
        id="offcanvasScrolling"
        aria-labelledby="offcanvasScrollingLabel"
      >
        <div className="offcanvas-header border">
          <h5 className="offcanvas-title" id="offcanvasScrollingLabel">
            Easy Bikes{" "}
            <span className="App-logo">
              <span className="logo">🚴🏾‍♂️</span>
            </span>
          </h5>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <SideBar/>
        </div>
      </div>
      <Outlet />
    </AuthGuard>
  );
};

export default Dashboard;
