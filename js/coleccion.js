// -------------------------------------COLECCION-----------------------------------------------
// -------------------------------------FILTROS-----------------------------------------------
const arrayFiltros = ["Celulares", "Aires", "Hogar", "Computacion", "Smart TVs", "Lavarropas"];

const filtros = document.getElementById("filtros");

function crearFiltro(producto) {
    const li = document.createElement("li");
    li.className = "list-group-item filter-item";

    const a = document.createElement("a");
    a.href = "#";
    a.innerText = producto;

    a.onclick = () => filtrarProductos(producto.toLowerCase());

    li.appendChild(a);
    filtros.appendChild(li);
}
arrayFiltros.forEach(el => crearFiltro(el));


// Filtrar productos por categoría
function filtrarProductos(categoria) {
    const productosFiltrados = arrayProductos.filter(producto => producto.categoria === categoria);
    productos.innerHTML = "";
    productosFiltrados.forEach(producto => crearProducto(producto));
}


// -------------------------------------PRODUCTOS-----------------------------------------------
const arrayProductos = [];

// Simular llamada a ruta relativa de archivo json, para obtener productos:
async function obtenerProductos() {
    try {
        const response = await fetch('../json/productos.json');
        const data = await response.json();
        arrayProductos.push(...data);
        mostrarProductos(); // Llamar a esta función después de cargar los datos
    } catch (err) {
        console.error("Error: ", err);
    }
}
obtenerProductos();

const productos = document.getElementById("productos");

function crearProducto(producto) {
    const col = document.createElement("div");
    col.className = "col";

    const card = document.createElement("div");
    card.className = "card mb-3 card-productos text-center";
    card.style = "width: 18rem;";

    const img = document.createElement("img");
    img.src = "../images/page-coleccion/" + producto.categoria + "_" + producto.id + ".jpg";
    img.className = "card-img-top";

    const cardBody = document.createElement("div");
    cardBody.className = "card-body";

    const title = document.createElement("h5");
    title.innerText = producto.nombre;
    title.className = "card-title";

    const price = document.createElement("p");
    price.innerText = `$${producto.precio}`;
    price.className = "card-text";

    const btnAdd = document.createElement("button");
    btnAdd.innerText = "Agregar al carrito";
    btnAdd.className = "btn btn-block bg-warning bg-opacity-75";
    btnAdd.onclick = () => {
        agregarAlCarrito(producto);
        Swal.fire({
            icon: 'success',
            title: `${producto.nombre} agregado al carrito`,
            showConfirmButton: false,
            timer: 1500,
        });
    };

    col.appendChild(card);
    card.appendChild(img);
    card.appendChild(cardBody);
    cardBody.appendChild(title);
    cardBody.appendChild(price);
    cardBody.appendChild(btnAdd);
    productos.appendChild(col);
}

function mostrarProductos() {
    arrayProductos.forEach(el => crearProducto(el));
}

// -------------------------------------CARRITO-----------------------------------------------
// Inicializar el carrito desde el localStorage o como un array vacío
let carrito = JSON.parse(localStorage.getItem('carrito'));
if (!carrito) {
    carrito = [];
}


// Función para agregar productos al carrito
function agregarAlCarrito(producto) {
    const index = carrito.findIndex(el => el.id === producto.id);
    if (index === -1) {
        carrito.push(producto);
    } else {
        carrito[index].cantidad++;
    }
    localStorage.setItem("carrito", JSON.stringify(carrito));
    armarCarrito(); // Actualizar la vista del carrito
}

// Función para mostrar los productos en el carrito
const contenedorCarrito = document.getElementById("btn-carrito");

function armarCarrito() {
    contenedorCarrito.innerHTML = ""; // Limpiar contenido previo
    let carritoRecuperado = JSON.parse(localStorage.getItem('carrito')) || [];
    if (carritoRecuperado.length === 0) {
        contenedorCarrito.innerHTML = "<p class='text-center'>No hay productos en el carrito</p>";
        return;
    }

    carritoRecuperado.forEach(producto => renderizarCarrito(producto));
}

/// Función para renderizar un producto en el carrito
function renderizarCarrito(producto) {
    const col = document.createElement("div");
    col.className = "col";

    const card = document.createElement("div");
    card.className = "card mb-3 text-center";
    card.style = "width: 18rem;";

    const cardBody = document.createElement("div");
    cardBody.className = "card-body";

    const title = document.createElement("h5");
    title.innerText = producto.nombre;
    title.className = "card-title";

    const price = document.createElement("p");
    price.innerText = `Precio: $${producto.precio}`;
    price.className = "card-text";

    const quantity = document.createElement("p");
    quantity.innerText = `Cantidad: ${producto.cantidad}`;
    quantity.className = "card-text";
 
    const btnRemove = document.createElement("button");
    btnRemove.innerText = "Eliminar";
    btnRemove.className = "btn btn-danger btn-sm";
    btnRemove.onclick = () => eliminarDelCarrito(producto.id);

    cardBody.appendChild(title);
    cardBody.appendChild(price);
    cardBody.appendChild(quantity);
    cardBody.appendChild(btnRemove);
    card.appendChild(cardBody);
    col.appendChild(card);
    contenedorCarrito.appendChild(col);
}

// Función para eliminar un producto del carrito
function eliminarDelCarrito(productID) {
    Swal.fire({
        title: "¿Estás seguro de que deseas eliminar éste producto?",
        text: "Esta acción no se puede deshacer.",
        showDenyButton: true,
        confirmButtonText: "Sí, eliminar",
        denyButtonText: "No, cancelar",
        icon: "warning"
    }).then(result => {
        if (result.isConfirmed) {
            carrito = carrito.filter(producto => producto.id !== productID);
            localStorage.setItem("carrito", JSON.stringify(carrito));
            armarCarrito();
            Swal.fire({
                title: "Producto eliminado",
                text: "El producto ha sido eliminado del carrito.",
                icon: "success",
                showConfirmButton: false,
                timer: 3000,
            });
        } else {
            Swal.fire({
                title: "Operación cancelada",
                text: "El producto sigue en el carrito.",
                icon: "info",
                showConfirmButton: false,
                timer: 2000,
            });
        }
    });
}

armarCarrito(); // Mostrar el carrito al cargar la página