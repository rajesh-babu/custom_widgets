URLs:

Tags Input: http://rajesh-babu.github.io/custom_widgets/Tagsinput/Tagsinput.html

Super Accordion: http://rajesh-babu.github.io/custom_widgets/superAccordion/superAccordion.html

9 Dot pattern lock: http://rajesh-babu.github.io/custom_widgets/9DotPatternLock/index.html

Image Protector: http://rajesh-babu.github.io/custom_widgets/ImageProtector.html

Canvas Animation: http://rajesh-babu.github.io/custom_widgets/canvas_animation/index.html

1)Tagsinput
=========

This jQuery custom widget will turn your tag list into a magical input that turns each tag into a style-able object with its own delete link.

Usage: just add an input tag with values for tags and call the script below



<!doctype html>
<html lang="en">
<head>
  <script> 
  $(document).ready(function() {
    $("#tag").tagsinput();
  });
 
  </script> 
</head>
<body>
<div id="div1">
	<input id="tag" type="text" value="val1,val2,val3"></input>
</div>
</body>
</html>
