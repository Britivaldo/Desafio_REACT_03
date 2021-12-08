import { useState, useEffect } from 'react'
import './styles.css';
import axios from 'axios'

interface Data {
  date: string
  humidity: number
  description: string
  city: string
  forecast: Forecast[] 
}

interface Forecast {
  date: string
  weekday: string
  description: string
}

function Api() {

  const [data, setData] = useState<Data>();
  
  useEffect(() => {
    const fetchData = async () => {
      await axios.get<Data>('https://aps-weather-app.herokuapp.com/weather?cityName=Ferraz De Vasconcelos')
      .then( response => setData(response.data));

    }
    fetchData();
  }, []);

  return (
    <div className="container">
        <div className="title">
            { data?.city }
        </div>
        <div className="content">
            <div >
                <div className="humidity">{data?.humidity}</div>
                <div>Umidade</div>
            </div>
            <div className="description">
                <div>{ data?.date }</div>
                <div>{data?.description}</div>
            </div>
        </div>
        <div className="list">
        {data?.forecast.map( day => 
            <div className="element">
               <p> { day.weekday }</p>
               <p> { day.date}</p>
            </div>
            
            )}

        </div>

    </div>
  );
}

export default Api;
