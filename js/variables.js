//CONEXION CON EL DOM JS
const inmueble = document.querySelector("#inmueble")
const oficina = document.querySelector("#oficina")
const cliente = document.querySelector("#cliente")
const btnGuardar = document.querySelector("#btnGuardar")
// const importe = document.querySelector("span")
// const btnEnviar = document.querySelector("span.guardar")

//BASE DE DATOS FICTICIA 
const inmuebles = [{ id: 11, nombre: "9 de julio" },
                    { id: 12, nombre: "25 de mayo" },
                    { id: 13, nombre: "Maipu" },
                    { id: 14, nombre: "Santa Fe" },
                    {id: 15, nombre: "Banda del Rio Sali"}]


const oficinas = [{ id: 21, inmieble: "9 de julio" , nombre: "Civil I"},
                    { id: 22, inmieble: "9 de julio" , nombre: "Civil II"},
                    { id: 23, inmieble: "9 de julio" , nombre: "Civil III"},
                    { id: 24, inmieble: "9 de julio" , nombre: "Civil IV"},
                    { id: 25, inmieble: "9 de julio" , nombre: "Niñez I"},
                    { id: 26, inmieble: "9 de julio" , nombre: "Niñez II"},
                    { id: 27, inmieble: "9 de julio" , nombre: "Niñez III"},
                    { id: 28, inmieble: "9 de julio" , nombre: "Niñez IV"},
                    { id: 29, inmieble: "25 de mayo" , nombre: "Ciad"},
                    { id: 30, inmieble: "25 de mayo" , nombre: "Psicosocial"},
                    { id: 31, inmieble: "25 de mayo" , nombre: "Conclusional"},
                    { id: 32, inmieble: "Maipu" , nombre: "Penal I"},
                    { id: 33, inmieble: "Maipu" , nombre: "Penal II"},
                    { id: 34, inmieble: "Maipu" , nombre: "Penal III"},
                    { id: 35, inmieble: "Maipu" , nombre: "Penal IV"},
                    { id: 36, inmieble: "Maipu" , nombre: "Penal V"},
                    { id: 37, inmieble: "Maipu" , nombre: "Penal VI"},
                    { id: 38, inmieble: "Maipu" , nombre: "Penal VII"},
                    { id: 39, inmieble: "Maipu" , nombre: "Penal VIII"},
                    { id: 40, inmieble: "Maipu" , nombre: "Penal IX"},
                    { id: 41, inmieble: "Maipu" , nombre: "OGD"},
                    { id: 42, inmieble: "Maipu" , nombre: "OPL"},
                    { id: 43, inmieble: "Santa Fe" , nombre: "Gestion"},
                    { id: 44, inmieble: "Santa Fe" , nombre: "Seguridad e higiene"},
                    { id: 45, inmieble: "Santa Fe" , nombre: "Servicio ocupacional"},
                    { id: 46, inmieble: "Banda del Rio Sali" , nombre: "Niñez"},
                    { id: 47, inmieble: "Banda del Rio Sali" , nombre: "Civil"},
]
