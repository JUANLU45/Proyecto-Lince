/**
 * Exports centralizados de pantallas
 * Basado en: Mandamiento 📂 - Imports desde directorios centralizados
 *
 * Todas las pantallas exportadas desde un único punto
 * para facilitar imports y mantenimiento.
 */

// Flujo inicial
export { default as SplashScreen } from './SplashScreen';
export { default as WelcomeScreen } from './WelcomeScreen';
export { default as TutorialScreen } from './TutorialScreen';

// Flujo principal de la aplicación
export { default as MainMapScreen } from './MainMapScreen';
export { default as IslandScreen } from './IslandScreen';

// Flujo de actividades
export { default as PreActivityScreen } from './PreActivityScreen';
export { default as VideoModelingScreen } from './VideoModelingScreen';
export { default as ActivityScreen } from './ActivityScreen';
export { default as RewardScreen } from './RewardScreen';

// Rincón de calma
export { default as CalmCornerScreen } from './CalmCornerScreen';

// Portal de padres
export { default as ParentDashboardScreen } from './ParentDashboardScreen';
export { default as ProgressDetailScreen } from './ProgressDetailScreen';
export { default as AISuggestionsScreen } from './AISuggestionsScreen';

// Configuración
export { default as SettingsScreen } from './SettingsScreen';
