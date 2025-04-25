document.addEventListener("DOMContentLoaded", function () {
  // Check if user is receptionist
  const userRole = sessionStorage.getItem("userRole");
  if (userRole !== "Receptionist" && userRole !== "Administrator") {
    window.location.href = "../html/index.html";
    return;
  }

  // Mock data for appointments
  let appointments = [
    {
      id: 1,
      patientId: "P-10001",
      patientName: "John Smith",
      date: "2023-11-07",
      time: "09:00",
      doctor: "Dr. Martinez",
      reason: "Annual checkup",
      notes:
        "Patient's first annual checkup since registering with the clinic.",
      status: "checked-in",
    },
    {
      id: 2,
      patientId: "P-10002",
      patientName: "Mary Johnson",
      date: "2023-11-07",
      time: "09:30",
      doctor: "Dr. Williams",
      reason: "Follow-up appointment",
      notes: "Follow-up after prescription change",
      status: "scheduled",
    },
    {
      id: 3,
      patientId: "P-10003",
      patientName: "Robert Brown",
      date: "2023-11-07",
      time: "10:00",
      doctor: "Dr. Martinez",
      reason: "Skin rash examination",
      notes: "Patient reported rash on arms developing over past week",
      status: "scheduled",
    },
  ];

  // Mock data for patients
  let patients = [
    {
      id: "P-10001",
      firstName: "John",
      lastName: "Smith",
      dob: "1980-05-12",
      gender: "male",
      phone: "555-123-4567",
      email: "john.smith@email.com",
      address: "123 Main St, Anytown",
      doctor: "Dr. Martinez",
      insurance: "HealthPlus",
      medicalConditions: "Hypertension, Type 2 Diabetes",
      allergies: "Penicillin, Peanuts",
      medications: "Lisinopril 10mg daily, Metformin 500mg twice daily",
      lastVisit: "2023-11-06",
    },
    {
      id: "P-10002",
      firstName: "Mary",
      lastName: "Johnson",
      dob: "1975-08-23",
      gender: "female",
      phone: "555-987-6543",
      email: "mary.johnson@email.com",
      address: "456 Oak Ave, Anytown",
      doctor: "Dr. Williams",
      insurance: "MediCare",
      medicalConditions: "Asthma",
      allergies: "Dust, Pollen",
      medications: "Albuterol inhaler as needed",
      lastVisit: "2023-11-06",
    },
    {
      id: "P-10003",
      firstName: "Robert",
      lastName: "Brown",
      dob: "1992-11-30",
      gender: "male",
      phone: "555-234-5678",
      email: "robert.brown@email.com",
      address: "789 Pine Ln, Anytown",
      doctor: "Dr. Martinez",
      insurance: "BlueCross",
      medicalConditions: "None",
      allergies: "None",
      medications: "None",
      lastVisit: "2023-11-07",
    },
    {
      id: "P-10004",
      firstName: "Sarah",
      lastName: "Davis",
      dob: "1988-03-15",
      gender: "female",
      phone: "555-345-6789",
      email: "sarah.davis@email.com",
      address: "101 Elm St, Anytown",
      doctor: "Dr. Johnson",
      insurance: "HealthPlus",
      medicalConditions: "Migraines",
      allergies: "Sulfa drugs",
      medications: "Sumatriptan as needed",
      lastVisit: "2023-10-25",
    },
    {
      id: "P-10005",
      firstName: "Michael",
      lastName: "Wilson",
      dob: "1965-07-09",
      gender: "male",
      phone: "555-456-7890",
      email: "michael.wilson@email.com",
      address: "202 Birch Dr, Anytown",
      doctor: "Dr. Davis",
      insurance: "Medicare",
      medicalConditions: "Arthritis, High cholesterol",
      allergies: "None",
      medications: "Atorvastatin 20mg daily, Ibuprofen as needed",
      lastVisit: "2023-10-18",
    },
  ];

  // Mock data for doctors
  const doctors = [
    {
      name: "Dr. Martinez",
      specialty: "General Medicine",
      status: "available",
    },
    {
      name: "Dr. Williams",
      specialty: "Pediatrics",
      status: "available",
    },
    {
      name: "Dr. Johnson",
      specialty: "Cardiology",
      status: "unavailable",
    },
    {
      name: "Dr. Davis",
      specialty: "Orthopedics",
      status: "available",
    },
  ];

  // Elements
  const patientSearch = document.getElementById("patient-search");
  const patientsTable = document.getElementById("patients-table");
  const addPatientBtn = document.getElementById("add-patient-btn");
  const patientModal = document.getElementById("patient-modal");
  const viewPatientModal = document.getElementById("view-patient-modal");
  const patientForm = document.getElementById("patient-form");
  const patientModalClose = document.querySelector(".patient-modal-close");
  const viewPatientModalClose = document.querySelector(
    ".view-patient-modal-close"
  );
  const newAppointmentBtn = document.getElementById("new-appointment-btn");
  const appointmentModal = document.getElementById("appointment-modal");
  const appointmentForm = document.getElementById("appointment-form");
  const appointmentModalClose = document.querySelector(
    ".appointment-modal-close"
  );
  const viewAppointmentModal = document.getElementById(
    "view-appointment-modal"
  );
  const viewAppointmentModalClose = document.querySelector(
    ".view-appointment-modal-close"
  );
  const doctorScheduleModal = document.getElementById("doctor-schedule-modal");
  const doctorScheduleModalClose = document.querySelector(
    ".doctor-schedule-modal-close"
  );
  const patientCheckInForm = document.getElementById("patient-check-in-form");

  // Current IDs being edited/viewed
  let currentPatientId = null;
  let currentAppointmentId = null;
  let currentDoctorName = null;

  // Set up tab navigation in patient view
  document.querySelectorAll(".tab-btn").forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all buttons and tabs
      document.querySelectorAll(".tab-btn").forEach((btn) => {
        btn.classList.remove("active");
      });
      document.querySelectorAll(".tab-content").forEach((tab) => {
        tab.classList.remove("active");
      });

      // Add active class to clicked button and corresponding tab
      this.classList.add("active");
      const tabId = this.getAttribute("data-tab") + "-tab";
      document.getElementById(tabId).classList.add("active");
    });
  });

  // Handle patient search
  if (patientSearch) {
    patientSearch.addEventListener("input", function () {
      const searchTerm = this.value.toLowerCase();
      const filteredPatients = patients.filter(
        (patient) =>
          patient.firstName.toLowerCase().includes(searchTerm) ||
          patient.lastName.toLowerCase().includes(searchTerm) ||
          patient.id.toLowerCase().includes(searchTerm) ||
          `${patient.firstName} ${patient.lastName}`
            .toLowerCase()
            .includes(searchTerm)
      );

      renderPatientsTable(filteredPatients);
    });
  }

  // Open patient modal to add new patient
  if (addPatientBtn) {
    addPatientBtn.addEventListener("click", function () {
      patientForm.reset();
      document.getElementById("patient-modal-title").textContent =
        "Add New Patient";
      currentPatientId = null;
      patientModal.style.display = "flex";
    });
  }

  // Close patient modal
  if (patientModalClose) {
    patientModalClose.addEventListener("click", function () {
      patientModal.style.display = "none";
    });
  }

  // Close view patient modal
  if (viewPatientModalClose) {
    viewPatientModalClose.addEventListener("click", function () {
      viewPatientModal.style.display = "none";
    });
  }

  // Open appointment modal
  if (newAppointmentBtn) {
    newAppointmentBtn.addEventListener("click", function () {
      appointmentForm.reset();
      document.getElementById("appointment-modal-title").textContent =
        "Schedule New Appointment";
      currentAppointmentId = null;
      appointmentModal.style.display = "flex";
    });
  }

  // Close appointment modal
  if (appointmentModalClose) {
    appointmentModalClose.addEventListener("click", function () {
      appointmentModal.style.display = "none";
    });
  }

  // Close view appointment modal
  if (viewAppointmentModalClose) {
    viewAppointmentModalClose.addEventListener("click", function () {
      viewAppointmentModal.style.display = "none";
    });
  }

  // Close doctor schedule modal
  if (doctorScheduleModalClose) {
    doctorScheduleModalClose.addEventListener("click", function () {
      doctorScheduleModal.style.display = "none";
    });
  }

  // Handle clicking outside modals
  window.addEventListener("click", function (e) {
    if (e.target === patientModal) {
      patientModal.style.display = "none";
    }
    if (e.target === viewPatientModal) {
      viewPatientModal.style.display = "none";
    }
    if (e.target === appointmentModal) {
      appointmentModal.style.display = "none";
    }
    if (e.target === viewAppointmentModal) {
      viewAppointmentModal.style.display = "none";
    }
    if (e.target === doctorScheduleModal) {
      doctorScheduleModal.style.display = "none";
    }
  });

  // Render patients table
  function renderPatientsTable(patientsToRender = patients) {
    if (!patientsTable) return;

    const tbody = patientsTable.querySelector("tbody");
    tbody.innerHTML = "";

    patientsToRender.forEach((patient) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${patient.id}</td>
        <td>${patient.firstName} ${patient.lastName}</td>
        <td>${formatDate(patient.dob)}</td>
        <td>${formatDate(patient.lastVisit)}</td>
        <td>${patient.phone}</td>
        <td>${patient.doctor}</td>
        <td>
          <button class="action-btn view-patient-btn" data-id="${
            patient.id
          }">View</button>
          <button class="action-btn schedule-for-patient-btn" data-id="${
            patient.id
          }">Schedule</button>
        </td>
      `;
      tbody.appendChild(tr);
    });

    // Add event listeners to buttons
    document.querySelectorAll(".view-patient-btn").forEach((btn) => {
      btn.addEventListener("click", handleViewPatient);
    });

    document.querySelectorAll(".schedule-for-patient-btn").forEach((btn) => {
      btn.addEventListener("click", handleScheduleForPatient);
    });
  }

  // Handle view patient
  function handleViewPatient(e) {
    const patientId = e.target.getAttribute("data-id");
    const patient = patients.find((p) => p.id === patientId);

    if (patient) {
      // Fill the patient view
      document.getElementById("view-patient-id").textContent = patient.id;
      document.getElementById(
        "view-patient-name"
      ).textContent = `${patient.firstName} ${patient.lastName}`;
      document.getElementById("view-patient-dob").textContent = formatDate(
        patient.dob
      );
      document.getElementById("view-patient-gender").textContent = capitalize(
        patient.gender
      );
      document.getElementById("view-patient-phone").textContent = patient.phone;
      document.getElementById("view-patient-email").textContent = patient.email;
      document.getElementById("view-patient-address").textContent =
        patient.address;
      document.getElementById("view-patient-doctor").textContent =
        patient.doctor;
      document.getElementById("view-patient-insurance").textContent =
        patient.insurance;
      document.getElementById("view-patient-last-visit").textContent =
        formatDate(patient.lastVisit);
      document.getElementById("view-patient-conditions").textContent =
        patient.medicalConditions || "None";
      document.getElementById("view-patient-allergies").textContent =
        patient.allergies || "None";
      document.getElementById("view-patient-medications").textContent =
        patient.medications || "None";

      // Get patient's appointments
      const patientAppointments = appointments.filter(
        (appt) => appt.patientId === patientId
      );

      // Fill appointments table
      const apptTable = document.querySelector(
        ".patient-appointments-table tbody"
      );
      apptTable.innerHTML = "";

      patientAppointments.forEach((appt) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${formatDate(appt.date)}</td>
          <td>${formatTime(appt.time)}</td>
          <td>${appt.doctor}</td>
          <td>${appt.reason}</td>
          <td><span class="status-badge ${appt.status}">${capitalize(
          appt.status
        )}</span></td>
        `;
        apptTable.appendChild(tr);
      });

      // Set up schedule button for this patient
      document
        .querySelector(".schedule-for-patient-btn-modal")
        .setAttribute("data-id", patientId);

      // Show the modal
      viewPatientModal.style.display = "flex";

      // Reset to first tab
      document.querySelectorAll(".tab-btn").forEach((btn) => {
        btn.classList.remove("active");
      });
      document.querySelectorAll(".tab-content").forEach((tab) => {
        tab.classList.remove("active");
      });
      document
        .querySelector('.tab-btn[data-tab="appointments"]')
        .classList.add("active");
      document.getElementById("appointments-tab").classList.add("active");
    }
  }

  // Handle schedule for patient
  function handleScheduleForPatient(e) {
    const patientId = e.target.getAttribute("data-id");
    const patient = patients.find((p) => p.id === patientId);

    if (patient) {
      // Reset and fill the appointment form
      appointmentForm.reset();
      document.getElementById(
        "appointment-patient"
      ).value = `${patient.firstName} ${patient.lastName}`;
      document
        .getElementById("appointment-patient")
        .setAttribute("data-id", patientId);
      document.getElementById("appointment-modal-title").textContent =
        "Schedule New Appointment";
      currentAppointmentId = null;

      // Set default date to tomorrow
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      document.getElementById("appointment-date").value =
        formatDateForInput(tomorrow);

      // Show the modal
      appointmentModal.style.display = "flex";
    }
  }

  // Handle form submissions
  if (patientForm) {
    patientForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const firstName = document.getElementById("patient-first-name").value;
      const lastName = document.getElementById("patient-last-name").value;
      const dob = document.getElementById("patient-dob").value;
      const gender = document.getElementById("patient-gender").value;
      const phone = document.getElementById("patient-phone").value;
      const email = document.getElementById("patient-email").value;
      const address = document.getElementById("patient-address").value;
      const doctor = document.getElementById("patient-doctor").value;
      const insurance = document.getElementById("patient-insurance").value;
      const medicalConditions = document.getElementById(
        "patient-medical-conditions"
      ).value;
      const allergies = document.getElementById("patient-allergies").value;
      const medications = document.getElementById("patient-medications").value;

      if (currentPatientId) {
        // Update existing patient
        const patientIndex = patients.findIndex(
          (p) => p.id === currentPatientId
        );
        if (patientIndex !== -1) {
          patients[patientIndex] = {
            ...patients[patientIndex],
            firstName,
            lastName,
            dob,
            gender,
            phone,
            email,
            address,
            doctor,
            insurance,
            medicalConditions,
            allergies,
            medications,
          };
          showNotification("Patient updated successfully", "success");
        }
      } else {
        // Add new patient
        const newId = `P-${10000 + patients.length + 1}`;
        const today = new Date().toISOString().split("T")[0];
        patients.push({
          id: newId,
          firstName,
          lastName,
          dob,
          gender,
          phone,
          email,
          address,
          doctor,
          insurance,
          medicalConditions,
          allergies,
          medications,
          lastVisit: today,
        });
        showNotification("Patient added successfully", "success");
      }

      // Update the table and close the modal
      renderPatientsTable();
      patientModal.style.display = "none";
    });
  }

  if (appointmentForm) {
    appointmentForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const patientInput = document.getElementById("appointment-patient");
      const patientName = patientInput.value;
      const patientId =
        patientInput.getAttribute("data-id") ||
        findPatientIdByName(patientName);
      const date = document.getElementById("appointment-date").value;
      const time = document.getElementById("appointment-time").value;
      const doctor = document.getElementById("appointment-doctor").value;
      const reason = document.getElementById("appointment-reason").value;
      const notes = document.getElementById("appointment-notes").value;

      if (!patientId) {
        showNotification(
          "Patient not found. Please select a valid patient.",
          "error"
        );
        return;
      }

      if (currentAppointmentId) {
        // Update existing appointment
        const apptIndex = appointments.findIndex(
          (a) => a.id === currentAppointmentId
        );
        if (apptIndex !== -1) {
          appointments[apptIndex] = {
            ...appointments[apptIndex],
            patientId,
            patientName,
            date,
            time,
            doctor,
            reason,
            notes,
          };
          showNotification("Appointment updated successfully", "success");
        }
      } else {
        // Add new appointment
        const newId =
          appointments.length > 0
            ? Math.max(...appointments.map((a) => a.id)) + 1
            : 1;
        appointments.push({
          id: newId,
          patientId,
          patientName,
          date,
          time,
          doctor,
          reason,
          notes,
          status: "scheduled",
        });
        showNotification("Appointment scheduled successfully", "success");
      }

      // Update calendar and close the modal
      updateCalendar();
      appointmentModal.style.display = "none";
    });
  }

  // View appointment
  document.querySelectorAll(".view-appointment-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const appointmentId = parseInt(this.getAttribute("data-id"));
      const appointment = appointments.find((a) => a.id === appointmentId);

      if (appointment) {
        document.getElementById("view-appointment-patient").textContent =
          appointment.patientName;
        document.getElementById("view-appointment-date").textContent =
          formatDate(appointment.date);
        document.getElementById("view-appointment-time").textContent =
          formatTime(appointment.time);
        document.getElementById("view-appointment-doctor").textContent =
          appointment.doctor;
        document.getElementById("view-appointment-reason").textContent =
          appointment.reason;
        document.getElementById("view-appointment-status").textContent =
          capitalize(appointment.status);
        document.getElementById("view-appointment-notes").textContent =
          appointment.notes || "None";

        // Store current appointment ID
        currentAppointmentId = appointmentId;

        // Show/hide buttons based on status
        const checkInBtn = document.getElementById("check-in-appointment-btn");
        if (appointment.status === "scheduled") {
          checkInBtn.style.display = "block";
        } else {
          checkInBtn.style.display = "none";
        }

        // Show the modal
        viewAppointmentModal.style.display = "flex";
      }
    });
  });

  // Edit appointment
  document
    .getElementById("edit-appointment-btn")
    .addEventListener("click", function () {
      if (!currentAppointmentId) return;

      const appointment = appointments.find(
        (a) => a.id === currentAppointmentId
      );
      if (appointment) {
        // Fill the form with appointment data
        document.getElementById("appointment-patient").value =
          appointment.patientName;
        document
          .getElementById("appointment-patient")
          .setAttribute("data-id", appointment.patientId);
        document.getElementById("appointment-date").value = appointment.date;
        document.getElementById("appointment-time").value = appointment.time;
        document.getElementById("appointment-doctor").value =
          appointment.doctor;
        document.getElementById("appointment-reason").value =
          appointment.reason;
        document.getElementById("appointment-notes").value =
          appointment.notes || "";

        // Update modal title
        document.getElementById("appointment-modal-title").textContent =
          "Edit Appointment";

        // Close view modal and open edit modal
        viewAppointmentModal.style.display = "none";
        appointmentModal.style.display = "flex";
      }
    });

  // Cancel appointment
  document
    .getElementById("cancel-appointment-btn")
    .addEventListener("click", function () {
      if (!currentAppointmentId) return;

      if (confirm("Are you sure you want to cancel this appointment?")) {
        // Remove the appointment
        appointments = appointments.filter(
          (a) => a.id !== currentAppointmentId
        );

        // Update UI and close modal
        updateCalendar();
        viewAppointmentModal.style.display = "none";
        showNotification("Appointment cancelled successfully", "success");
      }
    });

  // Check in appointment
  document
    .getElementById("check-in-appointment-btn")
    .addEventListener("click", function () {
      if (!currentAppointmentId) return;

      const apptIndex = appointments.findIndex(
        (a) => a.id === currentAppointmentId
      );
      if (apptIndex !== -1) {
        appointments[apptIndex].status = "checked-in";

        // Update UI and close modal
        updateCalendar();
        viewAppointmentModal.style.display = "none";
        showNotification("Patient checked in successfully", "success");
      }
    });

  // View doctor schedule
  document.querySelectorAll(".view-schedule-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const doctorName = this.getAttribute("data-doctor");
      currentDoctorName = doctorName;

      // Update modal title
      document.getElementById(
        "doctor-schedule-name"
      ).textContent = `${doctorName}'s Schedule`;

      // Show the modal
      doctorScheduleModal.style.display = "flex";
    });
  });

  // Patient check-in form
  if (patientCheckInForm) {
    patientCheckInForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const patientId = document.getElementById("check-in-patient-id").value;
      const appointmentTime = document.getElementById(
        "check-in-appointment-time"
      ).value;
      const doctor = document.getElementById("check-in-doctor").value;

      // Find the appointment
      const appointment = appointments.find(
        (a) =>
          (a.patientId === patientId ||
            a.patientName.toLowerCase().includes(patientId.toLowerCase())) &&
          a.time === appointmentTime &&
          a.doctor === doctor &&
          a.status === "scheduled"
      );

      if (appointment) {
        // Check in the patient
        appointment.status = "checked-in";

        // Update UI
        updateCalendar();
        patientCheckInForm.reset();
        showNotification("Patient checked in successfully", "success");

        // Add to checked-in patients list
        const checkedInContainer = document.querySelector(
          ".checked-in-patients"
        );
        const patientInfo = document.createElement("div");
        patientInfo.className = "patient-info";
        patientInfo.innerHTML = `
          <h3>${appointment.patientName}</h3>
          <p><strong>Appointment:</strong> ${formatTime(
            appointment.time
          )} with ${appointment.doctor}</p>
          <p><strong>Checked In:</strong> ${new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}</p>
          <p><strong>Reason:</strong> ${appointment.reason}</p>
          <button class="action-btn notify-doctor-btn" data-patient="${
            appointment.patientName
          }" data-doctor="${appointment.doctor}">
            Notify Doctor
          </button>
        `;
        checkedInContainer.appendChild(patientInfo);

        // Add event listener to new notify button
        patientInfo
          .querySelector(".notify-doctor-btn")
          .addEventListener("click", function () {
            const patient = this.getAttribute("data-patient");
            const doctor = this.getAttribute("data-doctor");
            showNotification(
              `Notified ${doctor} that ${patient} is ready`,
              "success"
            );
          });
      } else {
        showNotification("No matching scheduled appointment found", "error");
      }
    });
  }

  // Notify doctor buttons
  document.querySelectorAll(".notify-doctor-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const patient = this.getAttribute("data-patient");
      const doctor = this.getAttribute("data-doctor");
      showNotification(
        `Notified ${doctor} that ${patient} is ready`,
        "success"
      );
    });
  });

  // Calendar navigation
  document.querySelector(".prev-week")?.addEventListener("click", function () {
    showNotification("Previous week view not implemented in demo", "info");
  });

  document.querySelector(".next-week")?.addEventListener("click", function () {
    showNotification("Next week view not implemented in demo", "info");
  });

  // Doctor schedule navigation
  document.querySelector(".prev-month")?.addEventListener("click", function () {
    showNotification("Previous month view not implemented in demo", "info");
  });

  document.querySelector(".next-month")?.addEventListener("click", function () {
    showNotification("Next month view not implemented in demo", "info");
  });

  // Add appointment from doctor schedule
  document
    .getElementById("add-schedule-appointment-btn")
    ?.addEventListener("click", function () {
      // Reset form
      appointmentForm.reset();

      // Pre-select the doctor
      if (currentDoctorName) {
        document.getElementById("appointment-doctor").value = currentDoctorName;
      }

      // Update modal title
      document.getElementById("appointment-modal-title").textContent =
        "Schedule New Appointment";
      currentAppointmentId = null;

      // Set default date to tomorrow
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      document.getElementById("appointment-date").value =
        formatDateForInput(tomorrow);

      // Close schedule modal and open appointment modal
      doctorScheduleModal.style.display = "none";
      appointmentModal.style.display = "flex";
    });

  // Update the calendar with appointments
  function updateCalendar() {
    // Update dashboard appointments list
    const upcomingTable = document.querySelector(
      ".upcoming-appointments tbody"
    );
    if (upcomingTable) {
      upcomingTable.innerHTML = "";

      // Sort by date and time
      const sortedAppointments = [...appointments].sort((a, b) => {
        if (a.date === b.date) {
          return a.time.localeCompare(b.time);
        }
        return a.date.localeCompare(b.date);
      });

      // Take only upcoming appointments (today and future)
      const today = new Date().toISOString().split("T")[0];
      const upcomingAppointments = sortedAppointments
        .filter((a) => a.date >= today)
        .slice(0, 5);

      upcomingAppointments.forEach((appt) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${formatTime(appt.time)}</td>
          <td>${appt.patientName}</td>
          <td>${appt.doctor}</td>
          <td><span class="status-badge ${appt.status}">${capitalize(
          appt.status
        )}</span></td>
          <td>
            <button class="action-btn view-appointment-btn" data-id="${
              appt.id
            }">View</button>
          </td>
        `;
        upcomingTable.appendChild(tr);
      });

      // Add event listeners to view buttons
      upcomingTable.querySelectorAll(".view-appointment-btn").forEach((btn) => {
        btn.addEventListener("click", function () {
          const appointmentId = parseInt(this.getAttribute("data-id"));
          const appointment = appointments.find((a) => a.id === appointmentId);

          if (appointment) {
            // Fill modal with appointment details
            document.getElementById("view-appointment-patient").textContent =
              appointment.patientName;
            document.getElementById("view-appointment-date").textContent =
              formatDate(appointment.date);
            document.getElementById("view-appointment-time").textContent =
              formatTime(appointment.time);
            document.getElementById("view-appointment-doctor").textContent =
              appointment.doctor;
            document.getElementById("view-appointment-reason").textContent =
              appointment.reason;
            document.getElementById("view-appointment-status").textContent =
              capitalize(appointment.status);
            document.getElementById("view-appointment-notes").textContent =
              appointment.notes || "None";

            // Store current appointment ID
            currentAppointmentId = appointmentId;

            // Show/hide buttons based on status
            const checkInBtn = document.getElementById(
              "check-in-appointment-btn"
            );
            if (appointment.status === "scheduled") {
              checkInBtn.style.display = "block";
            } else {
              checkInBtn.style.display = "none";
            }

            // Show the modal
            viewAppointmentModal.style.display = "flex";
          }
        });
      });
    }

    // Clear and rebuild calendar
    const calendarContainer = document.querySelector(".calendar-grid");
    if (calendarContainer) {
      // Keep the structure with the day headers, but clear the appointment cards
      const calendarDays = calendarContainer.querySelectorAll(".calendar-day");

      calendarDays.forEach((day, index) => {
        // Get the day name (Monday, Tuesday, etc.)
        const dayHeader = day.querySelector(".calendar-day-header");
        const dayName = dayHeader ? dayHeader.textContent.toLowerCase() : "";

        // Clear existing appointment cards but keep the header
        const cards = day.querySelectorAll(".appointment-card");
        cards.forEach((card) => card.remove());

        // Map day names to day codes
        const dayMap = {
          monday: "mon",
          tuesday: "tue",
          wednesday: "wed",
          thursday: "thu",
          friday: "fri",
        };

        const dayCode = dayMap[dayName];

        if (dayCode) {
          // Add appointment cards for this day
          const today = new Date();
          const weekStart = new Date(today);
          weekStart.setDate(today.getDate() - today.getDay() + 1); // Monday of current week

          const currentDay = new Date(weekStart);
          currentDay.setDate(weekStart.getDate() + index);

          const dayString = currentDay.toISOString().split("T")[0];

          // Filter appointments for this day
          const dayAppointments = appointments.filter(
            (appt) => appt.date === dayString
          );

          // Sort by time
          dayAppointments.sort((a, b) => a.time.localeCompare(b.time));

          // Add appointment cards
          dayAppointments.forEach((appt) => {
            const card = document.createElement("div");
            card.className = "appointment-card booked";
            card.setAttribute("data-id", appt.id);
            card.innerHTML = `
              <p class="appointment-time">${formatTime(appt.time)}</p>
              <p class="appointment-patient">${appt.patientName}</p>
              <p class="appointment-doctor">${appt.doctor}</p>
            `;

            // Add click event to view appointment details
            card.addEventListener("click", function () {
              const appointmentId = parseInt(this.getAttribute("data-id"));
              const appointment = appointments.find(
                (a) => a.id === appointmentId
              );

              if (appointment) {
                // Fill modal with appointment details
                document.getElementById(
                  "view-appointment-patient"
                ).textContent = appointment.patientName;
                document.getElementById("view-appointment-date").textContent =
                  formatDate(appointment.date);
                document.getElementById("view-appointment-time").textContent =
                  formatTime(appointment.time);
                document.getElementById("view-appointment-doctor").textContent =
                  appointment.doctor;
                document.getElementById("view-appointment-reason").textContent =
                  appointment.reason;
                document.getElementById("view-appointment-status").textContent =
                  capitalize(appointment.status);
                document.getElementById("view-appointment-notes").textContent =
                  appointment.notes || "None";

                // Store current appointment ID
                currentAppointmentId = appointmentId;

                // Show/hide buttons based on status
                const checkInBtn = document.getElementById(
                  "check-in-appointment-btn"
                );
                if (appointment.status === "scheduled") {
                  checkInBtn.style.display = "block";
                } else {
                  checkInBtn.style.display = "none";
                }

                // Show the modal
                viewAppointmentModal.style.display = "flex";
              }
            });

            day.appendChild(card);
          });
        }
      });
    }
  }

  // Utility functions
  function formatDate(dateString) {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });
  }

  function formatDateForInput(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  function formatTime(timeString) {
    if (!timeString) return "";
    const [hours, minutes] = timeString.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  }

  function capitalize(string) {
    if (!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function findPatientIdByName(name) {
    const patient = patients.find(
      (p) => `${p.firstName} ${p.lastName}`.toLowerCase() === name.toLowerCase()
    );
    return patient ? patient.id : null;
  }

  // Show a notification
  function showNotification(message, type = "info") {
    // Create notification element
    const notification = document.createElement("div");
    notification.className = `notification ${type}`;
    notification.textContent = message;

    // Add close button
    const closeBtn = document.createElement("span");
    closeBtn.className = "notification-close";
    closeBtn.textContent = "×";
    closeBtn.addEventListener("click", () => {
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
  renderPatientsTable();
  updateCalendar();
});
