// js写法
// function fun(type,url,judg,success){
// 	var xhr = null;
// 	if(window.XMLHttpRequest){
// 	  xhr = new XMLHttpRequest();
// 	}else{
// 		xhr = new ActiveXObject("Microsoft.XMLHttp")
// 	}
// 	xhr.open(type,url,judg);
// 	xhr.send();
// 	xhr.onreadystatechange = function(){
// 		if(xhr.readyState ==4){
// 			if(xhr.status ==200){
// 				// var body = JSON.parse(xhr.responseText)
// 				// news(body)
// 				success && success(JSON.parse(xhr.responseText));		
// 			}
// 		}
// 	}
// }


// jquery
function ajax(option){
	var type = option.type;
	var url = option.url;
	var judg = option.judg;
	var success =option.success;

	var xhr = null;
	if(window.XMLHttpRequest){
	  xhr = new XMLHttpRequest();
	}else{
		xhr = new ActiveXObject("Microsoft.XMLHttp")
	}
	xhr.open(type,url,judg);
	xhr.send();
	xhr.onreadystatechange = function(){
		if(xhr.readyState ==4){
			if(xhr.status ==200){
				success && success(JSON.parse(xhr.responseText));		
			}
		}
	}

}