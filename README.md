# 🧠 The Chronicles of Orwyn — Un rpg de texto con generación narrativa en tiempo real

**Es un juego narrativo de exploración y decisiones** ambientado en un mundo de fantasía, donde el jugador recorre ciudades, bosques y ruinas ancestrales. Un proyecto construido con **Next.js** y **Open routers**, que combina *un modelo de lenguaje de texto* y *la lógica de juego de un rpg convencional*.

---

## 📖 Descripción

**Orwyn rpg** es un proyecto personal diseñado para experimentar con la integración de modelos de lenguaje dentro de una lógica de juego tradicional.
Toda la narrativa —diálogos, descripciones, escenas y eventos— es **redactada en tiempo real por una IA**, mientras que la **historia base, ítems, misiones y eventos lógicos** fueron desarrollados manualmente.

El objetivo fue crear una experiencia inmersiva donde el jugador sienta que el mundo responde naturalmente a sus acciones, logrando un punto medio entre *juego programado* y *historia generada dinámicamente*.

---

## ⚙️ Tecnologías utilizadas

| Área | Tecnologías |
|------|-------------|
| Frontend | Next.js, React, UI·UX personalizado |
| Narrativa IA | MistralAI – mistralai/mistral-nemo:free (vía OpenRouters) |
| Backend · API | Next.js API Routes |
| Gestión de estado | React Hooks & Context |
| Despliegue | Vercel |
| Recursos | WebP para ítems, animaciones y fondos dinámicos (webm) |

---

## 🧩 Cómo funciona

- **Motor narrativo:** Cada evento, acción o decisión genera un conjunto de datos (estado del jugador, localización, acción, entorno). Estos datos son enviados a un **modelo de lenguaje (LLM)** que los convierte en texto narrativo coherente y contextual.
- **Sistema de exploración:** El jugador puede desplazarse entre zonas abiertas, ciudades, templos o ruinas, encontrando **eventos aleatorios, estructuras misteriosas o comerciantes errantes**.
- **Inventario y progresión:** Incluye un sistema de inventario con **drag & drop**, equipamiento (mano izquierda, derecha y armadura), y administración de ítems.
- **Eventos y lógica interna:** Los eventos están clasificados por tipo: *estructura, cadáver, caravana, comerciante, monstruo, etc.* Cada uno puede generar texto o acciones distintas según el contexto del jugador.

---

## 🚀 Cómo usarlo

### 🧩 1. Clonar el repositorio
```bash
git clone https://github.com/maaquin/Orwyn_rpg.git
cd EmotionDetector
```

### ⚙️ 2. Instalar dependencias
```bash
npm install
```

### ▶️ 4. Ejecutar el proyecto
```bash
npm run dev
```

- Luego abre tu navegador en http://localhost:5173

## 🌐 Despliegue

- Enlace al proyecto desplegado: [orwyn-rpg](https://orwyn-rpg.vercel.app)

---

## ✨ Notas

- Este proyecto fue creado con fines **didácticos y experimentales**, para explorar cómo la IA puede adaptarse a sistemas de juego interactivos.
- A pesar de ello, **es completamente jugable**, con misiones, ítems y exploración libre.
- La narrativa del modelo puede variar entre partidas, ofreciendo **una experiencia distinta en cada sesión**.
---

## 📌 Autor

- Luciano Maquin – [@Maaquin](https://github.com/maaquin)