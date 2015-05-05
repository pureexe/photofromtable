$(function() {
    $("#browsePhoto").click(function() {
        $("#imageFile").click();
    });
    $('#imageFile').change( function(event) {
		var fullPath = $('#imageFile').val();
		if(fullPath!=""){
			var fileName = fullPath.split("\\");
			fileName = fileName[fileName.length-1];
			filename = fileName.split(".");
			$("#browsePhoto").hide();
			$("#processDisplay").show();
           	var imagePath = URL.createObjectURL(event.target.files[0]);
			var image = new Image();
			image.onload = function() {
				var self = this;
				$("#mycanvas").attr({
					width:this.width,
					height:this.height
				});
				var canvas = document.getElementById('mycanvas');
				var context = canvas.getContext('2d');
				context.drawImage(self, 0, 0);
				var myWorker = new Worker("js/app-worker.js");
				myWorker.onmessage = function(r){
					$("#processDisplay").hide();
					var blob = new Blob([r.data]);
					$("#btnDisplay").append('<a class="btn btn-lg btn-default" id="downloadJson" download="'+fileName+'.html" href="'+URL.createObjectURL(blob)+'">Download</a>');
					$("#downloadJson").click(function() {
						$("#browsePhoto").show();
						$("#downloadJson").remove();
						$("#canvas").html('<canvas style="display:none" id="mycanvas" width="100px" height="100px"></canvas>');
					});
				};
				myWorker.postMessage(context.getImageData(0, 0, this.width,this.height));				
			};
			image.src = imagePath;
		}
	});
});