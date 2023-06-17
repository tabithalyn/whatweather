/* eslint-disable @typescript-eslint/no-explicit-any */
export type weatherType = {
  coord: any;
  main: any;
  weather: any;
  wind: any;
  name: string;
  country: string;
  sys: any;
  list: [
    {
      dt: number
      visibility: number
      sys: {
        country: string;
        sunrise: number;
        sunset: number;
      }
      coord: {
        lon: number;
        lat: number;
      }
      main: {
        feels_like: number;
        humidity: number;
        temp: number;
      }
      weather: [{
        description: string;
        icon: string;
      }]
      wind: {
        speed: number;
        gust: number;
        deg: number;
      }
      clouds: { all: number; }
    }
  ]
}