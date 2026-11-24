import axios from "axios"
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux"
import { setFeed } from "../utils/feedSlice";

const UserCard = ({ user, feed, hideButtons }) => {
  const dispatch = useDispatch()

  const handleSendRequest = async (status, toUserId) => {
    try{
      const res = await axios.post(BASE_URL + `/request/send/${status}/${toUserId}`, {}, { withCredentials: true })
      console.log("sent request", status, res)
      const remainingFeed = feed.filter((user) => user._id !== toUserId)
      dispatch(setFeed(remainingFeed));
    }catch(err){
      console.error("Error: ", err.message)
    }
  }

  return (
    <div className="card bg-base-200 w-80 shadow-sm">
      <figure>
        <img
          style={{
            backgroundColor: "#f0f0f0",
            width: "100%",
            height: "250px",
            objectFit: "cover",
          }}
          src={user.photoUrl}
          alt="profile"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {user.firstName} {user.lastName}
        </h2>
        <p>{user.age}</p>
        <p>{user.gender}</p>
        {!hideButtons && <div className="card-actions justify-center">
          <button className="btn bg-gray-500" onClick={() => handleSendRequest("ignored", user._id)}>Ignore</button>
          <button className="btn btn-primary" onClick={() => handleSendRequest("interested", user._id)}>Send Request</button>
        </div>}
      </div>
    </div>
  );
};

export default UserCard;
