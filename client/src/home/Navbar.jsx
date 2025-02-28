import { useState } from 'react';
import { Search, User } from 'lucide-react';
import "./Home.css"

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  return (
    <nav className="bg-white shadow-md w-full fixed top-0 left-0">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <span className="text-2xl font-bold text-blue-600">FotoTune</span>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-xl px-4">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-500"
                >
                  <Search size={20} />
                </button>
              </div>
            </form>
          </div>

          {/* Profile */}
          <div className="flex items-center">
            <button className="flex items-center space-x-2 p-2 rounded-full bg-gray-100 hover:bg-gray-200">
              <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
                <User size={20} className="text-gray-600" />
              </div>
              <span className="hidden md:block text-gray-700 px-2">Profile</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;