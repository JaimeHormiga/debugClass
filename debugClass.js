

//Constructor necesita el nodo PADRE donde
//va a ir enganchado el panel.
//Si no se le pasa este argumento, tomara por defecto
//BODY como padre
//Se le pasa el ID deseado para el panel.
//Si no, tomara por defecto dPanel
function debugPanel(padre, id){

    this.padre = padre || "<body>";
    this.ident = id || "dPanel";

    //texto que aparecera inicialmente al crear el panel
    this.textoIni = "deBug Panel version 0.1\n";

    //id del boton (null si no esta creado)
    this.bident = null;

    //Indica si el panel esta oculto o no (0-Oculto, 1-Visible)
    this.oculto = 1;

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



    //Función que enlaza el panel en el arbol DOM
    //y le coloca las propiedades CSS
    this.iniciar = function(){

        try{
            //Creamos el panel y su contenido
            var nuevo = document.createElement("div");
            var texto = document.createTextNode(this.textoIni);
            nuevo.appendChild(texto);

            //colocamos sus propiedades
            nuevo.style.width = this.anchura;
            nuevo.style.height = this.altura;
            nuevo.style.backgroundColor = this.cfondo;
            nuevo.style.color = this.ctexto;
            nuevo.style.fontFamily = this.familia;
            nuevo.style.fontSize = this.tamTexto;

            nuevo.id = this.ident;


            //por defecto el panel es visible
            //si se crea un boton, el panel se esconde
            nuevo.style.display = "block";
            this.oculto = 1;

            //Clases para el panel
            nuevo.className = this.pclases;

            //Enlazamos al padre
            var padre = document.getElementById(this.padre);
            padre.appendChild(nuevo);


        }
        catch(e){
            console.log("Error creando panel: "+e);
            return -1;
        }

    }//iniciar

    //Metodo para escribir en el panel de depuracion
    //cad: cadena a mostrar
    //limpiar: 0 añade al contenido del panel, 1 limpia el panel antes de escribir
     this.mostrarMensaje = function(cad,limpiar){
        try{
            var panel = document.getElementById(this.ident);
            if (limpiar) panel.innerHTML = cad;
            else panel.innerHTML += "<br>"+cad;
        }
        catch(e){
              console.log("Fallo de escritura en panel "+this.ident);
              return -1;
        }
    }//mostrarMensaje

    //Añade una clase o lista de clases al panel o al boton
    //clase: nombre de la/s clase/s como se pondria en HTML
    //objeto: 0 panel, 1 boton (por defecto panel)
    this.addClase = function(clase,objeto){
        var obj = objeto || 0;

        if (obj > 1) obj = 1;
        if (obj < 0) obj = 0;

        var item = null;
        switch (obj){
            case 0: item = document.getElementById(this.ident);
                     break;
            case 1: item = document.getElementById(this.bident);
                     break;
        }

        if (item != null){
            item.className = clase;
        }
        else{
            console.log("No puedo acceder al elemento "+this.ident);
        }
    }//addClase


    //Muestra/Oculta el panel de depuracion
    function cambiarPanel(oculto,ident){
        var salida=1;
        try{
            var panel = document.getElementById(ident);

            switch (oculto){
                case 0: //esta oculto, debo mostrarlo
                        panel.style.display = "block";
                        salida = 1;
                        break;
                case 1: //esta visible, debo ocultarlo
                        panel.style.display = "none";
                        salida = 0;
                        break;
                default: console.log("El valor 'oculto' no es correcto");
                         break;
            }//switch
            return salida;
        }
        catch(e){
            console.log("Error actualizando visibilidad del panel: "+e);
            return -1;
        }
    }//alternarPanel


    //Coloca un boton que muestra/oculta
    //el panel de depuracion
    //padre: nodo padre del arbol DOM
    //nombre: value del boton (por defecto DEBUG)
    //id: id del boton (por defecto bdebug)
    this.boton = function (padre,nombre,id){

        var value = nombre || "debug";
        var ident = id || "bdebug";

        this.bident = ident; //actualizamos el id del boton

        try{

            //La creacion del boton esconde el panel
            var panel = document.getElementById(this.ident);
            panel.style.display = "none";
            this.oculto = 0;

            //creamos el boton
            var boton = document.createElement("input");

            //Colocamos sus atributos
            boton.type = "button";
            boton.id = ident;
            boton.name = ident;
            boton.value = value;

            //variables para el onclick
            var oculto = this.oculto;
            var pident = this.ident;

            boton.onclick = function(){
                oculto = cambiarPanel(oculto,pident);
            };


            //Enlazamos al padre
            var padre = document.getElementById(padre);
            padre.appendChild(boton);


        }
        catch(e){
            console.log("Error creando boton: "+e);
            return -1;
        }
    }//boton


    //------------------------------------------------
    //Al crear la clase se ejecuta el metodo 'iniciar'
    this.iniciar();

}//clase