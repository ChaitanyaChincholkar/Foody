import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.brand}>
                    <h3>🍔 FoodApp</h3>
                    <p>Delivering happiness to your door.</p>
                </div>
                <div className={styles.links}>
                    <a href="#">About Us</a>
                    <a href="#">Contact</a>
                    <a href="#">Terms of Service</a>
                    <a href="#">Privacy Policy</a>
                </div>
            </div>
            <div className={styles.bottom}>
                <p>&copy; {new Date().getFullYear()} FoodApp. All rights reserved.</p>
            </div>
        </footer>
    );
}
