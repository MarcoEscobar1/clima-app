// config.js - Configuración de la aplicación

// INSTRUCCIONES:
// 1. Ve a https://openweathermap.org/api
// 2. Crea una cuenta gratuita
// 3. Obtén tu API key
// 4. Reemplaza 'TU_API_KEY' con tu clave real

const API_CONFIG = {
  // Reemplaza con tu API key de OpenWeatherMap
  API_KEY: '2993960a70d5a88af58152bb773631bf',
  
  // URL base de la APIeq
  BASE_URL: 'https://api.openweathermap.org/data/2.5/weather',
  
  // Configuración por defecto
  DEFAULT_PARAMS: {
    units: 'metric', // Para temperatura en Celsius
    lang: 'es'       // Para descripciones en español
  }
};

// Función para validar si la API key está configurada
const isApiKeyConfigured = () => {
  return API_CONFIG.API_KEY !== 'TU_API_KEY' && API_CONFIG.API_KEY.length > 0;
};

module.exports = {
  API_CONFIG,
  isApiKeyConfigured
};
