import React, { useEffect, useState } from 'react'
import NavListItem from '../components/NavListItem'
import navListData from '../data/navListData'
import './header.css'
import Search from '../components/Search'
import Button from '../components/Button'
import { useUser } from '../context/useUser'
import { useNavigate } from 'react-router-dom';

function Header({scroll}) {
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
                    <Button
                        icon={<ion-icon name="log-in-outline"></ion-icon>}
                        name='Login'
                    />
                </li>
            </ul>
            <ul className='nav'>
                {
                    navList.map((nav) => {
                        return <NavListItem key={nav.id} nav={nav} navOnClick={handleNavOnClick} />
                    })
                }
            </ul>
            <Search />
            {user?.email ? (
                <div className="user-info">
                    {/* <span>Welcome, {user.email}</span> */}
                    <Button onClick={handleClickLogout} name="Logout" />
                </div>
                ) : (
                <Button onClick={handleClickLogin} icon={<ion-icon name="log-in-outline"></ion-icon>} name="Login" />
            )}
            {/* <div className="login">
                <Button icon={<ion-icon name="log-in-outline"></ion-icon>} name='Login' />
            </div> */}
        </header>
    </div>
  )
}

export default Header