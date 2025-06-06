import { CreditCard, HelpCircle, Home, LayoutDashboard, Settings, Shield, ShieldAlert, Store, User } from 'lucide-react';

const adminURL = process.env.REACT_APP_ADMIN_URL;
const dashboardURL = process.env.REACT_APP_DASHBOARD_URL;


export const textBlueWithoutBg = require('../assets/icons/blue-no-bg.png');
export const letterWhiteBgBlue = require('../assets/icons/logo-letter-bg.png');
export const letterBlueBgWhite = require('../assets/icons/logo-letter-light.png');
export const textWhiteBgBlue = require('../assets/icons/logo-text-bg.png');
export const textBlueBgWhite = require('../assets/icons/logo-text-light.png');
export const textWhiteWithoutBg = require('../assets/icons/white-no-bg.png');

export const Icon404 = require('../imgs/404.png');
export const defaultAvatar = require('../imgs/default-avatar.png');


export const countries = [
    // {
    //     name: "Côte d'Ivoire",
    //     code: "CI",
    //     dialCode: "+255",
    //     flag: require("../assets/flags/ci.png")
    // },
    // {
    //     name: "France",
    //     code: "FR",
    //     dialCode: "+33",
    //     flag: require("../assets/flags/fr.png")
    // },
    {
        name: "Russie",
        code: "RU",
        dialCode: "+7",
        flag: require("../assets/flags/ru.png")
    }
];

export const navItems = (userRole) => {
    const baseItems = [
        {
            path: '/',
            icon: <Home size={20} />,
            label: 'Accueil',
            description: 'Gérez vos informations, ainsi que la confidentialité et la sécurité de vos données pour profiter au mieux des services AdsCity'
        },
        {
            path: '/profile',
            icon: <User className='text-blue' size={20} />,
            label: 'Profile',
            description: 'Infos sur vous et vos préférences dans les services AdsCity'
        },
        {
            path: '/security',
            icon: <Shield className='text-emerald' size={20} />,
            label: 'Sécurité',
            description: 'Paramètres et recommandations pour vous aider à protéger votre compte'
        },
        {
            path: '/settings',
            icon: <Settings className='text-gray' size={20} />,
            label: 'Paramètres',
            description: 'Personnalisez votre expérience sur AdsCity'
        },
        {
            path: '/payments-and-subscriptions',
            icon: <CreditCard className='text-purple' size={20} />,
            label: 'Paiements et abonnements',
            description: 'Vos informations de paiement, vos transactions, vos paiements récurrents et vos réservations'
        },
        {
            path: '/security-center',
            icon: <ShieldAlert className='text-amber' size={20} />,
            label: 'Centre de Sécurité',
            description: 'Surveillez les activités suspectes et protégez votre compte'
        },
        {
            path: '/help',
            icon: <HelpCircle className='text-red' size={20} />,
            label: 'Aide',
            description: 'Obtenez de l\'aide et suivez vos demandes de support'
        }
    ];

    // Ajouter la boutique selon le rôle
    if (userRole === 'admin') {
        baseItems.splice(6, 0, {
            path: `${adminURL}`,
            icon: <LayoutDashboard className='text-blue' size={20} />,
            label: 'Tableau de bord',
            description: 'Accédez à l\'interface d\'administration pour gérer les utilisateurs, les produits et les transactions.'
        });
    } else if (userRole === 'user') {
        baseItems.splice(6, 0, {
            path: `${dashboardURL}`,
            icon: <Store className='text-blue' size={20} />,
            label: 'Boutique',
            description: 'Gérez votre boutique et vos produits sur AdsCity'
        });
    }

    return baseItems;
};