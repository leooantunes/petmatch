/**
 * GUIA DE TESTES - PUSH NOTIFICATIONS
 * ====================================
 *
 * Scripts e procedimentos para testar o sistema de notificações
 */

// ============================================================================
// TESTE 1: VERIFICAR SETUP CORRETO
// ============================================================================

/**
 * Script de teste para verificar se tudo está configurado:
 * (Executar no console do device)
 *
 * 1. Abrir app em desenvolvimento
 * 2. Abrir Developer Menu (shake device ou Ctrl+M no Android)
 * 3. Executar este código no console:
 */

/*
import { notificationService } from '@/app/services/notificationService';
import auth from '@react-native-firebase/auth';
import { db } from '@/firebase';

async function testSetup() {
  console.log('[TEST] 1. Verificando autenticação...');
  const user = auth().currentUser;
  if (!user) {
    console.error('[TEST] Erro: Usuário não autenticado');
    return;
  }
  console.log('[TEST] ✓ Usuário autenticado:', user.uid);

  console.log('[TEST] 2. Verificando token...');
  const token = await notificationService.getPushToken();
  if (!token) {
    console.error('[TEST] Erro: Não conseguiu obter token');
    return;
  }
  console.log('[TEST] ✓ Token obtido:', token);

  console.log('[TEST] 3. Verificando armazenamento em Firebase...');
  const userDoc = await db().collection('users').doc(user.uid).get();
  const storedToken = userDoc.get('pushToken');
  if (storedToken === token) {
    console.log('[TEST] ✓ Token armazenado corretamente em Firebase');
  } else {
    console.error('[TEST] Erro: Token não corresponde em Firebase');
  }

  console.log('[TEST] ✓ Setup correto!');
}

testSetup().catch(console.error);
*/

// ============================================================================
// TESTE 2: ENVIAR NOTIFICAÇÃO PARA SI MESMO
// ============================================================================

/**
 * Script para enviar notificação de teste para o seu próprio device:
 * (Executar no console do device)
 */

/*
import { notificationService } from '@/app/services/notificationService';
import auth from '@react-native-firebase/auth';

async function testSendNotification() {
  const user = auth().currentUser;
  if (!user?.uid) {
    console.error('[TEST] Usuário não autenticado');
    return;
  }

  console.log('[TEST] Enviando notificação de teste...');
  try {
    await notificationService.sendNotificationToOwner(
      user.uid,
      'Teste de Aprovação',
      'Este é um teste de notificação de aprovação',
      'Pet Teste',
      {
        petId: 'test-' + Date.now(),
        petName: 'Pet Teste',
        status: 'approved',
      }
    );
    console.log('[TEST] ✓ Notificação de aprovação enviada');
  } catch (error) {
    console.error('[TEST] Erro ao enviar:', error);
  }
}

testSendNotification();
*/

// ============================================================================
// TESTE 3: TESTE DE PERMISSÕES
// ============================================================================

/**
 * Script para verificar e solicitar permissões:
 */

/*
import * as Notifications from 'expo-notifications';
import { notificationService } from '@/app/services/notificationService';

async function testPermissions() {
  console.log('[TEST] Verificando permissões...');

  const granted = await notificationService.requestNotificationPermissions();
  if (granted) {
    console.log('[TEST] ✓ Permissões concedidas');
  } else {
    console.error('[TEST] ✗ Permissões negadas');
  }

  // Verificar status
  const current = await Notifications.getPermissionsAsync();
  console.log('[TEST] Status atual:', current);
}

testPermissions();
*/

// ============================================================================
// TESTE 4: TESTE COMPLETO DE APROVAÇÃO/REJEIÇÃO
// ============================================================================

/**
 * Procedimento passo-a-passo para testar fluxo completo:
 *
 * PRÉ-REQUISITOS:
 * - Dois devices/apps rodando (ou dois emuladores)
 * - Um com conta de proprietário
 * - Um com conta de admin
 *
 * PROCEDIMENTO:
 *
 * 1. No device do proprietário:
 *    └─ Fazer login
 *    └─ Manter app aberto
 *    └─ Ver logs [Notifications] no console
 *
 * 2. No device do admin:
 *    └─ Fazer login como admin
 *    └─ Navegar para pendingPetsApproval
 *    └─ Selecionar um pet do proprietário
 *
 * 3. Clicar "Aprovar":
 *    └─ Ver logs [pendingPetsApproval] no device do admin
 *    └─ Ver logs [Notifications] no device do proprietário
 *    └─ Alerta deve aparecer na tela do proprietário
 *
 * 4. Verificar Firebase:
 *    └─ pets/{petId}/isApproved deve ser true
 *    └─ pets/{petId}/approvedAt deve ter timestamp
 *
 * 5. Testar rejeição com outro pet:
 *    └─ Inserir motivo
 *    └─ Clicar "Rejeitar"
 *    └─ Ver notificação no device do proprietário
 *    └─ pets/{petId}/isApproved deve ser false
 *    └─ pets/{petId}/rejectionReason deve ter motivo
 */

// ============================================================================
// TESTE 5: TESTE DE NAVEGAÇÃO
// ============================================================================

/**
 * Script para testar navegação a partir de notificação:
 * (Adicionar ao componente principal - ProfileScreen ou similar)
 */

/*
import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { useNotifications } from '@/app/contexts/NotificationContext';

export function NotificationNavigationTest() {
  const router = useRouter();
  const { lastNotification } = useNotifications();

  useEffect(() => {
    if (lastNotification?.data?.petId) {
      console.log('[TEST] Notificação recebida com petId:', lastNotification.data.petId);

      // Teste: ir para pet details
      const petId = lastNotification.data.petId;
      console.log('[TEST] Navegando para pet:', petId);

      router.push({
        pathname: '/screens/pdpet/pdpet.screen',
        params: { id: petId }
      });
    }
  }, [lastNotification]);

  return null;
}
*/

// ============================================================================
// TESTE 6: TESTE DE PERFORMANCE
// ============================================================================

/**
 * Script para testar envio múltiplo de notificações:
 * (Medir tempo e performance)
 */

/*
import { notificationService } from '@/app/services/notificationService';
import auth from '@react-native-firebase/auth';

async function testPerformance() {
  const user = auth().currentUser;
  if (!user?.uid) return;

  console.log('[TEST] Iniciando teste de performance...');
  const startTime = Date.now();

  try {
    // Enviar 5 notificações
    for (let i = 0; i < 5; i++) {
      await notificationService.sendNotificationToOwner(
        user.uid,
        `Teste ${i + 1}`,
        `Notificação de teste número ${i + 1}`,
        `Pet ${i + 1}`,
        {
          petId: `test-${i}`,
          petName: `Pet ${i + 1}`,
          status: 'approved',
        }
      );
      console.log(`[TEST] Notificação ${i + 1}/5 enviada`);
    }

    const duration = Date.now() - startTime;
    console.log(`[TEST] ✓ 5 notificações enviadas em ${duration}ms`);
    console.log(`[TEST] Média: ${(duration / 5).toFixed(2)}ms por notificação`);
  } catch (error) {
    console.error('[TEST] Erro no teste de performance:', error);
  }
}

testPerformance();
*/

// ============================================================================
// TESTE 7: VERIFICAÇÃO DE LOGS
// ============================================================================

/**
 * Filtrar logs para verificar sistema:
 *
 * Buscar por prefixes:
 * - [Notifications] - Sistema principal
 * - [NotificationContext] - Contexto React
 * - [useNotificationSetup] - Hook de setup
 * - [pendingPetsApproval] - Tela de aprovação
 * - [TEST] - Testes manuais
 *
 * No console:
 * npm start | grep "\[Notifications\]"
 *
 * Logs esperados ao iniciar:
 * ──────────────────────────
 * [NotificationContext] Configurando handlers de notificação...
 * [NotificationContext] Handlers configurados
 * [useNotificationSetup] Inicializando setup de notificações...
 * [Notifications] Solicitando permissões de notificação...
 * [Notifications] Permissão concedida
 * [Notifications] Token obtido: ExponentPushToken[...]
 * [Notifications] Armazenando token para usuário [uid]...
 * [Notifications] Token armazenado com sucesso
 * [Notifications] Configurando listener para refresh de token...
 *
 * Logs ao aprovar pet:
 * ──────────────────
 * [pendingPetsApproval] Notificação de aprovação enviada para [ownerId]
 * [Notifications] Enviando notificação para proprietário...
 * [Notifications] Enviando notificação via Expo Push API...
 * [Notifications] Enviando notificação local...
 * [Notifications] Notificação local agendada
 * [NotificationContext] Notificação recebida: {...}
 */

// ============================================================================
// TESTE 8: CHECKLIST DE VALIDAÇÃO
// ============================================================================

/**
 * Checklist para validar se sistema está funcionando:
 *
 * ✓ Ao abrir app pela primeira vez:
 *   └─ Pede permissão de notificação
 *   └─ Após permitir, logs mostram [Notifications] Token obtido
 *   └─ Token aparece em Firebase: users/{uid}/pushToken
 *
 * ✓ Ao fazer login subsequente:
 *   └─ Token é validado e restaurado
 *   └─ Não pede permissão novamente (já foi concedida)
 *   └─ logs [useNotificationSetup] Token registrado com sucesso
 *
 * ✓ Ao aprovar pet:
 *   └─ Botão "Aprovar" funciona
 *   └─ Modal de sucesso aparece
 *   └─ Logs [pendingPetsApproval] mostram notificação enviada
 *   └─ Firebase mostra pet aprovado
 *   └─ Proprietário recebe alerta (se em foreground)
 *
 * ✓ Ao rejeitar pet:
 *   └─ Requer motivo
 *   └─ Botão "Rejeitar" funciona
 *   └─ Modal de sucesso aparece
 *   └─ Logs [pendingPetsApproval] mostram notificação enviada
 *   └─ Firebase mostra pet rejeitado com motivo
 *   └─ Proprietário recebe alerta
 *
 * ✓ Ao clicar em notificação:
 *   └─ lastNotification é atualizado (verificável com hook)
 *   └─ Dados da notificação contêm petId e status
 *   └─ Componentes podem reagir aos dados
 *
 * ✓ Ao fazer logout:
 *   └─ clearPushToken é chamado
 *   └─ Token é removido do Firebase
 *   └─ Nenhuma notificação é recebida
 *
 * Se todos os itens passarem: Sistema está 100% funcional!
 */

export {};
