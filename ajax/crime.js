let data;

function loadDoc() {

  // Create a request variable and assign a new XMLHttpRequest object to it.
  var request = new XMLHttpRequest()

  // Open a new connection, using the GET request on the URL endpoint
  request.open('GET', 'https://services.arcgis.com/S9th0jAJ7bqgIRjw/arcgis/rest/services/Auto_Theft_2014_to_2017/FeatureServer/0/query?where=1%3D1&outFields=Lat,Long&outSR=4326&f=json', true)

  // Send request
  request.send()

  request.onload = function () {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("demo").innerHTML = this.responseText;
    }

    // Begin accessing JSON data here
    data = JSON.parse(this.responseText);
    console.log(this.responseText);

  }

}
