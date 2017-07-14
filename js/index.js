window.onload = function(){
	var mySwiper = new Swiper('.swiper-container', {
	autoplay: 1000,//可选选项，自动滑动
	pagination : '.swiper-pagination',    //分页器
	paginationClickable :true,
	nextButton: '.swiper-button-next',     //前进后退按钮
  prevButton: '.swiper-button-prev',
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
					
			// 歌词显示		
				ajax({
					type:'get',
					url:'https://api.imjad.cn/cloudmusic/?type=lyric&id='+target.getAttribute('data-song')+'&br=128000',
					judg:true,
					success:function(data){
						var lyric = data.lrc.lyric;
						// alert(lyric)   //显示的时间+歌词

						//匹配时间
						var timeReg = /\[\d{2}\:\d{2}\.\d{1,3}]/g;
						var time = lyric.match(timeReg)
						// alert(time)   

						//匹配歌词
						var Alyric = [];

						var lyrics = lyric.replace(timeReg,'');	

						var Alyric = lyrics.split('\n');

						// Alyric.push(afterLyric);
						// console.log(Alyric)
						// alert(Array.isArray(Alyric) )
							   //分割好的歌词

						// var sonAndtime =[];  //二维数组
						var Atime =[];
						for(var i=0;i<time.length-1;i++){

							seconds = time[i].toString().slice(1,-1).split(':');
							// console.log(Atime)      //把歌词时间分割了

							seconds = parseInt (seconds[0])*60 + parseInt(seconds[1]);
							// console.log(seconds )  //将时间转换成秒
							Atime[i]=seconds

							// alert(Array.isArray(Atime))
							// sonAndtime[i] = [Atime[i],Alyric[i]];
						}
							// console.log(Atime)    //将时间和歌词放在一个数组

						aud.ontimeupdate = function(){
							// var li = document.createElement('li');
							var oul1 = document.getElementById('lyricontent');
							for(var i=0;i<Atime.length;i++){
								if(this.currentTime>Atime[i]){
									oul1.innerHTML = '';
									var li = document.createElement('li')
									li.innerHTML = Alyric[i];
									oul1.appendChild(li)
								}
							}
						}
					}
				})
			}
		});											
	}
}
}