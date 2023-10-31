const get_proc = document.getElementById("get-procedure");
get_proc.addEventListener("click", () => {
    const disasterTypeSelect = document.getElementById("disasterType");
    const riskLevelSelect = document.getElementById("riskLevel");
    const proceduresDiv = document.getElementById("procedures");

    // Fetch the JSON data when the page loads
    fetch("../json/procedure.json")
        .then((response) => response.json())
        .then((proceduresData) => {
            // Populate the dropdowns with options
            const disasterTypes = Object.keys(proceduresData);
            disasterTypes.forEach((disasterType) => {
                const option = document.createElement("option");
                option.value = disasterType;
                option.textContent = disasterType;
                disasterTypeSelect.appendChild(option);
            });

            // Function to update procedures based on user selection
            function updateProcedures() {
                const selectedDisasterType = disasterTypeSelect.value;
                const selectedRiskLevel = riskLevelSelect.value;

                if (selectedDisasterType in proceduresData) {
                    const procedures = proceduresData[selectedDisasterType];
                    if (selectedRiskLevel in procedures) {
                        proceduresDiv.textContent = procedures[selectedRiskLevel];
                    } else {
                        proceduresDiv.textContent = "No procedure available for the selected risk level.";
                    }
                } else {
                    proceduresDiv.textContent = "No procedures available for the selected disaster type.";
                }
            }
            const get_proc = document.getElementById("get-procedure");
            get_proc.addEventListener("click", updateProcedures());
            // Add event listeners to the dropdowns

        })
        .catch((error) => {
            console.error("Failed to fetch procedures data: " + error);
        });
});
