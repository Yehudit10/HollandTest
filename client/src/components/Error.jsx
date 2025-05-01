import { Card } from "primereact/card";
import { Message } from "primereact/message";

const Error=({error})=>{
    
    return (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '1rem' }}>
        <Card style={{ width: '100%', backgroundColor: '#fff8f8' }}>
          <Message style={{ width: '100%' }} severity="error" text={"error"} />
        </Card>
      </div>
      );
}
export default Error