var courseAPI = "http://localhost:3000/course";

function start() {
    getCourses(renderCourses);
    handleCreateForm();

}

start();

// Function 
function getCourses(callback) {
    fetch(courseAPI)
        .then(function (response) {
            return response.json();
        })
        .then(callback);
}

function createCourse(data, callback) {
    var options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    };
    fetch(courseAPI, options)
        .then(function (response) {
            response.json();
        })
        .then(callback);
}

function handleDeleteCourse(id) {
    var options = {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
        },
    };
    fetch(courseAPI + '/' + id, options)
        .then(function (response) {
            response.json();
        })
        .then(function() {
            var courseItem = document.querySelector('.course-item-' + id);
            if(courseItem) {
                courseItem.remove();
            }
        });
}

function renderCourses(courses) {
    var listCoursesBlock = document.querySelector("#list-courses");
    var htmls = courses.map(function (course) {
        return `
            <li class="course-item-${course.id}">
                <h4>name: ${course?.name}</h4>
                <p>desc: ${course?.description}</p>
                <button onclick="handleDeleteCourse(${course.id})">delete</button>
            </li>
        `;
    });
    listCoursesBlock.innerHTML = htmls.join('');
}

function handleCreateForm() {
    var createBtn = document.querySelector("#create");
    createBtn.addEventListener("click", function (e) {
        var name = document.querySelector('input[name="name"]').value;
        var description = document.querySelector('input[name="description"]').value;
        var formData = {
            name: name,
            description: description
        };
        createCourse(formData, function() {
            getCourses(renderCourses);
        });
    });
}