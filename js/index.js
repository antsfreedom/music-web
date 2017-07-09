window.onload = function(){
	var mySwiper = new Swiper('.swiper-container', {
	autoplay: 1000,//可选选项，自动滑动
	pagination : '.swiper-pagination',
	paginationClickable :true,
	});


	var obtn1 = document.getElementById('btn1');	
	var oinp = document.getElementById('inp');
	var oul = document.getElementById('ul1');
	var ovideo = document.getElementById('vio');
	var oaud = document.getElementById('aud');
	// var oart = document.getElementById('artist');
	obtn1.onclick = function(){
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
					oimg.setAttribute('data-id',data.result.songs[i].mv);
					oimg.style.cursor = 'pointer';
					// titleA.innerHTML = data.result.songs[i].al.name;     //好像是专辑
					titleA.setAttribute('data-song',data.result.songs[i].id);
					titleA.innerHTML = data.result.songs[i].name;
					titleA.style.cursor = 'pointer';
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
			// ovideo.style.display = 'block';
			oaud.pause();
			var mv_id = target.getAttribute('data-id');
				if(mv_id ==0){
					alert('no mv')
				}else{
					ajax({
						type:'get',
						url:'https://api.imjad.cn/cloudmusic/?type=mv&id='+mv_id,
						judg:true,
						success:function(data){
							var ovio = document.getElementById("vio");
							// ovio.pause();
							ovio.setAttribute('src',data.data.brs["480"]);
					}
				})					
			}
		}
		if(target.nodeName.toLowerCase() == 'a'){	
			ovideo.pause();
			ajax({
				type:'get',
				url:'https://api.imjad.cn/cloudmusic/?type=song&id='+target.getAttribute('data-song')+'&br=128000',
				judg:true,
				success:function(data){
					var oaud = document.getElementById('aud');
					oaud.setAttribute('src',data.data[0].url);

				ajax({
					type:'get',
					url:'https://api.imjad.cn/cloudmusic/?type=lyric&id='+target.getAttribute('data-song')+'&br=128000',
					judg:true,
					success:function(data){
						var lyric = JSON.stringify(data.lrc.lyric);
						var lyricContainer = document.getElementById('lyricContainer');
						var arr_lyric = [];
            var reg = /\[\d{2}:\d{2}.\d{1,3}\]/g;
            var reg2 = /"|\[\d{2}:\d{2}.\d{1,3}\]/g;
            var arr_lyric = lyric.split(/\\n/g);
            var arr_lyric_time = [];
            var arr_lyric_body = [];

            for(var i=0;i<arr_lyric.length-1;i++){
              arr_lyric_time.push(arr_lyric[i].match(reg));

              arr_lyric_body.push(arr_lyric[i].replace(reg2, ''));
            }

            var mins_reg = /\d{2}:/g;

            var change_time =[];

            arr_lyric_time.forEach( function(arr, index) {
              var arr2 = arr.toString();

              var t = arr2.slice(1, -1).split(':');

              arr_lyric.push([parseInt(t[0], 10) * 60 + parseFloat(t[1]), arr_lyric_body[index]])
            });
            for(var i=0;i<arr_lyric.length;i++){
              // console.log(arr_lyric[i])
            }
            aud.ontimeupdate = function(){
              for(var i=0;i<arr_lyric.length;i++){
                if(this.currentTime > arr_lyric[i][0]){
                  lyricContainer.innerHTML = '';
                  var li = document.createElement('li');
                  li.innerText = arr_lyric[i][1];
                  lyricContainer.appendChild(li)
                }
              }
            }
					}
				})

				}
			});								
		}			
	}

	function parseLyric(text){
		var lines = text.split('\n'),
				pattern = /\[\d{2}:\d{2}.\d{2}\]/g,
				result = [];
		while (!pattern.test(lines[0])) {
       lines = lines.slice(1);
      };
    lines[lines.length - 1].length === 0 && lines.pop();
    lines.forEach(function(v, i, a){
    	var time = v.match(pattern),
    			value =v.replace(pattern,'');
    	 time.forEach(function(v1, i1, a1) {
    	 	var t = v1.slice(1,-1).split(':');
    	 	result.push([parseInt(t[0],10) * 60 + parseFloat(t[1]), value])
    	 });
    });

    result.sort(function(a, b) {
      return a[0] - b[0];
    });
      return result;
	}
}