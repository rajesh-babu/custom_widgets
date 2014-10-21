/*
	jQuery Tags Input - Custom Widget
*/
(function($){
	var addTagsfuns = []; // Array to hold functions created for tags
	$.fn.tagsinput = function(){
		var options = $.extend({
			defaultText: 'Add a tag',
			width: '300px',
			height: '35px'
		}); 
		/* Hide the argument holder */
		$(this).hide();
		
		/* create the container for tags */
		var markup = '<div id="tagsInputContainer" class="tagsinput"></div>';
		
		/* Add input to craete new tags */
		var addTagMarkup = '<div id="add_tag""><input id="add_tag_inp" type="text" data-default="'+options.defaultText+'"></input></div>';
		$(markup).insertAfter(this);
		$('#tagsInputContainer').append(addTagMarkup);
		
		/* Assign the default text */
		$('#add_tag_inp').val($('#add_tag_inp').attr('data-default'));
		
		/* Clear the placeholder text if default is present */
		$('#add_tag_inp').click(function(){
			if($('#add_tag_inp').val() === $('#add_tag_inp').attr('data-default')){
				$('#add_tag_inp').val('');
			}
		});
		/* Add the tags upon focus out and clear the input text */
		$('#add_tag_inp').blur(function(event){
			var tagValue = $('#add_tag_inp').val();
			if(tagValue != $('#add_tag_inp').attr('data-default') && tagValue!=''){
				createTag(tagValue, addTagsfuns.length);
				addTagsfuns.push(tagValue);
				$('#add_tag_inp').val('');
				$('#add_tag_inp').focus();
			}else{
				$('#add_tag_inp').val($('#add_tag_inp').attr('data-default'));
			}
		});
		
		$('#add_tag_inp').keyup(function(e) {
			var tagValue = $('#add_tag_inp').val();
			switch (e.keyCode) {
				case 8:  // Backspace
					if(tagValue === ''){
						removeTag(addTagsfuns.length-1);
						
					}
					break;
				case 9:  // Tab
					$('#add_tag_inp').focus();
					break;
				case 13: // Enter
					createTag(tagValue, addTagsfuns.length);
					addTagsfuns.push(tagValue);
					$('#add_tag_inp').val('');
					$('#add_tag_inp').focus();
					break;
				default:				
			}
		});
		
		var tags = $(this).val();
		var tagsArray = tags.split(',');
		
		/* Create a closure function to avoid variable overwrite */
		for(j=0;j<tagsArray.length;j++){
			addTagsfuns[j] = addtags(tagsArray[j],j);
		}
		for(i=0;i<tagsArray.length;i++){
			addTagsfuns[i]();
		}
		/* Wrap newly created tag within span element and wrap anchor for close button within span */ 
		function addtags(value, index){		
			return function(){
				createTag(value, index);
			}
		}
		/* function to create specific tag upon entering the text */
		function createTag(value, index){
			var tagsMarkup = '<span id="tag_'+index+'" class="tag">'+value+'&nbsp;&nbsp<a id="close_'+index+'" href="#" title="remove tag">x</a></span>';
				$(tagsMarkup).insertBefore('#add_tag');				
					$('#close_'+index).click(function(){
						$('#tag_'+index).remove();
					});
		}
		/* Remove the specific tag */
		function removeTag(index){
			$('#tag_'+index).remove();
			addTagsfuns.splice(-1,1); // remove the last content in the array
		}
		
	}	
	
})(jQuery);
