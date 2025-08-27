let students = JSON.parse(localStorage.getItem("students")) || [];
let teacher = localStorage.getItem("teacher") || "";

function loginTeacher() {
  const name = document.getElementById("teacherName").value;
  if (name.trim() === "") {
    alert("Enter teacher name!");
    return;
  }
  teacher = name;
  localStorage.setItem("teacher", teacher);
  document.getElementById("welcome").innerText = `Welcome, ${teacher}`;
  document.getElementById("login-section").classList.add("hidden");
  document.getElementById("dashboard").classList.remove("hidden");
  renderStudents();
}

function addStudent() {
  const name = document.getElementById("studentName").value;
  if (name.trim() === "") {
    alert("Enter student name!");
    return;
  }
  students.push({ name, status: "" });
  localStorage.setItem("students", JSON.stringify(students));
  document.getElementById("studentName").value = "";
  renderStudents();
}

function renderStudents() {
  const tbody = document.querySelector("#attendanceTable tbody");
  tbody.innerHTML = "";
  students.forEach((student, index) => {
    const row = `
      <tr>
        <td>${student.name}</td>
        <td><input type="radio" name="status${index}" value="Present" ${student.status==="Present"?"checked":""}></td>
        <td><input type="radio" name="status${index}" value="Absent" ${student.status==="Absent"?"checked":""}></td>
      </tr>
    `;
    tbody.innerHTML += row;
  });
}

function saveAttendance() {
  students.forEach((student, index) => {
    const status = document.querySelector(`input[name="status${index}"]:checked`);
    student.status = status ? status.value : "";
  });
  localStorage.setItem("students", JSON.stringify(students));
  alert("Attendance saved!");
}

function exportToExcel() {
  if (students.length === 0) {
    alert("No data to export!");
    return;
  }
  const worksheet = XLSX.utils.json_to_sheet(students);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Attendance");
  XLSX.writeFile(workbook, "Attendance.xlsx");
}

// Auto login if teacher already exists
window.onload = () => {
  if (teacher) {
    document.getElementById("welcome").innerText = `Welcome, ${teacher}`;
    document.getElementById("login-section").classList.add("hidden");
    document.getElementById("dashboard").classList.remove("hidden");
    renderStudents();
  }
};
