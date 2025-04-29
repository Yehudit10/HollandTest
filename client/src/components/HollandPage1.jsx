import { Link } from "react-router-dom"; // React Router for navigation
import './HollandPages.css';
import HollandInfoPage from "./HollandInfoPage";
import { Button } from 'primereact/button';

const HollandPage1 = (props) => {
  return (
    <div className="holland-container">
        <h1 style={{ fontSize: "2.5rem" }} >שאלון הולנד להכוונה מקצועית</h1>
        
        <p className="text-lg">
          השאלון יזהה את הטיפוס המקצועי שלך,
        </p>
        <p className="text-lg">
          ואז יציג עיסוקים מתאימים.
        </p>
        <div >
          <Link to="holland-info" className="holland-link">
            מהו שאלון הולנד?
          </Link>
        </div>
        <div className="time-container">
          <p >
            השאלון לוקח כ-10 דקות וכדאי לענות עליו לבד, בנחת ובתשומת לב.
          </p>
          <span className="pi pi-clock clock-icon"></span>
        </div>
        <Button className="custom-button" 
        onClick={props.nextPage}
        >איך זה עובד</Button>
    </div>
  );
};

export default HollandPage1;

