// assets/js/modules/mesas.js

import { state } from "../state.js";

export function generarMesas() {
    const mesas = [];

    for (let i = 1; i <= 30; i++) {
        mesas.push({
            id: i,
            estado: Math.random() < 0.3 ? "ocupada" : "libre" // 30% ocupadas
        });
    }

    return mesas;
}

export function renderMesas(mesas) {
    const container = document.getElementById("mesas-container");
    container.innerHTML = "";

    mesas.forEach(mesa => {
        const div = document.createElement("div");
        div.classList.add("mesa", mesa.estado);
        div.textContent = `Mesa ${mesa.id}`;

        // Evento click
        div.addEventListener("click", () => {
            if (mesa.estado === "ocupada") {
                alert("Esta mesa ya está ocupada ❌");
                return;
            }

            abrirModal(mesa.id);
        });

        container.appendChild(div);
    });
}

function abrirModal(idMesa) {
    const modal = document.getElementById("modal");
    const spanMesa = document.getElementById("mesa-numero");

    // 🔥 Guardar en estado
    state.mesaSeleccionada = idMesa;

    spanMesa.textContent = idMesa;
    modal.classList.remove("hidden");
}

export function cerrarModal() {
    const modal = document.getElementById("modal");
    modal.classList.add("hidden");
}