import { Login, Signup } from "../components";


const Home = () => {

    return (<>
        <div className="container w-100 py-5">
      <div className="row px-sm-2 px-md-5">
        <div className="col-sm-12 col-md-10 offset-md-1 col-lg-6 offset-lg-3">
          <div className="card p-5">
            <nav>
              <div className="nav nav-tabs" id="nav-tab" role="tablist">
                <button
                  className="nav-link"
                  id="nav-home-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-home"
                  type="button"
                  role="tab"
                  aria-controls="nav-home"
                  aria-selected="true"
                >
                  Sign up
                </button>
                <button
                  className="nav-link active"
                  id="nav-profile-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-profile"
                  type="button"
                  role="tab"
                  aria-controls="nav-profile"
                  aria-selected="false"
                >
                  Log in
                </button>
              </div>
            </nav>
            <div className="tab-content m-3" id="nav-tabContent">
              <div
                className="tab-pane fade"
                id="nav-home"
                role="tabpanel"
                aria-labelledby="nav-home-tab"
              >
                <h1 className="h4 mb-3 px-3 fw-normal text-center">Please sign up</h1>
                <Signup />
              </div>
              <div
                className="tab-pane fade show active"
                id="nav-profile"
                role="tabpanel"
                aria-labelledby="nav-profile-tab"
              >
                <h1 className="h4 mb-3 px-3 fw-normal text-center">Please login in</h1>
                <Login />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>)
}

export default Home;