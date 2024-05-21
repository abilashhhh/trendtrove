import { useDispatch } from "react-redux";
import { adminLogout } from "../../Redux/AdminSlice/adminSlice";

function AdminHomePage() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(adminLogout());
    
  };

  return (
    <div>
      <h1>Admin Home Page</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default AdminHomePage