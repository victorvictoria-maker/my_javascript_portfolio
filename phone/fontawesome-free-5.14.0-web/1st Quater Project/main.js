numbersdiv.style.display = "none";
selectsim.style.display = "none";

// function goOn() {
// 		offhomepage.style.display = "none";
// 		homepage.style.display = "block";
// }

// function goOff() {
// 		offhomepage.style.display = "block";
// 		homepage.style.display = "none";
// }
homepage.style.display = "block";

if (localStorage.vouchers == null) {
	localStorage.setItem("vouchers", "");
}
// console.log(localStorage.getItem("balance"))
if (typeof(localStorage.getItem("balance")) !== "string" || localStorage.getItem("balance") == "") {
	var getBalanceArr = [];
	var balanceObj = {mtnbalance: "0", airtelbalance: "0", globalance: "0", lastbalance: "0"};
	getBalanceArr.push(balanceObj);
	localStorage.setItem("balance", JSON.stringify(getBalanceArr));
}

function getAllVouchers() {
	if (localStorage.vouchers != "") {
		var getget = JSON.parse(localStorage.getItem("vouchers"));
		for (var i = 0; i < getget.length; i++) {
			var gaga = (getget[i]);

			var nini = document.createElement("div");
			nini.id = "typen"
			nini.innerHTML = gaga.Network;

			var cici = document.createElement("div");
			cici.id = "eachpricen";
			cici.innerHTML = gaga.Amount;

			var didi = document.createElement("div");
			didi.id = "eachvouchern";
			didi.innerHTML = gaga.Codes;

			var bibi = document.createElement("div");
			bibi.id = "unusedn"
			bibi.innerHTML = gaga.status;

			document.querySelector("#showvouchern").appendChild(nini);
			document.querySelector("#showvouchern").appendChild(cici);
			document.querySelector("#showvouchern").appendChild(didi);
			document.querySelector("#showvouchern").appendChild(bibi);
		}
	}
}

function showDialPage() {
	icons.style.display = "none";
	simcards.style.display = "none";
	oprtdiv.style.display = "none";
	numbersdiv.style.display = "block";
}
showvoucher.style.display="none";

function showValuee(value) {
	var val = value;
	showinput.value += val;
}

function clearLast() {
	showinput.value = showinput.value.substr(0,showinput.value.length-1)
}

function rechargeOrCall() {
	numbersdiv.style.display = "none";
	selectsim.style.display = "block";
	timewrapper.style.display = "none";
}

function goToHomePage() {
	icons.style.display = "block";
	simcards.style.display = "block";
	oprtdiv.style.display = "block";
	numbersdiv.style.display = "none";
}



var ringingtone;
var time;
var checkUsed;
function ifMtnFunc() {
	var checkBalZero = JSON.parse(localStorage.getItem("balance"));
	var checkBalMtnZero = checkBalZero[0].mtnbalance;
	numbersdiv.style.display = "block";
	selectsim.style.display = "none";
	if (showinput.value.length == 22) {
		var getGet = JSON.parse(localStorage.getItem("vouchers"));
		var getBalanceArr = JSON.parse(localStorage.getItem("balance"));
		for (var i = 0; i < getGet.length; i++) {
			var tikTok = getGet[i].Codes;
			if (
				(showinput.value.slice(0,5) == "*555*") &&
				(tikTok.search(showinput.value.slice(5,21)) != -1) &&
				(showinput.value.slice(21,22) == "#") && 
				(getGet[i].Network == "MTN") &&
				(getGet[i].status == "unused")
				) {
					var pop = getGet[i].Amount;
					var showLoad = "You have loaded " +pop+ " MTN airtime successfully!";
					accountbalancewrapper.style.display = "block";
					accountbalance.innerHTML = showLoad;
					getGet[i].status = "used";
					checkUsed = setInterval(changeMtnUsed,100);
					function changeMtnUsed() { 
						if (getGet[i].status == "used") {
						alert("hi");
						}
					}


					// var panpan = document.createElement("div");
					// panpan.id = "changenow";
					// panpan.innerHTML = "used";

					var getBalance = getBalanceArr[0].mtnbalance;
					var newBalance = parseInt(getBalance) + parseInt(pop);
					getBalanceArr[0].mtnbalance = parseInt(newBalance);

					localStorage.setItem("balance", JSON.stringify(getBalanceArr));
					localStorage.setItem("vouchers", JSON.stringify(getGet));
			} else if(
				(showinput.value.slice(0,5) == "*555*") &&
				(tikTok.search(showinput.value.slice(5,21)) != -1) &&
				(showinput.value.slice(21,22) == "#") && 
				(getGet[i].Network == "MTN") &&
				(getGet[i].status == "used")
				) {
					accountbalancewrapper.style.display = "block";
					accountbalance.innerHTML = "This voucher has been used already by you";
			}
		}
	} else if (showinput.value == "*556#") {
		var getBalanceFromStore = JSON.parse(localStorage.getItem("balance"));
		var getMtnBalanceStr = getBalanceFromStore[0].mtnbalance;
		accountbalancewrapper.style.display = "block";
		accountbalance.innerHTML = "Dear customer, your account balance is #" +	getMtnBalanceStr;	
	} else if (
		(showinput.value.length == 11) &&
		((showinput.value.slice(0,3) == "080") ||
		(showinput.value.slice(0,3) == "070") ||
		(showinput.value.slice(0,3) == "081") || 
		(showinput.value.slice(0,3) == "090"))) {
		if (checkBalMtnZero == 0) {
			dialing.style.display = "none";
			answerphone.style.display = "none";
			numbersdiv.style.display = "block";
			accountbalancewrapper.style.display = "block";
			accountbalance.innerHTML = "Dear customer, you do not have sufficient balance!";
		} else {
			ringingtone = new Audio('ringtone.m4a');
			ringingtone.play();
			time = setInterval(checkaudiotime, 1000);
			dialing.style.display = "block";
			answerphone.style.display = "block";
			answernumber.innerHTML = "+2349038938745";
			receiveorend.style.display = "block";
			callanswered.style.display = "none";
			numbersdiv.style.display = "none";
			dialnumber.innerHTML = showinput.value;
			dialsimtype.innerHTML = "MTN";
		}
	} else if (
		(showinput.value.length == 14) &&
		((showinput.value.slice(0,4) == "+234") ||
		(showinput.value.slice(0,4) == "+229"))) {
		if (checkBalMtnZero == 0) {
			dialing.style.display = "none";
			answerphone.style.display = "none";
			numbersdiv.style.display = "block";
			accountbalancewrapper.style.display = "block";
			accountbalance.innerHTML = "Dear customer, you do not have sufficient balance!";
		} else {
			ringingtone = new Audio('ringtone.m4a');
			ringingtone.play();
			time = setInterval(checkaudiotime, 1000);
			dialing.style.display = "block";
			answerphone.style.display = "block";
			answernumber.innerHTML = "+2349038938745";
			receiveorend.style.display = "block";
			callanswered.style.display = "none";
			numbersdiv.style.display = "none";
			dialnumber.innerHTML = showinput.value;
			dialsimtype.innerHTML = "MTN";
		}
	} else {
		alert('The number you dialed is unvailable');
		dialing.style.display = "none";
		answerphone.style.display = "none";
		numbersdiv.style.display = "block";
	}
}


function ifAirtelFunc() {
		var checkBalZero = JSON.parse(localStorage.getItem("balance"));
		var checkBalAirtelZero = checkBalZero[0].airtelbalance;
		numbersdiv.style.display = "block";
		selectsim.style.display = "none";
	if (showinput.value.length == 18) {
		var getGet = JSON.parse(localStorage.getItem("vouchers"));
		var getBalanceArr = JSON.parse(localStorage.getItem("balance"));
		for (var i = 0; i < getGet.length; i++) {
			var tikTok = getGet[i].Codes;
			if (
				(showinput.value.slice(0,5) == "*126*") &&
				(tikTok.search(showinput.value.slice(5,17)) != -1) &&
				(showinput.value.slice(17,18) == "#") && 
				(getGet[i].Network == "Airtel") &&
				(getGet[i].status == "unused")
				) {
					var pop = getGet[i].Amount;
					var showLoad = "You have loaded " +pop+ " Airtel airtime successfully!";
					accountbalancewrapper.style.display = "block";
					accountbalance.innerHTML = showLoad;
					getGet[i].status = "used";

					var getBalance = getBalanceArr[0].airtelbalance;
					var newBalance = parseInt(getBalance) + parseInt(pop);
					getBalanceArr[0].airtelbalance = newBalance;

					localStorage.setItem("balance", JSON.stringify(getBalanceArr));
					localStorage.setItem("vouchers", JSON.stringify(getGet))
			} else if(
				(showinput.value.slice(0,5) == "*126*") &&
				(tikTok.search(showinput.value.slice(5,17)) != -1) &&
				(showinput.value.slice(17,18) == "#") && 
				(getGet[i].Network == "Airtel") &&
				(getGet[i].status == "used")
				) {
					accountbalancewrapper.style.display = "block";
					accountbalance.innerHTML = "This voucher has been used already by you";
			}
		}

	} else if (showinput.value == "*123#") {
		var getBalanceFromStore = JSON.parse(localStorage.getItem("balance"));
		var getMtnBalanceStr = getBalanceFromStore[0].airtelbalance;
		accountbalancewrapper.style.display = "block";
		accountbalance.innerHTML = "Dear customer, your account balance is #" +	getMtnBalanceStr;
	} else if (
		(showinput.value.length == 11) &&
		((showinput.value.slice(0,3) == "080") ||
		(showinput.value.slice(0,3) == "070") ||
		(showinput.value.slice(0,3) == "081") || 
		(showinput.value.slice(0,3) == "090"))) {
		if (checkBalAirtelZero == 0) {
			dialing.style.display = "none";
			answerphone.style.display = "none";
			numbersdiv.style.display = "block";
			accountbalancewrapper.style.display = "block";
			accountbalance.innerHTML = "Dear customer, you do not have sufficient balance!";
		} else {
			ringingtone = new Audio('ringtone.m4a');
			ringingtone.play();
			time = setInterval(checkaudiotime, 1000);
			dialing.style.display = "block";
			answerphone.style.display = "block";
			answernumber.innerHTML = "+2349038938745";
			receiveorend.style.display = "block";
			callanswered.style.display = "none";
			numbersdiv.style.display = "none";
			dialnumber.innerHTML = showinput.value;
			dialsimtype.innerHTML = "Airtel";
		}
	} else if (
		(showinput.value.length == 14) &&
		((showinput.value.slice(0,4) == "+234") ||
		(showinput.value.slice(0,4) == "+229"))) {
		if (checkBalAirtelZero == 0) {
			dialing.style.display = "none";
			answerphone.style.display = "none";
			numbersdiv.style.display = "block";
			accountbalancewrapper.style.display = "block";
			accountbalance.innerHTML = "Dear customer, you do not have sufficient balance!";
		} else {
			ringingtone = new Audio('ringtone.m4a');
			ringingtone.play();
			time = setInterval(checkaudiotime, 1000);
			dialing.style.display = "block";
			answerphone.style.display = "block";
			answernumber.innerHTML = "+2349038938745";
			receiveorend.style.display = "block";
			callanswered.style.display = "none";
			numbersdiv.style.display = "none";
			dialnumber.innerHTML = showinput.value;
			dialsimtype.innerHTML = "Airtel";
		}
	} else {
		alert('The number you dialed is unvailable');
		dialing.style.display = "none";
		answerphone.style.display = "none";
		numbersdiv.style.display = "block";
	}
}


function ifGloFunc() {
		var checkBalZero = JSON.parse(localStorage.getItem("balance"));
		var checkBalGloZero = checkBalZero[0].globalance;
		numbersdiv.style.display = "block";
		selectsim.style.display = "none";
	if (showinput.value.length == 21) {
		var getGet = JSON.parse(localStorage.getItem("vouchers"));
		var getBalanceArr = JSON.parse(localStorage.getItem("balance"));
		for (var i = 0; i < getGet.length; i++) {
			var tikTok = getGet[i].Codes;
			if (
				(showinput.value.slice(0,5) == "*123*") &&
				(tikTok.search(showinput.value.slice(5,20)) != -1) &&
				(showinput.value.slice(20,21) == "#") && 
				(getGet[i].Network == "GLO") &&
				(getGet[i].status == "unused")
				) {
					var pop = getGet[i].Amount;
					var showLoad = "You have loaded " +pop+ " GLO airtime successfully!";
					accountbalancewrapper.style.display = "block";
					accountbalance.innerHTML = showLoad;
					getGet[i].status = "used";

					var getBalance = getBalanceArr[0].globalance;
					var newBalance = parseInt(getBalance) + parseInt(pop);
					getBalanceArr[0].globalance = newBalance;

					localStorage.setItem("balance", JSON.stringify(getBalanceArr));
					localStorage.setItem("vouchers", JSON.stringify(getGet));
			} else if(
				(showinput.value.slice(0,5) == "*123*") &&
				(tikTok.search(showinput.value.slice(5,20)) != -1) &&
				(showinput.value.slice(20,21) == "#") && 
				(getGet[i].Network == "GLO") &&
				(getGet[i].status == "used")
				) {
				accountbalancewrapper.style.display = "block";
				accountbalance.innerHTML = "This voucher has been used already by you";
			}
		}
	} else if (showinput.value == "*124#") {
		var getBalanceFromStore = JSON.parse(localStorage.getItem("balance"));
		var getMtnBalanceStr = getBalanceFromStore[0].globalance;
		accountbalancewrapper.style.display = "block";
		accountbalance.innerHTML = "Dear customer, your account balance is #" +	getMtnBalanceStr;
	} else if (
		(showinput.value.length == 11) &&
		((showinput.value.slice(0,3) == "080") ||
		(showinput.value.slice(0,3) == "070") ||
		(showinput.value.slice(0,3) == "081") || 
		(showinput.value.slice(0,3) == "090"))) {
		if (checkBalGloZero == 0) {
			dialing.style.display = "none";
			answerphone.style.display = "none";
			numbersdiv.style.display = "block";
			accountbalancewrapper.style.display = "block";
			accountbalance.innerHTML = "Dear customer, you do not have sufficient balance!";
		} else {
			ringingtone = new Audio('ringtone.m4a');
			ringingtone.play();
			time = setInterval(checkaudiotime, 1000);
			dialing.style.display = "block";
			answerphone.style.display = "block";
			answernumber.innerHTML = "+2349038938745";
			receiveorend.style.display = "block";
			callanswered.style.display = "none";
			numbersdiv.style.display = "none";
			dialnumber.innerHTML = showinput.value;
			dialsimtype.innerHTML = "GLO";
		}	
	} else if (
		(showinput.value.length == 14) &&
		((showinput.value.slice(0,4) == "+234") ||
		(showinput.value.slice(0,4) == "+229"))) {
		if (checkBalGLOZero == 0) {
			dialing.style.display = "none";
			answerphone.style.display = "none";
			numbersdiv.style.display = "block";
			accountbalancewrapper.style.display = "block";
			accountbalance.innerHTML = "Dear customer, you do not have sufficient balance!";
		} else {
			ringingtone = new Audio('ringtone.m4a');
			ringingtone.play();
			time = setInterval(checkaudiotime, 1000);
			dialing.style.display = "block";
			answerphone.style.display = "block";
			answernumber.innerHTML = "+2349038938745";
			receiveorend.style.display = "block";
			callanswered.style.display = "none";
			numbersdiv.style.display = "none";
			dialnumber.innerHTML = showinput.value;
			dialsimtype.innerHTML = "GLO";
		}
	} else {
		alert('The number you dialed is unvailable');
		dialing.style.display = "none";
		answerphone.style.display = "none";
		numbersdiv.style.display = "block";
	}
}


function if9mobileFunc() {
		var checkBalZero = JSON.parse(localStorage.getItem("balance"));
		var checkBal9mobileZero = checkBalZero[0].lastbalance;
		numbersdiv.style.display = "block";
		selectsim.style.display = "none";
	if (showinput.value.length == 21) {
		var getGet = JSON.parse(localStorage.getItem("vouchers"));
		var getBalanceArr = JSON.parse(localStorage.getItem("balance"));
		for (var i = 0; i < getGet.length; i++) {
			var tikTok = getGet[i].Codes;
			if (
				(showinput.value.slice(0,5) == "*222*") &&
				(tikTok.search(showinput.value.slice(5,20)) != -1) &&
				(showinput.value.slice(20,21) == "#") && 
				(getGet[i].Network == "9mobile") &&
				(getGet[i].status == "unused")
				) { 
					var pop = getGet[i].Amount;
					var showLoad = "You have loaded " +pop+ " 9mobile airtime successfully!";
					accountbalancewrapper.style.display = "block";
					accountbalance.innerHTML = showLoad;
					getGet[i].status = "used";

					var getBalance = getBalanceArr[0].lastbalance;
					var newBalance = parseInt(getBalance) + parseInt(pop);
					getBalanceArr[0].lastbalance = newBalance;

					localStorage.setItem("balance", JSON.stringify(getBalanceArr));
					localStorage.setItem("vouchers", JSON.stringify(getGet));
			} else if(
				(showinput.value.slice(0,5) == "*222*") &&
				(tikTok.search(showinput.value.slice(5,20)) != -1) &&
				(showinput.value.slice(20,21) == "#") && 
				(getGet[i].Network == "9mobile") &&
				(getGet[i].status == "used")
				) {
				accountbalancewrapper.style.display = "block";
				accountbalance.innerHTML = "This voucher has been used already by you";
			}
		}
	} else if (showinput.value == "*232#") {
		var getBalanceFromStore = JSON.parse(localStorage.getItem("balance"));
		var getMtnBalanceStr = getBalanceFromStore[0].lastbalance;
		accountbalancewrapper.style.display = "block";
		accountbalance.innerHTML = "Dear customer, your account balance is #" +	getMtnBalanceStr;	
	}else if (
		(showinput.value.length == 11) &&
		((showinput.value.slice(0,3) == "080") ||
		(showinput.value.slice(0,3) == "070") ||
		(showinput.value.slice(0,3) == "081") || 
		(showinput.value.slice(0,3) == "090"))) {
		if (checkBal9mobileZero == 0) {
			dialing.style.display = "none";
			answerphone.style.display = "none";
			numbersdiv.style.display = "block";
			accountbalancewrapper.style.display = "block";
			accountbalance.innerHTML = "Dear customer, you do not have sufficient balance!";
		} else {
			ringingtone = new Audio('ringtone.m4a');
			ringingtone.play();
			time = setInterval(checkaudiotime, 1000);
			dialing.style.display = "block";
			answerphone.style.display = "block";
			answernumber.innerHTML = "+2349038938745";
			receiveorend.style.display = "block";
			callanswered.style.display = "none";
			numbersdiv.style.display = "none";
			dialnumber.innerHTML = showinput.value;
			dialsimtype.innerHTML = "9mobile";
		}
	} else if (
		(showinput.value.length == 14) &&
		((showinput.value.slice(0,4) == "+234") ||
			(showinput.value.slice(0,4) == "+229"))) {
			ringingtone = new Audio('ringtone.m4a');
			ringingtone.play();
			time = setInterval(checkaudiotime, 1000);
			dialing.style.display = "block";
			answerphone.style.display = "block";
			answernumber.innerHTML = "+2349038938745";
			receiveorend.style.display = "block";
			callanswered.style.display = "none";
			numbersdiv.style.display = "none";
			dialnumber.innerHTML = showinput.value;
			dialsimtype.innerHTML = "9mobile";
	} else {
		alert('The number you dialed is unvailable');
		dialing.style.display = "none";
		answerphone.style.display = "none";
		numbersdiv.style.display = "block";
	}
}


function checkaudiotime() {
	if (ringingtone.currentTime > 30) {
		clearInterval(time);
		ringingtone.pause();
		answerphone.style.display = "none";
		dialing.style.display = "none";
		numbersdiv.style.display = "block";
	}
}


function myEndCall() {		
	if (sec.innerHTML == "") {	
		dialing.style.display = "none";
		answerphone.style.display = "none";
		numbersdiv.style.display = "block";
		accountbalancewrapper.style.display = "none";
		dialing.style.display = "none";
		answerphone.style.display = "none";	
		ringingtone.pause();	
	} else if (seccounter.innerHTML != "") {
		clearInterval(intSet);
		clearInterval(intSetForSecCounter);
		fs = 0;
		fm = 0;
		fh = 0;
		sec.innerHTML = 0;
		min.innerHTML = 0;
		anssec.innerHTML = 0;
		ansmin.innerHTML = 0;
		dialing.style.display = "none";
		answerphone.style.display = "none";
		numbersdiv.style.display = "block";
		showinput.value = "";
		accountbalancewrapper.style.display = "block";
		seccounter.style.display = "none";
		ansseccounter.style.display = "none";
		if (dialsimtype.innerHTML == "MTN") {
			var updatedBalance = getMtnForCall;
			getNetworkForCall[0].mtnbalance = updatedBalance;
			localStorage.setItem("balance", JSON.stringify(getNetworkForCall));
			var newUpdatedBalance = JSON.parse(localStorage.getItem("balance"));
			var extractBal = newUpdatedBalance[0].mtnbalance;
			accountbalance.innerHTML = "Dear customer, your new account balance is #" +	extractBal;
		}  else if (dialsimtype.innerHTML == "Airtel") {
			var updatedBalance = getAirtelForCall;
			getNetworkForCall[0].airtelbalance = updatedBalance;
			localStorage.setItem("balance", JSON.stringify(getNetworkForCall));
			var newUpdatedBalance = JSON.parse(localStorage.getItem("balance"));
			var extractBal = newUpdatedBalance[0].airtelbalance;
			accountbalance.innerHTML = "Dear customer, your new account balance is #" +	extractBal;
		} else if (dialsimtype.innerHTML == "GLO") {
			var updatedBalance = getGloForCall;
			getNetworkForCall[0].globalance = updatedBalance;
			localStorage.setItem("balance", JSON.stringify(getNetworkForCall));
			var newUpdatedBalance = JSON.parse(localStorage.getItem("balance"));
			var extractBal = newUpdatedBalance[0].globalance;
			accountbalance.innerHTML = "Dear customer, your new account balance is #" +	extractBal;
		} else if (dialsimtype.innerHTML == "9mobile") {
			var updatedBalance = getLastForCall;
			getNetworkForCall[0].lastbalance = updatedBalance;
			localStorage.setItem("balance", JSON.stringify(getNetworkForCall));
			var newUpdatedBalance = JSON.parse(localStorage.getItem("balance"));
			var extractBal = newUpdatedBalance[0].lastbalance;
			accountbalance.innerHTML = "Dear customer, your new account balance is #" +	extractBal;
		}
	}
}


function dontReceiveCall() {
	answerphone.style.display = "none";
	dialing.style.display = "none";
	answerphone.style.display = "none";
	numbersdiv.style.display = "block";
	ringingtone.pause();
}

// -----------------------airtime balance reduction
var intSet;
var intSetForSecCounter;
var fss = 0;
var fs = 0;
var fm = 0;
var fh = 0;
var getNetworkForCall = JSON.parse(localStorage.getItem("balance"));
function receiveCall() {
	ringingtone.pause();
	getNetworkForCall = JSON.parse(localStorage.getItem("balance"));
	intSet = setInterval(getDate, 1000);
	intSetForSecCounter = setInterval(readTime, 1000);
	receiveorend.style.display = "none";
	callanswered.style.display = "block";
	incoming.style.display = "none"; 
	seccounter.style.display = "";
	ansseccounter.style.display = "";
	sec.innerHTML = `:0${fs}`;
	min.innerHTML = "00";
	anssec.innerHTML = `:0${fs}`;
	ansmin.innerHTML = "00";
}


var getMtnForCall;
var getAirtelForCall;
var getGloForCall;
var getLastForCall;
function getDate() {
	if (dialsimtype.innerHTML == "MTN") {
		getMtnForCall = getNetworkForCall[0].mtnbalance;
		if (getNetworkForCall[0].mtnbalance == 0 || getNetworkForCall[0].mtnbalance <= 0.3) {
			getMtnForCall = 0;
			clearInterval(intSet);
			clearInterval(intSetForSecCounter);
			dialing.style.display = "none";
			answerphone.style.display = "none";
			numbersdiv.style.display = "block";
			showinput.value = "";
			accountbalancewrapper.style.display = "block";
			accountbalance.innerHTML = "OPS!, you exhausted your airtime."
		} else {
			getMtnForCall = getMtnForCall-0.5;
		}
		var updatedBalance = getMtnForCall;
		getNetworkForCall[0].mtnbalance = updatedBalance;
		localStorage.setItem("balance", JSON.stringify(getNetworkForCall));
	} else if (dialsimtype.innerHTML == "Airtel") {
		getAirtelForCall = getNetworkForCall[0].airtelbalance;
		if (getNetworkForCall[0].airtelbalance == 0 || getNetworkForCall[0].airtelbalance <= 0.3) {
			getAirtelForCall = 0;
			clearInterval(intSet);
			clearInterval(intSetForSecCounter);
			dialing.style.display = "none";
			answerphone.style.display = "none";
			numbersdiv.style.display = "block";
			showinput.value = "";
			accountbalancewrapper.style.display = "block";
			accountbalance.innerHTML = "OPS!, you exhausted your airtime."
		} else {
			getAirtelForCall = getAirtelForCall-0.5;
		}
		var updatedBalance = getAirtelForCall;
		getNetworkForCall[0].airtelbalance = updatedBalance;
		localStorage.setItem("balance", JSON.stringify(getNetworkForCall));
	} else if (dialsimtype.innerHTML == "GLO") {
		getGloForCall = getNetworkForCall[0].globalance;
		if (getNetworkForCall[0].globalance == 0 || getNetworkForCall[0].globalance <= 0.3) {
			getGloForCall = 0;
			clearInterval(intSet);
			clearInterval(intSetForSecCounter);
			dialing.style.display = "none";
			answerphone.style.display = "none";
			numbersdiv.style.display = "block";
			showinput.value = "";
			accountbalancewrapper.style.display = "block";
			accountbalance.innerHTML = "OPS!, you exhausted your airtime."
		} else {
			getGloForCall = getGloForCall-0.5;
		}
		var updatedBalance = getGloForCall;
		getNetworkForCall[0].globalance = updatedBalance;
		localStorage.setItem("balance", JSON.stringify(getNetworkForCall));
	} else if (dialsimtype.innerHTML == "9mobile") {
		getLastForCall = getNetworkForCall[0].lastbalance;
		if (getNetworkForCall[0].lastbalance == 0 || getNetworkForCall[0].lastbalance <= 0.3) {
			getLastForCall = 0;
			clearInterval(intSet);
			clearInterval(intSetForSecCounter);
			dialing.style.display = "none";
			answerphone.style.display = "none";
			numbersdiv.style.display = "block";
			showinput.value = "";
			accountbalancewrapper.style.display = "block";
			accountbalance.innerHTML = "OPS!, you exhausted your airtime."
		} else {
			getLastForCall = getLastForCall-0.5;
		}
		var updatedBalance = getLastForCall;
		getNetworkForCall[0].lastbalance = updatedBalance;
		localStorage.setItem("balance", JSON.stringify(getNetworkForCall));
	}
}


function readTime() {

	sec.innerHTML = `:${fs}`;
	anssec.innerHTML = `:${fs}`;
	min.innerHTML = fm;
	ansmin.innerHTML = fm;
	hr.innerHTML = `${fh}:`;
	anshr.innerHTML = `${fh}:`;


	fss+=1;
	fs+=1;

	if (fs < 10) {
		sec.innerHTML = `:0${fs}`;
		anssec.innerHTML = `:0${fs}`;

	}

	if (fm < 10) {
		min.innerHTML = `0${fm}`;
		ansmin.innerHTML = `0${fm}`;
	}

	if (fh < 10) {
		hr.innerHTML = `0${fh}:`;
		anshr.innerHTML = `0${fh}:`;
	}

	if (fs >= 60) {
		fs = 0;
		fm+=1;
	}

	if (fh !== 0) {
		hr.style.display = "block";
		anshr.style.display = "block";
	}

	if (fm >= 60) {
		fs = 0;
		fm = 0;
		fh+=1;
	}

}

function endCall() {
		clearInterval(intSet);
		clearInterval(intSetForSecCounter);
		fs = 0;
		fm = 0;
		fh = 0;
		sec.innerHTML = 0;
		min.innerHTML = 0;
		anssec.innerHTML = 0;
		ansmin.innerHTML = 0;
		dialing.style.display = "none";
		answerphone.style.display = "none";
		numbersdiv.style.display = "block";
		showinput.value = "";
		accountbalancewrapper.style.display = "block";
		seccounter.style.display = "none";
		ansseccounter.style.display = "none";
	if (dialsimtype.innerHTML == "MTN") {
		var updatedBalance = getMtnForCall;
		getNetworkForCall[0].mtnbalance = updatedBalance;
		localStorage.setItem("balance", JSON.stringify(getNetworkForCall));
		var newUpdatedBalance = JSON.parse(localStorage.getItem("balance"));
		var extractBal = newUpdatedBalance[0].mtnbalance;
		accountbalance.innerHTML = "Dear customer, your new account balance is #" +	extractBal;
	}  else if (dialsimtype.innerHTML == "Airtel") {
		var updatedBalance = getAirtelForCall;
		getNetworkForCall[0].airtelbalance = updatedBalance;
		console.log(updatedBalance);
		localStorage.setItem("balance", JSON.stringify(getNetworkForCall));
		var newUpdatedBalance = JSON.parse(localStorage.getItem("balance"));
		var extractBal = newUpdatedBalance[0].airtelbalance;
		accountbalance.innerHTML = "Dear customer, your new account balance is #" +	extractBal;
	} else if (dialsimtype.innerHTML == "GLO") {
		var updatedBalance = getGloForCall;
		getNetworkForCall[0].globalance = updatedBalance;
		console.log(updatedBalance);
		localStorage.setItem("balance", JSON.stringify(getNetworkForCall));
		var newUpdatedBalance = JSON.parse(localStorage.getItem("balance"));
		var extractBal = newUpdatedBalance[0].globalance;
		accountbalance.innerHTML = "Dear customer, your new account balance is #" +	extractBal;
	} else if (dialsimtype.innerHTML == "9mobile") {
		var updatedBalance = getLastForCall;
		getNetworkForCall[0].lastbalance = updatedBalance;
		console.log(updatedBalance);
		localStorage.setItem("balance", JSON.stringify(getNetworkForCall));
		var newUpdatedBalance = JSON.parse(localStorage.getItem("balance"));
		var extractBal = newUpdatedBalance[0].lastbalance;
		accountbalance.innerHTML = "Dear customer, your new account balance is #" +	extractBal;
	}
}


// card generator
var xoxo = [];
function display() {

	showvoucher.style.display="block";
	
	var tata = input.value;
	var lala = amount.value;
	var kaka = typer.value;

	if (tata == "" && lala == "" && kaka == "" ) {
		alert("Please, input the necessary informations for the vouchers to be generated!");
	} else if (tata == "" && lala != "" && kaka != "" ) {
		alert("Please, input the number of vouchers you want to buy");
	} else if (tata != "" && lala == "" && kaka != "" ) {
		alert("Please, input the price for the vouchers you would like to purchase");
	} else if (tata != "" && lala != "" && kaka == "" ) {
		alert("Please, input the type of vouchers you want to buy");
	} else {

		if(localStorage.vouchers != ""){
			if(typeof(localStorage.getItem("vouchers")) == "string"){
				xoxo = JSON.parse(localStorage.getItem("vouchers"));
			} else {
				xoxo = []
			};
		}

		for (var i = 1; i <= tata; i++) {
		var aaa = Math.floor(Math.random() * 9);
		var bbb = Math.floor(Math.random() * 9);
		var ccc = Math.floor(Math.random() * 9);
		var ddd = Math.floor(Math.random() * 9);
		var eee = Math.floor(Math.random() * 9);		
		var fff = Math.floor(Math.random() * 9);
		var ggg = Math.floor(Math.random() * 9);
		var hhh = Math.floor(Math.random() * 9);
		var iii = Math.floor(Math.random() * 9);
		var jjj = Math.floor(Math.random() * 9);
		var kkk = Math.floor(Math.random() * 9);
		var lll = Math.floor(Math.random() * 9);
		var mmm = Math.floor(Math.random() * 9);
		var nnn = Math.floor(Math.random() * 9);
		var ooo = Math.floor(Math.random() * 9);
		var ppp = Math.floor(Math.random() * 9);


		var nini = document.createElement("div");
		nini.id = "type"

		var cici = document.createElement("div");
		cici.id = "eachprice";

		var bibi = document.createElement("div");
		bibi.innerHTML = "unused"
		bibi.id = "unused"

		var didi = document.createElement("div");
		didi.id = "eachvoucher";

			if (kaka == "MTN") {
				var mama = aaa+""+bbb+""+ccc+""+ddd+""+eee+""+fff+""+ggg+""+hhh+""+iii+""+jjj+""+kkk+""+lll+""+mmm+""+nnn+""+ooo+""+ppp;
				nini.innerHTML = kaka;
				cici.innerHTML= lala;
				didi.innerHTML = mama;
			} 

			if (kaka == "Airtel") {
				var mama = aaa+""+bbb+""+ccc+""+ddd+""+eee+""+fff+""+ggg+""+hhh+""+iii+""+jjj+""+kkk+""+lll;
				nini.innerHTML = kaka;
				cici.innerHTML= lala;
				didi.innerHTML = mama;
			}

			if (kaka == "GLO") {
				var mama = aaa+""+bbb+""+ccc+""+ddd+""+eee+""+fff+""+ggg+""+hhh+""+iii+""+jjj+""+kkk+""+lll+""+mmm+""+nnn+""+ooo;
				nini.innerHTML = kaka;
				cici.innerHTML= lala;
				didi.innerHTML = mama;
			}

			if (kaka == "9mobile") {
				var mama = aaa+""+bbb+""+ccc+""+ddd+""+eee+""+fff+""+ggg+""+hhh+""+iii+""+jjj+""+kkk+""+lll+""+mmm+""+nnn+""+ooo;
				nini.innerHTML = kaka;
				cici.innerHTML= lala;
				didi.innerHTML = mama;
			}
			document.querySelector("#showvoucher").appendChild(nini);
			document.querySelector("#showvoucher").appendChild(cici);
			document.querySelector("#showvoucher").appendChild(didi);
			document.querySelector("#showvoucher").appendChild(bibi);

			var yinyin = {Network: typer.value, Amount: amount.value, Codes: didi.innerHTML, status: "unused"};
			xoxo.push(yinyin);
			localStorage.setItem("vouchers", JSON.stringify(xoxo));
		}
	}
}

function showNone() {
	accountbalancewrapper.style.display = "none";
	showinput.value = "";
}


//calculator page
function showCalculator() {
	icons.style.display = "none";
	simcards.style.display = "none";
	oprtdiv.style.display = "none";
	calcpage.style.display = "block";
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

var ss = calculatearea.innerHTML;


if (ss.search("sin") == -1 && ss.search("cos") == -1 && ss.search("tan") == -1 && ss.search("log") == -1) {
	var show = calculatearea.innerHTML;
	var ans = eval(show);
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

function clearOperation() {
	calculatearea.innerHTML = "";
	result.innerHTML = 0;
}

function removeLastValue() {
	calculatearea.innerHTML = calculatearea.innerHTML.substr(0,calculatearea.innerHTML.length-1)
}

function goToHomeFromCalcPage() {
	calculatearea.innerHTML = "";
	result.innerHTML = 0;
	calcpage.style.display = "none";
	icons.style.display = "block";
	simcards.style.display = "block";
	oprtdiv.style.display = "block";
}




 
// function teachsclice (){
// 	var kk = "*555*teachmesliceueygfdyugevchvefvufoeu#"
// 	var bb = kk.slice(0,5)
// 	var ff = kk.slice(-1)
// 	console.log(ff)
// }

// teachsclice();