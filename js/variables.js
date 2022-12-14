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
const inputNombreReg = document.querySelector("#usuarioNomReg")
const inputNombreCompleto = document.querySelector("#usuarioNomComp")
const inputPass = document.querySelector("#usuarioPass")
const inputPassReg = document.querySelector("#usuarioPassReg")
const inputPass2Reg = document.querySelector("#usuarioPass2Reg")
const btnLogin = document.querySelector("#loginUsuario")
const btnRegistrar = document.querySelector("#regUsuario")
const btnRegistrarExitoso = document.querySelector("#regExitoso")
const btnRegistrarCancelar = document.querySelector("#regCancelar")
const divLogin = document.querySelector("#div-login")
const divRegistrar = document.querySelector("#div-registrar")
const divInforme = document.querySelector("#div-informe")
const divInformeFinal = document.querySelector("#informeFinalClass")
const divTareaCompleto = document.querySelector("#divCompleto")
const divOtraTarea = document.querySelector("#divOtraTarea")
const btnVerPass = document.querySelector("#verPass")
const btnVerPass2 = document.querySelector("#verPass2")
const btnVerPass3 = document.querySelector("#verPass3")
const usuarios = []
let usuarioLogeado = ""
const arrayTareas = []

class Usuario {
    constructor(nombre, pass, nombreCompleto) {
        this.nombre = nombre
        this.pass = pass
        this.nombreCompleto = nombreCompleto
    }
}

//BASE DE DATOS FICTICIA 
const inmuebles = [ { id: 110, descripcion:"AV. SARMIENTO 431 1?? PISO - CAPITAL", nombre: "Sarmiento" },
                    { id: 111, descripcion:"9 DE JULIO 451 - CAPITAL", nombre: "9 de julio" },
                    { id: 112, descripcion:"LAS HERAS 425 - CAPITAL", nombre: "Las Heras" },
                    { id: 113, descripcion:"25 DE MAYO 1180 - CAPITAL", nombre: "25 de mayo" },
                    { id: 114, descripcion:"MAIPU 780 - CAPITAL", nombre: "Maipu" },
                    { id: 115, descripcion:"SANTA FE 721 - CAPITAL", nombre: "Santa Fe" },
                    { id: 116, descripcion:"LAPRIDA 1074 - CAPITAL", nombre: "Laprida" },
                    { id: 117, descripcion:"CALLE JOSE A. PAZ 227 - BANDA RIO SAL??", nombre: "Banda Diagonal"},
                    { id: 118, descripcion:"CALLE SAN MARTIN 726 - BANDA RIO SAL??", nombre: "Banda SanMartin"},]

const oficinas = [  { id: 200, inmueble: 110 , descripcion: "Secretaria Administrativa - Compras", nombre: "Compras"},
                    { id: 201, inmueble: 110 , descripcion: "Oficina de Judiciales", nombre: "Judiciales"},
                    { id: 202, inmueble: 110 , descripcion: "Oficina de Prensa", nombre: "Prensa"},
                    { id: 204, inmueble: 111 , descripcion: "Defensor??a Civil I", nombre: "Civil I"},
                    { id: 212, inmueble: 111 , descripcion: "Defensor??a Civil II", nombre: "Civil II"},
                    { id: 213, inmueble: 111 , descripcion: "Defensor??a Civil III", nombre: "Civil III"},
                    { id: 214, inmueble: 111 , descripcion: "Defensor??a Civil IV", nombre: "Civil IV"},
                    { id: 215, inmueble: 111 , descripcion: "Defensor??a de Ni??ez, Adolescencia y Capacidad Restringida I", nombre: "Ni??ez I"},
                    { id: 216, inmueble: 111 , descripcion: "Defensor??a de Ni??ez, Adolescencia y Capacidad Restringida II", nombre: "Ni??ez II"},
                    { id: 217, inmueble: 111 , descripcion: "Defensor??a de Ni??ez, Adolescencia y Capacidad Restringida III", nombre: "Ni??ez III"},
                    { id: 218, inmueble: 111 , descripcion: "Defensor??a de Ni??ez, Adolescencia y Capacidad Restringida IV", nombre: "Ni??ez IV"},
                    { id: 218, inmueble: 111 , descripcion: "Oficina Itinerantes", nombre: "Itinerantes"},
                    { id: 219, inmueble: 113 , descripcion: "Oficina CIAD", nombre: "Ciad"},
                    { id: 220, inmueble: 113 , descripcion: "Oficina Psicosocial", nombre: "Psicosocial"},
                    { id: 221, inmueble: 113 , descripcion: "Defensor??a de Causas Conclusionales ", nombre: "Conclusional"},
                    { id: 222, inmueble: 114 , descripcion: "Defensor??a Penal I", nombre: "Penal I"},
                    { id: 223, inmueble: 114 , descripcion: "Defensor??a Penal II", nombre: "Penal II"},
                    { id: 224, inmueble: 114 , descripcion: "Defensor??a Penal III", nombre: "Penal III"},
                    { id: 225, inmueble: 114 , descripcion: "Defensor??a Penal IV", nombre: "Penal IV"},
                    { id: 226, inmueble: 114 , descripcion: "Defensor??a Penal V", nombre: "Penal V"},
                    { id: 227, inmueble: 114 , descripcion: "Defensor??a Penal VI", nombre: "Penal VI"},
                    { id: 228, inmueble: 114 , descripcion: "Defensor??a Penal VII", nombre: "Penal VII"},
                    { id: 229, inmueble: 114 , descripcion: "Defensor??a Penal VIII", nombre: "Penal VIII"},
                    { id: 230, inmueble: 114 , descripcion: "Defensor??a Penal IX", nombre: "Penal IX"},
                    { id: 231, inmueble: 114 , descripcion: "Oficina Gesti??n Defensiva (OGD)", nombre: "OGD"},
                    { id: 232, inmueble: 114 , descripcion: "Oficina Privados de la Libertad", nombre: "OPL"},
                    { id: 233, inmueble: 115 , descripcion: "Oficina de Auditor??a, Gesti??n y Estad??sticas", nombre: "Gestion"},
                    { id: 234, inmueble: 115 , descripcion: "Oficina de Seguridad e Higiene", nombre: "Seguridad e higiene"},
                    { id: 235, inmueble: 115 , descripcion: "Oficina de Servicio Ocupacional", nombre: "Servicio ocupacional"},
                    { id: 236, inmueble: 117 , descripcion: "Defensor??a de Ni??ez, Adolescencia y Capacidad Restringida", nombre: "Ni??ez"},
                    { id: 237, inmueble: 118 , descripcion: "Defensor??a Civil y del Trabajo", nombre: "Civil"},
]

const tareas = [    { id: 312, nombre: "Instalacion impresora" , descripcion: "Se instala impresora Lexmark en PC de usuario "},
                    { id: 313, nombre: "Instalaci??n SAE" , descripcion: "Se instala Sae en PC de usuario "},
                    { id: 314, nombre: "Activaci??n Office" , descripcion: "Se activa y actualiza Office en PC de usuario "},
                    { id: 315, nombre: "Contrase??a Portal y Recibo" , descripcion: "Se asiste por inconvenientes para ingresar al Portal Empleado y Recibo Digital al usuario "},
                    { id: 316, nombre: "Config. Outlook" , descripcion: "Se configura Outlook en PC de usuario "},
                    { id: 317, nombre: "Config. de rendimiento" , descripcion: "Se realizan configuraciones de rendimiento en PC de usuario "},
                    { id: 318, nombre: "Acceso a Lex" , descripcion: "Se asiste por inconvenientes para acceso a LEX al usuario "},
                    { id: 319, nombre: "Reinicio PC" , descripcion: "Se asiste por inconvenientes para encender su notebook, se soluciona el problema forzando el reinicio al usuario "},
                    { id: 311, nombre: "Reemplazo toner" , descripcion: "Se reemplaza toner de impresora Lexmark ip: "},
                    { id: 320, nombre: "Otra Tarea" , descripcion: ""},
]

