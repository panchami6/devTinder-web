import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((state) => state.feed);
  const getFeedData = async () => {
    if (feed) return;
    try {
      const response = await axios.get(`${BASE_URL}/user/feed`, {
        withCredentials: true,
      });
      dispatch(setFeed(response.data.data));
    } catch (error) {
      console.error("Error occurred while fetching feed data:", error);
    }
  };

  useEffect(() => {
    getFeedData();
  }, []);

  return (
    <div className="flex items-center justify-center h-screen gap-10">
       {feed?.length ? <UserCard user={feed[0]} feed={feed} /> : <div>No Feed</div>}
    </div>
  );
};

export default Feed;
