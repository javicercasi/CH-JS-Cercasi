// -------------------------------------INDEX-----------------------------------------------
const container = document.getElementById("categorias");

const arrayInicio = ["Celulares", "Climatizacion", "Hogar", "Computacion", "Smart TVs", "Lavarropas"];

function crearCardInicio(producto) {
    const col = document.createElement("div");
    col.className = "col";

    const card = document.createElement("div");
    card.className = "card mb-3 card-inicio";
    card.style = "max-width: 18rem;"

    const img = document.createElement("img");
    img.src = "./images/page-index/"+producto+".jpeg";
    img.className = "card-img-top";

    const cardBody = document.createElement("div");
    cardBody.className = "card-body text-center";

    const title = document.createElement("p");
    title.innerText = producto;
    title.className = "card-text";

    col.appendChild(card);
    card.appendChild(img);
    card.appendChild(cardBody);
    cardBody.appendChild(title);
    container.appendChild(col);
};

// Recorrer el array de elementos y crear una card por cada uno:
arrayInicio.forEach(el => crearCardInicio(el));
