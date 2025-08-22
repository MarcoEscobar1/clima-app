# 🌤️ Visor de Clima - React Native App

Aplicación móvil híbrida que muestra el clima actual y pronóstico de 7 días para cualquier ciudad del mundo.

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

## 🛠️ Comandos Disponibles

```bash
npm start          # Iniciar servidor de desarrollo
npm run android    # Ejecutar en Android (requiere Android Studio)
npm run ios        # Ejecutar en iOS (requiere macOS)
npm run web        # Ejecutar en navegador web
```

## 🎯 Modo Demo

Si no tienes API key, la app incluye un **modo demo** con datos de ejemplo para estas ciudades:
- Madrid, Barcelona, Ciudad de México, Buenos Aires

## ⚠️ Solución de Problemas

**Error de API Key:**
- Asegúrate de haber reemplazado `'TU_API_KEY'` con tu clave real
- La activación puede tardar hasta 10 minutos

**Ciudad no encontrada:**
- Verifica la ortografía
- Prueba con nombres en inglés

**No se instalan dependencias:**
- Verifica tener Node.js instalado
- Ejecuta `npm cache clean --force` y vuelve a intentar

## 📄 Estructura del Proyecto

```
clima-app/
├── App.js           # Código principal de la aplicación
├── package.json     # Dependencias y scripts
├── app.json        # Configuración de Expo
└── assets/         # Iconos y recursos
```