import React, { Component } from 'react';
import Report from './Components/Report';
import Title from './Components/Title';
import Form from './Components/Form';

const API_KEY='73df817b27c7f1bcca3214ed540c43c0';

class App extends React.Component{
  constructor(props){
    super(props)
    this.state={
      temperature:undefined,
      city:undefined,
      country:undefined,
      humidity:undefined,
      description:undefined,
      error:undefined
    }
    
  }
  
  getWeather=async(e)=>{
    e.preventDefault();
    const city=e.target.city.value;
    const country=e.target.country.value;
    const api_call=await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`);
    const data=await api_call.json();
    console.log(data);
    
    if(city&&country){
      this.setState({
        temperature:data.main.temp,
        city:data.name,
        country:data.sys.country,
        humidity:data.main.humidity,
        description:data.weather[0].description,
        error:''
      })
    }else{
      this.setState({
        temperature:undefined,
        city:undefined,
        country:undefined,
        humidity:undefined,
        description:undefined,
        error:'Please enter the valid entry...'})
    }
  }
render(){
return(
  <div>
       <div className='wrapper'>
        <div className='main'>
         <div className='container'>
          <div className='row'>
           <div className='col-xs-5 title-container'>
            <Title/>
           </div>
           <div className='col-xs-7 form-container'>
            <Form getWeather={this.getWeather}/>
            <Report
              temperature={this.state.temperature}
              city={this.state.city}
              country={this.state.country}
              humidity={this.state.humidity}
              description={this.state.description}
              error={this.state.error}/>
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

    