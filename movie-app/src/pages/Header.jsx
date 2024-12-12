import React, { useEffect, useState } from 'react'
import NavListItem from '../components/NavListItem'
import navListData from '../data/navListData'
import './header.css'
import Search from '../components/Search'
import Button from '../components/Button'
import { useUser } from '../context/useUser'
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

function Header({scroll, movies}) {
    const navigate = useNavigate();
    const { user, signOut } = useUser();
    useEffect(() => {
        console.log('Current user:', user); 
    }, [user]);

    const handleClickLogin = () => {
        navigate('/signin');
    };

    const handleClickLogout = () => {
        signOut(); 
    };

    // **New function to navigate to Profile**
    const handleProfileClick = () => {
        navigate('/profile');
    };

    const [navList, setNavList] = useState(navListData);
    const [open, setOpen] = useState(false);

    const handleNavOnClick = id => {
        const newNavList = navList.map(nav => {
            nav.active = false;
            if(nav.id === id) nav.active = true;
            return nav;
        });
        setNavList(newNavList);
    }

    const handleToggleMenu = () => {
        setOpen(!open);
    }

  return (
    <div className="container-fluid">
        <header className={`${scroll > 100 ? 'scrolled' : undefined}`}>
            <a href="/" className="logo">
                Cinema
            </a>
            {open ? (
                <a className="menu" onClick={handleToggleMenu}>
                    <ion-icon name="close-outline"></ion-icon>
                </a>
            ) : (
                <a className="menu" onClick={handleToggleMenu}>
                    <ion-icon name="menu-outline"></ion-icon>
                </a>
            )}
            <ul className={`nav-mobile ${open ? 'active' : undefined}`}>
                {navList.map((nav) => (
                    <NavListItem key={nav.id} nav={nav} navOnClick={handleNavOnClick} />
                ))}
                <li>
                    {user?.email ? (
                        <div className='login'>
                            {/* <span>Welcome, {user.email}</span> */}
                            <Button onClick={handleClickLogout} icon={<ion-icon name="log-out-outline"></ion-icon>} name="Logout" />
                        </div>
                        ) : (
                        <Button onClick={handleClickLogin} icon={<ion-icon name="log-in-outline"></ion-icon>} name="Login" />
                    )}
                </li>
            </ul>
            <ul className="nav">
                    {navList.map((nav) => (
                        <NavListItem key={nav.id} nav={nav} navOnClick={handleNavOnClick} />
                    ))}
                    {user?.email && !navList.some((nav) => nav.name === 'Profile')}
                </ul>
            <Search />
            <div className="icon-profile" onClick={handleProfileClick}>
                    <FontAwesomeIcon icon={faUser} />
                </div>
            {user?.email ? (
                <div className="login-info">
                    {/* <span>Welcome, {user.email}</span> */}
                    <Button onClick={handleClickLogout} icon={<ion-icon name="log-out-outline"></ion-icon>} name="Logout" />
                </div>
                ) : (
                <Button onClick={handleClickLogin} icon={<ion-icon name="log-in-outline"></ion-icon>} name="Login" />
            )}
        </header>
    </div>
  )
}

export default Header