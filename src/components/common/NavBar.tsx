import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="flex items-center justify-between p-2 bg-gray-100 dark:bg-gray-900 shadow-md">
      <Link to="/" className="text-xl font-bold text-gray-900 dark:text-gray-100">
        AI Judge 
      </Link>
      <div className="flex gap-4">

        <Link
          to="/results"
          className="px-3 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100"
        >
          Results
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
