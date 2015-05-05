function rgbToHex(r, g, b) {
    if (r > 255 || g > 255 || b > 255)
        throw "Invalid color component";
    return ((r << 16) | (g << 8) | b).toString(16);
}
var onmessage = function(event) {
	var imagedata = event.data.data;
	var height = event.data.height;
	var width = event.data.width;
	var height = event.data.height;
	var width = event.data.width;
	var ct = 0;
	var output = [];
	for(i=0;i<height;i++){
		output.push([]);
		for(j=0;j<width;j++){
			var out = {};
			out.color = (("000000" + rgbToHex(imagedata[ct++],imagedata[ct++],imagedata[ct++])).slice(-6)).toUpperCase();
			ct++;
			out.span = 1;
			if(j!=0&&out.color==output[i].slice(-1)[0].color){
				output[i][output[i].length-1].span++;
			}else{
				output[i].push(out);
			}
		}
	}
	var tableoutput = "";
	output.forEach(function(i){
		tableoutput+="\t\t\t<tr height=1>\n";
		i.forEach(function(j){
			if(j.span>1){
				tableoutput+="\t\t\t\t<td width=1 colspan="+j.span+" bgcolor=#"+j.color+"></td>\n";
			}else{
				tableoutput+="\t\t\t\t<td width=1 bgcolor=#"+j.color+"></td>\n";
			}
		});
		tableoutput+="\t\t\t</tr>\n";
	});
	var htmloutput = "<html>\n\t<body>\n\t\t<table  border=0 cellpadding=0  cellspacing=0>\n"+tableoutput+"\t\t</table>\n\t</body>\n</html>";
	postMessage(htmloutput);
};