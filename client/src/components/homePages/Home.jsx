import React from 'react';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import useAuth from '../../hooks/useAuth';

import like from '../../images/like.svg';
import love from '../../images/love.svg';
import meh from '../../images/meh.svg';

const Home = () => {
  const { role } = useAuth();
  const navigate = useNavigate();

  const homepageContent = {
    user: {
      heroTitle: "מצא את הקריירה המתאימה לך",
      heroSubtitle: "גלה את הפוטנציאל המקצועי שלך בעזרת הכלים והמומחים שלנו.",
      cards: [
        {
          title: "מבחן הולנד",
          subtitle: "גלה את סוג האישיות התעסוקתית שלך",
          text: "מבחן אישיות מקצועית שיעזור לך להבין אילו תחומי עבודה מתאימים לך.",
          icon: like,
          buttonLabel: "בצע את המבחן",
          navigateTo: "holland"
        },
        {
          title: "ייעוץ עם יועצים",
          subtitle: "קבל הכוונה מקצועית מיועץ מומחה",
          text: "פגישות ייעוץ אישיות עם יועצים תעסוקתיים שיסייעו לך לקבל החלטות קריירה מושכלות.",
          icon: love,
          buttonLabel: "מצא יועץ",
          navigateTo: "userchat"
        },
        {
          title: "הצעות עבודה מתאימות",
          subtitle: "מצא את המשרה הבאה שלך",
          text: "מאגר משרות עדכני ומותאם אישית לפי תחומי העניין והכישורים שלך.",
          icon: meh,
          buttonLabel: "חפש משרות",
          navigateTo: "jobs"
        }
      ]
    },
    admin: {
      heroTitle: "סקירה כללית",
      heroSubtitle: "סקירה וניהול של נתוני האתר והמשתמשים",
      cards: [
        {
          title: "סטטיסטיקות האתר",
          subtitle: "סקירה כללית של נתוני האתר",
          text: "הצג נתונים מרכזיים על פעילות המשתמשים, משרות חדשות, ועוד.",
          icon: like,
          buttonLabel: "צפה בסטטיסטיקות",
          navigateTo: "statistics"
        },
        {
          title: "ניהול משתמשים",
          subtitle: "צפייה במשתמשי האתר",
          text: "גש לרשימת כל המשתמשים הרשומים",
          icon: love,
          buttonLabel: "נהל משתמשים",
          navigateTo: "users"
        },
        {
          title: "ניהול משרות",
          subtitle: "הוספה, עריכה וניהול של הצעות עבודה",
          text: "עיין במשרות, הוסף וערוך פרטים קיימים.",
          icon: meh,
          buttonLabel: "נהל משרות",
          navigateTo: "viewjobs"
        }
      ]
    },
    counselor: {
      heroTitle: "שלום יועץ/ת 👋",
      heroSubtitle: "ברגע שמשתמש יבחר אותך לייעוץ – תתחיל השיחה באופן אוטומטי.",
      cards: [
        {
          title: "מעבר לצ'אט ייעוץ",
          subtitle: "התחל שיחה עם משתמשים",
          text: "כשתיבחר, תועבר אוטומטית לשיחה.",
          icon: like,
          buttonLabel: "לצ'אט",
          navigateTo: "counselorchat"
        }
      ]
    }
  };

  const content = homepageContent[role];

  return (
    <div className="homepage-container">
      <div className="homepage-hero-content">
        <h1 className="homepage-hero-title">
          {content.heroTitle}
          <span className="homepage-hero-subtitle">{content.heroSubtitle}</span>
        </h1>
      </div>

      <Divider />

      <section className="homepage-tools-section">
        <div className="homepage-tools-grid">
          {content.cards.map((card, idx) => (
            <Card key={idx} title={card.title} subTitle={card.subtitle} className="homepage-tool-card">
              <img src={card.icon} alt="אייקון" height="40" />
              <p>{card.text}</p>
              <Button
                label={card.buttonLabel}
                className="p-button-info homepage-button"
                onClick={() => navigate(card.navigateTo)}
              />
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;