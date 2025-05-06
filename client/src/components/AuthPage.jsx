import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './AuthPage.css'; // ייבוא קובץ CSS
// import DemoQuizModal from './DemoTest'; // ייבוא הקומפוננטה של המבחן הדמה

const AuthPage = () => {
    //const [quizVisible, setQuizVisible] = useState(false); // מצב האם הדיאלוג פתוח

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
                    {/* כפתור להופעת הדיאלוג */}
                    {//!quizVisible && (
                        // <button 
                        //     // onClick={
                        //     //     () => setQuizVisible(true)
                        //     // } 
                        //     className="demo-button"
                        // >
                        //     נסה את שאלון הדמה עכשיו!
                        // </button>
                    //)
                    }
                </section>
            </main>
            <footer className="home-footer">
                <section className="footer-section">
                    <p >
                        <strong>אהבת את הדוגמה?</strong>
                        <br />
                        המשך לשאלון המלא וקבל את כל התוצאות
                    </p>
                    <Link to="/signup" className="register-button">הרשמה</Link>
                    <Link to="/login" className="register-button">התחברות</Link>
                </section>
            </footer>

            {/* הצגת הדיאלוג אם הוא פתוח */}
            {/* {quizVisible && <DemoQuizModal setQuizVisible={setQuizVisible} />} */}
        </div>
    );
};

export default AuthPage;