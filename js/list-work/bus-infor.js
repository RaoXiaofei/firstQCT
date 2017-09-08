var pageIndex2 = 1;
var allB = '';
GetBusList();

/*
 * 点击显示全国大巴信息
 */
$("#nav04").attr("href","#bus-infor").click(function(){
	this.pageIndex2 = 1;
	this.pageSize = 20;
	this.allB = ''
	GetBusList();
}.bind(this))
/*
 * 获取全国大巴列表函数
 */
function GetBusList(){
	this.pageSize = 20;
	$.ajax({
		type:"get",
		url:urlf+"api/Company/Bus?pageIndex="+this.pageIndex2+"&pageSize="+this.pageSize+"&lng=0&lat=0",
		async:true,
		success:function(data){
			if(data.Status == 1){
				var re = data.Result.List;
//				console.log(data.Result);
				for(var i in re){
					if(re[i].IsUrgent == false){
						allB += '<p class="index-guesstext">'
						allB +=		'<span class="index-text04">'+re[i].DriverName+'</span>'
						allB +=		'<span class="index-text05">'+re[i].Address+'</span>'
						allB +=		'<span class="index-text12">'+re[i].LicensePlate+'</span>'
						allB +=		'<span class="index-text07">'+re[i].Phone+'</span>'	
						allB +=	'</p>'
					}
					else{
						allB += '<p class="index-guesstext">'
						allB +=		'<span class="index-text04">'+re[i].DriverName+'<span class="index-text06">[<img src="img/urgent.png" />加急]</span></span>'
						allB +=		'<span class="index-text05">'+re[i].Address+'</span>'
						allB +=		'<span class="index-text12">'+re[i].LicensePlate+'</span>'
						allB +=		'<span class="index-text07">'+re[i].Phone+'</span>'	
						allB +=	'</p>'
					}
				}
				$("#allBu").html(allB);
				
				this.isNext = data.Result.IsNext;
				this.pageIndex2++;
			}
			else{
				alert(data.Status);
			}
		}.bind(this)
	});
}
function GetMore5(){
	this.isLoading = true;
	if(this.isLoading = true){       	
		if(this.isNext){		      			
			$.ajax({
				type:"get",
				url:urlf+"api/Company/Bus?pageIndex="+this.pageIndex2+"&pageSize="+this.pageSize,
				async:true,
				success:function(data){
					if(data.Status == 1){
						var re = data.Result.List;
//						console.log(data.Result);
						for(var i in re){
							if(re[i].IsUrgent == false){
								allB += '<p class="index-guesstext">'
								allB +=		'<span class="index-text04">'+re[i].DriverName+'</span>'
								allB +=		'<span class="index-text05">'+re[i].Address+'</span>'
								allB +=		'<span class="index-text12">'+re[i].LicensePlate+'</span>'
								allB +=		'<span class="index-text07">'+re[i].Phone+'</span>'	
								allB +=	'</p>'
							}
							else{
								allB += '<p class="index-guesstext">'
								allB +=		'<span class="index-text04">'+re[i].DriverName+'<span class="index-text06">[<img src="img/urgent.png" />加急]</span></span>'
								allB +=		'<span class="index-text05">'+re[i].Address+'</span>'
								allB +=		'<span class="index-text12">'+re[i].LicensePlate+'</span>'
								allB +=		'<span class="index-text07">'+re[i].Phone+'</span>'	
								allB +=	'</p>'
							}		
						}
						$("#allBu").html(allB);
	
							this.isNext = data.Result.IsNext;
	                        this.pageIndex2++;   
	//	                            console.log(this.pageIndex)
	                        this.isLoading = false;
					}
					else{
						alert(data.Status)
					}
				}.bind(this)
			});
		}
		else{
			layer.open({ 
				content: "没有更多了",
				title: '温馨提示',
				area: ['320px', '180px'],
				success: function(layer) {
					layer[0].childNodes[3].childNodes[0].attributes[0].value = 'layui-layer-btn1';
				},
			});
		}
	}
}
