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
    const homepage = document.querySelector(".home-elements")

    homepage.innerHTML += `<ul>
                              <li>ID</li>
                              <li>Name</li>
                              <li>Nutritional Info</li>
                              <li>Tags</li>`
    /** SHOWING ONLY 1 ELEMENT FROM THE JSON FILE, TO SHOW ALL OF THEM CHANGE NUMBER 1 TO (arrayData.length) */
    for (let i = 0; i < 1; i++) {
        homepage.innerHTML += `<ul>
                                    <li>${arrayData[i].id}</li>
                                    <li>${arrayData[i].name}</li>
                                    <li><a onclick="nutritionInformation(${arrayData[i]['nutrition-per-100g']})">View nutritional info</a></li>
                                    <li>${arrayData[i]['tags'] ? arrayData[i]['tags'] : "N/A"}</li>
                                </ul>`
    }
    homepage.innerHTML += `</ul>`

    console.table(arrayData)
}

function nutritionInformation(nutriInfo) {
    console.log(nutriInfo)
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
