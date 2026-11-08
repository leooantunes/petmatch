# Removendo Texto da Imagem Gato-Cachorro

A imagem `gato-cachorro-pixel-v3.png` atualmente possui o texto "MyPetMatch" na parte inferior.

## Opções para Remover o Texto

### 1️⃣ Ferramentas Online (Recomendado - Mais Fácil)

#### Pixlr (https://pixlr.com/)
- Abra https://pixlr.com/editor/
- Upload → Selecione `gato-cachorro-pixel-v3.png`
- Use a ferramenta "Remove Object" ou "Clone Stamp"
- Remova o texto branco "MyPetMatch"
- Export → PNG
- Substitua o arquivo original

#### Remove.bg (https://www.remove.bg/)
- Abra o site
- Upload da imagem
- Use a ferramenta de edição para remover texto
- Download do resultado

### 2️⃣ Ferramentas Locais

#### ImageMagick (Command Line)
```bash
# Remover apenas a parte com texto (bottom 30%)
convert gato-cachorro-pixel-v3.png -crop 100%x70%+0+0 gato-cachorro-pixel-v3-sem-texto.png

# Depois mova para assets
mv gato-cachorro-pixel-v3-sem-texto.png assets/images/gato-cachorro-pixel-v3.png
```

#### Python com PIL
```python
from PIL import Image

img = Image.open('gato-cachorro-pixel-v3.png')
# Remove bottom 30% (texto)
width, height = img.size
cropped = img.crop((0, 0, width, int(height * 0.7)))
cropped.save('gato-cachorro-pixel-v3-sem-texto.png')
```

#### GIMP (Interface Gráfica)
1. Abra GIMP
2. File → Open → `gato-cachorro-pixel-v3.png`
3. Selecione a área com texto branco
4. Edit → Clear ou Delete
5. File → Export As → PNG
6. Substitua o arquivo

### 3️⃣ Criar Nova Imagem (Mais Complexo)

Se quiser recriar apenas o pixel art do gato e cachorro:
- Use pixel art tools como Aseprite, Piskel, ou Blockbench
- Crie apenas o rosto do gato e cachorro
- Exporte como PNG 256x256px
- Use como favicon e splash

## Integração no App

Após remover o texto, apenas:
1. Substitua o arquivo em `assets/images/gato-cachorro-pixel-v3.png`
2. O app automaticamente usará a versão sem texto em:
   - Favicon (web)
   - Splash screen
   - App icon
   - Logos nas telas (login, register, profile, petList)

## Status Atual

✅ Splash screen já está configurada com animações:
- Fade in (800ms)
- Scale up (900ms)
- Rotação suave (1000ms)
- Dots animados no fundo
- Transição automática após 2.8s

✅ Logo no Login com animações:
- Fade + Scale simultâneas
- Suave easing

Assim que remover o texto, a imagem limpa aparecerá em tudo!
