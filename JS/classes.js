"use strict";

/*Clase Cliente*/
class Cliente {
    constructor(nif, nombre, apellido, telefono) {
        this.nif = nif;
        this.nombre = nombre;
        this.apellido = apellido;
        this.telefono = telefono;
    }

    //Ordenar alfabéticamente por apellido
    static compararApellido(a, b) {
        if (a.apellido < b.apellido) {
            return -1;
        } else if (a.apellido > b.apellido) {
            return 1;
        } else {
            return 0;
        }
    }
}

/*Clase Proveedor*/
class Proveedor {
    constructor(cif, nombre, telefono) {
        this.cif = cif;
        this.nombre = nombre;
        this.telefono = telefono;
    }
    //Ordenar alfabéticamente por nombre
    static compararProveedor(a, b) {
        if (a.nombre < b.nombre) {
            return -1;
        } else if (a.nombre > b.nombre) {
            return 1;
        } else {
            return 0;
        }
    }
}


/*Clase Producto*/
class Producto {
    constructor(codigo, precio) {
        this.codigo = codigo;
        this.precio = parseFloat(precio);
    }
    //Verificar existencia de un código
    static equals(a, b) {
        if (a.codigo == b.codigo)
            return true;
        else
            return false;
    }
}

/*Clase Maceta*/
class Maceta extends Producto {
    constructor(codigo, precio, color, capacidad, material) {
        super(codigo, precio);
        this.tipo = "Maceta";
        this.color = color;
        this.capacidad = parseInt(capacidad);
        this.material = material;
    }
}

/*Clase Planta*/
class Planta extends Producto {
    constructor(codigo, precio, nombre, frutal, flor, tamaño) {
        super(codigo, precio);
        this.tipo = "Planta";
        this.nombre = nombre;
        this.frutal = Boolean(frutal);
        this.flor = Boolean(flor);
        if (tamaño != "Grande" && tamaño != "Pequeño" && tamaño != "Mediano") {
            throw "ERROR: Tamaño no válido.";
        }
        this.tamaño = tamaño;
    }
}

/*Clase Venta*/
class Venta {
    constructor(oCliente, oProducto, fecha) {
        this.oCliente = oCliente;
        this.oProducto = oProducto;
        this.fecha = new Date(fecha);
    }

}

/*Clase Pedido*/
class Pedido {
    constructor(oProveedor, oProducto, fecha) {
        this.oProveedor = oProveedor;
        this.oProducto = oProducto;
        this.fecha = new Date(fecha);
    }
    ///////////////////hay que comparar las fechs (sacar metodo a vivero?)
}

/*Clase Alquiler*/
class Alquiler {
    constructor(oCliente, oProducto, fechaIni, fechaFin) {
        this.oCliente = oCliente;
        this.oProducto = oProducto;
        this.fechaIni = new Date(fechaIni);
        this.fechaFin = new Date(fechaFin);
    }

    static calcularPrecio(oProducto, fechaFin, fechaIni) {
        let unitario = oProducto.precio;
        const DIA = 1000 * 60 * 60 * 24;
        const differenceMs = Math.abs(fechaFin - fechaIni);
        let duracion = Math.round(differenceMs / DIA);

        return duracion * (unitario * 0.15)

    }
}

/*Clase Vivero*/
class Vivero {
    constructor(tClientes, tVentas, tProductos, tPedidos, tAlquileres, tProveedores) {
        this.tClientes = tClientes;
        this.tVentas = tVentas;
        this.tPedidos = tPedidos;
        this.tProductos = tProductos;
        this.tAlquileres = tAlquileres;
        this.tProveedores = tProveedores;
        this.contadorVentas = 0;
        this.contadorPedidos = 0;
        this.contadorAlquileres = 0;
    }

    //Cargar XML
    static loadXMLDoc(filename) {
        let xhttp;
        if (window.XMLHttpRequest) {
            xhttp = new XMLHttpRequest();
        } else {
            xhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xhttp.open("GET", filename, false);
        xhttp.send();
        return xhttp.responseXML;
    }
    //Cargar datos en un respectivos arrays
    cargarDatos() {
        //Clientes
        var oXMLClientes = Vivero.loadXMLDoc("XML/clientes.xml");
        var clientes = oXMLClientes.getElementsByTagName("cliente")
        for (var i = 0; i < clientes.length; i++) {
            let nif = clientes[i].getElementsByTagName("NIF")[0].textContent;
            let nombre = clientes[i].getElementsByTagName("nombre")[0].textContent;
            let apellido = clientes[i].getElementsByTagName("apellidos")[0].textContent;
            let telefono = clientes[i].getElementsByTagName("telefono")[0].textContent;
            let oCliente = new Cliente(nif, nombre, apellido, telefono);
            this.tClientes.push(oCliente);
        }

        //Proveedores
        var oXMLProveedores = Vivero.loadXMLDoc("XML/proveedores.xml");
        var proveedores = oXMLProveedores.getElementsByTagName("proveedor")
        for (var i = 0; i < proveedores.length; i++) {
            let cif = proveedores[i].getElementsByTagName("CIF")[0].textContent;
            let nombre = proveedores[i].getElementsByTagName("nombre")[0].textContent;
            let telefono = proveedores[i].getElementsByTagName("telefono")[0].textContent;
            let oProveedor = new Proveedor(cif, nombre, telefono);
            this.tProveedores.push(oProveedor);
        }
        //Productos
        var oXMLproductos = Vivero.loadXMLDoc("XML/productos.xml");
        var productos = oXMLproductos.getElementsByTagName("producto")
        for (var i = 0; i < productos.length; i++) {
            let codigo = productos[i].getElementsByTagName("codigo")[0].textContent;
            let precio = productos[i].getElementsByTagName("precio")[0].textContent;
            let tipo = productos[i].getAttribute("tipo");
            if (tipo == "planta") {
                let nombre = productos[i].getElementsByTagName("nombre")[0].textContent;
                let frutal = productos[i].getElementsByTagName("frutal")[0].textContent;
                let flor = productos[i].getElementsByTagName("flor")[0].textContent;
                let tamaño = productos[i].getElementsByTagName("tamaño")[0].textContent;
                let oProducto = new Planta(codigo, precio, nombre, frutal, flor, tamaño);
                this.tProductos.push(oProducto);

            } if (tipo == "maceta") {
                let color = productos[i].getElementsByTagName("color")[0].textContent;
                let material = productos[i].getElementsByTagName("material")[0].textContent;
                let capacidad = productos[i].getElementsByTagName("capacidad")[0].textContent;
                let oProducto = new Maceta(codigo, precio, color, capacidad, material);
                this.tProductos.push(oProducto);
            }

        }


        //Pedidos
        var oXMLPedidos = Vivero.loadXMLDoc("XML/pedidos.xml");
        var pedidos = oXMLPedidos.getElementsByTagName("pedido")
        for (var i = 0; i < pedidos.length; i++) {
            let cif = pedidos[i].getElementsByTagName("CIF")[0].textContent;
            let codigo = pedidos[i].getElementsByTagName("codigo")[0].textContent;
            let fecha = pedidos[i].getElementsByTagName("fecha")[0].textContent;
            this.pedido(cif, codigo, fecha);

        }

        //Alquileres
        var oXMLalquileres = Vivero.loadXMLDoc("XML/alquileres.xml");
        var alquileres = oXMLalquileres.getElementsByTagName("alquiler")
        for (var i = 0; i < alquileres.length; i++) {
            let nif = alquileres[i].getElementsByTagName("NIF")[0].textContent;
            let codigo = alquileres[i].getElementsByTagName("codigo")[0].textContent;
            let fechaIni = alquileres[i].getElementsByTagName("fechaIni")[0].textContent;
            let fechaFin = alquileres[i].getElementsByTagName("fechaFin")[0].textContent;
            this.alquiler(nif, codigo, fechaIni, fechaFin);

        }

        //Ventas
        var oXMLVentas = Vivero.loadXMLDoc("XML/ventas.xml");
        var ventas = oXMLVentas.getElementsByTagName("venta")
        for (var i = 0; i < ventas.length; i++) {
            let nif = ventas[i].getElementsByTagName("NIF")[0].textContent;
            let codigo = ventas[i].getElementsByTagName("codigo")[0].textContent;
            let fecha = new Date(ventas[i].getElementsByTagName("fecha")[0].textContent).toLocaleDateString("es", { year: "2-digit", month: "2-digit", day: "2-digit" });
            this.venta(nif, codigo, fecha);

        }


    }


    //Crear tabla
    static makeHTMLTable(tCabeceras, tArrRows) {
        let outputString;
        outputString = '<table class="table table-striped">';
        outputString += Vivero.makeHTMLthRow(tCabeceras);
        tArrRows.forEach(function (arrRow) {
            outputString += Vivero.makeHTMLrow(arrRow);

        });
        outputString += '</table>';
        return outputString;
    }
    //Crear encabezado 
    static makeHTMLthRow(inputArray) {
        let outputString;
        outputString = '<tr>';
        inputArray.forEach(function (element) {
            outputString += '<th>' + element + '</th>';
        });
        outputString += '</tr>';
        return outputString;
    }

    //Crear fila 
    static makeHTMLrow(inputArray) {
        let outputString;
        outputString = '<tr>';
        inputArray.forEach(function (element) {
            outputString += '<td>' + element + '</td>';
        });
        outputString += '</tr>';
        return outputString;
    }

    //Comparar fechas 
    static compararFechas(a, b) {
        if (a.fecha.getTime() < b.fecha.getTime()) {
            return -1;
        } else if (a.fecha.getTime() > b.fecha.getTime()) {
            return 1;
        } else {
            return 0;
        }
    }



    //Alta Cliente
    altaCliente(oCliente) {
        if (oCliente.NIF == "" || oCliente.nombre == "" || oCliente.apellido == "") {
            return "ERROR. Debe completar el formulario.";
        } else {
            if (this.tClientes.some(function (element) {
                return element.nif == oCliente.nif;
            })) {
                return "ERROR. El cliente ya está registrado.";
            } else {
                this.tClientes.push(oCliente);
                return "Cliente registrado correctamente.";
            }
        }
    }

    //Alta Proveedor
    altaProveedor(oProveedor) {
        if (oProveedor.cif == "" || oProveedor.nombre == "" || oProveedor.telefono == "") {
            return "ERROR. Debe completar el formulario.";
        } else {
            if (this.tProveedores.some(function (element) {
                return element.cif == oProveedor.cif;
            })) {
                return "ERROR. El proveedor ya está registrado.";
            } else {
                this.tProveedores.push(oProveedor);
                return "Proveedor registrado correctamente.";
            }
        }
    }

    //Alta producto
    altaProducto(oProducto) {
        if (oProducto.codigo == "") {
            return "ERROR. Debe completar el formulario.";
        } else {
            if (this.tProductos.some(function (element) {
                return element.codigo == oProducto.codigo;
            })) {
                return "ERROR. El producto ya está registrado.";
            } else {
                if (oProducto.precio < 0) {
                    return "El precio no puede ser un valor negativo.";
                } else {
                    this.tProductos.push(oProducto);
                    return "Producto registrado correctamente.";
                }
            }
        }
    }

    //Venta

    //Venta
    venta(nif, codigo, fecha) {
        fecha = new Date(fecha);
        //Verifica que el producto existe
        let oProducto = this.tProductos.find(function (oProductoIterado) {
            return oProductoIterado.codigo == codigo;
        });
        if (oProducto != undefined) {
            console.log("Producto disponible.");
        } else {
            return "ERROR. El código proporcionado no existe.";
        }

        //Verifica que el cliente existe
        let oCliente = this.tClientes.find(function (oClienteIterado) {
            return oClienteIterado.nif == nif;
        });
        if (oCliente != undefined) {
            console.log("Cliente existente.");
        } else {
            return "ERROR. El cliente proporcionado no existe.";
        }

        let oVenta = new Venta(oCliente, oProducto, fecha);

        /*Begin guarrada*/
        this.contadorVentas++;
        oVenta.id = this.contadorVentas;
        /*End guarrada*/

        this.tVentas.push(oVenta);
        return "Venta registrada.";
    }

    //Alquiler      
    alquiler(nif, codigo, fechaIni, fechaFin) {
        fechaIni = new Date(fechaIni);
        fechaFin = new Date(fechaFin);
        //Verifica que el producto existe
        let oProducto = this.tProductos.find(function (oProductoIterado) {
            return oProductoIterado.codigo == codigo;
        });
        if (oProducto != undefined) {
            console.log("Producto disponible.");
        } else {
            return "ERROR. El código proporcionado no existe.";
        }

        //Verifica que el cliente existe
        let oCliente = this.tClientes.find(function (oClienteIterado) {
            return oClienteIterado.nif == nif;
        });
        if (oCliente != undefined) {
            console.log("Cliente existente.");
        } else {
            return "ERROR. El cliente proporcionado no existe.";
        }

        let oAlquiler = new Alquiler(oCliente, oProducto, fechaIni, fechaFin);
        /*Begin guarrada*/
        this.contadorAlquileres++;
        oAlquiler.id = this.contadorAlquileres;
        /*End guarrada*/

        this.tAlquileres.push(oAlquiler);
        return "Alquiler registrado.";
    }


    //Pedido
    pedido(cif, codigo, fecha) {
        fecha = new Date(fecha);
        //Verifica que el producto existe
        let oProducto = this.tProductos.find(function (oProductoIterado) {
            return oProductoIterado.codigo == codigo;
        });
        if (oProducto != undefined) {
            console.log("Producto disponible.");
        } else {
            return "ERROR. El código proporcionado no existe.";
        }

        //Verifica que el proveedor existe
        let oProveedor = this.tProveedores.find(function (oProveedorIterado) {
            return oProveedorIterado.cif == cif;
        });
        if (oProveedor != undefined) {
            console.log("Proveedor existente.");
        } else {
            return "ERROR. El proveedor proporcionado no existe.";
        }

        let oPedido = new Pedido(oProveedor, oProducto, fecha);
        /*Begin guarrada*/
        this.contadorPedidos++;
        oPedido.id = this.contadorPedidos;
        /*End guarrada*/
        this.tPedidos.push(oPedido);
        return "Pedido registrado.";
    }

    //Búsquedas
    buscarCliente(nif) {
        return this.tClientes.find(function (clienteIterado) {
            return clienteIterado.nif == nif;
        });
    }

    buscarProducto(codigo) {
        return this.tProductos.find(function (productoIterado) {
            return productoIterado.codigo == codigo;
        });
    }


    //Modificaciones
    actualizarCliente(nif, oCliente) {
        let indexCliente = this.tClientes.findIndex(function (oCliente) {
            return oCliente.nif == nif;
        });
        this.tClientes[indexCliente] = oCliente;
    }
    actualizarProveedor(cif, oProveedor) {
        let indexProovedor = this.tProveedores.findIndex(function (oProveedor) {
            return oProveedor.cif == cif;
        });
        this.tProveedores[indexProovedor] = oProveedor;
    }
    actualizarProducto(codigo, oProducto) {
        let indexProducto = this.tProductos.findIndex(function (oProducto) {
            return oProducto.codigo == codigo;
        });
        this.tProductos[indexProducto] = oProducto;
    }

    ///////////////
    actualizarVenta(id, oVenta) {
        let indexVenta = this.tVentas.findIndex(function (oVenta) {
            return oVenta.id == id;
        });
        this.tVentas[indexVenta] = oVenta;
    }

    ventaGenerada(nif, codigo, fecha) {
        console.log("ventaGenerada");
        fecha = new Date(fecha);
        //Verifica que el producto existe
        let oProducto = this.tProductos.find(function (oProductoIterado) {
            return oProductoIterado.codigo == codigo;
        });
        if (oProducto != undefined) {
            console.log("Producto disponible.");
        } else {
            return "ERROR. El código proporcionado no existe.";
        }

        //Verifica que el cliente existe
        let oCliente = this.tClientes.find(function (oClienteIterado) {
            return oClienteIterado.nif == nif;
        });
        if (oCliente != undefined) {
            console.log("Cliente existente.");
        } else {
            return "ERROR. El cliente proporcionado no existe.";
        }

        let oVenta = new Venta(oCliente, oProducto, fecha);

        return oVenta;
    }


    actualizarPedido(id, oPedido) {
        let indexPedido = this.tPedidos.findIndex(function (oPedido) {
            return oPedido.id == id;
        });
        this.tPedidos[indexPedido] = oPedido;
    }
    pedidoGenerado(cif, codigo, fecha) {
        console.log("pedidoGenerada");
        fecha = new Date(fecha);
        //Verifica que el producto existe
        let oProducto = this.tProductos.find(function (oProductoIterado) {
            return oProductoIterado.codigo == codigo;
        });
        if (oProducto != undefined) {
            console.log("Producto disponible.");
        } else {
            return "ERROR. El código proporcionado no existe.";
        }

        //Verifica que el proveedor existe
        let oProveedor = this.tProveedores.find(function (oProveedorIterado) {
            return oProveedorIterado.cif == cif;
        });
        if (oProveedor != undefined) {
            console.log("Proov existente.");
        } else {
            return "ERROR. El proveedor proporcionado no existe.";
        }

        let oPedido = new Pedido(oProveedor, oProducto, fecha);

        return oPedido;
    }

    actualizarAlquiler(id, oAlquiler){
        let indexAlquiler = this.tAlquileres.findIndex(function (oAlquiler) {
            return oAlquiler.id == id;
        });
        this.tAlquileres[indexAlquiler] = oAlquiler;
    }

    alquilerGenerado(nif, codigo, fechaini, fechafin) {
        console.log("alquilerGenerada");
        fechaini = new Date(fechaini);
        fechafin = new Date(fechafin);
        //Verifica que el producto existe
        let oProducto = this.tProductos.find(function (oProductoIterado) {
            return oProductoIterado.codigo == codigo;
        });
        if (oProducto != undefined) {
            console.log("Producto disponible.");
        } else {
            return "ERROR. El código proporcionado no existe.";
        }

        //Verifica que el cliente existe
        let oCliente = this.tClientes.find(function (oClienteIterado) {
            return oClienteIterado.nif == nif;
        });
        if (oCliente != undefined) {
            console.log("cliente existente.");
        } else {
            return "ERROR. El cliente proporcionado no existe.";
        }

        let oAqluiler = new Alquiler(oCliente, oProducto, fechaini, fechafin);

        return oAqluiler;
    }

    //Eliminaciones
    borrarCliente(nif) {
        this.tClientes = this.tClientes.filter(function (oCliente) {
            return oCliente.nif != nif;
        });
    }
    borrarProveedor(cif) {
        console.log("aqui");
        this.tProveedores = this.tProveedores.filter(function (oProveedor) {
            return oProveedor.cif != cif;
        });
    }
    borrarProducto(codigo) {
        this.tProductos = this.tProductos.filter(function (oProducto) {
            return oProducto.codigo != codigo;
        });
    }
    //////////////////////////
    borrarVenta(id) {
        this.tVentas = this.tVentas.filter(function (oVenta) {
            return oVenta.id != id;
        });
    }
    borrarPedido(id) {
        this.tPedidos = this.tPedidos.filter(function (oPedido) {
            return oPedido.id != id;
        });
    }
    borrarAlquiler(id) {
        this.tAlquileres = this.tAlquileres.filter(function (oAlquiler) {
            return oAlquiler.id != id;
        });
    }

    //Listados
    listarClientes() {
        this.tClientes.sort(Cliente.compararApellido);

        let tCabeceras = ["NIF del cliente",
            "Nombre del cliente",
            "Apellido del cliente",
            "Teléfono del cliente"];
        let tArrRows = [];
        this.tClientes.forEach(function (oClienteIterado) {
            let arrRow = [oClienteIterado.nif,
            oClienteIterado.nombre,
            oClienteIterado.apellido,
            oClienteIterado.telefono];
            tArrRows.push(arrRow);
        });

        return Vivero.makeHTMLTable(tCabeceras, tArrRows);
    }

    listarProveedores() {
        this.tProveedores.sort(Proveedor.compararProveedor);

        let tCabeceras = ["CIF del proveedor",
            "Nombre del proveedor",
            "Teléfono del proveedor"];
        let tArrRows = [];
        this.tProveedores.forEach(function (oProveedorIterado) {
            let arrRow = [oProveedorIterado.cif,
            oProveedorIterado.nombre,
            oProveedorIterado.telefono];
            tArrRows.push(arrRow);
        });

        return Vivero.makeHTMLTable(tCabeceras, tArrRows);
    }

    listarProductos() {
        let tCabeceras = ["Código",
            "Precio (€)",
            "Tipo",
            "Detalles"];
        let tArrRows = [];
        this.tProductos.forEach(function (oProductoIterado) {
            let tipo;
            let detalles;
            if (oProductoIterado.tipo=="Maceta") {
                tipo = "Maceta";
                let thMaceta = ["Color", "Capacidad (L)", "Material"];
                let tdMaceta = [[oProductoIterado.color, oProductoIterado.capacidad, oProductoIterado.material]];
                detalles = Vivero.makeHTMLTable(thMaceta, tdMaceta);
            } else if (oProductoIterado.tipo="Planta") {
                tipo = "Planta";
                let thPlanta = ["Nombre", "Frutal", "Flor", "Tamaño"];
                let tdPlanta = [[oProductoIterado.nombre, oProductoIterado.frutal, oProductoIterado.flor, oProductoIterado.tamaño]];
                detalles = Vivero.makeHTMLTable(thPlanta, tdPlanta);
            }

            let arrRow = [oProductoIterado.codigo,
            oProductoIterado.precio,
                tipo,
                detalles];
            tArrRows.push(arrRow);
        });
        return Vivero.makeHTMLTable(tCabeceras, tArrRows);
    }

    listarVentasPeriodo(dInicio, dFin) {
        dInicio = new Date(dInicio);
        dFin = new Date(dFin);
        console.log("aqui");
        let tVentasPeriodo;
        tVentasPeriodo = this.tVentas.filter(function (oVentaIterada) {
            return dInicio.getTime() <= oVentaIterada.fecha.getTime() &&
                oVentaIterada.fecha.getTime() <= dFin.getTime();
        });
        tVentasPeriodo.sort(Vivero.compararFechas);
        //Construir la tabla



        let tCabeceras = ["Número Venta",
            "Código Producto",
            "Precio",
            "NIF Cliente",
            "Nombre Cliente",
            "Apellidos Cliente",
            "Teléfono Cliente",
            "Fecha Venta"];
        let tArrRows = [];
        /*
         * arr.forEach(callback(currentValue [, index [, array]])[, thisArg])
         * */
        tVentasPeriodo.forEach(function (oVentaIterada, index) {
            let tRow = [
                oVentaIterada.id,
                oVentaIterada.oProducto.codigo,
                oVentaIterada.oProducto.precio,
                oVentaIterada.oCliente.nif,
                oVentaIterada.oCliente.nombre,
                oVentaIterada.oCliente.apellido,
                oVentaIterada.oCliente.telefono,
                oVentaIterada.fecha.toLocaleDateString("es", { year: "2-digit", month: "2-digit", day: "2-digit" })];
            tArrRows.push(tRow);
        });
        return Vivero.makeHTMLTable(tCabeceras, tArrRows);
    }


    listarPedidosPeriodo(dInicio, dFin) {
        dInicio = new Date(dInicio);
        dFin = new Date(dFin);

        let tPedidosPeriodo;
        tPedidosPeriodo = this.tPedidos.filter(function (oPedidoIterado) {
            return dInicio.getTime() <= oPedidoIterado.fecha.getTime() &&
                oPedidoIterado.fecha.getTime() <= dFin.getTime();
        });
        tPedidosPeriodo.sort(Vivero.compararFechas);
        //Construir la tabla

        let tCabeceras = ["Id",
            "Código Producto",
            "Precio",
            "CIF Proveedor",
            "Nombre Proveedor",
            "Teléfono Proveedor",
            "Fecha Pedido"];
        let tArrRows = [];
        tPedidosPeriodo.forEach(function (oPedidoIterada) {
            let tRow = [
                oPedidoIterada.id,
                oPedidoIterada.oProducto.codigo,
                oPedidoIterada.oProducto.precio,
                oPedidoIterada.oProveedor.cif,
                oPedidoIterada.oProveedor.nombre,
                oPedidoIterada.oProveedor.telefono,
                oPedidoIterada.fecha.toLocaleDateString("es", { year: "2-digit", month: "2-digit", day: "2-digit" })];
            tArrRows.push(tRow);
        });
        return Vivero.makeHTMLTable(tCabeceras, tArrRows);
    }

    listarAlquileresActivos() {
        let dHoy = new Date();

        let tAlquileresActivos;
        tAlquileresActivos = this.tAlquileres.filter(function (oAlquilerIterado) {
            return dHoy.getTime() <= oAlquilerIterado.fechaFin.getTime();
        });
        
        //Construir la tabla

        let tCabeceras = [
	    "Id del alquiler",
	    "Código Producto",
            "Precio Alquiler",
            "NIF Cliente",
            "Nombre Cliente",
            "Apellidos Cliente",
            "Teléfono Cliente",
            "Fecha Inicio",
            "Fecha Fin"];
        let tArrRows = [];
        tAlquileresActivos.forEach(function (oAlquilerIterado) {
            let tRow = [
		oAlquilerIterado.id,
                oAlquilerIterado.oProducto.codigo,
                Alquiler.calcularPrecio(oAlquilerIterado.oProducto, oAlquilerIterado.fechaFin, oAlquilerIterado.fechaIni),
                oAlquilerIterado.oCliente.nif,
                oAlquilerIterado.oCliente.nombre,
                oAlquilerIterado.oCliente.apellido,
                oAlquilerIterado.oCliente.telefono,
                oAlquilerIterado.fechaIni.toLocaleDateString("es", { year: "2-digit", month: "2-digit", day: "2-digit" }),
                oAlquilerIterado.fechaFin.toLocaleDateString("es", { year: "2-digit", month: "2-digit", day: "2-digit" })];
            tArrRows.push(tRow);
        });
        return Vivero.makeHTMLTable(tCabeceras, tArrRows);
    }
    

}


