import React, { useContext, useState } from 'react';
import '../styles/Profile.scss';
import PageHeader from '../components/PageHeader';
import { user } from '../data/mockData';
import Button from '../components/ui/Button';
import { Camera, Save, UserCog, X } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../components/ui/Card';
import { formatDate } from '../lib/utils';
import Avatar from '../components/ui/Avatar';
import { AuthContext } from '../contexts/AuthContext';
import { defaultAvatar } from '../config';

export default function Profile() {
    const { userData } = useContext(AuthContext);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        country: userData.country,
    });

    const profileImage = userData?.profilURL || defaultAvatar;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // In a real app, would save to backend here
        setIsEditing(false);
    };

    const handleBack = () => {
        window.history.back();
    }
    return (
        <div className='profile'>
            <PageHeader
                onClick={handleBack}
                location={'Profil'}
                title={'Votre Profil'}
                description={"Gérez les informations sur vous et vos préférences dans les services AdsCity"}
            />

            <Button
                variant={isEditing ? "outline" : "primary"}
                icon={isEditing ? <X size={16} /> : <UserCog size={16} />}
                onClick={() => setIsEditing(!isEditing)}
            >
                {isEditing ? 'Cancel' : 'Edit Profile'}
            </Button>

            {/* Profile information card */}
            <Card>
                <CardHeader>
                    <CardTitle>Informations Personnelles</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="profile-form">
                        <div className="form-header">
                            <div className="avatar-wrapper">
                                <Avatar src={profileImage} name={userData.firstName + ' ' + userData.lastName} size="xl" />
                                {isEditing && (
                                    <div className="avatar-edit-icon">
                                        <label htmlFor="avatar-upload" className="avatar-upload-label">
                                            <Camera size={14} />
                                            <input
                                                type="file"
                                                id="avatar-upload"
                                                className="hidden-input"
                                                accept="image/*"
                                            />
                                        </label>
                                    </div>
                                )}
                            </div>

                            <div className="profile-meta">
                                <p className="meta-text">Member since {formatDate(user.createdAt)}</p>
                                <p className="meta-text">Last profile update: {formatDate(user.lastUpdated)}</p>
                            </div>
                        </div>

                        <div className="form-grid">
                            <div className="form-field">
                                <label htmlFor="name" className="field-label">Full Name</label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="field-input"
                                    />
                                ) : (
                                    <p className="field-value">{userData.firstName + ' ' + userData.lastName}</p>
                                )}
                            </div>

                            <div className="form-field">
                                <label htmlFor="email" className="field-label">Email Address</label>
                                {isEditing ? (
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="field-input"
                                    />
                                ) : (
                                    <p className="field-value">{userData.email}</p>
                                )}
                            </div>

                            <div className="form-field">
                                <label htmlFor="phone" className="field-label">Phone Number</label>
                                {isEditing ? (
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="field-input"
                                    />
                                ) : (
                                    <p className="field-value">{userData.phoneNumber}</p>
                                )}
                            </div>

                            <div className="form-field">
                                <label htmlFor="country" className="field-label">Country</label>
                                {isEditing ? (
                                    <select
                                        id="country"
                                        name="country"
                                        value={formData.country}
                                        onChange={handleChange}
                                        className="field-input"
                                    >
                                        <option value="United States">United States</option>
                                        <option value="Canada">Canada</option>
                                        <option value="United Kingdom">United Kingdom</option>
                                        <option value="Australia">Australia</option>
                                        <option value="Germany">Germany</option>
                                        <option value="France">France</option>
                                        <option value="Japan">Japan</option>
                                        <option value="China">China</option>
                                    </select>
                                ) : (
                                    <p className="field-value">{userData.country}</p>
                                )}
                            </div>
                        </div>

                        {isEditing && (
                            <div className="form-footer">
                                <Button type="submit" icon={<Save size={16} />}>
                                    Save Changes
                                </Button>
                            </div>
                        )}
                    </form>

                </CardContent>
            </Card>

            {/* Account activity timeline */}
            <Card className='activity-card'>
                <CardHeader>
                    <CardTitle>Account Activity</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="activity-timeline">
                        <div className="activity-item">
                            <div className="activity-icon-column">
                                <div className="activity-icon activity-icon--primary">
                                    <UserCog size={20} />
                                </div>
                                <div className="activity-line" />
                            </div>
                            <div className="activity-details">
                                <p className="activity-title">Profile updated</p>
                                <p className="activity-subtitle">You updated your profile information</p>
                                <p className="activity-date">{formatDate(user.lastUpdated)}</p>
                            </div>
                        </div>

                        <div className="activity-item">
                            <div className="activity-icon-column">
                                <div className="activity-icon activity-icon--success">
                                    <UserCog size={20} />
                                </div>
                                <div className="activity-line" />
                            </div>
                            <div className="activity-details">
                                <p className="activity-title">Account created</p>
                                <p className="activity-subtitle">Welcome to the platform!</p>
                                <p className="activity-date">{formatDate(user.createdAt)}</p>
                            </div>
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button variant="outline" size="sm">
                        View Full Activity Log
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
};
