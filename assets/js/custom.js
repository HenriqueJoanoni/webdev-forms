/**
 * READ DATA FROM FILE
 */
fetch("food.json")
    .then((res) => {
        if (!res.ok) {
            throw new Error
            (`HTTP error! Status: ${res.status}`);
        }
        return res.json();
    })
    .then((data) => retrieveData(data))
    .catch((error) =>
        console.error("Unable to fetch data:", error));

function retrieveData(arrayData) {
    const homepage = document.querySelector(".home-elements");

    homepage.innerHTML += `<ul>
                              <li>ID</li>
                              <li>Name</li>
                              <li>Nutritional Info</li>
                              <li>Tags</li>`;

    for (let i = 0; i < arrayData.length; i++) {
        homepage.innerHTML += `<ul>
                                    <li>${arrayData[i].id}</li>
                                    <li>${arrayData[i].name}</li>
                                    <li><a class="btn-open" data-index="${i}">View nutritional info</a></li>
                                    <li>${arrayData[i]['tags'] ? arrayData[i]['tags'] : "N/A"}</li>
                                </ul>`;
    }
    homepage.innerHTML += `</ul>`;

    const openModalBtn = document.querySelectorAll(".btn-open");
    openModalBtn.forEach(elem => {
        elem.removeEventListener("click", nutritionInformation);
        elem.addEventListener("click", nutritionInformation.bind(null, arrayData));
    });
}

function nutritionInformation(arrayData, ev) {
    const modal = document.querySelector(".modal");
    const overlay = document.querySelector(".overlay");
    const closeModalBtn = document.querySelector(".btn-close");

    const openModal = function () {
        modal.classList.remove("hidden");
        overlay.classList.remove("hidden");
    };

    const closeModal = function () {
        modal.classList.add("hidden");
        overlay.classList.add("hidden");
    };

    closeModalBtn.addEventListener("click", closeModal);
    overlay.addEventListener("click", closeModal);

    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && !modal.classList.contains("hidden")) {
            closeModal();
        }
    });

    const dataIndex = ev.target.getAttribute("data-index");

    const info = arrayData[dataIndex];

    /** DEBUG PURPOSES */
    console.table(info);

    openModal();
}

/**
 * BASIC LOGIN FUNCTION
 */
function login() {
    const form = document.querySelector("form");
    let fieldEmail = document.querySelector("[name='email']");
    let fieldPassword = document.querySelector("[name='password']");
    let errorMessage = document.querySelector("span");

    form.addEventListener('submit', function (e) {
        e.prevDefault();

        if (fieldEmail.value !== 'admin' || fieldPassword.value !== '1234') {
            errorMessage.innerHTML = "User or Password doesn't exist";
            fieldEmail.style.borderColor = "red";
            fieldPassword.style.borderColor = "red";
        } else {
            window.location.replace("http://localhost/webdev-forms/index.html");
        }
    });
}
