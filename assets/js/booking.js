// ==========================================================================
// SAVIAA BOOKING & SCHEDULER SYSTEM
// ==========================================================================

const APPOINTMENTS_KEY = 'saviaa_appointments';

// Initial state
let selectedDate = null;
let selectedSlot = null;
let selectedService = 'Store Visit'; // Store Visit, Home Measurement, Pickup, Video

const timeSlots = [
  { time: '10:00 AM - 12:00 PM', available: true },
  { time: '12:00 PM - 02:00 PM', available: true },
  { time: '02:00 PM - 04:00 PM', available: false }, // Mock fully booked
  { time: '04:00 PM - 06:00 PM', available: true },
  { time: '06:00 PM - 08:00 PM', available: true }
];

document.addEventListener('DOMContentLoaded', () => {
  initBooking();
});

function initBooking() {
  const calendarGrid = document.querySelector('.calendar-grid');
  if (!calendarGrid) return; // Exit if not on booking page

  setupServiceToggle();
  renderCalendar();
  setupFormSubmit();
}

// 1. Service Type Selector radio/button toggle
function setupServiceToggle() {
  const serviceCards = document.querySelectorAll('.service-card');
  const addressGroup = document.getElementById('pickup-address-group');
  const serviceChargeLabel = document.getElementById('service-charge-amount');
  const serviceChargeRow = document.getElementById('service-charge-row');

  serviceCards.forEach(card => {
    card.addEventListener('click', () => {
      serviceCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      
      selectedService = card.dataset.service;

      // Update UI elements based on selection
      if (selectedService === 'Home Measurement' || selectedService === 'Pickup Service' || selectedService === 'Alteration Request') {
        if (addressGroup) addressGroup.style.display = 'block';
        if (serviceChargeRow) serviceChargeRow.style.display = 'flex';
        if (serviceChargeLabel) serviceChargeLabel.textContent = selectedService === 'Pickup Service' ? '₹100' : '₹150';
      } else {
        if (addressGroup) addressGroup.style.display = 'none';
        if (serviceChargeRow) serviceChargeRow.style.display = 'none';
      }
    });
  });
}

// 2. Render calendar showing next 14 days dynamically
function renderCalendar() {
  const calendarGrid = document.querySelector('.calendar-grid');
  const monthLabel = document.getElementById('calendar-month-year');
  if (!calendarGrid || !monthLabel) return;

  const today = new Date();
  
  // Set Month Title
  monthLabel.textContent = today.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' });

  // Clear previous grid elements (keeping headers)
  const headerDays = Array.from(calendarGrid.querySelectorAll('.calendar-day-name'));
  calendarGrid.innerHTML = '';
  headerDays.forEach(el => calendarGrid.appendChild(el));

  // Render preceding padding empty spaces for alignment
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const startOffset = firstDayOfMonth.getDay(); // 0 (Sun) to 6 (Sat)
  
  // For simplicity, we just list the next 14 bookable days from tomorrow
  for (let i = 1; i <= 14; i++) {
    const bookDate = new Date();
    bookDate.setDate(today.getDate() + i);

    // Skip Sundays
    const isSunday = bookDate.getDay() === 0;

    const dayBtn = document.createElement('div');
    dayBtn.className = 'calendar-day';
    if (isSunday) {
      dayBtn.classList.add('disabled');
      dayBtn.title = 'Closed on Sundays';
    }
    
    dayBtn.textContent = bookDate.getDate();
    dayBtn.dataset.date = bookDate.toISOString();

    if (!isSunday) {
      dayBtn.addEventListener('click', () => {
        document.querySelectorAll('.calendar-day').forEach(d => d.classList.remove('active'));
        dayBtn.classList.add('active');
        selectedDate = new Date(dayBtn.dataset.date);
        
        // Show slot selection section
        renderSlots();
      });
    }

    calendarGrid.appendChild(dayBtn);
  }
}

// 3. Render time slot button grid once date is clicked
function renderSlots() {
  const container = document.getElementById('slots-container-section');
  const grid = document.querySelector('.slots-grid');
  if (!container || !grid) return;

  container.style.display = 'block';
  grid.innerHTML = '';

  timeSlots.forEach(slot => {
    const slotBtn = document.createElement('div');
    slotBtn.className = 'slot-btn';
    if (!slot.available) {
      slotBtn.classList.add('disabled');
      slotBtn.textContent = `${slot.time} (Full)`;
    } else {
      slotBtn.textContent = slot.time;
      slotBtn.addEventListener('click', () => {
        document.querySelectorAll('.slot-btn').forEach(b => b.classList.remove('active'));
        slotBtn.classList.add('active');
        selectedSlot = slot.time;
      });
    }
    grid.appendChild(slotBtn);
  });
}

// 4. Handle Stitching Request form submit (WhatsApp link creator & localStorage logs)
function setupFormSubmit() {
  const form = document.getElementById('booking-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!selectedDate) {
      alert('Please select a date from the calendar.');
      return;
    }
    if (!selectedSlot) {
      alert('Please choose a time slot.');
      return;
    }

    const name = document.getElementById('client-name').value;
    const phone = document.getElementById('client-phone').value;
    const email = document.getElementById('client-email').value;
    const street = document.getElementById('client-street')?.value || '';
    const landmark = document.getElementById('client-landmark')?.value || '';
    const isExpress = document.getElementById('express-stitching-checkbox')?.checked || false;

    const aptId = 'SV-APT-' + Math.floor(10000 + Math.random() * 90000);
    const dateFormatted = selectedDate.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' });

    // Store in localStorage
    const appointments = JSON.parse(localStorage.getItem(APPOINTMENTS_KEY) || '[]');
    const newApt = {
      id: aptId,
      name: name,
      phone: phone,
      email: email,
      service: selectedService,
      date: dateFormatted,
      slot: selectedSlot,
      address: selectedService.includes('Home') || selectedService.includes('Pickup') || selectedService.includes('Alteration') ? `${street}, Ref: ${landmark}` : 'Store Visit',
      status: 'Scheduled',
      express: isExpress ? '48-Hour Tailoring Surcharge' : 'Standard Delivery',
      createdAt: new Date().toLocaleDateString('en-IN')
    };

    appointments.unshift(newApt);
    localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(appointments));

    // Generate WhatsApp URL
    const message = `Namaste SAVIAA!\n\nI want to book an appointment.\n\n📝 Details:\n- *Appointment ID*: ${aptId}\n- *Service*: ${selectedService}\n- *Date*: ${dateFormatted}\n- *Time Slot*: ${selectedSlot}\n- *Delivery Speed*: ${isExpress ? '🚀 Express 48-Hour' : 'Standard'}\n\n👤 Customer Details:\n- *Name*: ${name}\n- *Phone*: ${phone}\n- *Email*: ${email}\n${street ? `- *Address*: ${street} (${landmark})` : ''}\n\nPlease confirm my booking. Thank you!`;
    const waPhone = '917842410691';
    const waUrl = `https://api.whatsapp.com/send?phone=${waPhone}&text=${encodeURIComponent(message)}`;

    if (typeof showToast === 'function') {
      showToast('Stitching booking request saved! Redirecting to WhatsApp...', 'success');
    }

    setTimeout(() => {
      window.open(waUrl, '_blank');
      window.location.href = 'dashboard.html';
    }, 1500);
  });
}
