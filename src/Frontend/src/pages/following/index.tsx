import { IoSearchOutline } from "react-icons/io5";
import { LuUsers } from "react-icons/lu";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NavBar from "../../components/NavBar";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="max-w-3xl w-full mx-auto">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <IoSearchOutline />
        </div>
        <input
          type="text"
          className="w-full py-3 pl-10 pr-4 text-gray-700 border border-gray-300  focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors bg-white rounded-3xl"
          placeholder="Search for users..."
          value={searchQuery}
          onChange={handleInputChange}
          onKeyUp={handleKeyPress}
        />
      </div>
    </div>
  );
};

interface UserCardProps {
  user: User;
}

interface User {
  _id?: string;
  username: string;
  email: string;
}

const fetchUsers = async (query: string = ""): Promise<User[]> => {
  try {
    const response = await axios.get<{ users: User[] }>(
      `http://localhost:3000/api/user-profile?search=${query}`,
      {
        withCredentials: true,
      },
    );
    if (response.status !== 200) {
      throw new Error("Failed to fetch users");
    }
    const data = response.data.users; // Extract users array from response data
    console.log("Fetched users:", data);
    return data;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  return (
    <a href={`/user-profile/${user._id}`}>
      <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow flex items-center cursor-pointer">
        <div className="h-12 w-12 rounded-full bg-gray-300 flex items-center justify-center mr-4"></div>
        <div>
          <h3 className="text-lg font-medium text-gray-900">{user.username}</h3>
          <p className="text-gray-600">{user.email}</p>
        </div>
      </div>
    </a>
  );
};

const SideBar: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const response = await axios.get<{ users: User[] }>(
          `http://localhost:3000/api/follow/getFollowers`,
          {
            withCredentials: true,
          },
        );
        if (response.status !== 200) {
          throw new Error("Failed to fetch users");
        }
        console.log("Fetched following users:", response.data.users);
        setUsers(response.data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
        setUsers([]);
      }
    };
    loadUsers();
  }, []);
  return (
    <div className="w-full border-r border-gray-200 p-4  shadow-md border-2 rounded-lg">
      {/* Recent Following Section */}
      <div className="mb-6">
        <div className="flex gap-2 text-gray-700 font-medium mb-3">
          <LuUsers size={20} />
          <span>Following</span>
        </div>
        <div className="ml-7 space-y-2">
          {users && users.length > 0 ? (
            users.map((user) => (
              <a href={`/user-profile/${user._id}`} key={user._id}>
                <div className="text-left">{user.username}</div>
                <div className="text-gray-800 font-extralight text-left text-sm">
                  {user.email}
                </div>
              </a>
            ))
          ) : (
            <div>No users found</div>
          )}
        </div>
      </div>
    </div>
  );
};

const Following: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/api/auth/verify", {
      method: "POST",
      credentials: "include",
    }).then((res) => {
      if (res.status !== 200) {
        navigate("/login");
      }
    });
  }, [navigate]);

  useEffect(() => {
    setIsLoading(true);
    const loadUsers = async () => {
      try {
        const fetchedUsers = await fetchUsers();
        setUsers(fetchedUsers);
      } catch (err) {
        console.error("Error loading users:", err);
      } finally {
        setIsLoading(false);
      }
    };
    loadUsers();
  }, []);

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    try {
      const fetchedUsers = await fetchUsers(query);
      setUsers(fetchedUsers);
    } catch (err) {
      console.error("Error searching users:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full p-10 h-full">
      <NavBar />
      <SearchBar onSearch={handleSearch} />
      <div className="grid grid-cols-4 mt-6 gap-4">
        <div className="col-start-1 col-span-1">
          <SideBar />
        </div>
        <div className="col-span-3">
          {isLoading ? (
            <div className="flex justify-center items-center h-48 col-span-3">
              <p>Loading...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 auto-rows-fr">
              {users && users.length > 0 ? (
                users.map((user) => <UserCard key={user._id} user={user} />)
              ) : (
                <div className="flex justify-center items-center h-48 col-span-3">
                  <p>No users found</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Following;
