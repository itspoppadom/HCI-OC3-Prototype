document.addEventListener("DOMContentLoaded", function () {
  // Check if user is claims examiner
  const userRole = sessionStorage.getItem("userRole");
  if (userRole !== "Claims Examiner" && userRole !== "Administrator") {
    window.location.href = "../html/index.html";
    return;
  }

  // Mock data for claims
  let claims = [
    {
      id: "CLM-20231105-001",
      patientName: "John Smith",
      patientId: "P-10001",
      providerName: "Dr. Martinez",
      providerId: "DR-001",
      amount: 350.0,
      date: "2023-11-05",
      serviceDate: "2023-11-01",
      serviceDescription: "Annual physical examination",
      status: "Pending",
      insuranceId: "INS-HP-12345",
      insuranceProvider: "HealthPlus",
      notes: "Patient has reached 80% of annual deductible",
      attachments: ["medical_report_10001.pdf", "lab_results_10001.pdf"],
      billingCodes: ["99215", "85025"],
    },
    {
      id: "CLM-20231105-002",
      patientName: "Mary Johnson",
      patientId: "P-10002",
      providerName: "Dr. Williams",
      providerId: "DR-002",
      amount: 125.0,
      date: "2023-11-05",
      serviceDate: "2023-11-02",
      serviceDescription: "Follow-up consultation",
      status: "Pending",
      insuranceId: "INS-MC-67890",
      insuranceProvider: "MediCare",
      notes: "Follow-up for previously approved treatment",
      attachments: ["follow_up_notes_10002.pdf"],
      billingCodes: ["99213"],
    },
    {
      id: "CLM-20231104-015",
      patientName: "Robert Brown",
      patientId: "P-10003",
      providerName: "Dr. Martinez",
      providerId: "DR-001",
      amount: 550.0,
      date: "2023-11-04",
      serviceDate: "2023-11-03",
      serviceDescription: "MRI Scan - Lower back",
      status: "Documentation Required",
      insuranceId: "INS-BC-54321",
      insuranceProvider: "BlueCross",
      notes: "Additional documentation needed for MRI authorization",
      attachments: ["initial_assessment_10003.pdf"],
      billingCodes: ["72148", "99212"],
    },
    {
      id: "CLM-20231103-008",
      patientName: "Sarah Davis",
      patientId: "P-10004",
      providerName: "Dr. Adams",
      providerId: "DR-003",
      amount: 275.5,
      date: "2023-11-03",
      serviceDate: "2023-10-30",
      serviceDescription: "Migraine treatment",
      status: "Approved",
      insuranceId: "INS-HP-67890",
      insuranceProvider: "HealthPlus",
      notes: "Recurring treatment, previously approved",
      attachments: ["treatment_notes_10004.pdf", "prescription_10004.pdf"],
      billingCodes: ["99214", "96372"],
    },
    {
      id: "CLM-20231103-009",
      patientName: "Michael Wilson",
      patientId: "P-10005",
      providerName: "Dr. Roberts",
      providerId: "DR-004",
      amount: 420.75,
      date: "2023-11-03",
      serviceDate: "2023-10-28",
      serviceDescription: "Arthritis treatment and joint assessment",
      status: "Rejected",
      insuranceId: "INS-MC-12345",
      insuranceProvider: "Medicare",
      notes: "Service not covered under current plan",
      attachments: ["treatment_plan_10005.pdf", "patient_history_10005.pdf"],
      billingCodes: ["99213", "20610"],
    },
    {
      id: "CLM-20231102-023",
      patientName: "Jennifer Lopez",
      patientId: "P-10006",
      providerName: "Dr. Williams",
      providerId: "DR-002",
      amount: 180.25,
      date: "2023-11-02",
      serviceDate: "2023-10-27",
      serviceDescription: "Blood tests",
      status: "Approved",
      insuranceId: "INS-BC-98765",
      insuranceProvider: "BlueCross",
      notes: "Routine tests, covered at 100%",
      attachments: ["lab_request_10006.pdf", "lab_results_10006.pdf"],
      billingCodes: ["85025", "80053"],
    },
    {
      id: "CLM-20231102-024",
      patientName: "David Miller",
      patientId: "P-10007",
      providerName: "Dr. Martinez",
      providerId: "DR-001",
      amount: 650.0,
      date: "2023-11-02",
      serviceDate: "2023-10-25",
      serviceDescription: "X-ray and orthopedic consultation",
      status: "Partially Approved",
      insuranceId: "INS-HP-54321",
      insuranceProvider: "HealthPlus",
      notes: "X-ray approved, specialist consultation requires review",
      attachments: ["x_ray_report_10007.pdf", "orthopedic_notes_10007.pdf"],
      billingCodes: ["73030", "99243"],
    },
    {
      id: "CLM-20231101-017",
      patientName: "Lisa Chen",
      patientId: "P-10008",
      providerName: "Dr. Adams",
      providerId: "DR-003",
      amount: 320.5,
      date: "2023-11-01",
      serviceDate: "2023-10-24",
      serviceDescription: "Vaccination and wellness checkup",
      status: "Approved",
      insuranceId: "INS-BC-24680",
      insuranceProvider: "BlueCross",
      notes: "Preventive care fully covered",
      attachments: ["vaccination_record_10008.pdf"],
      billingCodes: ["90715", "99395"],
    },
    {
      id: "CLM-20231101-018",
      patientName: "James Taylor",
      patientId: "P-10009",
      providerName: "Dr. Roberts",
      providerId: "DR-004",
      amount: 850.0,
      date: "2023-11-01",
      serviceDate: "2023-10-23",
      serviceDescription: "Emergency room visit - chest pain",
      status: "Under Review",
      insuranceId: "INS-MC-13579",
      insuranceProvider: "Medicare",
      notes: "Emergency service, needs medical necessity verification",
      attachments: [
        "er_report_10009.pdf",
        "ekg_results_10009.pdf",
        "discharge_summary_10009.pdf",
      ],
      billingCodes: ["99285", "93000"],
    },
    {
      id: "CLM-20231031-011",
      patientName: "Emily Johnson",
      patientId: "P-10010",
      providerName: "Dr. Williams",
      providerId: "DR-002",
      amount: 195.75,
      date: "2023-10-31",
      serviceDate: "2023-10-20",
      serviceDescription: "Dermatology consultation",
      status: "Approved",
      insuranceId: "INS-HP-97531",
      insuranceProvider: "HealthPlus",
      notes: "Specialist visit, referral confirmed",
      attachments: ["dermatology_notes_10010.pdf", "prescription_10010.pdf"],
      billingCodes: ["99243"],
    },
  ];

  // Weekly claim statistics for the chart
  const weeklyStats = {
    approved: 4,
    rejected: 1,
    pending: 2,
    partiallyApproved: 1,
    underReview: 1,
    documentationRequired: 1,
  };

  // Elements
  const claimsQueue = document.querySelector(".claims-queue tbody");
  const claimSearch = document.getElementById("claim-search");
  const claimModal = document.getElementById("claim-modal");
  const claimModalClose = document.querySelector(".claim-modal-close");
  const claimForm = document.getElementById("claim-form");
  const pendingClaimsTable = document.querySelector(
    "#pending-claims table tbody"
  );
  const approvedClaimsTable = document.querySelector(
    "#approved-claims table tbody"
  );
  const rejectedClaimsTable = document.querySelector(
    "#rejected-claims table tbody"
  );
  const chartCanvas = document.getElementById("claims-chart");
  const gridViewBtn = document.getElementById("grid-view-btn");
  const listViewBtn = document.getElementById("list-view-btn");
  const claimsDisplay = document.querySelector(".claims-display");

  // Current claim being viewed
  let currentClaimId = null;

  // Initialize the claims queue
  function renderClaimsQueue() {
    if (!claimsQueue) return;

    // Clear the table
    claimsQueue.innerHTML = "";

    // Filter for recent claims
    const recentClaims = claims.slice(0, 3);

    // Create rows for each claim
    recentClaims.forEach((claim) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${claim.id}</td>
        <td>${claim.patientName}</td>
        <td>${claim.providerName}</td>
        <td>$${claim.amount.toFixed(2)}</td>
        <td>${formatDate(claim.date)}</td>
        <td><span class="status-badge ${claim.status
          .toLowerCase()
          .replace(/\s+/g, "-")}">${claim.status}</span></td>
        <td><button class="action-btn review-claim-btn" data-id="${
          claim.id
        }">Review</button></td>
      `;
      claimsQueue.appendChild(tr);
    });

    // Add event listeners to review buttons
    document.querySelectorAll(".review-claim-btn").forEach((btn) => {
      btn.addEventListener("click", handleReviewClaim);
    });
  }

  // Initialize the claims by status tabs
  function renderClaimsByStatus() {
    if (!pendingClaimsTable || !approvedClaimsTable || !rejectedClaimsTable)
      return;

    // Clear tables
    pendingClaimsTable.innerHTML = "";
    approvedClaimsTable.innerHTML = "";
    rejectedClaimsTable.innerHTML = "";

    // Filter claims by status
    const pendingClaims = claims.filter(
      (claim) =>
        claim.status === "Pending" ||
        claim.status === "Documentation Required" ||
        claim.status === "Under Review"
    );
    const approvedClaims = claims.filter(
      (claim) =>
        claim.status === "Approved" || claim.status === "Partially Approved"
    );
    const rejectedClaims = claims.filter(
      (claim) => claim.status === "Rejected"
    );

    // Populate pending claims
    pendingClaims.forEach((claim) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${claim.id}</td>
        <td>${claim.patientName}</td>
        <td>${claim.providerName}</td>
        <td>$${claim.amount.toFixed(2)}</td>
        <td>${formatDate(claim.date)}</td>
        <td><span class="status-badge ${claim.status
          .toLowerCase()
          .replace(/\s+/g, "-")}">${claim.status}</span></td>
        <td><button class="action-btn review-claim-btn" data-id="${
          claim.id
        }">Review</button></td>
      `;
      pendingClaimsTable.appendChild(tr);
    });

    // Populate approved claims
    approvedClaims.forEach((claim) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${claim.id}</td>
        <td>${claim.patientName}</td>
        <td>${claim.providerName}</td>
        <td>$${claim.amount.toFixed(2)}</td>
        <td>${formatDate(claim.date)}</td>
        <td><span class="status-badge ${claim.status
          .toLowerCase()
          .replace(/\s+/g, "-")}">${claim.status}</span></td>
        <td><button class="action-btn view-claim-btn" data-id="${
          claim.id
        }">View</button></td>
      `;
      approvedClaimsTable.appendChild(tr);
    });

    // Populate rejected claims
    rejectedClaims.forEach((claim) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${claim.id}</td>
        <td>${claim.patientName}</td>
        <td>${claim.providerName}</td>
        <td>$${claim.amount.toFixed(2)}</td>
        <td>${formatDate(claim.date)}</td>
        <td><span class="status-badge ${claim.status
          .toLowerCase()
          .replace(/\s+/g, "-")}">${claim.status}</span></td>
        <td><button class="action-btn view-claim-btn" data-id="${
          claim.id
        }">View</button></td>
      `;
      rejectedClaimsTable.appendChild(tr);
    });

    // Add event listeners
    document
      .querySelectorAll(".review-claim-btn, .view-claim-btn")
      .forEach((btn) => {
        btn.addEventListener("click", handleReviewClaim);
      });
  }

  // Initialize the claims chart
  function initializeClaimsChart() {
    if (!chartCanvas) return;

    const ctx = chartCanvas.getContext("2d");

    // Using Chart.js if available
    if (typeof Chart !== "undefined") {
      new Chart(ctx, {
        type: "bar",
        data: {
          labels: [
            "Approved",
            "Rejected",
            "Pending",
            "Partially Approved",
            "Under Review",
            "Documentation Required",
          ],
          datasets: [
            {
              label: "Claims This Week",
              data: [
                weeklyStats.approved,
                weeklyStats.rejected,
                weeklyStats.pending,
                weeklyStats.partiallyApproved,
                weeklyStats.underReview,
                weeklyStats.documentationRequired,
              ],
              backgroundColor: [
                "rgba(75, 192, 192, 0.6)", // Approved - teal
                "rgba(255, 99, 132, 0.6)", // Rejected - red
                "rgba(255, 206, 86, 0.6)", // Pending - yellow
                "rgba(153, 102, 255, 0.6)", // Partially Approved - purple
                "rgba(54, 162, 235, 0.6)", // Under Review - blue
                "rgba(255, 159, 64, 0.6)", // Documentation Required - orange
              ],
              borderColor: [
                "rgba(75, 192, 192, 1)",
                "rgba(255, 99, 132, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 159, 64, 1)",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                precision: 0,
              },
            },
          },
        },
      });
    } else {
      // Fallback if Chart.js is not available - draw a simple canvas representation
      drawSimpleChart(ctx);
    }
  }

  // Fallback simple chart drawing function
  function drawSimpleChart(ctx) {
    const width = chartCanvas.width;
    const height = chartCanvas.height;
    const barWidth = width / 6 - 20;
    const maxValue = Math.max(
      weeklyStats.approved,
      weeklyStats.rejected,
      weeklyStats.pending,
      weeklyStats.partiallyApproved,
      weeklyStats.underReview,
      weeklyStats.documentationRequired
    );

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Draw bars
    const statuses = [
      "Approved",
      "Rejected",
      "Pending",
      "Partially",
      "Review",
      "Doc Required",
    ];
    const values = [
      weeklyStats.approved,
      weeklyStats.rejected,
      weeklyStats.pending,
      weeklyStats.partiallyApproved,
      weeklyStats.underReview,
      weeklyStats.documentationRequired,
    ];
    const colors = [
      "rgba(75, 192, 192, 0.6)", // Approved
      "rgba(255, 99, 132, 0.6)", // Rejected
      "rgba(255, 206, 86, 0.6)", // Pending
      "rgba(153, 102, 255, 0.6)", // Partially
      "rgba(54, 162, 235, 0.6)", // Review
      "rgba(255, 159, 64, 0.6)", // Doc Required
    ];

    for (let i = 0; i < statuses.length; i++) {
      const barHeight = (values[i] / maxValue) * (height - 60);

      // Draw bar
      ctx.fillStyle = colors[i];
      ctx.fillRect(
        i * (barWidth + 20) + 20,
        height - barHeight - 30,
        barWidth,
        barHeight
      );

      // Draw label
      ctx.fillStyle = "#333";
      ctx.font = "10px Arial";
      ctx.textAlign = "center";
      ctx.fillText(
        statuses[i],
        i * (barWidth + 20) + 20 + barWidth / 2,
        height - 15
      );

      // Draw value
      ctx.fillText(
        values[i].toString(),
        i * (barWidth + 20) + 20 + barWidth / 2,
        height - barHeight - 35
      );
    }

    // Draw title
    ctx.fillStyle = "#333";
    ctx.font = "bold 14px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Claims This Week", width / 2, 20);
  }

  // Handle claim search
  if (claimSearch) {
    claimSearch.addEventListener("input", function () {
      const searchTerm = this.value.toLowerCase();
      const claimsDisplay = document.querySelector(".claims-list");

      if (!claimsDisplay) return;

      // Clear display
      claimsDisplay.innerHTML = "";

      if (searchTerm.length < 2) {
        claimsDisplay.innerHTML =
          "<p>Enter at least 2 characters to search claims</p>";
        return;
      }

      // Filter claims
      const filteredClaims = claims.filter(
        (claim) =>
          claim.id.toLowerCase().includes(searchTerm) ||
          claim.patientName.toLowerCase().includes(searchTerm) ||
          claim.providerName.toLowerCase().includes(searchTerm)
      );

      if (filteredClaims.length === 0) {
        claimsDisplay.innerHTML = "<p>No claims found matching your search</p>";
        return;
      }

      // Display claims
      displayClaimsInGrid(filteredClaims, claimsDisplay);
    });
  }

  // Handle claim review
  function handleReviewClaim(e) {
    const claimId = e.target.getAttribute("data-id");
    const claim = claims.find((c) => c.id === claimId);

    if (claim) {
      // Populate the modal with claim details
      document.getElementById("claim-id").textContent = claim.id;
      document.getElementById("claim-patient").textContent = claim.patientName;
      document.getElementById("claim-patient-id").textContent = claim.patientId;
      document.getElementById("claim-provider").textContent =
        claim.providerName;
      document.getElementById(
        "claim-amount"
      ).textContent = `$${claim.amount.toFixed(2)}`;
      document.getElementById("claim-date").textContent = formatDate(
        claim.date
      );
      document.getElementById("claim-service-date").textContent = formatDate(
        claim.serviceDate
      );
      document.getElementById("claim-description").textContent =
        claim.serviceDescription;
      document.getElementById("claim-status").textContent = claim.status;
      document.getElementById("claim-insurance").textContent =
        claim.insuranceProvider;
      document.getElementById("claim-insurance-id").textContent =
        claim.insuranceId;
      document.getElementById("claim-notes").textContent = claim.notes;

      // Display billing codes
      const billingCodesList = document.getElementById("claim-billing-codes");
      billingCodesList.innerHTML = "";
      claim.billingCodes.forEach((code) => {
        const li = document.createElement("li");
        li.textContent = code;
        billingCodesList.appendChild(li);
      });

      // Display attachments
      const attachmentsList = document.getElementById("claim-attachments");
      attachmentsList.innerHTML = "";
      claim.attachments.forEach((attachment) => {
        const li = document.createElement("li");
        li.innerHTML = `<a href="#" class="attachment-link">${attachment}</a>`;
        attachmentsList.appendChild(li);
      });

      // Set up form based on current status
      const statusSelect = document.getElementById("new-status");
      statusSelect.value = claim.status;

      // Store current claim ID
      currentClaimId = claimId;

      // Show the modal
      claimModal.style.display = "flex";
    }
  }

  // Handle claim form submission
  if (claimForm) {
    claimForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const newStatus = document.getElementById("new-status").value;
      const newNotes = document.getElementById("examiner-notes").value;

      if (!newStatus) {
        showNotification("Please select a status", "error");
        return;
      }

      // Update the claim
      const claimIndex = claims.findIndex((c) => c.id === currentClaimId);
      if (claimIndex !== -1) {
        claims[claimIndex].status = newStatus;
        claims[claimIndex].notes += newNotes
          ? `\nExaminer note: ${newNotes}`
          : "";

        showNotification(
          `Claim ${currentClaimId} updated to ${newStatus}`,
          "success"
        );

        // Update UI
        renderClaimsQueue();
        renderClaimsByStatus();

        // Close modal
        claimModal.style.display = "none";
      }
    });
  }

  // Handle request information button
  const requestInfoBtn = document.getElementById("request-info-btn");
  if (requestInfoBtn) {
    requestInfoBtn.addEventListener("click", function () {
      // Get the current claim data from the review modal
      const claimId = document.getElementById("claim-id").textContent;
      const patientName = document.getElementById("claim-patient").textContent;
      const providerName =
        document.getElementById("claim-provider").textContent;
      const serviceDate =
        document.getElementById("claim-service-date").textContent;

      // Find the claim in our data
      const claim = claims.find((c) => c.id === claimId);
      if (!claim) {
        showNotification("Claim not found", "error");
        return;
      }

      // Close the claim review modal
      document.getElementById("claim-modal").style.display = "none";

      // Populate the request info modal
      document.getElementById("request-claim-id").textContent = claimId;
      document.getElementById("request-patient-name").textContent = patientName;
      document.getElementById("request-provider-name").textContent =
        providerName;
      document.getElementById("request-service-date").textContent = serviceDate;

      // Set a default deadline (14 days from today)
      const today = new Date();
      const twoWeeksLater = new Date(today.setDate(today.getDate() + 14));
      document.getElementById("request-deadline").valueAsDate = twoWeeksLater;

      // Show the request info modal
      document.getElementById("request-info-modal").style.display = "flex";
    });
  }

  // Handle request info form submission
  const requestInfoForm = document.getElementById("request-info-form");
  if (requestInfoForm) {
    requestInfoForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get the selected documents
      const selectedDocs = [];
      document
        .querySelectorAll('input[name="requested_docs"]:checked')
        .forEach((checkbox) => {
          selectedDocs.push(checkbox.value);
        });

      // Validate form inputs
      if (selectedDocs.length === 0) {
        showNotification("Please select at least one document", "error");
        return;
      }

      const deadline = document.getElementById("request-deadline").value;
      if (!deadline) {
        showNotification("Please select a deadline", "error");
        return;
      }

      // Get the claim ID from the request modal
      const claimId = document.getElementById("request-claim-id").textContent;
      const notes = document.getElementById("request-info-notes").value;

      // Update the claim in our data
      const claimIndex = claims.findIndex((c) => c.id === claimId);
      if (claimIndex !== -1) {
        // Update the claim status
        claims[claimIndex].status = "Documentation Required";

        // Add notes about the request
        const documentsRequested = selectedDocs.join(", ");
        const additionalNote = notes ? `\nDetails: ${notes}` : "";
        const noteEntry = `\nExaminer requested additional documents: ${documentsRequested}. Required by: ${formatDate(
          deadline
        )}.${additionalNote}`;

        claims[claimIndex].notes += noteEntry;

        // Hide the request info modal
        document.getElementById("request-info-modal").style.display = "none";

        // Show the confirmation modal
        document.getElementById("request-confirmation-modal").style.display =
          "flex";

        // Update the dashboard
        renderClaimsQueue();
        renderClaimsByStatus();
        updateDashboardStats();
      }
    });
  }

  // Close buttons for the request info modal
  const requestInfoModalClose = document.querySelector(
    ".request-info-modal-close"
  );
  if (requestInfoModalClose) {
    requestInfoModalClose.addEventListener("click", function () {
      document.getElementById("request-info-modal").style.display = "none";
    });
  }

  const cancelRequestBtn = document.querySelector(".cancel-request-btn");
  if (cancelRequestBtn) {
    cancelRequestBtn.addEventListener("click", function () {
      document.getElementById("request-info-modal").style.display = "none";
    });
  }

  // Close button for the confirmation modal
  const requestConfirmationModalClose = document.querySelector(
    ".request-confirmation-modal-close"
  );
  if (requestConfirmationModalClose) {
    requestConfirmationModalClose.addEventListener("click", function () {
      document.getElementById("request-confirmation-modal").style.display =
        "none";
    });
  }

  const closeConfirmationBtn = document.querySelector(
    ".close-confirmation-btn"
  );
  if (closeConfirmationBtn) {
    closeConfirmationBtn.addEventListener("click", function () {
      document.getElementById("request-confirmation-modal").style.display =
        "none";
    });
  }

  // Close modals when clicking outside
  window.addEventListener("click", function (e) {
    const requestInfoModal = document.getElementById("request-info-modal");
    if (e.target === requestInfoModal) {
      requestInfoModal.style.display = "none";
    }

    const requestConfirmationModal = document.getElementById(
      "request-confirmation-modal"
    );
    if (e.target === requestConfirmationModal) {
      requestConfirmationModal.style.display = "none";
    }
  });

  // Handle grid/list view toggle
  if (gridViewBtn && listViewBtn) {
    gridViewBtn.addEventListener("click", function () {
      this.classList.add("active");
      listViewBtn.classList.remove("active");

      // Switch to grid view
      const pendingClaims = claims.filter(
        (claim) =>
          claim.status === "Pending" ||
          claim.status === "Documentation Required" ||
          claim.status === "Under Review"
      );

      const claimsDisplay = document.querySelector(".claims-display");
      if (claimsDisplay) {
        displayClaimsInGrid(pendingClaims, claimsDisplay);
      }
    });

    listViewBtn.addEventListener("click", function () {
      this.classList.add("active");
      gridViewBtn.classList.remove("active");

      // Switch to list view
      const pendingClaims = claims.filter(
        (claim) =>
          claim.status === "Pending" ||
          claim.status === "Documentation Required" ||
          claim.status === "Under Review"
      );

      const claimsDisplay = document.querySelector(".claims-display");
      if (claimsDisplay) {
        displayClaimsInList(pendingClaims, claimsDisplay);
      }
    });
  }

  // Display claims in grid format
  function displayClaimsInGrid(claimsToDisplay, container) {
    container.innerHTML = "";
    container.className = "claims-display claims-grid";

    claimsToDisplay.forEach((claim) => {
      const card = document.createElement("div");
      card.className = "claim-card";
      card.innerHTML = `
        <div class="claim-card-header">
          <h3>${claim.id}</h3>
          <span class="status-badge ${claim.status
            .toLowerCase()
            .replace(/\s+/g, "-")}">${claim.status}</span>
        </div>
        <div class="claim-card-body">
          <p><strong>Patient:</strong> ${claim.patientName}</p>
          <p><strong>Provider:</strong> ${claim.providerName}</p>
          <p><strong>Amount:</strong> $${claim.amount.toFixed(2)}</p>
          <p><strong>Date:</strong> ${formatDate(claim.date)}</p>
          <p><strong>Service:</strong> ${claim.serviceDescription}</p>
        </div>
        <div class="claim-card-footer">
          <button class="action-btn review-claim-btn" data-id="${
            claim.id
          }">Review</button>
        </div>
      `;
      container.appendChild(card);
    });

    // Add event listeners
    document.querySelectorAll(".review-claim-btn").forEach((btn) => {
      btn.addEventListener("click", handleReviewClaim);
    });
  }

  // Display claims in list format
  function displayClaimsInList(claimsToDisplay, container) {
    container.innerHTML = "";
    container.className = "claims-display claims-list";

    const table = document.createElement("table");
    table.innerHTML = `
      <thead>
        <tr>
          <th>Claim ID</th>
          <th>Patient</th>
          <th>Provider</th>
          <th>Amount</th>
          <th>Date</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody></tbody>
    `;

    const tbody = table.querySelector("tbody");

    claimsToDisplay.forEach((claim) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${claim.id}</td>
        <td>${claim.patientName}</td>
        <td>${claim.providerName}</td>
        <td>$${claim.amount.toFixed(2)}</td>
        <td>${formatDate(claim.date)}</td>
        <td><span class="status-badge ${claim.status
          .toLowerCase()
          .replace(/\s+/g, "-")}">${claim.status}</span></td>
        <td><button class="action-btn review-claim-btn" data-id="${
          claim.id
        }">Review</button></td>
      `;
      tbody.appendChild(tr);
    });

    container.appendChild(table);

    // Add event listeners
    document.querySelectorAll(".review-claim-btn").forEach((btn) => {
      btn.addEventListener("click", handleReviewClaim);
    });
  }

  // Close claim modal
  if (claimModalClose) {
    claimModalClose.addEventListener("click", function () {
      claimModal.style.display = "none";
    });
  }

  // Handle clicking outside the modal
  window.addEventListener("click", function (e) {
    if (e.target === claimModal) {
      claimModal.style.display = "none";
    }
  });

  // Update dashboard stats
  function updateDashboardStats() {
    const totalClaims = claims.length;
    const pendingClaims = claims.filter(
      (claim) =>
        claim.status === "Pending" ||
        claim.status === "Documentation Required" ||
        claim.status === "Under Review"
    ).length;
    const processedToday = claims.filter(
      (claim) =>
        claim.status === "Approved" ||
        claim.status === "Rejected" ||
        claim.status === "Partially Approved"
    ).length;
    const requiresAttention = claims.filter(
      (claim) => claim.status === "Documentation Required"
    ).length;

    document.querySelector(".stat-card:nth-child(1) .stat-value").textContent =
      totalClaims;
    document.querySelector(".stat-card:nth-child(2) .stat-value").textContent =
      pendingClaims;
    document.querySelector(".stat-card:nth-child(3) .stat-value").textContent =
      processedToday;
    document.querySelector(".stat-card:nth-child(4) .stat-value").textContent =
      requiresAttention;
  }

  // Show notification
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

  // Utility functions
  function formatDate(dateString) {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }

  // Initialize the page
  renderClaimsQueue();
  renderClaimsByStatus();
  initializeClaimsChart();
  updateDashboardStats();

  // Initialize default view
  if (gridViewBtn && listViewBtn && claimsDisplay) {
    // Default to list view
    listViewBtn.classList.add("active");
    const pendingClaims = claims.filter(
      (claim) =>
        claim.status === "Pending" ||
        claim.status === "Documentation Required" ||
        claim.status === "Under Review"
    );
    displayClaimsInList(pendingClaims, claimsDisplay);
  }
});
