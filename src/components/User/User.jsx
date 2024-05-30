import { Outlet } from "react-router-dom";

const User = () => {
  return (
    <>
      <div>user page</div>
      <Outlet />
    </>
  );
};

export default User;
