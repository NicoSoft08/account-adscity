import React, { useState } from 'react'
import PageHeader from '../components/PageHeader';
import '../styles/Security.scss';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import { CheckCircle, Key, Smartphone, XCircle } from 'lucide-react';
import { user } from '../data/mockData';
import Button from '../components/ui/Button';

export default function Security() {
    const [showChangePassword, setShowChangePassword] = useState(false);
    const [twoFactorEnabled, setTwoFactorEnabled] = useState(user.twoFactorEnabled);

    const handleBack = () => {
        window.history.back();
    }

    const handleSubmit = async () => { }

    return (
        <div className='security'>
            <PageHeader
                onClick={handleBack}
                location={'Sécurité'}
                title={'Vos paramètres de sécurité'}
                description={"Gérez les paramètres et recommandations pour vous aider à protéger votre compte"}
            />

            {/* Password section */}
            <Card>
                <CardHeader>
                    <CardTitle className='two-factor__header'>
                        <Key size={18} />
                        Mot de passe
                    </CardTitle>
                    <CardDescription>
                        Sécurisez votre compte avec un mot de passe fort.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {!showChangePassword ? (
                        <div className="change-password__status">
                            <p>Last changed 3 months ago</p>
                            <Button
                                onClick={() => setShowChangePassword(true)}
                                variant="outline"
                            >
                                Change Password
                            </Button>
                        </div>
                    ) : (
                        <form className="change-password__form" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="current-password">Current Password</label>
                                <input type="password" id="current-password" autoComplete="current-password" />
                            </div>

                            <div>
                                <label htmlFor="new-password">New Password</label>
                                <input type="password" id="new-password" autoComplete="new-password" />
                            </div>

                            <div>
                                <label htmlFor="confirm-password">Confirm New Password</label>
                                <input type="password" id="confirm-password" autoComplete="new-password" />
                            </div>

                            <div className="change-password__form-actions">
                                <Button type="submit">Save Changes</Button>
                                <Button type="button" variant="outline" onClick={() => setShowChangePassword(false)}>
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    )}
                </CardContent>
            </Card>

            {/* Two-factor authentication */}
            <Card>
                <CardHeader>
                    <CardTitle className="two-factor__header">
                        <Smartphone size={18} />
                        Two-Factor Authentication
                    </CardTitle>
                    <CardDescription>Add an extra layer of security to your account</CardDescription>
                </CardHeader>

                <CardContent>
                    <div className="two-factor__status-container">
                        <div className="two-factor__status">
                            <div className="two-factor__status-icon">
                                {twoFactorEnabled ? (
                                    <CheckCircle className="enabled" />
                                ) : (
                                    <XCircle className="disabled" />
                                )}
                            </div>
                            <div className="two-factor__status-text">
                                <p>{twoFactorEnabled ? 'Enabled' : 'Disabled'}</p>
                                <p>
                                    {twoFactorEnabled
                                        ? 'Your account is protected with two-factor authentication'
                                        : 'Enable two-factor authentication for additional security'}
                                </p>
                            </div>
                        </div>

                        <Button
                            variant={twoFactorEnabled ? 'outline' : 'primary'}
                            onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                        >
                            {twoFactorEnabled ? 'Disable' : 'Enable'}
                        </Button>
                    </div>
                </CardContent>
            </Card>

        </div>
    )
}
