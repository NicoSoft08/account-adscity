import React, { useState } from 'react';
import PageHeader from '../components/PageHeader';
import Button from '../components/ui/Button';
import { FileText, HelpCircle, Inbox, LifeBuoy, MessageSquare, Plus, Search } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/Card';
import { formatDate } from '../lib/utils';
import Badge from '../components/ui/Badge';
import { supportTicketsData } from '../data/mockData';
import '../styles/HelpCenter.scss';

export default function HelpCenter() {
    const [showNewTicketForm, setShowNewTicketForm] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const filteredTickets = supportTicketsData.filter(ticket =>
        ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleBack = () => {
        window.history.back();
    }

    return (
        <div className='help-center'>
            <PageHeader
                onClick={handleBack}
                location={'Aide & Assistance'}
                title={'Aide & Assistance'}
                description={"Obtenez de l'aide et de l'assistance pour les problèmes que vous rencontrez sur les services AdsCity"}
            />

            <Button
                icon={<Plus size={16} />}
                onClick={() => setShowNewTicketForm(true)}
            >
                New Support Ticket
            </Button>

            {/* Quick help cards */}
            <div className="quick-help-grid">
                <QuickHelpCard
                    title="FAQs & Guides"
                    icon={<FileText size={24} className="quick-help-icon" />}
                    description="Find answers to common questions and helpful guides"
                />
                <QuickHelpCard
                    title="Contact Support"
                    icon={<MessageSquare size={24} className="quick-help-icon" />}
                    description="Get in touch with our support team"
                />
                <QuickHelpCard
                    title="Community Forums"
                    icon={<HelpCircle size={24} className="quick-help-icon" />}
                    description="Connect with other users and share solutions"
                />
            </div>

            {/* New ticket form */}
            {showNewTicketForm && (
                <Card>
                    <CardHeader>
                        <CardTitle className="flex-items-center">
                            <Plus size={18} className="mr-2" />
                            Create New Support Ticket
                        </CardTitle>
                        <CardDescription>Submit a new request to our support team</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form>
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                                        Subject
                                    </label>
                                    <input
                                        type="text"
                                        id="subject"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                                        placeholder="Brief description of your issue"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                                        Category
                                    </label>
                                    <select
                                        id="category"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                                    >
                                        <option value="">Select a category</option>
                                        <option value="Account Issues">Account Issues</option>
                                        <option value="Billing">Billing</option>
                                        <option value="Technical Issues">Technical Issues</option>
                                        <option value="Feature Request">Feature Request</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                                        Description
                                    </label>
                                    <textarea
                                        id="description"
                                        rows={5}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                                        placeholder="Please provide details about your issue or request"
                                    ></textarea>
                                </div>

                                <div>
                                    <label htmlFor="attachment" className="block text-sm font-medium text-gray-700 mb-1">
                                        Attachments (optional)
                                    </label>
                                    <div className="border-border-dashed border-gray-300 rounded-md p-4 text-center">
                                        <input
                                            type="file"
                                            id="attachment"
                                            className="hidden"
                                            multiple
                                            hidden
                                        />
                                        <label htmlFor="attachment" className="cursor-pointer text-sm text-gray-600">
                                            <span className="text-primary-600 font-medium">Click to upload</span> or drag and drop files here
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </CardContent>
                    <CardFooter className="flex-justify-end space-x-3">
                        <Button
                            variant="outline"
                            onClick={() => setShowNewTicketForm(false)}
                        >
                            Cancel
                        </Button>
                        <Button>Submit Ticket</Button>
                    </CardFooter>
                </Card>
            )}

            {/* Support tickets */}
            <Card className='support'>
                <CardHeader>
                    <div className="support-header">
                        <CardTitle className="support-title">
                            <Inbox size={18} className="support-title__icon" />
                            Your Support Tickets
                        </CardTitle>
                        <div className="support-search">
                            <Search className="support-search__icon" size={16} />
                            <input
                                type="text"
                                placeholder="Search tickets..."
                                className="support-search__input"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="support-content">
                    {filteredTickets.length > 0 ? (
                        <div className="support-list">
                            {filteredTickets.map(ticket => (
                                <div key={ticket.id} className="support-item">
                                    <div className="support-item__content">
                                        <div>
                                            <div className="__header">
                                                <p className="__subject">{ticket.subject}</p>
                                                <Badge
                                                    variant={
                                                        ticket.status === 'open'
                                                            ? 'primary'
                                                            : ticket.status === 'in_progress'
                                                                ? 'warning'
                                                                : 'success'
                                                    }
                                                    size="sm"
                                                    className={
                                                        ticket.status === 'open'
                                                            ? '__badge--open'
                                                            : ticket.status === 'in_progress'
                                                                ? '__badge--in-progress'
                                                                : '__badge--resolved'
                                                    }
                                                >
                                                    {ticket.status.replace('_', ' ')}
                                                </Badge>
                                            </div>
                                            <div className="__meta">
                                                <span>Ticket #{ticket.id.split('_')[1]}</span>
                                                <span>Category: {ticket.category}</span>
                                                <span>Created: {formatDate(ticket.date)}</span>
                                            </div>
                                            <p className="__update">
                                                Last updated {formatDate(ticket.lastUpdated)}
                                            </p>
                                        </div>
                                        <div className="support-item__actions">
                                            <Button variant="outline" size="sm">View Details</Button>
                                            {ticket.status !== 'closed' && (
                                                <Button variant="outline" size="sm">Close Ticket</Button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="support-empty">
                            <LifeBuoy size={40} className="support-empty__icon" />
                            <p className="support-empty__text">No support tickets found</p>
                            {searchQuery && (
                                <p className="support-empty__subtext">
                                    Try adjusting your search or create a new ticket
                                </p>
                            )}
                            <Button className="support-empty__button" onClick={() => setShowNewTicketForm(true)}>
                                Create New Ticket
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

const QuickHelpCard = ({ title, icon, description }) => {
    return (
        <Card className="quick-help-card">
            <CardContent className="quick-help-card__content">
                <div className="quick-help-card__inner">
                    <div className="quick-help-card__icon">{icon}</div>
                    <h3 className="quick-help-card__title">{title}</h3>
                    <p className="quick-help-card__description">{description}</p>
                    <Button variant="ghost" className="quick-help-card__button">View</Button>
                </div>
            </CardContent>
        </Card>
    );
};
