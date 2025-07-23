# Calculadora de Taxas

Uma calculadora de taxas para pagamentos com diferentes formas de pagamento.

## Como gerar o APK

### Pré-requisitos
1. **Android Studio** instalado
2. **Java JDK 11 ou superior**
3. **Android SDK** configurado

### Passos para gerar o APK

1. **Instalar dependências:**
   ```bash
   npm install
   ```

2. **Fazer build da aplicação:**
   ```bash
   npm run build
   ```

3. **Sincronizar com o Capacitor:**
   ```bash
   npx cap sync android
   ```

4. **Abrir no Android Studio:**
   ```bash
   npx cap open android
   ```

5. **No Android Studio:**
   - Aguarde o projeto carregar completamente
   - Vá em `Build` → `Build Bundle(s) / APK(s)` → `Build APK(s)`
   - Ou use o atalho: `Ctrl+Shift+A` e digite "Build APK"

6. **Localizar o APK:**
   - O APK será gerado em: `android/app/build/outputs/apk/debug/app-debug.apk`

### Gerar APK assinado para produção

1. **Criar keystore (primeira vez):**
   ```bash
   keytool -genkey -v -keystore calculadora-release-key.keystore -alias calculadora -keyalg RSA -keysize 2048 -validity 10000
   ```

2. **No Android Studio:**
   - Vá em `Build` → `Generate Signed Bundle / APK`
   - Selecione `APK`
   - Escolha o keystore criado
   - Selecione `release` como build type

### Comandos úteis

- **Atualizar após mudanças no código:**
  ```bash
  npm run build && npx cap sync android
  ```

- **Ver logs do dispositivo:**
  ```bash
  npx cap run android
  ```

- **Limpar cache:**
  ```bash
  npx cap clean android
  ```

## Estrutura do Projeto

- `src/` - Código fonte da aplicação React
- `android/` - Projeto Android nativo gerado pelo Capacitor
- `dist/` - Build da aplicação web
- `capacitor.config.ts` - Configurações do Capacitor