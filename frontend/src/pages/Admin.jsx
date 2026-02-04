import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Admin = () => {
    const { logout } = useAuth();
    const [items, setItems] = useState([]);
    const [messages, setMessages] = useState([]);
    const [newItem, setNewItem] = useState({ title: '', description: '', type: 'service' });
    const [editingId, setEditingId] = useState(null);

    const [activeTab, setActiveTab] = useState('dashboard');
    const [generalInfo, setGeneralInfo] = useState({ company: {}, contact: {} }); // Initialize empty to avoid undefined access

    useEffect(() => {
        fetchItems();
        fetchMessages();
        fetchGeneralInfo();
    }, []);

    const fetchMessages = async () => {
        try {
            const res = await fetch('/api/messages');
            if (res.ok) {
                const data = await res.json();
                setMessages(data);
            }
        } catch (err) {
            console.error("Failed to fetch messages", err);
        }
    };

    const fetchGeneralInfo = async () => {
        try {
            const res = await fetch('/api/general');
            if (res.ok) {
                const data = await res.json();
                setGeneralInfo(data);
            }
        } catch (err) {
            console.error("Failed to fetch general info", err);
        }
    };

    const fetchItems = async () => {
        try {
            const res = await fetch('/api/items');
            if (res.ok) {
                const data = await res.json();
                setItems(data);
            }
        } catch (err) {
            console.error("Failed to fetch items", err);
        }
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setEditingId(null);
        // Set default type based on tab
        let defaultType = 'service';
        if (tab === 'products') defaultType = 'product';
        if (tab === 'projects') defaultType = 'project';
        setNewItem({ title: '', description: '', type: defaultType });
    };

    const handleGeneralUpdate = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/general', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(generalInfo),
            });
            if (res.ok) {
                alert('Information updated successfully');
                fetchGeneralInfo();
            }
        } catch (err) {
            console.error("Failed to update info", err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newItem.title || !newItem.description) return;

        try {
            const url = editingId ? `/api/items/${editingId}` : '/api/items';
            const method = editingId ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newItem),
            });

            if (res.ok) {
                // Keep the type consistent with the current tab after save
                let defaultType = newItem.type;
                if (activeTab === 'solutions') defaultType = 'service';
                if (activeTab === 'products') defaultType = 'product';
                if (activeTab === 'projects') defaultType = 'project';

                setNewItem({ title: '', description: '', type: defaultType });
                setEditingId(null);
                fetchItems();
            }
        } catch (err) {
            console.error("Failed to save item", err);
        }
    };

    const handleEdit = (item) => {
        setNewItem({ title: item.title, description: item.description, type: item.type });
        setEditingId(item.id);

        // Switch to the correct tab if not already there (though usually we are)
        if (item.type === 'service') setActiveTab('solutions');
        else if (item.type === 'product') setActiveTab('products');
        else if (item.type === 'project') setActiveTab('projects');

        window.scrollTo(0, 0);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this item?')) return;
        try {
            await fetch(`/api/items/${id}`, { method: 'DELETE' });
            fetchItems();
        } catch (err) {
            console.error("Failed to delete item", err);
        }
    };

    const renderSection = (title, type, items) => {
        const filteredItems = items.filter(i => i.type === type);
        return (
            <div className="section-block">
                <h3 style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>{title}</h3>
                <div className="grid">
                    {filteredItems.length === 0 ? <p style={{ color: '#666' }}>No items found.</p> : filteredItems.map(item => (
                        <div key={item.id} className="card">
                            <h3>{item.title}</h3>
                            <p>{item.description}</p>
                            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                                <button
                                    onClick={() => handleEdit(item)}
                                    style={{
                                        background: 'none',
                                        border: '1px solid var(--accent-color)',
                                        color: 'var(--accent-color)',
                                        padding: '0.5rem 1rem',
                                        borderRadius: '2rem',
                                        cursor: 'pointer',
                                        fontSize: '0.8rem'
                                    }}
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(item.id)}
                                    style={{
                                        background: 'none',
                                        border: '1px solid #ff4d4d',
                                        color: '#ff4d4d',
                                        padding: '0.5rem 1rem',
                                        borderRadius: '2rem',
                                        cursor: 'pointer',
                                        fontSize: '0.8rem'
                                    }}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const getPageTitle = () => {
        switch (activeTab) {
            case 'dashboard': return 'Dashboard';
            case 'solutions': return 'Manage Solutions';
            case 'products': return 'Manage Products';
            case 'projects': return 'Manage Projects';
            case 'company': return 'Company Info';
            case 'contact': return 'Contact Details';
            case 'messages': return 'Messages';
            case 'footer': return 'Footer Content';
            case 'pages': return 'Page Content';
            default: return 'Content Management';
        }
    };

    return (
        <div className="admin-container">
            <aside className="sidebar">
                <h2>Techmedia Admin</h2>
                <nav>
                    <ul>
                        <li
                            onClick={() => handleTabChange('dashboard')}
                            style={{ color: activeTab === 'dashboard' ? 'var(--accent-color)' : 'inherit' }}
                        >
                            Dashboard
                        </li>
                        <li
                            onClick={() => handleTabChange('solutions')}
                            style={{ color: activeTab === 'solutions' ? 'var(--accent-color)' : 'inherit' }}
                        >
                            Solutions
                        </li>
                        <li
                            onClick={() => handleTabChange('products')}
                            style={{ color: activeTab === 'products' ? 'var(--accent-color)' : 'inherit' }}
                        >
                            Products
                        </li>
                        <li
                            onClick={() => handleTabChange('projects')}
                            style={{ color: activeTab === 'projects' ? 'var(--accent-color)' : 'inherit' }}
                        >
                            Projects
                        </li>
                        <li
                            onClick={() => handleTabChange('company')}
                            style={{ color: activeTab === 'company' ? 'var(--accent-color)' : 'inherit' }}
                        >
                            Company
                        </li>
                        <li
                            onClick={() => handleTabChange('contact')}
                            style={{ color: activeTab === 'contact' ? 'var(--accent-color)' : 'inherit' }}
                        >
                            Contact
                        </li>
                        <li
                            onClick={() => handleTabChange('messages')}
                            style={{ color: activeTab === 'messages' ? 'var(--accent-color)' : 'inherit' }}
                        >
                            Messages
                        </li>
                        <li
                            onClick={() => handleTabChange('footer')}
                            style={{ color: activeTab === 'footer' ? 'var(--accent-color)' : 'inherit' }}
                        >
                            Footer
                        </li>
                        <li
                            onClick={() => handleTabChange('pages')}
                            style={{ color: activeTab === 'pages' ? 'var(--accent-color)' : 'inherit' }}
                        >
                            Page Content
                        </li>
                        <div style={{ margin: '1rem 0', borderTop: '1px solid rgba(255,255,255,0.1)' }}></div>
                        <li onClick={logout}>Logout</li>
                        <li><Link to="/">View Live Site</Link></li>
                    </ul>
                </nav>
            </aside>
            <main className="content">
                <header>
                    <h1>{getPageTitle()}</h1>
                    <div className="user-profile">Admin</div>
                </header>

                <div className="content-management">
                    {/* Dashboard View */}
                    {activeTab === 'dashboard' && (
                        <div className="dashboard-view">
                            <div className="add-item-form" style={{ marginBottom: '2rem' }}>
                                <h3>Edit Home Page Content</h3>
                                <form onSubmit={handleGeneralUpdate}>
                                    <div className="form-group">
                                        <label>Hero Title</label>
                                        <input
                                            value={generalInfo.home?.heroTitle || ''}
                                            onChange={(e) => setGeneralInfo({ ...generalInfo, home: { ...generalInfo.home, heroTitle: e.target.value } })}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Hero Subtitle</label>
                                        <textarea
                                            value={generalInfo.home?.heroSubtitle || ''}
                                            onChange={(e) => setGeneralInfo({ ...generalInfo, home: { ...generalInfo.home, heroSubtitle: e.target.value } })}
                                            rows="2"
                                        />
                                    </div>
                                    <button type="submit" className="btn">Save Home Page</button>
                                </form>
                            </div>

                            <div className="dashboard-stats" style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2rem' }}>
                                <h4 style={{ marginBottom: '1rem', color: '#888' }}>Overview</h4>
                                <div className="grid">
                                    <div className="card">
                                        <h3>Total Services</h3>
                                        <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{items.filter(i => i.type === 'service').length}</p>
                                    </div>
                                    <div className="card">
                                        <h3>Total Products</h3>
                                        <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{items.filter(i => i.type === 'product').length}</p>
                                    </div>
                                    <div className="card">
                                        <h3>Total Projects</h3>
                                        <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{items.filter(i => i.type === 'project').length}</p>
                                    </div>
                                    <div className="card">
                                        <h3>Messages</h3>
                                        <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{messages.length}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Company Info Form */}
                    {activeTab === 'company' && (
                        <div className="add-item-form">
                            <h3>Edit Company Information</h3>
                            <form onSubmit={handleGeneralUpdate}>
                                <div className="form-group">
                                    <label>Mission Statement</label>
                                    <textarea
                                        value={generalInfo.company?.mission || ''}
                                        onChange={(e) => setGeneralInfo({
                                            ...generalInfo,
                                            company: { ...generalInfo.company, mission: e.target.value }
                                        })}
                                        rows="3"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Vision Statement</label>
                                    <textarea
                                        value={generalInfo.company?.vision || ''}
                                        onChange={(e) => setGeneralInfo({
                                            ...generalInfo,
                                            company: { ...generalInfo.company, vision: e.target.value }
                                        })}
                                        rows="3"
                                    />
                                </div>
                                <button type="submit" className="btn">Save Company Info</button>
                            </form>
                        </div>
                    )}

                    {/* Contact Info Form */}
                    {activeTab === 'contact' && (
                        <div className="add-item-form">
                            <h3>Edit Contact Details</h3>
                            <form onSubmit={handleGeneralUpdate}>
                                <div className="form-group">
                                    <label>Address Line 1</label>
                                    <input
                                        value={generalInfo.contact?.addressLine1 || ''}
                                        onChange={(e) => setGeneralInfo({
                                            ...generalInfo,
                                            contact: { ...generalInfo.contact, addressLine1: e.target.value }
                                        })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Address Line 2 (City, State, Zip)</label>
                                    <input
                                        value={generalInfo.contact?.addressLine2 || ''}
                                        onChange={(e) => setGeneralInfo({
                                            ...generalInfo,
                                            contact: { ...generalInfo.contact, addressLine2: e.target.value }
                                        })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Email Address</label>
                                    <input
                                        value={generalInfo.contact?.email || ''}
                                        onChange={(e) => setGeneralInfo({
                                            ...generalInfo,
                                            contact: { ...generalInfo.contact, email: e.target.value }
                                        })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Phone Number</label>
                                    <input
                                        value={generalInfo.contact?.phone || ''}
                                        onChange={(e) => setGeneralInfo({
                                            ...generalInfo,
                                            contact: { ...generalInfo.contact, phone: e.target.value }
                                        })}
                                    />
                                </div>
                                <button type="submit" className="btn">Save Contact Info</button>
                            </form>
                        </div>
                    )}

                    {/* Page Content Form */}
                    {activeTab === 'pages' && (
                        <div className="add-item-form">
                            <h3>Edit Page Content</h3>
                            <form onSubmit={handleGeneralUpdate}>
                                {/* Home Section Removed - Moved to Dashboard */}

                                {/* Solutions Section */}
                                <h4 style={{ color: 'var(--accent-color)', marginTop: '2rem' }}>Solutions Page</h4>
                                <div className="form-group">
                                    <label>Hero Title</label>
                                    <input
                                        value={generalInfo.solutions?.heroTitle || ''}
                                        onChange={(e) => setGeneralInfo({ ...generalInfo, solutions: { ...generalInfo.solutions, heroTitle: e.target.value } })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Hero Subtitle</label>
                                    <input
                                        value={generalInfo.solutions?.heroSubtitle || ''}
                                        onChange={(e) => setGeneralInfo({ ...generalInfo, solutions: { ...generalInfo.solutions, heroSubtitle: e.target.value } })}
                                    />
                                </div>

                                {/* Products Section */}
                                <h4 style={{ color: 'var(--accent-color)', marginTop: '2rem' }}>Products Page</h4>
                                <div className="form-group">
                                    <label>Hero Title</label>
                                    <input
                                        value={generalInfo.products?.heroTitle || ''}
                                        onChange={(e) => setGeneralInfo({ ...generalInfo, products: { ...generalInfo.products, heroTitle: e.target.value } })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Hero Subtitle</label>
                                    <input
                                        value={generalInfo.products?.heroSubtitle || ''}
                                        onChange={(e) => setGeneralInfo({ ...generalInfo, products: { ...generalInfo.products, heroSubtitle: e.target.value } })}
                                    />
                                </div>

                                {/* Insights Section */}
                                <h4 style={{ color: 'var(--accent-color)', marginTop: '2rem' }}>Insights Page</h4>
                                <div className="form-group">
                                    <label>Hero Title</label>
                                    <input
                                        value={generalInfo.insights?.heroTitle || ''}
                                        onChange={(e) => setGeneralInfo({ ...generalInfo, insights: { ...generalInfo.insights, heroTitle: e.target.value } })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Hero Subtitle</label>
                                    <input
                                        value={generalInfo.insights?.heroSubtitle || ''}
                                        onChange={(e) => setGeneralInfo({ ...generalInfo, insights: { ...generalInfo.insights, heroSubtitle: e.target.value } })}
                                    />
                                </div>

                                <button type="submit" className="btn" style={{ marginTop: '2rem' }}>Save Page Content</button>
                            </form>
                        </div>
                    )}

                    {/* Messages View */}
                    {activeTab === 'messages' && (
                        <div className="section-block">
                            <div className="grid" style={{ gridTemplateColumns: '1fr' }}>
                                {messages.length === 0 ? <p style={{ color: '#666' }}>No messages found.</p> : messages.map(msg => (
                                    <div key={msg.id} className="card" style={{ marginBottom: '1rem' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                            <h3 style={{ fontSize: '1.2rem' }}>{msg.name}</h3>
                                            <span style={{ fontSize: '0.9rem', color: '#666' }}>{new Date(msg.date).toLocaleString()}</span>
                                        </div>
                                        <p style={{ fontSize: '0.9rem', color: 'var(--accent-color)', marginBottom: '0.5rem' }}>{msg.email}</p>
                                        <p style={{ color: '#ccc', whiteSpace: 'pre-wrap' }}>{msg.message}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Footer Content Form */}
                    {activeTab === 'footer' && (
                        <div className="add-item-form">
                            <h3>Edit Footer Content</h3>
                            <form onSubmit={handleGeneralUpdate}>
                                <div className="form-group">
                                    <label>Company Description (Below Logo)</label>
                                    <textarea
                                        value={generalInfo.footer?.description || ''}
                                        onChange={(e) => setGeneralInfo({ ...generalInfo, footer: { ...generalInfo.footer, description: e.target.value } })}
                                        rows="3"
                                    />
                                </div>
                                <h4 style={{ color: 'var(--accent-color)', marginTop: '2rem', marginBottom: '1rem' }}>Social Media Links</h4>
                                <div className="form-group">
                                    <label>Facebook URL</label>
                                    <input
                                        value={generalInfo.footer?.socialLinks?.facebook || ''}
                                        onChange={(e) => setGeneralInfo({ ...generalInfo, footer: { ...generalInfo.footer, socialLinks: { ...generalInfo.footer.socialLinks, facebook: e.target.value } } })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Instagram URL</label>
                                    <input
                                        value={generalInfo.footer?.socialLinks?.instagram || ''}
                                        onChange={(e) => setGeneralInfo({ ...generalInfo, footer: { ...generalInfo.footer, socialLinks: { ...generalInfo.footer.socialLinks, instagram: e.target.value } } })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>LinkedIn URL</label>
                                    <input
                                        value={generalInfo.footer?.socialLinks?.linkedin || ''}
                                        onChange={(e) => setGeneralInfo({ ...generalInfo, footer: { ...generalInfo.footer, socialLinks: { ...generalInfo.footer.socialLinks, linkedin: e.target.value } } })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Twitter URL</label>
                                    <input
                                        value={generalInfo.footer?.socialLinks?.twitter || ''}
                                        onChange={(e) => setGeneralInfo({ ...generalInfo, footer: { ...generalInfo.footer, socialLinks: { ...generalInfo.footer.socialLinks, twitter: e.target.value } } })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>GitHub URL</label>
                                    <input
                                        value={generalInfo.footer?.socialLinks?.github || ''}
                                        onChange={(e) => setGeneralInfo({ ...generalInfo, footer: { ...generalInfo.footer, socialLinks: { ...generalInfo.footer.socialLinks, github: e.target.value } } })}
                                    />
                                </div>

                                <button type="submit" className="btn" style={{ marginTop: '2rem' }}>Save Footer Content</button>
                            </form>
                        </div>
                    )}

                    {/* Management Views */}
                    {['solutions', 'products', 'projects'].includes(activeTab) && (
                        <>
                            {/* Form Section */}
                            <div className="add-item-form" style={{ marginBottom: '3rem' }}>
                                <h3>{editingId ? 'Edit Content' : 'Add New Content'}</h3>
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label>Content Type</label>
                                        <select
                                            value={newItem.type}
                                            disabled={true} // Lock type based on section
                                            style={{ opacity: 0.7, cursor: 'not-allowed' }}
                                        >
                                            <option value="service">Service / Capability</option>
                                            <option value="project">Case Study / Project</option>
                                            <option value="product">Product</option>
                                        </select>
                                        <p style={{ fontSize: '0.8rem', color: '#666', marginTop: '0.25rem' }}>
                                            Type is locked to the current section.
                                        </p>
                                    </div>
                                    <div className="form-group">
                                        <label>Title</label>
                                        <input
                                            value={newItem.title}
                                            onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                                            placeholder="Enter title..."
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Description</label>
                                        <textarea
                                            value={newItem.description}
                                            onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                                            placeholder="Enter description..."
                                            rows="4"
                                        />
                                    </div>
                                    <div style={{ display: 'flex', gap: '1rem' }}>
                                        <button type="submit" className="btn">{editingId ? 'Update Content' : 'Add Content'}</button>
                                        {editingId && (
                                            <button
                                                type="button"
                                                className="btn"
                                                style={{ background: '#333' }}
                                                onClick={() => {
                                                    setEditingId(null);
                                                    setNewItem({
                                                        title: '',
                                                        description: '',
                                                        type: activeTab === 'solutions' ? 'service' :
                                                            activeTab === 'products' ? 'product' : 'project'
                                                    });
                                                }}
                                            >
                                                Cancel
                                            </button>
                                        )}
                                    </div>
                                </form>
                            </div>

                            {/* List Section */}
                            <div className="items-list">
                                {activeTab === 'solutions' && renderSection('Current Solutions', 'service', items)}
                                {activeTab === 'products' && renderSection('Current Products', 'product', items)}
                                {activeTab === 'projects' && renderSection('Current Projects', 'project', items)}
                            </div>
                        </>
                    )}
                </div>
            </main>
        </div>
    );
};

export default Admin;
