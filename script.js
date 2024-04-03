// Function to handle form submission
function handleSubmit(event) {
    event.preventDefault(); // Prevent form submission from refreshing the page

    // Get the input value from the text field
    var inputData = document.getElementById('inputData').value;

    // Call function to write data to Google Sheets
    writeToSheet(inputData);
}

// Function to write data to Google Sheets
function writeToSheet(inputData) {
    gapi.client.init({
        apiKey: 'AIzaSyCOLChtpoZ2xjRQYkP0fxC76XAdxBlgjhw', // Your API key
        clientId: '837911659361-5qs700ktfn1qpui7o2bv8gg9cnoe8ns4.apps.googleusercontent.com', // Your OAuth 2.0 client ID
        discoveryDocs: ["https://sheets.googleapis.com/$discovery/rest"],
        scope: 'https://www.googleapis.com/auth/spreadsheets',
    }).then(function () {
        return gapi.auth2.getAuthInstance().signIn();
    }).then(function() {
        // Get current date and time
        var now = new Date();
        var timestamp = now.toLocaleString();

        var params = {
            spreadsheetId: '1KqTNdondeCTRzuhj6-68JdiOkJwaq_6SRBL5fNaYKvU', // Your spreadsheet ID
            range: 'Sheet1', // Range where you want to write data
            valueInputOption: 'USER_ENTERED',
            resource: {
                values: [
                    [inputData, timestamp] // Data from the input field and timestamp
                ]
            }
        };

        var request = gapi.client.sheets.spreadsheets.values.append(params);
        request.then(function(response) {
            console.log('Data written to Google Sheets successfully');
        }, function(reason) {
            console.error('Error: ' + reason.result.error.message);
        });
    }, function(error) {
        console.error("Error initializing the API: ", error);
    });
}

// Load the API client and sign in the user on page load
function initClient() {
    gapi.load('client:auth2', function() {
        gapi.client.init({
            apiKey: 'YOUR_API_KEY', // Your API key
            clientId: 'YOUR_CLIENT_ID', // Your OAuth 2.0 client ID
            discoveryDocs: ["https://sheets.googleapis.com/$discovery/rest"],
            scope: 'https://www.googleapis.com/auth/spreadsheets',
        }).then(function() {
            // Listen for form submission
            document.getElementById('myForm').addEventListener('submit', handleSubmit);
        });
    });
}

// Load the API client and sign in the user
gapi.load('client:auth2', initClient);
