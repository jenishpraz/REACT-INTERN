
const emailInput = document.getElementById("emailInput");
const emailList = document.getElementById("emailList");
const mainBtn = document.getElementById("mainBtn");

// Regex for email validation
const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}$/;

// Load from localStorage
let emails = JSON.parse(localStorage.getItem("emails")) || [];

function renderEmails() {
  emailList.innerHTML = "";
  emails.forEach((email, index) => {
    let row = document.createElement("tr");
    row.innerHTML = `
      <td>${email}</td>
      <td>
        <button class="edit" onclick="startEdit(${index})">Edit</button>
        <button class="delete" onclick="deleteEmail(${index})">Delete</button>
      </td>
    `;
    emailList.appendChild(row);
  });
}

function addEmail() {
  const email = emailInput.value.trim();

  if (!emailPattern.test(email)) {
    alert("⚠️ Invalid email format!");
    return;
  }

  emails.push(email);
  localStorage.setItem("emails", JSON.stringify(emails));
  emailInput.value = "";
  renderEmails();
}

function deleteEmail(index) {
  emails.splice(index, 1);
  localStorage.setItem("emails", JSON.stringify(emails));
  renderEmails();
}

function startEdit(index) {
  const newEmail = prompt("Edit the email:", emails[index]);
  if (newEmail === null) return; // User canceled
  const trimmedEmail = newEmail.trim();

  if (!emailPattern.test(trimmedEmail)) {
    alert("⚠️ Invalid email format!");
    return;
  }

  emails[index] = trimmedEmail;
  localStorage.setItem("emails", JSON.stringify(emails));
  renderEmails();
}

// email.js

function addEmail() {
  const emailInput = document.getElementById("emailInput");
  const emailValue = emailInput.value.trim();
  const emailList = document.getElementById("emailList");

  if (emailValue === "") {
    alert("Please enter an email!");
    return;
  }

  // ✅ Check if email already exists
  const existingEmails = Array.from(document.querySelectorAll("#emailList tr td:first-child"))
    .map(td => td.textContent.toLowerCase());

  if (existingEmails.includes(emailValue.toLowerCase())) {
    alert("This email already exists! ❌");
    return;
  }

  // ✅ Create new row
  const newRow = document.createElement("tr");

  newRow.innerHTML = `
    <td>${emailValue}</td>
    <td>
      <button onclick="editEmail(this)">Edit</button>
      <button onclick="deleteEmail(this)">Delete</button>
    </td>
  `;

  emailList.appendChild(newRow);
  emailInput.value = "";
}

function deleteEmail(button) {
  const row = button.parentElement.parentElement;
  row.remove();
}

function editEmail(button) {
  const row = button.parentElement.parentElement;
  const emailCell = row.cells[0];
  const newEmail = prompt("Edit email:", emailCell.textContent);

  if (newEmail && newEmail.trim() !== "") {
    // ✅ Check duplicate when editing
    const existingEmails = Array.from(document.querySelectorAll("#emailList tr td:first-child"))
      .map(td => td.textContent.toLowerCase());

    if (existingEmails.includes(newEmail.toLowerCase())) {
      alert("This email already exists! ❌");
      return;
    }

    emailCell.textContent = newEmail.trim();
  }
}


// Initial render
renderEmails();
