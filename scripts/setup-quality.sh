# 🚨 SCRIPTS DE VERIFICACIÓN PROYECTO LINCE
# Sistema automatizado de control de calidad

# INSTALAR DEPENDENCIAS DE DESARROLLO
npm install --save-dev \
  eslint \
  @typescript-eslint/eslint-plugin \
  @typescript-eslint/parser \
  eslint-plugin-react \
  eslint-plugin-react-hooks \
  eslint-plugin-react-native \
  eslint-plugin-import \
  eslint-plugin-jsx-a11y \
  eslint-config-expo \
  prettier \
  jest \
  @testing-library/react-native \
  @testing-library/jest-native \
  ts-jest \
  jest-junit \
  jest-watch-typeahead \
  husky \
  lint-staged \
  identity-obj-proxy \
  whatwg-fetch

# CONFIGURAR HUSKY
npx husky install
npx husky add .husky/pre-commit "npm run pre-commit"
npx husky add .husky/commit-msg "npm run commit-msg"

echo "✅ Configuración de detección de errores completada"
echo "🔍 El sistema detectará automáticamente:"
echo "   - Funciones con complejidad > 15"
echo "   - Archivos con > 300 líneas"
echo "   - Código placebo (TODO, console.log, etc.)"
echo "   - Errores de TypeScript"
echo "   - Problemas de accesibilidad"
echo "   - Violaciones del Design System"
echo ""
echo "🚀 Para verificar el proyecto completo ejecuta:"
echo "   npm run verify:all"