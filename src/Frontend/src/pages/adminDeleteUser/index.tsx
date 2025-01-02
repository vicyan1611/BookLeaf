import AdminLayoutHeader from '../../components/AdminLayoutHeader'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { IoSearchOutline } from "react-icons/io5";
import { FaTrashAlt } from 'react-icons/fa';

const SERVER = 'http://localhost:3000';

interface User {
  _id?: string;
  username: string;
  email: string;
}

const fetchUsers = async (query: string = ""): Promise<User[]> => {
  try {
    const response = await axios.get<{ users: User[] }>(
      SERVER + `/api/admin-user-profile?search=${query}`, // Assuming your API returns { users: [...] }
      {
        withCredentials: true,
      }
    );
    if (response.status !== 200) {
      throw new Error("Failed to fetch users");
    }
    const data = response.data.users; // Extract users array from response data
    console.log("Fetched users:", data.length);
    return data;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};
//////////////////////////
//////////////////////////
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
//////////////////////////
//////////////////////////
interface UserCardProps {
  user: User;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  const [showModal, setShowModal] = useState(false);

  const handleDelete = () => {
    setShowModal(true);
  };

  const handleConfirmDelete = async () => {
    setShowModal(false);

    try {
      const response = await fetch(`${SERVER}/api/admin/delete-user/${user._id}`, {
        method: 'PUT',
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`${response.json()}`);
      }

      console.log('Item deleted successfully');
      window.location.reload(); // Or update state and re-render the list
    } catch (error) {
      console.error('Error deleting item:', error);
      alert(`Error deleting item: ${error}`);
    }
  };

  const handleCancelDelete = () => {
    setShowModal(false);
  };
  return (
    <div className="bg-white p-2 rounded-lg shadow hover:shadow-md transition-shadow flex items-center">
      <div className="h-12 w-12 rounded-full bg-gray-300 flex items-center justify-center mr-4">
        <span className="text-gray-600 text-lg font-semibold">
          {user.username.charAt(0)}
        </span>
      </div>
      <div>
        <h3 className="text-lg font-medium text-gray-900">{user.username}</h3>
        <p className="text-gray-600">{user.email}</p>
      </div>
      <div className="justify-end">
        <button onClick={handleDelete}>
          <FaTrashAlt style={{ color: 'red' }} />
        </button>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-lg font-medium mb-4">Are you sure you want to delete this item?</p>
            <div className="flex justify-around">
              <button
                onClick={handleConfirmDelete}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Yes
              </button>
              <button
                onClick={handleCancelDelete}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
//////////////////////////
//////////////////////////
const WorkSpace = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
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
    <div className='w-4/5 py-4 px-2 mx-auto rounded-3xl border'>
      <SearchBar onSearch={ handleSearch }/>
      <div className='min-h-36 flex items-center'>
        {/* fetched users displaying */}
        {
          isLoading? (
            <p className='w-full h-full text-center'>Loading...</p>
          ) : (
            users.length === 0 ? (
              <p className='w-full h-full text-center'>No users found</p>
            ) : (
              <div className='w-full h-full pt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 auto-rows-fr'>
                {users.map( (user) => (<UserCard user={ user }/>) )}
              </div>
            )
          )
        }
      </div>
    </div>
  )
}
//////////////////////////
//////////////////////////
const AdminDeleteUser = () => {
  const navigate = useNavigate();
  useEffect(() => {
    fetch("http://localhost:3000/api/admin/delete-user", {
      method: "GET",
      credentials: "include",
    }).then((res) => {
      if (res.status !== 200) {
        navigate("/admin");
      }
    })
  });
  return (
    <div className='h-full w-full p-4 flex flex-col'>
      <AdminLayoutHeader />
      <WorkSpace />
    </div>
  );
};

export default AdminDeleteUser;