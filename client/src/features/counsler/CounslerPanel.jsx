
import { useEffect, useState } from "react";
import { connectSocket, getSocket } from "../../socket";
import useAuth from "../../hooks/useAuth";

const CounselorPanel=()=> {
  const [available, setAvailable] = useState(false);
  const {_id}=useAuth()   

  useEffect(() => {
    console.log("pp")
    const socket = connectSocket(_id, "counselor");
    return () => {
      socket.disconnect();
    };
  }, [_id]);

  const toggleAvailability = () => {
    const socket = getSocket();
    if (!socket) return;

    if (!available) {
      socket.emit("setAvailable");
    } else {
      socket.emit("setUnavailable");
    }

    setAvailable((prev) => !prev);
  };

  return (
    <div>
      <h2>Counselor Panel</h2>
      <p>Status: {available ? "✅ Available" : "❌ Unavailable"}</p>
      <button onClick={toggleAvailability}>
        {available ? "Go Unavailable" : "Become Available"}
      </button>
    </div>
  );
}
export default CounselorPanel
