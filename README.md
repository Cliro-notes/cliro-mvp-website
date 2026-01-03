# Frontend (Website) de Cliro Notes para el MVP
Este repositorio sirve para todo lo que modificara el DOM y todo lo que se use directamente de la extension o con lo que el usuario interactue. \
Se desarrollara en Next.JS por si facil manejo de API y de SEO (para se encontrados de forma sencilla en Google)

## Estructura / Arquitectura
Website que servira para presentar el proyecto y mas que nada para manejar la lista de espera para usuarios interesados. \
OnePage + waitlist (no auth, no passwords, cero fricción) \
web/ \
├─ app/ \
│  ├─ layout.tsx          # Layout base (html, body) \
│  ├─ page.tsx            # Homepage / OnePage \
│  ├─ globals.css         # Tailwind base \
│  │ \
│  └─ components/ \
│     ├─ sections/        # Secciones grandes del OnePage \
│     │  ├─ Hero.tsx \
│     │  ├─ ValueProp.tsx \
│     │  ├─ Waitlist.tsx \
│     │  ├─ HowItWorks.tsx \
│     │  ├─ FAQ.tsx \
│     │  └─ ... \
│     │ \
│     ├─ forms/           # Formularios \
│     │  ├─ WaitlistForm.tsx \
│     │  └─ ... \
│     │ \
│     ├─ ui/              # Componentes pequeños reutilizables \
│     │  ├─ Input.tsx \
│     │  ├─ Button.tsx \
│     │  ├─ Select.tsx \
│     │  └─ ... \
│     │ \
│     └─ layout/          # Header / Footer si los necesitas \
│        ├─ Header.tsx \
│        ├─ Footer.tsx \
│        └─ ... \
│ \
├─ lib/ \
│  ├─ api.ts              # fetch al backend (waitlist) \
│  ├─ validators.ts       # validaciones simples (email, etc) \
│  └─ constants.ts \
│ \
├─ tailwind.config.ts \
├─ postcss.config.js \
├─ tsconfig.json \
└─ package.json \

### Caraceristicas del Sitio Web
📌 _**Cuestionario para usuarios interesados con los siguientes campos (deben viajar a la BD a traves del backend)**_
Campos típicos (simples):
- Email (required)
- Nombre (optional)
- Ciudad / País
- Ocupación
- Idioma preferido
- Purpose (textarea corto)

Nada de passwords, Nada de sesiones, Solo POST al backend


📌 _**El homepage debe verse como un storyboard, no como un archivo gigante.**_ \
Si alguien abre page.tsx y no entiende la página en 10 segundos → está mal.


📌 _**Secciones ≠ Componentes UI**_
Identificar de forma correcta el folder designado para cada elemento, seccion o diseño \
components/ \
├─ sections/ \
├─ forms/ \
├─ ui/ \


