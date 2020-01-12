let data;

function loadDoc() {

  // Create a request variable and assign a new XMLHttpRequest object to it.
var request = new XMLHttpRequest()

// Open a new connection, using the GET request on the URL endpoint
request.open('GET', 'https://ckan0.cf.opendata.inter.prod-toronto.ca/dataset/b66466c3-69c8-4825-9c8b-04b270069193/resource/059cde7d-21bc-4f24-a533-6c2c3fc33ef1/download/green-p-parking-2019.json', true)

// Send request
request.send()

request.onload = function() {
    document.getElementById("demo").innerHTML = this.responseText;

// Begin accessing JSON data here
data = JSON.parse(this.responseText);
console.log(this.responseText);

}

}