import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
    const dispatch = useDispatch();
    const connections = useSelector(state => state.connections)
    const fetchConnections = async () => {
        try{
            const res = await axios.get(BASE_URL + "/user/connections",  { withCredentials: true })
            dispatch(addConnections(res.data.data))
            console.log("res", res)
        }catch(err){
            console.error("error occured while fetching connections", err.mesaage)
        }
    }

    useEffect(() => {
       fetchConnections()
    }, [])

    if(!connections || connections.length === 0) return <div className="flex justify-center items-center h-screen">No Connections Found</div>

  return (
    <div>
        <h1 className="text-xl ml-10 mt-4">My Connections</h1>
        {connections && connections.map((user) => 
            <div className="flex bg-base-200 w-80 shadow-sm ml-10 mt-10">
                <img src={user.photoUrl} alt="photo" className="w-24 h-24" style={{objectFit: "cover",}} />
                <div className="px-2">
                    <p>{user.firstName + " " + user.lastName}</p>
                    <p>{user.age}</p>
                    <p>{user.gender}</p>
                    <p>{user.about}</p>
                </div>
            </div> 
    )}
    </div>
  )
}

export default Connections