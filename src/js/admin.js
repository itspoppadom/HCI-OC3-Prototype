document.addEventListener('DOMContentLoaded', function() {
  // Check if user is admin
  const userRole = sessionStorage.getItem('userRole');
  if (userRole !== 'Administrator') {
    window.location.href = '../html/index.html';
    return;
  }
  
  // Users data (in a real application, this would come from a backend)
  let users = [
    {
      id: 1,
      username: 'receptionist',
      fullName: 'Rebecca Smith',
      role: 'Receptionist',
      email: 'reception@healthcare.com',
      password: 'pass123',
      status: 'Active'
    },
    {
      id: 2,
      username: 'doctor',
      fullName: 'Dr. James Wilson',
      role: 'Healthcare Provider',
      email: 'doctor@healthcare.com',
      password: 'pass123',
      status: 'Active'
    },
    {
      id: 3,
      username: 'claims',
      fullName: 'Claire Johnson',
      role: 'Claims Examiner',
      email: 'claims@healthcare.com',
      password: 'pass123',
      status: 'Active'
    },
    {
      id: 4,
      username: 'admin',
      fullName: 'Alex Thompson',
      role: 'Administrator',
      email: 'admin@healthcare.com',
      password: 'pass123',
      status: 'Active'
    },
    {
      id: 5,
      username: 'jhopkins',
      fullName: 'John Hopkins',
      role: 'Healthcare Provider',
      email: 'jhopkins@healthcare.com',
      password: 'pass123',
      status: 'Active'
    },
    {
      id: 6,
      username: 'msmith',
      fullName: 'Mary Smith',
      role: 'Receptionist',
      email: 'msmith@healthcare.com',
      password: 'pass123',
      status: 'Inactive'
    }
  ];
  
  // Elements
  const usersTable = document.getElementById('users-table');
  const userSearch = document.getElementById('user-search');
  const addUserBtn = document.getElementById('add-user-btn');
  const userModal = document.getElementById('user-modal');
  const userForm = document.getElementById('user-form');
  const userModalClose = document.querySelector('.user-modal-close');
  const confirmDeleteModal = document.getElementById('confirm-delete-modal');
  const confirmDeleteBtn = document.getElementById('confirm-delete-btn');
  const cancelDeleteBtn = document.getElementById('cancel-delete-btn');
  const savePermissionsBtn = document.getElementById('save-permissions-btn');
  const manualResetForm = document.getElementById('manual-reset-form');
  const saveSettingsBtn = document.getElementById('save-settings-btn');
  const backupNowBtn = document.getElementById('backup-now-btn');
  const scheduleMaintBtn = document.getElementById('schedule-maintenance-btn');
  
  // Current user being edited
  let currentUserId = null;
  let userToDelete = null;
  
  // Initialize the users table
  function renderUsersTable(filteredUsers = users) {
    const tbody = usersTable.querySelector('tbody');
    tbody.innerHTML = '';
    
    filteredUsers.forEach(user => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${user.username}</td>
        <td>${user.fullName}</td>
        <td>${user.role}</td>
        <td>${user.email}</td>
        <td><span class="status-badge ${user.status.toLowerCase()}">${user.status}</span></td>
        <td>
          <button class="action-btn edit-user" data-id="${user.id}">Edit</button>
          <button class="action-btn delete-user" data-id="${user.id}">Delete</button>
        </td>
      `;
      tbody.appendChild(tr);
    });
    
    // Add event listeners to new buttons
    document.querySelectorAll('.edit-user').forEach(btn => {
      btn.addEventListener('click', handleEditUser);
    });
    
    document.querySelectorAll('.delete-user').forEach(btn => {
      btn.addEventListener('click', handleDeleteUser);
    });
  }
  
  // Handle search functionality
  userSearch.addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    const filteredUsers = users.filter(user => 
      user.username.toLowerCase().includes(searchTerm) ||
      user.fullName.toLowerCase().includes(searchTerm) ||
      user.email.toLowerCase().includes(searchTerm) ||
      user.role.toLowerCase().includes(searchTerm)
    );
    renderUsersTable(filteredUsers);
  });
  
  // Open modal to add a new user
  addUserBtn.addEventListener('click', function() {
    // Reset the form and prepare for a new user
    userForm.reset();
    document.getElementById('user-modal-title').textContent = 'Add New User';
    currentUserId = null;
    userModal.style.display = 'flex';
  });
  
  // Close the user modal
  userModalClose.addEventListener('click', function() {
    userModal.style.display = 'none';
  });
  
  // Handle clicking outside the modal
  window.addEventListener('click', function(e) {
    if (e.target === userModal) {
      userModal.style.display = 'none';
    }
    if (e.target === confirmDeleteModal) {
      confirmDeleteModal.style.display = 'none';
    }
  });
  
  // Handle edit user
  function handleEditUser(e) {
    const userId = parseInt(e.target.dataset.id);
    const user = users.find(u => u.id === userId);
    
    if (user) {
      // Fill the form with user data
      document.getElementById('user-username').value = user.username;
      document.getElementById('user-fullname').value = user.fullName;
      document.getElementById('user-role').value = user.role;
      document.getElementById('user-email').value = user.email;
      document.getElementById('user-password').value = user.password;
      document.getElementById('user-status').value = user.status;
      
      // Update the modal title and store current user ID
      document.getElementById('user-modal-title').textContent = 'Edit User';
      currentUserId = userId;
      
      // Show the modal
      userModal.style.display = 'flex';
    }
  }
  
  // Handle delete user
  function handleDeleteUser(e) {
    const userId = parseInt(e.target.dataset.id);
    userToDelete = userId;
    confirmDeleteModal.style.display = 'flex';
  }
  
  // Confirm delete user
  confirmDeleteBtn.addEventListener('click', function() {
    if (userToDelete) {
      users = users.filter(user => user.id !== userToDelete);
      renderUsersTable();
      confirmDeleteModal.style.display = 'none';
      userToDelete = null;
      
      // Show success message
      showNotification('User deleted successfully', 'success');
    }
  });
  
  // Cancel delete user
  cancelDeleteBtn.addEventListener('click', function() {
    confirmDeleteModal.style.display = 'none';
    userToDelete = null;
  });
  
  // Handle user form submission
  userForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('user-username').value;
    const fullName = document.getElementById('user-fullname').value;
    const role = document.getElementById('user-role').value;
    const email = document.getElementById('user-email').value;
    const password = document.getElementById('user-password').value;
    const status = document.getElementById('user-status').value;
    
    if (currentUserId) {
      // Editing existing user
      const userIndex = users.findIndex(u => u.id === currentUserId);
      if (userIndex !== -1) {
        users[userIndex] = {
          ...users[userIndex],
          username,
          fullName,
          role,
          email,
          password,
          status
        };
        
        showNotification('User updated successfully', 'success');
      }
    } else {
      // Adding new user
      const newId = Math.max(...users.map(u => u.id)) + 1;
      users.push({
        id: newId,
        username,
        fullName,
        role,
        email,
        password,
        status
      });
      
      showNotification('User added successfully', 'success');
    }
    
    // Update the table and close the modal
    renderUsersTable();
    userModal.style.display = 'none';
  });
  
  // Handle saving permissions
  savePermissionsBtn.addEventListener('click', function() {
    // In a real app, this would save to the backend
    showNotification('Permissions saved successfully', 'success');
  });
  
  // Handle manual password reset
  manualResetForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('reset-username').value;
    const password = document.getElementById('reset-password').value;
    const confirmPassword = document.getElementById('reset-confirm-password').value;
    
    if (password !== confirmPassword) {
      showNotification('Passwords do not match', 'error');
      return;
    }
    
    const userIndex = users.findIndex(u => u.username === username);
    if (userIndex === -1) {
      showNotification('User not found', 'error');
      return;
    }
    
    users[userIndex].password = password;
    showNotification(`Password reset for ${username}`, 'success');
    manualResetForm.reset();
  });
  
  // Handle approve/deny password reset
  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('approve-reset-btn')) {
      const row = e.target.closest('tr');
      const username = row.cells[0].textContent;
      
      // In a real app, this would prompt for a new password
      showNotification(`Password reset approved for ${username}`, 'success');
      row.remove();
    }
    
    if (e.target.classList.contains('deny-reset-btn')) {
      const row = e.target.closest('tr');
      const username = row.cells[0].textContent;
      
      showNotification(`Password reset denied for ${username}`, 'info');
      row.remove();
    }
  });
  
  // Handle save settings
  saveSettingsBtn.addEventListener('click', function() {
    showNotification('System settings saved successfully', 'success');
  });
  
  // Handle backup now
  backupNowBtn.addEventListener('click', function() {
    showNotification('System backup started', 'info');
    
    // Simulate backup completion after 3 seconds
    setTimeout(() => {
      showNotification('System backup completed', 'success');
    }, 3000);
  });
  
  // Handle schedule maintenance
  scheduleMaintBtn.addEventListener('click', function() {
    const now = new Date();
    const nextSaturday = new Date();
    nextSaturday.setDate(now.getDate() + (6 - now.getDay() + 7) % 7);
    nextSaturday.setHours(2, 0, 0, 0);
    
    showNotification(`Maintenance scheduled for ${nextSaturday.toLocaleString()}`, 'info');
  });
  
  // Show a notification
  function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Add close button
    const closeBtn = document.createElement('span');
    closeBtn.className = 'notification-close';
    closeBtn.textContent = '×';
    closeBtn.addEventListener('click', () => {
      notification.remove();
    });
    
    notification.appendChild(closeBtn);
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      notification.remove();
    }, 5000);
  }
  
  // Initialize
  renderUsersTable();
});