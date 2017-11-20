function loadLeftNav () {
	var navContent = [
		{type: "header", filename: "", content: "HTML"},
		{type: "link", filename: "practice-1.html", content: "Tags"},
		{type: "link", filename: "practice-2.html", content: "Graphics"},
		{type: "link", filename: "practice-3.html", content: "Media"},
		{type: "link", filename: "practice-4.html", content: "APIs"},		
		{type: "header", filename: "", content: "Javascript"},
		{type: "link", filename: "js_practice-1.html", content: "Google Apps Script"},
		{type: "link", filename: "js_practice-2.html", content: "Input Validation"},
		{type: "link", filename: "js_practice-3.html", content: "Color Picker"},
		{type: "link", filename: "js_practice-4.html", content: "+ / - Trainer"},
		{type: "header", filename: "", content: "CSS"},
		{type: "link", filename: "css_practice-1.html", content: "Various Practice"}];
	
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