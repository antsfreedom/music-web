window.onload = function(){
	var oul = document.getElementById('ul1');
	var obtn2 = document.getElementById('btn2');
	var oinp = document.getElementById('inp');
	var op1 = document.getElementById('p1');
	var oplay = document.getElementById('aud');
	obtn2.onclick = function(){
		ajax({
			type:'get',
			url:'https://api.imjad.cn/cloudmusic/?type=search&s='+oinp.value,
			judg:true,
			success:function(data){
				oul.innerHTML = '';
				for(var i=0;i<data.result.songs.length;i++){
					var li = document.createElement('li');
					var oimg = document.createElement('img');
					var titleA = document.createElement('a');
					var ospan = document.createElement('span');
					oimg.setAttribute('src',data.result.songs[i].al.picUrl);
					oimg.setAttribute('data-id',data.result.songs[i].id);
					titleA.innerHTML = data.result.songs[i].name;	
					ospan.innerHTML = data.result.songs[i].ar[0].name;				
					li.appendChild(oimg);
					li.appendChild(titleA);
					li.appendChild(ospan);
					oul.appendChild(li)
				}
			}
		})
	}

	oul.onclick = function(e){
		var oEvent = e ||window.event;  
		var target = oEvent.srcElement|| oEvent.target;  				
		if(target.nodeName.toLowerCase() == 'img'){
			ajax({
				type:'get',
				url:'https://api.imjad.cn/cloudmusic/?type=song&id='+target.getAttribute('data-id')+'&br=128000',
				judg:true,
				success:function(data){
					document.getElementById('aud').setAttribute('src',data.data[0].url);

					ajax({
						type:'get',
						url:'https://api.imjad.cn/cloudmusic/?type=artist&id='+target.getAttribute('data-id'),
						judg:true,
						success:function(data){
							console.log(data)
							document.getElementById('art').innerHTML = data.artist.name;
						}
					})					
				}
			})	
		}		
	} 
}