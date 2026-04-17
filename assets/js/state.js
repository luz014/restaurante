// assets/js/state.js

const defaultState = {
    mesaSeleccionada: null,
    numClientes: 1,
    pedido: [],
    total: 0,
    propina: 0,
    metodoPago: null
};

// Cargar desde localStorage o usar default
export let state = JSON.parse(localStorage.getItem("state")) || defaultState;

// Guardar estado
export function saveState() {
    localStorage.setItem("state", JSON.stringify(state));
}

// Reset
export function resetState() {
    state = { ...defaultState };
    saveState();
}