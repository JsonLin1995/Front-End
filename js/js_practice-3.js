$(document).ready(function() {
	var idList = [{slideId: "rSlide", decId: "rDec", hexId: "rHex"},
				  {slideId: "gSlide", decId: "gDec", hexId: "gHex"},
				  {slideId: "bSlide", decId: "bDec", hexId: "bHex"}];
	var i = 0,
		len = idList.length;
		
	for (i=0; i<len; i++) {
		setDefault(idList[i].slideId, idList[i].decId, idList[i].hexId);
	}
	getRBG();
});

//===========================================

function setDefault(slideId, decId, hexId) {	
	//set input handler and default value of text input 
	slideId = "#" + slideId;
	decId = "#" + decId;
	hexId = "#" + hexId;
	var slideValue = $(slideId).val();
	
	$(decId).val(slideValue);
	$(hexId).val( decStrToHexStr( $(slideId).val() ) );
	$(decId).css("width", "4em");
	$(hexId).css("width", "4em");
	
	
	$(slideId).on('input', function() {
		$(decId).val( $(slideId).val() );
		$(hexId).val( decStrToHexStr( $(slideId).val() ) );
		getRBG();
	});
	$(decId).on('change', function() {
		var decValue = checkDec(this.value);
		$(decId).val( decValue );
		$(slideId).val( decValue );
		$(hexId).val( decStrToHexStr( decValue ) );
		getRBG();
	});
	$(hexId).on('change', function() {
		var hexValue = checkHex(this.value);
		$(hexId).val(hexValue);
		$(slideId).val( hexStrToDecNum( hexValue ) );
		$(decId).val( hexStrToDecNum( hexValue ) );
		getRBG();
	});
	$(decId).on('focus', function() {
		this.select();
	});
	$(hexId).on('focus', function() {
		this.select();
	});
}

function getRBG() {
	/*
		change the bg-color of "#colorOutput" according to the slide input
		change the content of "#colorOutput" according to the slide input and the hex input		
	*/
	var r = $( '#rSlide' ).val(),
		g = $( '#gSlide' ).val(),
		b = $( '#bSlide' ).val(),
		rHex = $( '#rHex' ).val(),
		gHex = $( '#gHex' ).val(),
		bHex = $( '#bHex' ).val(),
		color = "rgb(" + r + "," + g + "," + b + ")",
		hexColor = "#" + rHex + gHex + bHex;
	$( '#colorOutput' ).css( {"background-color": color} );
	$( '#colorOutput' ).text( color + " / " + hexColor );
	if ( Number(r) + Number(g) + Number(b) < 300 ) {
		$( '#colorOutput' ).css( { "color": "white" } );
	}
	else {
		$( '#colorOutput' ).css( { "color": "black" } );
	}
}

function checkDec(decValue) {
	/*
		typeof input : string
		empty input -> return "0"
		too large -> return "255"
		too small -> return "0"
		"0"~"255" -> return original input value
	*/
	if ( decValue.length <= 0 ) {
		return "0";
	}
	else {		
		if ( Number(decValue) > 255 ) {
			return "255";
		}
		else if ( Number(decValue) < 0 ) {
			return "0";
		}
		else {
			return decValue;
		}
	}
}

function checkHex(hexValue) {
	/*
		typeof input : string
		too larger or nonhex-number -> return "ff"
		empty input -> return "00"
		only 1 digit -> fill to 2 digits with 0
		"00"~"ff" -> return original input value
	*/
	if (hexValue.length > 2) {
		return "ff";
	}
	else if (hexValue.length <= 0) {
		return "00";
	}
	else {
		if (hexValue.length == 1) {
			hexValue = "0" + hexValue;
		}
		if ( isNaN( Number( "0x" + hexValue ) ) ) {
			return "ff";
		}
		else {
			return hexValue;
		}
	}
}

function hexStrToDecNum( hexStr ) {
	//input "00"~"ff", return 0~255
	return Number( "0x" + hexStr );
}

function decStrToHexStr( decStr ) {
	//input "0"~"255", return "00"~"ff"
	var hexStr = Number(decStr).toString(16);
	if ( hexStr.length == 1 ) {
		hexStr = "0" + hexStr;
	}
	return hexStr;
}