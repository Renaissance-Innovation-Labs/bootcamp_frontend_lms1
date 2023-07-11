// get session storage for users
const users = sessionStorage.getItem('user');
let profile = JSON.parse(users);
// make the profile name dynamic
    document.querySelector('.profile').textContent = `${profile.user.firstname} ${profile.user.lastname}`;
    document.querySelector('.user').textContent = `${profile.user.firstname} ${profile.user.lastname}`;
    const accessToken = profile.access_token;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization':  `Bearer ${accessToken}`
    };
    let add = document.querySelector(".add");





function fetchStack() {
  add.textContent = 'Loading Please Wait...'


// Fetch course stacks from the API
fetch("https://lms-boo.onrender.com/stack/")
.then(response => response.json())
.then(data => {
  sessionStorage.setItem("courseStacks", JSON.stringify(data));
  // Display the course stacks on the HTML page
  displayCourseStacks(data);
  add.textContent = '';
})
.catch(error => {
console.error("Error fetching course stacks:", error);
});

}fetchStack();


// Function to display the course stacks on the HTML page
function displayCourseStacks(courseStacks) {
  add.textContent = 'Loading Please Wait...'
// Iterate over each course stack
courseStacks.forEach(stack => {
  // Got the stackForm tag from html
  const stackForm = document.querySelector(".stack-form");
// create <div> element for the stack container
    const stackDiv = document.createElement("div");
    stackDiv.classList.add("stack-div");
    // Create a <label> element for the stack name
    const stackLabel = document.createElement("label");
    stackLabel.textContent = stack.name;
    stackLabel.classList.add("stack");
    // Create a <select> element for the courses in the stack
    const stackSelect = document.createElement("select");
    stackSelect.name = stack.name.toLowerCase();
    stackSelect.id = stack.id;
    // create static option for select
    const courseOpt = document.createElement("option");
    courseOpt.value = 0;
    courseOpt.textContent = "Select Stack";
    stackSelect.appendChild(courseOpt);

    // Iterate over each course in the stack
    stack.courses.forEach(course => {
      // Create an <option> element for the course
    const courseOption = document.createElement("option");
    courseOption.value = course.course_code;
    courseOption.textContent = course.title;
      // Append the course option to the select element
      stackSelect.appendChild(courseOption);
    });
    // Append the stack div  to the form
    stackForm.appendChild(stackDiv);
    // Append the stack label and select to the stack div
    stackDiv.appendChild(stackLabel);
    stackDiv.appendChild(stackSelect);
      // Add event listener to handle course selection
      stackSelect.addEventListener("change", courseSelection);
  });
}




// Function to handle course selection
function courseSelection(event) {
  const courseCode = event.target.value;
  let load = document.querySelector(".load");
  load.textContent = 'Adding Please Wait...'
  // console.log(courseCode);
  // sessionStorage.setItem("courseCode", courseCode)

  // Add the selected course from the API
  fetch(`https://lms-boo.onrender.com/stack/course/${courseCode}`, {
    method: "POST",
    headers: headers
  })
    .then(response => response.json())
    .then(course => {
      displayCourseToSection()
      load.textContent = '';
    sessionStorage.setItem("course", course)
    location.reload();
    })
    .catch(error => {
      console.error("Error fetching course:", error);
      load.textContent = '';
    });
}




//Fetch the selected course from the API
function displayCourseToSection() {
  let load =  document.createElement("p");
  load.innerHTML = `<img src="../assets/Spinner.gif" alt="icon">`;
  const courseSection = document.querySelector(".course-section");
  courseSection.appendChild(load);
  
fetch(`https://lms-boo.onrender.com/stack/course/`, {
  method: "GET",
  headers: headers
})
.then(response => response.json())
.then(courses => {
  load.style.display = "none";
  console.log(courses )
// Append the selected course to the course section
sessionStorage.setItem("courses", courses)
countDisplay (courses);
appendCourseToSection(courses);
})
.catch(error => {
console.error("Error fetching course:", error);
});
};
displayCourseToSection();



// Function to append a course to the course section
function appendCourseToSection(courses) {
const courseSection = document.querySelector(".course-section");

courses.forEach(course => {
// Create a <div> element for the course section
const courseDiv = document.createElement("div");
courseDiv.classList.add("course-div");
// Create a <h3> element for the course name
const courseTitle = document.createElement("h3");
courseTitle.textContent = course.stack;
courseTitle.classList.add("stack");
// Create a <div> element for the course and btn
const testDiv = document.createElement("div");
testDiv.classList.add("test");
// Create a <div> element for the course
const coursesDiv = document.createElement("div");
coursesDiv.classList.add("course");
// Create a <p> element for the course title
const courseName = document.createElement("p");
courseName.textContent = course.title;
courseName.classList.add("course-title");
// Create a <p> element for the course details
const courseProgress = document.createElement("p");
courseProgress.textContent = `Progress: 10%`;
courseDiv.classList.add("progress-bar");
// Create a <p> element for the course details
const courseInstructor = document.createElement("p");
courseInstructor.textContent = `Instructor: Cedar White`;
// Create a <div> element for the course button
const btnDiv = document.createElement("div");
btnDiv.classList.add("action-btn");
// Create a <button> element for continue
const contBtn = document.createElement("button");
contBtn.textContent = `Continue`;
contBtn.classList.add("cont-btn");
// Create a <button> element for delete
const delBtn = document.createElement("button");
delBtn.textContent = `Delete`;
delBtn.classList.add("del-btn");



delBtn.addEventListener("click", () => {
  delBtn.textContent = `Deleting`;
  // Delete the course from the API
  deleteCourseFromAPI(course.course_code);
  
  // // Remove the course from the HTML section
  // courseSection.removeChild(courseDiv);
  // location.reload();
  // Update the displayed count in the HTML
});

// Append the course name and details to the course div
courseDiv.appendChild(courseTitle);
courseDiv.appendChild(testDiv);
testDiv.appendChild(coursesDiv);
coursesDiv.appendChild(courseName);
coursesDiv.appendChild(courseProgress);
coursesDiv.appendChild(courseInstructor);
testDiv.appendChild(btnDiv);
btnDiv.appendChild(contBtn);
btnDiv.appendChild(delBtn);
// Append the course div to the course section
courseSection.appendChild(courseDiv);
})
// Update the displayed count in the HTML
countDisplay (courses);
}




//Function to display count
function countDisplay (courses) {
  const countSpan = document.querySelector(".course-head span");
  countSpan.textContent = courses.length;
}




// Function to delete a course from the API
function deleteCourseFromAPI(courseCode) {
  let del = document.querySelector(".del");
  del.textContent = 'Deleting Please Wait...'
  fetch(`https://lms-boo.onrender.com/stack/course/${courseCode}`, {
    method: "DELETE",
    headers: headers
  })
    .then(response => response.json())
    .then(courses => {
      displayCourseToSection() 
      console.log("Course deleted:",courses);
      del.textContent = '';
      location.reload();
    })
    .catch(error => {
      console.error("Error deleting course:", error);
      del.textContent = '';
    });
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