import { Bell, Menu } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react';
import Logo from './Logo';
import { letterBlueBgWhite } from '../config';
import { Loading, Toast } from '../customs';
import { AuthContext } from '../contexts/AuthContext';
import '../styles/Header.scss';

const authURL = process.env.REACT_APP_AUTH_URL;

export default function Header({ toggleSidebar }) {
    const { currentUser } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);
    const [notifications] = useState([
        {
            id: '1',
            title: 'Nouvelle connexion détectée',
            message: 'Une nouvelle connexion a été détectée sur votre compte depuis un appareil inconnu.',
            type: 'security',
            date: '2025-06-02T10:30:00Z',
            read: false,
        },
        {
            id: '2',
            title: 'Mot de passe modifié',
            message: 'Votre mot de passe a été modifié avec succès.',
            type: 'success',
            date: '2025-05-28T15:45:00Z',
            read: true,
        }
    ]);
    const [toast, setToast] = useState({ show: false, type: '', message: '' });

    // useEffect(() => {

    //     const getNotifications = async () => {
    //         if (!currentUser) {
    //             setToast({ show: true, type: 'error', message: 'Impossible de charger les notifications. Veuillez réessayer.' });
    //             window.location.href = `${authURL}/signin?redirect=${window.location.href}`;
    //             return;
    //         }

    //         setIsLoading(false);
    //     }

    //     // fetchUnreadMessagesCount();
    //     getNotifications();
    // }, [currentUser]);


    if (isLoading) return <Loading />

    return (
        <header className="header">
            <div className="header-content">
                <div className="logo-section">
                    <button className="menu-button" onClick={toggleSidebar}>
                        <Menu size={24} />
                    </button>
                    <div className="logo-title">
                        <Logo className="logo" size={40} alt='Logo' source={letterBlueBgWhite} />
                        <h1 className="title">Compte</h1>
                    </div>
                </div>

                <div className="notification-section">
                    <div className="notification-button">
                        <button>
                            <Bell size={20} />
                            {notifications.length > 0 && (
                                <span className="notification-count">
                                    {notifications.length}
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </div>
            <Toast show={toast.show} type={toast.type} message={toast.message} onClose={() => setToast({ show: false, type: '', message: '' })} />
        </header>
    );
};
