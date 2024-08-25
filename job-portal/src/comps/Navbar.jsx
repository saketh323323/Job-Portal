import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { RxDropdownMenu } from "react-icons/rx";
import { FaXmark } from "react-icons/fa6";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, [auth]);

  const handleMenuToggler = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    signOut(auth).then(() => {
      setUser(null);
    }).catch((error) => {
      console.error("Error signing out: ", error);
    });
  };

  const navItems = [
    { path: "/", title: "search" },
    { path: "/my-job", title: "my jobs" },
    { path: "/salary", title: "estimated salary" },
    user && { path: "/post-job", title: "Post Job" }
  ].filter(Boolean);

  return (
    <header className="bg-[#434343] max-w-screen-2xl container mx-auto xl:px-20 px-4">
      <nav className="flex justify-between py-6 items-center">
        <a href="/" className='flex text-center text-3xl gap-1 text-yellow-300'>
          <svg width="35" height="35" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" fill="#181515" />
            <path fill="#FFF" d="M9.207 8.793l2.793 2.793L15.707 8.793l2.793 2.793L12 17.586l-2.793-2.793-2.793 2.793L8.207 11.586z"/>
          </svg>
          <span>JobMela</span>
        </a>
        <ul className="hidden md:flex gap-10">
          {navItems.map(({ path, title }) => (
            <li key={path} className="text-base text-yellow-300">
              <NavLink
                to={path}
                className={({ isActive }) =>
                  isActive ? "active" : ""
                }
              >
                {title}
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="text-base text-white font-medium space-x-5 hidden lg:block">
          {user ? (
            <>
              <span className="text-yellow-300">Welcome, {user.displayName || "User"}!</span>
              <button onClick={handleLogout} className="px-5 py-2 border rounded">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="px-5 py-2 border rounded">Login</Link>
              <Link to="/sign-up" className="border px-5 py-2 rounded text-white bg-black">Signup</Link>
            </>
          )}
        </div>
        <div className="md:hidden block">
          <button onClick={handleMenuToggler}>
            {isMenuOpen ? <FaXmark className="h-8 w-8 text-primary"/> : <RxDropdownMenu className="h-8 w-8 text-primary"/>}
          </button>
        </div>
      </nav>

      <div className={`bg-primary px-3 py-4 rounded-sm ${isMenuOpen ? "" : "hidden"}`}>
        <ul>
          {navItems.map(({ path, title }) => (
            <li key={path} className="text-base text-white first:text-white py-1">
              <NavLink
                to={path}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                {title}
              </NavLink>
            </li>
          ))}
          {user ? (
            <li className="py-1 text-white">
              <button onClick={handleLogout}>Logout</button>
            </li>
          ) : (
            <>
              <li className="py-1 text-white"><Link to="/login">Login</Link></li>
              <li className="py-1 text-white"><Link to="/sign-up">Signup</Link></li>
            </>
          )}
        </ul>
      </div>
    </header>
  );
}

export default Navbar;
