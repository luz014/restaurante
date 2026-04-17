// assets/js/modules/factura.js
import { state } from "../state.js";


export function generarFactura(state) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    let y = 10;

    // Título
    doc.setFontSize(18);
    doc.text("Factura - Restaurante", 10, y);

    y += 10;

    // Info general
    doc.setFontSize(12);
    doc.text(`Mesa: ${state.mesaSeleccionada}`, 10, y);
    y += 7;
    doc.text(`Clientes: ${state.numClientes}`, 10, y);
    y += 10;

    // Lista de productos
    doc.text("Detalle:", 10, y);
    y += 7;

    state.pedido.forEach(item => {
        doc.text(`${item.nombre} - $${item.precio}`, 10, y);
        y += 6;
    });

    y += 5;

    // Totales
    doc.text(`Subtotal: $${state.total}`, 10, y);
    y += 7;

    const propinaMonto = state.total * (state.propina / 100);
    doc.text(`Propina (${state.propina}%): $${propinaMonto.toFixed(2)}`, 10, y);
    y += 7;

    const totalFinal = state.total + propinaMonto;
    doc.text(`Total: $${totalFinal.toFixed(2)}`, 10, y);
    y += 10;

    // Método de pago
    doc.text(`Método de pago: ${state.metodoPago}`, 10, y);

    // Guardar PDF
    doc.save(`factura_mesa_${state.mesaSeleccionada}.pdf`);
}
