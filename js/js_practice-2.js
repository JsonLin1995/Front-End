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