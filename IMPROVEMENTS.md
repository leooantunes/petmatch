# PetMatch - Sugestões de Melhorias

## 🎯 Melhorias Identificadas

### 1. **Segurança e Autenticação**

#### 1.1 Implementar Proteção de Rotas Admin
**Arquivo**: `app/screens/pendingPetsApproval/pendingPetsApproval.screen.tsx`

**Problema**: A tela de aprovação de pets está acessível para qualquer usuário logado. Qualquer um pode navegar para `/pendingPetsApproval` e ver/modificar pets.

**Sugestão**: 
```typescript
// Criar context de autenticação com role de admin
const AdminContext = createContext<{ isAdmin: boolean }>({ isAdmin: false });

// Proteger a tela
useEffect(() => {
  if (!isAdmin) {
    router.back();
    showModal({ message: "Acesso negado" });
  }
}, [isAdmin]);
```

---

### 2. **Validações e Tratamento de Erros**

#### 2.1 Validação de Campos Vazios em addPet
**Arquivo**: `app/screens/addPet/addPet.screen.tsx` (linha 311-372)

**Problema**: Não há validação se nome, idade, raça, descrição estão vazios. Usuário pode enviar pet sem preencher esses campos.

**Sugestão**:
```typescript
const validatePetForm = () => {
  if (!name.trim()) return "Nome é obrigatório";
  if (!age) return "Idade é obrigatória";
  if (!breed) return "Raça é obrigatória";
  if (!city.trim()) return "Cidade é obrigatória";
  if (!description.trim()) return "Descrição é obrigatória";
  return null;
};

const handleSubmit = async () => {
  const error = validatePetForm();
  if (error) {
    showModal({ title: "Erro", message: error, variant: "error" });
    return;
  }
  // ... resto do código
};
```

#### 2.2 Tratamento de Erro de Rede
**Arquivo**: Múltiplas telas com `db().collection(...).get()`

**Problema**: Não há retry automático ou tratamento de timeouts de rede.

**Sugestão**: Criar utility function com retry:
```typescript
// app/utils/firebaseRetry.ts
export async function withRetry<T>(
  fn: () => Promise<T>,
  maxRetries = 3,
  delayMs = 1000
): Promise<T> {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await new Promise(r => setTimeout(r, delayMs * (i + 1)));
    }
  }
  throw new Error("Failed after retries");
}
```

#### 2.3 Feedback Visual de Sucesso/Erro Inconsistente
**Arquivo**: `app/components/modal/modernModal.tsx`

**Problema**: Alguns erros são silenciosos (apenas console.error), outros mostram modal.

**Sugestão**: Criar toast system para erros menores:
```typescript
// app/components/toast/toast.component.tsx
interface Toast {
  message: string;
  type: "success" | "error" | "info";
  duration?: number;
}

export const useToast = () => {
  const [toast, setToast] = useState<Toast | null>(null);
  
  const show = (message: string, type: "success" | "error" | "info") => {
    setToast({ message, type, duration: 3000 });
    setTimeout(() => setToast(null), 3000);
  };
  
  return { toast, show };
};
```

---

### 3. **Performance e Otimização**

#### 3.1 Lazy Loading de Imagens de Pets
**Arquivo**: `app/screens/petList/petList.screen.tsx` (linha 26-44)

**Problema**: Todas as imagens são carregadas imediatamente. Em lista grande, pode causar lag.

**Sugestão**: Implementar progressive image loading:
```typescript
// Mostrar placeholder enquanto carrega
<Image 
  source={{ uri: item.image }}
  style={styles.cardImage}
  progressiveRenderingEnabled
  onLoadStart={() => setLoading(true)}
  onLoadEnd={() => setLoading(false)}
/>
```

#### 3.2 Paginação no petList
**Arquivo**: `app/screens/petList/petList.screen.tsx` (linha 54-89)

**Problema**: Sem limite de pets carregados. Com 1000+ pets, a tela fica muito lenta.

**Sugestão**: Implementar paginação:
```typescript
const [page, setPage] = useState(0);
const PETS_PER_PAGE = 10;

const loadPets = async () => {
  const querySnapshot = await db()
    .collection("pets")
    .where("status", "==", "approved")
    .limit(PETS_PER_PAGE)
    .offset(page * PETS_PER_PAGE)
    .get();
  // ...
};
```

#### 3.3 Cache de Dados
**Arquivo**: Múltiplas telas com `db().collection(...).get()`

**Problema**: Dados são recarregados toda vez que a tela volta ao foco, mesmo sem mudanças.

**Sugestão**: Implementar cache simples:
```typescript
// app/utils/cache.ts
class DataCache {
  private cache = new Map<string, { data: any; timestamp: number }>();
  private CACHE_DURATION = 5 * 60 * 1000; // 5 minutos
  
  get(key: string) {
    const item = this.cache.get(key);
    if (!item) return null;
    if (Date.now() - item.timestamp > this.CACHE_DURATION) {
      this.cache.delete(key);
      return null;
    }
    return item.data;
  }
  
  set(key: string, data: any) {
    this.cache.set(key, { data, timestamp: Date.now() });
  }
}
```

---

### 4. **Funcionalidades Ausentes**

#### 4.1 Busca e Filtros de Pets
**Arquivo**: `app/screens/petList/petList.screen.tsx`

**Problema**: Sem busca, sem filtros por raça, idade, localização.

**Sugestão**:
```typescript
<View style={styles.filterBar}>
  <TextInput 
    placeholder="Buscar por nome..."
    onChangeText={setSearchTerm}
  />
  <TouchableOpacity onPress={() => setShowFilters(true)}>
    <Text>Filtros</Text>
  </TouchableOpacity>
</View>

const filtered = pets.filter(pet => 
  pet.name.toLowerCase().includes(searchTerm) &&
  (!selectedBreed || pet.breed === selectedBreed) &&
  (!selectedCity || pet.location === selectedCity)
);
```

#### 4.2 Sistema de Favoritos
**Arquivo**: Novo serviço `app/services/favoritesService.ts`

**Problema**: Usuário não pode salvar pets favoritos.

**Sugestão**: Adicionar coleção `favorites` no Firestore:
```typescript
// Estrutura: users/{userId}/favorites/{petId}
// Tela petList pode mostrar ícone de coração para favoritos
```

#### 4.3 Histórico de Pets Adotados
**Arquivo**: `app/screens/profile/profile.screen.tsx`

**Problema**: Sem forma de marcar pet como "adotado".

**Sugestão**: Adicionar status `adopted` ao pet:
```typescript
enum PetStatus {
  pending = "pending",
  approved = "approved",
  rejected = "rejected",
  adopted = "adopted"
}
```

#### 4.4 Notificações Push
**Arquivo**: Novo serviço `app/services/notificationService.ts`

**Problema**: Sem notificações quando pet é aprovado/rejeitado.

**Sugestão**: Integrar com Expo Notifications ou Firebase Cloud Messaging:
```typescript
// Quando pet for aprovado, enviar notificação ao proprietário
const notifyUserPetApproved = async (ownerId: string, petName: string) => {
  const ownerTokens = await getOwnerDeviceTokens(ownerId);
  await sendNotification(ownerTokens, {
    title: "Pet Aprovado!",
    body: `${petName} foi aprovado e está visível para adoção`
  });
};
```

#### 4.5 Edição e Exclusão de Pets Próprios
**Arquivo**: `app/screens/profile/profile.screen.tsx`

**Problema**: Usuário não pode editar/deletar seus pets após criação.

**Sugestão**:
```typescript
// Adicionar botões Edit/Delete em cada pet no perfil
<TouchableOpacity onPress={() => router.push({
  pathname: "/screens/editPet/editPet.screen",
  params: { petId: pet.id }
})}>
  <Text>Editar</Text>
</TouchableOpacity>
```

---

### 5. **Usabilidade e UX**

#### 5.1 Confirmação de Logout
**Arquivo**: `app/screens/profile/profile.screen.tsx`

**Problema**: Logout acontece sem confirmação. Usuário pode fazer logout acidentalmente.

**Sugestão**:
```typescript
const handleLogout = () => {
  showModal({
    title: "Confirmar Logout",
    message: "Tem certeza que deseja sair?",
    showCancelButton: true,
    onConfirm: async () => {
      await auth().signOut();
      router.push("/screens/login/login.screen");
    }
  });
};
```

#### 5.2 Indicadores de Carregamento Mais Claros
**Arquivo**: `app/components/loading/loading.component.tsx`

**Problema**: Loading global é visualmente genérico.

**Sugestão**: Adicionar mensagens contextuais:
```typescript
const { showLoading, hideLoading } = useLoading();

// Ao invés de apenas mostrar spinner:
showLoading("Enviando pet para aprovação...");
showLoading("Aprovando pet...");
```

#### 5.3 Empty States Melhores
**Arquivo**: `app/screens/pendingPetsApproval/pendingPetsApproval.screen.tsx`

**Problema**: Message genérica "Todos os pets foram aprovados".

**Sugestão**: Adicionar icon animado e mensagem mais friendly:
```typescript
<View style={styles.emptyState}>
  <LottieView
    source={require("../../../assets/animations/checkmark.json")}
    autoPlay
    loop={false}
  />
  <Text style={styles.emptyTitle}>Parabéns! 🎉</Text>
  <Text style={styles.emptyMessage}>
    Todos os pets foram revisados e aprovados
  </Text>
</View>
```

#### 5.4 Informações sobre Motivo de Rejeição
**Arquivo**: `app/screens/profile/profile.screen.tsx`

**Problema**: Se pet foi rejeitado, usuário não sabe o motivo.

**Sugestão**: Mostrar motivo da rejeição no perfil:
```typescript
{pet.status === "rejected" && (
  <View style={styles.rejectionBanner}>
    <Text style={styles.rejectionTitle}>Pet Rejeitado</Text>
    <Text style={styles.rejectionReason}>
      {pet.rejectionReason}
    </Text>
    <TouchableOpacity onPress={() => editPet(pet.id)}>
      <Text>Editar e Reenviar</Text>
    </TouchableOpacity>
  </View>
)}
```

---

### 6. **Código e Arquitetura**

#### 6.1 Extrair Lógica de Firebase em Serviços
**Arquivo**: Múltiplas telas

**Problema**: Queries Firebase espalhadas em muitas telas. Difícil manter e testar.

**Sugestão**: Criar serviços centralizados:
```typescript
// app/services/petService.ts
export const petService = {
  async getApprovedPets() { /* ... */ },
  async getUserPets(userId: string) { /* ... */ },
  async getPetById(petId: string) { /* ... */ },
  async updatePetStatus(petId: string, status: string) { /* ... */ }
};
```

#### 6.2 Constants Centralizadas
**Arquivo**: Múltiplas telas

**Problema**: Strings e valores mágicos espalhados no código (ex: URLs de APIs, limites).

**Sugestão**:
```typescript
// app/constants/config.ts
export const API_ENDPOINTS = {
  DOG_BREEDS: "https://dog.ceo/api/breeds/list/all",
  CAT_BREEDS: "https://api.thecatapi.com/v1/breeds"
};

export const PETS_CONFIG = {
  PHOTO_QUALITY: 0.7,
  MAX_PHOTOS: 10,
  MIN_PHOTOS: 1
};

export const AGE_RANGES = [
  "0-1 ano",
  "1-3 anos",
  // ...
];
```

#### 6.3 Types Compartilhados
**Arquivo**: `app/types/pets.ts`

**Problema**: Tipo `Pet` não inclui campo `status`.

**Sugestão**:
```typescript
export type PetStatus = "pending" | "approved" | "rejected" | "adopted";

export type Pet = {
  id: string;
  name: string;
  age: string;
  breed: string;
  location: string;
  description: string;
  image: string;
  images?: string[];
  neutered: boolean;
  status: PetStatus;  // NOVO
  ownerId: string;    // NOVO
  createdAt: Date;    // NOVO
};
```

---

### 7. **Testes**

#### 7.1 Falta de Testes Automatizados
**Arquivo**: Nenhum arquivo de teste encontrado

**Problema**: Sem testes unitários ou de integração.

**Sugestão**: Configurar Jest + React Native Testing Library:
```typescript
// __tests__/services/petService.test.ts
describe("petService", () => {
  it("should return only approved pets", async () => {
    const pets = await petService.getApprovedPets();
    expect(pets.every(p => p.status === "approved")).toBe(true);
  });
});
```

---

### 8. **Documentação**

#### 8.1 Falta de Comentários em Funções Complexas
**Arquivo**: `app/screens/pdpet/pdpet.screen.tsx` (linha 25-96)

**Problema**: Funções como `extractPetImages` e `normalizeWhatsAppNumber` não têm comentários.

**Sugestão**:
```typescript
/**
 * Normaliza número de telefone para formato WhatsApp
 * Adiciona +55 (Brasil) se necessário
 * @param phone - Número com ou sem formatação
 * @returns Número normalizado para WhatsApp (ex: 5511999990001)
 */
const normalizeWhatsAppNumber = (phone: string): string => {
  // ...
};
```

---

### 9. **Segurança de Dados**

#### 9.1 Verificação de Permissões Inadequada
**Arquivo**: `app/screens/profile/profile.screen.tsx`

**Problema**: Não verifica se usuário é proprietário antes de deletar/editar pets.

**Sugestão**: Adicionar verificação client-side e regras no Firestore:
```typescript
// Client-side
if (pet.ownerId !== auth().currentUser?.uid) {
  showModal({ message: "Você não tem permissão para editar este pet" });
  return;
}

// Firestore rules
match /pets/{petId} {
  allow update: if resource.data.ownerId == request.auth.uid;
  allow delete: if resource.data.ownerId == request.auth.uid;
}
```

#### 9.2 Validação de Entrada Insuficiente
**Arquivo**: `app/screens/register/register.screen.tsx`

**Problema**: Sem validação de comprimento mínimo de senha.

**Sugestão**:
```typescript
const MIN_PASSWORD_LENGTH = 8;

const validatePassword = (password: string) => {
  if (password.length < MIN_PASSWORD_LENGTH) {
    return `Senha deve ter no mínimo ${MIN_PASSWORD_LENGTH} caracteres`;
  }
  // Adicionar mais validações conforme necessário
};
```

---

### 10. **Dependências e Build**

#### 10.1 Atualizar Dependências Obsoletas
**Arquivo**: `package.json`

**Problema**: Possível ter dependências desatualizadas.

**Sugestão**: Executar regularmente:
```bash
npm outdated
npm update
npm audit fix
```

#### 10.2 Configuração de Lint/Prettier
**Arquivo**: Nenhum `.eslintrc` encontrado

**Problema**: Sem formatação automática e lint de código.

**Sugestão**: Adicionar ESLint e Prettier:
```bash
npm install --save-dev eslint prettier eslint-config-prettier
npx eslint --init
```

---

## 📊 Resumo de Prioridades

| Prioridade | Categoria | Melhoria |
|-----------|-----------|---------|
| 🔴 Alta | Segurança | Proteção de rotas admin |
| 🔴 Alta | Validação | Validação de formulários |
| 🔴 Alta | Segurança | Verificação de permissões |
| 🟠 Média | Performance | Paginação de pets |
| 🟠 Média | Funcionalidade | Busca e filtros |
| 🟠 Média | Funcionalidade | Notificações push |
| 🟡 Baixa | UX | Indicadores de carregamento |
| 🟡 Baixa | Código | Testes automatizados |

---

## 🎬 Próximas Ações Sugeridas

1. **Curto Prazo (1-2 sprints)**:
   - [ ] Implementar proteção de rotas admin
   - [ ] Adicionar validações de formulário
   - [ ] Adicionar paginação

2. **Médio Prazo (3-4 sprints)**:
   - [ ] Implementar busca e filtros
   - [ ] Adicionar sistema de favoritos
   - [ ] Adicionar notificações push

3. **Longo Prazo (5+ sprints)**:
   - [ ] Testes automatizados
   - [ ] Sistema de comentários/ratings
   - [ ] Analytics e relatórios
