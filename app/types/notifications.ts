/**
 * Tipos e Interfaces para o Sistema de Push Notifications
 * =========================================================
 */

/**
 * Status da aprovação de um pet
 */
export type PetApprovalStatus = "approved" | "rejected";

/**
 * Dados que podem ser enviados em uma notificação
 */
export interface NotificationPayload {
  /** ID do pet */
  petId?: string;

  /** Nome do pet */
  petName?: string;

  /** Status do pet (aprovado ou rejeitado) */
  status?: PetApprovalStatus;

  /** Mensagem adicional */
  message?: string;

  /** Motivo da rejeição (quando status === "rejected") */
  rejectionReason?: string;
}

/**
 * Informações completas de uma notificação recebida
 */
export interface NotificationInfo {
  /** Título da notificação */
  title: string;

  /** Corpo/conteúdo da notificação */
  body: string;

  /** Dados adicionais */
  data?: NotificationPayload;

  /** Timestamp de quando foi recebida */
  receivedAt?: Date;
}

/**
 * Contexto de notificações
 */
export interface NotificationContextType {
  /** Última notificação recebida */
  lastNotification: NotificationInfo | null;

  /** Se o sistema de notificações foi inicializado */
  isInitialized: boolean;

  /** Handler para quando usuário clica em notificação */
  handleNotificationResponse: (response: any) => void;
}

/**
 * Serviço de notificações
 */
export interface INotificationService {
  /**
   * Obter token de push do dispositivo
   */
  getPushToken(): Promise<string | null>;

  /**
   * Armazenar token de push no Firebase
   */
  storePushToken(userId: string, token: string): Promise<void>;

  /**
   * Obter token de push de um usuário específico
   */
  getPushTokenForUser(userId: string): Promise<string | null>;

  /**
   * Enviar notificação para o proprietário do pet
   */
  sendNotificationToOwner(
    ownerId: string,
    title: string,
    body: string,
    petName: string,
    payload?: Partial<NotificationPayload>
  ): Promise<void>;

  /**
   * Enviar notificação push via Expo API
   */
  sendPushNotification(
    pushToken: string,
    title: string,
    body: string,
    data?: NotificationPayload
  ): Promise<void>;

  /**
   * Enviar notificação local
   */
  sendLocalNotification(
    title: string,
    body: string,
    data?: NotificationPayload
  ): Promise<void>;

  /**
   * Solicitar permissões de notificação
   */
  requestNotificationPermissions(): Promise<boolean>;

  /**
   * Monitorar refresh de token
   */
  onTokenRefreshed(callback: (token: string) => void): () => void;

  /**
   * Limpar token ao fazer logout
   */
  clearPushToken(userId: string): Promise<void>;
}

/**
 * Configuração para notificação de aprovação
 */
export interface ApprovalNotificationPayload extends NotificationPayload {
  status: "approved";
  petId: string;
  petName: string;
}

/**
 * Configuração para notificação de rejeição
 */
export interface RejectionNotificationPayload extends NotificationPayload {
  status: "rejected";
  petId: string;
  petName: string;
  rejectionReason: string;
}

/**
 * Evento de notificação recebida
 */
export interface NotificationReceivedEvent {
  type: "received";
  notification: NotificationInfo;
  timestamp: Date;
}

/**
 * Evento de notificação clicada
 */
export interface NotificationClickedEvent {
  type: "clicked";
  notification: NotificationInfo;
  timestamp: Date;
}

/**
 * Eventos que podem ocorrer com notificações
 */
export type NotificationEvent =
  | NotificationReceivedEvent
  | NotificationClickedEvent;

/**
 * Hook de setup de notificações
 */
export interface IUseNotificationSetup {
  /**
   * Inicializa o sistema de notificações
   */
  (): void;
}

/**
 * Listener de notificação
 */
export type NotificationListener = (event: NotificationEvent) => void;

/**
 * Armazenamento de token em usuário
 */
export interface UserWithNotificationToken {
  id?: string;
  uid?: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  age?: string;

  /** Token de push Expo */
  pushToken?: string;

  /** Data de atualização do token */
  tokenUpdatedAt?: Date;
}

/**
 * Documento de pet com status de aprovação
 */
export interface PetWithApprovalStatus {
  id: string;
  name: string;
  age: string;
  breed: string;
  location: string;
  description: string;
  image: string;
  images?: string[];
  neutered: boolean;

  /** ID do proprietário */
  ownerId?: string;

  /** Status de aprovação */
  isApproved?: boolean;

  /** Data de aprovação */
  approvedAt?: Date;

  /** Data de rejeição */
  rejectedAt?: Date;

  /** Motivo da rejeição */
  rejectionReason?: string;

  /** Data de criação */
  createdAt?: Date;
}

/**
 * Resposta após enviar notificação
 */
export interface SendNotificationResponse {
  success: boolean;
  message: string;
  timestamp: Date;
  tokenUsed?: string;
}

/**
 * Configuração de log para notificações
 */
export interface NotificationLogConfig {
  enabled: boolean;
  prefix: string;
  logToConsole: boolean;
  logToFirestore: boolean;
}

export {};
