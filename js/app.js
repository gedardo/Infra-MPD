//Función cargar Combos SELECT
const cargarCombo = (select, array) => {
    select.innerHTML = "";
    if (array.length > 0) {
        array.forEach(elemento => {
            select.innerHTML += `<option value="${elemento.id}">${elemento.nombre}</option>`
        })
    } else {
        console.error("No existen elementos en el array.")
    }
}

const datosCompletos = () => {
    if (banderaCliente) {
        if (cliente.value != "") {
            return true
        } else {
            return false
        }
    } return true
}

function limpiarCampos() {
    cliente.value = ""
    comentario.value = ""
    otraTarea.value = ""
}

const filtrarOficina = (inmuebleId) => {
    const oficinasFiltradas = oficinas.filter((o) => (o.inmueble == inmuebleId));
    // console.log(oficinasFiltradas);
    cargarCombo(oficina, oficinasFiltradas);
}

const guardar = () => {
    // let continuar = confirm("¿Estas seguro? 🤔")
    // if (continuar) {
    // Funcion que llama a la API con los datos de la tarea

    if (datosCompletos()) {
        const item = {
            usuarioId: usuarioLogeado,
            inmuebleId: inmueble.value,
            oficinaId: oficina.value,
            tareaId: tarea.value,
            clienteId: cliente.value,
            comentario: comentario.value,
            otraTarea: otraTarea.value
        }

        //Reemplazar push por llamado api con item
        arrayTareas.push(item);
        // console.table(arrayTareas);
        // verificar que la respuesta de la API sea OK o NoOK para mostrar error

        //Limpiar campos
        generarInforme()
        limpiarCampos()
        alert("✅ registro exitoso")
    } else {
        alert("⛔️ Ingresa el nombre del usuario asistido")
    }
    // }
}

const generarInforme = () => {
    divInformeFinal.innerHTML = ""
    //llamada a la api para obtener tareas del dia x.
    // const arrayParaInforme = [{
    //     id: 1,
    //     oficinaId: 111,
    //     inmueble: "9 de Julio",
    //     oficina: "Civil 1",
    //     texto: "Se realiza ronda de control para controlat djahdfsjkdf ....",        
    // }];
    const arrayParaInforme = arrayTareas.map((t) => (
        {
            inmuebleId: t.inmuebleId,
            // inmuebleNom: inmuebles.find(i => i.id == t.inmuebleId).descripcion,
            oficinaId: t.oficinaId,
            // oficinaNom: oficinas.find(i => i.id == t.oficinaId).descripcion,
            textoDivInm: `<div id=${t.inmuebleId}>
                            <br><h3><b>INMUEBLE ${inmuebles.find(i => i.id == t.inmuebleId).descripcion}</h3>
                        </div>`,
            textoDivOfi: `<div id=${t.oficinaId}>
                            <h3><b>${oficinas.find(i => i.id == t.oficinaId).descripcion}</h3>
                        </div>`,
            textoTarea: `${tabulador}${t.otraTarea}${tareas.find(tar => tar.id == t.tareaId).descripcion}
            ${t.clienteId} ${t.comentario}. Tarea realizada por ${usuarioLogeado}\n<br><br>`,
        }
    ))
    console.table(arrayParaInforme)
    mostrarDiv(informeFinal)
    arrayParaInforme.forEach(elemento => {
        let divInm = document.getElementById(`${elemento.inmuebleId}`)
        let divOfi = document.getElementById(`${elemento.oficinaId}`)
        console.log(divInm)
        if (divInm === null) {
            divInformeFinal.innerHTML += `${elemento.textoDivInm}`
            divInm = document.getElementById(`${elemento.inmuebleId}`)
        }
        if (divOfi === null) {
            divInm.innerHTML += `${elemento.textoDivOfi}`
            divOfi = document.getElementById(`${elemento.inmuebleId}`)
        }
        divOfi.innerHTML += `${elemento.textoTarea}`
    })
}

function mostrarDiv(div) {
    div.classList.remove("ocultar")
    cliente.value = ""
    comentario.value = ""
}

function ocultarDiv(div) {
    div.classList.add("ocultar")
    otraTarea.value = ""
}

function SelectOtraTarea() {
    if (parseInt(tarea.value) === 320) {
        banderaCliente = false
        mostrarDiv(divOtraTarea)
        ocultarDiv(divTareaCompleto)
    } else {
        banderaCliente = true
        ocultarDiv(divOtraTarea)
        mostrarDiv(divTareaCompleto)
    }
}

cargarCombo(inmueble, inmuebles)
cargarCombo(tarea, tareas)
filtrarOficina(inmuebles[0].id);

btnGuardar.addEventListener("click", guardar)
// btnGenerarInforme.addEventListener("click", generarInforme)
inmueble.addEventListener('change', () => { filtrarOficina(inmueble.value) })
tarea.addEventListener("change", SelectOtraTarea)
cliente.addEventListener("focus", banderaCliente = true)