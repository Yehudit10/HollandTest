
import './HollandInfoPage.css';
import HollandType from './HollandType';
import { Link, useNavigate } from 'react-router-dom';
import { useGetTypesQuery } from '../../features/types/typeApiSlice';
import useGetFilePath from '../../hooks/useGetFilePath';
import Loading from '../generals/Loading';



const HollandInfoPage = () => {
  const {data:typesData,isLoading,isSuccess}=useGetTypesQuery()
  const {getFilePath}=useGetFilePath()
  const navigate=useNavigate()
  if(isLoading)
  return <Loading/>
  return (
    <div className="holland-info-page">
      <button onClick={() => navigate(-1)} className='back-link' style={{ background: 'none', border: 'none', }}>חזרה</button>
      <h1>שאלון הולנד להכוונה מקצועית</h1>
      <div>השאלון באתר הוא כלי שמסייע לזהות תחומי עניין ונטיות תעסוקתיות. השאלון אינו כלי אבחון ואינו מחליף שירותי ייעוץ מקצועיים לבחירת קריירה.</div>
      <h3>מהו שאלון הולנד (RIASEC)</h3>
      <div>שאלון שמסווג את המשיבים והמשיבות ל-6 טיפוסים לפי תחומי עניין ונטייה מקצועית.</div>
      <h3>למה בחרנו דווקא את שאלון הולנד</h3>
      <div>יש היום מגוון דרכים למצוא את הכיוון המקצועי שלך.
שאלון הולנד הוא הדרך הוותיקה והנפוצה מכולן לבירור נטיות תעסוקתיות, ומשתמשים בו כמעט בכל מכוני כוח האדם וההכוונה התעסוקתית.</div>
      <h3>ששת הטיפוסים של הולנד</h3>
      <div className="holland-types">
      {typesData?.data.map(({image,title,description})=>
      <HollandType image={getFilePath(image)} title={title} description={description} />
      )}
      </div>
    </div>
  );
};

export default HollandInfoPage