# SEO y experiencia comercial bilingüe

- Español en `/` e inglés en `/en/`, con selector visible en escritorio y móvil.
- HTML completo generado durante la compilación para ambas páginas; contenido y enlaces disponibles sin esperar al JavaScript.
- Título, descripción, idioma, canonical y metadatos sociales propios por idioma.
- Referencias `hreflang` recíprocas para español e inglés.
- Sitemap con las dos URLs canónicas. Se eliminan los fragmentos de sección y la URL del subdominio de precios del sitemap del dominio principal.
- Datos estructurados de servicios con el correo existente y atención en ambos idiomas. Se elimina la ubicación genérica anterior y cualquier cifra de satisfacción sin respaldo.
- Servicios orientados a necesidades del cliente, portafolio, proceso, preguntas frecuentes y acceso directo a una consulta.
- Capturas WebP optimizadas, carga diferida y portada sin precarga de la animación de 171 imágenes.
- Navegación por teclado, enlace para saltar al contenido, etiquetas de formulario y respeto a la preferencia de movimiento reducido.

## Verificación

`npm run build` genera las páginas; `npm run check:site` valida contenido, metadatos traducidos, datos estructurados, enlaces internos, imágenes y sitemap. La vista previa del resultado se revisa también en navegador.

Estos cambios no garantizan posicionamiento ni más clientes. Tras publicar, conviene comprobar la indexación de ambas URLs y comparar consultas reales durante un periodo suficiente. No se ha enviado el sitemap a Search Console ni añadido analítica.
