function loadLeftNav () {
	var navContent = [
		{type: "header", filename: "", content: "HTML"},
		{type: "link", filename: "practice-1.html", content: "Practice 1"},
		{type: "link", filename: "practice-2.html", content: "Practice 2"},
		{type: "link", filename: "practice-3.html", content: "Practice 3"},
		{type: "link", filename: "practice-4.html", content: "Practice 4"},		
		{type: "header", filename: "", content: "Javascript"},
		{type: "link", filename: "js_practice-1.html", content: "Practice 1"},
		{type: "link", filename: "js_practice-2.html", content: "Practice 2"}];
	
	var i = 0,
		l = navContent.length,
		filename = window.location.pathname.split("/").pop(),
		output = "";
		
	for (i=0; i<l; i++) {
		if (navContent[i].type == "header") {
			output += '<span class="block-header">' + navContent[i].content + '</span>';
		}
		else {
			if (navContent[i].filename == filename) {
				output += '<span class="visiting">' + navContent[i].content + '</span>';
			}
			else {
				output += '<a href="' + navContent[i].filename + '">' + 
						  navContent[i].content + '</a>';
			}
		}
	}
	document.getElementById("leftnav-container").innerHTML = output;
}

loadLeftNav();