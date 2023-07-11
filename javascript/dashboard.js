const users = sessionStorage.getItem('user');
let profile = JSON.parse(users);

document.querySelector('.profile').textContent = `${profile.user.firstname} ${profile.user.lastname}`;
document.querySelector('.user').textContent = `${profile.user.firstname} ${profile.user.lastname}`;
const accessToken = profile.access_token;
const headers = {
    'Content-Type': 'application/json',
    'Authorization':  `Bearer ${accessToken}`
};


function displayCourseToSection() {
    fetch(`https://lms-boo.onrender.com/stack/course/`, {
        method: "GET",
        headers: headers
    })
    .then(response => response.json())
    .then(courses => {
        console.log(courses);

    sessionStorage.setItem("courses", courses)
    countDisplay (courses);
    })
    .catch(error => {
    console.error("Error fetching course:", error);
    });
    };displayCourseToSection();

function countDisplay (courses) {
const countSpan = document.querySelector("#course-num");
countSpan.textContent = courses.length;
}




// Fetch assignments from the API
fetch("https://lms-boo.onrender.com/stack/assignment", {
headers: headers
})
.then(response => response.json())
.then(data => {
    sessionStorage.setItem("assignments", JSON.stringify(data));
    // Display the assignments on the HTML page
    displayAssignments(data);
})
.catch(error => {
    console.error("Error fetching assignments:", error);
});




// Function to display the assignments on the HTML page
function displayAssignments(assignments) {
const assignmentSection = document.querySelector(".message-assign aside");

assignments.forEach(assignment => {
    // Create a <div> element for the assignment
    const assignmentDiv = document.createElement("div");

    // Create a <h3> element for the assignment title
    const assignmentTitle = document.createElement("h3");
    assignmentTitle.innerHTML = `<img src="../assets/document.png" alt="icon">${assignment.name}`;

    // Create a <p> element for the assignment details
    const assignmentDetails = document.createElement("p");
    assignmentDetails.innerHTML = `${assignment.stack}  <span class="assign-span">${assignment.time} - ${assignment.date}</span>`;
    assignmentDetails.classList.add("assign-txt")

    // Append the assignment title and details to the assignment div
    assignmentDiv.appendChild(assignmentTitle);
    assignmentDiv.appendChild(assignmentDetails);

    // Append the assignment div to the assignment section
    assignmentSection.appendChild(assignmentDiv);
});
}