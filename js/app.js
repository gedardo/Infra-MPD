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
    // Funcion que llama a la API con los datos de la tarea

    if (cliente.value || otraTarea.value) {
        if (comentario.value) {
            let valor = comentario.value
            comentario.value = ` ${valor}.`
        }
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
        cliente.focus()
    } else {
        alert("⛔️ Faltan ingresar datos IMPORTANTES")
        cliente.focus()
    }
    // }
}

const generarInforme = () => {
    divInformeFinal.innerHTML = ""
    //llamada a la api para obtener tareas del dia x.

    const arrayParaInforme = arrayTareas.map((t) => (
        {
            inmuebleId: t.inmuebleId,
            oficinaId: t.oficinaId,
            textoDivInm: `<div id=${t.inmuebleId}>
                            <br><h3><b>INMUEBLE ${inmuebles.find(i => i.id == t.inmuebleId).descripcion}</h3>
                        </div>`,
            textoDivOfi: `<div id=${t.oficinaId}>
                            <h3><b>${oficinas.find(i => i.id == t.oficinaId).descripcion}</h3>
                        </div>`,
            textoTarea: `${tabulador}${t.otraTarea}${tareas.find(tar => tar.id == t.tareaId).descripcion}${t.clienteId}.${t.comentario} Tarea realizada por ${usuarioLogeado}.\n<br><br>`,
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
        mostrarDiv(divOtraTarea)
        ocultarDiv(divTareaCompleto)
    } else {
        ocultarDiv(divOtraTarea)
        mostrarDiv(divTareaCompleto)
    } cliente.focus()
}

cargarCombo(inmueble, inmuebles)
cargarCombo(tarea, tareas)
filtrarOficina(inmuebles[0].id);

btnGuardar.addEventListener("click", guardar)
// btnGenerarInforme.addEventListener("click", generarInforme)
inmueble.addEventListener('change', () => { filtrarOficina(inmueble.value) })
tarea.addEventListener("change", SelectOtraTarea)
cliente.addEventListener("focus", () => { banderaCliente = true })
cliente.addEventListener("keypress", (e) => { (e.key === "Enter") && comentario.focus() })
comentario.addEventListener("keypress", (e) => { e.key === "Enter" && guardar() })
otraTarea.addEventListener("keypress", (e) => { (e.key === "tab") && guardar.focus() })