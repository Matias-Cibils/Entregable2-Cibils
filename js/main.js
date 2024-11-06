// Precios por tipo de habitación
const roomPrices = {
    simple: 50,
    doble: 80,
    suite: 120
};

// Formulario y resumen
const form = document.getElementById('reservationForm');
const summary = document.getElementById('reservationSummary');

// Array de reservas
let reservations = JSON.parse(localStorage.getItem('reservations')) || [];

// Manejo del formulario
form.addEventListener('submit', function (e) {
    e.preventDefault();

// Capturar valores del formulario
const checkIn = new Date(document.getElementById('checkIn').value + "T00:00:00");
const checkOut = new Date(document.getElementById('checkOut').value + "T00:00:00");
const roomType = document.getElementById('roomType').value;
const guests = parseInt(document.getElementById('guests').value);
const roomTypes = reservations.map(reservation => reservation.roomType);

// Validar fechas
if (checkOut <= checkIn) {
    summary.innerHTML = `<p style="color:red;">La fecha de salida debe ser posterior a la fecha de entrada.</p>`;
    return;
}

// Calcular días y costo total
const days = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
const totalPrice = days * roomPrices[roomType];

// Crear objeto de reserva
const reservation = {
    checkIn: checkIn.toLocaleDateString(),
    checkOut: checkOut.toLocaleDateString(),
    roomType,
    guests,
    totalPrice
};

// Agregar a array y guardar en storage
reservations.push(reservation);
localStorage.setItem('reservations', JSON.stringify(reservations));

// Mostrar resumen
displayReservationSummary(reservation);
});

// Función para mostrar el resumen de la reserva
function displayReservationSummary(reservation) {
    summary.innerHTML = `
        <h2>Resumen de Reserva</h2>
        <p><strong>Fecha de Entrada:</strong> ${reservation.checkIn}</p>
        <p><strong>Fecha de Salida:</strong> ${reservation.checkOut}</p>
        <p><strong>Tipo de Habitación:</strong> ${reservation.roomType}</p>
        <p><strong>Número de Huéspedes:</strong> ${reservation.guests}</p>
        <p><strong>Costo Total:</strong> $${reservation.totalPrice}</p>
    `;
}

