import './App.css';
import AccordionDemo from './AccordionDemo';
import DismissibleToast from './DismissibleToast';
import FormDemo from './FormDemo';

function App2() {
  return (
    <div className="App">
        <AccordionDemo />
        <DismissibleToast />
        <FormDemo email='freddy@hotmail.com' password='bigbear'/>
    </div>
  );
}

export default App2;
