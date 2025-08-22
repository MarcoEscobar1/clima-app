// demoData.js - Datos de demo para probar la aplicación sin API key

const DEMO_DATA = {
  name: "Madrid",
  sys: { country: "ES" },
  main: {
    temp: 22,
    feels_like: 24,
    humidity: 65,
    pressure: 1013
  },
  weather: [{
    description: "cielo claro",
    icon: "01d"
  }],
  wind: {
    speed: 3.5
  }
};

const DEMO_CITIES = [
  {
    name: "Madrid",
    country: "ES",
    temp: 22,
    description: "cielo claro",
    icon: "01d"
  },
  {
    name: "Barcelona",
    country: "ES", 
    temp: 25,
    description: "parcialmente nublado",
    icon: "02d"
  },
  {
    name: "Ciudad de México",
    country: "MX",
    temp: 18,
    description: "lluvia ligera",
    icon: "10d"
  },
  {
    name: "Buenos Aires",
    country: "AR",
    temp: 15,
    description: "nublado",
    icon: "04d"
  }
];

module.exports = {
  DEMO_DATA,
  DEMO_CITIES
};
