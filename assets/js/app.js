import { generarMesas, renderMesas, cerrarModal } from "./modules/mesas.js";
import { state, saveState } from "./state.js";

const mesas = generarMesas();
renderMesas(mesas);

document.getElementById("btn-cerrar").addEventListener("click", cerrarModal);

document.getElementById("btn-iniciar").addEventListener("click", () => {
    const inputClientes = document.getElementById("num-clientes");

    state.numClientes = parseInt(inputClientes.value);

    saveState(); // 🔥 guardar

    window.location.href = "./views/pedido.html"; // 🔥 navegar
});