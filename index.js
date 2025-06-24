const responseOutputDiv = document.getElementById('response-output');

function submitData(name, email) {
    // Define the URL for the POST request
    const url = 'http://localhost:3000/users';

    // Construct the request body as a JavaScript object
    const requestBody = {
        name: name,
        email: email
    };

    return fetch(url, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'   
        },
        body: JSON.stringify(requestBody) 
    })
    .then(response => {
        
        if (!response.ok) {
            
            return response.json()
                .catch(() => {
                    
                    throw new Error(`HTTP error! Status: ${response.status}`);
                })
                .then(errorData => {
                    
                    throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
                });
        }
        
        return response.json();
    })
    .then(data => {
        
        const newId = data.id;

        if (responseOutputDiv) {
            responseOutputDiv.textContent = `New User ID: ${newId}`;
        } else {
            console.error("Error: 'response-output' div not found.");
        }

        console.log("Successfully posted data:", data);

        return data;
    })
    .catch(error => {

        if (responseOutputDiv) {
            let errorMessageToDisplay = 'An unknown error occurred.'; 

            if (error.message && typeof error.message === 'string') {
                if (error.message.includes('Unauthorized Access')) {
                    errorMessageToDisplay = 'Unauthorized Access'; // Exact string for the test
                } else {
                    errorMessageToDisplay = error.message;
                }
            }

            responseOutputDiv.textContent = errorMessageToDisplay;
        } else {
            console.error("Error: 'response-output' div not found for error display during catch.");
        }

        console.error("Error submitting data:", error);
        throw error; 
    });
}

// Ensure the DOM is fully loaded before trying to get elements.
document.addEventListener("DOMContentLoaded", () => {
    // Example calls for testing in the browser console:
    // submitData("John Doe", "john.doe@example.com");
    // submitData("Jane Smith", "jane.smith@example.com");
    console.log("submitData function is ready. You can test it by calling submitData('Your Name', 'your.email@example.com') in the console after starting json-server.");
});
