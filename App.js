import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  ActivityIndicator,
  Image
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';

// Configuración de la API
const API_KEY = '2993960a70d5a88af58152bb773631bf';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
const FORECAST_URL = 'https://api.openweathermap.org/data/2.5/forecast';

// Datos de demo
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

// Función para validar si la API key está configurada
const isApiKeyConfigured = () => {
  return API_KEY !== 'TU_API_KEY' && API_KEY.length > 0;
};

export default function App() {
  const [ciudad, setCiudad] = useState('');
  const [datosClima, setDatosClima] = useState(null);
  const [pronostico, setPronostico] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [modoDemo, setModoDemo] = useState(!isApiKeyConfigured());

  const obtenerClimaDemo = (nombreCiudad) => {
    const ciudadDemo = DEMO_CITIES.find(
      c => c.name.toLowerCase().includes(nombreCiudad.toLowerCase())
    );
    
    if (ciudadDemo) {
      const climaActual = {
        name: ciudadDemo.name,
        sys: { country: ciudadDemo.country },
        main: {
          temp: ciudadDemo.temp,
          feels_like: ciudadDemo.temp + 2,
          humidity: Math.floor(Math.random() * 40) + 40,
          pressure: Math.floor(Math.random() * 50) + 1000
        },
        weather: [{
          description: ciudadDemo.description,
          icon: ciudadDemo.icon
        }],
        wind: {
          speed: Math.floor(Math.random() * 10) + 1
        }
      };

      // Generar pronóstico de demo para 7 días
      const pronosticoDemo = {
        list: []
      };

      const diasSemana = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
      const iconos = ['01d', '02d', '03d', '04d', '09d', '10d', '11d'];
      const descripciones = ['soleado', 'parcialmente nublado', 'nublado', 'lluvia ligera', 'lluvia', 'tormentas', 'despejado'];

      for (let i = 0; i < 7; i++) {
        const fecha = new Date();
        fecha.setDate(fecha.getDate() + i);
        
        pronosticoDemo.list.push({
          dt: fecha.getTime() / 1000,
          main: {
            temp_max: ciudadDemo.temp + Math.floor(Math.random() * 10) - 5,
            temp_min: ciudadDemo.temp - Math.floor(Math.random() * 8) - 2
          },
          weather: [{
            description: descripciones[i % descripciones.length],
            icon: iconos[i % iconos.length]
          }]
        });
      }

      return { clima: climaActual, pronostico: pronosticoDemo };
    }
    return null;
  };

  const obtenerClima = async () => {
    if (!ciudad.trim()) {
      Alert.alert('Error', 'Por favor ingresa el nombre de una ciudad');
      return;
    }

    setCargando(true);

    try {
      if (modoDemo) {
        // Simular delay de red
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const datosDemo = obtenerClimaDemo(ciudad.trim());
        if (datosDemo) {
          setDatosClima(datosDemo.clima);
          setPronostico(datosDemo.pronostico);
        } else {
          Alert.alert(
            'Demo - Ciudad no encontrada', 
            'Prueba con: Madrid, Barcelona, Ciudad de México, o Buenos Aires'
          );
          setDatosClima(null);
          setPronostico(null);
        }
      } else {
        console.log('Haciendo petición a la API con key:', API_KEY.substring(0, 8) + '...');
        
        // Hacer ambas peticiones en paralelo
        const [climaResponse, pronosticoResponse] = await Promise.all([
          axios.get(BASE_URL, {
            params: {
              q: ciudad.trim(),
              appid: API_KEY,
              units: 'metric',
              lang: 'es'
            }
          }),
          axios.get(FORECAST_URL, {
            params: {
              q: ciudad.trim(),
              appid: API_KEY,
              units: 'metric',
              lang: 'es'
            }
          })
        ]);

        setDatosClima(climaResponse.data);
        setPronostico(pronosticoResponse.data);
        console.log('Datos recibidos exitosamente');
      }
    } catch (error) {
      console.error('Error al obtener datos del clima:', error.response?.status, error.response?.data);
      
      if (error.response && error.response.status === 404) {
        Alert.alert('Error', 'Ciudad no encontrada. Verifica el nombre e intenta nuevamente.');
      } else if (error.response && error.response.status === 401) {
        Alert.alert(
          'Error de API Key', 
          'Tu API key no es válida o no está activa aún. Las nuevas API keys pueden tardar hasta 10 minutos en activarse. Puedes usar el modo Demo mientras tanto.'
        );
      } else {
        Alert.alert('Error', 'No se pudo obtener la información del clima. Verifica tu conexión a internet.');
      }
      
      setDatosClima(null);
      setPronostico(null);
    } finally {
      setCargando(false);
    }
  };

  const toggleModo = () => {
    setModoDemo(!modoDemo);
    setDatosClima(null);
    setPronostico(null);
    setCiudad('');
    
    if (!modoDemo) {
      Alert.alert(
        'Modo Demo Activado',
        'Ahora puedes probar la aplicación con datos de ejemplo. Prueba con: Madrid, Barcelona, Ciudad de México, o Buenos Aires'
      );
    } else {
      if (isApiKeyConfigured()) {
        Alert.alert(
          'Modo Real Activado',
          'Ahora la aplicación consultará datos reales de la API de OpenWeatherMap'
        );
      } else {
        Alert.alert(
          'API Key requerida',
          'Para usar el modo real, necesitas configurar tu API key de OpenWeatherMap'
        );
        setModoDemo(true);
      }
    }
  };

  const formatearTemperatura = (temp) => {
    return Math.round(temp);
  };

  const convertirVientoAKmh = (velocidadMs) => {
    return Math.round(velocidadMs * 3.6);
  };

  const formatearFecha = (timestamp) => {
    const fecha = new Date(timestamp * 1000);
    const opciones = { weekday: 'short' };
    return fecha.toLocaleDateString('es-ES', opciones);
  };

  const capitalizarPalabras = (str) => {
    return str.replace(/\w\S*/g, (txt) => 
      txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    );
  };

  const renderizarClima = () => {
    if (!datosClima) return null;

    const iconUrl = `https://openweathermap.org/img/wn/${datosClima.weather[0].icon}@2x.png`;

    return (
      <View style={styles.climaContainer}>
        <Text style={styles.ciudadNombre}>{datosClima.name}, {datosClima.sys.country}</Text>
        
        <View style={styles.temperaturaContainer}>
          <Image source={{ uri: iconUrl }} style={styles.iconoClima} />
          <Text style={styles.temperatura}>
            {formatearTemperatura(datosClima.main.temp)}°C
          </Text>
        </View>
        
        <Text style={styles.descripcion}>
          {capitalizarPalabras(datosClima.weather[0].description)}
        </Text>
        
        <View style={styles.detallesContainer}>
          <View style={styles.detalleItem}>
            <Text style={styles.detalleLabel}>Sensación térmica</Text>
            <Text style={styles.detalleValor}>
              {formatearTemperatura(datosClima.main.feels_like)}°C
            </Text>
          </View>
          
          <View style={styles.detalleItem}>
            <Text style={styles.detalleLabel}>Humedad</Text>
            <Text style={styles.detalleValor}>{datosClima.main.humidity}%</Text>
          </View>
          
          <View style={styles.detalleItem}>
            <Text style={styles.detalleLabel}>Viento</Text>
            <Text style={styles.detalleValor}>{convertirVientoAKmh(datosClima.wind?.speed || 0)} km/h</Text>
          </View>
        </View>
      </View>
    );
  };

  const renderizarPronostico = () => {
    if (!pronostico || !pronostico.list) return null;

    // Agrupar por días (tomar uno por día)
    const diasUnicos = [];
    const fechasVistas = new Set();

    for (const item of pronostico.list) {
      const fecha = new Date(item.dt * 1000);
      const fechaStr = fecha.toDateString();
      
      if (!fechasVistas.has(fechaStr) && diasUnicos.length < 7) {
        fechasVistas.add(fechaStr);
        diasUnicos.push(item);
      }
    }

    return (
      <View style={styles.pronosticoContainer}>
        <Text style={styles.pronosticoTitulo}>Pronóstico de la Semana</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {diasUnicos.map((item, index) => {
            const iconUrl = `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`;
            
            return (
              <View key={index} style={styles.diaPronostico}>
                <Text style={styles.diaNombre}>
                  {index === 0 ? 'Hoy' : formatearFecha(item.dt)}
                </Text>
                <Image source={{ uri: iconUrl }} style={styles.iconoPronostico} />
                <Text style={styles.tempMaxima}>{formatearTemperatura(item.main.temp_max)}°</Text>
                <Text style={styles.tempMinima}>{formatearTemperatura(item.main.temp_min)}°</Text>
                <Text style={styles.descripcionPronostico}>
                  {capitalizarPalabras(item.weather[0].description)}
                </Text>
              </View>
            );
          })}
        </ScrollView>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar style="light" />
      
      <View style={styles.header}>
        <Text style={styles.titulo}>Visor de Clima</Text>
        <Text style={styles.subtitulo}>Consulta el clima de cualquier ciudad</Text>
        
        <TouchableOpacity 
          style={styles.modoBoton}
          onPress={toggleModo}
        >
          <Text style={styles.modoTexto}>
            Modo: {modoDemo ? 'Demo' : 'Real'}
          </Text>
        </TouchableOpacity>
        
        {modoDemo && (
          <Text style={styles.demoInfo}>
            Prueba con: Madrid, Barcelona, Ciudad de México, Buenos Aires
          </Text>
        )}
      </View>

      <View style={styles.formulario}>
        <TextInput
          style={styles.input}
          placeholder="Ingresa el nombre de la ciudad"
          placeholderTextColor="#999"
          value={ciudad}
          onChangeText={setCiudad}
          onSubmitEditing={obtenerClima}
        />
        
        <TouchableOpacity
          style={[styles.boton, cargando && styles.botonDeshabilitado]}
          onPress={obtenerClima}
          disabled={cargando}
        >
          {cargando ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.botonTexto}>Consultar Clima</Text>
          )}
        </TouchableOpacity>
      </View>

      {renderizarClima()}
      {renderizarPronostico()}

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          {modoDemo ? 'Modo Demo - Datos de ejemplo' : 'Powered by OpenWeatherMap API'}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4A90E2',
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 30,
    alignItems: 'center',
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 5,
  },
  subtitulo: {
    fontSize: 16,
    color: '#E6F3FF',
    textAlign: 'center',
  },
  formulario: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 15,
    fontSize: 16,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  boton: {
    backgroundColor: '#2ECC71',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  botonDeshabilitado: {
    backgroundColor: '#95A5A6',
  },
  botonTexto: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  climaContainer: {
    backgroundColor: '#FFF',
    margin: 20,
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  ciudadNombre: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 15,
    textAlign: 'center',
  },
  temperaturaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  iconoClima: {
    width: 80,
    height: 80,
    marginRight: 10,
  },
  temperatura: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#E74C3C',
  },
  descripcion: {
    fontSize: 18,
    color: '#7F8C8D',
    marginBottom: 20,
    textAlign: 'center',
  },
  detallesContainer: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  detalleItem: {
    width: '31%',
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    alignItems: 'center',
  },
  detalleLabel: {
    fontSize: 12,
    color: '#7F8C8D',
    marginBottom: 5,
    textAlign: 'center',
  },
  detalleValor: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
    textAlign: 'center',
  },
  footer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  footerText: {
    color: '#E6F3FF',
    fontSize: 12,
  },
  modoBoton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginTop: 15,
  },
  modoTexto: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
  },
  demoInfo: {
    color: '#E6F3FF',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 10,
    fontStyle: 'italic',
  },
  pronosticoContainer: {
    backgroundColor: '#FFF',
    margin: 20,
    marginTop: 10,
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  pronosticoTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 15,
    textAlign: 'center',
  },
  diaPronostico: {
    alignItems: 'center',
    marginRight: 15,
    padding: 10,
    backgroundColor: '#F8F9FA',
    borderRadius: 10,
    width: 100,
  },
  diaNombre: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#7F8C8D',
    marginBottom: 5,
    textAlign: 'center',
  },
  iconoPronostico: {
    width: 40,
    height: 40,
    marginBottom: 5,
  },
  tempMaxima: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#E74C3C',
  },
  tempMinima: {
    fontSize: 14,
    color: '#7F8C8D',
    marginBottom: 5,
  },
  descripcionPronostico: {
    fontSize: 10,
    color: '#95A5A6',
    textAlign: 'center',
  },
});
