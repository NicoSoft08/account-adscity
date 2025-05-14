import React, { useContext } from 'react';
import { ExternalLink, X } from 'lucide-react';
import { defaultAvatar, navItems } from '../../config';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import '../../styles/Sidebar.scss';

export default function Sidebar({ isOpen, closeSidebar }) {
    const { userData, userRole } = useContext(AuthContext);

    const profileImage = userData?.profilURL || defaultAvatar;

    return (
        <>
            {/* Overlay for mobile */}
            {isOpen && (
                <div className="overlay" onClick={closeSidebar} />
            )}

            {/* Sidebar */}
            <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
                <div className="sidebar-content">
                    {/* LOGO */}
                    <div className="logo-section">
                        <div className="logo">AdsCity</div>
                        <button className="close-button" onClick={closeSidebar}>
                            <X size={20} />
                        </button>
                    </div>

                    {/* NAV ITEMS */}
                    <nav className="nav">
                        {navItems(userRole).map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                onClick={closeSidebar}
                                className={({ isActive }) => (isActive ? 'active' : '')}
                            >
                                <span className="nav-icon">{item.icon}</span>
                                <span className="nav-label">{item.label}</span>
                                {(item.label === 'Boutique' || item.label === 'Tableau de bord') && (
                                    <ExternalLink className='external-link' size={16} />
                                )}
                            </NavLink>
                        ))}
                    </nav>

                    {/* USER INFO */}
                    <div className="user-info">
                        <div className="user-details">
                            {/* AVATAR */}
                            <img
                                src={profileImage}
                                alt="User Avatar"
                                className="avatar"
                            />
                            <div className="user-text">
                                <p className="user-name">{userData?.firstName} {userData?.lastName}</p>
                                <p className="user-email">{userData?.email}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
};