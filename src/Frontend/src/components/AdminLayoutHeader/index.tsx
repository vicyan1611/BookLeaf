import { FC } from 'react';
import MainPageLogo from '../../assets/BookLeaf_Logo_cropped.svg'; //"../../assets/BookLeaf_Logo_cropped.svg";
import { useNavigate } from 'react-router-dom';

type ActiveButton = 'users' | 'stats' | 'logout';

interface AdminLayoutHeaderProps {
  activeButton: ActiveButton;
  activeButtonClassName?: string; // New prop for custom active button styling
};

const AdminLayoutHeader: FC<AdminLayoutHeaderProps> = ({
  activeButton = 'users',
  activeButtonClassName = '' // Default to empty string if not provided
}) => {
  const getButtonClasses = (buttonType: ActiveButton) => {
    const baseClasses = "font-semibold transition-colors duration-200 py-2 px-3 rounded-xl";
    const activeClasses = `bg-green-700 text-white ${activeButtonClassName}`;
    const inactiveClasses = "hover:bg-green-700 hover:text-white";
    const logoutClasses =  "text-red-700 hover:bg-red-700 hover:text-white";
    if (buttonType !== 'logout')
      return `${baseClasses} ${activeButton === buttonType ? activeClasses : inactiveClasses}`;
    else
      return `${baseClasses} ${logoutClasses}`;
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    fetch("http://localhost:3000/api/admin/logout", {
      method: "POST",
      credentials: "include",
    }).then((res) => {
      navigate("/admin");
    })
    // navigate('/admin/delete-user');
  };
  return (
    <header className="flex justify-between mb-6 w-full h-12">
      <img 
        src={MainPageLogo} 
        alt="BookLeaf Logo" 
        className="h-full"
      />
      <nav className="flex gap-3">
        <button
          type="button"
          className={getButtonClasses('logout')}
          aria-label="Log out"
          onClick={ handleLogout }
        >
          Logout
        </button>
        <button 
          type="button"
          className={getButtonClasses('users')}
          aria-label="View Users"
          aria-pressed={activeButton === 'users'}
          onClick={() => navigate('/admin/delete-user')}
        >
          Users
        </button>
        <button 
          type="button"
          className={getButtonClasses('stats')}
          aria-label="View Statistics"
          aria-pressed={activeButton === 'stats'}
          onClick={() => navigate('/admin/overall-statistics')}
        >
          Stats
        </button>
      </nav>
    </header>
  );
};

export default AdminLayoutHeader;