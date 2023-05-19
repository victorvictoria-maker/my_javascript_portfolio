calculatearea.style.display = "none";
function onAndOff() {
 	if (on.innerHTML == "ON") {
 		calculatearea.style.display = "block";
 		result.innerHTML = "0";
 		calculatearea.innerHTML = "";
 		on.innerHTML = "OFF";
 	} else { 
 		calculatearea.style.display = "height:80px";
 		calculatearea.innerHTML = "";
 		result.innerHTML = "";
 		on.innerHTML = "ON";
	}
}

function showValue(value) {
	var value = value;
	calculatearea.innerHTML += value;
}

function showScientific (scientific) {
	var sci = scientific;
	calculatearea.innerHTML += sci;
}


function equalto() {
	if ( (on.innerHTML == "OFF") && (result.innerHTML == 0) && (calculatearea.innerHTML == "")) {
		result.innerHTML = 0;
	} else if ((on.innerHTML == "OFF") && (calculatearea.innerHTML != "")) {
		var ss = calculatearea.innerHTML;

		if (ss.search("sin") == -1 && ss.search("cos") == -1 && ss.search("tan") == -1 && ss.search("log") == -1) {
			var ans = eval(calculatearea.innerHTML);
			result.innerHTML = ans;	
		} else if(ss.search("sin") != -1){
			var ee = ss.replace("sin" , "(Math.PI/180)*");
			var tt = eval(ee);
			var gg = Math.sin(tt);
			var hh = gg.toPrecision(4);
			result.innerHTML = hh;
		} else if (ss.search("cos") != -1){
			var ee = ss.replace("cos" , "(Math.PI/180)*");
			var tt = eval(ee);
			var gg = Math.cos(tt);
			var hh = gg.toPrecision(4);
			result.innerHTML = hh;
		} else if (ss.search("tan") != -1){
			var ee = ss.replace("tan" , "(Math.PI/180)*");
			var tt = eval(ee);
			var gg = Math.tan(tt);
			var hh = gg.toPrecision(4);
			result.innerHTML = hh;
		} else if (ss.search("log") != -1){
			var ee = ss.replace("log" , "Math.log10");
			var tt = eval(ee);
			var hh = tt.toPrecision(4);
			result.innerHTML = hh;
		}			
	} 
}


function findSqrt() {
	if (on.innerHTML == "OFF") {
		if (calculatearea.innerHTML != "") {
			
		if (sqrt.value == "sqrt") {
				var sqroot = Math.sqrt(calculatearea.innerHTML);
				result.innerHTML = sqroot;

				if (result.innerHTML.length > 1) {
					result.innerHTML = sqroot.toPrecision(4);	
				}	
			}
		} else {
			alert('Input the number you need to operate');	
		}
	}
}

function findSquare() {
	if (on.innerHTML == "OFF") {
		if (calculatearea.innerHTML != "") {
			if (square.value == "^2") {
				var sq = Math.pow(calculatearea.innerHTML, 2);
				result.innerHTML = sq;

				if (result.innerHTML.length > 1) {
					result.innerHTML = sq.toPrecision(4);	
				}	
			}
		} else {
			alert('input');
		}
		// } else if ((result.innerHTML == 0) && (calculatearea.innerHTML == "")) {
		// 	alert('Input the number you need to operate');	
		// }
	}
}

// function findPower() {
// 	if (on.innerHTML == "OFF") {
// 		if (calculatearea.innerHTML != "") {
// 			if (pwr.value == "^x") {
// 				var sq = Math.pow(calculatearea.innerHTML, 2);
// 				result.innerHTML = sq;

// 				if (result.innerHTML.length > 1) {
// 					result.innerHTML = sq.toPrecision(4);	
// 				}	
// 			}
// 		} else if ((result.innerHTML == 0) && (calculatearea.innerHTML == "")) {
// 			alert('Input the number you need to operate');	
// 		}
// 	}
// }

function clearOperation() {
	calculatearea.innerHTML = "";
	result.innerHTML = "0";
}

function removeLastValue() {
	calculatearea.innerHTML = calculatearea.innerHTML.substr(0,calculatearea.innerHTML.length-1)
}

function showRes() {
	if (result.innerHTML != 0) {
		var getResult = result.innerHTML;
		calculatearea.innerHTML = getResult;
		result.innerHTML = "";
	}
}

