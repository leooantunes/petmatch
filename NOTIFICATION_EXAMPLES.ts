/**
 * EXEMPLO DE INTEGRAÇÃO - LISTENERS DE NOTIFICAÇÃO EM TELAS
 * ===========================================================
 *
 * Este arquivo demonstra como usar o sistema de notificações
 * em componentes específicos para reagir a mudanças de status do pet.
 */

/**
 * EXEMPLO 1: Componente que reage a notificações
 * ===============================================
 *
 * Use este padrão em screens que precisam ser atualizadas quando uma notificação chega.
 * Por exemplo: Profile, PetList, etc.
 */

// import React, { useEffect } from 'react';
// import { useRouter } from 'expo-router';
// import { useNotifications } from '@/app/contexts/NotificationContext';
//
// export function ProfileScreen() {
//   const router = useRouter();
//   const { lastNotification } = useNotifications();
//
//   useEffect(() => {
//     // Reage quando uma notificação é recebida
//     if (lastNotification) {
//       console.log('[ProfileScreen] Notificação recebida:', lastNotification);
//
//       const { status, petId, petName } = lastNotification.data || {};
//
//       if (status === 'approved') {
//         // Pet foi aprovado - atualizar profile e mostrar confetti/animação
//         console.log(`[ProfileScreen] Pet ${petName} foi aprovado!`);
//         // Recarregar dados do usuário
//         loadUserPets();
//       } else if (status === 'rejected') {
//         // Pet foi rejeitado
//         console.log(`[ProfileScreen] Pet ${petName} foi rejeitado`);
//         // Mostrar motivo da rejeição
//         showRejectionDetails(lastNotification.data);
//       }
//     }
//   }, [lastNotification]);
//
//   return (
//     // ... JSX aqui
//   );
// }

/**
 * EXEMPLO 2: Redirecionar para detalhes do pet quando notificação é clicada
 * =========================================================================
 *
 * Use este padrão para navegar automaticamente para o pet aprovado/rejeitado
 */

// import React, { useEffect } from 'react';
// import { useRouter } from 'expo-router';
// import { useNotifications } from '@/app/contexts/NotificationContext';
//
// export function RootNavigationHandler() {
//   const router = useRouter();
//   const { lastNotification } = useNotifications();
//
//   useEffect(() => {
//     if (lastNotification?.data?.petId) {
//       const petId = lastNotification.data.petId;
//       const status = lastNotification.data.status;
//
//       // Navegar para tela do pet
//       if (status === 'approved') {
//         // Navegar para detalhes do pet aprovado
//         router.push({
//           pathname: '/screens/pdpet/pdpet.screen',
//           params: { id: petId }
//         });
//       } else if (status === 'rejected') {
//         // Navegar para tela de rejeição com detalhes
//         router.push({
//           pathname: '/screens/petRejected/petRejected.screen',
//           params: {
//             id: petId,
//             reason: lastNotification.data.rejectionReason
//           }
//         });
//       }
//     }
//   }, [lastNotification]);
//
//   return null;
// }

/**
 * EXEMPLO 3: Mostrar toast/badge com notificações
 * ================================================
 *
 * Use este padrão para criar um indicador visual quando notificação chega
 */

// import React, { useEffect, useState } from 'react';
// import { Animated, View, Text } from 'react-native';
// import { useNotifications } from '@/app/contexts/NotificationContext';
// import { COLORS } from '@/app/styles/colors';
//
// export function NotificationToast() {
//   const { lastNotification } = useNotifications();
//   const [visible, setVisible] = useState(false);
//   const fadeAnim = React.useRef(new Animated.Value(0)).current;
//
//   useEffect(() => {
//     if (lastNotification) {
//       setVisible(true);
//       // Fade in
//       Animated.timing(fadeAnim, {
//         toValue: 1,
//         duration: 300,
//         useNativeDriver: true,
//       }).start();
//
//       // Auto hide after 5 seconds
//       const timer = setTimeout(() => {
//         Animated.timing(fadeAnim, {
//           toValue: 0,
//           duration: 300,
//           useNativeDriver: true,
//         }).start(() => setVisible(false));
//       }, 5000);
//
//       return () => clearTimeout(timer);
//     }
//   }, [lastNotification]);
//
//   if (!visible) return null;
//
//   const isApproved = lastNotification?.data?.status === 'approved';
//   const backgroundColor = isApproved ? COLORS.success : COLORS.error;
//
//   return (
//     <Animated.View
//       style={{
//         opacity: fadeAnim,
//         position: 'absolute',
//         top: 50,
//         left: 20,
//         right: 20,
//         backgroundColor,
//         padding: 16,
//         borderRadius: 8,
//         zIndex: 100,
//       }}
//     >
//       <Text style={{ color: COLORS.white, fontWeight: 'bold' }}>
//         {lastNotification?.title}
//       </Text>
//       <Text style={{ color: COLORS.white, marginTop: 4 }}>
//         {lastNotification?.body}
//       </Text>
//     </Animated.View>
//   );
// }

/**
 * EXEMPLO 4: Hook customizado para reagir apenas a aprovações
 * ===========================================================
 *
 * Use este padrão para criar hooks reutilizáveis
 */

// import { useEffect, useState } from 'react';
// import { useNotifications } from '@/app/contexts/NotificationContext';
//
// export function useApprovalNotification() {
//   const { lastNotification } = useNotifications();
//   const [approvedPetId, setApprovedPetId] = useState<string | null>(null);
//
//   useEffect(() => {
//     if (lastNotification?.data?.status === 'approved') {
//       setApprovedPetId(lastNotification.data.petId || null);
//     }
//   }, [lastNotification]);
//
//   return {
//     approvedPetId,
//     petName: lastNotification?.data?.petName,
//     wasApproved: !!approvedPetId,
//   };
// }
//
// // Uso:
// // const { approvedPetId, wasApproved } = useApprovalNotification();
// // if (wasApproved) {
// //   console.log(`Pet ${approvedPetId} foi aprovado!`);
// // }

/**
 * EXEMPLO 5: Integração com componente de modal
 * ==============================================
 *
 * Use este padrão para mostrar modais quando notificações chegam
 */

// import React, { useEffect, useState } from 'react';
// import { useNotifications } from '@/app/contexts/NotificationContext';
// import ModernModal from '@/app/components/modal/modernModal';
//
// export function NotificationModal() {
//   const { lastNotification } = useNotifications();
//   const [visible, setVisible] = useState(false);
//
//   useEffect(() => {
//     if (lastNotification) {
//       setVisible(true);
//     }
//   }, [lastNotification]);
//
//   const isApproved = lastNotification?.data?.status === 'approved';
//
//   return (
//     <ModernModal
//       visible={visible}
//       title={isApproved ? 'Pet Aprovado!' : 'Pet Rejeitado'}
//       message={lastNotification?.body || ''}
//       variant={isApproved ? 'success' : 'error'}
//       onClose={() => setVisible(false)}
//       confirmText="Ver Detalhes"
//       onConfirm={() => {
//         // Navegar para detalhes do pet
//         setVisible(false);
//       }}
//     />
//   );
// }

/**
 * EXEMPLO 6: Teste manual de notificações
 * =======================================
 *
 * Use este código para testar o sistema sem aguardar aprovação real
 */

// import { notificationService } from '@/app/services/notificationService';
// import auth from '@react-native-firebase/auth';
//
// export async function testNotifications() {
//   const user = auth().currentUser;
//
//   if (!user?.uid) {
//     console.error('[TEST] Usuário não autenticado');
//     return;
//   }
//
//   console.log('[TEST] Iniciando testes de notificação...');
//
//   try {
//     // Teste 1: Notificação de aprovação
//     console.log('[TEST] Enviando notificação de aprovação...');
//     await notificationService.sendNotificationToOwner(
//       user.uid,
//       'Pet Aprovado!',
//       'Seu pet TestePet foi aprovado no PetMatch! Parabéns!',
//       'TestePet',
//       {
//         petId: 'test123',
//         petName: 'TestePet',
//         status: 'approved',
//       }
//     );
//
//     // Aguardar 3 segundos
//     await new Promise(resolve => setTimeout(resolve, 3000));
//
//     // Teste 2: Notificação de rejeição
//     console.log('[TEST] Enviando notificação de rejeição...');
//     await notificationService.sendNotificationToOwner(
//       user.uid,
//       'Pet Rejeitado',
//       'Sua solicitação para TestePet2 foi rejeitada. Motivo: Foto de má qualidade',
//       'TestePet2',
//       {
//         petId: 'test456',
//         petName: 'TestePet2',
//         status: 'rejected',
//         rejectionReason: 'Foto de má qualidade',
//       }
//     );
//
//     console.log('[TEST] Testes concluídos!');
//   } catch (error) {
//     console.error('[TEST] Erro durante testes:', error);
//   }
// }

/**
 * EXEMPLO 7: Logging completo de notificações
 * ============================================
 *
 * Use este componente para monitorar todas as notificações
 */

// import { useNotifications } from '@/app/contexts/NotificationContext';
//
// export function NotificationLogger() {
//   const { lastNotification, isInitialized } = useNotifications();
//
//   React.useEffect(() => {
//     if (lastNotification) {
//       console.log('[NotificationLogger] ='.repeat(40));
//       console.log('[NotificationLogger] NOTIFICAÇÃO RECEBIDA');
//       console.log('[NotificationLogger] Title:', lastNotification.title);
//       console.log('[NotificationLogger] Body:', lastNotification.body);
//       console.log('[NotificationLogger] Data:', lastNotification.data);
//       console.log('[NotificationLogger] ReceivedAt:', lastNotification.receivedAt);
//       console.log('[NotificationLogger] ='.repeat(40));
//     }
//   }, [lastNotification]);
//
//   return (
//     <View>
//       <Text>Notificações Inicializadas: {isInitialized ? 'Sim' : 'Não'}</Text>
//     </View>
//   );
// }

export {};
