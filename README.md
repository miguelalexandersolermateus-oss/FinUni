# FinUni — Proyecto CORTEX | Chatbot cognitivo local

**FinUni** es un prototipo educativo de gestión financiera universitaria (COP) desarrollado para la exposición del Proyecto CORTEX, de **18 semanas y 6 fases**. No usa Gemini, ninguna API, Python, Render ni claves privadas. Abre `index.html` con tu navegador o publícalo con GitHub Pages.

## Funciones verificables

- Ingresos, gastos, categorías, balance mensual, gráficos y metas de ahorro.
- Registro y eliminación de movimientos, exportación e importación de datos JSON.
- Chatbot cognitivo **basado en reglas**: 25 temas, 4 preguntas de referencia por tema = **100 preguntas de ejemplo**, más variaciones reconocibles por palabras clave.
- Cálculos con montos escritos explícitamente, consultas al balance y metas guardados localmente.
- Memoria breve de conversación durante la sesión de la pestaña (`sessionStorage`).
- Respuestas para frustración, sarcasmo, déficit y advertencias de privacidad.
- Datos financieros en `localStorage` de cada navegador; sin sincronización entre equipos.

**Limitación honesta:** No es un modelo de IA generativa entrenado ni garantiza entender todas las variaciones; cuando no reconoce una consulta solicita aclaración. Los números de ejemplo deben escribirse en orden (ingresos, gastos; o costo de meta, acumulado, ahorro mensual). No ingresa ni modifica movimientos mediante chat.

## Archivos públicos para GitHub

```
index.html       Vista de FinUni
styles.css       Estilos originales del dashboard
app.js           Finanzas y motor de reglas
conocimiento.js  Base de las 25 intenciones y sus 100 ejemplos
preguntas.json   Catálogo legible de preguntas y respuestas
README.md        Documentación para la profesora
.gitignore       Evita subir claves si existieran
```

## Publicación GitHub Pages

1. **Conserva tu repositorio FinUni** y su historial. Haz una copia de los archivos previos antes de reemplazarlos.
2. Desde el repositorio en GitHub, sube **los archivos del interior de esta carpeta** a la raíz (no subas la carpeta contenedora como subcarpeta).
3. Actualiza o elimina `config.js`, `server.py`, `backend/` y cualquier `.env` de versiones anteriores: esta edición no los usa. **Nunca subas claves API**.
4. Confirma la actualización (**Commit changes**). En **Settings → Pages**, conserva la rama publicada y `/(root)`.
5. Revisa `https://miguelalexandersolermateus-oss.github.io/FinUni/`, recarga con Ctrl+F5 y abre Asistente FinUni.

Si tu repositorio usa un nombre diferente al de ese ejemplo, la URL de Pages será diferente.

## Relación con las 18 semanas de CORTEX

| Fase | Semanas | Demostración |
|---|---|---|
| Génesis | 1–3 | Propósito, perfil y radar cognitivo documentados |
| Los Sentidos | 4–6 | Texto, valores y categorización; detección de intención |
| Almacenamiento | 7–9 | Datos `localStorage` y ventana reciente de chat (`sessionStorage`) |
| Protocolo | 10–12 | Tono claro, mensajes de recuperación, casos de sarcasmo |
| Motor lógico | 13–15 | Árboles de decisión de balance, déficit y metas; no inventar cifras |
| Sistema de control | 16–18 | Motivación, empatía, respuesta de crisis y pruebas de integración |

Las escalas del radar cognitivo y ponderaciones de motivación son **documentación conceptual**, no métricas reales de desempeño implementadas.

## Cinco preguntas para demostrar en la exposición

1. ¿Qué es FinUni y cómo puede ayudarme?
2. Tengo una beca de $800.000 y gasto $500.000. ¿Cuánto puedo ahorrar?
3. Quiero comprar un computador de $2.000.000. Tengo $500.000 y puedo ahorrar $250.000 mensuales. ¿En cuánto tiempo lo consigo?
4. ¡Qué maravilla! Otra vez me quedé sin dinero antes de fin de mes.
5. Mis gastos superan mis ingresos y estoy preocupado. ¿Qué hago?

## Privacidad y seguridad

Los datos se guardan en el dispositivo y perfil de navegador actual. Cualquier persona que use ese mismo perfil puede verlos. La eliminación de historial del navegador puede borrarlos. No uses datos bancarios confidenciales, claves ni información real sensible para la exposición. Exportar JSON crea un archivo que debes resguardar.

**No se necesita una cuenta Gmail**, backend remoto ni ninguna suscripción para esta versión.
