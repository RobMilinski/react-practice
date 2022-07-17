import './App.css';
import {useState} from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useEffect } from 'react';

function App() {
  const [cityList, setCityList] = useState([{city:'Canberra', temp: -4, country: 'AU'}]);
  const [city, setCity] = useState('');
  
  useEffect(() => {
    const cityList = JSON.parse(localStorage.getItem('cityList'));
    if (cityList) {
      setCityList(cityList);
    }
  }, []);

  const onAddCity = () => {
    let app_key = '75523f4c2e67ef3ab67afe0d532a2795';
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
            </tr> 
            ))
        }
      </tbody>
    </Table>
    </div>
  );
}

export default App;
