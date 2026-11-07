# Adaptações iOS - Ordem de Implementação

## 🎯 Padrão Padrão iOS (Aplicar a todas as telas)

```typescript
import { SafeAreaView } from "react-native-safe-area-context";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ScreenName() {
  const insets = useSafeAreaInsets();
  
  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" />
      
      {/* Para ScrollView */}
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 16 }
        ]}
        automaticallyAdjustKeyboardInsets
      >
        {/* conteúdo */}
      </ScrollView>
      
      {/* Para FlatList */}
      <FlatList
        contentContainerStyle={[
          styles.listContent,
          { paddingBottom: insets.bottom }
        ]}
      />
    </SafeAreaView>
  );
}
```

## ✅ Telas a Adaptar

- [x] Login - 80% (falta SafeAreaView wrapper)
- [ ] Register - 0%
- [ ] AddPet - 10%
- [ ] PetList - 0%
- [ ] Profile - 0%
- [ ] EditProfile - 20%
- [ ] PDPet - 10%
- [ ] ONGs - 0%
- [ ] PendingPetsApproval - 10%

## 🚀 Começando adaptações...
