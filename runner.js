var BASE_URI="https://raw.github.com/phiggins42/has.js/master/detect/";

var groups=["__base", "array", "audio","bugs", "css", "dates", "dom","events","features", "form",
            "function", "features" , "graphics", "json", "object", "script", "strings" , "video" ],
    loadedGroups=[],
    tests=[]
;

//we are intercepting all calls to has.add so we can capture the name of the test
var originalAdd=has.add;
has.add=function(name, fn){
    tests.push(name);
    originalAdd(name, fn);
};

var runTests=function(){
    var results=$("#results");
    
    $.each(tests, function(idx, testName){
        var result = has(testName);
        var p=$("<p></p>").attr("id",testName);
        
        var resultText = "unsupported";
        if (result){
            resultText = "supported";
        }
        
        p.text(testName + ':' +resultText).addClass(resultText);
        
        results.append(p);
    });
};

//called after all scripts have been loaded
//starts the test run
var scriptCallback=function(name){
    loadedGroups.push(name);
    console.log('loaded group '+name);
    if(loadedGroups.length===groups.length){
        runTests();
    }
};

$.each(groups, function(index, value) {
    var group = groups[index];
    var uri=BASE_URI+group+'.js';
    $.getScript(uri, function() {
        scriptCallback(group);
    });
});

