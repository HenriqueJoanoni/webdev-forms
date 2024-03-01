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
    const insertElementsButton = document.querySelector("#insert-item");

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
                                  <li>Options</li>
                                  <li>Delete</li>  `;

        arrayData.forEach((item, i) => {
            /** CHECK IF ITEM MATCHES SEARCH TERM (IF PROVIDED) */
            if (!searchTerm ||
                item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (item.tags && item.tags.includes(searchTerm.toLowerCase()))) {

                homepage.innerHTML += `<ul>
                                            <li>${item.id}</li>
                                            <li>${item.name}</li>
                                            <li><a class="btn-open" data-index="${i}">View nutritional info</a></li>
                                            <li>${item.tags ? item.tags : item.contains ? item.contains : "N/A"}</li>
                                            <li>
                                                <a>
                                                    <img
                                                        src="assets/img/add_vivi2.png"
                                                        alt="insert tags"
                                                        title="Insert Tags"
                                                        data-tags="${i}"
                                                        class="insert-manager"
                                                    >
                                                </a>
                                                <a>
                                                    <img
                                                        src="assets/img/edit_vivi.png"
                                                        alt="edit tags"
                                                        title="Edit Tags"
                                                        data-tags="${i}"
                                                        class="edit-manager"
                                                    >
                                                </a>
                                                <a class="delete-button">
                                                    <img src="assets/img/bin.png" width='35' height='35' alt="delete button">
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

    /** EVENT LISTENER FOR INSERT ELEMENTS BUTTON */
    insertElementsButton.addEventListener("click", function () {
        insertData(arrayData);
    });

    /** EVENT LISTENER TO DELETE AN ELEMENT */
    const deleteButtons = document.querySelectorAll('.delete-button');
    deleteButtons.forEach((button, elementId) => {
        button.addEventListener('click', () => deleteItems(elementId));
    });

    /** FUNCTION TO DELETE ITEMS FROM THE ARRAY */
    function deleteItems(elemId) {
        arrayData.splice(elemId, 1);
        retrieveData(arrayData);
    }
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
    // TODO: Update this code, transform it in a dynamic content
    if (info['nutrition-per-100g']) {
        modal.querySelector(".modal-content").innerHTML = `
            <h3>Nutritional Information per 100 g</h3>
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
            <h3>Nutritional Information per 100 ml</h3>
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

function insertData(entryArray) {
    const homepage = document.querySelector('.home-elements');
    const insertManager = document.querySelector('.insert-elements-form');

    /** HIDE MAIN TABLE AND SHOW THE FORM */
    const openManager = function () {
        homepage.classList.add('hidden');
        insertManager.classList.remove('hidden');
    };

    /** HIDE FORM AND SHOW THE TABLE BACK */
    const closeManager = function () {
        homepage.classList.remove('hidden');
        insertManager.classList.add('hidden');
    };

    insertManager.innerHTML = `<form id="insert-manager-form">
                                <input type="text" class="element-insert" id="id-input" placeholder=" Add ID"/>
                                <input type="text" class="element-insert" id="name-input" placeholder="Add Name"/>
                                <input type="text" class="element-insert" id="tag-input" placeholder="Add a Tag"/>
                                <select class="element-insert" id="nutrition-dropdown">
                                    <option value="0">Select The Volume</option>
                                    <option value="nutrition-per-100g">Per g</option>
                                    <option value="nutrition-per-100ml">Per ml</option>
                                </select>
                                <div id="nutrition-form"></div>
                                <button type="submit">Add Element</button>
                                <button type="button" id="cancel-button">Cancel</button>
                            </form>`;

    const nutritionInfo = document.querySelector('#nutrition-dropdown');

    nutritionInfo.addEventListener('change', function (ev) {
        if (ev.target.value === 'nutrition-per-100g') {
            document.getElementById('nutrition-form').innerHTML = formPerGrams();
        } else if (ev.target.value === 'nutrition-per-100ml') {
            document.getElementById('nutrition-form').innerHTML = formPerMl();
        }
    })

    document.getElementById('insert-manager-form').addEventListener("submit", function (e) {
        e.preventDefault();
        let inputId = document.getElementById('id-input').value;
        let inputName = document.getElementById('name-input').value;
        let inputTags = document.getElementById('tag-input').value;
        let nutriInfos = document.querySelectorAll(`[id*="-info"]`);
        let nutriData = {};


        console.log(nutriInfos)

        nutriInfos.forEach(info => {
            if (info.value.trim() !== '') {
                nutriData[info.getAttribute('name')] = info.value;
            }
        });

        /** CREATE NEW ELEMENT OBJECT */
        const newElement = {
            id: inputId,
            name: inputName,
            tags: [inputTags],
            [nutritionInfo.value]: nutriData
        };

        /** PUSH THE NEW ELEMENT TO THE ARRAY */
        entryArray.push(newElement);

        /** CALL THE MAIN FUNCTION AND SET THE NEW DATA TO UPDATE THE TABLE */
        retrieveData(entryArray);
        alertHandler(closeManager, 'new-elements');
    });

    document.getElementById('cancel-button').addEventListener('click', closeManager);

    openManager();
}

function insertTags(inputEntry, info) {
    const homepage = document.querySelector('.home-elements');
    const tagManager = document.querySelector('.tag-manager');

    /** HIDE MAIN TABLE AND SHOW THE FORM */
    const openManager = function () {
        homepage.classList.add('hidden');
        tagManager.classList.remove('hidden');
    };

    /** HIDE FORM AND SHOW THE TABLE BACK */
    const closeManager = function () {
        homepage.classList.remove('hidden');
        tagManager.classList.add('hidden');
    };

    tagManager.innerHTML = `<form id="tag-manager-form">
                                <label for="tag-input"></label>
                                <input id="tag-input" name="tag-input-name" placeholder="Insert a new tag name">
                                <button type="submit" id="add-tag">Add Tag</button>
                                <button type="button" id="cancel-button">Cancel</button>
                            </form>`;

    document.getElementById('tag-manager-form').addEventListener("submit", function (e) {
        e.preventDefault();
        let inputField = document.getElementById('tag-input');

        /** RECEIVE THE DATA FROM THE FIELD AND PUSH IT TO THE NEW TAGS ARRAY */
        if (info.tags) {
            info.tags.push(inputField.value);
        } else if (info.contains) {
            info.contains.push(inputField.value);
        } else {
            info.tags = [inputField.value]; // Create a new 'tags' array with the input value
        }

        /** CALL THE MAIN FUNCTION AND SET THE NEW DATA TO UPDATE THE TABLE */
        retrieveData(inputEntry);
        alertHandler(closeManager, 'insert');
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
    };

    /** HIDE FORM AND SHOW THE TABLE BACK */
    const closeManager = function () {
        homepage.classList.remove('hidden');
        tagManager.classList.add('hidden');
    };

    const handleSubmit = function (e) {
        e.preventDefault();
        let inputFields = document.querySelectorAll('.tag-input');

        /** UPDATE THE TAGS */
        info.tags = Array.from(inputFields).map(field => field.value);

        // CALL THE MAIN FUNCTION AND SET THE NEW DATA TO UPDATE THE TABLE
        retrieveData(inputEntry);
        alertHandler(closeManager, 'edit');
    };

    /** CREATE NEW FIELDS FOR EACH TAG */
    const tagInputs = info.tags.map(tag => `<input type="text" class="tag-input" value="${tag}">`);
    const tagInputsHTML = tagInputs.join('');

    tagManager.innerHTML = `<form id="tag-manager-form">
                                ${tagInputsHTML}
                                <button type="submit" >Update Tags</button>
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
function alertHandler(closeManager, type) {
    let alerts = document.getElementById("alert-container");
    const insertElementsMessage = "Elements inserted successfully!!";
    const insertMessage = "Tag inserted successfully!!";
    const editMessage = "Tag edited successfully!!";

    if (alerts.childElementCount < 2) {
        /** CREATE ALERT BOX */
        let alertBox = document.createElement("div");
        alertBox.classList.add("alert-msg", "slide-in");

        /** ADD MESSAGE TO ALERT BOX */
        let alertMsg;
        switch (type) {
            case 'insert':
                alertMsg = document.createTextNode(insertMessage);
                break;
            case 'edit':
                alertMsg = document.createTextNode(editMessage);
                break;
            default:
                alertMsg = document.createTextNode(insertElementsMessage);
        }

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

/** HELPER FUNCTION */
function formPerGrams() {
    return gForm = `
        <label for="energy-info">Energy: </label>
        <input type="text" id="energy-info" name="energy">
        
        <label for="protein-info">Protein: </label>
        <input type="text" id="protein-info" name="protein">
        
        <label for="fat-info">Fat: </label>
        <input type="text" id="fat-info" name="fat">
        
        <label for="saturated-fat-info">Saturated-fat: </label>
        <input type="text" id="saturated-fat-info" name="saturated">
        
        <label for="carbohydrate-info">Carbohydrate: </label>
        <input type="text" id="carbohydrate-info" name="carbohydrate">
        
        <label for="sugars-info">Sugars: </label>
        <input type="text" id="sugars-info" name="sugars">
        
        <label for="dietary-fibre-info">Dietary-fibre: </label>
        <input type="text" id="dietary-fibre-info" name="dietary-fibre">
        
        <label for="sodium-info">Sodium: </label>
        <input type="text" id="sodium-info" name="sodium">
        
        <label for="potassium-info">Potassium: </label>
        <input type="text" id="potassium-info" name="potassium">
        
        <label for="trans-fat-info">Trans-fat: </label>
        <input type="text" id="trans-fat-info" name="trans-fat">
        
        <label for="polyunsaturated-fat-info">Polyunsaturated-fat: </label>
        <input type="text" id="polyunsaturated-fat-info" name="polyunsaturated-fat">
        
        <label for="monounsaturated-fat-info">Monounsaturated-fat: </label>
        <input type="text" id="monounsaturated-fat-info" name="monounsaturated-fat">
        
        <label for="vitamin-b3-info">Vitamin-b3: </label>
        <input type="text" id="vitamin-b3-info" name="vitamin-b3">
        
        <label for="magnesium-info">Magnesium: </label>
        <input type="text" id="magnesium-info" name="magnesium">
        
        <label for="protein-info">Protein: </label>
        <input type="text" id="protein-info" name="protein">
        
        <label for="vitamin-b1-info">Vitamin-b1: </label>
        <input type="text" id="vitamin-b1-info" name="vitamin-b1">
        
        <label for="vitamin-b2-info">Vitamin-b2: </label>
        <input type="text" id="vitamin-b2-info" name="vitamin-b2">
        
        <label for="vitamin-b3-info">Vitamin-b3: </label>
        <input type="text" id="vitamin-b3-info" name="vitamin-b3">
        
        <label for="vitamin-b5-info">Vitamin-b5: </label>
        <input type="text" id="vitamin-b5-info" name="vitamin-b5">
        
        <label for="vitamin-b6-info">Vitamin-b6: </label>
        <input type="text" id="vitamin-b6-info" name="vitamin-b6">
        
        <label for="vitamin-b9-info">Vitamin-b9: </label>
        <input type="text" id="vitamin-b9-info" name="vitamin-b9">
        
        <label for="vitamin-c-info">Vitamin-c: </label>
        <input type="text" id="vitamin-c-info" name="vitamin-c">
        
        <label for="calcium-info">Calcium: </label>
        <input type="text" id="calcium-info" name="calcium">
        
        <label for="iron-info">Iron: </label>
        <input type="text" id="iron-info" name="iron">
        
        <label for="phosphorus-info">Phosphorus: </label>
        <input type="text" id="phosphorus-info" name="phosphorus">
        
        <label for="zinc-info">Zinc: </label>
        <input type="text" id="zinc-info" name="zinc">
        
        <label for="manganese-info">Manganese: </label>
        <input type="text" id="manganese-info" name="manganese">
        
        <label for="vitamin-e-info">Vitamin-e: </label>
        <input type="text" id="vitamin-e-info" name="vitamin-e">
        
        <label for="vitamin-k-info">Vitamin-k: </label>
        <input type="text" id="vitamin-k-info" name="vitamin-k">
    `;
}

function formPerMl() {
    return mlForm = `
        <label for="energy-info">Energy: </label>
        <input type="text" id="energy-info" name="energy">
        
        <label for="protein-info">Protein: </label>
        <input type="text" id="protein-info" name="protein">
        
        <label for="fat-info">Fat: </label>
        <input type="text" id="fat-info" name="fat">
        
        <label for="saturated-fat-info">Saturated-fat: </label>
        <input type="text" id="saturated-fat-info" name="saturated-fat">
        
        <label for="trans-fat-info">Trans-fat: </label>
        <input type="text" id="trans-fat-info" name="trans-fat">
        
        <label for="polyunsaturated-fat-info">Polyunsaturated-fat: </label>
        <input type="text" id="polyunsaturated-fat-info" name="polyunsaturated-fat">
        
        <label for="monounsaturated-fat-info">Monounsaturated-fat: </label>
        <input type="text" id="monounsaturated-fat-info" name="monounsaturated-fat">
        
        <label for="carbohydrate-info">Carbohydrate: </label>
        <input type="text" id="carbohydrate-info" name="carbohydrate">
        
        <label for="sugars-info">Sugars: </label>
        <input type="text" id="sugars-info" name="sugars">
        
        <label for="dietary-fibre-info">Dietary-fibre: </label>
        <input type="text" id="dietary-fibre-info" name="dietary-fibre">
        
        <label for="sodium-info">Sodium: </label>
        <input type="text" id="sodium-info" name="sodium">
        
        <label for="potassium-info">Potassium: </label>
        <input type="text" id="potassium-info" name="potassium">
        
        <label for="calcium-info">Calcium: </label>
        <input type="text" id="calcium-info" name="calcium">
        
        <label for="vitamin-e-info">Vitamin-e: </label>
        <input type="text" id="vitamin-e-info" name="vitamin-e">
    `;
}
