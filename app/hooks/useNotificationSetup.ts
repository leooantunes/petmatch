import * as React from "react";
import { useEffect, useRef } from "react";
import { useFocusEffect } from "expo-router";
import auth from "@react-native-firebase/auth";
import { notificationService } from "@/app/services/notificationService";

/**
 * Hook para configurar notificações ao iniciar o app
 * - Registra o token de push do dispositivo
 * - Armazena no Firebase
 * - Monitora mudanças de token
 */
export const useNotificationSetup = () => {
  const tokenSubscriptionRef = useRef<(() => void) | null>(null);

  // Setup inicial: registrar token ao iniciar
  useEffect(() => {
    console.log("[useNotificationSetup] Inicializando setup de notificações...");

    const setupNotifications = async () => {
      const user = auth().currentUser;

      if (!user?.uid) {
        console.warn("[useNotificationSetup] Usuário não autenticado");
        return;
      }

      try {
        // 1. Obter token de push
        const token = await notificationService.getPushToken();

        if (!token) {
          console.warn(
            "[useNotificationSetup] Não foi possível obter token de push"
          );
          return;
        }

        // 2. Armazenar no Firebase
        await notificationService.storePushToken(user.uid, token);

        console.log("[useNotificationSetup] Token registrado com sucesso");

        // 3. Configurar listener para quando o token muda
        if (tokenSubscriptionRef.current) {
          tokenSubscriptionRef.current();
        }

        tokenSubscriptionRef.current = notificationService.onTokenRefreshed(
          async (newToken) => {
            console.log(
              "[useNotificationSetup] Token atualizado, salvando novo token..."
            );
            try {
              await notificationService.storePushToken(user.uid, newToken);
            } catch (error) {
              console.error(
                "[useNotificationSetup] Erro ao atualizar token:",
                error
              );
            }
          }
        );
      } catch (error) {
        console.error("[useNotificationSetup] Erro na configuração:", error);
      }
    };

    setupNotifications();

    // Cleanup
    return () => {
      if (tokenSubscriptionRef.current) {
        tokenSubscriptionRef.current();
        tokenSubscriptionRef.current = null;
      }
    };
  }, []);

  // Validar token quando a tela ganha foco
  useFocusEffect(
    React.useCallback(() => {
      console.log(
        "[useNotificationSetup] Tela ganhou foco, validando token..."
      );

      const user = auth().currentUser;

      if (user?.uid) {
        // Verificar se token ainda está válido no Firebase
        notificationService.getPushTokenForUser(user.uid).then((token) => {
          if (!token) {
            console.warn(
              "[useNotificationSetup] Token não encontrado, re-registrando..."
            );
            notificationService.getPushToken().then((newToken) => {
              if (newToken) {
                notificationService.storePushToken(user.uid, newToken);
              }
            });
          }
        });
      }

      return () => {
        // Cleanup se necessário
      };
    }, [])
  );
};
