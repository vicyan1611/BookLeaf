import bookLeafLogo from "/assets/BookLeaf_Logo.svg"; // resize the logo to 20px
import "./index.css";
import { useState } from "react";
import { FaCog, FaChartPie, FaBook } from "react-icons/fa";
import { IoPersonCircleOutline } from "react-icons/io5";

const Sidebar = ({ active, setActive }: { active: string; setActive: Function }) => {
  const menuItems = [
    { icon: <FaBook size={24} />, label: "Books", id: "books" },
    { icon: <FaChartPie size={24} />, label: "Analysis", id: "analysis" },
    { icon: <IoPersonCircleOutline size={24} />, label: "Personal Info", id: "info" },
    { icon: <FaCog size={24} />, label: "Account", id: "account" },
  ];

  return (
    <div className="flex flex-col items-center w-16 bg-white shadow-lg h-full py-6">
      {menuItems.map((item) => (
        <div
          key={item.id}
          onClick={() => setActive(item.id)}
          className={`p-4 rounded-lg mb-4 cursor-pointer ${
            active === item.id ? "bg-green-200 text-green-700" : "text-gray-700"
          }`}
        >
          {item.icon}
        </div>
      ))}
    </div>
  );
};

const BooksSection = () => (
  <div className="p-6">
    <h2 className="text-lg font-bold mb-4">Currently Reading</h2>
    <div className="grid grid-cols-4 gap-4">
      {Array(5)
        .fill(null)
        .map((_, i) => (
          <div
            key={i}
            className="bg-white p-4 shadow rounded-lg relative hover:bg-gray-50 group"
          >
            <div className="absolute inset-0 flex justify-center items-center bg-opacity-0 group-hover:bg-opacity-50 group-hover:bg-black transition">
              <div className="text-white text-xl font-bold">75% Complete</div>
            </div>
            <div className="h-40 bg-gray-200 rounded-lg"></div>
            <h3 className="text-sm mt-2">Book’s Name</h3>
            <p className="text-xs text-gray-600">Authors:</p>
          </div>
        ))}
    </div>
  </div>
);

const AnalysisSection = () => (
  <div className="p-6">
    <h2 className="text-lg font-bold mb-4">Reading Time Analytics</h2>
    <div className="grid grid-cols-2 gap-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-sm font-medium mb-2">Reading Insights</h3>
        {/* Replace with actual Pie Chart */}
        <div className="h-40 bg-gray-100 rounded-lg flex justify-center items-center">
          <p>Pie Chart Placeholder</p>
        </div>
      </div>
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-sm font-medium mb-2">Reading Time (Monthly)</h3>
        {/* Replace with actual Line Chart */}
        <div className="h-40 bg-gray-100 rounded-lg flex justify-center items-center">
          <p>Line Chart Placeholder</p>
        </div>
      </div>
    </div>
  </div>
);

const PersonalInfoSection = () => (
  <div className="p-6">
    <h2 className="text-lg font-bold mb-4">About Me</h2>
    <div className="bg-white p-4 shadow rounded-lg">
      <p>
        Hello, I’m an avid reader and especially love mangoes, fanfictions, yahdeeyahda, blah blah
        blah...
      </p>
    </div>
    <h3 className="text-lg font-bold mt-6">More Info</h3>
    <div className="bg-white p-4 shadow rounded-lg mt-4">
      <p>Full name: Alexa Rawles</p>
      <p>Gender: Female</p>
    </div>
  </div>
);

const AccountManagementSection = () => (
  <div className="p-6">
    <h2 className="text-lg font-bold mb-4">Account Management</h2>
    <div className="bg-white p-4 shadow rounded-lg">
      <button className="block w-full text-left text-red-600">Logout</button>
      <button className="block w-full text-left mt-2">Change Password</button>
    </div>
  </div>
);

const UserProfile = () => {
  const [active, setActive] = useState("books");

  return (
    <div className="flex h-screen">
      <Sidebar active={active} setActive={setActive} />
      <div className="flex-grow bg-gray-50">
        <header className="bg-green-100 p-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
            <div>
              <h1 className="text-lg font-bold">Alexa Rawles</h1>
              <p className="text-sm text-gray-600">alexarawles@gmail.com</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="bg-green-500 text-white px-4 py-2 rounded">Add Friend</button>
            <button className="bg-red-500 text-white px-4 py-2 rounded">Block</button>
          </div>
        </header>
        <main>
          {active === "books" && <BooksSection />}
          {active === "analysis" && <AnalysisSection />}
          {active === "info" && <PersonalInfoSection />}
          {active === "account" && <AccountManagementSection />}
        </main>
      </div>
    </div>
  );
};

export default UserProfile;
