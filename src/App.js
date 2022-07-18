import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import CityTemperature from './CityTemperature';
import FormDemo from './FormDemo';
import DismissibleToast from './DismissibleToast';
import AccordionDemo from './AccordionDemo';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container'

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}
function NotFound() {
  return (
    <div>
      <h2>Error: Not Found</h2>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Navbar bg="light" expand="md">
      <Container fluid>
        <Navbar.Brand href="#">Rob's React Practice</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link><Link to="/">Home</Link></Nav.Link>
            <Nav.Link><Link to="/citytemp">City Temperature</Link></Nav.Link>
            <Nav.Link><Link to="/dismissibletoast">Dismissible Toast</Link></Nav.Link>
            <Nav.Link><Link to="/formdemo">Form Demo</Link></Nav.Link>
            <Nav.Link><Link to="/accordiondemo">Accordion Demo</Link></Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
      </Navbar>
        <hr />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/citytemp">
            <CityTemperature />
          </Route>
          <Route path="/dismissibletoast">
            <DismissibleToast />
          </Route>
          <Route path="/formdemo">
            <FormDemo />
          </Route>
          <Route path="/accordiondemo">
            <AccordionDemo />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
    </Router>
  )
}

export default App;
