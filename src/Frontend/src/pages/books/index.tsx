import bookLeafLogo from "../../assets/react.svg";
import "./index.css";
import { IoSearchOutline } from "react-icons/io5";
import { LuBookOpen } from "react-icons/lu";
const SearchBar = () => {
  return (
    <div className="max-w-3xl w-full mx-auto">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <IoSearchOutline />
        </div>
        <input
          type="text"
          className="w-full py-3 pl-10 pr-4 text-gray-700 border border-gray-300  focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors bg-white rounded-3xl"
          placeholder="Search for books..."
        />
      </div>
    </div>
  );
};

const SideBar = () => {
  return (
    <div className="w-64 border-r border-gray-200 p-4 bg-gray-50">
      {/* Recent Books Section */}
      <div className="mb-6">
        <div className="flex gap-2 text-gray-700 font-medium mb-3">
          <LuBookOpen size={20} />
          <span>Just Read</span>
        </div>
        <div className="ml-7 space-y-2">
          <div>
            <div className="text-left">Rừng Xà Nu</div>
            <div className="text-gray-800 font-extralight text-left text-sm">
              Reading Progress: 43%
            </div>
          </div>
          <div>
            <div className="text-left">Đắc Nhân Tâm</div>
            <div className="text-gray-800 font-extralight text-left text-sm">
              Reading Progress: 100%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function Books() {
  return (
    <>
      <div className="flex justify-between">
        <img src={bookLeafLogo} alt="" />
        <div className="flex gap-3">
          <button className="font-semibold hover:bg-green-500 hover:text-white py-2 px-3 rounded">
            Books
          </button>
          <button className="font-semibold hover:bg-green-500 hover:text-white py-2 px-3 rounded">
            My Libraries
          </button>
          <button className="font-semibold hover:bg-green-500 hover:text-white py-2 px-3 rounded">
            Goals
          </button>
          <button className="font-semibold hover:bg-green-500 hover:text-white py-2 px-3 rounded">
            Friends
          </button>
        </div>
      </div>
      <SearchBar />
      <div className="grid-cols-4">
        <SideBar />
        <div>
          <h1>Books</h1>
        </div>
      </div>
    </>
  );
}

export default Books;
