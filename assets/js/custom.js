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
    const submitButton = document.querySelector("#search-button");
    const searchField = document.querySelector("#search-field");

    /**
     * THIS FUNCTION IS RESPONSIBLE TO REGENERATE THE TABLE
     * ONCE THE SEARCH TERM IS TYPED ON SEARCH FIELD
     */
    function updateTable(searchTerm) {
        homepage.innerHTML = '';

        homepage.innerHTML += `<ul>
                                  <li>ID</li>
                                  <li>Name</li>
                                  <li>Nutritional Info</li>
                                  <li>Tags</li>`;

        arrayData.forEach((item, i) => {
            /** CHECK IF ITEM MATCHES SEARCH TERM (IF PROVIDED) */
            if (!searchTerm || item.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                homepage.innerHTML += `<ul>
                                          <li>${item.id}</li>
                                          <li>${item.name}</li>
                                          <li><a class="btn-open" data-index="${i}">View nutritional info</a></li>
                                          <li>${item.tags ? item.tags : "N/A"}</li>
                                      </ul>`;
            }
        });

        homepage.innerHTML += `</ul>`;

        const openModalBtn = document.querySelectorAll(".btn-open");
        openModalBtn.forEach(elem => {
            elem.removeEventListener("click", nutritionInformation);
            elem.addEventListener("click", nutritionInformation.bind(null, arrayData));
        });
    }

    /** RENDERS TABLE FOR THE FIRST TIME ONCE THE PAGE IS OPENED */
    updateTable();

    /** EVENT LISTENER TO SEARCH FOR THE TERM */
    submitButton.addEventListener("click", function (e) {
        e.preventDefault(); /** Prevent form submission */

        const searchTerm = searchField.value.trim();
        updateTable(searchTerm);
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

    /** GET INFORMATION ONCE THE CLICK EVENT HAPPENS */
    const dataIndex = ev.target.getAttribute("data-index");
    const info = arrayData[dataIndex];

    /** GENERATE HTML CONTENT FOR NUTRITIONAL INFORMATION */
    modal.querySelector(".modal-content").innerHTML = `
        <h3>Nutritional Information</h3>
        <ul>
            <li>Energy: ${info['nutrition-per-100g'].energy} kJ</li>
            <li>Protein: ${info['nutrition-per-100g'].protein} g</li>
            <li>Fat: ${info['nutrition-per-100g'].fat} g</li>
            <li>Saturated Fat: ${info['nutrition-per-100g']['saturated-fat']} g</li>
            <li>Carbohydrate: ${info['nutrition-per-100g'].carbohydrate} g</li>
            <li>Sugars: ${info['nutrition-per-100g'].sugars} g</li>
            <li>Dietary Fibre: ${info['nutrition-per-100g']['dietary-fibre']} g</li>
            <li>Sodium: ${info['nutrition-per-100g'].sodium} mg</li>
        </ul>
    `;

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
        e.preventDefault();

        if (fieldEmail.value !== 'admin' || fieldPassword.value !== '1234') {
            errorMessage.innerHTML = "User or Password doesn't exist";
            fieldEmail.style.borderColor = "red";
            fieldPassword.style.borderColor = "red";
        } else {
            window.location.replace("http://localhost/webdev-forms/index.html");
        }
    });
}
