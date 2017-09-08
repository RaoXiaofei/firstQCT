var pageIndex8 = 1;
var allPro = '';

GetRegion();
GetProvideInfor();
$("#nav07").attr("href","#provide-infor").click(function(){
	GetRegion();
	this.pageIndex8 = 1;
	this.pageSize = 20;
	this.place = "全部";
	this.salaryType = 0;
	this.allPro = '';
	GetProvideInfor();
}.bind(this))
/*
 * 获取供人信息列表函数
 */
function GetProvideInfor(){
	$.ajax({
		type:"post",
		url:urlf+"api/Company/Provide",
		async:true,
		data:{
			"Keyword": this.keyword,
  			"Place": this.place,
 	 		"SalaryType": this.salaryType,
  			"PageIndex": this.pageIndex8,
  			"PageSize": this.pageSize
		},
		success:function(data){
			if(data.Status == 1){
//				console.log(data.Result);
				var re = data.Result.List;			
				for(var i in re){
					allPro += '<p class="index-guesstext" id="'+re[i].ID+'" onclick = "ShowProDe(this)">'
					allPro +=	'<span class="index-text04">'+re[i].WorkType+'</span>'
					allPro +=	'<span class="index-text05">'+re[i].CompanyName+'</span>'
					allPro +=	'<span class="index-text12">'+re[i].Address+'</span>'
					allPro +=	'<span class="index-text07">'+re[i].Count+'</span>'
					allPro += '</p>'
				}
				
				$("#allProv").html(allPro);
				
				this.isNext = data.Result.IsNext
				this.pageIndex8++;
			}
			else{
				alert(data.Status);
			}
		}.bind(this)
	});
}
function GetMore8(){
    this.isLoading = true;
    if(this.isLoading = true){ 
    	if(this.isNext){		      			
			$.ajax({
				type:"post",
				url:urlf+"api/Company/Provide",
				async:true,
				data:{
					"Keyword": this.keyword,
		  			"Place": this.place,
		 	 		"SalaryType": this.salaryType,
		  			"PageIndex": this.pageIndex8,
		  			"PageSize": this.pageSize
				},
				success:function(data){
					if(data.Status == 1){
//						console.log(data.Result);
						var re = data.Result.List;			
						for(var i in re){
							allPro += '<p class="index-guesstext" id="'+re[i].ID+'" onclick = "ShowProDe(this)">'
							allPro +=	'<span class="index-text04">'+re[i].WorkType+'</span>'
							allPro +=	'<span class="index-text05">'+re[i].CompanyName+'</span>'
							allPro +=	'<span class="index-text12">'+re[i].Address+'</span>'
							allPro +=	'<span class="index-text07">'+re[i].Count+'</span>'
							allPro += '</p>'
						}								
						$("#allProv").html(allPro);
						this.isNext = data.Result.IsNext;
                        this.pageIndex8++;   
                        this.isLoading = false;
					}
					else{
						alert(data.Result);
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
/*
 * 根据市获取区
 */
function GetRegion(){
	var cityty = '';
	var cityty1 = ''
	$.ajax({
		type:"get",
		//宁波市
		url:urlf+"api/Sys/GetReginByCity?city="+this.city,
		async:true,
		success:function(data){
	//		console.log(data.Result);
			if(data.Status == 1){		
				for(var i in data.Result){
					cityty += '<li class="list-work01 list-text03 provide_region">'+data.Result[i].RegionName+'</li>' 				
				}		
				$("#list-city04").html(cityty);
			}
			$(".provide_region").eq(0).css("color","#000000");
			$(".provide_region").each(function(){
				$(this).click(function(){
					$(".provide_region").css("color","#3DA8F5");
					$(this).css("color", "#000000");
					place1 = this.innerText;
					place = place1;
					pageIndex8 = 1;
					pageSize = 1000;
					GetProvideInfor1();
				})
			})
		}
	});
}

function GetProvideInfor1(){
	var all = ''
	$.ajax({
		type:"post",
		url:urlf+"api/Company/Provide",
		async:true,
		data:{
			"Keyword": this.keyword,
  			"Place": this.place,
 	 		"SalaryType": this.salaryType,
  			"PageIndex": this.pageIndex8,
  			"PageSize": this.pageSize
		},
		success:function(data){
			if(data.Status == 1){
//				console.log(data.Result);
				var re = data.Result.List;			
				for(var i in re){
					all += '<p class="index-guesstext" id="'+re[i].ID+'" onclick = "ShowProDe(this)">'
					all +=	'<span class="index-text04">'+re[i].WorkType+'</span>'
					all +=	'<span class="index-text05">'+re[i].CompanyName+'</span>'
					all +=	'<span class="index-text12">'+re[i].Address+'</span>'
					all +=	'<span class="index-text07">'+re[i].Count+'</span>'
					all += '</p>'
				}
				
				$("#allProv").html(all);
				
				this.isNext = data.Result.IsNext
				this.pageIndex8++;
			}
			else{
				alert(data.Status);
			}
		}.bind(this)
	});
}
/*
 * 根据薪资和区进行筛选
 */
function ChooseRegionP(e){
	place1 = e.innerText;
	this.place = place1;
	this.pageIndex8 = 1;
	this.pageSize = 1000;
	GetProvideInfor1();
}
$(".provide_salary").eq(0).css("color","#000000");
$(".provide_salary").each(function(){
	$(this).click(function(){
		$(".provide_salary").css("color", "#3DA8F5");
		$(this).css("color","#000000");
		type1 = $(this).attr("id");
		this.salaryType = type1;
		this.pageIndex8 = 1;
		this.pageSize = 1000;
		GetProvideInfor1();
	})
})
/*
 * 显示供人信息详情
 */
function ShowProDe(provideID){
	window.open("detail-cofenssion.html?id="+provideID.id);
}