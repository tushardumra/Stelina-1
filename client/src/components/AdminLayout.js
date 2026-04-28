import { useNavigate } from "react-router-dom"
import { AdminPage2 } from "./adminPage"
import { useEffect } from "react";

export const AdminLayout = () => {
//   const navigate = useNavigate();
//   useEffect(()=>{
//   if(localStorage.getItem("role") !== "admin"){
//      navigate("/");
//   }
// },[]);

  return (
    <div>
      <AdminPage2/> 
    </div>
  )
}

