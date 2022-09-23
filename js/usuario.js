const validarListaUsuarios = () => {
    if (JSON.parse(localStorage.getItem("usuarios"))) {
        return true
    } else {
        return false
    }
}

function registrarUsuario() {
    if (inputNombre.value && inputPass.value) {
        if (validarListaUsuarios()) {
            let listUsuarios = JSON.parse(localStorage.getItem("usuarios"))
            if (listUsuarios.find((usuario) => usuario.nombre === inputNombre.value)) {
                alert("⛔️ El nombre de usuario ya existe, por favor ingrese otro")
                return
            }
        }
        let nombCompleto
        while (true) {
            let valor = prompt("Ingresa tu nombre completo")
            if (valor === '' || valor === null) {
                alert("⛔️ Por favor ingrese un nombre valido")
            }
            else {
                nombCompleto = valor;
                break;
            }
        }
        usuarios.push(new Usuario(inputNombre.value, inputPass.value, nombCompleto))
        localStorage.setItem("usuarios", JSON.stringify(usuarios))
        alert("✅ registro exitoso")
        inputNombre.value = ""
        inputPass.value = ""
    } else {
        alert("⛔️ Falta ingresar un valor")
    }
}

function loginUsuario() {
    if (validarListaUsuarios()) {
        let listUsuarios = JSON.parse(localStorage.getItem("usuarios"))
        if (listUsuarios.find((usuario) => usuario.nombre === inputNombre.value && usuario.pass === inputPass.value)) {
            divLogin.classList.add("ocultar")
            estado.innerText = `Bienvenido ${inputNombre.value}`
            estado.className = ""
            usuarioLogeado = listUsuarios.find((o) => (o.nombre == inputNombre.value)).nombreCompleto;
            divInforme.classList.remove("ocultar")
        } else {
            estado.innerText = "👎 Usuario o contraseña incorrectos"
            estado.className = "text-rojo"
        }
    } else {
        alert("⛔️ No existen usuarios registrados")
        inputNombre.value = ""
        inputPass.value = ""
    }
}

btnLogin.addEventListener("click", loginUsuario)
inputPass.addEventListener("keypress", (e)=> { //e = Objeto global EVENT
    if (e.key === "Enter") {
        loginUsuario()
    }
})
btnRegistrar.addEventListener("click", registrarUsuario)
btnVerPass.addEventListener("mousedown", () => { inputPass.type = "text" })
btnVerPass.addEventListener("mouseup", () => { inputPass.type = "password" })
inputNombre.addEventListener("focus", () => estado.innerText = "")
inputPass.addEventListener("focus", () => estado.innerText = "")