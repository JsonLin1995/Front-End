function validateForm () {	
	var x = document.forms["form-1"]["username"].value;
	if (x == "") {		
		document.getElementById("msg-1").innerHTML = "Name must be filled out.";
		return false;
	}
	else {
		document.getElementById("msg-1").innerHTML = "";
		alert("Hello, " + x);		
		return true;
	}
}

function domValidate () {
	if (document.getElementById("input-1").checkValidity() == false) {
		document.getElementById("msg-2").innerHTML = inp.validationMessage;
	}
	else {
		document.getElementById("msg-2").innerHTML = "Valid input";
	}
}

function validityProp () {
	var msg = "";
	if (document.getElementById("input-2").validity.rangeOverflow) {
		msg = "Value too large";		
	}
	document.getElementById("msg-3").innerHTML = msg;
}