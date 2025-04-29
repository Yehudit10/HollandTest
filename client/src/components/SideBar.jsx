import React, { useState } from 'react';
import './SideBar.css';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [occupationsCount, setOccupationsCount] = useState(1); 
    const [studiesCount, setStudiesCount] = useState(2); 
    const [activeTag, setActiveTag] = useState(null);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const handleTagClick = (tag) => {
        setActiveTag(tag);
    };

    const clearActive = () => {
        if (activeTag === 'occupations') {
            setOccupationsCount(0);
        } else if (activeTag === 'studies') {
            setStudiesCount(0);
        }
        setActiveTag(null); 
    };

    return (
        <div className={`sidebar ${isOpen ? 'open' : ''}`}>
            <div className="sidebar-header" onClick={toggleSidebar}>
                <div className="header-text">
                    השוואות
                </div>
            </div>
            {isOpen && (
                <div className="sidebar-content">
                    <div className="top-links">
                        <button onClick={() => handleTagClick('studies')}>
                            לימודים ({studiesCount})
                        </button>
                        <button onClick={() => handleTagClick('occupations')}>
                            עיסוקים ({occupationsCount})
                        </button>
                    </div>
                    {((activeTag === 'occupations' && occupationsCount > 0) ||
                      (activeTag === 'studies' && studiesCount > 0)) && (
                        <button class="clear-button" onClick={clearActive}>לנקות</button>
                    )}
                </div>
            )}
        </div>
    );
};

export default Sidebar;