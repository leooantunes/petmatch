import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import * as Notifications from "expo-notifications";

export type NotificationData = {
  petId?: string;
  petName?: string;
  status?: "approved" | "rejected";
  message?: string;
  rejectionReason?: string;
};

export interface NotificationInfo {
  title: string;
  body: string;
  data?: NotificationData;
  receivedAt?: Date;
}

export interface NotificationContextType {
  lastNotification: NotificationInfo | null;
  isInitialized: boolean;
  handleNotificationResponse: (
    response: Notifications.NotificationResponse
  ) => void;
}

const NotificationContext = createContext<
  NotificationContextType | undefined
>(undefined);

/**
 * Provider de Notificações
 * Gerencia listeners globais e estado de notificações
 */
export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [lastNotification, setLastNotification] =
    useState<NotificationInfo | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Configurar o comportamento das notificações
  useEffect(() => {
    console.log("[NotificationContext] Configurando handlers de notificação...");

    // Definir como as notificações devem aparecer quando o app está em foreground
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true, // Mostrar alerta
        shouldPlaySound: true, // Reproduzir som
        shouldSetBadge: true, // Atualizar badge
      }),
    });

    setIsInitialized(true);
    console.log("[NotificationContext] Handlers configurados");

    return () => {
      console.log("[NotificationContext] Cleanup de handlers");
    };
  }, []);

  // Listener para notificações recebidas em foreground
  useEffect(() => {
    console.log(
      "[NotificationContext] Configurando listener de notificações recebidas..."
    );

    const subscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log("[NotificationContext] Notificação recebida:", notification);

        const notificationData = notification.request.content.data;

        setLastNotification({
          title: notification.request.content.title || "",
          body: notification.request.content.body || "",
          data: notificationData as NotificationData,
          receivedAt: new Date(),
        });
      }
    );

    return () => {
      console.log(
        "[NotificationContext] Removendo listener de notificações recebidas"
      );
      subscription.remove();
    };
  }, []);

  // Listener para quando o usuário clica na notificação
  useEffect(() => {
    console.log(
      "[NotificationContext] Configurando listener de resposta de notificações..."
    );

    const subscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log(
          "[NotificationContext] Resposta de notificação:",
          response
        );
        handleNotificationResponse(response);
      }
    );

    return () => {
      console.log(
        "[NotificationContext] Removendo listener de resposta de notificações"
      );
      subscription.remove();
    };
  }, []);

  const handleNotificationResponse = useCallback(
    (response: Notifications.NotificationResponse) => {
      const notificationData = response.notification.request.content.data;

      setLastNotification({
        title: response.notification.request.content.title || "",
        body: response.notification.request.content.body || "",
        data: notificationData as NotificationData,
        receivedAt: new Date(),
      });

      console.log(
        "[NotificationContext] Notificação processada, navegação pode ser disparada"
      );
    },
    []
  );

  return (
    <NotificationContext.Provider
      value={{
        lastNotification,
        isInitialized,
        handleNotificationResponse,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

/**
 * Hook para usar o contexto de notificações
 * @throws Error se usado fora de NotificationProvider
 */
export const useNotifications = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotifications deve ser usado dentro de NotificationProvider"
    );
  }
  return context;
};
