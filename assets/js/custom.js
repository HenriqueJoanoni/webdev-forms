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
                                  <li>Tags</li>
                                  <li>Options</li>`;

        arrayData.forEach((item, i) => {
            /** CHECK IF ITEM MATCHES SEARCH TERM (IF PROVIDED) */
            if (!searchTerm ||
                item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (item.tags && item.tags.includes(searchTerm.toLowerCase()))) {

                homepage.innerHTML += `<ul>
                                            <li>${item.id}</li>
                                            <li>${item.name}</li>
                                            <li><a class="btn-open" data-index="${i}">View nutritional info</a></li>
                                            <li>${item.tags ? item.tags : "N/A"}</li>
                                            <li>
                                                <a>
                                                    <img
                                                        src="assets/img/pencil.png"
                                                        alt="insert tags"
                                                        title="Insert Tags"
                                                        data-tags="${i}"
                                                        class="insert-manager"
                                                    >
                                                </a>
                                                <a>
                                                    <img
                                                        src="assets/img/pencil.png"
                                                        alt="edit tags"
                                                        title="Edit Tags"
                                                        data-tags="${i}"
                                                        class="edit-manager"
                                                    >
                                                </a>
                                            </li>
                                        </ul>`;
            }
        });

        homepage.innerHTML += `</ul>`;

        const openModalBtn = document.querySelectorAll(".btn-open");
        openModalBtn.forEach(elem => {
            elem.removeEventListener("click", nutritionInformation);
            elem.addEventListener("click", nutritionInformation.bind(null, arrayData));
        });

        /** OPEN THE TAG MANAGER FORM */
        const openManagerButtons = document.querySelectorAll(".insert-manager");
        openManagerButtons.forEach(btn => {
            btn.removeEventListener("click", insertTags);
            btn.addEventListener("click", function (ev) {
                const dataIndex = ev.target.getAttribute("data-tags");
                const info = arrayData[dataIndex];
                insertTags(arrayData, info);
            });
        });

        const editManagerButtons = document.querySelectorAll(".edit-manager");
        editManagerButtons.forEach(btn => {
            btn.removeEventListener("click", editTags);
            btn.addEventListener("click", function (ev) {
                const dataIndex = ev.target.getAttribute("data-tags");
                const info = arrayData[dataIndex];
                editTags(arrayData, info);
            });
        });
    }

    /** RENDERS TABLE FOR THE FIRST TIME ONCE THE PAGE IS OPENED */
    updateTable();

    /** EVENT LISTENER TO SEARCH FOR THE TERM */
    submitButton.addEventListener("click", function (e) {
        /** PREVENT FORM SUBMISSION */
        e.preventDefault();

        const searchTerm = searchField.value.trim();
        updateTable(searchTerm);
    });
}

// function retrieveData(arrayData) {
//     const homepage = document.querySelector(".home-elements");
//     const submitButton = document.querySelector("#search-button");
//     const searchField = document.querySelector("#search-field");
//
//     /**
//      * THIS FUNCTION IS RESPONSIBLE TO REGENERATE THE TABLE
//      * ONCE THE SEARCH TERM IS TYPED ON SEARCH FIELD
//      */
//     function updateTable(searchTerm) {
//         homepage.innerHTML = '';
//
//         homepage.innerHTML += `<ul>
//                                   <li>ID</li>
//                                   <li>Name</li>
//                                   <li>Nutritional Info</li>
//                                   <li>Tags</li>
//                                   <li>Options</li>`;
//
//         arrayData.forEach((item, i) => {
//             /** CHECK IF ITEM MATCHES SEARCH TERM (IF PROVIDED) */
//             if (!searchTerm || item.name.toLowerCase().includes(searchTerm.toLowerCase())) {
//                 homepage.innerHTML += `<ul>
//                                             <li>${item.id}</li>
//                                             <li>${item.name}</li>
//                                             <li><a class="btn-open" data-index="${i}">View nutritional info</a></li>
//                                             <li>${item.tags ? item.tags : "N/A"}</li>
//                                             <li>
//                                                 <a>
//                                                     <img
//                                                         src="assets/img/pencil.png"
//                                                         alt="insert tags"
//                                                         title="Insert Tags"
//                                                         data-tags="${i}"
//                                                         class="insert-manager"
//                                                     >
//                                                 </a>
//                                                 <a>
//                                                     <img
//                                                         src="assets/img/pencil.png"
//                                                         alt="edit tags"
//                                                         title="Edit Tags"
//                                                         data-tags="${i}"
//                                                         class="edit-manager"
//                                                     >
//                                                 </a>
//                                             </li>
//                                         </ul>`;
//             }
//         });
//
//         homepage.innerHTML += `</ul>`;
//
//         const openModalBtn = document.querySelectorAll(".btn-open");
//         openModalBtn.forEach(elem => {
//             elem.removeEventListener("click", nutritionInformation);
//             elem.addEventListener("click", nutritionInformation.bind(null, arrayData));
//         });
//
//         /** OPEN THE TAG MANAGER FORM */
//         const openManagerButtons = document.querySelectorAll(".insert-manager");
//         openManagerButtons.forEach(btn => {
//             btn.removeEventListener("click", insertTags);
//             btn.addEventListener("click", function (ev) {
//                 const dataIndex = ev.target.getAttribute("data-tags");
//                 const info = arrayData[dataIndex];
//                 insertTags(arrayData, info);
//             });
//         });
//
//         const editManagerButtons = document.querySelectorAll(".edit-manager");
//         editManagerButtons.forEach(btn => {
//             btn.removeEventListener("click", editTags);
//             btn.addEventListener("click", function (ev) {
//                 const dataIndex = ev.target.getAttribute("data-tags");
//                 const info = arrayData[dataIndex];
//                 editTags(arrayData, info);
//             });
//         });
//     }
//
//     /** RENDERS TABLE FOR THE FIRST TIME ONCE THE PAGE IS OPENED */
//     updateTable();
//
//     /** EVENT LISTENER TO SEARCH FOR THE TERM */
//     submitButton.addEventListener("click", function (e) {
//         /** PREVENT FORM SUBMISSION */
//         e.preventDefault();
//
//         const searchTerm = searchField.value.trim();
//         updateTable(searchTerm);
//     });
// }

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
    if (info['nutrition-per-100g']) {
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
    } else {
        modal.querySelector(".modal-content").innerHTML = `
            <h3>Nutritional Information</h3>
            <ul>
                <li>Energy: ${info['nutrition-per-100ml'].energy} kJ</li>
                <li>Protein: ${info['nutrition-per-100ml'].protein} g</li>
                <li>Fat: ${info['nutrition-per-100ml'].fat} g</li>
                <li>Saturated Fat: ${info['nutrition-per-100ml']['saturated-fat']} g</li>
                <li>Carbohydrate: ${info['nutrition-per-100ml'].carbohydrate} g</li>
                <li>Sugars: ${info['nutrition-per-100ml'].sugars} g</li>
                <li>Dietary Fibre: ${info['nutrition-per-100ml']['dietary-fibre']} g</li>
                <li>Sodium: ${info['nutrition-per-100ml'].sodium} mg</li>
            </ul>
        `;
    }

    openModal();
}

function insertTags(inputEntry, info) {
    const homepage = document.querySelector('.home-elements');
    const tagManager = document.querySelector('.tag-manager');

    /** HIDE MAIN TABLE AND SHOW THE FORM */
    const openManager = function () {
        homepage.classList.add('hidden');
        tagManager.classList.remove('hidden');
    }

    /** HIDE FORM AND SHOW THE TABLE BACK */
    const closeManager = function () {
        homepage.classList.remove('hidden');
        tagManager.classList.add('hidden');
    }

    tagManager.innerHTML = `<form id="tag-manager-form">
                                <label for="tag-input"></label>
                                <input id="tag-input" name="tag-input-name" placeholder="Insert a new tag name">
                                <button type="submit">Add Tag</button>
                                <button type="button" id="cancel-button">Cancel</button>
                            </form>`;

    document.getElementById('tag-manager-form').addEventListener("submit", function (e) {
        e.preventDefault();
        let inputField = document.getElementById('tag-input');

        /** RECEIVE THE DATA FROM THE FIELD AND PUSH IT TO THE NEW TAGS ARRAY */
        info.tags.push(inputField.value);

        /** CALL THE MAIN FUNCTION AND SET THE NEW DATA TO UPDATE THE TABLE */
        retrieveData(inputEntry);
        alertHandler(closeManager);
    });

    document.getElementById('cancel-button').addEventListener('click', closeManager);

    openManager();
}

function editTags(inputEntry, info) {
    const homepage = document.querySelector('.home-elements');
    const tagManager = document.querySelector('.tag-manager');

    /** HIDE MAIN TABLE AND SHOW THE FORM */
    const openManager = function () {
        homepage.classList.add('hidden');
        tagManager.classList.remove('hidden');
    }

    /** HIDE FORM AND SHOW THE TABLE BACK */
    const closeManager = function () {
        homepage.classList.remove('hidden');
        tagManager.classList.add('hidden');
    }

    const handleSubmit = function (e) {
        e.preventDefault();
        let inputFields = document.querySelectorAll('.tag-input');

        /** UPDATE THE TAGS */
        info.tags = Array.from(inputFields).map(field => field.value);

        // CALL THE MAIN FUNCTION AND SET THE NEW DATA TO UPDATE THE TABLE
        retrieveData(inputEntry);
        alertHandler(closeManager);
    };

    /** CREATE NEW FIELDS FOR EACH TAG */
    const tagInputs = info.tags.map(tag => `<input type="text" class="tag-input" value="${tag}">`);
    const tagInputsHTML = tagInputs.join('');

    tagManager.innerHTML = `<form id="tag-manager-form">
                                ${tagInputsHTML}
                                <button type="submit">Update Tags</button>
                                <button type="button" id="cancel-button">Cancel</button>
                            </form>`;

    const tagManagerForm = document.getElementById('tag-manager-form');
    tagManagerForm.addEventListener("submit", handleSubmit);

    document.getElementById('cancel-button').addEventListener('click', closeManager);

    openManager();
}

/**
 * TOAST ALERT
 */
function alertHandler(closeManager) {
    let alerts = document.getElementById("alert-container");

    if (alerts.childElementCount < 2) {
        /** CREATE ALERT BOX */
        let alertBox = document.createElement("div");
        alertBox.classList.add("alert-msg", "slide-in");

        /** ADD MESSAGE TO ALERT BOX */
        let alertMsg = document.createTextNode("Tag inserted successfully!!");
        alertBox.appendChild(alertMsg);

        /** ADD ALERT BOX TO PARENT */
        alerts.insertBefore(alertBox, alerts.childNodes[0]);

        /** REMOVE LAST ALERT BOX */
        alerts.childNodes[0].classList.add("slide-out");
        setTimeout(function () {
            alerts.removeChild(alerts.lastChild);
            closeManager();
        }, 2500);
    }
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
