var scaleSize = 0;
function setup() {
  createCanvas(500, 500);
  slider = createSlider(5, 200, 10, 1);
}
function draw() {
  scaleSize = slider.value();
  var graph = "x+2";
  
  {background(220);
  var x = 400 / scaleSize;
  stroke(255, 255, 255);
  line(0, x, 0, x);
  for (var i = 0; i <= 1.5*scaleSize; i++) {
    line(i * x + 10, 0, i * x + 10, 500);
    line(0, i * x - 10, 500, i * x - 10);
  }
  stroke(40);
  line(210, 0, 210, 500);
  line(0, 390, 500, 390);
  
  }
  //graphs the function stored in the variable "graph"
  //graphLine(graph);
  var xRegressionLine = [2, 0.91, 3.62, 1.5, 2.77, 3.87, 0.5, 3, 4, 5.88, 5.5, 4.8, 5.5, 6.67, 7.42, 6, 7.5, 6.25, 8.2, 8.64, 9.56, 11, 10.36, 11, 7.5];
  var yRegressionLine = [2, 2.74, 4.21, 3.5, 3.64, 3.28, 1.5, 6, 5.7, 7.64, 6.24, 7.36, 9, 8.65, 9.69, 10, 11.37, 11.4, 14.3, 12.4, 15.64, 17, 13.8, 15, 16.78];
  //calculates the correlation coefficient and regression line of the points above
  //regressionLine(xRegressionLine, yRegressionLine);
  {
    //INSTRUCTIONS TO USE GRAPHING CALCULATOR
    //SEPARATE TERMS WITH SPACES AS SHOWN BELOW
    //otherFunc(+1xxx -6xx +9x +0);
    //MAKE SURE EACH TERM HAS A COEFFICIENT, INCLUDING -1, 1, AND 0
    //MAKE SURE EACH TERM HAS A + OR - BEFORE IT
    //INCLUDE EVERY TERM IN THE DEGREE (FOR EXAMPLE, IF THE DEGREE IS 3, INCLUDE THE TERM WITH THE POWER OF 3, POWER OF 2, POWER OF 1, AND THE CONSTANT, DONT LEAVE ANYTHING OUT)
    //INSTEAD OF WRITING x^2 or x^5, WRITE XX AND XXXXX
    otherFunc("+1xxx +6xx +2x +1");
    //x^3 + 6x^2 + 2x + 1
    //trigonometric("+sinx");
  }
}
function pointGraph(x, y) {
  strokeWeight(5);
  var xcoord = x * (400 / scaleSize) + 210;
  var ycoord = 400 - y * (400 / scaleSize) - 10;
  point(xcoord, ycoord);
  strokeWeight(1);
}
function lineGraph(x1, y1, x2, y2) {
  strokeWeight(5);
  var x1coord = x1 * (400 / scaleSize) + 210;
  var y1coord = 400 - y1 * (400 / scaleSize) - 10;
  var x2coord = x2 * (400 / scaleSize) + 210;
  var y2coord = 400 - y2 * (400 / scaleSize) - 10;
  line(x1coord, y1coord, x2coord, y2coord);
  strokeWeight(1);
}
function graphLine(func) {
  var chars = func.split("");
  var cf = "";
  //"2", "x", "+", "1"
  if (chars[0] != "-") {
    for (var i = 0; i < chars.length; i++) {
      if (func.charAt(i) == "x") {
        for (var j = 0; j < i; j++) {
          cf += chars[j];
        }
      }
    }
  } else if (chars[0] == "-") {
    for (var d = 0; d < chars.length; d++) {
      if (func.charAt(d) == "x") {
        for (var u = 1; u < d; u++) {
          cf += chars[u];
        }
      }
    }
  }
  var cfInt = Number(cf);
  if (chars[0] == "x") {
    cfInt = 1;
  }

  if (chars[0] == "-") {
    cfInt *= -1;
  }

  if (chars[0] == "-" && chars[1] == "x") {
    cfInt = -1;
  }
  var b = "";
  var bInt = "";
  for (var k = 1; k < chars.length; k++) {
    if (func.charAt(k) == "+") {
      for (var l = k + 1; l < chars.length; l++) {
        b += chars[l];
      }
      bInt = Number(b);
    }
    if (func.charAt(k) == "-") {
      for (var m = k + 1; m < chars.length; m++) {
        b += chars[m];
      }
      bInt = Number(b) * -1;
    }
  }
  //graph starts at x=-1 and ends at x=scaleSize
  var x1 = -scaleSize;
  var y1 = cfInt * -scaleSize + bInt;
  var x2 = scaleSize;
  var y2 = cfInt * scaleSize + bInt;
  lineGraph(x1, y1, x2, y2);
}
function regressionLine(x, y) {
  for (var i = 0; i < x.length; i++) {
    pointGraph(x[i], y[i]);
  }
  var sumx = 0;
  var sumy = 0;
  var sumxy = 0;
  var sumx2 = 0;
  var sumy2 = 0;
  var n = x.length;
  for (var m = 0; m < x.length; m++) {
	sumx += x[m];
	sumy += y[m];
	sumxy += x[m]*y[m];
	sumx2 += Math.pow(x[m],2);
	sumy2 += Math.pow(y[m],2);
  }
  var r = (n*sumxy-sumx*sumy)/Math.sqrt((n*sumx2-Math.pow(sumx, 2))*(n*sumy2-Math.pow(sumy, 2)));
  var xmean = 0;
  var ymean = 0;
  for (var j = 0; j < x.length; j++) {
	xmean += x[j];
	ymean += y[j];
  }
  xmean /= x.length;
  ymean /= x.length;
  var stDevXMeanDiff = 0;
  var stDevYMeanDiff = 0;
  for (var k = 0; k < x.length; k++) {
	stDevXMeanDiff += Math.pow((x[k]-xmean),2);
	stDevYMeanDiff += Math.pow((y[k]-ymean),2);
  }
  var stDevX = Math.sqrt(stDevXMeanDiff/(x.length-1));
  var stDevY = Math.sqrt(stDevYMeanDiff/(x.length-1));
  var a = r * stDevY/stDevX;
  var b = ymean - a * xmean;
  var regressionLineEquation = a + "x+" + b;
  graphLine(regressionLineEquation);
  text("Regression Line: y = " + a + "x + " + b, 15, 450);
  text("Correlation Coefficient: " + r, 75, 475);
}


function otherFunc(func) {
  var funcSplit = func.split(" ");
  var termDegree = funcSplit.length-1;
  var multiply = [];
  multiply.length = funcSplit.length;
  for (var i = 0; i < funcSplit.length; i++) {
    multiply[i] = funcSplit[i].replace(/\D/g, "");
  }
  for (var j = 0; j < multiply.length; j++) {
    if (funcSplit[j].charAt(0) == "-") {
      multiply[j] *= -1;
    }
    multiply[j] = Number(multiply[j]);
  }
  var resSend = [];
  resSend.length = multiply.length;
  for (var l = -scaleSize; l < scaleSize; l += 0.006) {
    for (var k = 0; k < resSend.length; k++) {
    resSend[k] = multiply[k] * Math.pow(l, multiply.length - (k + 1));
    }
    var sum = 0;
    for (var m = 0; m < resSend.length; m++) {
      sum += resSend[m];
    }
    pointGraph(l, sum);
  }
}

function trigonometric(func) {
  //tempfunc = cos(x);
  for (var i = 0; i < 10; i++) {
    if (func.charAt(0) == "+") {
      if (func.charAt(1) == "c" && func.charAt(2) == "o" && func.charAt(3) == "s") {
        for (var l = -scaleSize; l < scaleSize; l += 0.05) {
          pointGraph(l, cos(l));
        }
      }
      if (func.charAt(1) == "s" && func.charAt(2) == "i" && func.charAt(3) == "n") {
        for (var s = -scaleSize; s < scaleSize; s += 0.05) {
          pointGraph(s, sin(s));
        }
      }
    } else if (func.charAt(0) == "-") {
      if (func.charAt(1) == "c" && func.charAt(2) == "o" && func.charAt(3) == "s") {
        for (var b = -scaleSize; b < scaleSize; b += 0.05) {
          pointGraph(b, cos(b+PI));
        }
      }
      if (func.charAt(1) == "s" && func.charAt(2) == "i" && func.charAt(3) == "n") {
        for (var v = -scaleSize; v < scaleSize; v += 0.05) {
          pointGraph(v, sin(v+PI));
        }
      }
    }
  }
}
