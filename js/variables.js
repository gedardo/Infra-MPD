//CONEXION CON EL DOM JS
const inmueble = document.querySelector("#inmueble")
const oficina = document.querySelector("#oficina")
const tarea = document.querySelector("#tarea")
const cliente = document.querySelector("#cliente")
const comentario = document.querySelector("#comentario")
const otraTarea = document.querySelector("#otraTarea")
const btnGuardar = document.querySelector("#btnGuardar")
const btnGenerarInforme = document.querySelector("#btnGenerarInforme")
const informeFinal = document.querySelector("#informeFinal")
const tabulador = ("&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp-&nbsp&nbsp&nbsp&nbsp&nbsp")
const estado = document.getElementById("estadoLogin")
const inputNombre = document.querySelector("#usuarioNom")
const inputPass = document.querySelector("#usuarioPass")
const btnLogin = document.querySelector("#loginUsuario")
const btnRegistrar = document.querySelector("#regUsuario")
const divLogin = document.querySelector("#div-login")
const divInforme = document.querySelector("#div-informe")
const divInformeFinal = document.querySelector("#informeFinalClass")
const divTareaCompleto = document.querySelector("#divCompleto")
const divOtraTarea = document.querySelector("#divOtraTarea")
const btnVerPass = document.querySelector("#verPass")
const usuarios = []
let usuarioLogeado = ""
const arrayTareas = []
let banderaCliente = true

class Usuario {
    constructor(nombre, pass, nombreCompleto) {
        this.nombre = nombre
        this.pass = pass
        this.nombreCompleto = nombreCompleto
    }
}

//BASE DE DATOS FICTICIA 
const inmuebles = [ { id: 110, descripcion:"AV. SARMIENTO 431 1° PISO - CAPITAL", nombre: "Sarmiento" },
                    { id: 111, descripcion:"9 DE JULIO 451 - CAPITAL", nombre: "9 de julio" },
                    { id: 112, descripcion:"LAS HERAS 425 - CAPITAL", nombre: "Las Heras" },
                    { id: 113, descripcion:"25 DE MAYO 1180 - CAPITAL", nombre: "25 de mayo" },
                    { id: 114, descripcion:"MAIPU 780 - CAPITAL", nombre: "Maipu" },
                    { id: 115, descripcion:"SANTA FE 721 - CAPITAL", nombre: "Santa Fe" },
                    { id: 116, descripcion:"LAPRIDA 1074 - CAPITAL", nombre: "Laprida" },
                    { id: 117, descripcion:"CALLE JOSE A. PAZ 227 - BANDA RIO SALÍ", nombre: "Banda Diagonal"},
                    { id: 118, descripcion:"CALLE SAN MARTIN 726 - BANDA RIO SALÍ", nombre: "Banda SanMartin"},]

const oficinas = [  { id: 200, inmueble: 110 , descripcion: "Secretaria Administrativa - Compras", nombre: "Compras"},
                    { id: 201, inmueble: 110 , descripcion: "Oficina de Judiciales", nombre: "Judiciales"},
                    { id: 202, inmueble: 110 , descripcion: "Oficina de Prensa", nombre: "Prensa"},
                    { id: 204, inmueble: 111 , descripcion: "Defensoría Civil I", nombre: "Civil I"},
                    { id: 212, inmueble: 111 , descripcion: "Defensoría Civil II", nombre: "Civil II"},
                    { id: 213, inmueble: 111 , descripcion: "Defensoría Civil III", nombre: "Civil III"},
                    { id: 214, inmueble: 111 , descripcion: "Defensoría Civil IV", nombre: "Civil IV"},
                    { id: 215, inmueble: 111 , descripcion: "Defensoría de Niñez, Adolescencia y Capacidad Restringida I", nombre: "Niñez I"},
                    { id: 216, inmueble: 111 , descripcion: "Defensoría de Niñez, Adolescencia y Capacidad Restringida II", nombre: "Niñez II"},
                    { id: 217, inmueble: 111 , descripcion: "Defensoría de Niñez, Adolescencia y Capacidad Restringida III", nombre: "Niñez III"},
                    { id: 218, inmueble: 111 , descripcion: "Defensoría de Niñez, Adolescencia y Capacidad Restringida IV", nombre: "Niñez IV"},
                    { id: 218, inmueble: 111 , descripcion: "Oficina Itinerantes", nombre: "Itinerantes"},
                    { id: 219, inmueble: 113 , descripcion: "Oficina CIAD", nombre: "Ciad"},
                    { id: 220, inmueble: 113 , descripcion: "Oficina Psicosocial", nombre: "Psicosocial"},
                    { id: 221, inmueble: 113 , descripcion: "Defensoría de Causas Conclusionales ", nombre: "Conclusional"},
                    { id: 222, inmueble: 114 , descripcion: "Defensoría Penal I", nombre: "Penal I"},
                    { id: 223, inmueble: 114 , descripcion: "Defensoría Penal II", nombre: "Penal II"},
                    { id: 224, inmueble: 114 , descripcion: "Defensoría Penal III", nombre: "Penal III"},
                    { id: 225, inmueble: 114 , descripcion: "Defensoría Penal IV", nombre: "Penal IV"},
                    { id: 226, inmueble: 114 , descripcion: "Defensoría Penal V", nombre: "Penal V"},
                    { id: 227, inmueble: 114 , descripcion: "Defensoría Penal VI", nombre: "Penal VI"},
                    { id: 228, inmueble: 114 , descripcion: "Defensoría Penal VII", nombre: "Penal VII"},
                    { id: 229, inmueble: 114 , descripcion: "Defensoría Penal VIII", nombre: "Penal VIII"},
                    { id: 230, inmueble: 114 , descripcion: "Defensoría Penal IX", nombre: "Penal IX"},
                    { id: 231, inmueble: 114 , descripcion: "Oficina Gestión Defensiva (OGD)", nombre: "OGD"},
                    { id: 232, inmueble: 114 , descripcion: "Oficina Privados de la Libertad", nombre: "OPL"},
                    { id: 233, inmueble: 115 , descripcion: "Oficina de Auditoría, Gestión y Estadísticas", nombre: "Gestion"},
                    { id: 234, inmueble: 115 , descripcion: "Oficina de Seguridad e Higiene", nombre: "Seguridad e higiene"},
                    { id: 235, inmueble: 115 , descripcion: "Oficina de Servicio Ocupacional", nombre: "Servicio ocupacional"},
                    { id: 236, inmueble: 117 , descripcion: "Defensoría de Niñez, Adolescencia y Capacidad Restringida", nombre: "Niñez"},
                    { id: 237, inmueble: 118 , descripcion: "Defensoría Civil y del Trabajo", nombre: "Civil"},
]

const tareas = [    { id: 312, nombre: "Instalacion impresora" , descripcion: "Se instala impresora Lexmark en PC de usuario "},
                    { id: 313, nombre: "Instalación SAE" , descripcion: "Se instala Sae en PC de usuario "},
                    { id: 314, nombre: "Activación Office" , descripcion: "Se activa y actualiza Office en PC de usuario "},
                    { id: 315, nombre: "Contraseña Portal y Recibo" , descripcion: "Se asiste por inconvenientes para ingresar al Portal Empleado y Recibo Digital al usuario "},
                    { id: 316, nombre: "Config. Outlook" , descripcion: "Se configura Outlook en PC de usuario "},
                    { id: 317, nombre: "Config. de rendimiento" , descripcion: "Se realizan configuraciones de rendimiento en PC de usuario "},
                    { id: 318, nombre: "Acceso a Lex" , descripcion: "Se asiste por inconvenientes para acceso a LEX al usuario "},
                    { id: 319, nombre: "Reinicio PC" , descripcion: "Se asiste por inconvenientes para encender su notebook, se soluciona el problema forzando el reinicio al usuario "},
                    { id: 320, nombre: "Otra Tarea" , descripcion: ""},
                    { id: 311, nombre: "Reemplazo toner" , descripcion: "Se reemplaza toner de impresora Lexmark ip: "},
]

