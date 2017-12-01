$(document).ready(function() {
	var options = new globalOptions(
					getByName("op1-digits"),
					getByName("op2-digits"),
					getByName("operator"),
					getByName("other-display"),					
					getFlag("other-noNeg"),					
					getFlag("other-noEasy")				
				);
	var question = { op1: "", op2: "", operator: "", answer: "" };
	
	$('#answer').focus();
	setQuestion( options, question );
	
	$( '#save' ).on( 'click', function() {
		options = new globalOptions(
					getByName("op1-digits"),
					getByName("op2-digits"),
					getByName("operator"),
					getByName("other-display"),					
					getFlag("other-noNeg"),					
					getFlag("other-noEasy")			
				);
		setQuestion( options, question );
		$('#div-play').css({"opacity":"1"});
		$('#answer').focus();
		$("#save").attr("disabled", true);
	} );
	
	$( '#answer' ).keypress( function(e) {
		// check the answer when Enter is pressed
		if ( e.which == 13 ) {
			if ( $('#answer').val() == question.answer ) {
				$('#divQuestion').css( {"color": "white"} );
				$('#answer').css( {"color": "#00c600"} );
				setTimeout( function(){ 					
					setQuestion( options, question );
					$('#divQuestion').css( {"color": "black"} );
					$('#answer').css( {"color": "white"} );
				}, 500 );
				setTimeout( function(){ 
					$('#answer').val("");
					$('#answer').css( {"color": "black"} );	
				}, 1000 );				
			}
			else {
				$('#divQuestion').css( {"color": "red"} );
				$('#divAnswer').css( {"color": "red"} );
				$('#answer').css( {"color": "red"} );
				setTimeout( function(){ 
					$('#divQuestion').css( {"color": "black"} ); 
					$('#divAnswer').css( {"color": "black"} ); 
					$('#answer').css( {"color": "black"} );
				}, 500 );
			}
		}
	} );
	
	$('#answer').on('focus', function() {
		this.select();
	});
	
	$('#form-setting input').click( function(){
		$('#div-play').css({"opacity":"0"});
		$("#save").attr("disabled", false);
	} );
});

function globalOptions( op1Digits, op2Digits, operator, display, noNeg, noEasy ) {
	this.op1Digits = op1Digits;
	this.op2Digits = op2Digits;
	this.operator = operator;
	this.display = display;
	this.noNeg = noNeg;
	this.noEasy = noEasy;
}

function getByName( checkboxName ) {
	/*
		return checked options in string array
		if nothing is checked then auto check the first option
	*/
	
	var i = 0,
		checkedOptions = [],
		checkbox = document.getElementsByName(checkboxName);
		
	for( i=0; i<checkbox.length; i++ ){
		if ( checkbox[i].checked ) {
			checkedOptions.push( checkbox[i].value );	
		}
	}
	if ( checkedOptions.length == 0 ) {
		checkbox[0].checked = true;
		checkedOptions.push(checkbox[0].value);
	}
	return checkedOptions;
}

function getFlag( checkboxName ) {
	if ( document.getElementById(checkboxName).checked ) {
		return true;
	}
	return false;
}

function randomChoose( list ) {
	//return 1 value from the input array randomly
	return list[ Math.floor( Math.random() * list.length ) ];
}

function randomNumber( digits ) {
	//return a number according to the digits
	digits = Number(digits);
	var max = Math.pow( 10, digits ) - 1,
		min = Math.pow( 10, digits - 1 );
	return Math.floor( Math.random() * ( max - min + 1 ) + min );
}

function randomInRange( min, max ) {
	//return a number between min & max, both included
	return Math.floor( Math.random() * ( max - min + 1 ) + min );
}

function setQuestion( options, question ) {
	var tmpOp1Digits = randomChoose( options.op1Digits ),
		tmpOp2Digits = randomChoose( options.op2Digits ),
		tmpOperator = randomChoose( options.operator ),
		tmpNoNeg = options.noNeg,
		tmpNoEasy = options.noEasy,
		tmpOp1 = randomNumber( tmpOp1Digits ),
		tmpOp2 = randomNumber( tmpOp2Digits );
	
	if ( tmpNoEasy && !(tmpOp1Digits==1 && tmpOp2Digits==1) && tmpOperator == "-" ) {
		while ( Math.abs( tmpOp1 - tmpOp2 ) <= 10 ){
			tmpOp1 = randomNumber( tmpOp1Digits ),
			tmpOp2 = randomNumber( tmpOp2Digits );
		}
	}
	
	if ( tmpNoNeg && tmpOperator == "-" ) {
		if ( tmpOp1 < tmpOp2 ){
			[tmpOp1,tmpOp2] = [tmpOp2,tmpOp1];	//swap
		}
	}
	if ( tmpNoEasy ) {
		if ( tmpOperator == "+" ) {
			while ( tmpOp1%10+tmpOp2%10 < 10 ) { 
				if ( tmpOp1%10 < 9 ) { tmpOp1++; }
				else { tmpOp2++; }
			}
			//avoid too many (tmpOp1%10+tmpOp2%10 == 10)
			tmpOp1 = randomInRange( tmpOp1, Math.floor(tmpOp1/10)*10 + 9 );
			tmpOp2 = randomInRange( tmpOp2, Math.floor(tmpOp2/10)*10 + 9 );
		}
		else if ( tmpOperator == "-" ) {
			if ( Math.abs( tmpOp1 - tmpOp2 ) > 10 ) {
				if ( tmpOp1 > tmpOp2 ) {
					if ( tmpOp1%10 > tmpOp2%10 ) {
						// swap the digit in ones
						var op1Ones = tmpOp1%10,							
							op2Ones = tmpOp2%10;							
						tmpOp1 = Math.floor(tmpOp1/10)*10 + op2Ones;
						tmpOp2 = Math.floor(tmpOp2/10)*10 + op1Ones;
					}
					else if ( tmpOp1%10 == tmpOp2%10 ) {
						if ( tmpOp1%10 > 0 ) { tmpOp1--; }
						else { tmpOp2++; }
					}
				}
				else {
					if ( tmpOp1%10 < tmpOp2%10 ) {
						// swap the digit in ones
						var op1Ones = tmpOp1%10,							
							op2Ones = tmpOp2%10;							
						tmpOp1 = Math.floor(tmpOp1/10)*10 + op2Ones;
						tmpOp2 = Math.floor(tmpOp2/10)*10 + op1Ones;
					}
					else if ( tmpOp1%10 == tmpOp2%10 ) {
						if ( tmpOp2%10 > 0 ) { tmpOp2--; }
						else { tmpOp1++; }
					}
				}
			}
		}
	}
	
	question.op1 = tmpOp1.toString();
	question.op2 = tmpOp2.toString();
	question.operator = tmpOperator;
	
	if ( tmpOperator == "+" ) {
		question.answer = (tmpOp1+tmpOp2).toString();
	}
	else {
		question.answer = (tmpOp1-tmpOp2).toString();
	}
	$( '#op1' ).text( question.op1 );
	$( '#operator' ).text( question.operator );
	$( '#op2' ).text( question.op2 );	
	//$( '#answer' ).val( question.answer );	
}