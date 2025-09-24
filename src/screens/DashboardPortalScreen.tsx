import React, { useState, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
  Alert,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

// Imports centralizados obligatorios
import { Colores } from '../constants/colors';
import { Tipografia } from '../constants/typography';

/**
 * Pantalla 11: Dashboard del Portal
 * Portal para padres con visión rápida del progreso del niño según APP_BLUEPRINT.md líneas 164-182
 * 
 * Características principales:
 * - Resumen semanal: tiempo uso, actividades favoritas, progreso áreas sensoriales
 * - Feed de insights IA: Lista componentes "Insight para Padres" 
 * - Sugerencias "Misiones Mundo Real": actividades personalizadas para casa
 * - Acceso rápido: progreso detallado, objetivos, contactar terapeuta
 * - Dashboard métricas según DESIGN_SYSTEM.md
 */

// ========================================================================================
// INTERFACES Y TIPOS
// ========================================================================================

interface ResumenSemanal {
  tiempoTotalUso: number; // en minutos
  sesionesCompletadas: number;
  actividadesFavoritas: ActividadFavorita[];
  progresoAreasSensoriales: ProgresoAreaSensorial[];
  tendencia: 'mejorando' | 'estable' | 'necesita_atencion';
}

interface ActividadFavorita {
  id: string;
  nombre: string;
  categoria: 'tactil' | 'visual' | 'auditiva' | 'movimiento';
  tiempoInvertido: number; // en minutos
  precisionPromedio: number; // 0-1
  icono: string;
}

interface ProgresoAreaSensorial {
  area: 'tactil' | 'visual' | 'auditiva' | 'propioceptiva' | 'vestibular';
  puntuacion: number; // 0-100
  cambioSemana: number; // diferencia respecto semana anterior
  objetivo: number; // objetivo establecido
  color: keyof typeof Colores;
}

interface InsightPadres {
  id: string;
  tipo: 'progreso' | 'sugerencia' | 'logro' | 'recomendacion';
  titulo: string;
  contenido: string;
  fechaGeneracion: Date;
  accionesDisponibles?: AccionInsight[];
  prioridad: 'alta' | 'media' | 'baja';
  categoriaColor: keyof typeof Colores;
}

interface AccionInsight {
  id: string;
  tipo: 'ver_detalle' | 'programar_actividad' | 'contactar_terapeuta' | 'marcar_completado';
  label: string;
  icono: string;
}

interface MisionMundoReal {
  id: string;
  titulo: string;
  descripcion: string;
  duracionEstimada: number; // en minutos
  dificultad: 'facil' | 'medio' | 'dificil';
  categoria: 'motricidad_fina' | 'motricidad_gruesa' | 'sensorial' | 'cognitiva' | 'social';
  materialesNecesarios: string[];
  generadaPorIA: boolean;
  fechaSugerencia: Date;
}

interface DashboardMetricas {
  ultimaActualizacion: Date;
  resumenSemanal: ResumenSemanal;
  insightsPadres: InsightPadres[];
  misionesMundoReal: MisionMundoReal[];
  alertasImportantes: AlertaImportante[];
  estadoConexionIA: 'activa' | 'limitada' | 'desconectada';
}

interface AlertaImportante {
  id: string;
  tipo: 'objetivo_completado' | 'necesita_atencion' | 'recomendacion_terapeuta';
  mensaje: string;
  fechaCreacion: Date;
  accionRequerida?: string;
}

export interface DashboardPortalScreenProps {
  metricas: DashboardMetricas;
  perfilNino: PerfilNino;
  onVerProgresoDetallado: () => void;
  onConfigurarObjetivos: () => void;
  onContactarTerapeuta: () => void;
  onEjecutarMision: (misionId: string) => void;
  onMarcarInsightLeido: (insightId: string) => void;
  onRefrescarDatos: () => Promise<void>;
  onVerAyuda: () => void;
}

interface PerfilNino {
  id: string;
  nombre: string;
  edad: number;
  fechaRegistro: Date;
  objetivosPrincipales: string[];
  preferenciasSensoriales: PreferenciaSensorial[];
}

interface PreferenciaSensorial {
  tipo: 'tactil' | 'visual' | 'auditiva';
  nivel: 'baja' | 'media' | 'alta';
  notas?: string;
}

// ========================================================================================
// COMPONENTE PRINCIPAL
// ========================================================================================

const DashboardPortalScreen: React.FC<DashboardPortalScreenProps> = ({
  metricas,
  perfilNino,
  onVerProgresoDetallado,
  onConfigurarObjetivos,
  onContactarTerapeuta,
  onEjecutarMision,
  onMarcarInsightLeido,
  onRefrescarDatos,
  onVerAyuda,
}) => {
  // =====================================================================================
  // ESTADO Y HOOKS
  // =====================================================================================
  
  const [refreshing, setRefreshing] = useState(false);
  const [expandirInsights, setExpandirInsights] = useState(false);
  const [expandirMisiones, setExpandirMisiones] = useState(false);

  // =====================================================================================
  // EFECTOS DE CICLO DE VIDA
  // =====================================================================================

  // Actualizar datos al enfocar pantalla
  useFocusEffect(
    useCallback(() => {
      const verificarActualizacion = async () => {
        const ultimaActualizacion = metricas.ultimaActualizacion;
        const tiempoTranscurrido = Date.now() - ultimaActualizacion.getTime();
        
        // Actualizar si han pasado más de 5 minutos
        if (tiempoTranscurrido > 5 * 60 * 1000) {
          try {
            await onRefrescarDatos();
          } catch (error) {
            console.warn('Error actualizando datos dashboard:', error);
          }
        }
      };

      verificarActualizacion();
    }, [metricas.ultimaActualizacion, onRefrescarDatos])
  );

  // =====================================================================================
  // HANDLERS DE EVENTOS
  // =====================================================================================

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await onRefrescarDatos();
    } catch (error) {
      console.error('Error refrescando dashboard:', error);
      Alert.alert(
        'Error de conexión',
        'No se pudieron actualizar los datos. Verifica tu conexión a internet.',
        [{ text: 'OK' }]
      );
    } finally {
      setRefreshing(false);
    }
  }, [onRefrescarDatos]);

  const handleInsightAction = useCallback((insight: InsightPadres, accion: AccionInsight) => {
    try {
      switch (accion.tipo) {
        case 'ver_detalle':
          onVerProgresoDetallado();
          break;
        case 'programar_actividad':
          // Navegar a programación de actividad
          Alert.alert('Función en desarrollo', 'Próximamente podrás programar actividades directamente.');
          break;
        case 'contactar_terapeuta':
          onContactarTerapeuta();
          break;
        case 'marcar_completado':
          onMarcarInsightLeido(insight.id);
          break;
        default:
          console.warn('Acción no reconocida:', accion.tipo);
      }
    } catch (error) {
      console.error('Error ejecutando acción insight:', error);
      Alert.alert('Error', 'No se pudo ejecutar la acción. Inténtalo de nuevo.');
    }
  }, [onVerProgresoDetallado, onContactarTerapeuta, onMarcarInsightLeido]);

  const handleEjecutarMision = useCallback((mision: MisionMundoReal) => {
    Alert.alert(
      mision.titulo,
      `${mision.descripcion}\n\nDuración estimada: ${mision.duracionEstimada} min\nDificultad: ${mision.dificultad}`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Comenzar',
          onPress: () => {
            try {
              onEjecutarMision(mision.id);
            } catch (error) {
              console.error('Error ejecutando misión:', error);
              Alert.alert('Error', 'No se pudo iniciar la misión.');
            }
          },
        },
      ]
    );
  }, [onEjecutarMision]);

  // =====================================================================================
  // FUNCIONES AUXILIARES
  // =====================================================================================

  const calcularProgresoGeneral = (): number => {
    const { progresoAreasSensoriales } = metricas.resumenSemanal;
    if (progresoAreasSensoriales.length === 0) return 0;
    
    const suma = progresoAreasSensoriales.reduce((acc, area) => acc + area.puntuacion, 0);
    return Math.round(suma / progresoAreasSensoriales.length);
  };

  const formatearTiempo = (minutos: number): string => {
    if (minutos < 60) return `${minutos}m`;
    const horas = Math.floor(minutos / 60);
    const mins = minutos % 60;
    return `${horas}h ${mins}m`;
  };

  const obtenerIconoTendencia = (tendencia: ResumenSemanal['tendencia']): string => {
    switch (tendencia) {
      case 'mejorando': return 'trending-up';
      case 'estable': return 'trending-flat';
      case 'necesita_atencion': return 'trending-down';
      default: return 'help';
    }
  };

  const obtenerColorTendencia = (tendencia: ResumenSemanal['tendencia']): keyof typeof Colores => {
    switch (tendencia) {
      case 'mejorando': return 'verdeJungla';
      case 'estable': return 'azul';
      case 'necesita_atencion': return 'rojo';
      default: return 'grisAdministrativo';
    }
  };

  // =====================================================================================
  // CONFIGURACIONES Y DATOS COMPUTADOS
  // =====================================================================================

  const alertasVisible = useMemo(() => 
    metricas.alertasImportantes.filter(alerta => 
      alerta.tipo !== 'objetivo_completado' || 
      Date.now() - alerta.fechaCreacion.getTime() < 24 * 60 * 60 * 1000 // 24 horas
    ), 
    [metricas.alertasImportantes]
  );

  const insightsRecientes = useMemo(() => 
    metricas.insightsPadres
      .sort((a, b) => b.fechaGeneracion.getTime() - a.fechaGeneracion.getTime())
      .slice(0, expandirInsights ? metricas.insightsPadres.length : 3),
    [metricas.insightsPadres, expandirInsights]
  );

  const misionesRecientes = useMemo(() => 
    metricas.misionesMundoReal
      .sort((a, b) => b.fechaSugerencia.getTime() - a.fechaSugerencia.getTime())
      .slice(0, expandirMisiones ? metricas.misionesMundoReal.length : 2),
    [metricas.misionesMundoReal, expandirMisiones]
  );

  const progresoGeneral = useMemo(() => calcularProgresoGeneral(), [metricas.resumenSemanal]);

  // =====================================================================================
  // RENDER DE SUBCOMPONENTES
  // =====================================================================================

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.headerTextos}>
        <Text style={[styles.saludo, Tipografia.estilos.H2]}>
          Hola! 👋
        </Text>
        <Text style={[styles.subtituloHeader, Tipografia.estilos.Body]}>
          Progreso de {perfilNino.nombre}
        </Text>
      </View>

      <View style={styles.headerAcciones}>
        <TouchableOpacity
          style={styles.botonHeader}
          onPress={onVerAyuda}
          accessible={true}
          accessibilityLabel="Ver ayuda y tutoriales"
          accessibilityRole="button"
        >
          <Ionicons name="help-circle" size={24} color={Colores.azul} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botonHeader}
          onPress={onContactarTerapeuta}
          accessible={true}
          accessibilityLabel="Contactar terapeuta"
          accessibilityRole="button"
        >
          <Ionicons name="medical" size={24} color={Colores.verdeJungla} />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderResumenSemanal = () => (
    <View style={styles.seccion}>
      <Text style={[styles.tituloSeccion, Tipografia.estilos.H2]}>
        Resumen Esta Semana
      </Text>

      <View style={styles.tarjetaResumen}>
        <View style={styles.metricas}>
          <View style={styles.metrica}>
            <Text style={[styles.numeroMetrica, Tipografia.estilos.H2]}>
              {formatearTiempo(metricas.resumenSemanal.tiempoTotalUso)}
            </Text>
            <Text style={[styles.labelMetrica, Tipografia.estilos.Body]}>
              Tiempo de uso
            </Text>
          </View>

          <View style={styles.metrica}>
            <Text style={[styles.numeroMetrica, Tipografia.estilos.H2]}>
              {metricas.resumenSemanal.sesionesCompletadas}
            </Text>
            <Text style={[styles.labelMetrica, Tipografia.estilos.Body]}>
              Sesiones
            </Text>
          </View>

          <View style={styles.metrica}>
            <View style={styles.tendenciaContainer}>
              <Ionicons 
                name={obtenerIconoTendencia(metricas.resumenSemanal.tendencia) as any} 
                size={24} 
                color={Colores[obtenerColorTendencia(metricas.resumenSemanal.tendencia)]} 
              />
              <Text style={[styles.numeroMetrica, Tipografia.estilos.H2, {
                color: Colores[obtenerColorTendencia(metricas.resumenSemanal.tendencia)]
              }]}>
                {progresoGeneral}%
              </Text>
            </View>
            <Text style={[styles.labelMetrica, Tipografia.estilos.Body]}>
              Progreso general
            </Text>
          </View>
        </View>
      </View>
    </View>
  );

  const renderActividadesFavoritas = () => (
    <View style={styles.seccion}>
      <Text style={[styles.tituloSeccion, Tipografia.estilos.H2]}>
        Actividades Favoritas
      </Text>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.scrollActividades}
      >
        {metricas.resumenSemanal.actividadesFavoritas.map((actividad) => (
          <View key={actividad.id} style={styles.tarjetaActividad}>
            <View style={[styles.iconoActividad, { backgroundColor: Colores.colorCalido + '20' }]}>
              <Ionicons name={actividad.icono as any} size={32} color={Colores.colorCalido} />
            </View>
            
            <Text style={[styles.nombreActividad, Tipografia.estilos.BotonPrimario]}>
              {actividad.nombre}
            </Text>
            
            <Text style={[styles.estadoActividad, Tipografia.estilos.Body]}>
              {formatearTiempo(actividad.tiempoInvertido)}
            </Text>
            
            <Text style={[styles.estadoActividad, Tipografia.estilos.Body]}>
              {Math.round(actividad.precisionPromedio * 100)}% precisión
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );

  const renderInsights = () => (
    <View style={styles.seccion}>
      <View style={styles.seccionHeader}>
        <Text style={[styles.tituloSeccion, Tipografia.estilos.H2]}>
          Insights de Leo
        </Text>
        
        {metricas.insightsPadres.length > 3 && (
          <TouchableOpacity
            onPress={() => setExpandirInsights(!expandirInsights)}
            accessible={true}
            accessibilityLabel={expandirInsights ? "Ver menos insights" : "Ver todos los insights"}
            accessibilityRole="button"
          >
            <Text style={[styles.verMas, Tipografia.estilos.Body, { color: Colores.azul }]}>
              {expandirInsights ? 'Ver menos' : `Ver ${metricas.insightsPadres.length - 3} más`}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {insightsRecientes.map((insight) => (
        <View key={insight.id} style={styles.tarjetaInsight}>
          <View style={[styles.barraLateral, { backgroundColor: Colores[insight.categoriaColor] }]} />
          
          <View style={styles.contenidoInsight}>
            <View style={styles.headerInsight}>
              <Text style={[styles.tituloInsight, Tipografia.estilos.H2]}>
                {insight.titulo}
              </Text>
              
              <View style={styles.metadatosInsight}>
                <Text style={[styles.fechaInsight, Tipografia.estilos.Body]}>
                  {insight.fechaGeneracion.toLocaleDateString()}
                </Text>
                <View style={[styles.badgeTipo, { backgroundColor: Colores[insight.categoriaColor] + '20' }]}>
                  <Text style={[styles.textoTipo, Tipografia.estilos.Body, { 
                    color: Colores[insight.categoriaColor] 
                  }]}>
                    {insight.tipo}
                  </Text>
                </View>
              </View>
            </View>

            <Text style={[styles.contenidoTextoInsight, Tipografia.estilos.Body]}>
              {insight.contenido}
            </Text>

            {insight.accionesDisponibles && insight.accionesDisponibles.length > 0 && (
              <View style={styles.accionesInsight}>
                {insight.accionesDisponibles.map((accion) => (
                  <TouchableOpacity
                    key={accion.id}
                    style={styles.botonAccionInsight}
                    onPress={() => handleInsightAction(insight, accion)}
                    accessible={true}
                    accessibilityLabel={accion.label}
                    accessibilityRole="button"
                  >
                    <Ionicons name={accion.icono as any} size={16} color={Colores.azul} />
                    <Text style={[styles.textoAccionInsight, Tipografia.estilos.Body, { color: Colores.azul }]}>
                      {accion.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        </View>
      ))}
    </View>
  );

  const renderMisionesMundoReal = () => (
    <View style={styles.seccion}>
      <View style={styles.seccionHeader}>
        <Text style={[styles.tituloSeccion, Tipografia.estilos.H2]}>
          Misiones para Casa
        </Text>
        
        {metricas.misionesMundoReal.length > 2 && (
          <TouchableOpacity
            onPress={() => setExpandirMisiones(!expandirMisiones)}
            accessible={true}
            accessibilityLabel={expandirMisiones ? "Ver menos misiones" : "Ver todas las misiones"}
            accessibilityRole="button"
          >
            <Text style={[styles.verMas, Tipografia.estilos.Body, { color: Colores.azul }]}>
              {expandirMisiones ? 'Ver menos' : `Ver ${metricas.misionesMundoReal.length - 2} más`}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {misionesRecientes.map((mision) => (
        <TouchableOpacity
          key={mision.id}
          style={styles.tarjetaMision}
          onPress={() => handleEjecutarMision(mision)}
          accessible={true}
          accessibilityLabel={`Misión: ${mision.titulo}. Duración ${mision.duracionEstimada} minutos`}
          accessibilityRole="button"
        >
          <View style={styles.headerMision}>
            <Text style={[styles.tituloMision, Tipografia.estilos.BotonPrimario]}>
              {mision.titulo}
            </Text>
            
            <View style={styles.metadatosMision}>
              {mision.generadaPorIA && (
                <View style={styles.badgeIA}>
                  <Ionicons name={"sparkles" as any} size={12} color={Colores.amarillo} />
                  <Text style={[styles.textoIA, Tipografia.estilos.Body, { color: Colores.amarillo }]}>
                    IA
                  </Text>
                </View>
              )}
              
              <Text style={[styles.duracionMision, Tipografia.estilos.Body]}>
                {mision.duracionEstimada}m
              </Text>
            </View>
          </View>

          <Text style={[styles.descripcionMision, Tipografia.estilos.Body]}>
            {mision.descripcion}
          </Text>

          <View style={styles.footerMision}>
            <View style={styles.categoriaMision}>
              <Text style={[styles.textoCategoría, Tipografia.estilos.Body]}>
                {mision.categoria.replace('_', ' ')}
              </Text>
            </View>
            
            <Ionicons name="chevron-forward" size={20} color={Colores.grisAdministrativo} />
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderAccesosRapidos = () => (
    <View style={styles.seccion}>
      <Text style={[styles.tituloSeccion, Tipografia.estilos.H2]}>
        Accesos Rápidos
      </Text>

      <View style={styles.gridAccesos}>
        <TouchableOpacity
          style={styles.botonAcceso}
          onPress={onVerProgresoDetallado}
          accessible={true}
          accessibilityLabel="Ver progreso detallado"
          accessibilityRole="button"
        >
          <Ionicons name="analytics" size={32} color={Colores.azul} />
          <Text style={[styles.textoAcceso, Tipografia.estilos.BotonPrimario]}>
            Progreso Detallado
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botonAcceso}
          onPress={onConfigurarObjetivos}
          accessible={true}
          accessibilityLabel="Configurar objetivos"
          accessibilityRole="button"
        >
          <Ionicons name={"target" as any} size={32} color={Colores.verdeJungla} />
          <Text style={[styles.textoAcceso, Tipografia.estilos.BotonPrimario]}>
            Configurar Objetivos
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botonAcceso}
          onPress={onContactarTerapeuta}
          accessible={true}
          accessibilityLabel="Contactar terapeuta"
          accessibilityRole="button"
        >
          <Ionicons name="people" size={32} color={Colores.colorCalido} />
          <Text style={[styles.textoAcceso, Tipografia.estilos.BotonPrimario]}>
            Contactar Terapeuta
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderAlertas = () => {
    if (alertasVisible.length === 0) return null;

    return (
      <View style={styles.seccion}>
        <Text style={[styles.tituloSeccion, Tipografia.estilos.H2]}>
          Alertas Importantes
        </Text>

        {alertasVisible.map((alerta) => (
          <View key={alerta.id} style={[styles.tarjetaAlerta, {
            borderLeftColor: alerta.tipo === 'objetivo_completado' ? Colores.verdeJungla : 
                            alerta.tipo === 'recomendacion_terapeuta' ? Colores.colorCalido : 
                            Colores.amarillo
          }]}>
            <Text style={[styles.mensajeAlerta, Tipografia.estilos.Body]}>
              {alerta.mensaje}
            </Text>
            
            {alerta.accionRequerida && (
              <Text style={[styles.accionRequerida, Tipografia.estilos.Body, { color: Colores.azul }]}>
                {alerta.accionRequerida}
              </Text>
            )}
          </View>
        ))}
      </View>
    );
  };

  // =====================================================================================
  // RENDER PRINCIPAL
  // =====================================================================================

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      
      <ScrollView 
        style={styles.scrollContainer}
        refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={handleRefresh}
            colors={[Colores.azul]}
            tintColor={Colores.azul}
          />
        }
        showsVerticalScrollIndicator={false}
      >
        {renderAlertas()}
        {renderResumenSemanal()}
        {renderActividadesFavoritas()}
        {renderInsights()}
        {renderMisionesMundoReal()}
        {renderAccesosRapidos()}
        
        {/* Footer con estado de conexión */}
        <View style={styles.footer}>
          <View style={styles.estadoConexion}>
            <Ionicons 
              name={(metricas.estadoConexionIA === 'activa' ? 'wifi' : 
                   metricas.estadoConexionIA === 'limitada' ? 'wifi-outline' : 'wifi-off') as any} 
              size={16} 
              color={metricas.estadoConexionIA === 'activa' ? Colores.verdeJungla : 
                     metricas.estadoConexionIA === 'limitada' ? Colores.amarillo : 
                     Colores.rojo} 
            />
            <Text style={[styles.textoConexion, Tipografia.estilos.Body]}>
              IA {metricas.estadoConexionIA}
            </Text>
          </View>
          
          <Text style={[styles.ultimaActualizacion, Tipografia.estilos.Body]}>
            Actualizado: {metricas.ultimaActualizacion.toLocaleTimeString()}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// ========================================================================================
// ESTILOS
// ========================================================================================

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  // Layout principal
  container: {
    flex: 1,
    backgroundColor: Colores.grisClaro,
  },
  
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },

  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: Colores.contenedorBlanco,
    borderBottomWidth: 1,
    borderBottomColor: Colores.grisClaro,
  },

  headerTextos: {
    flex: 1,
  },

  saludo: {
    color: Colores.grisAdministrativo,
    marginBottom: 4,
  },

  subtituloHeader: {
    color: Colores.grisAdministrativo,
  },

  headerAcciones: {
    flexDirection: 'row',
    gap: 12,
  },

  botonHeader: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: Colores.grisClaro,
  },

  // Secciones
  seccion: {
    marginVertical: 12,
  },

  seccionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },

  tituloSeccion: {
    color: Colores.grisAdministrativo,
  },

  verMas: {
    fontWeight: '500',
  },

  // Resumen semanal
  tarjetaResumen: {
    backgroundColor: Colores.contenedorBlanco,
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: Colores.overlayNegro,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  metricas: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  metrica: {
    alignItems: 'center',
    flex: 1,
  },

  numeroMetrica: {
    color: Colores.azul,
    fontWeight: 'bold',
    marginBottom: 4,
  },

  labelMetrica: {
    color: Colores.grisAdministrativo,
    textAlign: 'center',
    fontSize: 12,
  },

  tendenciaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },

  // Actividades favoritas
  scrollActividades: {
    paddingVertical: 8,
  },

  tarjetaActividad: {
    backgroundColor: Colores.contenedorBlanco,
    borderRadius: 12,
    padding: 12,
    marginRight: 12,
    width: 140,
    alignItems: 'center',
    elevation: 2,
    shadowColor: Colores.overlayNegro,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  iconoActividad: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },

  nombreActividad: {
    color: Colores.grisAdministrativo,
    textAlign: 'center',
    marginBottom: 4,
    fontSize: 14,
  },

  estadoActividad: {
    color: Colores.grisAdministrativo,
    fontSize: 12,
    textAlign: 'center',
  },

  // Insights
  tarjetaInsight: {
    backgroundColor: Colores.contenedorBlanco,
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: Colores.overlayNegro,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    flexDirection: 'row',
  },

  barraLateral: {
    width: 4,
  },

  contenidoInsight: {
    flex: 1,
    padding: 16,
  },

  headerInsight: {
    marginBottom: 8,
  },

  tituloInsight: {
    color: Colores.grisAdministrativo,
    marginBottom: 4,
  },

  metadatosInsight: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  fechaInsight: {
    color: Colores.grisAdministrativo,
    fontSize: 12,
  },

  badgeTipo: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },

  textoTipo: {
    fontSize: 10,
    fontWeight: '500',
    textTransform: 'uppercase',
  },

  contenidoTextoInsight: {
    color: Colores.grisAdministrativo,
    lineHeight: 20,
    marginBottom: 12,
  },

  accionesInsight: {
    flexDirection: 'row',
    gap: 16,
  },

  botonAccionInsight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },

  textoAccionInsight: {
    fontWeight: '500',
    fontSize: 14,
  },

  // Misiones mundo real
  tarjetaMision: {
    backgroundColor: Colores.contenedorBlanco,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: Colores.overlayNegro,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  headerMision: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },

  tituloMision: {
    flex: 1,
    color: Colores.grisAdministrativo,
    marginRight: 8,
  },

  metadatosMision: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  badgeIA: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colores.amarillo + '20',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    gap: 2,
  },

  textoIA: {
    fontSize: 10,
    fontWeight: 'bold',
  },

  duracionMision: {
    color: Colores.grisAdministrativo,
    fontSize: 12,
  },

  descripcionMision: {
    color: Colores.grisAdministrativo,
    marginBottom: 12,
    lineHeight: 18,
  },

  footerMision: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  categoriaMision: {
    backgroundColor: Colores.azul + '20',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },

  textoCategoría: {
    color: Colores.azul,
    fontSize: 12,
    fontWeight: '500',
    textTransform: 'capitalize',
  },

  // Accesos rápidos
  gridAccesos: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },

  botonAcceso: {
    backgroundColor: Colores.contenedorBlanco,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    flex: 1,
    minWidth: (width - 48) / 3, // 3 columnas con márgenes
    elevation: 2,
    shadowColor: Colores.overlayNegro,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  textoAcceso: {
    color: Colores.grisAdministrativo,
    marginTop: 8,
    textAlign: 'center',
    fontSize: 12,
  },

  // Alertas
  tarjetaAlerta: {
    backgroundColor: Colores.contenedorBlanco,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    elevation: 2,
    shadowColor: Colores.overlayNegro,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  mensajeAlerta: {
    color: Colores.grisAdministrativo,
    marginBottom: 4,
  },

  accionRequerida: {
    fontWeight: '500',
  },

  // Footer
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    marginTop: 20,
    backgroundColor: Colores.contenedorBlanco,
    borderRadius: 12,
    elevation: 1,
    shadowColor: Colores.overlayNegro,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },

  estadoConexion: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },

  textoConexion: {
    color: Colores.grisAdministrativo,
    fontSize: 12,
  },

  ultimaActualizacion: {
    color: Colores.grisAdministrativo,
    fontSize: 12,
  },
});

export default DashboardPortalScreen;