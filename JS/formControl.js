
// Ocultar formularios
function hide_forms() {
    document.getElementById("divFrmAltaProducto").style.display = "none";
    document.getElementById("divFrmAltaCliente").style.display = "none";
    document.getElementById("divFrmAltaProveedor").style.display = "none";
    document.getElementById("divFrmVenta").style.display = "none";
    document.getElementById("divFrmPedido").style.display = "none";
    document.getElementById("divFrmAlquiler").style.display = "none";
    document.getElementById("divFrmVentasPeriodo").style.display = "none";
    document.getElementById("divFrmPedidosPeriodo").style.display = "none";

}
// Mostrar formularios
function show_frmAltaProducto() {
    hide_forms();
    frmAltaProducto.reset();
    document.getElementById("divFrmAltaProducto").style.display = "block";
}
function show_frmPedido() {
    hide_forms();
    frmPedido.reset();
    document.getElementById("divFrmPedido").style.display = "block";
}
function show_frmAltaCliente() {
    hide_forms();
    frmAltaCliente.reset();
    document.getElementById("divFrmAltaCliente").style.display = "block";
}
function show_frmAltaProveedor() {
    hide_forms();
    frmAltaProveedor.reset();
    document.getElementById("divFrmAltaProveedor").style.display = "block";
}
function show_frmVenta() {
    hide_forms();
    frmVenta.reset();
    document.getElementById("divFrmVenta").style.display = "block";
}
function show_frmAlquiler() {
    hide_forms();
    frmAlquiler.reset();
    document.getElementById("divFrmAlquiler").style.display = "block";
}

function show_frmVentasPeriodo() {
    hide_forms();
    frmVentasPeriodo.reset();
    document.getElementById("divFrmVentasPeriodo").style.display = "block";
}
function show_frmPedidosPeriodo() {
    hide_forms();
    frmPedidosPeriodo.reset();
    document.getElementById("divFrmPedidosPeriodo").style.display = "block";
}

//Mostrar listados
function show_lstClientes() {
    hide_forms();
    let listingsWindow = window.open("listadoCliente.html");
}
function show_lstProveedores() {
    hide_forms();
    let listingsWindow = window.open("listadoProveedores.html");
}
function show_lstProductos() {
    hide_forms();
    let listingsWindow = window.open("listadoProductos.html");

}
function show_lstVentasPeriodo() {
    hide_forms();
    let listingsWindow = window.open("listadoVentasP.html");
}

function show_lstAlquilerActivo() {
    hide_forms();
    let listingsWindow = window.open("listadoAlquiler.html");
}

function show_lstPedidosPeriodo() {
    hide_forms();
    let listingsWindow = window.open("listadoPedidos.html");
}


//Enviar formularios
function submit_frmAltaCliente() {
    if (!validarNif(frmAltaCliente.txtNIF.value)) {
        alert("no validado");
        return false;
    }
    if (!validarTelefono(frmAltaCliente.txtTelefono.value)) {
        alert("no validado");
        return false;
    }
    if (!validarNombres(frmAltaCliente.txtNombre.value)) {
        alert("no validado");
        return false;
    }
    if (!validarNombres(frmAltaCliente.txtApellido.value)) {
        alert("no validado");
        return false;
    }

    let alta = modelo.altaCliente(new Cliente(frmAltaCliente.txtNIF.value,
        frmAltaCliente.txtNombre.value,
        frmAltaCliente.txtApellido.value,
        frmAltaCliente.txtTelefono.value));

    frmAltaCliente.reset();
    alert(alta);

}

function submit_frmAltaProveedor() {
    if (!validarCif(frmAltaProveedor.txtCIF.value)) {
        alert("no validado");
        return false;
    }
    if (!validarNombres(frmAltaProveedor.txtNombre.value)) {
        alert("no validado");
        return false;
    }
    if (!validarTelefono(frmAltaProveedor.txtTelefono.value)) {
        alert("no validado");
        return false;
    }
    let alta = modelo.altaProveedor(new Proveedor(frmAltaProveedor.txtCIF.value,
        frmAltaProveedor.txtNombre.value,
        frmAltaProveedor.txtTelefono.value));
    frmAltaProveedor.reset();
    alert(alta);
}

function submit_frmAltaProducto() {
    let tipo = frmAltaProducto.selectTipo.value;
    let frutal = false;
    let flor = false;
    if (document.querySelector("#chkFlor:checked") != null) {

        flor = true;
    }
    if (document.querySelector("#chkFrutal:checked") != null) {
        frutal = true;
    }
    if (tipo == "Planta") {
        if (!validarCodigo(frmAltaProducto.txtCodigo.value)) {
            alert("no validado");
            return false;
        }
        if (!validarNombres(frmAltaProducto.txtNombre.value)) {
            alert("no validado");
            return false;
        }
        let alta = modelo.altaProducto(new Planta(frmAltaProducto.txtCodigo.value,
            frmAltaProducto.txtPrecio.value,
            frmAltaProducto.txtNombre.value,
            frutal,
            flor,
            frmAltaProducto.selectTamaño.value));
        frmAltaProducto.reset();
        alert(alta);

    }
    else if (tipo == "Maceta") {
        if (!validarCodigo(frmAltaProducto.txtCodigo.value)) {
            alert("no validado");
            return false;
        }
        if (!validarTexto(frmAltaProducto.txtColor.value)) {
            alert("no validado");
            return false;
        }
        if (!validarTexto(frmAltaProducto.txtMaterial.value)) {
            alert("no validado");
            return false;
        }
        let alta = modelo.altaProducto(new Maceta(frmAltaProducto.txtCodigo.value,
            frmAltaProducto.txtPrecio.value,
            frmAltaProducto.txtColor.value,
            frmAltaProducto.txtCapacidad.value,
            frmAltaProducto.txtMaterial.value));
        frmAltaProducto.reset();
        alert(alta);
    }
    else {
        alert("Debe seleccionar un tipo de producto.");
    }
}
function submit_frmVenta() {
    let venta = modelo.venta(frmVenta.txtNIFVenta.value,
        frmVenta.txtCodigoVenta.value,
        frmVenta.txtFechaVenta.value);
    frmVenta.reset();
    alert(venta);
}
function submit_frmAlquiler() {
    let alquiler = modelo.alquiler(frmAlquiler.txtNIFAlquiler.value,
        frmAlquiler.txtCodigoAlquiler.value,
        frmAlquiler.txtFechaInicio.value,
        frmAlquiler.txtFechaFin.value);
    frmAlquiler.reset();
    alert(alquiler);
}

function submit_frmPedido() {
    let pedido = modelo.pedido(frmPedido.txtCIFPedido.value,
        frmPedido.txtCodigoPedido.value,
        frmPedido.txtFechaPedido.value);
    frmPedido.reset();
    alert(pedido);

}

function submit_frmVentasPeriodo() {
    show_lstVentasPeriodo();
}

function submit_frmPedidosPeriodo() {
    show_lstPedidosPeriodo();
}

//////////////////////////////VALIDAR FORMULARIOS
function validarNif(nif) {
    //NIF 
    let expReg = /^(\d{8})([A-Z])$/;
    if (!expReg.test(nif.trim())) {
        mensaje("El formato del NIF es 8 dígitos y 1 letra mayúscula");
        return false;
    } else {
        return true;
    }
}

function validarCif(cif) {
    let expReg = /^([ABCDEFGHJKLMNPQRSUVW])(\d{7})([0-9A-J])$/;
    if (!expReg.test(cif.trim())) {
        mensaje("El formato del CIF es 1 letra mayúscula, 7 dígitos y 1 mayúscula de la A a la J.");
        return false;
    } else {
        return true;
    }
}

function validarNombres(nombre) {
    expReg = /^([a-zá-ú]{3,}\s?)+$/i;
    if (!expReg.test(nombre.trim()) || nombre.trim().length > 30 || nombre.trim().length < 5) {
        mensaje("El formato de nombre y apellido es de entre 5 y 30 carácteres y espacios.");
        return false;
    } else {
        return true;
    }
}

function validarTexto(nombre) {
    expReg = /^([a-zá-ú]{3,}\s?)+$/i;
    if (!expReg.test(nombre.trim()) || nombre.trim().length > 30 || nombre.trim().length < 5) {
        mensaje("El formato de color y material es de entre 5 y 30 carácteres y espacios.");
        return false;
    } else {
        return true;
    }
}

function validarTelefono(telefono) {
    expReg = /\d{9}/;
    if (!expReg.test(telefono.trim())) {
        mensaje("El formato del teléfono es de 9dígitos.");
        return false;
    } else {
        return true;
    }
}

function validarCodigo(codigo) {
    expReg = /^\d{0,5}$/;
    if (!expReg.test(codigo.trim())) {
        mensaje("El formato es de 0 a 5 caracteres.");
        return false;
    } else {
        return true;
    }
}

/*Mostrar cosas */
function mensaje(texto) {
    alert(texto);
}

