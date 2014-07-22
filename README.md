
#DebugClass ver 0.9.1 Timestamp 281113

Autor: Jaime Hormiga - www.jaimeweb.es

Clase que facilita la creacion de paneles para colocar mensajes de depuración en nuestra aplicacion.
Los paneles se crean ocultos y se muestran si se pulsa el boton asociado.

**debugClass.js**

* Constructor:  debugClass (nodo,id)
    params:
        - nodo: id del nodo padre donde ira enganchado el panel. Si no se indica nada tomara se enganchara al body.
        - id: id del nuevo panel creado. Si no se indica nada el id sera'dPanel'
* mostrarMensaje (cadena, limpiar): metodo para escribir en el panel de depuracion (este oculto o no).
    params:
        - cadena a escribir
        - boolean para indicar si se limpia el panel antes de escribir (true) o simplemente se añade el contenido (false)
* boton (padre, nombre, id): metodo para colocar un boton encargado de mostrar/ocultar el panel.
    param:
        - padre: nodo padre del arbol DOM
        - nombre: value del boton (por defecto DEBUG)
        - id: id del boton (por defecto bdebug)

**Configuracion**

Existen dos formas no excluyentes de cambiar el estilo de los paneles creados:

1. A traves del metodo 'addClase' el cual añade una clase CSS al panel o al boton previamente creado
    Params:
        - clase: nombre de la clase CSS
        - objeto: 0 panel, 1 boton (por defecto panel)

2. Editando el archivo 'debugClass.js' y cambiando la seccion:

,,,
//Propiedades CSS del Panel
    //--------------------------
    this.anchura = "99%";
    this.altura = ((window.innerHeight) / 1.3) + "px";
    this.cfondo = "#000";
    this.ctexto = "#FFF";
    this.familia = " 'Courier New', monospace";
    this.tamTexto = "0.9em";
    this.pclases = ""; //clases por defecto para el panel
    this.bclases = ""; //clases extra para el boton
    //--------------------------
,,,

