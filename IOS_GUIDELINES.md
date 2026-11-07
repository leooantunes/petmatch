# PetMatch - Guia de Adaptações iOS

## 🎯 Objetivos de Compatibilidade iOS

1. **Safe Area** - Respeitar notch, home indicator e safe areas
2. **Keyboard** - Gerenciar teclado adequadamente
3. **Navigation** - Transições e gestos nativos do iOS
4. **UI Elements** - Tamanhos mínimos de toque, espaçamento
5. **Colors** - Suportar dark mode
6. **Fonts** - Usar fontes do sistema iOS
7. **Status Bar** - Gerenciar estilo e visibilidade

---

## 📋 Checklist iOS

### SafeAreaInsets
- [ ] Login screen - adicionar padding top/bottom
- [ ] Register screen - adicionar padding top/bottom
- [ ] PetList - adicionar padding top para status bar
- [ ] PDPet - adicionar padding top
- [ ] AddPet - adicionar padding top/bottom
- [ ] Profile - adicionar padding top
- [ ] EditProfile - adicionar padding top
- [ ] ONGs - adicionar padding top
- [ ] PendingPetsApproval - adicionar padding top

### KeyboardAvoidingView
- [ ] Login - behavior="padding" para iOS
- [ ] Register - behavior="padding" para iOS
- [ ] AddPet - behavior="padding" para iOS
- [ ] EditProfile - behavior="padding" para iOS

### Tamanhos de Elemento
- [ ] Botões mínimo 44x44 (iOS guideline)
- [ ] Hit targets mínimo 44pt
- [ ] Espaçamento mínimo entre elementos

### Status Bar
- [ ] Definir barStyle correto por tela
- [ ] Ajustar com SafeAreaInsets

### Cores Dark Mode
- [ ] Testar cores em dark mode
- [ ] Ajustar contraste se necessário

---

## 🔧 Implementações

### Padrão SafeAreaInsets

```typescript
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function MyScreen() {
  const insets = useSafeAreaInsets();
  
  return (
    <View style={{
      flex: 1,
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
      paddingLeft: insets.left,
      paddingRight: insets.right,
    }}>
      {/* conteúdo */}
    </View>
  );
}
```

### Padrão KeyboardAvoidingView iOS

```typescript
<KeyboardAvoidingView
  behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
  keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
>
  {/* conteúdo */}
</KeyboardAvoidingView>
```

### Padrão Botão iOS

```typescript
<TouchableOpacity
  style={{
    minHeight: 44,  // iOS minimum
    minWidth: 44,   // iOS minimum
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
  }}
>
  <Text>{label}</Text>
</TouchableOpacity>
```

---

## 📱 Comportamentos Específicos iOS

### 1. Safe Area Insets
- Top: notch + status bar (até 47pt em iPhone 14 Pro)
- Bottom: home indicator (até 34pt)
- Left/Right: sempre 0 em portrait

### 2. Keyboard
- iOS: usar `padding` no KeyboardAvoidingView
- Offset: 40pt (header + alguns pt)

### 3. Status Bar
- barStyle: 'dark-content' ou 'light-content'
- backgroundColor: transparent em iOS

### 4. Back Button
- iOS: swipe back automático com expo-router
- Customizar apenas se necessário

### 5. Modal
- iOS: fullscreen vs presentation: 'modal'
- AnimationType: 'slide' vs 'fade'

---

## 🎨 Design iOS

### Cores
- Primary: #198a4d (verde - OK para iOS)
- Background: #f5fff5 (branco claro - OK para dark mode)
- Text: #171717 (preto - OK)

### Tipografia
- Font: System (padrão - não precisa mudar)
- Tamanhos: OK conforme definido
- Weights: 400-800 (OK)

### Espaçamento
- Mínimo entre elementos: 8pt
- Mínimo hit target: 44x44pt
- Padding interno: 16pt

### Ícones
- Tamanho mínimo: 24pt (melhor 28-32pt)
- Hit target com padding: 44x44pt

---

## 🔍 Issues Comuns iOS

1. **Keyboard overlapping input** → usar KeyboardAvoidingView
2. **Notch não respeitado** → usar SafeAreaInsets
3. **Home indicator overlap** → usar SafeAreaInsets bottom
4. **Botões muito pequenos** → mínimo 44x44
5. **Cores inadequadas em dark mode** → usar useColorScheme()
6. **Scrolls travando** → verificar zIndex e position
7. **Animações lentas** → otimizar com Animated API

---

## ✅ Testes iOS

1. Abrir tela em iPhone 14 (notch)
2. Abrir tela em iPhone SE (sem notch)
3. Testar com teclado aberto
4. Testar em dark mode
5. Testar com VoiceOver (acessibilidade)
6. Testar swipe back
7. Testar de pais (portrait e landscape)
