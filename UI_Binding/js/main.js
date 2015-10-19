(function(){
    var attrLbl = "data-CustomBind", elems = document.getElementsByClassName("CustomBind");
    for(var i=0;i<elems.length;i++){
        dataBind(elems[i]);
    }
    // Bind the Object with elements matching the attributes
    function dataBind(domElement) {
        var bind = domElement.getAttribute(attrLbl).split(":"), domAttr, itemAttr, defaultValue, parentObjArr, propertyName;     
        domAttr = "textContent";
        itemAttr = bind[0].trim();
        defaultValue = ( bind.length > 1 ) ? bind[1].trim() : ""; // set empty string if default value is not provided 
        parentObjArr = itemAttr.split('.');
        parentObj = parentObjArr[0];
        propertyName = parentObjArr[1];      
		if(parentObj && window[parentObj]) { // check whether the JS object present in the DOM or not
            Object.observe(window[parentObj], function (change) {
                domElement[domAttr] = ( window[parentObj][propertyName] !== "") ? window[parentObj][propertyName] : defaultValue;
            });
            domElement[domAttr] = ( window[parentObj][propertyName] !== "") ? window[parentObj][propertyName] : defaultValue;
        }
    }
})();
