import React from 'react';
import DayCard from './card';
import Form from './form'
import { readdir } from 'fs';



const Api_Key = '63e972f7cd0cf8b994706c9aa3d1c971'  // this is mine

class WeekContainer extends React.Component {
  state = {
    city: undefined,
    days5: undefined,
    error: undefined
  }
  getWeather = async (e) => {
    // e or we should say props is able to grab elements like below from where it is called.
    const zip = e.target.elements.zip.value;

    e.preventDefault(); // prevents constant refreshing
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/forecast?zip=${zip}&units=imperial&APPID=${Api_Key}`);

    const response = await api_call.json();


    // WE GET 40 data for 5 days. I am grabbing for midday
    const dailyData = response.list.filter(reading => {
      return reading.dt_txt.includes("00:00:00")
    }
    )

    if (zip) {
      this.setState({
        city: response.city.name,
        days5: dailyData,
        error: ""
      })
    } else {
      this.setState({
        error: "Please enter Zip"
      })
    }
  }
  render() {
    return (
      <div className="container">
        <h1 className="display-1">5-Day Forecast.</h1>
        <p id="bhuwan"> -By Bhuwan Sapkota</p>
        <Form loadWeather={this.getWeather} />
        <h5 className="display-1 text-muted">{this.state.city}</h5>
        <div className="row justify-content-center">
          {/* // display only when we have a data */}
          {this.state.days5 && this.state.days5.map((reading, index) => <DayCard reading={reading} key={index} />)}
        </div>
      </div>
    )
  }
}

export default WeekContainer;