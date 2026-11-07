# Sistema de Aprovação de Pets

## Visão Geral

O sistema de aprovação de pets foi implementado para garantir que apenas pets adequados apareçam na lista pública. Quando um usuário adiciona um novo pet, ele começa com o status `pending` (pendente) e precisa ser aprovado por um administrador antes de aparecer na lista.

## Fluxo

### 1. Adicionar Pet (Tela `/screens/addPet/addPet.screen.tsx`)
- Usuário preenche o formulário e envia o pet
- Pet é salvo no Firestore com `status: "pending"`
- Usuário recebe mensagem informando que o pet foi enviado para aprovação

### 2. Listar Pets (Tela `/screens/petList/petList.screen.tsx`)
- Apenas pets com `status: "approved"` são exibidos
- Pets em status `pending` ou `rejected` não aparecem na lista

### 3. Aprovar/Rejeitar Pets (Tela `/screens/pendingPetsApproval/pendingPetsApproval.screen.tsx`)
- Acesse a rota: `/screens/pendingPetsApproval/pendingPetsApproval.screen`
- Lista de pets pendentes com contador
- Ao clicar em um pet, é possível:
  - **Aprovar**: O pet passa para status `approved` e fica visível na lista de pets
  - **Rejeitar**: O pet passa para status `rejected` com motivo da rejeição

## Mudanças no Banco de Dados

### Documento de Pet agora contém:

```javascript
{
  name: "Bilu",
  age: "1-3 anos",
  breed: "Poodle",
  neutered: true,
  location: "São Paulo",
  description: "Pet muito dócil",
  image: "https://...",
  images: ["https://...", "https://..."],
  ownerId: "user123",
  status: "pending", // NOVO: "pending" | "approved" | "rejected"
  createdAt: Timestamp,
  approvedAt?: Timestamp, // NOVO: Preenchido quando aprovado
  rejectionReason?: string, // NOVO: Preenchido quando rejeitado
  rejectedAt?: Timestamp, // NOVO: Preenchido quando rejeitado
}
```

## Serviço de Aprovação

O arquivo `app/services/petApprovalService.ts` fornece funções utilitárias:

```typescript
// Aprovar um pet
await petApprovalService.approvePet(petId);

// Rejeitar um pet
await petApprovalService.rejectPet(petId, "Motivo da rejeição");

// Obter pets pendentes
const pendingPets = await petApprovalService.getPendingPets();

// Obter pets aprovados
const approvedPets = await petApprovalService.getApprovedPets();

// Obter todos os pets com status
const allPets = await petApprovalService.getAllPetsWithStatus();
```

## Acesso ao Painel de Aprovação

Para acessar o painel de aprovação de pets, você pode:

1. **Adicionar um botão na tela de perfil/home** (se for admin)
2. **Acessar diretamente via URL**: `/screens/pendingPetsApproval/pendingPetsApproval.screen`

### Exemplo de implementação em um menu:

```typescript
<TouchableOpacity 
  onPress={() => router.push("/screens/pendingPetsApproval/pendingPetsApproval.screen")}
>
  <Text>Aprovar Pets</Text>
</TouchableOpacity>
```

## Considerações Futuras

1. **Autenticação de Admin**: Implementar verificação de permissões para restringir o acesso ao painel apenas para administradores
2. **Notificações**: Notificar o proprietário quando seu pet for aprovado ou rejeitado
3. **Filtros Avançados**: Adicionar filtros por data, cidade, tipo de animal, etc.
4. **Relatórios**: Criar relatórios de pets aprovados/rejeitados por período
5. **Sistema de Regras**: Configurar regras automáticas de aprovação baseadas em critérios
