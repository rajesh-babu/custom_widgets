/*
9-dot pattern lock
V1.0 beta
©2014 - Rajesh Babu

This is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License
it comes WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.

History
    2014/09/21: initial version
*/

$(function () {
	
    //Get the canvas & context 
	var cnvs, ct, container, offset, elemLeft, elemTop,
		elements = [],
		selectedElements = [],
		currentSelectedElement,
		lines = [],
		line_shadowBlur = 3,
		line_shadowColor = 'black', txtInput, chkInput;

	
	 //Run function when browser resizes
    $(window).resize( respondCanvas );
    function respondCanvas(){ 
        cnvs.attr('width', 250 ); //max width
        cnvs.attr('height', 300 ); //max height
        //Call a function to redraw other content (texts, images etc)		
    }
	

	$.fn.dotpattern = function(input){
		txtInput = $( this );
		chkInput = $('#'+input.patternCheck);		
		$( txtInput ).focus(function() {			
			if($(chkInput).is(':checked')){
				$(this).blur();
				$('body').append("<div id='canvsContainer'><canvas id='respondCanvas'></canvas></div>");
				$('#respondCanvas').css('display','block');
				var inpOffset = $( this ).offset();
				var xpos = inpOffset.left;
				var ypos = inpOffset.top + $( this ).outerHeight() ;
				$('#canvsContainer')
					.css('left',xpos)
					.css('top',ypos)
					.css('z-index','11');
				init();
				
			}
			$(document).bind('mousedown', ClickOutsideCheck);
		});
		
	};

	function ClickOutsideCheck(e){
		var el = e.target;
		if(el.id != txtInput.attr('id') && el.id != 'respondCanvas'){	
			reset();
			$('#canvsContainer').remove();
		}

	}
  		
	// settings for appearance
	var radius = 20,
		button_lineWidth = 3,
		lineWidth = 5,
		strokeStyle = '#003300',
		fillStyle = 'green',
		overFillStyle = 'yellow',
		overAgainFillStyle = 'pink',
		padding = 20,
		fs = overFillStyle;
		
	// variables to be used to reuse for some repeated properties
	var rp = radius + padding,
		center, verticalCenter, cnvsWidth, cnvsHeight,	
		rp2 = (radius*2) + padding;	
	
	function FillElementsPosArray(){
		// Buttons positions.
		elements.push(
			{id: 'cir1', centerX: rp, centerY: rp},
			{id: 'cir2', centerX: center, centerY: rp},
			{id: 'cir3', centerX: cnvsWidth - rp, centerY: rp},
			{id: 'cir4', centerX: rp, centerY: verticalCenter},
			{id: 'cir5', centerX: center, centerY: verticalCenter },
			{id: 'cir6', centerX: cnvsWidth - rp, centerY: verticalCenter},
			{id: 'cir7', centerX: rp, centerY: cnvsHeight - rp},
			{id: 'cir8', centerX: center, centerY: cnvsHeight - rp},
			{id: 'cir9', centerX: cnvsWidth - (rp), centerY: cnvsHeight - rp}
		);
		lines.push(
			// Horizontal lines
			{id: 'cir1cir2', moveToX: rp2, moveToY: rp, lineToX: center-radius, lineToY: rp},
			{id: 'cir2cir3', moveToX: center+radius, moveToY: rp, lineToX: cnvsWidth - (rp2), lineToY: rp},
			{id: 'cir4cir5', moveToX: rp2, moveToY: verticalCenter, lineToX: center-radius, lineToY: verticalCenter},
			{id: 'cir5cir6', moveToX: center+radius, moveToY: verticalCenter, lineToX: cnvsWidth - (rp2), lineToY: verticalCenter},
			{id: 'cir7cir8', moveToX: rp2, moveToY: cnvsHeight-(radius*2), lineToX: center-radius, lineToY: cnvsHeight-(radius*2)},
			{id: 'cir8cir9', moveToX: center+radius, moveToY: cnvsHeight-(radius*2), lineToX: cnvsWidth - (rp2), lineToY: cnvsHeight-(radius*2)},
			
			//Diagonal lines
			{id: 'cir1cir5', moveToX: rp, moveToY: rp, lineToX: center, lineToY: center+radius+lineWidth},
			{id: 'cir2cir4', moveToX: center, moveToY: rp, lineToX: rp, lineToY: center+radius},
			{id: 'cir2cir6', moveToX: center, moveToY: rp, lineToX: cnvsWidth - rp, lineToY: center+radius},
			{id: 'cir3cir5', moveToX: cnvsWidth-rp, moveToY: rp, lineToX: center, lineToY: center+radius+lineWidth},
			{id: 'cir4cir2', moveToX: rp, moveToY: center+radius, lineToX: center, lineToY: rp},
			{id: 'cir4cir8', moveToX: rp, moveToY: center+radius, lineToX: center, lineToY: cnvsHeight-(radius*2)},
			{id: 'cir6cir8', moveToX: cnvsWidth - rp, moveToY: center+radius, lineToX: center, lineToY: cnvsHeight-(radius*2)},
			{id: 'cir7cir5', moveToX: rp, moveToY: cnvsHeight-(radius*2), lineToX: center, lineToY: center+radius+lineWidth},
			{id: 'cir9cir5', moveToX: cnvsWidth-rp, moveToY: cnvsHeight-(radius*2), lineToX: center, lineToY: center+radius+lineWidth},
			
			//Vertical lines
			{id: 'cir1cir4', moveToX: rp, moveToY: rp, lineToX: rp, lineToY: center+radius},
			{id: 'cir2cir5', moveToX: center, moveToY: rp, lineToX: center, lineToY: center+radius},
			{id: 'cir3cir6', moveToX: cnvsWidth-rp, moveToY: rp, lineToX: cnvsWidth - rp, lineToY: center+radius},
			{id: 'cir4cir7', moveToX: rp, moveToY: center+radius, lineToX: rp, lineToY: cnvsHeight-radius},
			{id: 'cir5cir8', moveToX: center, moveToY: center+radius, lineToX: center, lineToY: cnvsHeight-radius},
			{id: 'cir6cir9', moveToX: cnvsWidth-rp, moveToY: verticalCenter, lineToX: cnvsWidth-rp, lineToY: cnvsHeight-radius}
		);
	}
	
	//initilize
	function init(){
		cnvs = $('#respondCanvas');
		ct = cnvs[0].getContext('2d');
		respondCanvas();		
		container = $(cnvs).parent();
		offset = $( cnvs ).offset();
		elemLeft = offset.left;
		elemTop = offset.top;
		center = cnvs.width() / 2;
		verticalCenter = cnvs.height() / 2;
		cnvsWidth = cnvs.width();
		cnvsHeight = cnvs.height();
		reset();
		FillElementsPosArray();
		ct.shadowBlur = line_shadowBlur;
		ct.shadowColor = line_shadowColor;		
		$(cnvs).css("background-color",'#c2c2c2');
		$(cnvs).css("border-radius",'10px');
		renderButtons();
		// Add event listener for `click` events.
		$('#respondCanvas').on("vmousedown",(function(event) {	
			if(hitTest(event)){
				isDrawing = true;
				highlightButton(currentSelectedElement);
				selectedElements.push(currentSelectedElement);
			}
		}));
		
		$('#respondCanvas').on("vmouseup",(function() {	
			isDrawing = false;
			calculateSelected();
		}));
		$('#respondCanvas')
			.on("vmouseout",(function() {
				if(isDrawing){
					isDrawing = false;
					calculateSelected();
				}
			  }));
	    $( "#respondCanvas" ).on("vmousemove",(function( event ) {
			if(isDrawing){
				if(hitTest(event) && selectedElements[selectedElements.length-1].id != currentSelectedElement.id){//check if previous element is same as current element to avoid duplicate
					setFillStyle(currentSelectedElement);
					selectedElements.push(currentSelectedElement);				
					drawline(currentSelectedElement);
					highlightButton(currentSelectedElement);
					highlightPrevSelectedBut(selectedElements);	
				}
			}
		}));
	}
	
	//draw lines
	function drawline(currentSelectedElement){
		// combine the previous selected id with current selected id and find the id in lines to highlight
		var targetID = selectedElements[selectedElements.length-2].id + currentSelectedElement.id;
		if(findButtonitem(targetID, lines).id) fillline(findButtonitem(targetID, lines).id);
	}
	//find specific id given array
	function fillline(id){
		var e = finditem(id, lines);
		ct.beginPath();
		ct.moveTo(e.moveToX, e.moveToY);
		ct.lineTo(e.lineToX, e.lineToY);
		ct.shadowBlur = line_shadowBlur;
		ct.shadowColor = line_shadowColor;
		ct.lineWidth = lineWidth;
		ct.stroke();
	}
	// Find the given Button element present using the manipulated 'id' property
	function findButtonitem(id, arr){
		var result;
		var id_reverse = "cir"+id.charAt(7)+"cir"+id.charAt(3);
		arr.forEach(function(element) {
			if(element.id == id){
				result = element;
			}else if(element.id == id_reverse){
				result = element;
			}
		});
		return result;
	}
	// Find the given element present using the 'id' property
	function finditem(id, arr){
		var result;
		arr.forEach(function(element) {
			if(element.id == id) result = element;
		});
		return result;
	}

	// Render elements.
	function renderButtons(){
		elements.forEach(function(element) {
		  ct.beginPath();
		  ct.arc(element.centerX, element.centerY, radius, 0, 2 * Math.PI, false);
		  ct.fillStyle = fillStyle;
		  ct.fill();
		  ct.lineWidth = button_lineWidth;
		  ct.strokeStyle = strokeStyle;
		  ct.stroke();
		});
	}
	
	
	// highlight the button when click and rollover 
	function highlightButton(e){
	  var element = e;
	  ct.beginPath();
	  ct.arc(element.centerX, element.centerY, radius, 0, 2 * Math.PI, false);
	  ct.fillStyle = fs;	  	  
	  ct.fill();
	  ct.lineWidth = button_lineWidth;
	  ct.strokeStyle = strokeStyle;
	  ct.stroke();	 
	  if(fs == overAgainFillStyle) fs = overFillStyle; // reset to regular color
	}
	
	var isDrawing = false;
	
	
	// Check whether the button clicked or not
	function hitTest(event){
		var result = false;
		var x = event.pageX - elemLeft,
			y = event.pageY - elemTop;
			var copiedElement = {};
			
		elements.forEach(function(element) {
			var xstrPos = element.centerX - radius; // determine the x starting position of hit area
			var xendPos = element.centerX + radius; // determine the x ending position of hit area
			
			var ystrPos = element.centerY - radius; // determine the y starting position of hit area
			var yendPos = element.centerY + radius;
			
			if (x > xstrPos && x < xendPos && y > ystrPos && y < yendPos) {
				result = true;
				$.extend(copiedElement, element); // use extend to avoid override the source element
				currentSelectedElement = copiedElement;
				return true;
			}			
		});
		return result;
	}
	
	// change the fill style if the button is selected for more than once
	function setFillStyle(e){
		selectedElements.forEach(function(element) {
			if(element.id == e.id){
				fs = overAgainFillStyle;
				return false;
			}
		});
	}

	// call this function to avoid lines visible on top of button
	function highlightPrevSelectedBut(e){
		//setFillStyle(e[e.length-1]);
		highlightButton(e[e.length-2]);
	}	
	//reset the canvas 	
	function reset(){
		// Store the current transformation matrix
		ct.save();

		// Use the identity matrix while clearing the canvas
		ct.setTransform(1, 0, 0, 1, 0, 0);
		ct.clearRect(0, 0, cnvsWidth, cnvsHeight);

		// Restore the transform
		ct.restore();
		selectedElements = [];
		
	}
	//calculate the selected button
	function calculateSelected(){
		if(selectedElements.length >0){
			var str = '';
			selectedElements.forEach(function(element) {
				var id = element.id;
				str = str + id.substring(3);		
			});
			reset();
			renderButtons();	
			$('#canvsContainer').remove();
			$( txtInput ).val(str);
		}		
	}

});
