# Fernely Dev — sitio bilingüe

Sitio de servicios y portafolio con React, TypeScript y Vite. Español en `/` e inglés en `/en/`. Conserva los ocho proyectos del portafolio y los enlaces de contacto y precios existentes.

## Desarrollo

```sh
npm ci
npm run dev
```

Abre `/` o `/en/` en el servidor de Vite para trabajar en cada idioma. Los textos de ambos idiomas están en `src/content.ts`; el diseño está en `src/index.css`.

## Compilar y verificar

```sh
npm run build
npm run check:site
npx tsc --noEmit -p tsconfig.app.json
npm run preview
```

La compilación genera los recursos del navegador, compila una entrada de React para Node y produce HTML completo en `dist/index.html` y `dist/en/index.html`. No requiere un servidor Node en producción. Los metadatos, canonical, hreflang y datos estructurados se generan por idioma. `check:site` comprueba el contenido publicado, las referencias a recursos y los enlaces internos.

## Publicar en el hosting existente

Sube **el contenido de `dist/`** a la raíz pública de fernelydev.com, conservando `en/`, `assets/`, `img/`, `robots.txt` y `sitemap.xml`. La configuración usa rutas desde la raíz del dominio. El servidor debe servir `en/index.html` al solicitar `/en/`; esto funciona con los directorios normales de Hostinger/Apache. No subas el repositorio completo ni `.prerender/`.

Si el hosting ya tiene una regla general que redirige a `index.html`, asegúrate de que respete los archivos y directorios existentes. Comprueba `/` y `/en/` con una carga directa después de subirlos.

## Contacto

La consulta pide nombre, servicio y descripción. Abre la aplicación de correo del visitante con un mensaje preparado para `fernelydev@gmail.com`. El visitante debe revisarlo y enviarlo allí. La interfaz explica este paso y nunca afirma que el mensaje ya fue enviado. No se guardan datos en el sitio ni se requiere un proveedor externo.

El archivo PHP heredado `public/api/enviar.php` se conserva para no interrumpir integraciones existentes, pero esta interfaz no lo llama. El formulario depende de que el visitante tenga una aplicación de correo; el email directo siempre está visible como alternativa. No se ha verificado entrega real de correo ni se ha añadido WhatsApp sin confirmar el número comercial.

## Rendimiento y contenido

La portada muestra un proyecto real y ya no monta la animación de 171 fotogramas. Las capturas optimizadas están en `public/img/optimized/`; los originales se conservan. Las imágenes de proyectos fuera de la portada se cargan de forma diferida. No se publican cifras de satisfacción ni testimonios sin evidencia.

La web prepara una mejor experiencia para consultas. El cambio en clientes y ventas debe medirse con tráfico y consultas reales después de publicar; no se ha instalado analítica ni seguimiento de visitantes.
