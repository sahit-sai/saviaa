// ==========================================================================
// SAVIAA ADMIN OPERATIONS DASHBOARD
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  initAdminDashboard();
});

function initAdminDashboard() {
  const panel = document.querySelector('.admin-grid');
  if (!panel) return; // Exit if not on Admin page

  renderAnalytics();
  renderOrdersTable();
  renderAppointmentsTable();
}

// 1. Render CSS based analytics bars
function renderAnalytics() {
  const orders = JSON.parse(localStorage.getItem(ORDERS_KEY) || '[]');
  const appointments = JSON.parse(localStorage.getItem(APPOINTMENTS_KEY) || '[]');

  // Total earnings calculation
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  
  // Custom stitching vs ready-made item counts
  let customCount = 0;
  let readyMadeCount = 0;
  orders.forEach(o => {
    o.items.forEach(item => {
      if (item.isCustom) customCount += item.quantity;
      else readyMadeCount += item.quantity;
    });
  });

  // Render text counters
  const revLabel = document.getElementById('analytics-revenue');
  const ordLabel = document.getElementById('analytics-orders');
  const aptLabel = document.getElementById('analytics-appointments');
  const customRatioLabel = document.getElementById('analytics-custom-ratio');

  if (revLabel) revLabel.textContent = `₹${totalRevenue.toLocaleString('en-IN')}`;
  if (ordLabel) ordLabel.textContent = orders.length;
  if (aptLabel) aptLabel.textContent = appointments.length;
  if (customRatioLabel) {
    const totalItems = customCount + readyMadeCount;
    const ratio = totalItems > 0 ? Math.round((customCount / totalItems) * 100) : 0;
    customRatioLabel.textContent = `${ratio}% Custom`;
  }

  // Draw simple Swiss-style CSS bar chart
  const barCustom = document.getElementById('chart-bar-custom');
  const barReady = document.getElementById('chart-bar-ready');
  const labelCustom = document.getElementById('chart-label-custom');
  const labelReady = document.getElementById('chart-label-ready');

  if (barCustom && barReady) {
    const maxVal = Math.max(customCount, readyMadeCount, 1);
    const customPercent = (customCount / maxVal) * 100;
    const readyPercent = (readyMadeCount / maxVal) * 100;

    barCustom.style.height = `${Math.max(customPercent, 10)}%`;
    barReady.style.height = `${Math.max(readyPercent, 10)}%`;
    
    if (labelCustom) labelCustom.textContent = `${customCount} Stitched`;
    if (labelReady) labelReady.textContent = `${readyMadeCount} Ready-made`;
  }
}

// 2. Render Orders Table in CRM
function renderOrdersTable() {
  const tableBody = document.getElementById('admin-orders-rows');
  if (!tableBody) return;

  const orders = JSON.parse(localStorage.getItem(ORDERS_KEY) || '[]');
  tableBody.innerHTML = '';

  if (orders.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="6" style="text-align: center;">No orders placed yet.</td></tr>`;
    return;
  }

  orders.forEach(o => {
    const itemsList = o.items.map(item => `${item.name} (${item.size}) x ${item.quantity}`).join('<br>');
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td style="font-family: monospace; font-weight: bold; color: var(--primary);">${o.id}</td>
      <td>
        <strong>${o.shippingAddress.name}</strong><br>
        <span style="font-size: 0.8rem; color: var(--text-muted);">${o.shippingAddress.phone}</span>
      </td>
      <td style="font-size: 0.85rem;">${itemsList}</td>
      <td><strong>₹${o.total.toLocaleString('en-IN')}</strong></td>
      <td>
        <select class="admin-status-select" data-id="${o.id}">
          <option value="Processing" ${o.status === 'Processing' ? 'selected' : ''}>Processing</option>
          <option value="Tailoring" ${o.status === 'Tailoring' ? 'selected' : ''}>Tailoring</option>
          <option value="Shipped" ${o.status === 'Shipped' ? 'selected' : ''}>Shipped</option>
          <option value="Delivered" ${o.status === 'Delivered' ? 'selected' : ''}>Delivered</option>
        </select>
      </td>
      <td>
        <button class="btn btn-outline btn-delete-order" data-id="${o.id}" style="padding: 4px 8px; font-size: 0.75rem; border-color: red; color: red;">
          Delete
        </button>
      </td>
    `;

    // Listen to status select changes
    const select = tr.querySelector('.admin-status-select');
    select.className = `admin-status-select status-${o.status.toLowerCase()}`;
    select.addEventListener('change', () => {
      updateOrderStatus(o.id, select.value);
      select.className = `admin-status-select status-${select.value.toLowerCase()}`;
    });

    // Delete order listener
    tr.querySelector('.btn-delete-order').addEventListener('click', () => {
      if (confirm(`Are you sure you want to delete order ${o.id}?`)) {
        deleteOrder(o.id);
      }
    });

    tableBody.appendChild(tr);
  });
}

function updateOrderStatus(orderId, newStatus) {
  const orders = JSON.parse(localStorage.getItem(ORDERS_KEY) || '[]');
  const idx = orders.findIndex(o => o.id === orderId);
  if (idx > -1) {
    orders[idx].status = newStatus;
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
    if (typeof showToast === 'function') {
      showToast(`Order ${orderId} updated to ${newStatus}`);
    }
    renderAnalytics(); // Recalculate if chart tracks statuses
  }
}

function deleteOrder(orderId) {
  const orders = JSON.parse(localStorage.getItem(ORDERS_KEY) || '[]');
  const filtered = orders.filter(o => o.id !== orderId);
  localStorage.setItem(ORDERS_KEY, JSON.stringify(filtered));
  renderOrdersTable();
  renderAnalytics();
  if (typeof showToast === 'function') {
    showToast(`Order ${orderId} deleted`);
  }
}

// 3. Render Stitching Appointments Table
function renderAppointmentsTable() {
  const tableBody = document.getElementById('admin-appointments-rows');
  if (!tableBody) return;

  const appointments = JSON.parse(localStorage.getItem(APPOINTMENTS_KEY) || '[]');
  tableBody.innerHTML = '';

  if (appointments.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="6" style="text-align: center;">No appointments scheduled yet.</td></tr>`;
    return;
  }

  appointments.forEach(apt => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td style="font-family: monospace; font-weight: bold; color: var(--accent);">${apt.id}</td>
      <td>
        <strong>${apt.name}</strong><br>
        <span style="font-size: 0.8rem; color: var(--text-muted);">${apt.phone}</span>
      </td>
      <td>${apt.service}</td>
      <td>${apt.date}<br><span style="font-size: 0.8rem; color: var(--text-muted);">${apt.slot}</span></td>
      <td><span style="font-size: 0.8rem;">${apt.address}</span></td>
      <td>
        <button class="btn btn-outline btn-cancel-apt" data-id="${apt.id}" style="padding: 4px 8px; font-size: 0.75rem; border-color: red; color: red;">
          Cancel
        </button>
      </td>
    `;

    tr.querySelector('.btn-cancel-apt').addEventListener('click', () => {
      if (confirm(`Are you sure you want to cancel appointment ${apt.id}?`)) {
        cancelAppointment(apt.id);
      }
    });

    tableBody.appendChild(tr);
  });
}

function cancelAppointment(aptId) {
  const appointments = JSON.parse(localStorage.getItem(APPOINTMENTS_KEY) || '[]');
  const filtered = appointments.filter(a => a.id !== aptId);
  localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(filtered));
  renderAppointmentsTable();
  renderAnalytics();
  if (typeof showToast === 'function') {
    showToast(`Appointment ${aptId} cancelled`);
  }
}
