import React, { useState } from 'react';
import { AlertTriangle, Shield, User } from 'lucide-react';
import { CardItem } from '../components/ui/Card';
import { Link } from 'react-router-dom';
import { navItems } from '../config';
import { user } from '../data/mockData';
import '../styles/Dashboard.scss';

const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour >= 5 && hour < 12) return 'Bonjour';
    if (hour >= 12 && hour < 17) return 'Bon après-midi';
    if (hour >= 17 && hour < 21) return 'Bonsoir';
    return 'Bonne nuit';
};

export default function Dashboard() {
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
    return (
        <div className="account-dashboard">
            <h1 className="greeting">
                {getGreeting()}{user.name ? `, ${user.name}` : ''} 👋
            </h1>

            <div className="quick-access-container">
                {/* QUICK ACCESS */}
                <CardItem title="Accès Rapide" className="mb-6">
                    <div className="quick-access-items">

                        {navItems.map((item, index) => {
                            if (item.label === 'Accueil') return null;
                            return (
                                <QuickAccessItem
                                    key={index}
                                    to={item.path}
                                    icon={item.icon}
                                    label={item.label}
                                    description={item.description}
                                />
                            );
                        })}
                    </div>
                </CardItem>
            </div>

            {/* ACCOUNT OVERVIEW */}
            <CardItem title="Aperçu du Compte" className="mb-6">
                <div className="account-overview">
                    <div className="user-info">
                        <img src={user.avatar} alt="" className="avatar" />
                        <div className="user-details">
                            <h3>{user.name}</h3>
                            <p>{user.email}</p>
                        </div>
                    </div>

                    <div className="account-status">
                        <div>
                            <span>Etat du Compte</span>
                            <span className="status-active">
                                <span></span>
                                Actif
                            </span>
                        </div>
                        <div>
                            <span>Membre depuis</span>
                            <span>
                                {new Date(user.createdAt).toLocaleDateString()}
                            </span>
                        </div>
                        <div>
                            <span>Dernière connexion</span>
                            <span>
                                {new Date(user.lastLogin).toLocaleDateString()}
                            </span>
                        </div>
                    </div>
                </div>
            </CardItem>

            {/* Recent Activity */}
            <CardItem title="Activité Récente" className="mb-6">
                <div className="recent-activity">
                    <ActivityItem
                        title="Mot de passe modifié"
                        time="2 days ago"
                        description="Votre mot de passe a été modifié avec succès."
                        type="security"
                    />
                    <ActivityItem
                        title="Nouvelle connexion"
                        time="5 days ago"
                        description="Une nouvelle connexion a été détectée sur votre compte."
                        type="alert"
                    />
                    <ActivityItem
                        title="Profil mis à jour"
                        time="1 week ago"
                        description="Votre profil a été mis à jour avec succès."
                        type="info"
                    />
                    <div className="view-all">
                        <Link to="/security" className="text-sm text-blue-600 hover:text-blue-800">
                            Voir toutes les activités
                        </Link>
                    </div>
                </div>
            </CardItem>

            {/* Notifications */}
            <CardItem
                title="Notifications"
                action={
                    <button className="mark-read-button">
                        Tout marquer comme lu
                    </button>
                }
            >
                {notifications.length > 0 ? (
                    <div className="notifications-list">
                        {notifications.slice(0, 3).map((notification) => (
                            <NotificationItem
                                key={notification.id}
                                title={notification.title}
                                message={notification.message}
                                date={notification.date}
                                read={notification.read}
                                type={notification.type}
                            />
                        ))}
                        <div className="view-all-notifications">
                            <Link to="/notifications">
                                Voir toutes les notifications
                            </Link>
                        </div>
                    </div>
                ) : (
                    <p>Aucune notification</p>
                )}
            </CardItem>
        </div>
    );
};



const QuickAccessItem = ({ to, icon, label, description, badge }) => {
    return (
        <Link to={to} className="quick-access-item">
            <div className="quick-access-icon-wrapper">
                <div className="quick-access-icon">
                    {icon}
                </div>
                {badge && (
                    <span className="quick-access-badge">
                        {badge}
                    </span>
                )}
            </div>
            <div className="quick-access-details">
                <span className="quick-access-label">{label}</span>
                <span className='quick-access-description'>
                    {description}
                </span>
            </div>
        </Link>
    );
};

const ActivityItem = ({ title, time, description, type }) => {
    const icons = {
        info: (
            <div className="activity-icon info">
                <User size={16} />
            </div>
        ),
        security: (
            <div className="activity-icon security">
                <Shield size={16} />
            </div>
        ),
        alert: (
            <div className="activity-icon alert">
                <AlertTriangle size={16} />
            </div>
        ),
    };

    return (
        <div className="activity-item">
            {icons[type]}
            <div className="activity-content">
                <div className="activity-header">
                    <p className="activity-title">{title}</p>
                    <span className="activity-time">{time}</span>
                </div>
                <p className="activity-description">{description}</p>
            </div>
        </div>
    );
};


const NotificationItem = ({ title, message, date, read, type }) => {
    const typeColors = {
        info: 'info',
        warning: 'warning',
        security: 'security',
        success: 'success',
    };

    return (
        <div className={`notification-item ${read ? 'read' : 'unread'}`}>
            {!read && <div className="notification-dot" />}
            <div className="notification-header">
                <p className={`notification-title ${typeColors[type]}`}>{title}</p>
                <span className="notification-date">
                    {new Date(date).toLocaleDateString()}
                </span>
            </div>
            <p className="notification-message">{message}</p>
        </div>
    );
};
