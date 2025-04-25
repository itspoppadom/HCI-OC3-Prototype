document.addEventListener("DOMContentLoaded", function () {
  // Dashboard navigation
  const sidebarLinks = document.querySelectorAll(".sidebar a");
  const contentSections = document.querySelectorAll(".content section");

  sidebarLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      // Get the target section ID from the href
      const targetId = this.getAttribute("href").substring(1);

      // Remove active class from all links and add to clicked one
      sidebarLinks.forEach((l) => {
        l.parentElement.classList.remove("active");
      });
      this.parentElement.classList.add("active");

      // Hide all sections and show the target one
      contentSections.forEach((section) => {
        section.classList.remove("active");
      });
      document.getElementById(targetId).classList.add("active");
    });
  });

  // Add any dashboard-specific functionality here

  // Example: Add patient to queue
  const addPatientForm = document.getElementById("add-patient-form");
  if (addPatientForm) {
    addPatientForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form data
      const patientName = document.getElementById("patient-name").value;
      const appointmentTime = document.getElementById("appointment-time").value;
      const appointmentReason =
        document.getElementById("appointment-reason").value;

      // Create a new row in the patient queue table
      const patientQueue = document.querySelector(".patient-queue tbody");
      const newRow = document.createElement("tr");

      newRow.innerHTML = `
        <td>${patientName}</td>
        <td>${appointmentTime}</td>
        <td>${appointmentReason}</td>
        <td>Not Arrived</td>
        <td><button class="action-btn" disabled>Start Session</button></td>
      `;

      patientQueue.appendChild(newRow);

      // Reset form
      addPatientForm.reset();
    });
  }

  // Example: Process claim
  const reviewButtons = document.querySelectorAll(".claims-queue .action-btn");
  if (reviewButtons) {
    reviewButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const row = this.closest("tr");
        const claimId = row.cells[0].textContent;

        // Show a modal with claim details
        alert(
          `Reviewing claim ${claimId}. In a real application, this would open a detailed claim review form.`
        );
      });
    });
  }
});
