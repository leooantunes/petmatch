/**
 * GUIA DE INSTALAÇÃO E USO - PUSH NOTIFICATIONS
 * ==============================================
 *
 * Passos para configurar e usar o sistema de push notifications no PetMatch
 */

// ============================================================================
// PASSO 1: INSTALAR DEPENDÊNCIA
// ============================================================================

/**
 * Execute estes comandos:
 *
 * npm install expo-notifications
 *
 * OU
 *
 * yarn add expo-notifications
 *
 * Se estiver usando EAS:
 * eas build --platform android
 * eas build --platform ios
 */

// ============================================================================
// PASSO 2: VERIFICAR CONFIGURAÇÃO DO APP
// ============================================================================

/**
 * A configuração do app.json já deve incluir:
 * (Verificar se está presente)
 *
 * Android:
 * ────────
 * "android": {
 *   "permissions": [
 *     "android.permission.CAMERA",
 *     "android.permission.READ_EXTERNAL_STORAGE",
 *     "android.permission.WRITE_EXTERNAL_STORAGE",
 *     "android.permission.READ_MEDIA_IMAGES",
 *     "android.permission.INTERNET",
 *     "android.permission.RECORD_AUDIO"
 *   ]
 * }
 *
 * iOS:
 * ────
 * "ios": {
 *   "infoPlist": {
 *     "NSCameraUsageDescription": "...",
 *     "NSPhotoLibraryUsageDescription": "..."
 *   }
 * }
 */

// ============================================================================
// PASSO 3: INICIALIZAR APP COM PROVIDER
// ============================================================================

/**
 * O arquivo app/_layout.tsx já foi modificado com:
 *
 * - Import de NotificationProvider
 * - Import de useNotificationSetup
 * - Envolvimento do app com NotificationProvider
 * - Chamada de useNotificationSetup() em RootLayoutContent
 *
 * Verificar que está assim:
 */

/*
import { NotificationProvider } from "./contexts/NotificationContext";
import { useNotificationSetup } from "./hooks/useNotificationSetup";

function RootLayoutContent() {
  // ... código existente ...
  useNotificationSetup();
  // ... código existente ...
}

export default function RootLayout() {
  return (
    <NotificationProvider>
      <RootLayoutContent />
    </NotificationProvider>
  );
}
*/

// ============================================================================
// PASSO 4: VERIFICAR ARQUIVOS CRIADOS
// ============================================================================

/**
 * Confirmar que estes arquivos existem:
 *
 * ✓ app/services/notificationService.ts
 *   └─ Contém: getPushToken(), storePushToken(), sendNotificationToOwner(), etc.
 *
 * ✓ app/contexts/NotificationContext.tsx
 *   └─ Contém: NotificationProvider, useNotifications()
 *
 * ✓ app/hooks/useNotificationSetup.ts
 *   └─ Contém: useNotificationSetup()
 *
 * ✓ app/_layout.tsx
 *   └─ Modificado com NotificationProvider e useNotificationSetup()
 *
 * ✓ app/screens/pendingPetsApproval/pendingPetsApproval.screen.tsx
 *   └─ Modificado com sendNotificationToOwner() em handleApprovePet/handleRejectPet
 */

// ============================================================================
// PASSO 5: TESTAR NO DESENVOLVIMENTO
// ============================================================================

/**
 * 1. Iniciar app em desenvolvimento:
 *    npm start
 *
 * 2. Abrir no Expo Go ou build local:
 *    - Android: npm run android
 *    - iOS: npm run ios
 *    - Web: npm run web (não suporta notificações)
 *
 * 3. Ao abrir, será solicitada permissão de notificações
 *    - Permitir acesso
 *
 * 4. Verificar no console logs com [Notifications]:
 *    [Notifications] Solicitando permissões de notificação...
 *    [Notifications] Permissão concedida
 *    [Notifications] Token obtido: ExponentPushToken[...]
 *
 * 5. Token será armazenado em Firebase:
 *    Firestore → users → {userId} → pushToken
 */

// ============================================================================
// PASSO 6: TESTAR APROVAÇÃO/REJEIÇÃO
// ============================================================================

/**
 * Fluxo de teste completo:
 *
 * 1. Fazer login na conta do proprietário
 *    └─ Token será registrado automaticamente
 *
 * 2. Abrir outro device/conta como admin
 *    └─ Ir para pendingPetsApproval
 *
 * 3. Selecionar um pet pendente
 *
 * 4. Clicar "Aprovar"
 *    └─ Notificação de aprovação será enviada para o proprietário
 *    └─ Se no mesmo device: alerta aparecerá na tela
 *    └─ Se em outro device: notificação chegará no dispositivo
 *
 * 5. Verificar logs do proprietário:
 *    [pendingPetsApproval] Notificação de aprovação enviada para [ownerId]
 *    [Notifications] Notificação recebida: {title, body, data}
 *
 * 6. Clicar "Rejeitar" (usando outro pet)
 *    └─ Inserir motivo
 *    └─ Notificação de rejeição será enviada
 */

// ============================================================================
// PASSO 7: REAGIR A NOTIFICAÇÕES EM TELAS
// ============================================================================

/**
 * Para fazer um componente reagir a notificações, use:
 *
 * import { useNotifications } from '@/app/contexts/NotificationContext';
 * import { useRouter } from 'expo-router';
 * import { useEffect } from 'react';
 *
 * export function MeuComponente() {
 *   const router = useRouter();
 *   const { lastNotification } = useNotifications();
 *
 *   useEffect(() => {
 *     if (lastNotification?.data?.petId) {
 *       // Navegar para pet que foi aprovado/rejeitado
 *       router.push({
 *         pathname: '/screens/pdpet/pdpet.screen',
 *         params: { id: lastNotification.data.petId }
 *       });
 *     }
 *   }, [lastNotification]);
 *
 *   return <View>{...}</View>;
 * }
 */

// ============================================================================
// PASSO 8: LOGOUT
// ============================================================================

/**
 * Ao fazer logout, limpar o token:
 *
 * import { notificationService } from '@/app/services/notificationService';
 * import auth from '@react-native-firebase/auth';
 *
 * async function handleLogout() {
 *   const user = auth().currentUser;
 *   if (user?.uid) {
 *     await notificationService.clearPushToken(user.uid);
 *   }
 *   await auth().signOut();
 * }
 */

// ============================================================================
// PASSO 9: PRODUÇÃO
// ============================================================================

/**
 * Para deployar em produção:
 *
 * 1. Configurar backend para enviar notificações via Expo Push API:
 *    ────────────────────────────────────────────────────────────
 *
 *    a) Criar Cloud Function ou endpoint backend
 *    b) Implementar chamada à API Expo:
 *
 *    POST https://exp.host/--/api/v2/push/send
 *    Headers:
 *      Content-Type: application/json
 *      Authorization: Bearer YOUR_EXPO_PUSH_TOKEN
 *    Body:
 *      {
 *        "to": "ExponentPushToken[...]",
 *        "sound": "default",
 *        "title": "Pet Aprovado!",
 *        "body": "Seu pet foi aprovado no PetMatch!",
 *        "data": {
 *          "petId": "...",
 *          "status": "approved"
 *        }
 *      }
 *
 * 2. Modificar notificationService.ts:
 *    ─────────────────────────────────
 *
 *    async sendPushNotification(pushToken, title, body, data) {
 *      // Em vez de sendLocalNotification()
 *      // Chamar seu backend:
 *
 *      const response = await fetch('https://seu-backend.com/api/notify', {
 *        method: 'POST',
 *        headers: { 'Content-Type': 'application/json' },
 *        body: JSON.stringify({
 *          pushToken,
 *          title,
 *          body,
 *          data
 *        })
 *      });
 *
 *      if (!response.ok) throw new Error('Erro ao enviar');
 *    }
 *
 * 3. Build de produção:
 *    ──────────────────
 *
 *    eas build --platform android --auto-submit
 *    eas build --platform ios --auto-submit
 *
 * 4. Teste em TestFlight (iOS) e Google Play Beta (Android)
 */

// ============================================================================
// PASSO 10: TROUBLESHOOTING
// ============================================================================

/**
 * Problema: Token não aparece em Firebase
 * ───────────────────────────────────────
 *
 * Verificações:
 * 1. Permitiu permissão de notificação? (checado na primeira execução)
 * 2. Usuário está autenticado? (useNotificationSetup precisa de usuário)
 * 3. Verificar logs com [Notifications] e [useNotificationSetup]
 * 4. Abrir Firebase Console e verificar:
 *    Firestore → users → seu-user-id → pushToken
 *
 * Solução:
 * - Permitir permissões novamente
 * - Fazer restart da app (npm start → recarregar)
 * - Fazer logout e login novamente
 * - Verificar conexão com Firebase
 *
 *
 * Problema: Notificação não chega
 * ───────────────────────────────
 *
 * Verificações:
 * 1. Token está em Firebase? (ver acima)
 * 2. App está em foreground? (deve mostrar alerta)
 * 3. App está em background? (sistema operacional mostra)
 * 4. Verificar logs [pendingPetsApproval]
 * 5. Verificar permissão de notificação no device
 *
 * Solução:
 * - Verificar que sendNotificationToOwner() está sendo chamado
 * - Verificar que ownerId é válido
 * - Verificar logs completos no console
 * - Fazer rebuild (expo prebuild --clean)
 * - Reiniciar device
 *
 *
 * Problema: Erro "useNotificationSetup deve ser chamado em componente"
 * ───────────────────────────────────────────────────────────────────
 *
 * Causa: useNotificationSetup() chamado fora de componente
 *
 * Solução:
 * - Confirmar que está em RootLayoutContent() (é um componente)
 * - NÃO chamar em RootLayout() wrapper function
 * - Verificar estrutura do _layout.tsx
 *
 *
 * Problema: Notificação recebida mas não aparece visual
 * ────────────────────────────────────────────────────
 *
 * Causa: App está em foreground e handler pode estar silencioso
 *
 * Solução:
 * - Handler já está configurado com shouldShowAlert: true
 * - Verificar que lastNotification está sendo atualizado (useNotifications hook)
 * - Criar componente que reage a lastNotification (ver NOTIFICATION_EXAMPLES.ts)
 */

// ============================================================================
// CHECKLIST FINAL
// ============================================================================

/**
 * Antes de considerar implementação completa:
 *
 * ✓ expo-notifications instalado (npm install expo-notifications)
 * ✓ app/_layout.tsx envolvido com NotificationProvider
 * ✓ useNotificationSetup() chamado em RootLayoutContent
 * ✓ Token apareça em Firebase ao fazer login
 * ✓ Notificação de aprovação enviada e recebida
 * ✓ Notificação de rejeição enviada e recebida
 * ✓ Componentes podem reagir usando useNotifications()
 * ✓ Logs com [Notifications] prefix aparecem no console
 * ✓ Logs com [pendingPetsApproval] aparecem ao aprovar/rejeitar
 * ✓ Notificação aparece no foreground (alerta)
 * ✓ Notificação aparece no background (sistema)
 * ✓ Logout limpa o token com clearPushToken()
 *
 * Se todos os itens estiverem com ✓, sistema está pronto para uso!
 */

export {};
