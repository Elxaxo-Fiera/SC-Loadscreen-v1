# SERVICIO CONECTADO \| LOADSCREEN FIVEM

Loadscreen moderna, optimizada y totalmente personalizable para
servidores FiveM.

----------------

## :package: Instalación

1.  Coloca la loadscreen en `resources`
2.  Añade en tu `server.cfg`:

```
    ensure servicio_loadscreen
    loadscreen 'servicio_loadscreen'
```
----------------

## :clapper: Cambiar Video

Sustituye el archivo de video y renómbralo como:

    video

----------------

## 🎞️ Cambiar Fotos

Ruta: `fotos/`

-   `1` → Fundador\
-   `2` → Co-Fundador\
-   `3` → Programador

⚠ La imagen debe llamarse:

    photo

----------------

## :label: Cambiar Logo

Ruta: `logo/`\
Renombra tu imagen como:

    logo

----------------

## :link: Redes Sociales

Editar archivo:

    config.js

Modificar los enlaces dentro de:

``` js
TikTok: "",
Discord: "",
Twitch: "",
YouTube: ""
```

----------------

## ✏ Cambiar Nombre del Servidor

Editar en el HTML:

``` html
<h1 class="brand-name">Servicio<span>Conectado</span></h1>
```

-   Servicio → Nombre del servidor\
-   Conectado → RP u otro texto (color principal)

----------------

## :busts_in_silhouette: Cambiar Roles y Nombres

Editar en el HTML:

``` html
<span class="role">FUNDADOR</span>
<span class="name">Nombre</span>
```

``` html
<span class="role">Co-Fundador</span>
<span class="name">Nombre</span>
```

``` html
<span class="role">PROGRAMADOR</span>
<span class="name">Nombre</span>
```

Sustituye el rol y nombre por los de tu equipo.

----------------

## :art: Cambiar Colores

Editar en `style.css`:

``` css
--primary: #ffd000;        /* Color principal */
--primary-glow: rgba(...); /* Glow */
--border: rgba(...);       /* Bordes */
```

Puedes buscar en Google: **Color Hex** para elegir colores fácilmente.

----------------
**Web de como quedaria en FiveM:** https://servicioconectado.com/sc-loadscreen-v1/
----------------
© Servicio Conectado
