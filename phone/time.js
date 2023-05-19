loadtime = () => {
	let current = new Date ();
	let gthr = current.getHours();
	let gtmin = current.getMinutes();
	setTimeout(loadtime, 1000);
	hour.innerHTML = `${gthr} :`
	minute.innerHTML = `${gtmin}`
	amOrpm.innerHTML = "AM";

	if ( gthr > 12) {
		hour.innerHTML = `${gthr -12} :`
		amOrpm.innerHTML = "PM";
	} else if (gthr == 0) {
		amOrpm.innerHTML = `12 :`;
	}

	if (gtmin < 10 ) {
		minute.innerHTML = `0${gtmin}`;
	}

	let gtDay = current.getDay();
	let gtMonth = current.getMonth();
	let gtDate = current.getDate();

	let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul",
					"Aug", "Sep", "Oct", "Nov", "Dec"];

	let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

	day.innerHTML = days[gtDay] +" ,";
	month.innerHTML = months[gtMonth];
	date.innerHTML = `${gtDate}`;
}
loadtime();
