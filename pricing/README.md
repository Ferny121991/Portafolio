# Precios y administración — Fernely Dev

Aplicación PHP independiente para `precios.fernelydev.com`, dentro de `pricing/`. No modifica la aplicación React del dominio principal. La versión pública anterior se revisó directamente; no se encontró un proyecto de precios separado en los repositorios accesibles.

## Qué incluye

- Diseño coherente con el nuevo portafolio, español e inglés.
- Paquetes propuestos: landing US$249, negocio US$499 y catálogo con administración US$899.
- Extras con alcance: administración, idioma adicional, página, logo, flyer, reel y cuidado mensual.
- Cotizador que separa cargos iniciales y mensuales; el admin incluido en catálogo nunca se cobra dos veces.
- Consulta por correo preparado. El visitante debe enviarlo desde su aplicación; no existe checkout ni cobro automático.
- Panel `/admin/` para editar precios enteros en USD, textos ES/EN, características, visibilidad y contacto. Los servicios base tienen IDs fijos; crear categorías o roles nuevos requiere ampliar el código.
- Persistencia en JSON fuera de la raíz pública. No requiere MySQL ni servicios externos.

## Requisitos

PHP 8.2 o superior, HTTPS, sesiones habilitadas y una carpeta privada escribible. Hostinger compartido con PHP puede ejecutar esta aplicación. No es una página estática: **no usar el deploy estático de Hostinger ni abrir index.php directamente en el navegador local**.

## Publicar en el subdominio existente

1. Respalda los archivos actuales del subdominio. Anota su raíz pública real en hPanel.
2. Crea una carpeta `fernely-pricing-private` fuera de TODAS las raíces públicas, incluida la del dominio principal. No la pongas dentro de `public_html`.
3. La aplicación busca esa carpeta junto a su raíz pública por defecto. Si debe estar en otro lugar, configura `FERNELY_PRICING_PRIVATE_DIR` con la ruta absoluta. También se puede ajustar **solo** la ruta de respaldo en `public/app.php` al subirlo. No pongas credenciales allí.
4. Sube el CONTENIDO de `public/` a la raíz del subdominio, incluyendo `.htaccess`. Conserva `index.php` como documento de inicio. El antiguo `index.html` no debe tener prioridad: guárdalo fuera de la raíz pública como copia antes de activar esta versión.
5. Comprueba que el sitio carga contenido real en español y en `/?lang=en`. Verifica HTTPS y que PHP ejecuta el archivo (nunca debe descargar su código).
6. Configura el administrador con el helper explicado abajo. Revisa el alcance y los precios antes de publicar: son una propuesta editable, no una promesa de rentabilidad ni una media estadística del mercado.

El ZIP entregado contiene `public/`, herramientas y documentación. **No subas todo el ZIP descomprimido a la raíz pública**: solo el contenido de `public/`. Ningún archivo de configuración privada, contraseña, hash, sesión, intentos o copia de catálogo se incluye en el archivo entregado.

## Crear el administrador

El panel no tiene registro público ni contraseña de fábrica. La creación requiere acceso de propietario al servidor o generar el archivo localmente.

Con terminal PHP, ejecuta el helper fuera de la raíz pública:

```sh
php tools/create-admin.php /ruta/privada/fernely-pricing-private
```

Pide usuario y contraseña; en Linux oculta la contraseña. Debe tener de 14 a 72 caracteres ASCII (el límite técnico es 72 bytes). El archivo `config.php` guarda únicamente usuario y hash. El helper se niega a sobreescribir una configuración existente. No despliegues `tools/` dentro de la raíz pública.

También acepta JSON por entrada estándar con `--stdin`, útil para automatizar pruebas sin poner la contraseña en argumentos ni archivos. En Windows se incluye `tools/create-admin.ps1`, que usa una entrada oculta y canaliza los valores por stdin. Requiere un ejecutable PHP local y genera el archivo para subir a la carpeta privada.

En hPanel sin terminal: genera `config.php` localmente y sube ese único archivo por el gestor de archivos a la carpeta privada. No lo compartas por GitHub ni por chat. El propietario debe elegir su propia contraseña. No se ha creado ni activado una cuenta de producción en esta tarea.

Recuperación: respalda la configuración en un lugar privado, genera una nueva en otra carpeta privada y reemplaza `config.php` desde el acceso de propietario. Las sesiones de la clave anterior dejan de autorizar cambios. No se implementa recuperación por correo ni autenticación multifactor.

## Guardado y seguridad

El servidor exige sesión y token CSRF para guardar; regenera el identificador al entrar, cookies HttpOnly/SameSite=Strict, Secure bajo HTTPS, inactividad máxima de 30 minutos y bloqueo tras cinco fallos durante 15 minutos por IP. Se escapan todos los textos antes de renderizarlos. El CSP no permite scripts externos ni marcos. `/admin/` lleva noindex y no-store.

El catálogo se escribe con bloqueo, archivo temporal y control de revisión. `catalog.previous.json` conserva la versión anterior a partir del segundo guardado; el catálogo inicial siempre está en `public/catalog.default.json`. Haz copias externas periódicas: la copia anterior no sustituye un respaldo.

## Desarrollo y pruebas

```sh
php -S 127.0.0.1:5175 -t public
```

Desde la raíz del repositorio:

```sh
node pricing/tests/integration.mjs
```

Si PHP no está en PATH, pasa su ruta en `FERNELY_TEST_PHP`. Las pruebas crean un usuario efímero, arrancan un servidor local y verifican autenticación, CSRF, sesión, intentos fallidos, persistencia, validación, escape HTML, conflictos de edición, cierre de sesión y copia privada. Eliminan sus datos temporales al terminar. No envían correos ni contactan producción.

La revisión de navegador comprueba también el cotizador, la exclusión del administrador duplicado y el cambio de idioma. Consulta `docs/PRECIOS-Y-CRITERIOS.md` para las referencias de mercado.
