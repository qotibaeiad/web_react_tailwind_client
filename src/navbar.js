import { useState, useEffect } from 'react';
import ArticleList from './ArticleList';
import useDarkSide from './useDarkSide';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { Link } from 'react-router-dom'; 

const MyComponent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setOpen] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [category, setCategory] = useState('sport');
  const [loading, setLoading] = useState(false);
  const [colorTheme, setTheme] = useDarkSide();
  const [darkSide, setDarkSide] = useState(colorTheme === 'light' ? true : false);
  const [selectedDropdownItem, setSelectedDropdownItem] = useState('sport');
  const [autocompleteSuggestions, setAutocompleteSuggestions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [username, setUsername] = useState('');

  const autocomplete = async () => {
    try {
      if (searchTerm.trim() !== '') {
        const response = await fetch(`https://api.datamuse.com/sug?s=${searchTerm}`);
        const data = await response.json();
        setAutocompleteSuggestions(data.map(item => item.word));
      } else {
        setAutocompleteSuggestions([]);
      }
    } catch (error) {
      console.error('Error fetching autocomplete suggestions:', error);
    }
  };

  useEffect(() => {
    autocomplete();
  }, [searchTerm]);

  useEffect(() => {
    const usernameFromLocalStorage = localStorage.getItem('name');
    if (usernameFromLocalStorage) {
      setUsername(usernameFromLocalStorage);
    }
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`http://10.0.0.12:3000/api/categories?username=${username}`);
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        setCategories(data.categories || []);
        setSelectedDropdownItem(data.categories[0]); 
        setCategory(data.categories[0]); 
      } catch (error) {
        console.error('Error fetching categories:', error.message);
      }
    };
  
    fetchCategories();
  }, [username]);

  const toggleMenu = () => {
    setOpen(!isOpen);
    setCategoryDropdownOpen(false);
  };

  const toggleCategoryDropdown = () => {
    setCategoryDropdownOpen(!categoryDropdownOpen);
  };

  const handleCategorySelect = (selectedCategory) => {
    setCategory(selectedCategory);
    setSelectedDropdownItem(selectedCategory);
    setCategoryDropdownOpen(false);
  };

  const handleSearch = async () => {
    try {
      setLoading(true);
      setCategory(searchTerm);
    } catch (error) {
      console.error('Error searching:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleDarkMode = checked => {
    setTheme(colorTheme);
    setDarkSide(checked);
  };

  return (
    <div>
      <nav className="fixed top-0 w-full bg-gray-900 z-50">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 bg-gray-900">
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            />
            <button
              onClick={handleSearch}
              className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700"
            >
              Search
            </button>
          </div>
          <button
            onClick={toggleMenu}
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-dropdown"
            aria-expanded={isOpen}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div
            className={`${isOpen ? 'block' : 'hidden'} w-full md:block md:w-auto`}
            id="navbar-dropdown"
          >
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 bg-gray-900">
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Home
                </a>
              </li>
              <li>
              <Link to="/ProfileCard" className="text-white">Profile</Link>
               
              </li>
              <li>
                <Link to="/login" className="text-white">Logout</Link>
              </li>
              <li>
                <button
                  id="dropdownNavbarLink"
                  data-dropdown-toggle="dropdownNavbar"
                  className="flex items-center justify-between w-full py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
                  onClick={() => toggleCategoryDropdown()}
                >
                  {selectedDropdownItem}
                  <svg
                    className="w-2.5 h-2.5 ms-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>
                <div
                  id="dropdownNavbar"
                  className={`${categoryDropdownOpen ? 'block' : 'hidden'} z-10 absolute font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600`}
                >
                  <ul
                    className="py-2 text-sm text-gray-700 dark:text-gray-400"
                    aria-labelledby="dropdownLargeButton"
                  >
                    {categories.map((category, index) => (
                      <li key={index}>
                        <a
                          href="#"
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          onClick={() => handleCategorySelect(category)}
                        >
                          {category}
                        </a>
                      </li>
                    ))}
                  </ul>
                  <div className="py-1">
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:text-white"
                    >
                      Sign out
                    </a>
                    <li>
                      <div>
                        <DarkModeSwitch checked={darkSide} onChange={toggleDarkMode} className='w-10' />
                      </div>
                    </li>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className='pt-16'>
        <ArticleList category={category} loading={loading} />
      </div>
    </div>
  );  
};

export default MyComponent;
