import './App.css';
import {useState} from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Modal from 'react-bootstrap/Modal';

function CityTemperature() {
  const [cityList, setCityList] = useState([]);
  const [city, setCity] = useState('');
  const [showDuplicateModal, setShowDuplicateModal] = useState(false);

  const onCloseModal = () => setShowDuplicateModal(false);

  const app_key = '75523f4c2e67ef3ab67afe0d532a2795';
  
  useEffect(() => {
    const cityList = JSON.parse(localStorage.getItem('cityList'));
    if (cityList) {
      setCityList(cityList);
      refreshAll(cityList);
    }
  }, []);

  const onAddCity = () => {
    const matchingCity = cityList.find(cityData => cityData.city === city);
    if (matchingCity) {
      setShowDuplicateModal(true);
      setCity('');
      return;
    }

    let url = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=metric&appid=' + app_key;

    fetch(url)
      .then(response => response.json())
      .then(result => {
        if (result.cod === 200) {
          const newCityList = [...cityList, {city: city, temp: result.main.temp, country: result.sys.country}]
          setCityList(newCityList);
          localStorage.setItem('cityList', JSON.stringify(newCityList));
          setCity('');
        }
      })
      .catch(e => console.log('Error in fetch: '+e));
  }
  const onCityChange = (event) => {
    setCity(event.target.value);
  }
  const deleteCity = (city) => {
    const newCityList = cityList.filter((item) => item.city !== city)
    setCityList(newCityList);
    localStorage.setItem('cityList', JSON.stringify(newCityList));
  }

  const refreshCity = (city) => {
    console.log('refreshCity '+city);
    let url = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=metric&appid=' + app_key;
    fetch(url)
      .then(response => response.json())
      .then(result => {
        if (result.cod === 200) {
          const cityData = cityList.filter((item) => item.city === city)
          cityData[0].temp = result.main.temp;
          setCityList([...cityList]);
          localStorage.setItem('cityList', JSON.stringify(cityList));
          console.log('New temperature for city '+city+' is '+result.main.temp);
        }
      })
      .catch(e => console.log('Error in fetch: '+e));
  }
  const refreshAll = (cl) => {
    console.log('refreshAll ',cl);
    cl.forEach((item) => {
      refreshCity(item.city)
    })
  }

  return (
    <div className="App">
      <h1>City Temperatures</h1>
      <hr />
      <InputGroup size="sm" className="mb-3">
        <InputGroup.Text id="inputGroup-sizing-sm">City</InputGroup.Text>
        <Form.Control
          placeholder='Enter City Name'
          value={city}
          onChange={onCityChange}
          aria-label="Small"
          aria-describedby="inputGroup-sizing-sm"
        />
        <Button onClick={onAddCity} variant="primary">Get City Temperature</Button>
      </InputGroup>
      
      <hr />
      <Table striped bordered hover>
      <thead>
        <tr>
          <th>City</th>
          <th>Temperature</th>
          <th>Country</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        { 
            cityList.map(cityData =>      
            (
            <tr key={cityData.city}>
              <td>{cityData.city}</td>
              <td>{cityData.temp}</td>
              <td>{cityData.country}</td>
              <td onClick={() => deleteCity(cityData.city)}>&#10060; Delete</td>
              <td onClick={() => refreshCity(cityData.city)}>Refresh</td>
            </tr> 
            ))
        }
      </tbody>
    </Table>

    <hr />
    <Modal show={showDuplicateModal} onHide={onCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Duplicate City Entered</Modal.Title>
        </Modal.Header>
        <Modal.Body>City already exists in list. Please enter a new city.</Modal.Body>
    </Modal>
    </div>
  );
}

export default CityTemperature;
