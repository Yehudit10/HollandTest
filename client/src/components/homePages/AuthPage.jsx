import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './AuthPage.css'; 


const AuthPage = () => {
    

    return (
        <div className="home-page">
            <header className="home-header">
                <h1>עיסוקים ולימודים בהתאמה אישית<br />מצא את המסלול שלך</h1>
            </header>
            <main className="home-content">
                <section className="home-section">
                    <p>
                        גלה מגוון רחב של אפשרויות בתחום העיסוקים והלימודים.
                        <br />
                        ענה על שאלון הולנד וקבל המלצות אישיות שיעזרו לך לבחור את המסלול המתאים לך ביותר.
                    </p>
                   
                </section>
            </main>
            <footer className="home-footer">
                <section className="footer-section">
                    {/* <p >
                        <strong>אהבת את הדוגמה?</strong>
                        <br />
                        המשך לשאלון המלא וקבל את כל התוצאות
                    </p> */}
                    <Link to="/signup" className="register-button">הרשמה</Link>
                    <Link to="/login" className="register-button">התחברות</Link>
                </section>
            </footer>

        </div>
    );
};

export default AuthPage;