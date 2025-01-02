import MainPageLogo from "../../assets/BookLeaf_Logo_cropped.svg";
import "./index.css";
import { useState, useEffect } from "react";
import axios from "axios";

const NavBar = () => {
  const [myID, setMyID] = useState<string | null>(null);
  useEffect(() => {
    const fetchmyID = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/user-profile/myid`,
          {
            withCredentials: true,
          }
        );
        if (response.status !== 200) {
          throw new Error("Failed to fetch users");
        }
        setMyID(response.data.id);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchmyID();
  }, []);

  return (
    <div className="flex justify-between mb-6 w-full h-12 align-center">
      <img src={MainPageLogo} alt="" />
      <div className="flex gap-3 items-center">
        <a href="/books" className="font-semibold px-5">
          Books
        </a>
        <a href={`/user-profile/${myID}`} className="font-semibold px-5">
          My Profile
        </a>
        <a href="/following" className="font-semibold px-5">
          Following
        </a>
      </div>
    </div>
  );
};

export default NavBar;
