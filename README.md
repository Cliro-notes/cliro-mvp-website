# Frontend (Website) de Cliro Notes para el MVP
Este repositorio sirve para todo lo que modificara el DOM y todo lo que se use directamente de la extension o con lo que el usuario interactue. \
Se desarrollara en Next.JS por si facil manejo de API y de SEO (para se encontrados de forma sencilla en Google)

## Estructura / Arquitectura
Website que servira para presentar el proyecto y mas que nada para manejar la lista de espera para usuarios interesados. \
OnePage + waitlist (no auth, no passwords, cero fricción) \

### Caraceristicas del Sitio Web
📌 **Cuestionario para usuarios interesados con los siguientes campos (deben viajar a la BD a traves del backend)**
Campos típicos (simples):
- Email (required)
- Nombre (optional)
- Ocupación
- Idioma preferido

•  Nada de passwords  •  Nada de sesiones  •  Solo POST al backend


📌 **El homepage debe verse como un storyboard, no como un archivo gigante.** \
Si alguien abre la pagina y no entiende la página en 10 segundos → está mal.

---

## Secciones ≠ Componentes UI
Identificar de forma correcta el folder designado para cada elemento, seccion o diseño \

📁 app/ \
**🗎 layout.jsx**
- Controla TODO el layout global
- Define <html>, <body>, fuentes, metadata
- Se renderiza una sola vez
- Es el layout raíz del sitio

**🗎 page.jsx** \
Importa y ordena las secciones \
Ejemplo:
```bash
<Hero />
<ValueProp />
<Waitlist />
```
**🗎 global.css**
- Tailwind Base
- Estilos Globales

📁 app/sections/ \
Secciones grandes visibles del landing \
👉 Cada archivo = una sección completa de la página:
- Hero
- How it works
- Waitlist
- FAQ
- ...

📁 app/ui/ \
Componentes pequeños reutilizables \
👉 Solo UI, sin lógica de negocio:
- Inputs
- Buttons
- Labels
- ...

📁 lib/ \
Lógica mínima compartida \
👉 Solo UI, sin lógica de negocio: 
- api.js → fetch al backend (waitlist)
- validators.js → email, campos vacíos, etc.

📁 public/ \
Assets estáticos
- Imágenes
- Icons
- Favicon

