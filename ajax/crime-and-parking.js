
// we need a function to load files
// done is a "callback" function
// so you call it once you're finished and pass whatever you want
// in this case, we're passing the `responseText` of the XML request
var getData = function (filePath, done) {
  let file = fs.readFileSync(filePath);
  let data = JSON.parse(file);

  console.log(data);
  var request = new XMLHttpRequest();
  request.onload = function () {
    document.getElementById("demo").innerHTML = done(this.responseText);
  }
  request.open('GET', filePath, true);

  responseText.send();
}

// var myFiles = ['../data/parking-stall-data.json','../data/crime-toronto.json'];
// var jsonData = [];

// myFiles.forEach(function (file, i) {
//   console.log(file);
//   // and call loadFile
//   // note how a function is passed as the second parameter
//   // that's the callback function
//   loadFile(file, function (responseText) {
//     // we set jsonData[i] to the parse data since the requests
//     // will not necessarily come in order
//     // so we can't use JSONdata.push(JSON.parse(responseText));
//     // if the order doesn't matter, you can use push
//     jsonData[i] = JSON.parse(responseText);
//     // or you could choose not to store it in an array.
//     // whatever you decide to do with it, it is available as
//     // responseText within this scope (unparsed!)
//   })
// });

module.exports = getData;