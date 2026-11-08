/**
 * SISTEMA DE PUSH NOTIFICATIONS - PETMATCH
 *
 * Documentação Completa de Implementação
 * =========================================
 *
 * Este arquivo documenta o sistema de push notifications implementado para notificar
 * proprietários quando o status do seu pet muda (aprovado ou rejeitado).
 */

// ============================================================================
// 1. INSTALAÇÃO NECESSÁRIA
// ============================================================================

/**
 * Adicionar ao package.json na seção "dependencies":
 *
 * "expo-notifications": "~0.30.3"
 *
 * Depois executar: npm install
 */

// ============================================================================
// 2. ESTRUTURA DE ARQUIVOS CRIADOS
// ============================================================================

/**
 * app/services/notificationService.ts
 * ├─ getPushToken() - Obter token de push do dispositivo
 * ├─ storePushToken(userId, token) - Armazenar token no Firebase
 * ├─ getPushTokenForUser(userId) - Buscar token de um usuário
 * ├─ sendNotificationToOwner(ownerId, title, body, petName, payload) - Enviar notificação
 * ├─ sendPushNotification(pushToken, title, body, data) - Enviar via API
 * ├─ sendLocalNotification(title, body, data) - Notificação local
 * ├─ requestNotificationPermissions() - Solicitar permissões
 * ├─ onTokenRefreshed(callback) - Monitorar mudanças de token
 * └─ clearPushToken(userId) - Limpar token no logout
 */

/**
 * app/contexts/NotificationContext.tsx
 * ├─ NotificationProvider - Provider React para gerenciar notificações globalmente
 * ├─ useNotifications() - Hook para acessar contexto de notificações
 * ├─ lastNotification - Última notificação recebida
 * ├─ isInitialized - Status de inicialização
 * └─ handleNotificationResponse - Handler para resposta de notificação
 */

/**
 * app/hooks/useNotificationSetup.ts
 * └─ useNotificationSetup() - Hook para setup automático de notificações ao iniciar
 *    ├─ Registra token ao iniciar app
 *    ├─ Armazena no Firebase
 *    ├─ Monitora mudanças de token
 *    └─ Valida token quando tela ganha foco
 */

// ============================================================================
// 3. INTEGRAÇÃO NO APP
// ============================================================================

/**
 * A. Modificação em app/_layout.tsx:
 *
 * - NotificationProvider envolve todo o app
 * - useNotificationSetup() chamado automaticamente
 * - Listeners de notificação configurados ao iniciar
 */

/**
 * B. Modificação em app/screens/pendingPetsApproval/pendingPetsApproval.screen.tsx:
 *
 * - handleApprovePet() agora envia notificação de aprovação
 * - handleRejectPet() agora envia notificação de rejeição
 * - Ambas as funções possuem try-catch para notificações
 */

// ============================================================================
// 4. FLUXO COMPLETO
// ============================================================================

/**
 * FLUXO 1: Inicialização da Aplicação
 * ════════════════════════════════════════════════════════════════════════════
 *
 * 1. App inicia → app/index.tsx
 * 2. Autenticação verificada → usuário logado
 * 3. app/_layout.tsx carrega
 * 4. NotificationProvider envolve todo o app
 * 5. RootLayoutContent chamado
 * 6. useNotificationSetup() disparado
 * 7. getPushToken() solicita permissões do usuário
 * 8. Token obtido e armazenado em Firebase (users/{userId}/pushToken)
 * 9. Listener para mudanças de token configurado
 * 10. Notificações prontas para receber
 */

/**
 * FLUXO 2: Aprovação de Pet
 * ════════════════════════════════════════════════════════════════════════════
 *
 * 1. Admin acessa app/screens/pendingPetsApproval/pendingPetsApproval.screen.tsx
 * 2. Admin clica em pet pendente → detalhes carregam
 * 3. Admin clica "Aprovar" → handleApprovePet() chamado
 * 4. Pet atualizado no Firebase (isApproved: true, approvedAt: now)
 * 5. notificationService.sendNotificationToOwner() chamado com:
 *    ├─ ownerId: ID do proprietário do pet
 *    ├─ title: "Pet Aprovado!"
 *    ├─ body: "Parabéns! Seu pet {name} foi aprovado no PetMatch!"
 *    ├─ petName: nome do pet
 *    └─ payload: { petId, petName, status: "approved" }
 * 6. Busca token do proprietário em Firebase
 * 7. Envia notificação via Expo Notifications API
 * 8. Proprietário recebe notificação no device
 * 9. Clicando na notificação: dados contêm petId e status para navegação
 * 10. Modal de sucesso mostrado ao admin
 */

/**
 * FLUXO 3: Rejeição de Pet
 * ════════════════════════════════════════════════════════════════════════════
 *
 * 1. Admin acessa app/screens/pendingPetsApproval/pendingPetsApproval.screen.tsx
 * 2. Admin clica em pet pendente → detalhes carregam
 * 3. Admin fornece motivo da rejeição
 * 4. Admin clica "Rejeitar" → handleRejectPet() chamado
 * 5. Pet atualizado no Firebase (isApproved: false, rejectionReason, rejectedAt: now)
 * 6. notificationService.sendNotificationToOwner() chamado com:
 *    ├─ ownerId: ID do proprietário do pet
 *    ├─ title: "Pet Rejeitado"
 *    ├─ body: "Sua solicitação para {name} foi rejeitada. Motivo: {reason}"
 *    ├─ petName: nome do pet
 *    └─ payload: { petId, petName, status: "rejected", rejectionReason }
 * 7. Busca token do proprietário em Firebase
 * 8. Envia notificação via Expo Notifications API
 * 9. Proprietário recebe notificação no device com motivo
 * 10. Clicando na notificação: dados contêm petId, status e motivo
 * 11. Modal de sucesso mostrado ao admin
 */

/**
 * FLUXO 4: Recebimento de Notificação pelo Proprietário
 * ════════════════════════════════════════════════════════════════════════════
 *
 * App em Foreground:
 * ─────────────────
 * 1. Notificação chega ao device
 * 2. Notification Handler intercepta (shouldShowAlert: true)
 * 3. Alerta mostrado na tela
 * 4. Som reproduzido e badge atualizado
 * 5. useNotifications hook atualiza state (lastNotification)
 * 6. Componentes podem reagir e navegar conforme necessário
 *
 * App em Background:
 * ──────────────────
 * 1. Notificação chega ao device
 * 2. Sistema operacional mostra notificação
 * 3. Usuário clica na notificação
 * 4. addNotificationResponseReceivedListener é disparado
 * 5. App abre e dados são processados
 * 6. Navegação pode ser acionada baseada em payload
 */

// ============================================================================
// 5. ESTRUTURA DO FIREBASE
// ============================================================================

/**
 * Documento: users/{userId}
 * ──────────────────────────
 * {
 *   name: string,
 *   email: string,
 *   phone: string,
 *   city: string,
 *   pushToken: string,              // ← Token de push Expo
 *   tokenUpdatedAt: Timestamp       // ← Quando foi atualizado
 * }
 *
 * Documento: pets/{petId}
 * ────────────────────────
 * {
 *   name: string,
 *   breed: string,
 *   age: string,
 *   location: string,
 *   description: string,
 *   image: string,
 *   ownerId: string,
 *   isApproved: boolean,
 *   approvedAt?: Timestamp,         // ← Adicionado quando aprovado
 *   rejectedAt?: Timestamp,         // ← Adicionado quando rejeitado
 *   rejectionReason?: string        // ← Motivo da rejeição
 * }
 */

// ============================================================================
// 6. ESTRUTURA DE NOTIFICAÇÃO
// ============================================================================

/**
 * Tipo: NotificationPayload
 * ──────────────────────────
 * {
 *   petId?: string,                 // ID do pet
 *   petName?: string,               // Nome do pet
 *   status?: "approved" | "rejected", // Status do pet
 *   message?: string,               // Mensagem adicional
 *   rejectionReason?: string        // Motivo da rejeição (se rejeitado)
 * }
 */

// ============================================================================
// 7. USANDO O SISTEMA
// ============================================================================

/**
 * A. Acessar contexto de notificações em um componente:
 * ──────────────────────────────────────────────────────
 */

// import { useNotifications } from '@/app/contexts/NotificationContext';
//
// function MeuComponente() {
//   const { lastNotification, isInitialized } = useNotifications();
//
//   useEffect(() => {
//     if (lastNotification) {
//       console.log('Notificação recebida:', lastNotification);
//       // Navegar ou atualizar UI baseado na notificação
//       if (lastNotification.data?.petId) {
//         router.push(`/screens/pdpet/pdpet.screen?id=${lastNotification.data.petId}`);
//       }
//     }
//   }, [lastNotification]);
//
//   return <View>...</View>;
// }

/**
 * B. Enviar notificação manualmente:
 * ───────────────────────────────────
 */

// import { notificationService } from '@/app/services/notificationService';
//
// async function enviarNotificacao() {
//   try {
//     await notificationService.sendNotificationToOwner(
//       'userId123',                           // ID do proprietário
//       'Título da Notificação',
//       'Corpo da notificação com detalhes',
//       'Nome do Pet',
//       {
//         petId: 'pet123',
//         status: 'approved'
//       }
//     );
//   } catch (error) {
//     console.error('Erro:', error);
//   }
// }

/**
 * C. Limpar token ao fazer logout:
 * ─────────────────────────────────
 */

// import { notificationService } from '@/app/services/notificationService';
//
// async function logout() {
//   const user = auth().currentUser;
//   if (user?.uid) {
//     await notificationService.clearPushToken(user.uid);
//   }
//   await auth().signOut();
// }

// ============================================================================
// 8. CONSIDERAÇÕES DE PRODUÇÃO
// ============================================================================

/**
 * ⚠️ IMPORTANTE PARA PRODUÇÃO:
 *
 * 1. Expo Push API:
 *    - O serviço atual usa notificações locais por padrão
 *    - Para produção, é necessário:
 *      a) Configurar Firebase Cloud Functions ou um backend próprio
 *      b) Implementar chamada à API Expo Push: https://docs.expo.dev/push-notifications/overview/
 *      c) Armazenar chave da API Expo securely no backend
 *    - Exemplo de chamada para o backend:
 *      POST /api/notifications/send-to-owner
 *      { ownerId, title, body, data }
 *
 * 2. Permissões:
 *    - Android: POST_NOTIFICATIONS permission já configurado em app.json
 *    - iOS: USR_NOTIFICATION precisa estar em info.plist (automático via Expo)
 *
 * 3. Retry Logic:
 *    - Implementar retry com exponential backoff para falhas
 *    - Considerar queue de notificações não enviadas
 *
 * 4. Rate Limiting:
 *    - Limitar frequência de notificações por usuário
 *    - Agrupar múltiplas notificações se necessário
 *
 * 5. Analytics:
 *    - Rastrear delivery de notificações
 *    - Monitorar taxa de cliques
 *    - Registrar erros
 *
 * 6. Testing:
 *    - Usar expo-notifications para testes locais
 *    - Testar em devices reais (iOS e Android)
 *    - Verificar comportamento em foreground e background
 */

// ============================================================================
// 9. TROUBLESHOOTING
// ============================================================================

/**
 * Problema: Não consegue obter token de push
 * ──────────────────────────────────────────
 * Solução:
 * - Verificar se permissões foram solicitadas
 * - Verificar console para logs [Notifications]
 * - Confirmar que expo-notifications está instalado
 * - Fazer rebuild do app (expo prebuild --clean)
 *
 * Problema: Notificação não chega ao proprietário
 * ───────────────────────────────────────────────
 * Solução:
 * - Verificar se token está armazenado em Firebase
 * - Confirmar que sendLocalNotification() está sendo chamado
 * - Verificar permissões de notificação no device
 * - Checar logs em console.log com prefix [Notifications]
 *
 * Problema: Erro ao enviar notificação
 * ───────────────────────────────────
 * Solução:
 * - Try-catch já implementado em handlers
 * - Verificar acesso ao Firebase Firestore
 * - Confirmar que usuário/pet existem no Firebase
 *
 * Problema: Token expirado
 * ───────────────────────
 * Solução:
 * - onTokenRefreshed listener monitora mudanças
 * - useFocusEffect valida token quando tela ganha foco
 * - Token é armazenado novamente se necessário
 */

// ============================================================================
// 10. LOGS E DEBUG
// ============================================================================

/**
 * Todos os logs incluem prefixo [Notifications] para fácil filtro:
 *
 * [Notifications] - notificationService.ts
 * [NotificationContext] - contexts/NotificationContext.tsx
 * [useNotificationSetup] - hooks/useNotificationSetup.ts
 * [pendingPetsApproval] - screens/pendingPetsApproval.screen.tsx
 *
 * Para debug:
 * 1. npm start (ou expo start)
 * 2. Ver logs em tempo real com:
 *    grep -i "notifications" console.log
 * 3. Verificar Firebase console para tokens salvos
 * 4. Testar com notificações locais primeiro
 */

export {};
