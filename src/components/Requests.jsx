import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect, useState} from "react"
import { useDispatch, useSelector } from "react-redux"
import { addRequests } from "../utils/requestSlice";

const Requests = () => {
    const dispatch = useDispatch();
    const requests = useSelector(state => state.requests)
    const [toastStatus, setToastStatus] = useState(null)
    const fetchRequests = async () => {
        try{
            const res = await axios.get(BASE_URL + "/user/requests/received",  { withCredentials: true })
            dispatch(addRequests(res.data.data))
        }catch(err){
            console.error("error occured while fetching requests", err.mesaage)
        }
    }

    useEffect(() => {
       fetchRequests()
    }, [])

    const requestReviewHandler = async (fromUserId, status) => {
        try{
            const res = await axios.post(`${BASE_URL}/request/review/${status}/${fromUserId}`, {}, { withCredentials: true });
            const remainingRequests = requests.filter((user) => user.fromUserId._id !== fromUserId)
            dispatch(addRequests(remainingRequests))
            setToastStatus(status)
            setTimeout(() => {
                setToastStatus(null)
            }, 3000);
        }catch(err){
            console.error("Error reviewing the request", err.message)
        }
    }

    console.log("toastStatus", toastStatus)

    if(!requests || requests.length === 0) return <div className="flex justify-center items-center h-screen">No Requests Found</div>

  return (
    <div>
        <h1 className="text-xl ml-10 mt-4">Requests Received</h1>
        {requests && requests.map((user) => 
            <div key={user._id} className="flex bg-base-200 w-80 shadow-sm ml-10 mt-10">
                <img src={user.fromUserId.photoUrl} alt="photo" className="w-24 h-24" style={{objectFit: "cover"}} />
                <div className="px-2">
                    <p>{user.fromUserId.firstName + " " + user.fromUserId.lastName}</p>
                    <p>{user.fromUserId.age}</p>
                    <p>{user.fromUserId.gender}</p>
                    <p>{user.fromUserId.about}</p>
                    <div className="card-actions justify-center my-2">
                        <button className="btn btn-sm bg-gray-500" onClick={() => requestReviewHandler(user.fromUserId._id, "rejected")}>Reject</button>
                        <button className="btn btn-sm btn-primary" onClick={() => requestReviewHandler(user.fromUserId._id, "accepted")}>Accept</button>
                    </div>
                </div>
            </div> 
    )}
    {toastStatus && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile {toastStatus} successfully!</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default Requests