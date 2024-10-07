document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("registration-form");
    const studentsList = document.getElementById("studentsList");
    let students = JSON.parse(localStorage.getItem("students")) || [];

    // Display students on page load
    displayStudents();

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const studentName = document.getElementById("studentName").value;
        const studentID = document.getElementById("studentID").value;
        const email = document.getElementById("email").value;
        const contactNo = document.getElementById("contactNo").value;

        if (validateInput(studentName, studentID, email, contactNo)) {
            const student = {
                id: studentID,
                name: studentName,
                email: email,
                contact: contactNo,
            };
            students.push(student);
            localStorage.setItem("students", JSON.stringify(students));
            form.reset();
            displayStudents();
        }
    });

    function displayStudents() {
        studentsList.innerHTML = "";
        students.forEach((student, index) => {
            const studentDiv = document.createElement("div");
            studentDiv.className = "border-b p-2 flex justify-between items-center";
            studentDiv.innerHTML = `
                <div>
                    <strong>${student.name}</strong> (ID: ${student.id})<br>
                    Email: ${student.email}<br>
                    Contact: ${student.contact}
                </div>
                <div>
                    <button class="text-blue-600 hover:underline" onclick="editStudent(${index})">Edit</button>
                    <button class="text-red-600 hover:underline" onclick="deleteStudent(${index})">Delete</button>
                </div>
            `;
            studentsList.appendChild(studentDiv);
        });
    }

    window.editStudent = (index) => {
        const student = students[index];
        document.getElementById("studentName").value = student.name;
        document.getElementById("studentID").value = student.id;
        document.getElementById("email").value = student.email;
        document.getElementById("contactNo").value = student.contact;
        students.splice(index, 1); // Remove the student for editing
        localStorage.setItem("students", JSON.stringify(students));
        displayStudents();
    };

    window.deleteStudent = (index) => {
        students.splice(index, 1);
        localStorage.setItem("students", JSON.stringify(students));
        displayStudents();
    };

    function validateInput(name, id, email, contact) {
        const nameRegex = /^[a-zA-Z ]+$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!nameRegex.test(name)) {
            alert("Invalid name. Please use only letters.");
            return false;
        }
        if (!emailRegex.test(email)) {
            alert("Invalid email format.");
            return false;
        }
        if (isNaN(id) || isNaN(contact)) {
            alert("Student ID and Contact No. must be numbers.");
            return false;
        }
        if(contact<9999999){
            alert("Contact No. must have atleast 8 digits.");
            return false;
        }
        return true;
    }
});
