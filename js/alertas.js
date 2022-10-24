const alertOk = (title) => {
  swal.fire({
    position: 'top-end',
    icon: 'success',
    title: title,
    showConfirmButton: false,
    timer: 1800
  })
}

const alertError = (title) =>{
  Swal.fire({
    icon: 'error',
    title: title,
    confirmButtonText: 'Aceptar',
  })
}

const alertConfirm = (text, title) =>{
  Swal.fire({
    title: 'Estas seguro?',
    text: text,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Aceptar'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        'Cancelar',
        title,
        'success'
      )
    }
  })

}