const services = [
    { 
        name: 'Classic Haircut', 
        price: '25DH', 
        description: 'Traditional cut with scissors and razor finish' 
    },
    { 
        name: 'Beard Trim', 
        price: '15DH', 
        description: 'Precise beard shaping and styling' 
    },
    { 
        name: 'Hot Towel Shave', 
        price: '35DH', 
        description: 'Luxurious traditional hot towel shave' 
    }
];

const servicesContainer = document.getElementById('services-container');
const bookingForm = document.getElementById('booking-form');
const serviceSelect = document.querySelector('select[name="service"]');
const bookingsContainer = document.getElementById('bookings-container');

function renderServices() {
    servicesContainer.innerHTML = services.map(service => `
        <div class="service-card">
            <h3>${service.name}</h3>
            <p>${service.description}</p>
            <span class="price">${service.price}</span>
        </div>
    `).join('');
}

function populateServiceSelect() {
    serviceSelect.innerHTML = `
        <option value="">Select Service</option>
        ${services.map(service => 
            `<option value="${service.name}">${service.name}</option>`
        ).join('')}
    `;
}

class BookingManager {
    constructor() {
        this.bookings = JSON.parse(localStorage.getItem('barbershopBookings') || '[]');
    }

    addBooking(booking) {
        booking.id = Date.now().toString();
        this.bookings.push(booking);
        this.saveBookings();
        this.renderBookings();
    }

    saveBookings() {
        localStorage.setItem('barbershopBookings', JSON.stringify(this.bookings));
    }

    renderBookings() {
        bookingsContainer.innerHTML = this.bookings.length === 0 
            ? '<li>No bookings yet</li>'
            : this.bookings.map(booking => `
                <li>
                    ${booking.name} - ${booking.service} 
                    on ${booking.date} at ${booking.time}
                </li>
            `).join('');
    }
}

// Initialize Booking Manager
const bookingManager = new BookingManager();

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    renderServices();
    populateServiceSelect();
    bookingManager.renderBookings();
});

bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    

    const formData = new FormData(bookingForm);
    const booking = Object.fromEntries(formData.entries());
    

    bookingManager.addBooking(booking);

    bookingForm.reset();
    alert('Booking Successful!');
});
