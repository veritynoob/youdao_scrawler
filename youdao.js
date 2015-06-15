var i = 0;
var url;
var wordUrl;
var frame='<iframe id="tempframe" style="width:1px;height:1px;top:-999px;left:-999px;position:absolute;"></iframe>';
var unique_number = '<div id="unique_number" style="width:50px; height:50px; top:200px; left:200px; position:absolute; background-color:yellow; color:#000; border:1px solid #333;"></div>'
$("body").prepend(frame);
$("body").prepend(unique_number);

$("#tempframe").load(function(){
	var content = $("#tempframe").contents();
	var word = content.find("#phrsListTab>h2>span.keyword").text();

	var phones = Array();
	var phonetics = content.find("#phrsListTab>h2>div>span>span").each(function(){phones.push($(this).text());});

	phon = phones.join("!!!!");

	var result = Array();
	content.find("#phrsListTab>div>ul>li").each(function(){result.push( $(this).text());});
	explain = result.join("!!!!");
	
	url = "http://10.134.32.128:5000/push_word?word="+ word + "&explain="+ explain + "&phone=" + phon;
	$.get(url, function(data, status){
	});
});


function showNumber()
{
	$("#unique_number").html(i.toString());
	i++;
	setTimeout(onepass, 1000);
}

function onepass()
{
	if (i < 40001)
	{
		wordUrl = "http://10.134.32.128:5000/get_word?query=" + i;
		$.get(wordUrl, function(data, status){
			if (status=="success")
			{
				url = "http://dict.youdao.com/search?q=" + data;
				$("#tempframe").attr("src", url);			
			}
		});

		setTimeout(showNumber, 10);
	}
}
onepass();
