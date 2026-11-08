import * as Notifications from "expo-notifications";
import { db } from "@/firebase";

interface NotificationPayload {
  petId?: string;
  petName?: string;
  status?: "approved" | "rejected";
  message?: string;
  rejectionReason?: string;
}

/**
 * Serviço de notificações push para PetMatch
 * Gerencia: registro de dispositivo, armazenamento de tokens e envio de notificações
 */
export const notificationService = {
  /**
   * Obtém o token de push do dispositivo Expo
   * @returns Token do dispositivo ou null se não conseguir obter
   */
  async getPushToken(): Promise<string | null> {
    try {
      console.log("[Notifications] Solicitando permissões de notificação...");

      // Solicitar permissões
      const { status } = await Notifications.requestPermissionsAsync();

      if (status !== "granted") {
        console.warn("[Notifications] Permissão de notificação negada");
        return null;
      }

      console.log("[Notifications] Permissão concedida");

      // Obter token
      const token = await Notifications.getExpoPushTokenAsync();
      console.log("[Notifications] Token obtido:", token.data);

      return token.data;
    } catch (error) {
      console.error("[Notifications] Erro ao obter token de push:", error);
      return null;
    }
  },

  /**
   * Armazena o token de push no Firebase sob o documento do usuário
   * @param userId ID do usuário
   * @param token Token de push Expo
   */
  async storePushToken(userId: string, token: string): Promise<void> {
    try {
      console.log(
        `[Notifications] Armazenando token para usuário ${userId}...`
      );

      await db().collection("users").doc(userId).set(
        {
          pushToken: token,
          tokenUpdatedAt: new Date(),
        },
        { merge: true }
      );

      console.log(`[Notifications] Token armazenado com sucesso`);
    } catch (error) {
      console.error("[Notifications] Erro ao armazenar token:", error);
      throw error;
    }
  },

  /**
   * Busca o token de push de um usuário do Firebase
   * @param userId ID do usuário
   * @returns Token de push ou null
   */
  async getPushTokenForUser(userId: string): Promise<string | null> {
    try {
      const userDoc = await db().collection("users").doc(userId).get();

      if (!userDoc.exists) {
        console.warn(`[Notifications] Usuário ${userId} não encontrado`);
        return null;
      }

      const pushToken = userDoc.get("pushToken");
      if (typeof pushToken !== "string") return null;
      return pushToken || null;
    } catch (error) {
      console.error(
        "[Notifications] Erro ao obter token do usuário:",
        error
      );
      return null;
    }
  },

  /**
   * Envia notificação push para o proprietário do pet
   * @param ownerId ID do proprietário
   * @param title Título da notificação
   * @param body Corpo da notificação
   * @param petName Nome do pet
   * @param payload Dados adicionais
   */
  async sendNotificationToOwner(
    ownerId: string,
    title: string,
    body: string,
    petName: string,
    payload?: Partial<NotificationPayload>
  ): Promise<void> {
    try {
      console.log(
        `[Notifications] Enviando notificação para proprietário ${ownerId}...`
      );

      // Obter token do proprietário
      const pushToken = await this.getPushTokenForUser(ownerId);

      if (!pushToken) {
        console.warn(
          `[Notifications] Nenhum token de push encontrado para usuário ${ownerId}`
        );
        return;
      }

      // Preparar payload
      const notificationPayload: NotificationPayload = {
        petName,
        ...payload,
      };

      // Enviar para Expo Push API
      await this.sendPushNotification(pushToken, title, body, notificationPayload);
    } catch (error) {
      console.error(
        "[Notifications] Erro ao enviar notificação para proprietário:",
        error
      );
      throw error;
    }
  },

  /**
   * Envia notificação push via Expo Push API
   * Para produção, seria necessário ter um backend que chama a API Expo
   * Por enquanto, esta é uma implementação de suporte local
   * @param pushToken Token de push Expo
   * @param title Título
   * @param body Corpo
   * @param data Dados adicionais
   */
  async sendPushNotification(
    pushToken: string,
    title: string,
    body: string,
    data?: NotificationPayload
  ): Promise<void> {
    try {
      console.log("[Notifications] Enviando notificação via Expo Push API...");

      // Para usar em produção, você precisa fazer uma chamada para seu backend
      // que chama a API Expo Push: https://docs.expo.dev/push-notifications/overview/

      // Para desenvolvimento local, vamos usar a notificação local
      await this.sendLocalNotification(title, body, data);

      console.log("[Notifications] Notificação enviada com sucesso");
    } catch (error) {
      console.error(
        "[Notifications] Erro ao enviar notificação via Expo Push API:",
        error
      );
      throw error;
    }
  },

  /**
   * Envia notificação local (para teste/desenvolvimento)
   * @param title Título
   * @param body Corpo
   * @param data Dados adicionais
   */
  async sendLocalNotification(
    title: string,
    body: string,
    data?: NotificationPayload
  ): Promise<void> {
    try {
      console.log("[Notifications] Enviando notificação local...");

      await Notifications.scheduleNotificationAsync({
        content: {
          title,
          body,
          data: { ...data },
          sound: true,
          badge: 1,
          vibrate: [0, 250, 250, 250],
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
          seconds: 2, // Enviar após 2 segundos
        },
      });

      console.log("[Notifications] Notificação local agendada");
    } catch (error) {
      console.error(
        "[Notifications] Erro ao enviar notificação local:",
        error
      );
      throw error;
    }
  },

  /**
   * Solicita permissões de notificação do usuário
   * @returns true se permissão foi concedida
   */
  async requestNotificationPermissions(): Promise<boolean> {
    try {
      console.log("[Notifications] Solicitando permissões...");

      const { status } = await Notifications.requestPermissionsAsync();

      const granted = status === "granted";
      console.log(
        `[Notifications] Status de permissão: ${status} (concedida: ${granted})`
      );

      return granted;
    } catch (error) {
      console.error("[Notifications] Erro ao solicitar permissões:", error);
      return false;
    }
  },

  /**
   * Monitora mudanças de token (quando o token do dispositivo muda)
   * @param callback Função chamada quando o token muda
   * @returns Função para desinscrever do listener
   */
  onTokenRefreshed(callback: (token: string) => void) {
    console.log("[Notifications] Configurando listener para refresh de token...");

    const subscription = Notifications.addPushTokenListener((event) => {
      console.log("[Notifications] Token atualizado:", String(event.data));
      callback(String(event.data));
    });

    return () => {
      console.log("[Notifications] Removendo listener de token");
      subscription.remove();
    };
  },

  /**
   * Limpa todos os tokens e permissões (para logout)
   * @param userId ID do usuário
   */
  async clearPushToken(userId: string): Promise<void> {
    try {
      console.log(`[Notifications] Limpando token para usuário ${userId}...`);

      await db()
        .collection("users")
        .doc(userId)
        .set(
          {
            pushToken: null,
            tokenUpdatedAt: new Date(),
          },
          { merge: true }
        );

      console.log("[Notifications] Token limpo com sucesso");
    } catch (error) {
      console.error("[Notifications] Erro ao limpar token:", error);
      // Não lançar erro para não interromper o logout
    }
  },
};
