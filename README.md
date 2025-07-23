# Calculadora de Taxas - Mobile App

Uma calculadora de taxas para dispositivos móveis, desenvolvida com React e Expo.

## 🚀 Como gerar o APK

### Pré-requisitos
1. Conta no Expo (gratuita): https://expo.dev/signup
2. EAS CLI instalado globalmente

### Passos para gerar o APK:

1. **Login no Expo**
   ```bash
   eas login
   ```

2. **Configurar o projeto**
   ```bash
   eas build:configure
   ```

3. **Gerar o APK**
   ```bash
   eas build --platform android --profile preview
   ```

4. **Aguardar o build**
   - O processo será executado na nuvem
   - Você receberá um link para download do APK
   - O build leva aproximadamente 5-10 minutos

### Comandos úteis:

- `npm start` - Inicia o servidor de desenvolvimento
- `npm run android` - Abre no emulador Android
- `npm run web` - Abre no navegador
- `eas build:list` - Lista todos os builds
- `eas build --platform android --profile preview --clear-cache` - Build com cache limpo

### Perfis de Build:

- **preview**: Gera APK para testes (não precisa de assinatura)
- **production**: Gera AAB para Google Play Store (precisa de assinatura)

### Estrutura do Projeto:

```
├── src/
│   └── App.tsx          # Componente principal da calculadora
├── resources/
│   └── app-icon.png     # Ícone do aplicativo
├── app.json             # Configurações do Expo
├── eas.json             # Configurações do EAS Build
└── package.json         # Dependências e scripts
```

### Funcionalidades:

- ✅ Calculadora de taxas com diferentes formas de pagamento
- ✅ Suporte a parcelamento
- ✅ Interface responsiva
- ✅ Formatação de moeda brasileira
- ✅ Toggle para repassar taxas
- ✅ Teclado numérico integrado

### Troubleshooting:

Se houver problemas com o build:
1. Verifique se está logado: `eas whoami`
2. Limpe o cache: `--clear-cache`
3. Verifique as configurações em `eas.json`

Para mais informações: https://docs.expo.dev/build/setup/