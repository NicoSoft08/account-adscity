import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AccountLayout from './layouts/AccountLayout';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Security from './pages/Security';
import Settings from './pages/Settings';
import Subscriptions from './pages/Subscriptions';
import SecurityCenter from './pages/SecurityCenter';
import HelpCenter from './pages/HelpCenter';
import NotFound from './pages/NotFound';

export default function AppRouter() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<AccountLayout />}>
                    <Route index element={<Dashboard />} />
                    <Route path='profile' element={<Profile />} />
                    <Route path="security" element={<Security />} />
                    <Route path="settings" element={<Settings />} />
                    <Route path="payments-and-subscriptions" element={<Subscriptions />} />
                    <Route path="security-center" element={<SecurityCenter />} />
                    <Route path="help" element={<HelpCenter />} />
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </Router>
    );
};
