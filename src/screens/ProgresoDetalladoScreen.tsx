import React, { useState, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  Share,
  ActivityIndicator,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

// Imports centralizados obligatorios
import { Colores } from '../constants/colors';
import { Tipografia } from '../constants/typography';

/**
 * Pantalla 12: Progreso Detallado
 * Análisis profundo del desarrollo del niño según APP_BLUEPRINT.md líneas 183-197
 * 
 * Características principales:
 * - Gráficos de progreso por área sensorial (vestibular, táctil, auditiva, visual)
 * - Tendencias temporales (diario, semanal, mensual) 
 * - Comparación con hitos típicos sin crear presión
 * - Análisis de patrones: horarios engagement, actividades respuesta, optimización
 * - Exportar reportes PDF para terapeutas y datos legibles padres
 * - Dashboard métricas según DESIGN_SYSTEM.md
 */

// ========================================================================================
// INTERFACES Y TIPOS
// ========================================================================================

interface AreaSensorial {
  id: string;
  nombre: string;
  tipo: 'vestibular' | 'tactil' | 'auditiva' | 'visual' | 'propioceptiva';
  puntuacionActual: number; // 0-100
  puntuacionAnterior: number;
  objetivo: number;
  color: keyof typeof Colores;
  tendencia: 'mejorando' | 'estable' | 'necesita_atencion';
  ultimaEvaluacion: Date;
}

interface DatosProgreso {
  fecha: Date;
  valor: number;
  area: AreaSensorial['tipo'];
  sesionId?: string;
}

interface HitoTipico {
  edad: number; // en meses
  descripcion: string;
  area: AreaSensorial['tipo'];
  valorEsperado: number; // 0-100
  rango: [number, number]; // rango típico [min, max]
}

interface PatronEngagement {
  horaInicio: number; // 0-23
  horaFin: number;
  nivelEngagement: number; // 0-100
  actividadesRealizadas: number;
  duracionPromedio: number; // en minutos
  diasSemana: number[]; // 0=domingo, 6=sábado
}

interface ActividadRespuesta {
  id: string;
  nombre: string;
  categoria: AreaSensorial['tipo'];
  puntuacionPromedio: number;
  tiempoPromedio: number;
  frecuenciaUso: number;
  tendenciaRespuesta: 'mejorando' | 'estable' | 'declinando';
  ultimoUso: Date;
  sugerenciaOptimizacion?: string;
}

interface SugerenciaOptimizacion {
  id: string;
  tipo: 'horario' | 'actividad' | 'duracion' | 'frecuencia';
  prioridad: 'alta' | 'media' | 'baja';
  descripcion: string;
  impactoEsperado: string;
  implementacion: string;
  fechaGeneracion: Date;
  basadaEnIA: boolean;
}

interface ReporteExportacion {
  formato: 'pdf_terapeuta' | 'pdf_padres' | 'csv_datos' | 'json_completo';
  periodo: 'ultima_semana' | 'ultimo_mes' | 'ultimo_trimestre' | 'personalizado';
  fechaInicio?: Date;
  fechaFin?: Date;
  incluirHitos: boolean;
  incluirSugerencias: boolean;
  incluirGraficos: boolean;
}

interface AnalisisCompleto {
  resumenGeneral: {
    progresoGlobal: number;
    tendenciaGlobal: 'mejorando' | 'estable' | 'necesita_atencion';
    areasFortaleza: AreaSensorial[];
    areasAtencion: AreaSensorial[];
    comparacionHitos: 'por_encima' | 'dentro_rango' | 'por_debajo';
  };
  areasSensoriales: AreaSensorial[];
  datosProgreso: DatosProgreso[];
  hitosComparacion: HitoTipico[];
  patronesEngagement: PatronEngagement[];
  actividadesRespuesta: ActividadRespuesta[];
  sugerenciasOptimizacion: SugerenciaOptimizacion[];
  ultimaActualizacion: Date;
  perfilNino: {
    id: string;
    nombre: string;
    edad: number; // en meses
    fechaNacimiento: Date;
    fechaRegistro: Date;
    preferencias: string[];
  };
}

export interface ProgresoDetalladoScreenProps {
  analisis: AnalisisCompleto;
  periodoSeleccionado: 'diario' | 'semanal' | 'mensual';
  onCambioPeriodo: (periodo: 'diario' | 'semanal' | 'mensual') => void;
  onExportarReporte: (configuracion: ReporteExportacion) => Promise<void>;
  onActualizarDatos: () => Promise<void>;
  onVerDetalleArea: (area: AreaSensorial) => void;
  onAplicarSugerencia: (sugerencia: SugerenciaOptimizacion) => void;
  onVerHito: (hito: HitoTipico) => void;
  onRegresar: () => void;
}

// ========================================================================================
// COMPONENTE PRINCIPAL
// ========================================================================================

const ProgresoDetalladoScreen: React.FC<ProgresoDetalladoScreenProps> = ({
  analisis,
  periodoSeleccionado,
  onCambioPeriodo,
  onExportarReporte,
  onActualizarDatos,
  onVerDetalleArea,
  onAplicarSugerencia,
  onVerHito,
  onRegresar,
}) => {
  // =====================================================================================
  // ESTADO Y HOOKS
  // =====================================================================================
  
  const [cargandoActualizacion, setCargandoActualizacion] = useState(false);
  const [vistaSeleccionada, setVistaSeleccionada] = useState<'general' | 'areas' | 'patrones' | 'exportar'>('general');
  const [areaExpandida, setAreaExpandida] = useState<string | null>(null);
  const [mostrandoComparacionHitos, setMostrandoComparacionHitos] = useState(false);


  // =====================================================================================
  // EFECTOS DE CICLO DE VIDA
  // =====================================================================================

  // Actualizar datos al enfocar pantalla
  useFocusEffect(
    useCallback(() => {
      const verificarActualizacionNecesaria = async () => {
        const tiempoTranscurrido = Date.now() - analisis.ultimaActualizacion.getTime();
        
        // Actualizar si han pasado más de 15 minutos
        if (tiempoTranscurrido > 15 * 60 * 1000) {
          try {
            await onActualizarDatos();
          } catch (error) {
            console.warn('Error actualizando análisis progreso:', error);
          }
        }
      };

      verificarActualizacionNecesaria();
    }, [analisis.ultimaActualizacion, onActualizarDatos])
  );

  // =====================================================================================
  // HANDLERS DE EVENTOS
  // =====================================================================================

  const handleActualizarDatos = useCallback(async () => {
    setCargandoActualizacion(true);
    try {
      await onActualizarDatos();
    } catch (error) {
      console.error('Error actualizando datos:', error);
      Alert.alert(
        'Error de Actualización',
        'No se pudieron actualizar los datos de progreso. Verifica tu conexión.',
        [{ text: 'OK' }]
      );
    } finally {
      setCargandoActualizacion(false);
    }
  }, [onActualizarDatos]);

  const handleExportarReporte = useCallback(async (formato: ReporteExportacion['formato']) => {
    try {
      const configuracion: ReporteExportacion = {
        formato,
        periodo: 'ultimo_mes',
        incluirHitos: formato === 'pdf_terapeuta',
        incluirSugerencias: true,
        incluirGraficos: formato !== 'csv_datos',
      };

      await onExportarReporte(configuracion);
      
      Alert.alert(
        'Reporte Generado',
        `El reporte en formato ${formato} ha sido generado exitosamente.`,
        [{ text: 'OK' }]
      );
    } catch (error) {
      console.error('Error exportando reporte:', error);
      Alert.alert(
        'Error de Exportación',
        'No se pudo generar el reporte. Inténtalo de nuevo.',
        [{ text: 'OK' }]
      );
    }
  }, [onExportarReporte]);

  const handleCompartirProgreso = useCallback(async () => {
    try {
      const mensaje = `Progreso de ${analisis.perfilNino.nombre}:
      
📈 Progreso General: ${analisis.resumenGeneral.progresoGlobal}%
🎯 Tendencia: ${analisis.resumenGeneral.tendenciaGlobal}
📊 Áreas de Fortaleza: ${analisis.resumenGeneral.areasFortaleza.length}
⚠️ Áreas de Atención: ${analisis.resumenGeneral.areasAtencion.length}

Generado por Proyecto Lince el ${new Date().toLocaleDateString()}`;

      await Share.share({
        message: mensaje,
        title: `Progreso de ${analisis.perfilNino.nombre}`,
      });
    } catch (error) {
      console.error('Error compartiendo progreso:', error);
    }
  }, [analisis]);

  const handleVerDetalleArea = useCallback((area: AreaSensorial) => {
    setAreaExpandida(areaExpandida === area.id ? null : area.id);
  }, [areaExpandida]);

  // =====================================================================================
  // FUNCIONES AUXILIARES Y DATOS COMPUTADOS
  // =====================================================================================

  const obtenerColorTendencia = (tendencia: AreaSensorial['tendencia']): keyof typeof Colores => {
    switch (tendencia) {
      case 'mejorando': return 'verdeJungla';
      case 'estable': return 'azul';
      case 'necesita_atencion': return 'rojo';
      default: return 'grisAdministrativo';
    }
  };

  const obtenerIconoTendencia = (tendencia: AreaSensorial['tendencia']): string => {
    switch (tendencia) {
      case 'mejorando': return 'trending-up';
      case 'estable': return 'trending-flat';
      case 'necesita_atencion': return 'trending-down';
      default: return 'help';
    }
  };

  const datosGraficoGeneral = useMemo(() => {
    const areas = analisis.areasSensoriales;
    return {
      labels: areas.map(area => area.nombre.substring(0, 8)),
      datasets: [{
        data: areas.map(area => area.puntuacionActual),
        colors: areas.map(area => () => Colores[area.color]),
      }]
    };
  }, [analisis.areasSensoriales]);

  const datosGraficoTendencias = useMemo(() => {
    const ultimos30Dias = analisis.datosProgreso
      .filter(dato => {
        const diasAtras = (Date.now() - dato.fecha.getTime()) / (1000 * 60 * 60 * 24);
        return diasAtras <= 30;
      })
      .sort((a, b) => a.fecha.getTime() - b.fecha.getTime());

    if (ultimos30Dias.length === 0) return null;

    const agrupados = ultimos30Dias.reduce((acc, dato) => {
      const fechaKey = dato.fecha.toDateString();
      if (!acc[fechaKey]) {
        acc[fechaKey] = { fecha: dato.fecha, valores: [] };
      }
      acc[fechaKey].valores.push(dato.valor);
      return acc;
    }, {} as Record<string, { fecha: Date; valores: number[] }>);

    const labels = Object.values(agrupados)
      .slice(-7) // Últimos 7 días
      .map(grupo => grupo.fecha.getDate().toString());

    const data = Object.values(agrupados)
      .slice(-7)
      .map(grupo => grupo.valores.reduce((sum, val) => sum + val, 0) / grupo.valores.length);

    return { labels, datasets: [{ data }] };
  }, [analisis.datosProgreso, periodoSeleccionado]);

  const sugerenciasRankingPrioridad = useMemo(() => 
    [...analisis.sugerenciasOptimizacion]
      .sort((a, b) => {
        const prioridadOrden = { alta: 3, media: 2, baja: 1 };
        return prioridadOrden[b.prioridad] - prioridadOrden[a.prioridad];
      })
      .slice(0, 3), 
    [analisis.sugerenciasOptimizacion]
  );

  const hitosComparacionFiltrados = useMemo(() => {
    const edadNinoMeses = analisis.perfilNino.edad;
    return analisis.hitosComparacion.filter(hito => 
      Math.abs(hito.edad - edadNinoMeses) <= 6 // Hitos ±6 meses de la edad
    );
  }, [analisis.hitosComparacion, analisis.perfilNino.edad]);



  // =====================================================================================
  // RENDER DE SUBCOMPONENTES
  // =====================================================================================

  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.botonRegresar}
        onPress={onRegresar}
        accessible={true}
        accessibilityLabel="Regresar al dashboard"
        accessibilityRole="button"
      >
        <Ionicons name="arrow-back" size={24} color={Colores.azul} />
      </TouchableOpacity>

      <View style={styles.tituloContainer}>
        <Text style={[styles.titulo, Tipografia.estilos.H2]}>
          Progreso Detallado
        </Text>
        <Text style={[styles.subtitulo, Tipografia.estilos.Body]}>
          {analisis.perfilNino.nombre} • {Math.floor(analisis.perfilNino.edad / 12)} años
        </Text>
      </View>

      <View style={styles.accionesHeader}>
        <TouchableOpacity
          style={styles.botonHeader}
          onPress={handleCompartirProgreso}
          accessible={true}
          accessibilityLabel="Compartir progreso"
          accessibilityRole="button"
        >
          <Ionicons name="share-outline" size={20} color={Colores.azul} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.botonHeader, cargandoActualizacion && styles.botonDeshabilitado]}
          onPress={handleActualizarDatos}
          disabled={cargandoActualizacion}
          accessible={true}
          accessibilityLabel="Actualizar datos"
          accessibilityRole="button"
        >
          {cargandoActualizacion ? (
            <ActivityIndicator size="small" color={Colores.azul} />
          ) : (
            <Ionicons name="refresh" size={20} color={Colores.azul} />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderNavegacion = () => (
    <View style={styles.navegacion}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {[
          { key: 'general', label: 'General', icono: 'analytics' },
          { key: 'areas', label: 'Por Áreas', icono: 'layers' },
          { key: 'patrones', label: 'Patrones', icono: 'pulse' },
          { key: 'exportar', label: 'Exportar', icono: 'download' },
        ].map((vista) => (
          <TouchableOpacity
            key={vista.key}
            style={[
              styles.tabNavegacion,
              vistaSeleccionada === vista.key && styles.tabActivo
            ]}
            onPress={() => setVistaSeleccionada(vista.key as any)}
            accessible={true}
            accessibilityLabel={`Ver ${vista.label}`}
            accessibilityRole="button"
          >
            <Ionicons 
              name={vista.icono as any} 
              size={20} 
              color={vistaSeleccionada === vista.key ? Colores.azul : Colores.grisAdministrativo} 
            />
            <Text style={[
              styles.textoTab,
              Tipografia.estilos.Body,
              vistaSeleccionada === vista.key && { color: Colores.azul }
            ]}>
              {vista.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  const renderSelectorPeriodo = () => (
    <View style={styles.selectorPeriodo}>
      {['diario', 'semanal', 'mensual'].map((periodo) => (
        <TouchableOpacity
          key={periodo}
          style={[
            styles.botonPeriodo,
            periodoSeleccionado === periodo && styles.botonPeriodoActivo
          ]}
          onPress={() => onCambioPeriodo(periodo as any)}
          accessible={true}
          accessibilityLabel={`Ver progreso ${periodo}`}
          accessibilityRole="button"
        >
          <Text style={[
            styles.textoPeriodo,
            Tipografia.estilos.Body,
            periodoSeleccionado === periodo && { color: Colores.contenedorBlanco }
          ]}>
            {periodo.charAt(0).toUpperCase() + periodo.slice(1)}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderVistaGeneral = () => (
    <View style={styles.vista}>
      {/* Resumen ejecutivo */}
      <View style={styles.tarjeta}>
        <Text style={[styles.tituloSeccion, Tipografia.estilos.H2]}>
          Resumen Ejecutivo
        </Text>
        
        <View style={styles.metricas}>
          <View style={styles.metrica}>
            <Text style={[styles.numeroMetrica, Tipografia.estilos.H2, { color: Colores.azul }]}>
              {analisis.resumenGeneral.progresoGlobal}%
            </Text>
            <Text style={[styles.labelMetrica, Tipografia.estilos.Body]}>
              Progreso Global
            </Text>
          </View>

          <View style={styles.metrica}>
            <View style={styles.tendenciaContainer}>
              <Ionicons 
                name={obtenerIconoTendencia(analisis.resumenGeneral.tendenciaGlobal) as any}
                size={24} 
                color={Colores[obtenerColorTendencia(analisis.resumenGeneral.tendenciaGlobal)]} 
              />
              <Text style={[styles.textoTendencia, Tipografia.estilos.Body, {
                color: Colores[obtenerColorTendencia(analisis.resumenGeneral.tendenciaGlobal)]
              }]}>
                {analisis.resumenGeneral.tendenciaGlobal}
              </Text>
            </View>
            <Text style={[styles.labelMetrica, Tipografia.estilos.Body]}>
              Tendencia General
            </Text>
          </View>
        </View>

        <View style={styles.estadisticasRapidas}>
          <View style={styles.estadistica}>
            <Text style={[styles.numeroEstadistica, Tipografia.estilos.H2, { color: Colores.verdeJungla }]}>
              {analisis.resumenGeneral.areasFortaleza.length}
            </Text>
            <Text style={[styles.labelEstadistica, Tipografia.estilos.Body]}>
              Áreas Fortaleza
            </Text>
          </View>
          
          <View style={styles.estadistica}>
            <Text style={[styles.numeroEstadistica, Tipografia.estilos.H2, { color: Colores.amarillo }]}>
              {analisis.resumenGeneral.areasAtencion.length}
            </Text>
            <Text style={[styles.labelEstadistica, Tipografia.estilos.Body]}>
              Requieren Atención
            </Text>
          </View>
        </View>
      </View>

      {/* Gráfico de progreso general */}
      {datosGraficoGeneral && (
        <View style={styles.tarjeta}>
          <Text style={[styles.tituloSeccion, Tipografia.estilos.H2]}>
            Progreso por Áreas
          </Text>
          
          <View style={styles.graficoPorAreas}>
            {analisis.areasSensoriales.map((area) => (
              <View key={area.id} style={styles.barraArea}>
                <Text style={[styles.labelBarra, Tipografia.estilos.Body]}>
                  {area.nombre.substring(0, 10)}
                </Text>
                <View style={[styles.contenedorBarra, { backgroundColor: Colores[area.color] + '20' }]}>
                  <View 
                    style={[
                      styles.barraRelleno, 
                      { 
                        width: `${area.puntuacionActual}%`,
                        backgroundColor: Colores[area.color] 
                      }
                    ]} 
                  />
                </View>
                <Text style={[styles.valorBarra, Tipografia.estilos.Body]}>
                  {area.puntuacionActual}%
                </Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* Tendencias temporales */}
      {datosGraficoTendencias && (
        <View style={styles.tarjeta}>
          <Text style={[styles.tituloSeccion, Tipografia.estilos.H2]}>
            Tendencia Últimos 7 Días
          </Text>
          
          <View style={styles.graficoTendencias}>
            <Text style={[styles.descripcionGrafico, Tipografia.estilos.Body]}>
              Progreso promedio diario basado en {analisis.datosProgreso.length} sesiones
            </Text>
            
            <View style={styles.lineaTendencia}>
              {datosGraficoTendencias.labels.map((label, index) => (
                <View key={index} style={styles.puntoTendencia}>
                  <View 
                    style={[
                      styles.punto, 
                      { 
                        height: `${(datosGraficoTendencias.datasets[0]?.data[index] || 0) / 100 * 80}%`,
                        backgroundColor: Colores.azul 
                      }
                    ]} 
                  />
                  <Text style={[styles.labelPunto, Tipografia.estilos.Body]}>
                    {label}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      )}

      {/* Sugerencias principales */}
      <View style={styles.tarjeta}>
        <Text style={[styles.tituloSeccion, Tipografia.estilos.H2]}>
          Sugerencias Principales
        </Text>
        
        {sugerenciasRankingPrioridad.map((sugerencia) => (
          <TouchableOpacity
            key={sugerencia.id}
            style={styles.tarjetaSugerencia}
            onPress={() => onAplicarSugerencia(sugerencia)}
            accessible={true}
            accessibilityLabel={`Sugerencia: ${sugerencia.descripcion}`}
            accessibilityRole="button"
          >
            <View style={styles.headerSugerencia}>
              <View style={[styles.badgePrioridad, {
                backgroundColor: sugerencia.prioridad === 'alta' ? Colores.rojo : 
                                sugerencia.prioridad === 'media' ? Colores.amarillo : 
                                Colores.verdeJungla
              }]}>
                <Text style={[styles.textoPrioridad, Tipografia.estilos.Body]}>
                  {sugerencia.prioridad.toUpperCase()}
                </Text>
              </View>
              
              {sugerencia.basadaEnIA && (
                <View style={styles.badgeIA}>
                  <Ionicons name={"sparkles" as any} size={12} color={Colores.amarillo} />
                  <Text style={[styles.textoIA, Tipografia.estilos.Body]}>IA</Text>
                </View>
              )}
            </View>
            
            <Text style={[styles.descripcionSugerencia, Tipografia.estilos.Body]}>
              {sugerencia.descripcion}
            </Text>
            
            <Text style={[styles.impactoSugerencia, Tipografia.estilos.Body]}>
              💡 {sugerencia.impactoEsperado}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderVistaAreas = () => (
    <View style={styles.vista}>
      {analisis.areasSensoriales.map((area) => (
        <View key={area.id} style={styles.tarjeta}>
          <TouchableOpacity
            style={styles.headerArea}
            onPress={() => handleVerDetalleArea(area)}
            accessible={true}
            accessibilityLabel={`Ver detalles de ${area.nombre}`}
            accessibilityRole="button"
          >
            <View style={styles.infoArea}>
              <Text style={[styles.nombreArea, Tipografia.estilos.H2]}>
                {area.nombre}
              </Text>
              <Text style={[styles.puntuacionArea, Tipografia.estilos.H2, { color: Colores[area.color] }]}>
                {area.puntuacionActual}%
              </Text>
            </View>
            
            <View style={styles.tendenciaArea}>
              <Ionicons 
                name={obtenerIconoTendencia(area.tendencia) as any}
                size={20} 
                color={Colores[obtenerColorTendencia(area.tendencia)]} 
              />
              <Ionicons 
                name={areaExpandida === area.id ? "chevron-up" : "chevron-down"}
                size={20} 
                color={Colores.grisAdministrativo} 
              />
            </View>
          </TouchableOpacity>

          {areaExpandida === area.id && (
            <View style={styles.detalleArea}>
              <View style={styles.progresoArea}>
                <View style={styles.barraProgresoContainer}>
                  <View 
                    style={[
                      styles.barraProgreso, 
                      { backgroundColor: Colores[area.color] + '30' }
                    ]}
                  >
                    <View 
                      style={[
                        styles.barraProgresoFill,
                        { 
                          width: `${area.puntuacionActual}%`,
                          backgroundColor: Colores[area.color]
                        }
                      ]}
                    />
                  </View>
                  <Text style={[styles.textoObjetivo, Tipografia.estilos.Body]}>
                    Objetivo: {area.objetivo}%
                  </Text>
                </View>
              </View>

              <View style={styles.estadisticasArea}>
                <Text style={[styles.cambioAnterior, Tipografia.estilos.Body]}>
                  Cambio desde evaluación anterior: {' '}
                  <Text style={{ 
                    color: area.puntuacionActual >= area.puntuacionAnterior ? 
                           Colores.verdeJungla : Colores.rojo 
                  }}>
                    {area.puntuacionActual >= area.puntuacionAnterior ? '+' : ''}
                    {area.puntuacionActual - area.puntuacionAnterior} puntos
                  </Text>
                </Text>

                <Text style={[styles.ultimaEvaluacion, Tipografia.estilos.Body]}>
                  Última evaluación: {area.ultimaEvaluacion.toLocaleDateString()}
                </Text>
              </View>

              <TouchableOpacity
                style={styles.botonVerDetalle}
                onPress={() => onVerDetalleArea(area)}
                accessible={true}
                accessibilityLabel={`Ver análisis completo de ${area.nombre}`}
                accessibilityRole="button"
              >
                <Text style={[styles.textoVerDetalle, Tipografia.estilos.Body]}>
                  Ver Análisis Completo
                </Text>
                <Ionicons name="arrow-forward" size={16} color={Colores.azul} />
              </TouchableOpacity>
            </View>
          )}
        </View>
      ))}
    </View>
  );

  const renderVistaPatrones = () => (
    <View style={styles.vista}>
      {/* Patrones de engagement */}
      <View style={styles.tarjeta}>
        <Text style={[styles.tituloSeccion, Tipografia.estilos.H2]}>
          Patrones de Engagement
        </Text>
        
        {analisis.patronesEngagement.map((patron, index) => (
          <View key={index} style={styles.patronItem}>
            <View style={styles.headerPatron}>
              <Text style={[styles.horasPatron, Tipografia.estilos.BotonPrimario]}>
                {patron.horaInicio}:00 - {patron.horaFin}:00
              </Text>
              <View style={styles.metricas}>
                <Text style={[styles.metricaPatron, Tipografia.estilos.Body]}>
                  {patron.nivelEngagement}% engagement
                </Text>
              </View>
            </View>
            
            <View style={styles.detallesPatron}>
              <Text style={[styles.detalleTexto, Tipografia.estilos.Body]}>
                📱 {patron.actividadesRealizadas} actividades promedio
              </Text>
              <Text style={[styles.detalleTexto, Tipografia.estilos.Body]}>
                ⏱️ {patron.duracionPromedio} min por sesión
              </Text>
              <Text style={[styles.detalleTexto, Tipografia.estilos.Body]}>
                📅 {patron.diasSemana.length} días/semana activos
              </Text>
            </View>
          </View>
        ))}
      </View>

      {/* Actividades por respuesta */}
      <View style={styles.tarjeta}>
        <Text style={[styles.tituloSeccion, Tipografia.estilos.H2]}>
          Actividades por Respuesta
        </Text>
        
        {analisis.actividadesRespuesta
          .sort((a, b) => b.puntuacionPromedio - a.puntuacionPromedio)
          .slice(0, 5)
          .map((actividad) => (
          <View key={actividad.id} style={styles.actividadItem}>
            <View style={styles.headerActividad}>
              <View style={styles.infoActividad}>
                <Text style={[styles.nombreActividad, Tipografia.estilos.BotonPrimario]}>
                  {actividad.nombre}
                </Text>
                <Text style={[styles.categoriaActividad, Tipografia.estilos.Body]}>
                  {actividad.categoria}
                </Text>
              </View>
              
              <View style={styles.metricas}>
                <Text style={[styles.puntuacionActividad, Tipografia.estilos.H2, { color: Colores.verdeJungla }]}>
                  {Math.round(actividad.puntuacionPromedio)}%
                </Text>
              </View>
            </View>
            
            <View style={styles.estadisticasActividad}>
              <Text style={[styles.estadisticaTexto, Tipografia.estilos.Body]}>
                ⏱️ {actividad.tiempoPromedio} min promedio • 📊 {actividad.frecuenciaUso}% frecuencia
              </Text>
              
              {actividad.sugerenciaOptimizacion && (
                <Text style={[styles.sugerenciaActividad, Tipografia.estilos.Body, { color: Colores.azul }]}>
                  💡 {actividad.sugerenciaOptimizacion}
                </Text>
              )}
            </View>
          </View>
        ))}
      </View>

      {/* Comparación con hitos */}
      <View style={styles.tarjeta}>
        <View style={styles.headerHitos}>
          <Text style={[styles.tituloSeccion, Tipografia.estilos.H2]}>
            Comparación con Hitos Típicos
          </Text>
          
          <TouchableOpacity
            style={styles.botonToggleHitos}
            onPress={() => setMostrandoComparacionHitos(!mostrandoComparacionHitos)}
            accessible={true}
            accessibilityLabel="Alternar vista de comparación de hitos"
            accessibilityRole="button"
          >
            <Text style={[styles.textoToggle, Tipografia.estilos.Body, { color: Colores.azul }]}>
              {mostrandoComparacionHitos ? 'Ocultar' : 'Mostrar'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.indicadorComparacion}>
          <View style={[styles.indicador, {
            backgroundColor: analisis.resumenGeneral.comparacionHitos === 'por_encima' ? Colores.verdeJungla :
                            analisis.resumenGeneral.comparacionHitos === 'dentro_rango' ? Colores.azul :
                            Colores.amarillo
          }]}>
            <Text style={[styles.textoIndicador, Tipografia.estilos.Body, { color: Colores.contenedorBlanco }]}>
              {analisis.resumenGeneral.comparacionHitos === 'por_encima' ? 'Por encima del rango típico' :
               analisis.resumenGeneral.comparacionHitos === 'dentro_rango' ? 'Dentro del rango típico' :
               'Progreso personalizado'}
            </Text>
          </View>
        </View>

        {mostrandoComparacionHitos && (
          <View style={styles.listaHitos}>
            {hitosComparacionFiltrados.map((hito, index) => (
              <TouchableOpacity
                key={index}
                style={styles.hitoItem}
                onPress={() => onVerHito(hito)}
                accessible={true}
                accessibilityLabel={`Hito: ${hito.descripcion}`}
                accessibilityRole="button"
              >
                <View style={styles.infoHito}>
                  <Text style={[styles.edadHito, Tipografia.estilos.BotonPrimario]}>
                    {Math.floor(hito.edad / 12)} años {hito.edad % 12} meses
                  </Text>
                  <Text style={[styles.descripcionHito, Tipografia.estilos.Body]}>
                    {hito.descripcion}
                  </Text>
                </View>
                
                <View style={styles.valorHito}>
                  <Text style={[styles.rangoHito, Tipografia.estilos.Body]}>
                    {hito.rango[0]}-{hito.rango[1]}%
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    </View>
  );

  const renderVistaExportar = () => (
    <View style={styles.vista}>
      <View style={styles.tarjeta}>
        <Text style={[styles.tituloSeccion, Tipografia.estilos.H2]}>
          Exportar Reportes
        </Text>
        
        <Text style={[styles.descripcionExportar, Tipografia.estilos.Body]}>
          Genera reportes personalizados para compartir con terapeutas o para tu uso personal.
        </Text>

        <View style={styles.opcionesExportar}>
          <TouchableOpacity
            style={styles.opcionExportar}
            onPress={() => handleExportarReporte('pdf_terapeuta')}
            accessible={true}
            accessibilityLabel="Exportar reporte para terapeuta en PDF"
            accessibilityRole="button"
          >
            <View style={styles.iconoExportar}>
              <Ionicons name="medical" size={32} color={Colores.verdeJungla} />
            </View>
            <View style={styles.textoExportar}>
              <Text style={[styles.tituloOpcion, Tipografia.estilos.BotonPrimario]}>
                Reporte para Terapeuta
              </Text>
              <Text style={[styles.descripcionOpcion, Tipografia.estilos.Body]}>
                PDF técnico con análisis detallado, gráficos y comparación con hitos de desarrollo
              </Text>
            </View>
            <Ionicons name="download" size={20} color={Colores.azul} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.opcionExportar}
            onPress={() => handleExportarReporte('pdf_padres')}
            accessible={true}
            accessibilityLabel="Exportar reporte para padres en PDF"
            accessibilityRole="button"
          >
            <View style={styles.iconoExportar}>
              <Ionicons name="people" size={32} color={Colores.colorCalido} />
            </View>
            <View style={styles.textoExportar}>
              <Text style={[styles.tituloOpcion, Tipografia.estilos.BotonPrimario]}>
                Reporte para Padres
              </Text>
              <Text style={[styles.descripcionOpcion, Tipografia.estilos.Body]}>
                PDF amigable con resumen de progreso, logros y sugerencias para casa
              </Text>
            </View>
            <Ionicons name="download" size={20} color={Colores.azul} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.opcionExportar}
            onPress={() => handleExportarReporte('csv_datos')}
            accessible={true}
            accessibilityLabel="Exportar datos en formato CSV"
            accessibilityRole="button"
          >
            <View style={styles.iconoExportar}>
              <Ionicons name="document" size={32} color={Colores.azul} />
            </View>
            <View style={styles.textoExportar}>
              <Text style={[styles.tituloOpcion, Tipografia.estilos.BotonPrimario]}>
                Datos CSV
              </Text>
              <Text style={[styles.descripcionOpcion, Tipografia.estilos.Body]}>
                Archivo de datos sin procesar para análisis personalizado
              </Text>
            </View>
            <Ionicons name="download" size={20} color={Colores.azul} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.opcionExportar}
            onPress={() => handleExportarReporte('json_completo')}
            accessible={true}
            accessibilityLabel="Exportar datos completos en JSON"
            accessibilityRole="button"
          >
            <View style={styles.iconoExportar}>
              <Ionicons name="code" size={32} color={Colores.grisAdministrativo} />
            </View>
            <View style={styles.textoExportar}>
              <Text style={[styles.tituloOpcion, Tipografia.estilos.BotonPrimario]}>
                Datos Completos JSON
              </Text>
              <Text style={[styles.descripcionOpcion, Tipografia.estilos.Body]}>
                Exportación completa de todos los datos en formato técnico
              </Text>
            </View>
            <Ionicons name="download" size={20} color={Colores.azul} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.tarjeta}>
        <Text style={[styles.tituloSeccion, Tipografia.estilos.H2]}>
          Información del Reporte
        </Text>
        
        <View style={styles.infoReporte}>
          <View style={styles.itemInfo}>
            <Ionicons name="calendar" size={16} color={Colores.grisAdministrativo} />
            <Text style={[styles.textoInfo, Tipografia.estilos.Body]}>
              Período: {periodoSeleccionado}
            </Text>
          </View>
          
          <View style={styles.itemInfo}>
            <Ionicons name="time" size={16} color={Colores.grisAdministrativo} />
            <Text style={[styles.textoInfo, Tipografia.estilos.Body]}>
              Última actualización: {analisis.ultimaActualizacion.toLocaleString()}
            </Text>
          </View>
          
          <View style={styles.itemInfo}>
            <Ionicons name="bar-chart" size={16} color={Colores.grisAdministrativo} />
            <Text style={[styles.textoInfo, Tipografia.estilos.Body]}>
              {analisis.datosProgreso.length} puntos de datos disponibles
            </Text>
          </View>
        </View>
      </View>
    </View>
  );

  // =====================================================================================
  // RENDER PRINCIPAL
  // =====================================================================================

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      {renderNavegacion()}
      {renderSelectorPeriodo()}
      
      <ScrollView 
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {vistaSeleccionada === 'general' && renderVistaGeneral()}
        {vistaSeleccionada === 'areas' && renderVistaAreas()}
        {vistaSeleccionada === 'patrones' && renderVistaPatrones()}
        {vistaSeleccionada === 'exportar' && renderVistaExportar()}
      </ScrollView>
    </SafeAreaView>
  );
};

// ========================================================================================
// ESTILOS
// ========================================================================================

const styles = StyleSheet.create({
  // Layout principal
  container: {
    flex: 1,
    backgroundColor: Colores.grisClaro,
  },

  scrollContainer: {
    flex: 1,
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: Colores.contenedorBlanco,
    borderBottomWidth: 1,
    borderBottomColor: Colores.grisClaro,
  },

  botonRegresar: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: Colores.grisClaro,
    marginRight: 16,
  },

  tituloContainer: {
    flex: 1,
  },

  titulo: {
    color: Colores.grisAdministrativo,
    marginBottom: 2,
  },

  subtitulo: {
    color: Colores.grisAdministrativo,
    opacity: 0.7,
  },

  accionesHeader: {
    flexDirection: 'row',
    gap: 8,
  },

  botonHeader: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: Colores.grisClaro,
  },

  botonDeshabilitado: {
    opacity: 0.5,
  },

  // Navegación
  navegacion: {
    backgroundColor: Colores.contenedorBlanco,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colores.grisClaro,
  },

  tabNavegacion: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: Colores.grisClaro,
    gap: 6,
  },

  tabActivo: {
    backgroundColor: Colores.azul + '20',
  },

  textoTab: {
    color: Colores.grisAdministrativo,
    fontSize: 14,
  },

  // Selector de período
  selectorPeriodo: {
    flexDirection: 'row',
    margin: 16,
    backgroundColor: Colores.contenedorBlanco,
    borderRadius: 12,
    padding: 4,
  },

  botonPeriodo: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },

  botonPeriodoActivo: {
    backgroundColor: Colores.azul,
  },

  textoPeriodo: {
    color: Colores.grisAdministrativo,
    fontWeight: '500',
  },

  // Vistas
  vista: {
    padding: 16,
    gap: 16,
  },

  // Tarjetas
  tarjeta: {
    backgroundColor: Colores.contenedorBlanco,
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: Colores.overlayNegro,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  tituloSeccion: {
    color: Colores.grisAdministrativo,
    marginBottom: 16,
  },

  // Vista general - métricas
  metricas: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },

  metrica: {
    alignItems: 'center',
    flex: 1,
  },

  numeroMetrica: {
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
    marginBottom: 4,
  },

  textoTendencia: {
    fontWeight: '500',
    textTransform: 'capitalize',
  },

  estadisticasRapidas: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: Colores.grisClaro,
  },

  estadistica: {
    alignItems: 'center',
  },

  numeroEstadistica: {
    marginBottom: 4,
  },

  labelEstadistica: {
    color: Colores.grisAdministrativo,
    fontSize: 12,
  },

  // Gráficos
  grafico: {
    marginVertical: 8,
    borderRadius: 16,
  },

  // Sugerencias
  tarjetaSugerencia: {
    backgroundColor: Colores.grisClaro,
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },

  headerSugerencia: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },

  badgePrioridad: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },

  textoPrioridad: {
    color: Colores.contenedorBlanco,
    fontSize: 10,
    fontWeight: 'bold',
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
    color: Colores.amarillo,
    fontSize: 10,
    fontWeight: 'bold',
  },

  descripcionSugerencia: {
    color: Colores.grisAdministrativo,
    marginBottom: 4,
  },

  impactoSugerencia: {
    color: Colores.azul,
    fontSize: 12,
    fontStyle: 'italic',
  },

  // Vista áreas
  headerArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  infoArea: {
    flex: 1,
  },

  nombreArea: {
    color: Colores.grisAdministrativo,
    marginBottom: 4,
  },

  puntuacionArea: {
    fontWeight: 'bold',
  },

  tendenciaArea: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  detalleArea: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: Colores.grisClaro,
  },

  progresoArea: {
    marginBottom: 12,
  },

  barraProgresoContainer: {
    marginBottom: 8,
  },

  barraProgreso: {
    height: 8,
    borderRadius: 4,
    marginBottom: 4,
  },

  barraProgresoFill: {
    height: '100%',
    borderRadius: 4,
  },

  textoObjetivo: {
    color: Colores.grisAdministrativo,
    fontSize: 12,
  },

  estadisticasArea: {
    gap: 4,
    marginBottom: 12,
  },

  cambioAnterior: {
    color: Colores.grisAdministrativo,
  },

  ultimaEvaluacion: {
    color: Colores.grisAdministrativo,
    fontSize: 12,
  },

  botonVerDetalle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    padding: 8,
    backgroundColor: Colores.azul + '10',
    borderRadius: 6,
  },

  textoVerDetalle: {
    color: Colores.azul,
    fontWeight: '500',
  },

  // Vista patrones
  patronItem: {
    backgroundColor: Colores.grisClaro,
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },

  headerPatron: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },

  horasPatron: {
    color: Colores.azul,
  },

  metricaPatron: {
    color: Colores.verdeJungla,
    fontWeight: '500',
  },

  detallesPatron: {
    gap: 4,
  },

  detalleTexto: {
    color: Colores.grisAdministrativo,
    fontSize: 12,
  },

  // Actividades
  actividadItem: {
    backgroundColor: Colores.grisClaro,
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },

  headerActividad: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },

  infoActividad: {
    flex: 1,
  },

  nombreActividad: {
    color: Colores.grisAdministrativo,
    marginBottom: 2,
  },

  categoriaActividad: {
    color: Colores.grisAdministrativo,
    fontSize: 12,
    textTransform: 'capitalize',
  },

  puntuacionActividad: {
    fontWeight: 'bold',
  },

  estadisticasActividad: {
    gap: 4,
  },

  estadisticaTexto: {
    color: Colores.grisAdministrativo,
    fontSize: 12,
  },

  sugerenciaActividad: {
    fontSize: 12,
    fontStyle: 'italic',
  },

  // Hitos
  headerHitos: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },

  botonToggleHitos: {
    padding: 8,
  },

  textoToggle: {
    fontWeight: '500',
  },

  indicadorComparacion: {
    marginBottom: 16,
  },

  indicador: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },

  textoIndicador: {
    fontWeight: '500',
  },

  listaHitos: {
    gap: 8,
  },

  hitoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colores.grisClaro,
    padding: 12,
    borderRadius: 8,
  },

  infoHito: {
    flex: 1,
  },

  edadHito: {
    color: Colores.azul,
    marginBottom: 2,
  },

  descripcionHito: {
    color: Colores.grisAdministrativo,
  },

  valorHito: {
    alignItems: 'flex-end',
  },

  rangoHito: {
    color: Colores.grisAdministrativo,
    fontSize: 12,
  },

  // Vista exportar
  descripcionExportar: {
    color: Colores.grisAdministrativo,
    marginBottom: 16,
    lineHeight: 20,
  },

  opcionesExportar: {
    gap: 12,
  },

  opcionExportar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colores.grisClaro,
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },

  iconoExportar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colores.contenedorBlanco,
    justifyContent: 'center',
    alignItems: 'center',
  },

  textoExportar: {
    flex: 1,
  },

  tituloOpcion: {
    color: Colores.grisAdministrativo,
    marginBottom: 4,
  },

  descripcionOpcion: {
    color: Colores.grisAdministrativo,
    fontSize: 12,
    lineHeight: 16,
  },

  infoReporte: {
    gap: 12,
  },

  itemInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  textoInfo: {
    color: Colores.grisAdministrativo,
  },

  // Gráficos personalizados
  graficoPorAreas: {
    gap: 12,
  },

  barraArea: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  labelBarra: {
    width: 80,
    fontSize: 12,
    color: Colores.grisAdministrativo,
  },

  contenedorBarra: {
    flex: 1,
    height: 20,
    borderRadius: 10,
    overflow: 'hidden',
  },

  barraRelleno: {
    height: '100%',
    borderRadius: 10,
    minWidth: 4,
  },

  valorBarra: {
    width: 40,
    textAlign: 'right',
    fontSize: 12,
    color: Colores.grisAdministrativo,
    fontWeight: '500',
  },

  graficoTendencias: {
    gap: 12,
  },

  descripcionGrafico: {
    color: Colores.grisAdministrativo,
    fontSize: 12,
    textAlign: 'center',
  },

  lineaTendencia: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: 120,
    paddingVertical: 20,
  },

  puntoTendencia: {
    alignItems: 'center',
    flex: 1,
  },

  punto: {
    width: 4,
    backgroundColor: Colores.azul,
    borderRadius: 2,
    marginBottom: 8,
    minHeight: 4,
  },

  labelPunto: {
    fontSize: 10,
    color: Colores.grisAdministrativo,
    textAlign: 'center',
  },
});

export default ProgresoDetalladoScreen;