import { state, saveState } from "../state.js";
import { menu } from "./menu.js";
// Mostrar info
document.getElementById("mesa-info").textContent = state.mesaSeleccionada || "-";
document.getElementById("clientes-info").textContent = state.numClientes || "-";

// Renderizar menú
function renderMenu(tipo, contenedorId) {
    const container = document.getElementById(contenedorId);
    if (!container) return;

    container.innerHTML = "";

    menu[tipo].forEach(item => {
        const div = document.createElement("div");
        div.classList.add("item");

       div.innerHTML = `
        <img src="${item.imagen}" alt="${item.nombre}" class="item-img">
        <h4>${item.nombre}</h4>
        <p>$${item.precio}</p>
        <button>Agregar</button>
        `;

        div.querySelector("button").addEventListener("click", () => {
            agregarPedido(item);
        });

        container.appendChild(div);
    });
}

// Agregar al pedido
function agregarPedido(item) {
    if (!state.pedido) state.pedido = [];

    state.pedido.push(item);
    actualizarResumen();
}

// Actualizar resumen
function actualizarResumen() {
    const lista = document.getElementById("lista-pedido");
    const totalSpan = document.getElementById("total");

    if (!lista || !totalSpan) return;

    lista.innerHTML = "";

    let total = 0;

    state.pedido.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item.nombre} - $${item.precio}`;
        lista.appendChild(li);

        total += item.precio;
    });

    state.total = total;
    totalSpan.textContent = total;
}

// Botón continuar
document.getElementById("btn-continuar").addEventListener("click", () => {

    if (!state.pedido || state.pedido.length === 0) {
        alert("Debes agregar un pedido ❌");
        return;
    }

    const tienePlato = state.pedido.some(p => p.tipo === "plato");
    const tieneBebida = state.pedido.some(p => p.tipo === "bebida");

    if (!tienePlato || !tieneBebida) {
        alert("Debe incluir al menos un plato principal y una bebida ❌");
        return;
    }

    saveState();
    window.location.href = "pago.html";
});

// Inicializar
renderMenu("platos", "platos");
renderMenu("bebidas", "bebidas");
renderMenu("postres", "postres");