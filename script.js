// Function to fetch the CSV file and filter the rows by class code
function lookupSchedule() {
    // Get the class codes entered by the user
    const classCodesInput = document.querySelectorAll("[name='class-codes']");
    const classCodes = Array.from(classCodesInput).map(input => input.value.trim()).filter(Boolean);

    // Retrieve the selected value of the dropdown menu
    const selectedSchedule = document.getElementById("schedule-dropdown").value;

    // Construct the file path of the selected CSV file
    const CSV_URL = selectedSchedule;

    // Fetch the CSV file and parse it using Papa Parse
    Papa.parse(CSV_URL, {
        download: true,
        header: true,
        complete: function (results) {
            // Filter the rows that match the class codes
            let matchingRows = results.data.filter(row => classCodes.includes(row["Class No"]));

            // Generate the HTML for the table rows
            let tableRowsHTML = matchingRows.map(row => {
                return `
                    <tr>
                        <td>${row["Sr. No"]}</td>
                        <td>${row["Date/Time"]}</td>
                        <td>${row["Class No"]}</td>
                        <td>${row["Course Code"]}</td>
                        <td>${row["Course Title"]}</td>
                        <td>${row["Slot"]}</td>
                        <td>${row["Faculty Name"]}</td>
                    </tr>
                `;
            }).join("");

            // Add any missing courses to the table
            let missingCodes = classCodes.filter(code => !matchingRows.map(row => row["Class No"]).includes(code));
            let missingRowsHTML = missingCodes.map(code => {
                return `
                    <tr>
                        <td colspan="6">${code} - Course not found</td>
                    </tr>
                `;
            }).join("");
            tableRowsHTML += missingRowsHTML;

            // Update the table body with the generated rows
            const tableBody = document.getElementById("schedule-table-body");
            tableBody.innerHTML = tableRowsHTML;



        }
    });
}

// Add course button 
function addCourseField() {
    const form = document.querySelector("form");
    const classFields = document.getElementsByName("class-codes");
    const newField = document.createElement("input");
    newField.type = "text";
    newField.name = "class-codes";
    newField.placeholder = "Class Code";
    classFields[classFields.length - 1].insertAdjacentElement("afterend", newField);
}

