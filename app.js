
let carrito = [];


const listado =document.getElementById ("listado");
const listadoProductos22 ="../json/productosgeneral.json";

fetch(listadoProductos22)
.then(response => response.json())
.then(data => {
console.log (data);
})
.catch(error => console.log(error))
.finally(console.log("proceso finalizado"))

//Modificamos el DOM mostrando los productos:
const contenedorProductos = document.getElementById("contenedorProductos");
const listadoProductos = "../json/productosgeneral.json";

let listaTotalProducts = [];

//Creamos una funcion para mostrar los productos:
const mostrarProductos = () => {
    fetch(listadoProductos)
    .then(response => response.json())
    .then(data => {
        data.forEach( prenda => {
        listaTotalProducts.push(prenda)
        const card = document.createElement("div");
        card.classList.add("col-xl-4", "col-md-6", "col-xs-12");
        card.innerHTML = `
            <div class = "card"> 
                <img src = "${prenda.img}" class = "card-img-top imgcaja" >
                <div class =  "card-body">
                    <h5> ${prenda.nombre} </h5>
                    <p> Precio: S/.${prenda.precio} </p>
                    <p> Color: ${prenda.color} </p>
                    <button class = "btn colorBoton" id= "boton${prenda.id}">Agregar al carrito</button>
                </div>
            </div>
            `
        contenedorProductos.appendChild(card);


        //AGREGAR PRODUCTOS AL CARRITO
        const boton = document.getElementById(`boton${prenda.id}`);
        boton.addEventListener("click",()=> {
            console.log("Agregaste el producto", prenda);
            agregarAlcarrito(prenda)
            })
        })
    }).catch(error => console.log(error))
    .finally(console.log("proceso finalizado"))

}

mostrarProductos();

const CalcularTotal = ()=>{
    let TotalCompra = 0;
    carrito.forEach(prenda =>{
        TotalCompra += prenda.precio * prenda.cantidad;
    })
    Total.innerHTML = ` Total: $${TotalCompra}` 
}

//Creamos la funcion agregar al carrito:
const agregarAlcarrito = (prenda) => {
    const prendaEnCarrito = carrito.find(prendaCarrito => prendaCarrito.id === prenda.id);
    if (prendaEnCarrito) {
        prendaEnCarrito.cantidad++;
    } else {
        const prendaSave = listaTotalProducts.find(prendaProducto => prendaProducto.id === prenda.id);
        carrito.push(prendaSave);
    }

    console.log("carrito", carrito);
        localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
}

//Mostrar el carrito de compras
const contenedorCarrito = document.getElementById("contenedorCarrito");
const verCarrito = document.getElementById("verCarrito");

verCarrito.addEventListener("click",()=>{
    mostrarCarrito();
})

const mostrarCarrito = () => {
    contenedorCarrito.innerHTML = "";

 carrito.forEach(prenda => {
        const card = document.createElement("div");
        card.classList.add("col-xl-3", "col-md-6", "col-xs-12");
        card.innerHTML = `
            <div class="card"> 
                <img src = "${prenda.img}" class="card-img-top imgcaja">
                <div class = "card-body">
                    <h5> ${prenda.nombre} </h5>
                    <p> ${prenda.precio} </p>
                    <p> ${prenda.color} </p>
                    <p> ${prenda.cantidad} </p>
                    <button class = "btn colorBoton" id= "eliminar ${prenda.id}">Eliminar producto</button>
                </div>
            </div>
            `
            contenedorCarrito.appendChild(card);

            //Eliminar productos del carrito"
            const boton = document.getElementById(`eliminar ${prenda.id}`);
            boton.addEventListener("click", ()=>{
                eliminarDelCarrito(prenda.id);
            })

        })
        CalcularTotal();
}


//FUNCION que elimina el producto del carrito
const eliminarDelCarrito = (id) =>{
    const prenda = carrito.find(prenda => prenda.id === id);
    const indice = carrito.indexOf(prenda);
    carrito.splice(indice, 1);
    mostrarCarrito();

    //trabajamos con el localstorage
    localStorage.setItem("carrito",JSON.stringify(carrito));
}

//Vaciamos todo el carrito de compras.
const vaciarCarrito = document.getElementById("vaciarCarrito");

vaciarCarrito.addEventListener("click", ()=>{
    swal({
        title: "Estás seguro?",
        text: "Una vez eliminado deberás seleccionar nuevamente las prendas",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
            eliminarTodoeElCarrito();
            swal("Poof! Tu carrito esta vacío", {
                icon: "success",
            });
        } else {
          swal("No olvides seleccionar otra prenda!");
        }
      });
})

//FUNCION QUE ELIMINA TODO EL CARRITO:
const eliminarTodoeElCarrito =()=>{
    carrito = [];
    mostrarCarrito();
    //trabajamos con el localstorage
    localStorage.clear();
}



//MOSTRAMOS MENSAJE CON EL TOTAL DE LA COMPRA

const total = document.getElementById("Total");







//PREENTREGA2
// //SIMULADOR DE COMPRA: NIASHOP

// //DECLARACION DE VARIABLES

// let Top = 1;
// let Jogger = 2;
// let Vestido = 3;
// let Bikini = 4;

// //SIMULADOR BIENVENIDA
// const MARCA = "TIENDA ONLINE NIA"
// const BIENVENIDA = ("¡Bienvenido a  " + MARCA+"!");

// console.log(MARCA);
// alert(BIENVENIDA);


// // FUNCION REGISTRO DE CLIENTE 

// let NombreCliente= prompt("Ingrese su Nombre").toUpperCase();
// let ApellidoCliente = prompt("Ingrese su Apellido").toUpperCase();
// let CorreoCliente= prompt("Ingrese su Dirección de Correo Electrónico").toUpperCase();
//     if (CorreoCliente.includes("@")){
//         let CorreoCliente = alert("Correo electronico valido");
//     } 
 
// function solicitarNombre() {
//     alert("Bienvenido " + NombreCliente + " "+ ApellidoCliente + " . ¡Gracias por visitarnos!. " + "Recibirás la confirmación de compra al correo ingresado: " + CorreoCliente)
// }


// //ARRAY CARRITO
// const carrito = []



// //FUNCION ELEGIR PRENDA
// //Opciones al usuario

// function elegirPrenda() {

//     let prenda;
//         do {
//         prenda = parseInt(prompt("Ingrese la prenda que deseas consultar.\n\nEjemplo seleccione '1' para Top.\n\n1- Top\n2- Jogger\n3- Vestido\n4- Polera"));
//         // TIPOPRENDA = {namePrenda: self.getValueTipoPrenda(prenda)}
//         // console.log(TIPOPRENDA)
//             } while (prenda !=1 && prenda !=2 && prenda !=3&& prenda !=4);
//             switch(prenda){
//                 case 1:
//                 return "Top";
//                 case 2:
//                 return "Jogger";
//                 case 3:
//                 return "Vestido";
//                 case 4:
//                 return "Polera";

//             default:
//             console.log("Solo puedes elegir un número entre 1 y 4");
//             alert("Solo puedes elegir un número entre 1 y 4");
//             break;
//         }
// }

// //FUNCION ELEGIR TALLA 
// //Opciones al usuario

// function elegirTalla() {
//     let talla;
//     do {
//         talla = parseInt(prompt("Seleccione la talla.\n\nEjemplo seleccione '1' S.\n\n1- S \n2- M \n3- L"));
//         // TALLA = {nameTalla: self.getValueTalla(talla)}
//         // console.log(TALLA)
//     } while (talla !=1 && talla !=2 && talla !=3);
//     switch(talla){
//         case 1:
//             return "S";
//         case 2:
//             return "M";
//         case 3:
//             return "L";
//         default:
//             console.log("Solo puedes elegir un número entre 1 y 3");
//             alert("Solo puedes elegir un número entre 1 y 4");
//         break;
//     }
// }

// //FUNCION VALIDAR PRECIO 

// function validarPrecio (prenda, talla) {

//     //TOP

//     if (prenda === "Top" && talla === "S") {
//                 return 50;
//     } else if (prenda === "Top" && talla === "M") {
//                 return 55;
//     } else if (prenda === "Top" && talla === "L") {
//                 return 60;     
//     } 
    
//     //JOGGER
//     if (prenda === "Jogger" && talla === "S") {
//         return 40;
//     } else if (prenda === "Jogger" && talla === "M") {
//         return 50;
//     } else if (prenda === "Jogger" && talla === "L") {
//         return 60; 

// }

//     //VESTIDOS
//     if (prenda === "Vestido" && talla === "S") {
//         return 60;
//     } else if (prenda === "Vestido" && talla === "M") {
//         return 70;
//     } else if (prenda === "Vestido" && talla === "L") {
//         return 80; 
// }

//     //POLERA
//     if (prenda === "Polera" && talla === "S") {
//         return 80;
//     } else if (prenda === "Polera" && talla === "M") {
//         return 90;
//     } else if (prenda === "Polera" && talla === "L") {
//         return 100; 
// }
// }


// // FUNCION PRECIO TOTAL 

// function preciototal (nombre, talla, precio){
//     alert("El precio de " + nombre + " talla "+ talla + "\nes de S/" + precio)
//     agregarProducto()
// }




// //FUNCION PARA AGREGAR PRODUCTOS AL CARRITO

// function agregarProducto() {
//     let agregarProducto;
//     do {
//         agregarProducto = parseInt(prompt( "Desea añadir más productos?.\n\n1- Si.\n\n2- No "))
//     } while (agregarProducto !=1 && agregarProducto !=2);
//         // if 
//     switch(agregarProducto){
//         case 1:
//             flow(); 
//         case 2:
//             // break;
//             detalleCompra();
//             break;
//         default:
//             console.log("Solo puedes elegir un número entre 1 y 2");
//             alert("Solo puedes elegir un número entre 1 y 2");
//             break;
//     }
// }

// //FUNCION DETALLE DE COMPRA

// function detalleCompra() {
//     let detalle = "Detalle de compra \n\n"
//     let body = "Prenda  Talla  Precio\n"
//     let item = ""
//     // let total = 0
//     // carrito.forEach(element => item+=  element.prenda+ "     "+  element.talla+"     "+  element.precio+"\n");
//     let total = 0;
    

//     carrito.forEach((element) => {
//     item +=  element.nombre+ "     "+  element.talla+"     "+  element.precio+"\n";
//     total+= element.precio;
//     });

//     let precioTotal = "Total       "+total
//     let fin = "\n ========================"
//     let boleta = detalle + body + item + precioTotal +fin
    
//     console.log(boleta)
//     let pago = 0

//     // PAGO FINAL

//     do {
//         pago = parseInt(prompt("El resumen de tu compra: " + boleta+ "\n¿Con cuanto pagas?"))
//         while (isNaN(pago)) {
//             alert("Ingrese un valor númerico");
//             break;
//             detalleCompra()
//         }

//         while (pago < total) {
//             alert ("Monto insuficiente");
//             break;
//             detalleCompra()
//         } 
//         } while (pago < total){
//         alert("¡Gracias por tu compra!, " + NombreCliente + ". En breve recibirás información de envio al correo registrado, tu: pedido llegará pronto" + ". Tu vuelto es S/" + (pago-total))
//         saludoFinal ();

//     } 

// }


// function saludoFinal (){
//     carrito.forEach(element => console.log(element));
//     console.log("Gracias por preferir a " + MARCA + " . ¡Hasta Luego!");
//     alert("Gracias por preferir a " + MARCA + " . ¡Hasta Luego!");
// }


// //DECLARACION DE CONSTRUCTORES//

// //Constructor de objetos: PRENDA


// class Prenda { // 

//     constructor(nombre, talla, precio){
//         this.nombre = nombre
//         this.talla = talla
//         this.precio = precio
//     }
// }


// // INICIO DEL SIMULADOR

// function flow() {
//     // if (value == 1) {
//         let prendaNombre = elegirPrenda();
//         let tallaNombre = elegirTalla();
//         let precioProducto = validarPrecio(prendaNombre, tallaNombre);

//         console.log(prendaNombre)
//         console.log(tallaNombre)
//         console.log(precioProducto)

//     let prenda = new Prenda(prendaNombre, tallaNombre, precioProducto)
//     console.log(prenda)
//     carrito.push(prenda) //SE AGREGA UN OBJETO AL ARRAY
//     preciototal(prenda.nombre, prenda.talla, prenda.precio);
//     // } else {
//     //     alert("Pasar a pagar");
// }

// solicitarNombre();
// flow()

// //DOM
// let Navbar = document.querySelector("navbar")
// let container = document .querySelector("container")
// let cajaproductos = document.querySelector("caja")




// const formulario = document.querySelector("container_form");

// formulario.addEventListener("submit", (e) => {
//     e.preventDefault();
//     console.log(e.target.actiom)