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

Publica el contenido de `dist/` en la raíz pública de fernelydev.com e incluye `pricing/public/` dentro de `precios/`: el subdominio comparte ese directorio con la web principal. Conserva la ruta privada del administrador en la copia de producción de `app.php`. Sigue [las instrucciones de Hostinger](docs/HOSTINGER.md) para preparar el paquete conjunto. No subas el repositorio completo ni `.prerender/`.

Si el hosting ya tiene una regla general que redirige a `index.html`, asegúrate de que respete los archivos y directorios existentes. Comprueba `/` y `/en/` con una carga directa después de subirlos.

## Contacto

El formulario pide nombre, correo, servicio y descripción; el teléfono es opcional. Envía JSON a `https://precios.fernelydev.com/api/enviar.php` y confirma recepción solo cuando el servidor responde con `ok: true`. El endpoint valida campos y consentimiento, limita solicitudes, utiliza un campo trampa contra spam y acepta únicamente los orígenes públicos autorizados.

Las consultas se guardan fuera de las raíces públicas, junto a los datos privados del administrador. En `https://precios.fernelydev.com/admin/leads.php` se pueden leer, responder por correo y marcar como nuevas, respondidas o cerradas. No se envían notificaciones automáticas por email. El correo directo permanece visible como alternativa y la información de privacidad está en `/privacy.html` y `/en/privacy.html`.

El administrador también permite gestionar proyectos en `/admin/projects.php` y paquetes en `/admin/`. Los proyectos públicos se cargan desde el API del portafolio para reflejar sus cambios.

## Rendimiento y contenido

La portada muestra un proyecto real y ya no monta la animación de 171 fotogramas. Las capturas optimizadas están en `public/img/optimized/`; los originales se conservan. Las imágenes de proyectos fuera de la portada se cargan de forma diferida. No se publican cifras de satisfacción ni testimonios sin evidencia.

La web prepara una mejor experiencia para consultas. El cambio en clientes y ventas debe medirse con consultas reales después de publicar. No hay analítica de terceros; si la visita incluye `utm_campaign`, ese nombre puede guardarse con la consulta para conocer su campaña de origen.
