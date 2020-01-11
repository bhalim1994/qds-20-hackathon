let getDate = function(req, res) {

    // set the type of response:
    res.setHeader('Content-Type', 'application/json');
    let d = new Date();
  
    res.send({ msg: d });

    console.log("get date called");
  
};

module.exports = getDate;