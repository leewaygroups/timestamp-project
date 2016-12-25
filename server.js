var express = require('express');

var app = express();
var port = process.env.PORT || 4000;

var examples = "Ex1: https://freecodetimestamp.herokuapp.com/December%2015%172015, Ex2:  https://freecodetimestamp.herokuapp.com/1450112400000";

app.get('/', function (req, res) {
    res.json({
      examples: examples
    });
});

app.get('/:strParam', function (req, res) {
  var result = handleParam(req.params.strParam);
  var failureMessage = {
    message: "Request failed. See examples and format your request parameter accordingly",
    examples: examples
  };
  result ? res.json(result) : res.send(failureMessage);
});

app.listen((process.env.PORT || 4000), function () {
  console.log('timestamp service listening at port  ' + port);
});

function getMonth(num){
  var month;
  switch (num) {
    case 0:
      month = 'January'
      break;
    case 1:
      month = 'February'
      break;
    case 2:
      month = 'March'
      break;
    case 3:
      month = 'April'
      break;
    case 4:
      month = 'May'
      break;
    case 5:
      month = 'June'
      break;
    case 6:
      month = 'July'
      break;
    case 7:
      month = 'August'
      break;
    case 8:
      month = 'September'
      break;
    case 9:
      month = 'October'
      break;
    case 10:
      month = 'November'
      break;
    case 11:
      month = 'December'
      break;
    default:
      break;
  }

  return month;
}

function handleParam(inputVal){
  if(inputVal.match(/^\d+$/)){
    var unixtstmp = parseInt(inputVal);
    var naturalTime = new Date(unixtstmp)
    if(naturalTime instanceof Date ){
      return {
        unix: unixtstmp,
        natural: getMonth(naturalTime.getUTCMonth()) + " " + naturalTime.getDate() + ", " + naturalTime.getFullYear()
      }
    }
  }else{
    if(typeof inputVal === "string"){
      var num = Date.parse(inputVal);
      if(Number.isInteger(num)){
        var naturalTmp = new Date(num);
         if(naturalTmp instanceof Date ){
            return {
            unix: num,
            natural: getMonth(naturalTmp.getUTCMonth()) + " " + naturalTmp.getDate() + ", " + naturalTmp.getFullYear()
            }
         }
      }
    }
  }
  return; //just being explicit
}