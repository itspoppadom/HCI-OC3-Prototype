document.addEventListener("DOMContentLoaded", function () {
  // Check if user is healthcare provider
  const userRole = sessionStorage.getItem("userRole");
  if (userRole !== "Healthcare Provider" && userRole !== "Administrator") {
    window.location.href = "../html/index.html";
    return;
  }

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
      insurance: "HealthPlus",
      medicalConditions: "Hypertension, Type 2 Diabetes",
      allergies: "Penicillin, Peanuts",
      medications: "Lisinopril 10mg daily, Metformin 500mg twice daily",
      lastVisit: "2023-11-06",
      notes: "Patient managing conditions well with current medications.",
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
      insurance: "MediCare",
      medicalConditions: "Asthma",
      allergies: "Dust, Pollen",
      medications: "Albuterol inhaler as needed",
      lastVisit: "2023-11-06",
      notes: "Patient's asthma is well-controlled with current treatment.",
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
      insurance: "BlueCross",
      medicalConditions: "None",
      allergies: "None",
      medications: "None",
      lastVisit: "2023-11-07",
      notes:
        "Patient in good health. Seasonal allergies discussion planned for next visit.",
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
      insurance: "HealthPlus",
      medicalConditions: "Migraines",
      allergies: "Sulfa drugs",
      medications: "Sumatriptan as needed",
      lastVisit: "2023-10-25",
      notes:
        "Patient reports migraines occurring 2-3 times per month, reduced from 4-5 times.",
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
      insurance: "Medicare",
      medicalConditions: "Arthritis, High cholesterol",
      allergies: "None",
      medications: "Atorvastatin 20mg daily, Ibuprofen as needed",
      lastVisit: "2023-10-18",
      notes:
        "Patient reports good management of arthritis pain with current regimen.",
    },
  ];

  // Mock data for appointments
  let appointments = [
    {
      id: 1,
      patientId: "P-10001",
      patientName: "John Smith",
      date: "2023-11-07",
      time: "09:00",
      doctor: "Dr. James Wilson",
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
      doctor: "Dr. James Wilson",
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
      doctor: "Dr. James Wilson",
      reason: "Skin rash examination",
      notes: "Patient reported rash on arms developing over past week",
      status: "scheduled",
    },
    {
      id: 4,
      patientId: "P-10004",
      patientName: "Sarah Davis",
      date: "2023-11-07",
      time: "14:00",
      doctor: "Dr. James Wilson",
      reason: "Migraine consultation",
      notes: "Review effectiveness of current medication",
      status: "scheduled",
    },
    {
      id: 5,
      patientId: "P-10005",
      patientName: "Michael Wilson",
      date: "2023-11-07",
      time: "15:00",
      doctor: "Dr. James Wilson",
      reason: "Arthritis follow-up",
      notes: "Evaluate joint pain and medication efficacy",
      status: "scheduled",
    },
  ];

  // Mock data for prescriptions
  let prescriptions = [
    {
      id: 1,
      patientId: "P-10001",
      patientName: "John Smith",
      medication: "Lisinopril",
      dosage: "10mg",
      frequency: "Once daily",
      startDate: "2023-09-15",
      endDate: "2024-03-15",
      instructions: "Take in the morning with food",
      prescribedBy: "Dr. James Wilson",
      active: true,
      notes: "For blood pressure management",
    },
    {
      id: 2,
      patientId: "P-10001",
      patientName: "John Smith",
      medication: "Metformin",
      dosage: "500mg",
      frequency: "Twice daily",
      startDate: "2023-09-15",
      endDate: "2024-03-15",
      instructions: "Take with breakfast and dinner",
      prescribedBy: "Dr. James Wilson",
      active: true,
      notes: "For diabetes management",
    },
    {
      id: 3,
      patientId: "P-10002",
      patientName: "Mary Johnson",
      medication: "Albuterol Inhaler",
      dosage: "90mcg",
      frequency: "As needed",
      startDate: "2023-10-10",
      endDate: "2024-10-10",
      instructions:
        "Use 2 puffs every 4-6 hours as needed for shortness of breath",
      prescribedBy: "Dr. James Wilson",
      active: true,
      notes: "For asthma management",
    },
    {
      id: 4,
      patientId: "P-10004",
      patientName: "Sarah Davis",
      medication: "Sumatriptan",
      dosage: "50mg",
      frequency: "As needed",
      startDate: "2023-10-25",
      endDate: "2024-04-25",
      instructions:
        "Take one tablet at onset of migraine, may repeat after 2 hours if needed, not to exceed 100mg in 24 hours",
      prescribedBy: "Dr. James Wilson",
      active: true,
      notes: "For migraine treatment",
    },
    {
      id: 5,
      patientId: "P-10005",
      patientName: "Michael Wilson",
      medication: "Atorvastatin",
      dosage: "20mg",
      frequency: "Once daily",
      startDate: "2023-10-18",
      endDate: "2024-04-18",
      instructions: "Take in the evening",
      prescribedBy: "Dr. James Wilson",
      active: true,
      notes: "For cholesterol management",
    },
  ];

  // Mock medication database with interaction information
  const medicationDatabase = [
    {
      name: "Lisinopril",
      class: "ACE Inhibitor",
      usedFor: "Hypertension, Heart Failure",
      sideEffects: "Dry cough, Dizziness, Headache",
      interactsWith: [
        "Potassium supplements",
        "NSAIDs",
        "Lithium",
        "Spironolactone",
      ],
      contraindications: [
        "Pregnancy",
        "History of angioedema",
        "Bilateral renal artery stenosis",
      ],
      nursesNotes: "Monitor blood pressure and renal function",
    },
    {
      name: "Metformin",
      class: "Biguanide",
      usedFor: "Type 2 Diabetes",
      sideEffects: "Diarrhea, Nausea, Abdominal pain, Lactic acidosis (rare)",
      interactsWith: ["Cimetidine", "Contrast dyes", "Digoxin", "Nifedipine"],
      contraindications: [
        "Renal dysfunction",
        "Metabolic acidosis",
        "Hypoxic states",
      ],
      nursesNotes:
        "Hold before procedures with contrast dye, monitor renal function",
    },
    {
      name: "Albuterol",
      class: "Beta-2 agonist",
      usedFor: "Asthma, COPD, Bronchospasm",
      sideEffects: "Tremor, Tachycardia, Nervousness, Headache",
      interactsWith: [
        "Beta blockers",
        "MAO inhibitors",
        "Tricyclic antidepressants",
      ],
      contraindications: ["Severe cardiovascular disorder", "Tachyarrhythmias"],
      nursesNotes:
        "Monitor heart rate and symptoms of paradoxical bronchospasm",
    },
    {
      name: "Sumatriptan",
      class: "Triptan",
      usedFor: "Migraine",
      sideEffects: "Tingling, Warm/hot sensation, Dizziness, Chest discomfort",
      interactsWith: [
        "MAO inhibitors",
        "SSRIs",
        "SNRIs",
        "Ergotamine derivatives",
      ],
      contraindications: [
        "Ischemic heart disease",
        "Cerebrovascular disease",
        "Uncontrolled hypertension",
      ],
      nursesNotes: "Not for prevention of migraines, only for acute treatment",
    },
    {
      name: "Atorvastatin",
      class: "Statin",
      usedFor: "Hypercholesterolemia, Cardiovascular disease prevention",
      sideEffects: "Muscle pain, Liver enzyme elevation, Headache",
      interactsWith: [
        "Erythromycin",
        "Clarithromycin",
        "Cyclosporine",
        "Gemfibrozil",
        "Grapefruit juice",
      ],
      contraindications: ["Active liver disease", "Pregnancy", "Breastfeeding"],
      nursesNotes: "Monitor liver enzymes and symptoms of myopathy",
    },
    {
      name: "Ibuprofen",
      class: "NSAID",
      usedFor: "Pain, Inflammation, Fever",
      sideEffects:
        "Stomach upset, GI bleeding, Kidney problems, Increased blood pressure",
      interactsWith: [
        "ACE inhibitors",
        "Diuretics",
        "Anticoagulants",
        "Lithium",
        "Methotrexate",
      ],
      contraindications: [
        "Aspirin allergy",
        "Active GI bleeding",
        "Heart failure",
        "Late pregnancy",
      ],
      nursesNotes:
        "Take with food to minimize GI upset, monitor renal function in long-term use",
    },
    {
      name: "Amoxicillin",
      class: "Penicillin antibiotic",
      usedFor: "Bacterial infections",
      sideEffects: "Diarrhea, Nausea, Rash",
      interactsWith: [
        "Probenecid",
        "Methotrexate",
        "Oral contraceptives",
        "Allopurinol",
      ],
      contraindications: ["Penicillin allergy", "Mononucleosis"],
      nursesNotes: "Complete full course even if symptoms improve",
    },
    {
      name: "Prednisone",
      class: "Corticosteroid",
      usedFor: "Inflammation, Allergic reactions, Autoimmune disorders",
      sideEffects:
        "Weight gain, Mood changes, Insomnia, Increased blood sugar, Osteoporosis",
      interactsWith: [
        "NSAIDs",
        "Anticoagulants",
        "Diuretics",
        "Antidiabetic medications",
      ],
      contraindications: [
        "Systemic fungal infections",
        "Hypersensitivity to corticosteroids",
      ],
      nursesNotes: "Do not stop abruptly, taper dose according to schedule",
    },
    {
      name: "Levothyroxine",
      class: "Thyroid hormone",
      usedFor: "Hypothyroidism, Thyroid hormone replacement",
      sideEffects:
        "Tachycardia, Anxiety, Insomnia, Weight loss, Heat intolerance (signs of overdose)",
      interactsWith: [
        "Calcium supplements",
        "Iron supplements",
        "Antacids",
        "Cholestyramine",
      ],
      contraindications: [
        "Thyrotoxicosis (without hypothyroidism)",
        "Uncorrected adrenal insufficiency",
      ],
      nursesNotes:
        "Take on empty stomach, separate from other medications by 4 hours",
    },
    {
      name: "Warfarin",
      class: "Anticoagulant",
      usedFor: "Prevention of blood clots, Atrial fibrillation, DVT, PE",
      sideEffects: "Bleeding, Bruising, Rare: skin necrosis",
      interactsWith: [
        "NSAIDs",
        "Antibiotics",
        "Antifungals",
        "Antiplatelets",
        "Many others",
      ],
      contraindications: [
        "Active bleeding",
        "Severe hypertension",
        "Recent surgery",
      ],
      nursesNotes:
        "Regular INR monitoring required, many food and drug interactions",
    },
    {
      name: "Amlodipine",
      class: "Calcium channel blocker",
      usedFor: "Hypertension, Angina",
      sideEffects: "Peripheral edema, Dizziness, Flushing, Headache",
      interactsWith: ["Simvastatin", "CYP3A4 inhibitors", "Grapefruit juice"],
      contraindications: ["Severe hypotension", "Aortic stenosis"],
      nursesNotes: "May cause ankle edema, monitor blood pressure",
    },
    {
      name: "Sertraline",
      class: "SSRI",
      usedFor: "Depression, Anxiety, OCD, PTSD",
      sideEffects: "Nausea, Insomnia, Diarrhea, Sexual dysfunction",
      interactsWith: [
        "MAO inhibitors",
        "Triptans",
        "Other SSRIs",
        "Warfarin",
        "NSAIDs",
      ],
      contraindications: ["Use of MAOIs within 14 days"],
      nursesNotes: "May take 4-6 weeks for full therapeutic effect",
    },
  ];

  // Elements
  const patientQueue = document.querySelector(".patient-queue tbody");
  const patientSearch = document.getElementById("patient-search");
  const prescriptionSearch = document.getElementById("prescription-search");
  const medicationSearch = document.getElementById("medication-search");
  const viewPatientModal = document.getElementById("view-patient-modal");
  const viewPatientModalClose = document.querySelector(
    ".view-patient-modal-close"
  );
  const newPrescriptionModal = document.getElementById(
    "new-prescription-modal"
  );
  const newPrescriptionModalClose = document.querySelector(
    ".new-prescription-modal-close"
  );
  const prescriptionForm = document.getElementById("prescription-form");
  const visitModal = document.getElementById("visit-modal");
  const visitModalClose = document.querySelector(".visit-modal-close");
  const visitForm = document.getElementById("visit-form");
  const medicationDetailsModal = document.getElementById(
    "medication-details-modal"
  );
  const medicationDetailsModalClose = document.querySelector(
    ".medication-details-modal-close"
  );

  // Current IDs being viewed/edited
  let currentPatientId = null;
  let currentAppointmentId = null;
  let currentPrescriptionId = null;
  let selectedMedication = null;

  // Initialize the patient queue
  function renderPatientQueue() {
    if (!patientQueue) return;

    // Clear the entire table contents
    patientQueue.innerHTML = "";

    // Create table headers if they don't exist
    const thead = patientQueue.parentElement.querySelector("thead");
    if (thead && thead.children.length === 0) {
      const headerRow = document.createElement("tr");
      headerRow.innerHTML = `
        <th>Patient</th>
        <th>Time</th>
        <th>Reason</th>
        <th>Status</th>
        <th>Actions</th>
      `;
      thead.appendChild(headerRow);
    }

    // Filter for today's appointments
    const today = new Date().toISOString().split("T")[0];
    const todaysAppointments = appointments.filter(
      (appt) => appt.date === today
    );

    // Sort by time
    todaysAppointments.sort((a, b) => a.time.localeCompare(b.time));

    // Create table rows for each appointment
    todaysAppointments.forEach((appt) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${appt.patientName}</td>
        <td>${formatTime(appt.time)}</td>
        <td>${appt.reason}</td>
        <td><span class="status-badge ${appt.status.toLowerCase()}">${capitalize(
        appt.status
      )}</span></td>
        <td>
          <button class="action-btn start-session-btn" data-id="${appt.id}" ${
        appt.status !== "checked-in" ? "disabled" : ""
      }>
            Start Session
          </button>
        </td>
      `;
      patientQueue.appendChild(tr);
    });

    // If no appointments for today
    if (todaysAppointments.length === 0) {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td colspan="5" style="text-align: center; padding: 20px;">No appointments scheduled for today</td>
      `;
      patientQueue.appendChild(tr);
    }

    // Add event listeners to start session buttons
    document.querySelectorAll(".start-session-btn").forEach((btn) => {
      btn.addEventListener("click", handleStartSession);
    });
  }

  // Handle start session button click
  function handleStartSession(e) {
    const appointmentId = parseInt(e.target.getAttribute("data-id"));
    const appointment = appointments.find((a) => a.id === appointmentId);

    if (appointment) {
      // Update appointment status
      appointment.status = "in-progress";

      // Get patient information
      const patient = patients.find((p) => p.id === appointment.patientId);

      // Populate the visit form
      document.getElementById("visit-patient-name").textContent =
        appointment.patientName;
      document.getElementById("visit-reason").textContent = appointment.reason;
      document.getElementById("visit-appointment-time").textContent =
        formatTime(appointment.time);
      document.getElementById("visit-appointment-notes").textContent =
        appointment.notes || "None";

      // Set patient medical info
      document.getElementById("visit-medical-conditions").textContent =
        patient.medicalConditions || "None";
      document.getElementById("visit-allergies").textContent =
        patient.allergies || "None";
      document.getElementById("visit-medications").textContent =
        patient.medications || "None";

      // Clear previous form entries
      document.getElementById("visit-notes").value = "";
      document.getElementById("visit-diagnosis").value = "";
      document.getElementById("visit-treatment").value = "";

      // Store the current patient and appointment IDs
      currentPatientId = patient.id;
      currentAppointmentId = appointment.id;

      // Show the visit modal
      visitModal.style.display = "flex";

      // Update the queue display
      renderPatientQueue();
    }
  }

  // Handle patient search
  if (patientSearch) {
    patientSearch.addEventListener("input", function () {
      const searchTerm = this.value.toLowerCase();
      const patientsList = document.querySelector(".patients-list");
      patientsList.innerHTML = "";

      if (searchTerm.length < 2) {
        patientsList.innerHTML =
          "<p>Please enter at least 2 characters to search</p>";
        return;
      }

      const filteredPatients = patients.filter(
        (patient) =>
          `${patient.firstName} ${patient.lastName}`
            .toLowerCase()
            .includes(searchTerm) ||
          patient.id.toLowerCase().includes(searchTerm)
      );

      if (filteredPatients.length === 0) {
        patientsList.innerHTML = "<p>No patients found</p>";
        return;
      }

      filteredPatients.forEach((patient) => {
        const patientCard = document.createElement("div");
        patientCard.className = "patient-card";
        patientCard.innerHTML = `
          <h3>${patient.firstName} ${patient.lastName}</h3>
          <p><strong>ID:</strong> ${patient.id}</p>
          <p><strong>DOB:</strong> ${formatDate(patient.dob)}</p>
          <button class="action-btn view-patient-btn" data-id="${
            patient.id
          }">View Patient</button>
          <button class="action-btn new-prescription-btn" data-id="${
            patient.id
          }">New Prescription</button>
        `;
        patientsList.appendChild(patientCard);
      });

      // Add event listeners to buttons
      document.querySelectorAll(".view-patient-btn").forEach((btn) => {
        btn.addEventListener("click", handleViewPatient);
      });

      document.querySelectorAll(".new-prescription-btn").forEach((btn) => {
        btn.addEventListener("click", handleNewPrescription);
      });
    });
  }

  // Handle medication search
  if (medicationSearch) {
    medicationSearch.addEventListener("input", function () {
      const searchTerm = this.value.toLowerCase();
      const medicationList = document.querySelector(".medication-list");

      if (!medicationList) return;

      medicationList.innerHTML = "";

      if (searchTerm.length < 2) {
        medicationList.innerHTML =
          "<p>Please enter at least 2 characters to search</p>";
        return;
      }

      const filteredMedications = medicationDatabase.filter(
        (med) =>
          med.name.toLowerCase().includes(searchTerm) ||
          med.class.toLowerCase().includes(searchTerm) ||
          med.usedFor.toLowerCase().includes(searchTerm)
      );

      if (filteredMedications.length === 0) {
        medicationList.innerHTML = "<p>No medications found</p>";
        return;
      }

      filteredMedications.forEach((med) => {
        const medCard = document.createElement("div");
        medCard.className = "medication-card";
        medCard.innerHTML = `
          <h3>${med.name}</h3>
          <p><strong>Class:</strong> ${med.class}</p>
          <p><strong>Used for:</strong> ${med.usedFor}</p>
          <button class="action-btn view-medication-btn" data-name="${med.name}">View Details</button>
          <button class="action-btn select-medication-btn" data-name="${med.name}">Select</button>
        `;
        medicationList.appendChild(medCard);
      });

      // Add event listeners to buttons
      document.querySelectorAll(".view-medication-btn").forEach((btn) => {
        btn.addEventListener("click", handleViewMedication);
      });

      document.querySelectorAll(".select-medication-btn").forEach((btn) => {
        btn.addEventListener("click", handleSelectMedication);
      });
    });
  }

  // Handle prescription search
  if (prescriptionSearch) {
    prescriptionSearch.addEventListener("input", function () {
      const searchTerm = this.value.toLowerCase();
      const prescriptionsList = document.querySelector(".prescriptions-list");

      if (!prescriptionsList) return;

      prescriptionsList.innerHTML = "";

      if (searchTerm.length < 2) {
        prescriptionsList.innerHTML =
          "<p>Please enter at least 2 characters to search</p>";
        return;
      }

      const filteredPrescriptions = prescriptions.filter(
        (rx) =>
          rx.patientName.toLowerCase().includes(searchTerm) ||
          rx.medication.toLowerCase().includes(searchTerm) ||
          rx.patientId.toLowerCase().includes(searchTerm)
      );

      if (filteredPrescriptions.length === 0) {
        prescriptionsList.innerHTML = "<p>No prescriptions found</p>";
        return;
      }

      filteredPrescriptions.forEach((rx) => {
        const rxCard = document.createElement("div");
        rxCard.className = "prescription-card";
        rxCard.innerHTML = `
          <h3>${rx.medication} ${rx.dosage}</h3>
          <p><strong>Patient:</strong> ${rx.patientName} (${rx.patientId})</p>
          <p><strong>Freq:</strong> ${rx.frequency}</p>
          <p><strong>Date:</strong> ${formatDate(rx.startDate)} to ${formatDate(
          rx.endDate
        )}</p>
          <p><strong>Status:</strong> ${rx.active ? "Active" : "Inactive"}</p>
          <button class="action-btn view-rx-btn" data-id="${
            rx.id
          }">View Details</button>
        `;
        prescriptionsList.appendChild(rxCard);
      });

      // Add event listeners to buttons
      document.querySelectorAll(".view-rx-btn").forEach((btn) => {
        btn.addEventListener("click", function () {
          const rxId = parseInt(this.getAttribute("data-id"));
          const rx = prescriptions.find((p) => p.id === rxId);

          if (rx) {
            // TODO: Implement prescription details view
            alert(
              `Prescription details: ${rx.medication} ${rx.dosage} for ${rx.patientName}`
            );
          }
        });
      });
    });
  }

  // Handle view patient
  function handleViewPatient(e) {
    const patientId = e.target.getAttribute("data-id");
    const patient = patients.find((p) => p.id === patientId);

    if (patient) {
      // Populate patient information
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
      document.getElementById("view-patient-insurance").textContent =
        patient.insurance;
      document.getElementById("view-patient-conditions").textContent =
        patient.medicalConditions || "None";
      document.getElementById("view-patient-allergies").textContent =
        patient.allergies || "None";
      document.getElementById("view-patient-medications").textContent =
        patient.medications || "None";
      document.getElementById("view-patient-notes").textContent =
        patient.notes || "None";

      // Get patient's prescriptions
      const patientPrescriptions = prescriptions.filter(
        (rx) => rx.patientId === patientId
      );

      // Fill prescriptions table
      const rxTable = document.querySelector(
        ".patient-prescriptions-table tbody"
      );
      rxTable.innerHTML = "";

      patientPrescriptions.forEach((rx) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${rx.medication}</td>
          <td>${rx.dosage}</td>
          <td>${rx.frequency}</td>
          <td>${formatDate(rx.startDate)}</td>
          <td>${formatDate(rx.endDate)}</td>
          <td><span class="status-badge ${rx.active ? "active" : "inactive"}">${
          rx.active ? "Active" : "Inactive"
        }</span></td>
        `;
        rxTable.appendChild(tr);
      });

      // Store the current patient ID
      currentPatientId = patientId;

      // Show the modal
      viewPatientModal.style.display = "flex";
    }
  }

  // Handle new prescription
  function handleNewPrescription(e) {
    const patientId = e.target.getAttribute("data-id");
    const patient = patients.find((p) => p.id === patientId);

    if (patient) {
      // Reset form
      prescriptionForm.reset();

      // Fill patient information
      document.getElementById(
        "rx-patient-name"
      ).textContent = `${patient.firstName} ${patient.lastName}`;
      document.getElementById("rx-patient-id").textContent = patient.id;
      document.getElementById("rx-patient-allergies").textContent =
        patient.allergies || "None";
      document.getElementById("rx-patient-conditions").textContent =
        patient.medicalConditions || "None";

      // Get patient's current medications
      const currentMeds = prescriptions
        .filter((rx) => rx.patientId === patientId && rx.active)
        .map((rx) => `${rx.medication} ${rx.dosage} ${rx.frequency}`);

      document.getElementById("rx-current-medications").textContent =
        currentMeds.length > 0 ? currentMeds.join(", ") : "None";

      // Clear medication selection
      document.getElementById("rx-medication").value = "";
      document.getElementById("rx-medication-details").innerHTML = "";
      document.getElementById("rx-interaction-warnings").innerHTML = "";
      selectedMedication = null;

      // Store the current patient ID
      currentPatientId = patientId;

      // Show the modal
      newPrescriptionModal.style.display = "flex";
    }
  }

  // Handle view medication
  function handleViewMedication(e) {
    const medicationName = e.target.getAttribute("data-name");
    const medication = medicationDatabase.find(
      (med) => med.name === medicationName
    );

    if (medication) {
      // Populate medication details
      document.getElementById("med-name").textContent = medication.name;
      document.getElementById("med-class").textContent = medication.class;
      document.getElementById("med-used-for").textContent = medication.usedFor;
      document.getElementById("med-side-effects").textContent =
        medication.sideEffects;

      // Populate interactions
      const interactionsList = document.getElementById("med-interactions");
      interactionsList.innerHTML = "";
      medication.interactsWith.forEach((interaction) => {
        const li = document.createElement("li");
        li.textContent = interaction;
        interactionsList.appendChild(li);
      });

      // Populate contraindications
      const contraindicationsList = document.getElementById(
        "med-contraindications"
      );
      contraindicationsList.innerHTML = "";
      medication.contraindications.forEach((contraindication) => {
        const li = document.createElement("li");
        li.textContent = contraindication;
        contraindicationsList.appendChild(li);
      });

      document.getElementById("med-nurses-notes").textContent =
        medication.nursesNotes;

      // Show the modal
      medicationDetailsModal.style.display = "flex";
    }
  }

  // Complete the handleSelectMedication function
  function handleSelectMedication(e) {
    const medicationName = e.target.getAttribute("data-name");
    selectedMedication = medicationDatabase.find(
      (med) => med.name === medicationName
    );

    if (selectedMedication) {
      // Update the form with the selected medication
      document.getElementById("rx-medication").value = selectedMedication.name;

      // Display medication details
      const medicationDetails = document.getElementById(
        "rx-medication-details"
      );
      medicationDetails.innerHTML = `
        <div class="medication-info">
          <h3>${selectedMedication.name}</h3>
          <p><strong>Class:</strong> ${selectedMedication.class}</p>
          <p><strong>Used for:</strong> ${selectedMedication.usedFor}</p>
          <p><strong>Side Effects:</strong> ${selectedMedication.sideEffects}</p>
        </div>
      `;

      // Check for interactions with current medications
      const patientId = document.getElementById("rx-patient-id").textContent;
      const patient = patients.find((p) => p.id === patientId);

      if (patient && patient.medications) {
        const interactionWarnings = document.getElementById(
          "rx-interaction-warnings"
        );
        interactionWarnings.innerHTML = "";

        // Split the patient's medications into an array
        const currentMeds = patient.medications
          .split(",")
          .map((med) => med.trim());

        // Check if any of the patient's current medications interact with the selected medication
        const interactions = [];

        // Check for interactions based on medication names
        for (const med of currentMeds) {
          const medName = med.split(" ")[0]; // Get just the name part
          if (
            selectedMedication.interactsWith.some(
              (inter) =>
                inter.toLowerCase().includes(medName.toLowerCase()) ||
                medicationDatabase
                  .find((m) => m.name.toLowerCase() === medName.toLowerCase())
                  ?.class.toLowerCase() === inter.toLowerCase()
            )
          ) {
            interactions.push(med);
          }
        }

        // Check for contraindications based on patient's medical conditions
        const contraindications = [];
        if (patient.medicalConditions) {
          const conditions = patient.medicalConditions
            .split(",")
            .map((c) => c.trim());
          for (const condition of conditions) {
            if (
              selectedMedication.contraindications.some((contra) =>
                contra.toLowerCase().includes(condition.toLowerCase())
              )
            ) {
              contraindications.push(condition);
            }
          }
        }

        // Check for allergies
        const allergies = [];
        if (
          patient.allergies &&
          patient.allergies
            .toLowerCase()
            .includes(selectedMedication.name.toLowerCase())
        ) {
          allergies.push(selectedMedication.name);
        }

        // Display warnings for interactions, contraindications, and allergies
        if (
          interactions.length > 0 ||
          contraindications.length > 0 ||
          allergies.length > 0
        ) {
          interactionWarnings.classList.add("warning-box");

          if (allergies.length > 0) {
            interactionWarnings.innerHTML += `
              <p class="warning-severe"><strong>⚠️ SEVERE WARNING:</strong> Patient is allergic to this medication!</p>
            `;
          }

          if (contraindications.length > 0) {
            interactionWarnings.innerHTML += `
              <p class="warning-high"><strong>⚠️ CONTRAINDICATION:</strong> This medication may be contraindicated for this patient's condition(s): ${contraindications.join(
                ", "
              )}</p>
            `;
          }

          if (interactions.length > 0) {
            interactionWarnings.innerHTML += `
              <p class="warning-medium"><strong>⚠️ INTERACTION ALERT:</strong> This medication may interact with the patient's current medication(s): ${interactions.join(
                ", "
              )}</p>
            `;
          }
        }
      }

      // Close the medication search results
      document.querySelector(".medication-search-results").innerHTML = "";
    }
  }

  // Add visit form submission handler
  if (visitForm) {
    visitForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const visitNotes = document.getElementById("visit-notes").value;
      const diagnosis = document.getElementById("visit-diagnosis").value;
      const treatment = document.getElementById("visit-treatment").value;

      if (currentPatientId && currentAppointmentId) {
        // Update appointment status
        const appointment = appointments.find(
          (a) => a.id === currentAppointmentId
        );
        if (appointment) {
          appointment.status = "completed";
          appointment.notes = `${appointment.notes}\nDiagnosis: ${diagnosis}\nTreatment: ${treatment}\nProvider Notes: ${visitNotes}`;
        }

        // Update patient notes
        const patient = patients.find((p) => p.id === currentPatientId);
        if (patient) {
          const today = new Date().toISOString().split("T")[0];
          patient.notes = `[${today}] ${diagnosis}. ${treatment}. ${visitNotes}\n${
            patient.notes || ""
          }`;
          patient.lastVisit = today;
        }

        // Update UI
        renderPatientQueue();

        // Close the modal
        visitModal.style.display = "none";

        // Show success message
        showNotification("Visit completed successfully", "success");

        // Ask if they want to add a prescription
        setTimeout(() => {
          if (
            confirm("Would you like to add a prescription for this patient?")
          ) {
            handleNewPrescription({
              target: { getAttribute: () => currentPatientId },
            });
          }
        }, 500);
      }
    });
  }

  // Complete the visitForm submission handler
  if (visitForm) {
    visitForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const visitNotes = document.getElementById("visit-notes").value;
      const diagnosis = document.getElementById("visit-diagnosis").value;
      const treatment = document.getElementById("visit-treatment").value;

      if (!visitNotes || !diagnosis || !treatment) {
        showNotification("Please complete all required fields", "error");
        return;
      }

      // Update the appointment status
      const appointmentId = currentAppointmentId;
      const appointmentIndex = appointments.findIndex(
        (a) => a.id === appointmentId
      );

      if (appointmentIndex !== -1) {
        appointments[appointmentIndex].status = "completed";

        // Update the patient record
        const patientId = appointments[appointmentIndex].patientId;
        const patientIndex = patients.findIndex((p) => p.id === patientId);

        if (patientIndex !== -1) {
          // Update last visit date
          patients[patientIndex].lastVisit = new Date()
            .toISOString()
            .split("T")[0];

          // Add visit notes to patient record
          const visitEntry = {
            date: appointments[appointmentIndex].date,
            provider: "Dr. James Wilson",
            reason: appointments[appointmentIndex].reason,
            diagnosis: diagnosis,
            treatment: treatment,
            notes: visitNotes,
          };

          // You would normally send this to a backend
          console.log("Visit completed:", visitEntry);

          showNotification("Visit completed successfully", "success");
          visitModal.style.display = "none";

          // Update the UI
          renderPatientQueue();
        }
      }
    });
  }

  // Complete the prescription form submission handler
  if (prescriptionForm) {
    prescriptionForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const medication = document.getElementById("rx-medication").value;
      const dosage = document.getElementById("rx-dosage").value;
      const frequency = document.getElementById("rx-frequency").value;
      const duration = document.getElementById("rx-duration").value;
      const instructions = document.getElementById("rx-instructions").value;
      const notes = document.getElementById("rx-notes").value;

      if (!medication || !dosage || !frequency || !duration || !instructions) {
        showNotification("Please complete all required fields", "error");
        return;
      }

      // Get patient info
      const patientId = document.getElementById("rx-patient-id").textContent;
      const patientName =
        document.getElementById("rx-patient-name").textContent;

      // Calculate end date
      const startDate = new Date().toISOString().split("T")[0];
      const endDate = new Date();
      endDate.setDate(endDate.getDate() + parseInt(duration));

      // Create new prescription
      const newPrescription = {
        id: prescriptions.length + 1,
        patientId: patientId,
        patientName: patientName,
        medication: medication,
        dosage: dosage,
        frequency: frequency,
        startDate: startDate,
        endDate: endDate.toISOString().split("T")[0],
        instructions: instructions,
        prescribedBy: "Dr. James Wilson",
        active: true,
        notes: notes,
      };

      // Add to prescriptions array
      prescriptions.push(newPrescription);

      // In a real app, you would save to the backend
      console.log("New prescription added:", newPrescription);

      showNotification("Prescription added successfully", "success");
      newPrescriptionModal.style.display = "none";

      // Update patient's medications list
      const patientIndex = patients.findIndex((p) => p.id === patientId);
      if (patientIndex !== -1) {
        const newMedText = `${medication} ${dosage} ${frequency}`;

        if (
          patients[patientIndex].medications === "None" ||
          !patients[patientIndex].medications
        ) {
          patients[patientIndex].medications = newMedText;
        } else {
          patients[patientIndex].medications += `, ${newMedText}`;
        }
      }
    });
  }

  // Close view patient modal
  if (viewPatientModalClose) {
    viewPatientModalClose.addEventListener("click", function () {
      viewPatientModal.style.display = "none";
    });
  }

  // Close new prescription modal
  if (newPrescriptionModalClose) {
    newPrescriptionModalClose.addEventListener("click", function () {
      newPrescriptionModal.style.display = "none";
    });
  }

  // Close visit modal
  if (visitModalClose) {
    visitModalClose.addEventListener("click", function () {
      if (
        confirm(
          "Are you sure you want to close? Any unsaved information will be lost."
        )
      ) {
        visitModal.style.display = "none";
      }
    });
  }

  // Close medication details modal
  if (medicationDetailsModalClose) {
    medicationDetailsModalClose.addEventListener("click", function () {
      medicationDetailsModal.style.display = "none";
    });
  }

  // Handle clicking outside modals
  window.addEventListener("click", function (e) {
    if (e.target === viewPatientModal) {
      viewPatientModal.style.display = "none";
    }
    if (e.target === newPrescriptionModal) {
      if (
        confirm(
          "Are you sure you want to close? Any unsaved information will be lost."
        )
      ) {
        newPrescriptionModal.style.display = "none";
      }
    }
    if (e.target === visitModal) {
      if (
        confirm(
          "Are you sure you want to close? Any unsaved information will be lost."
        )
      ) {
        visitModal.style.display = "none";
      }
    }
    if (e.target === medicationDetailsModal) {
      medicationDetailsModal.style.display = "none";
    }
  });

  // Add tab navigation in patient view
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
  renderPatientQueue();

  // Add event listener for new-patient-rx-btn
  document
    .getElementById("new-patient-rx-btn")
    ?.addEventListener("click", function () {
      if (currentPatientId) {
        // Use the existing handleNewPrescription function with current patient ID
        handleNewPrescription({
          target: { getAttribute: () => currentPatientId },
        });
      }
    });

  // Event handler for Order Labs button
  document
    .getElementById("order-labs-btn")
    ?.addEventListener("click", function () {
      if (!currentPatientId) return;

      const patient = patients.find((p) => p.id === currentPatientId);
      if (!patient) return;

      // Populate patient info in the labs modal
      document.getElementById(
        "labs-patient-name"
      ).textContent = `${patient.firstName} ${patient.lastName}`;
      document.getElementById("labs-patient-id").textContent = patient.id;

      // Clear checkboxes and form fields
      document
        .querySelectorAll('#order-labs-form input[type="checkbox"]')
        .forEach((checkbox) => {
          checkbox.checked = false;
        });
      document.getElementById("labs-notes").value = "";
      document.getElementById("labs-urgency").value = "routine";

      // Show the modal
      document.getElementById("order-labs-modal").style.display = "flex";
    });

  // Event handler for Order Imaging button
  document
    .getElementById("order-imaging-btn")
    ?.addEventListener("click", function () {
      if (!currentPatientId) return;

      const patient = patients.find((p) => p.id === currentPatientId);
      if (!patient) return;

      // Populate patient info in the imaging modal
      document.getElementById(
        "imaging-patient-name"
      ).textContent = `${patient.firstName} ${patient.lastName}`;
      document.getElementById("imaging-patient-id").textContent = patient.id;

      // Clear form fields
      document
        .querySelectorAll('#order-imaging-form input[type="radio"]')
        .forEach((radio) => {
          radio.checked = false;
        });
      document.getElementById("imaging-area").value = "";
      document.getElementById("imaging-reason").value = "";
      document.getElementById("imaging-notes").value = "";
      document.getElementById("imaging-urgency").value = "routine";

      // Show the modal
      document.getElementById("order-imaging-modal").style.display = "flex";
    });

  // Event handler for new-rx-btn in visit modal
  document.getElementById("new-rx-btn")?.addEventListener("click", function () {
    if (currentPatientId) {
      // First minimize the visit modal
      visitModal.style.display = "none";

      // Then use the existing handleNewPrescription function with current patient ID
      handleNewPrescription({
        target: { getAttribute: () => currentPatientId },
      });
    }
  });

  // Lab order form submission handler
  const orderLabsForm = document.getElementById("order-labs-form");
  if (orderLabsForm) {
    orderLabsForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get selected tests
      const selectedTests = [];
      document
        .querySelectorAll('input[name="lab_tests"]:checked')
        .forEach((checkbox) => {
          selectedTests.push(checkbox.value);
        });

      if (selectedTests.length === 0) {
        showNotification("Please select at least one test", "error");
        return;
      }

      const notes = document.getElementById("labs-notes").value;
      const urgency = document.getElementById("labs-urgency").value;

      // In a real application, you would send this to a backend
      // For demo purposes, just show a notification
      showNotification(
        `Lab order submitted for ${selectedTests.length} tests with ${urgency} priority`,
        "success"
      );

      // Close the modal
      document.getElementById("order-labs-modal").style.display = "none";

      // Update the visit form to mention the ordered tests
      const visitNotes = document.getElementById("visit-notes");
      if (visitNotes) {
        const currentNotes = visitNotes.value;
        const testsOrdered = selectedTests.join(", ");
        visitNotes.value =
          currentNotes +
          (currentNotes ? "\n\n" : "") +
          `Ordered ${urgency} priority laboratory tests: ${testsOrdered}${
            notes ? ". Notes: " + notes : ""
          }`;
      }

      // Show the visit modal again
      visitModal.style.display = "flex";
    });
  }

  // Imaging order form submission handler
  const orderImagingForm = document.getElementById("order-imaging-form");
  if (orderImagingForm) {
    orderImagingForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get selected imaging type
      const selectedType = document.querySelector(
        'input[name="imaging_type"]:checked'
      )?.value;

      if (!selectedType) {
        showNotification("Please select an imaging type", "error");
        return;
      }

      const bodyArea = document.getElementById("imaging-area").value;
      if (!bodyArea) {
        showNotification("Please select a body area", "error");
        return;
      }

      const reason = document.getElementById("imaging-reason").value;
      const notes = document.getElementById("imaging-notes").value;
      const urgency = document.getElementById("imaging-urgency").value;

      // In a real application, you would send this to a backend
      // For demo purposes, just show a notification
      showNotification(
        `${selectedType} order submitted for ${bodyArea} with ${urgency} priority`,
        "success"
      );

      // Close the modal
      document.getElementById("order-imaging-modal").style.display = "none";

      // Update the visit form to mention the ordered imaging
      const visitNotes = document.getElementById("visit-notes");
      if (visitNotes) {
        const currentNotes = visitNotes.value;
        visitNotes.value =
          currentNotes +
          (currentNotes ? "\n\n" : "") +
          `Ordered ${urgency} priority ${selectedType} of ${bodyArea}. Reason: ${reason}${
            notes ? ". Notes: " + notes : ""
          }`;
      }

      // Show the visit modal again
      visitModal.style.display = "flex";
    });
  }

  // Close handlers for the lab and imaging modals
  document
    .querySelector(".order-labs-modal-close")
    ?.addEventListener("click", function () {
      document.getElementById("order-labs-modal").style.display = "none";
    });

  document
    .querySelector(".order-imaging-modal-close")
    ?.addEventListener("click", function () {
      document.getElementById("order-imaging-modal").style.display = "none";
    });

  document
    .querySelector(".cancel-labs-btn")
    ?.addEventListener("click", function () {
      document.getElementById("order-labs-modal").style.display = "none";
    });

  document
    .querySelector(".cancel-imaging-btn")
    ?.addEventListener("click", function () {
      document.getElementById("order-imaging-modal").style.display = "none";
    });

  // Add the lab and imaging modals to the window click handler
  window.addEventListener("click", function (e) {
    const orderLabsModal = document.getElementById("order-labs-modal");
    const orderImagingModal = document.getElementById("order-imaging-modal");

    if (e.target === orderLabsModal) {
      orderLabsModal.style.display = "none";
    }
    if (e.target === orderImagingModal) {
      orderImagingModal.style.display = "none";
    }
  });

  // Complete the handleSelectMedication and other incomplete functions
  // (These portions were cut off in the provided code with "..." ellipses)

  // Complete the check contraindications against conditions code
  function handleSelectMedication(e) {
    const medicationName = e.target.getAttribute("data-name");
    const medication = medicationDatabase.find(
      (med) => med.name === medicationName
    );

    if (medication) {
      // Store selected medication
      selectedMedication = medication;

      // Update the form
      document.getElementById("rx-medication").value = medication.name;

      // Display medication details
      const detailsDiv = document.getElementById("rx-medication-details");
      detailsDiv.innerHTML = `
        <p><strong>Class:</strong> ${medication.class}</p>
        <p><strong>Used for:</strong> ${medication.usedFor}</p>
        <p><strong>Side effects:</strong> ${medication.sideEffects}</p>
      `;

      // Check for interactions and contraindications
      if (currentPatientId) {
        const patient = patients.find((p) => p.id === currentPatientId);
        const activeRx = prescriptions.filter(
          (rx) => rx.patientId === currentPatientId && rx.active
        );

        const warningsDiv = document.getElementById("rx-interaction-warnings");
        warningsDiv.innerHTML = "";

        let hasWarnings = false;

        // Check allergies
        if (
          patient.allergies &&
          patient.allergies
            .toLowerCase()
            .includes(medication.name.toLowerCase())
        ) {
          const warningEl = document.createElement("div");
          warningEl.className = "warning severe";
          warningEl.innerHTML = `<strong>ALLERGY ALERT:</strong> Patient is allergic to ${medication.name}`;
          warningsDiv.appendChild(warningEl);
          hasWarnings = true;
        }

        // Check contraindications against conditions
        if (patient.medicalConditions) {
          medication.contraindications.forEach((contraindication) => {
            if (
              patient.medicalConditions
                .toLowerCase()
                .includes(contraindication.toLowerCase())
            ) {
              const warningEl = document.createElement("div");
              warningEl.className = "warning severe";
              warningEl.innerHTML = `<strong>CONTRAINDICATION:</strong> ${medication.name} is contraindicated for patients with ${contraindication}`;
              warningsDiv.appendChild(warningEl);
              hasWarnings = true;
            }
          });
        }

        // Check drug interactions
        activeRx.forEach((rx) => {
          // Find the medication in the database
          const rxMed = medicationDatabase.find(
            (med) => med.name.toLowerCase() === rx.medication.toLowerCase()
          );

          if (rxMed) {
            // Check if current med interacts with this one
            if (
              medication.interactsWith.some(
                (inter) =>
                  rxMed.name.toLowerCase().includes(inter.toLowerCase()) ||
                  rxMed.class.toLowerCase().includes(inter.toLowerCase())
              )
            ) {
              const warningEl = document.createElement("div");
              warningEl.className = "warning moderate";
              warningEl.innerHTML = `<strong>INTERACTION:</strong> ${medication.name} may interact with ${rx.medication}`;
              warningsDiv.appendChild(warningEl);
              hasWarnings = true;
            }

            // Check if this med interacts with current
            if (
              rxMed.interactsWith.some(
                (inter) =>
                  medication.name.toLowerCase().includes(inter.toLowerCase()) ||
                  medication.class.toLowerCase().includes(inter.toLowerCase())
              )
            ) {
              const warningEl = document.createElement("div");
              warningEl.className = "warning moderate";
              warningEl.innerHTML = `<strong>INTERACTION:</strong> ${rx.medication} may interact with ${medication.name}`;
              warningsDiv.appendChild(warningEl);
              hasWarnings = true;
            }
          }
        });

        if (!hasWarnings) {
          warningsDiv.innerHTML =
            "<p>No interactions or contraindications detected</p>";
        }
      }
    }
  }

  // Complete the appointment update code in the visit form submission handler
  if (visitForm) {
    visitForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const visitNotes = document.getElementById("visit-notes").value;
      const diagnosis = document.getElementById("visit-diagnosis").value;
      const treatment = document.getElementById("visit-treatment").value;

      if (currentPatientId && currentAppointmentId) {
        // Update appointment status
        const appointment = appointments.find(
          (a) => a.id === currentAppointmentId
        );
        if (appointment) {
          appointment.status = "completed";
          appointment.notes = `${appointment.notes}\nDiagnosis: ${diagnosis}\nTreatment: ${treatment}\nProvider Notes: ${visitNotes}`;
        }

        // Update patient notes
        const patient = patients.find((p) => p.id === currentPatientId);
        if (patient) {
          const today = new Date().toISOString().split("T")[0];
          patient.notes = `[${today}] ${diagnosis}. ${treatment}. ${visitNotes}\n${
            patient.notes || ""
          }`;
          patient.lastVisit = today;
        }

        // Update UI
        renderPatientQueue();

        // Close the modal
        visitModal.style.display = "none";

        // Show success message
        showNotification("Visit completed successfully", "success");

        // Ask if they want to add a prescription
        setTimeout(() => {
          if (
            confirm("Would you like to add a prescription for this patient?")
          ) {
            handleNewPrescription({
              target: { getAttribute: () => currentPatientId },
            });
          }
        }, 500);
      }
    });
  }

  // Complete the prescription form submission handler
  if (prescriptionForm) {
    prescriptionForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const medication = document.getElementById("rx-medication").value;
      const dosage = document.getElementById("rx-dosage").value;
      const frequency = document.getElementById("rx-frequency").value;
      const duration = document.getElementById("rx-duration").value;
      const instructions = document.getElementById("rx-instructions").value;
      const notes = document.getElementById("rx-notes").value;

      if (!medication || !dosage || !frequency || !duration || !instructions) {
        showNotification("Please complete all required fields", "error");
        return;
      }

      // Get patient info
      const patientId = document.getElementById("rx-patient-id").textContent;
      const patientName =
        document.getElementById("rx-patient-name").textContent;

      // Calculate end date
      const startDate = new Date().toISOString().split("T")[0];
      const endDate = new Date();
      endDate.setDate(endDate.getDate() + parseInt(duration));

      // Create new prescription
      const newPrescription = {
        id: prescriptions.length + 1,
        patientId: patientId,
        patientName: patientName,
        medication: medication,
        dosage: dosage,
        frequency: frequency,
        startDate: startDate,
        endDate: endDate.toISOString().split("T")[0],
        instructions: instructions,
        prescribedBy: "Dr. James Wilson",
        active: true,
        notes: notes,
      };

      // Add to prescriptions array
      prescriptions.push(newPrescription);

      // In a real app, you would save to the backend
      console.log("New prescription added:", newPrescription);

      showNotification("Prescription added successfully", "success");
      newPrescriptionModal.style.display = "none";

      // Update patient's medications list
      const patientIndex = patients.findIndex((p) => p.id === patientId);
      if (patientIndex !== -1) {
        const newMedText = `${medication} ${dosage} ${frequency}`;

        if (
          patients[patientIndex].medications === "None" ||
          !patients[patientIndex].medications
        ) {
          patients[patientIndex].medications = newMedText;
        } else {
          patients[patientIndex].medications += `, ${newMedText}`;
        }
      }
    });
  }

  // Complete the view-rx-btn click handler
  document.querySelectorAll(".view-rx-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const rxId = parseInt(this.getAttribute("data-id"));
      const rx = prescriptions.find((p) => p.id === rxId);

      if (rx) {
        // For now, just show alert with prescription details
        // In a real application, you'd show this in a modal
        alert(
          `Prescription details:\n${rx.medication} ${rx.dosage} ${
            rx.frequency
          }\nFor ${rx.patientName}\nInstructions: ${
            rx.instructions
          }\nDates: ${formatDate(rx.startDate)} to ${formatDate(
            rx.endDate
          )}\nPrescribed by: ${rx.prescribedBy}\nNotes: ${rx.notes || "None"}`
        );
      }
    });
  });
});
