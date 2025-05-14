import React from 'react';
import '../styles/PageHeader.scss';
import { ChevronRight } from 'lucide-react';

export default function PageHeader({ title, description, location, onClick }) {
    return (
        <div className="page-header">
            <div className="page-header__breadcrumb">
                <div onClick={onClick}>Compte</div>
                <ChevronRight size={16} />
                <div className='location'> {location ? `${location}` : ''}</div> 
            </div>
            <div className="page-header__content">
                <h1 className="page-header__title">{title}</h1>
                {description && (
                    <p className="page-header__description">{description}</p>
                )}
            </div>
        </div>
    );
};
