# 🌤️ Visor de Clima - React Native App

Aplicación móvil híbrida que muestra el clima actual y pronóstico de 7 días para cualquier ciudad del mundo.
<img width="350" height="799" alt="{AA9BFC9D-1210-4C75-BE81-CD8465C3B771}" src="https://github.com/user-attachments/assets/f5a0814b-ff66-4ab2-8495-ae0dde092427" />

## 📱 Características

- **Clima actual**: Temperatura, descripción, humedad y sensación térmica
- **Viento**: Velocidad mostrada en km/h
- **Pronóstico semanal**: Predicciones de los próximos 7 días
- **Modo demo**: Prueba la app sin configurar API key
- **Manejo de errores**: Validaciones y mensajes informativos

## 🚀 Instalación Rápida

### 1. Clonar e instalar dependencias
```bash
git clone [url-del-repositorio]
cd clima-app
npm install
```

### 2. Configurar API Key (Opcional)
- Crea cuenta gratuita en [OpenWeatherMap](https://openweathermap.org/api)
- Obtén tu API key
- Edita `App.js` línea 15: reemplaza `'TU_API_KEY'` con tu clave

### 3. Ejecutar la aplicación
```bash
npm start
```

### 4. Probar en tu móvil
- Instala **Expo Go** desde Play Store o App Store
- Escanea el código QR que aparece en terminal
- ¡Listo! 🎉

## 📦 Dependencias Principales

- **React Native + Expo**: Framework de desarrollo móvil
- **Axios**: Cliente HTTP para consumir APIs
- **OpenWeatherMap API**: Datos meteorológicos

## 🎯 Modo Demo

Si no tienes API key, la app incluye un **modo demo** con datos de ejemplo para estas ciudades:
- Madrid, Barcelona, Ciudad de México, Buenos Aires
