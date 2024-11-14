// Header.js
import React from 'react';

const Header = ({ user, onLogout }) => {
    return (
        <header style={styles.header}>
            <h1 style={styles.title}>MovieTrackr</h1>
            <div style={styles.userSection}>
                {user && (
                    <>
                        <img
                            src={user.avatarurl}
                            alt="User Avatar"
                            style={styles.avatar}
                        />
                        <button onClick={onLogout} style={styles.logoutButton}>
                            Logout
                        </button>
                    </>
                )}
            </div>
        </header>
    );
};

const styles = {
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px',
        backgroundColor: '#333',
        color: '#fff',
    },
    title: {
        fontSize: '1.5em',
    },
    userSection: {
        display: 'flex',
        alignItems: 'center',
    },
    avatar: {
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        marginRight: '10px',
    },
    logoutButton: {
        padding: '5px 10px',
        backgroundColor: '#ff4d4d',
        border: 'none',
        borderRadius: '5px',
        color: '#fff',
        cursor: 'pointer',
    },
};

export default Header;
