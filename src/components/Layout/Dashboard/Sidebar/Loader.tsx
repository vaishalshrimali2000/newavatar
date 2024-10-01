
import React from 'react';
import styles from './Loader.css'; // Import CSS module

const Loader = () => {
    return (
        <div className={styles.loader}>
            <div className={styles.spinner}></div>
        </div>
    );
};

export default Loader;
