# PetMatch - Regras e Fluxos do App

## 📋 Visão Geral

**PetMatch** é um aplicativo mobile (React Native/Expo) para conectar pessoas que querem adotar animais de estimação. O app permite que usuários se registrem, anunciem pets para adoção, naveguem pela lista de pets disponíveis e entrem em contato via WhatsApp com os responsáveis.

### Stack Tecnológico
- **Frontend**: React Native + Expo
- **Backend**: Firebase (Authentication, Firestore, Storage)
- **Autenticação**: Email/Senha, Google Sign-In, Apple Sign-In
- **Comunicação**: WhatsApp, Pix (para ONGs parceiras)

---

## 🔐 Regras de Autenticação

### 1. Fluxo de Login
- Usuário acessa a tela de login (`/screens/login/login.screen.tsx`)
- Opções disponíveis:
  - **Email + Senha**: Autenticação tradicional Firebase
  - **Google Sign-In**: Integração com Google
  - **Apple Sign-In**: Para dispositivos iOS
- Após login bem-sucedido, usuário é redirecionado para `petList`

### 2. Fluxo de Registro
- Usuário pode se registrar em `/screens/register/register.screen.tsx`
- Dados obrigatórios:
  - **Nome**: Campo de texto livre
  - **Email**: Validação de formato
  - **Telefone**: Apenas números brasileiros (10-11 dígitos)
  - **Cidade**: Campo de texto
  - **Senha**: Mínimo de segurança do Firebase
- Validações:
  - Telefone formatado automaticamente
  - Email deve ser único no Firebase
  - Senha deve atender requisitos mínimos
- Após registro, usuário é criado no Firebase Authentication e um documento é criado no Firestore

### 3. Proteção de Rotas
- App verifica estado de autenticação na inicialização (`app/index.tsx`)
- Usuário logado → Redireciona para `petList`
- Usuário deslogado → Redireciona para `login`

---

## 👤 Regras de Usuário

### Estrutura de Dados (Firestore Collection: `users`)
```typescript
{
  uid: string,           // ID do Firebase Auth
  name: string,
  email: string,
  phone: string,
  city: string,
  age?: string,
  profileImage?: string, // URL da foto de perfil
  createdAt: Timestamp,
  updatedAt?: Timestamp
}
```

### 1. Registro de Usuário
- Criação automática no Firestore após auth bem-sucedida
- Cada usuário tem UID único do Firebase

### 2. Perfil de Usuário
- Usuário pode visualizar seu perfil em `/screens/profile/profile.screen.tsx`
- Pode fazer upload de foto de perfil (armazenada no Firebase Storage)
- Exibe lista de pets que o usuário anunciou
- Botão para editar informações

### 3. Edição de Perfil
- Disponível em `/screens/editProfile/editProfile.screen.tsx`
- Campos editáveis:
  - Nome
  - Email
  - Telefone (com validação)
  - Idade
  - Cidade
  - Foto de perfil
- Senha pode ser redefinida pelo Firebase

### 4. Logout
- Usuário pode fazer logout do perfil
- App redireciona para login

---

## 🐾 Regras de Pets

### Estrutura de Dados (Firestore Collection: `pets`)
```typescript
{
  id: string,              // ID do documento Firebase
  name: string,
  age: string,             // Faixa de idade pré-definida
  breed: string,
  neutered: boolean,
  location: string,        // Cidade/local
  description: string,     // Descrição do pet
  image: string,           // URL da foto principal
  images: string[],        // URLs de todas as fotos
  ownerId: string,         // UID do proprietário
  status: string,          // "pending" | "approved" | "rejected"
  createdAt: Timestamp,
  approvedAt?: Timestamp,
  rejectionReason?: string,
  rejectedAt?: Timestamp
}
```

### 1. Adição de Pet
- Disponível em `/screens/addPet/addPet.screen.tsx`
- Fluxo:
  1. Usuário seleciona **pelo menos 1 foto** (obrigatório)
  2. Preenche informações do pet
  3. Informações são validadas
  4. Pet é salvo com `status: "pending"`
  5. Usuário recebe confirmação de que foi enviado para aprovação

### 2. Campos de Pet
- **Fotos**: Múltiplas fotos, armazenadas no Firebase Storage
- **Tipo de Cadastro**: 
  - "Animal doméstico" → Dados manuais
  - "Animal de rua" → Campos auto-preenchidos
- **Nome**: Texto livre
- **Idade**: Seleção de faixa pré-definida:
  - 0-1 ano
  - 1-3 anos
  - 4-6 anos
  - 7-9 anos
  - 10-12 anos
  - 13+ anos
  - Idade desconhecida
- **Raça**: Seleção de lista (integrada com APIs externas)
- **Castrado**: Toggle SIM/NÃO
- **Cidade**: Detectada automaticamente via localização ou entrada manual
- **Descrição**: Texto livre

### 3. Upload de Fotos
- Fotos são redimensionadas (qualidade 0.7)
- Armazenadas no Firebase Storage em `petPhotos/`
- URL de download gerada para cada foto
- Tratamento de erros de permissão

### 4. Aprovação de Pets
- Novo sistema implementado
- Pets começam com `status: "pending"`
- Admin acessa `/screens/pendingPetsApproval/pendingPetsApproval.screen` para revisar
- Admin pode:
  - **Aprovar**: Pet passa para `status: "approved"` e fica visível
  - **Rejeitar**: Pet passa para `status: "rejected"` com motivo

### 5. Listagem de Pets
- Apenas pets com `status: "approved"` aparecem
- Disponível em `/screens/petList/petList.screen.tsx`
- Exibe em formato de cards com imagem, nome, idade, raça, localização, descrição

### 6. Detalhes do Pet
- Disponível em `/screens/pdpet/pdpet.screen.tsx`
- Mostra:
  - Galeria de fotos
  - Todas as informações do pet
  - Botão "Entrar em Contato" via WhatsApp
  - Informações do proprietário (nome e contato)

### 7. Contato via WhatsApp
- Usuário clica em "Entrar em Contato"
- App abre WhatsApp com:
  - Número do proprietário
  - Mensagem pré-formatada: "Olá! Tenho interesse em adotar [nome do pet]. Podemos conversar?"
- Normalização de número de telefone (adiciona +55 Brasil)

---

## 🏢 Regras de ONGs

### Tela de ONGs
- Disponível em `/screens/ongs/ongs.screen.tsx`
- Lista de ONGs parceiras com:
  - Nome
  - Chave Pix (para doações)
  - WhatsApp
- Botões para:
  - Copiar chave Pix
  - Abrir WhatsApp para conversar

### ONGs Pré-configuradas
```typescript
[
  {
    name: "Amigos de Quatro Patas",
    pix: "pix@amigosdequatropatas.org",
    whatsapp: "5511999990001"
  },
  // ... mais ONGs
]
```

---

## 🔄 Fluxo de Usuário Completo

```
NOVO USUÁRIO
├─ Tela de Login
├─ Clica em "Criar Conta"
├─ Tela de Registro
│  ├─ Preenche dados (nome, email, telefone, cidade, senha)
│  ├─ Valida formulário
│  └─ Cria usuário no Firebase
├─ Redireciona para petList
└─ Exploração do app

USUÁRIO AUTENTICADO
├─ Tela petList (Lista de pets aprovados)
├─ Clica em um pet → pdpet (Detalhes do pet)
├─ "Entrar em Contato" → WhatsApp
│
├─ Clica em "Adicionar Pet" → addPet
│  ├─ Seleciona fotos
│  ├─ Preenche dados
│  ├─ Envia para aprovação (status: pending)
│  └─ Retorna para petList
│
├─ Clica no perfil → profile
│  ├─ Vê seus dados
│  ├─ Vê seus pets
│  ├─ Pode editar perfil
│  └─ Pode fazer logout
│
└─ Clica em "ONGs" → ongs
   └─ Vê ONGs parceiras para doação

ADMIN
└─ Acessa /pendingPetsApproval
   ├─ Vê lista de pets pendentes
   ├─ Clica em pet
   ├─ Aprova ou rejeita
   └─ Pet é atualizado no Firestore
```

---

## 🔍 Validações Principais

### Validação de Email
- Formato padrão de email
- Deve ser único no Firebase

### Validação de Telefone
- Apenas números
- 10 ou 11 dígitos (padrão Brasil)
- Formatação automática: `(XX) XXXXX-XXXX`

### Validação de Fotos de Pet
- Mínimo 1 foto obrigatória
- Múltiplas fotos permitidas
- Compressão automática (qualidade 0.7)

### Validação de Descrição
- Texto livre
- Sem limite específico documentado

---

## 📍 Permissões Necessárias

### iOS
- **Camera**: Para tirar fotos dos pets
- **Photo Library**: Para selecionar fotos da galeria
- **Location**: Para detectar cidade automaticamente

### Android
- **READ_EXTERNAL_STORAGE**: Acesso à galeria
- **WRITE_EXTERNAL_STORAGE**: Salvar fotos
- **ACCESS_FINE_LOCATION**: Localização precisa
- **ACCESS_COARSE_LOCATION**: Localização aproximada

---

## 🛡️ Segurança

### Firebase Firestore Rules
- Recomendações:
  - Apenas usuários autenticados podem ler pets aprovados
  - Apenas proprietário pode editar/deletar seus pets
  - Admin pode ler/atualizar status de todos os pets

### Firebase Storage Rules
- Fotos de pets devem ser públicas (leitura)
- Apenas usuários autenticados podem fazer upload

### Senha
- Gerenciada pelo Firebase Authentication
- Mínimo de segurança automático

---

## 🚀 Componentes Reutilizáveis

### 1. ModernModal
- Componente para exibir modais com diferentes variantes
- Variantes: `success`, `error`, `info`, `warning`

### 2. FormField
- Campo de formulário com validação
- Reutilizado em login, registro, edição de perfil

### 3. EmptyList
- Exibido quando não há pets ou pets pendentes
- Com ícone customizável

### 4. Loading
- Overlay de carregamento global
- Usado em operações assíncronas

---

## 🔧 Serviços

### petApprovalService
- `approvePet(petId)`: Aprova um pet
- `rejectPet(petId, reason)`: Rejeita um pet com motivo
- `getPendingPets()`: Lista pets pendentes
- `getApprovedPets()`: Lista pets aprovados
- `getAllPetsWithStatus()`: Lista todos com status

---

## 📊 Estrutura de Pastas

```
app/
├── screens/           # Telas da aplicação
│   ├── login/
│   ├── register/
│   ├── profile/
│   ├── petList/
│   ├── pdpet/
│   ├── addPet/
│   ├── editProfile/
│   ├── ongs/
│   └── pendingPetsApproval/
├── components/        # Componentes reutilizáveis
│   ├── modal/
│   ├── formField/
│   ├── loading/
│   └── emptyList/
├── services/          # Serviços
│   └── petApprovalService.ts
├── types/             # Definições de tipos
│   ├── user.ts
│   └── pets.ts
├── styles/            # Estilos globais
│   └── colors.ts
└── config/            # Configuração
    └── socialAuthEnv.ts
```

---

## ⚙️ Variáveis de Ambiente Necessárias

- Firebase API Key
- Firebase Project ID
- Google Sign-In Web Client ID
- Apple Sign-In Team ID

---

## 🐛 Estados de Erro Comuns

1. **Erro de Permissão (Storage)**: Usuário não autenticado
2. **Erro de Upload**: Falha na conexão com Firebase Storage
3. **Erro de Localização**: Permissão de localização negada
4. **Erro de API de Raças**: Falha ao buscar raças (fallback para lista padrão)

---

## 📱 Resoluções e Layouts

- Design responsivo para diferentes tamanhos de tela
- Uso de `SafeAreaInsets` para notch e bottom bars
- Suporte a `KeyboardAvoidingView` em formulários
- ScrollView para conteúdo extenso
