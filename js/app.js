//Función cargar Combos SELECT
const cargarCombo = (select, array)=> {
    if (array.length > 0) {
        array.forEach(elemento => {
            select.innerHTML += `<option value="${elemento.id}">${elemento.nombre}</option>`
        })
    } else {
        console.error("No existen elementos en el array.")
    }
}
cargarCombo(inmueble, inmuebles)
cargarCombo(oficina, oficinas)

const datosCompletos = ()=> {
    if (inmueble.value !== "..." && oficina.value !== "..." && cliente.value !== "") {
        return true
    } else {
        return false
    }
}

const generarTarea = ()=> {
    if (datosCompletos()) {//realizar la cotización
        const seguro = new Cotizador(cliente.value, inmueble.value, oficina.value, CostoM2)
              importe.innerText = seguro.cotizar()
              btnEnviar.classList.remove("ocultar")
    } else {
        alert("⛔️ Completa todos los valores solicitados.")
    }
}

const enviarPorEmail = ()=> {
    const cotizacion = {
        fechaCotizacion: new Date().toLocaleString(),
        inmueble: inmueble[inmueble.selectedIndex].text,
        oficina: oficina[oficina.selectedIndex].text,
        metrosCuadrados: cliente.value,
        poliza: importe.innerText
    }
    localStorage.setItem("UltimaCotizacion", JSON.stringify(cotizacion))
    alert("✅ Cotización enviada. ¡Muchas gracias por elegirnos!")
    btnEnviar.classList.add("ocultar")
}

btnCotizar.addEventListener("click", generarTarea)
btnEnviar.addEventListener("click", enviarPorEmail)