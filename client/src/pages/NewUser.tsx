import { Signup } from "../components";

const NewUser = () => {
  return (
    <>
      <div className="container pt-5">
        <div className="card px-1 mb-3">
            <h2>Add a User / Manager</h2>
        </div>
        <Signup />
      </div>
    </>
  );
};

export default NewUser;
