import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';

import './Header.scss';

const Header = ({ logoSRC, navItems }) => {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);
  const hamburgerRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (
      sidebarRef.current &&
      !sidebarRef.current.contains(event.target) &&
      hamburgerRef.current &&
      !hamburgerRef.current.contains(event.target)
    ) {
      setIsOpen(false);
    }
  };

  const handleResize = () => {
    if (window.innerWidth > 768 && isOpen) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
    } else {
      document.removeEventListener('click', handleClickOutside);
    }

    window.addEventListener('resize', handleResize);

    return () => {
      document.removeEventListener('click', handleClickOutside);
      window.removeEventListener('resize', handleResize);
    };
  }, [isOpen]);

  return (
    <nav className="navbar glass-shadow">
      <div className="logo">
        <NavLink to='/'>
          <img src={logoSRC} alt="Logo" />
        </NavLink>
      </div>

      <div className={`nav-items ${isOpen ? 'open' : ''}`}>
        {navItems.map((navItem, i) => (
          <NavLink key={i} to={`/${navItem}`} activeClassName="active">
            {navItem}
          </NavLink>
        ))}
      </div>

      <div className="hamburger" ref={hamburgerRef} onClick={toggleMenu}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>

      <div className={`sidebar ${isOpen ? 'open' : ''}`} ref={sidebarRef}>
        {navItems.map((navItem, i) => (
          <NavLink key={i} to={`/${navItem}`} onClick={toggleMenu} activeClassName="active">
            {navItem}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default Header;
