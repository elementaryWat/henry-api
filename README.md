## Objetivo del Proyecto
El objetivo es desarrollar un chatbot accesible desde la página web de Henry, que responda preguntas frecuentes de forma eficiente, reduciendo la dependencia de agentes humanos y mejorando la experiencia de los usuarios.

Para correr el proyecto:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## Técnica de Generación Aumentada por Recuperación (RAG)
Utilizamos la técnica RAG para combinar la generación de lenguaje de los LLMs con la recuperación de información específica de una base de conocimiento. Esto implica la transformación de documentos en embeddings (vectores que capturan la semántica del texto) y su almacenamiento en una base de datos vectorial. Al recibir una consulta, el sistema busca los embeddings más relevantes para proporcionar contexto al LLM, mejorando la precisión y relevancia de las respuestas generadas.

## Probar el Chatbot
Para experimentar directamente con nuestro chatbot y ver cómo responde a sus preguntas, por favor visite el siguiente enlace:

[Prueba el Chatbot de Henry](https://flowise-6cqc.onrender.com/chatbot/5f4d4b92-65cd-4a21-b667-6c0552519d4b)

Este enlace te llevará a una interfaz interactiva donde podrás hacer preguntas relacionadas con el programa de formación de Henry y recibir respuestas generadas por nuestro avanzado sistema basado en LLM.
