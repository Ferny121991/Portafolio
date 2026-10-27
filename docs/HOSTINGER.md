# Publicación en Hostinger

El directorio público de `fernelydev.com` contiene el subdominio `precios.fernelydev.com` en su carpeta `precios/`. Para reemplazar el sitio principal, preparar un directorio combinado con el contenido de `dist/` en la raíz y `pricing/public/` dentro de `precios/`.

La configuración y los datos del administrador están fuera de ambos directorios públicos, en `/home/u713598584/fernely-admin`. La copia de producción de `precios/app.php` usa esa ruta como alternativa a `FERNELY_PRICING_PRIVATE_DIR`. Mantener esa alternativa en el paquete de publicación; la alternativa del repositorio es para desarrollo local.

No incluir configuración privada, credenciales, consultas, catálogos guardados ni imágenes privadas en el repositorio o en el paquete. Antes de publicar, conservar una copia de los archivos públicos actuales. Publicar el directorio combinado con `hosting_deploy`, tipo `static`, dirigido a `fernelydev.com`; este tipo también ejecuta PHP.

Después, purgar la caché de ambos dominios y comprobar las páginas ES/EN, el catálogo de precios, el API del portafolio y la protección de `/admin/leads.php`. Las pruebas de envío y administración deben utilizar un directorio privado temporal y datos ficticios, evitando crear consultas en producción.
