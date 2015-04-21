// Display some statistic about this computer, using node's os module.
$(function(){
	var os = require('os');
	
	//alert(process.platform)
	$("#more-stats").append("OS: "+process.platform+" ("+os.arch()+")");
	$('.stats').append('Well look at you, you got  <span>' + os.cpus().length + '</span> cpu cores, ');
	$('.stats').append('and you got <span>' + Math.round((os.freemem()*1.0E-9)*100)/100+ '</span> gb in free memory <== It lies!!!');

	// Node webkit's native UI library. We will need it for later
	var gui = require('nw.gui');

	console.log()
		

	});

function testers(name){
	var fs = require('fs');
	fs.writeFile("/home/tad/work/nwjs/test-2/storage/test.txt", "Hi mom!", function(err) {
	    if(err) {
	        alert("error");
	    }
	});
}

function testersR(name){
	var content;
	var fs = require('fs');
// First I want to read the file
fs.readFile('/home/tad/work/nwjs/test-2/storage/test.txt', function read(err, data) {
    if (err) {
        throw err;
    }
    content = data;

    // Invoke the next step here however you like
    console.log(content);   // Put all of the code here (not the best solution)
    processFile(content);          // Or put the next step in a function and invoke it
});


}

function processFile(xx) {
    alert(xx);
}


function getFiles (dir, files_){
	var fs = require('fs');
    files_ = files_ || [];
    var files = fs.readdirSync(dir);
    for (var i in files){
        var name = dir + '/' + files[i];
        if (fs.statSync(name).isDirectory()){
            getFiles(name, files_);
        } else {
            files_.push(name);
        }
    }
    return files_;
}

var maxNotes={
	filesA:[],
	init:function(){
		//alert(maxNotes.fileA.length);
		temps="";
		rep="";

		for(a=0;a<maxNotes.fileA.length;a++){
			//alert(maxNotes.fileA[a]);
			notesT=maxNotes.fileA[a].split("/storage");
			
			//alert(notesT[1]);
			noteName=notesT[1];
			noteName=noteName.split("/");
			noteName=noteName[2].split(".");
			//alert(noteName[0]);
			notesFolder=notesT[1].split("/");
			//alert(notesFolder[1]);
			if(rep!=notesFolder[1]){
				setFolder='<dt>'+notesFolder[1]+'</dt>';
			}else{
				setFolder="";
			}

			temps+=setFolder+'<dd><a href="'+maxNotes.fileA[a]+'" class="notelink">'+noteName[0]+'</a></dd>';
			rep=notesFolder[1];
		}
		$("#left").html('<dl>'+temps+'</dl>');
		$(".notelink").bind("click",function(e){
			e.preventDefault();
			//alert($(this).attr("href"));
			maxNotes.link($(this).attr("href"))
		})
	},
	link:function(name){
		var content;
			var fs = require('fs');
		// First I want to read the file
		fs.readFile(name, function read(err, data) {
		    if (err) {
		        throw err;
		    }
		    content = data;

		    // Invoke the next step here however you like
		    console.log(content);   // Put all of the code here (not the best solution)
		    processFile(content);          // Or put the next step in a function and invoke it
		});
	}
}

$(document).ready(function(){
	maxNotes.fileA=getFiles('/home/tad/work/nwjs/test-2/storage');

	maxNotes.init();
})