import { Steps } from 'primereact/steps';
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './Step.css'; // Import the CSS file you created

const StepDemo = () => {
    const items = [
        { label: 'Step 1' },
        { label: 'Step 2' },
        { label: 'Step 3' }
    ];

    return <Steps model={[{label:'חלק ראשון'},{label:'חלק שני'},{label:'חלק שלישי'}]} />;
};

export default StepDemo;
