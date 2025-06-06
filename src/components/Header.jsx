import { useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaBusAlt} from "react-icons/fa";
import { CgLogIn } from "react-icons/cg";
import Logout from './Logout.jsx';

const Header = () => {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()
  const navItems = [
        {
            name: 'Home',
            slug: "/",
            active: true,
        },
        {
            name: 'Login',
            slug: "/login",
            active: !authStatus,
        },
        {
            name: 'Register',
            slug: "/register",
            active: !authStatus
        },
        {
            name: 'Tickets',
            slug: "/all-user-tickets",
            active:authStatus
        }
    ]
    
  return (
    <>
      <nav className="bg-[#0d071a] text-white shadow-lg fixed w-full z-1000">
        <div className="select-none max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo and Navigation */}
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <Link to='/'>
                  <FaBusAlt /> 
                </Link>
                <span className="ml-2 text-xl font-bold">BusKolkata</span>
              </div>
              
              <div className="ml-6 flex space-x-8">
                <ul className='flex ml-auto'>
                  {navItems.map((item) => 
                    item.active ? (
                      <li key={item.name} className ='border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'>
                        <a
                        onClick={() => navigate(item.slug)}
                        className='cursor-pointer select-none inline-bock px-2 py-2 duration-200'
                        >{item.name}</a>
                      </li>
                    ) : null
                    )}
                </ul>
              </div>
            </div>

            {/* Right Side Buttons */}
            <div className="flex items-center">
              <div className="ml-4 flex items-center">
                {authStatus ? (<Logout/>): 
                (<button onClick={() => navigate("/login")}
                className="flex items-center gap-2 bg-indigo-600 px-4 py-2 rounded-md text-white text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Sign In <CgLogIn />
                </button>)}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
