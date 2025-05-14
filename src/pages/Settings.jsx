import React, { useState } from 'react';
import '../styles/Settings.scss';
import PageHeader from '../components/PageHeader';
import { user } from '../data/mockData';
import { Globe, Eye, Save, Bell } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import Button from '../components/ui/Button';

export default function Settings() {
    const [formData, setFormData] = useState({
        preferredLanguage: user.preferredLanguage,
        emailNotifications: user.emailNotifications,
        smsNotifications: user.smsNotifications,
        isProfilePublic: user.isProfilePublic,
        showPhoneNumber: user.showPhoneNumber,
    });

    const handleToggleChange = (e) => {
        const { name, checked } = e.target;
        setFormData(prev => ({ ...prev, [name]: checked }));
    };

    const handleSelectChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // In a real app, would save to backend here
        alert('Settings saved successfully!');
    };

    const handleBack = () => {
        window.history.back();
    }

    return (
        <div className='settings'>
            <PageHeader
                onClick={handleBack}
                location={'Paramètres'}
                title={'Paramètres de votre compte'}
                description={"Personnalisez votre expérience sur AdsCity"}
            />

            <form onSubmit={handleSubmit} className="settings-form">
                {/* Language preferences */}
                <Card className="settings-card">
                    <CardHeader>
                        <CardTitle className="card-title-icon">
                            <Globe size={18} className="icon-title" />
                            Language Preferences
                        </CardTitle>
                        <CardDescription>Choose your preferred language for the interface</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="form-group">
                            <label htmlFor="preferredLanguage" className="label">
                                Preferred Language
                            </label>
                            <select
                                id="preferredLanguage"
                                name="preferredLanguage"
                                value={formData.preferredLanguage}
                                onChange={handleSelectChange}
                                className="select-input"
                            >
                                <option value="English">English</option>
                                <option value="French">French</option>
                            </select>
                        </div>
                    </CardContent>
                </Card>

                {/* Notification settings */}
                <Card className="settings-card">
                    <CardHeader>
                        <CardTitle className="card-title-icon">
                            <Bell size={18} className="icon-title" />
                            Notification Settings
                        </CardTitle>
                        <CardDescription>Control how and when you receive notifications</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="toggle-group">
                            {[
                                {
                                    label: 'Email Notifications',
                                    desc: 'Receive notifications via email',
                                    name: 'emailNotifications',
                                    checked: formData.emailNotifications,
                                },
                                {
                                    label: 'SMS Notifications',
                                    desc: 'Receive notifications via SMS',
                                    name: 'smsNotifications',
                                    checked: formData.smsNotifications,
                                },
                            ].map((setting) => (
                                <div key={setting.name} className="toggle-item">
                                    <div>
                                        <p className="toggle-title">{setting.label}</p>
                                        <p className="toggle-desc">{setting.desc}</p>
                                    </div>
                                    <label className="switch">
                                        <input
                                            type="checkbox"
                                            name={setting.name}
                                            checked={setting.checked}
                                            onChange={handleToggleChange}
                                            className="sr-only"
                                        />
                                        <div className="switch-slider"></div>
                                    </label>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Privacy settings */}
                <Card className="settings-card">
                    <CardHeader>
                        <CardTitle className="card-title-icon">
                            <Eye size={18} className="icon-title" />
                            Privacy Settings
                        </CardTitle>
                        <CardDescription>Control your profile visibility and data sharing</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="toggle-group">
                            {[
                                {
                                    label: 'Public Profile',
                                    desc: 'Make your profile visible to others',
                                    name: 'isProfilePublic',
                                    checked: formData.isProfilePublic,
                                },
                                {
                                    label: 'Show Phone Number',
                                    desc: 'Allow others to see your phone number',
                                    name: 'showPhoneNumber',
                                    checked: formData.showPhoneNumber,
                                },
                            ].map((privacy) => (
                                <div key={privacy.name} className="toggle-item">
                                    <div>
                                        <p className="toggle-title">{privacy.label}</p>
                                        <p className="toggle-desc">{privacy.desc}</p>
                                    </div>
                                    <label className="switch">
                                        <input
                                            type="checkbox"
                                            name={privacy.name}
                                            checked={privacy.checked}
                                            onChange={handleToggleChange}
                                            className="sr-only"
                                        />
                                        <div className="switch-slider"></div>
                                    </label>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Danger zone */}
                <Card className="settings-card danger-zone">
                    <CardHeader>
                        <CardTitle className="text-danger">Danger Zone</CardTitle>
                        <CardDescription>Irreversible account actions</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="delete-box">
                            <h4 className="delete-title">Delete Account</h4>
                            <p className="delete-description">
                                Permanently delete your account and all associated data. This action cannot be undone.
                            </p>
                            <div className="delete-action">
                                <Button variant="danger">Delete Account</Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="form-footer">
                    <Button type="submit" icon={<Save size={16} />}>
                        Save Settings
                    </Button>
                </div>
            </form>

        </div>
    )
}
