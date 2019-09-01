import React from 'react';
import Titles from './components/titles';
import Weather from './components/weather';
import Form from './components/form';

const Api_Key = '63e972f7cd0cf8b994706c9aa3d1c971'  // this is mine
// const Api_Key = "8d2de98e089f1c28e1a22fc19a24ef04";

class App extends React.Component {
  // app-component
  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined
  }

  getWeather = async (e) => {


    // e or we should say props is able to grab elements like below from where it is called.
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;

    e.preventDefault(); // prevents constant refreshing
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${Api_Key}&units=imperial`);
    const response = await api_call.json();
    console.log(response);

    // initializing all the state variables
    if (city && country) {
      this.setState({
        temperature: response.main.temp,
        city: response.name,
        country: response.sys.country,
        humidity: response.main.humidity,
        description: response.weather[0].description,
        pressure: response.main.pressure,
        error: ""
      })
    } else {
      this.setState({
        error: "Please enter city and country"
      })
    }
  }
  render() {
    return (
      <div>
        <div className="wrapper">
          <div className="main">
            <div className="container">
              <div className="row">
                <div className="col-xs-7 form-container">
                  <Form loadWeather={this.getWeather} />
                  <Weather
                    temperature={this.state.temperature}
                    city={this.state.city}
                    country={this.state.country}
                    humidity={this.state.humidity}
                    description={this.state.description}
                    pressure = {this.state.pressure}
                    error={this.state.error}
                  />
                </div>
                <div className="col-xs-5 title-container">
                  <Titles />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
