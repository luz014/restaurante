import { generarFactura } from "./factura.js";
import { state, saveState, resetState } from "../state.js";

// Referencias
const lista = document.getElementById("lista-pedido");
const subtotalSpan = document.getElementById("subtotal");
const totalSpan = document.getElementById("total");
const inputPropina = document.getElementById("propina");
const metodoPago = document.getElementById("metodo-pago");

// Mostrar pedido
function renderResumen() {
    lista.innerHTML = "";

    state.pedido.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item.nombre} - $${item.precio}`;
        lista.appendChild(li);
    });

    subtotalSpan.textContent = state.total;
}

// Calcular total con propina
function calcularTotal() {
    const porcentaje = parseFloat(inputPropina.value) || 0;

    state.propina = porcentaje;

    const totalFinal = state.total + (state.total * porcentaje / 100);

    totalSpan.textContent = totalFinal.toFixed(2);
}

// Eventos
inputPropina.addEventListener("input", calcularTotal);

document.getElementById("btn-finalizar").addEventListener("click", () => {

    const metodo = metodoPago.value;

    if (!metodo) {
        alert("Selecciona un método de pago ❌");
        return;
    }

    state.metodoPago = metodo;

    // Generar PDF
    generarFactura(state);

    alert("Factura generada correctamente 📄");

    // 🔥 USAR RESET CORRECTO
    resetState();

    // Redirigir
    window.location.href = "../index.html";
});

// Inicializar
renderResumen();
calcularTotal();

console.log(state);