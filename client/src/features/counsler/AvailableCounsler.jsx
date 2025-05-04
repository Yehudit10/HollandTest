// import useAuth from "../../hooks/useAuth";
// import { useGetCounslersQuery } from "../users/userApiSlice"
// import { connectSocket, getSocket } from "../../socket";
// import { useEffect, useState } from "react";
// const AvailableCounsler=()=>{
//  const {_id}=useAuth()   
// const {counslers,isSuccess,isLoading}=useGetCounslersQuery()
// const [availableCounselors,setAvailableCounselors]=useState([])
// useEffect(() => {
//     const socket = connectSocket(_id, "user");
//     socket.on("availableCounselors", (list) => {
//       setAvailableCounselors(list);
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, [_id]);

//   return (
//     <div>
//       <h3>Available Counselors:</h3>
//       {availableCounselors.length === 0 ? (
//         <p>No counselors available right now.</p>
//       ) : (
//         <ul>
//           {availableCounselors.map((id) => (
//             <li key={id}>Counselor ID: {id}</li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }
// export default AvailableCounsler