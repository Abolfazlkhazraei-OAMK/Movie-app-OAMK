import React, { useState } from 'react'
import NavListItem from '../components/NavListItem'
import navListData from '../data/navListData'
import './header.css'
import Search from '../components/Search'
import Button from '../components/Button'

function Header({scroll}) {
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
            <div className="login">
                <Button icon={<ion-icon name="log-in-outline"></ion-icon>} name='Login' />
            </div>
        </header>
    </div>
  )
}

export default Header