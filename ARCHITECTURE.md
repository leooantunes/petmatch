# PetMatch - Arquitetura e Estrutura do App

## 🏗️ Visão Geral da Arquitetura

```
┌─────────────────────────────────────────────────────┐
│                  React Native + Expo                  │
│                   (Presentation Layer)                │
└────────────────┬────────────────────────────────────┘
                 │
┌────────────────▼────────────────────────────────────┐
│              App Navigation & Routing                 │
│                  (expo-router)                        │
└────────────────┬────────────────────────────────────┘
                 │
┌────────────────▼────────────────────────────────────┐
│                     Screens                          │
│  (Login, Register, Profile, PetList, AddPet, etc)  │
└────────────────┬────────────────────────────────────┘
                 │
     ┌───────────┼───────────┐
     │           │           │
┌────▼────┐ ┌───▼────┐ ┌───▼────┐
│Components│ │Services│ │Context │
│  (UI)    │ │(Logic) │ │ (State)│
└────┬────┘ └───┬────┘ └───┬────┘
     │          │          │
     └───────────┼──────────┘
                 │
┌────────────────▼────────────────────────────────────┐
│                  Firebase Backend                    │
│  ├─ Authentication (Auth)                           │
│  ├─ Database (Firestore)                           │
│  └─ Storage (Cloud Storage)                        │
└─────────────────────────────────────────────────────┘
```

---

## 📂 Estrutura de Pastas Detalhada

### `/app/screens`
Cada tela é uma pasta com:
- `[name].screen.tsx` - Componente principal da tela
- `_[name].styles.ts` - Estilos específicos da tela

**Telas Implementadas:**

```
screens/
├── login/
│   ├── login.screen.tsx (Autenticação)
│   └── _login.styles.ts
│
├── register/
│   ├── register.screen.tsx (Criação de conta)
│   └── _register.styles.ts
│
├── petList/
│   ├── petList.screen.tsx (Lista de pets aprovados)
│   └── _petList.styles.ts
│
├── pdpet/
│   ├── pdpet.screen.tsx (Detalhe do pet + contato)
│   └── _pdpet.styles.ts
│
├── profile/
│   ├── profile.screen.tsx (Perfil do usuário)
│   └── _profile.styles.ts
│
├── editProfile/
│   ├── editProfile.screen.tsx (Edição de perfil)
│   └── _editProfile.styles.ts
│
├── addPet/
│   ├── addPet.screen.tsx (Cadastro de novo pet)
│   └── _addPet.styles.ts
│
├── ongs/
│   ├── ongs.screen.tsx (Lista de ONGs parceiras)
│   └── _ongs.styles.ts
│
└── pendingPetsApproval/
    ├── pendingPetsApproval.screen.tsx (Admin: aprovar/rejeitar)
    └── _pendingPetsApproval.styles.ts
```

### `/app/components`
Componentes reutilizáveis não específicos de tela:

```
components/
├── modal/
│   ├── modernModal.tsx (Componente de modal)
│   ├── modalCopy.ts (Constantes de títulos/botões)
│   └── _modal.styles.ts
│
├── formField/
│   ├── formField.component.tsx (Input reutilizável)
│   └── _formField.styles.ts
│
├── loading/
│   ├── loading.component.tsx (Spinner global)
│   └── loading.styles.ts
│
└── emptyList/
    ├── emptyList.component.tsx (Placeholder de lista vazia)
    └── emptyList.styles.ts
```

### `/app/services`
Lógica de negócio centralizada:

```
services/
└── petApprovalService.ts (Aprovação de pets)
    ├── approvePet()
    ├── rejectPet()
    ├── getPendingPets()
    ├── getApprovedPets()
    └── getAllPetsWithStatus()
```

### `/app/types`
Definições de tipos TypeScript:

```
types/
├── user.ts
│   ├── User
│   ├── UserCredentials
│   ├── UserRegistration
│   └── UserProfile
│
└── pets.ts
    ├── Pet
    └── PetRouteParams
```

### `/app/styles`
Estilos e temas globais:

```
styles/
├── colors.ts (Paleta de cores)
├── FONT_SIZE
├── SPACING
├── BORDER_RADIUS
└── FONT_WEIGHT
```

### `/app/config`
Configurações específicas:

```
config/
└── socialAuthEnv.ts (Configuração de Google/Apple Sign-In)
```

---

## 🔄 Fluxo de Dados

### 1. Autenticação

```
User Input (Login)
    ↓
loginScreen.tsx
    ↓
Firebase Auth.signInWithEmailAndPassword()
    ↓
auth().onAuthStateChanged() [Index.tsx]
    ↓
isLoggedIn = true
    ↓
Redirect to /petList
```

### 2. Adicionar Pet

```
User Input (Add Pet)
    ↓
addPet.screen.tsx
    ├─ Pick Images → Image Compression
    ├─ Upload to Firebase Storage
    └─ Save Metadata to Firestore
    ↓
db().collection("pets").add({
  status: "pending",
  ownerId: currentUser.uid,
  createdAt: now,
  images: [url1, url2, ...],
  ...
})
    ↓
Success Modal → Redirect to petList
```

### 3. Listar Pets Aprovados

```
User Opens petList
    ↓
useEffect() triggers
    ↓
db().collection("pets").where("status", "==", "approved").get()
    ↓
Map docs to Pet objects
    ↓
setPets(loadedPets)
    ↓
FlatList renders
```

### 4. Aprovar/Rejeitar Pet (Admin)

```
Admin Opens pendingPetsApproval
    ↓
db().collection("pets").where("status", "==", "pending").get()
    ↓
Display List
    ↓
Admin clicks Approve/Reject
    ↓
petApprovalService.approvePet() or .rejectPet()
    ↓
db().collection("pets").doc(petId).update({
  status: "approved" | "rejected",
  approvedAt | rejectedAt: now,
  ...
})
    ↓
Remove from pending list (UI)
```

---

## 🎨 Design System

### Cores (COLORS)

```typescript
// Primary - Verde
primary: "#198a4d"
primaryDark: "#006b2e"
primaryDarker: "#134a2d"
primaryMedium: "#2a6f3f"
primaryLight: "#4b8057"

// Backgrounds
backgroundLight: "#e9f5ea"
backgroundVeryLight: "#f5fff5"

// Borders
borderLight: "#a8d5b0"
borderVeryLight: "#cce5d1"

// Neutros
white: "#ffffff"
black: "#171717"
textSecondary: "#6e6e73"

// Status
danger: "#d70015"
```

### Espaçamento (SPACING)

```typescript
xs: 4,    // Minimal spacing
sm: 8,
md: 12,   // Standard spacing
lg: 16,   // Large spacing
xl: 20,
xxl: 24   // Extra large
```

### Border Radius (BORDER_RADIUS)

```typescript
sm: 8,
md: 10,
lg: 12,   // Standard radius
xl: 20,
full: 999 // Circular
```

### Tipografia (FONT_SIZE & FONT_WEIGHT)

```typescript
FONT_SIZE: {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 24,
  xxl: 32
}

FONT_WEIGHT: {
  regular: "400",
  medium: "600",
  bold: "700",
  extraBold: "800"
}
```

---

## 📱 Responsividade

- **SafeAreaInsets**: Gerenciar notch e bottom bars
- **Flex Layout**: Flexbox para layouts responsivos
- **Platform Specific**: Diferentes comportamentos iOS/Android
  - `KeyboardAvoidingView` com behavior diferente
  - `Platform.OS === 'ios'` vs `'android'`

---

## 🔌 Integrações Externas

### Firebase
- **Authentication**: Email/Senha, Google, Apple
- **Firestore**: Dados de usuários e pets
- **Storage**: Imagens de pets

### APIs Externas
- **Dog Breeds API**: `https://dog.ceo/api/breeds/list/all`
- **Cat Breeds API**: `https://api.thecatapi.com/v1/breeds`
- **WhatsApp**: Deep linking para contato
- **Geolocalização**: Expo Location para detectar cidade

---

## 🧩 Padrões Utilizados

### 1. Custom Hooks
```typescript
// app/components/loading/loading.component.tsx
const useLoading = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  return {
    showLoading: () => setIsVisible(true),
    hideLoading: () => setIsVisible(false),
    isVisible
  };
};
```

### 2. Provider Pattern para Modal
```typescript
// Múltiplas telas usam o mesmo padrão
const [modal, setModal] = useState<ModalState>({
  visible: false,
  title: "",
  message: "",
  variant: "info"
});

const showModal = (next: Omit<ModalState, "visible">) => {
  setModal({ ...next, visible: true });
};
```

### 3. URL Normalization
```typescript
// Normalizar URLs de imagens, telefones, etc.
const normalizeWhatsAppNumber = (phone: string) => {
  const digitsOnly = phone.replace(/\D/g, "");
  return digitsOnly.length === 11 ? `55${digitsOnly}` : digitsOnly;
};
```

### 4. Fallback Images
```typescript
// Se imagem falhar, mostrar placeholder
const fallbackImage = "https://...placeholder...";

<Image 
  source={{ uri: imageUri }}
  onError={() => {
    if (imageUri !== fallbackImage) {
      setImageUri(fallbackImage);
    }
  }}
/>
```

---

## 🚀 Fluxo de Inicialização

```
App Starts
  ↓
firebase.ts: Initialize Firebase
  ↓
app/index.tsx: Check Auth State
  ├─ Loading: Show Spinner
  ├─ Auth State Changed Listener
  ├─ isLoggedIn = true: Go to /petList
  └─ isLoggedIn = false: Go to /login
  ↓
Router loads screens as needed
```

---

## 📊 State Management

- **Local State (useState)**: Gerenciar estado de formulários, modais, loading
- **Firebase Auth State**: Gerenciar autenticação global
- **URL Parameters (useLocalSearchParams)**: Passar dados entre telas

**Nota**: Sem Context API ou Redux implementado atualmente. Possível necessidade de implementar para estado compartilhado.

---

## 🔐 Segurança

### Firestore Rules (Recomendado)

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Apenas usuários autenticados
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
    }
    
    match /pets/{petId} {
      // Ler pets aprovados
      allow read: if resource.data.status == 'approved' ||
                     request.auth.uid == resource.data.ownerId ||
                     request.auth.uid in db.collection('admins').get().data.userIds;
      
      // Escrever apenas seu próprio pet
      allow write: if request.auth.uid == resource.data.ownerId;
      
      // Admin pode atualizar status
      allow update: if request.auth.uid in db.collection('admins').get().data.userIds;
    }
  }
}
```

### Firebase Storage Rules

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /petPhotos/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

---

## 📈 Performance Considerations

1. **Image Optimization**
   - Compressão automática (qualidade 0.7)
   - Diferentes URLs por tamanho necessário

2. **Lazy Loading**
   - Imagens carregam conforme scroll
   - Usar `progressiveRenderingEnabled`

3. **Data Fetching**
   - Implementar paginação (não carregar tudo)
   - Cache de dados com TTL

4. **Bundle Size**
   - Usar tree-shaking para remover código não-usado
   - Lazy load de telas via expo-router

---

## 🧪 Testabilidade

Atual: Sem testes automatizados

Recomendado:
- Jest para testes unitários
- React Native Testing Library para testes de componentes
- Firebase Emulator para testes de integração

---

## 📚 Dependências Principais

- `react-native-firebase/auth` - Autenticação
- `react-native-firebase/firestore` - Banco de dados
- `react-native-firebase/storage` - Armazenamento
- `expo-router` - Navegação
- `expo-image-picker` - Seleção de imagens
- `expo-location` - Geolocalização
- `@react-native-google-signin/google-signin` - Login Google
- `expo-apple-authentication` - Login Apple
