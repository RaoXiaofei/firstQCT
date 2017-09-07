var pageIndexR = 1;
var AllRoun = '';

getRoundRegion();
getAllPositionRound();
GetRoundWork();

$("#nav10").attr("href","#roundwork-infor").click(function(){
	getRoundRegion();
	this.pageIndexR = 1;
	this.pageSize = 20;
	this.place = "全部";
	this.pos = "全部";
	this.salaryType = 0;
	this.AllRoun = "";
	GetRoundWork();
}.bind(this))
/*
 * 获取获取周边工作函数
 */
function GetRoundWork(){
//	console.log(this.pageIndexR)
	this.keyWord = ""
	$.ajax({
		type:"post",
		url:urlf+"api/Company/NearbyPosition",
		async:true,
		data:{
			"Keyword": this.keyWord,
		    "Place": this.place,
		    "Occupation": this.pos,
		  	"SalaryType": this.salaryType,
		  	"PageIndex": this.pageIndexR,
		  	"PageSize": this.PageSize,
		  	"Lng": 0,
		  	"Lat": 0,
		  	"City": this.city
		},
		success:function(data){			
			if(data.Status == 1){	
//				console.log(data.Result)
				for(var i in data.Result.List){
					if(data.Result.List[i].IsUrgent == false){
						AllRoun += '<p class="index-guesstext" id="'+data.Result.List[i].ID+'" onclick="ShowIndexDe(this)">'
						AllRoun += '<span class="index-text04">'+data.Result.List[i].Name+'</span>'
						AllRoun += '<span class="index-text05">'+data.Result.List[i].CompanyName+'</span>'
						AllRoun += '<span class="index-text07">'+data.Result.List[i].Salary+'</span>'
						AllRoun += '</p>'
					}
					else{
						AllRoun += '<p class="index-guesstext" id="'+data.Result.List[i].ID+'" onclick="ShowIndexDe(this)">'
						AllRoun += '<span class="index-text04">'+data.Result.List[i].Name+'<span class="index-text06">[<img src="img/urgent.png" />加急]</span></span>'
						AllRoun += '<span class="index-text05">'+data.Result.List[i].CompanyName+'</span>'
						AllRoun += '<span class="index-text07">'+data.Result.List[i].Salary+'</span>'
						AllRoun += '</p>'
					}
					
				}
						
				$("#allArou").html(AllRoun);
				this.isNext = data.Result.IsNext
				this.pageIndexR ++

//				console.log(this.pageIndex)
			}
			else{
				alert(data.Result);
			}
		}.bind(this)
	});
}
/*
 * 点击加载更多
 */
function GetMore2(){	
    this.isLoading = true;
    if(this.isLoading = true){
		if(this.isNext){		      			
			$.ajax({
				type:"post",
				url:urlf+"api/Company/NearbyPosition",
				async:true,
				data:{
					"Keyword": this.keyWord,
				    "Place": this.place,
				    "Occupation": this.pos,
				  	"SalaryType": this.salaryType,
				  	"PageIndex": this.pageIndexR,
				  	"PageSize": this.pageSize,
				  	"Lng": 0,
				  	"Lat": 0,
				  	"City": this.city
				},
				success:function(data){
//					console.log(data.Result);
					if(data.Status == 1){			
						for(var i in data.Result.List){
							if(data.Result.List[i].IsUrgent == false){
								AllRoun += '<p class="index-guesstext" id="'+data.Result.List[i].ID+'" onclick="ShowIndexDe(this)">'
								AllRoun += '<span class="index-text04">'+data.Result.List[i].Name+'</span>'
								AllRoun += '<span class="index-text05">'+data.Result.List[i].CompanyName+'</span>'
								AllRoun += '<span class="index-text07">'+data.Result.List[i].Salary+'</span>'
								AllRoun += '</p>'
							}
							else{
								AllRoun += '<p class="index-guesstext" id="'+data.Result.List[i].ID+'" onclick="ShowIndexDe(this)">'
								AllRoun += '<span class="index-text04">'+data.Result.List[i].Name+'<span class="index-text06">[<img src="img/urgent.png" />加急]</span></span>'
								AllRoun += '<span class="index-text05">'+data.Result.List[i].CompanyName+'</span>'
								AllRoun += '<span class="index-text07">'+data.Result.List[i].Salary+'</span>'
								AllRoun += '</p>'
							}
						}											
						$("#allArou").html(AllRoun);
						this.isNext = data.Result.IsNext;
	                    this.pageIndexR++;   
//	                    console.log(this.pageIndex)
	                    this.isLoading = false;
					}
					else{
						alert(data.Result);
					}
				}.bind(this)
			});
		}
		else{
			alert("没有更多了")
		}
    }
}
/*
 * 获取周边工作全部职位
 */
function getAllPositionRound(){
	var allWork = '';
	$.ajax({
		type:"get",
		url:urlf+"api/Sys/GetPositionList",
		async:true,
		success:function(data){
	//		console.log(data.Result);
			re = data.Result;
			if(data.Status == 1){
				for(var i in data.Result){
					for(var j in data.Result[i].PositionList){
						allWork +=	'<li class="list-work01 list-text03 roundwork_position" id="'+data.Result[i].PositionList[j].ID+'">'+data.Result[i].PositionList[j].Name+'</li>'
					}
				}
				$("#list-job02").html(allWork);
			}
			$(".roundwork_position").eq(0).css("color","#000000");
			$(".roundwork_position").each(function(){
				$(this).click(function(){
					$(".roundwork_position").css("color","#3DA8F5");
					$(this).css("color","#000000");
					pos1 = this.innerText;
					pos = pos1;
					pageIndexR = 1;
					pageSize = 1000;
					GetRoundWork1()
				})
			})
		}
	});
}
/*
 * 周边工作根据市获取区
 */
function getRoundRegion(){
	var cityty = '';
	var cityty1 = ''
	$.ajax({
		type:"get",
		//宁波市
		url:urlf+"api/Sys/GetReginByCity?city="+this.city,
		async:true,
		success:function(data){
//			console.log(data.Result);
			if(data.Status == 1){		
				for(var i in data.Result){
					cityty += '<li class="list-work01 list-text03 roundwork_region">'+data.Result[i].RegionName+'</li>' 				
				}		
				$("#list-city02").html(cityty);
			}
			$(".roundwork_region").eq(0).css("color", "#000000");
			$(".roundwork_region").each(function(){
				$(this).click(function(){
					$(".roundwork_region").css("color", "#3DA8F5");
					$(this).css("color","#000000")
					place1 = this.innerText;
					place = place1;
					pageIndexR = 1;
					pageSize = 1000;
					GetRoundWork1();
				})
			})
		}
	});
}

function GetRoundWork1(){
	var all = "";
	$.ajax({
		type:"post",
		url:urlf+"api/Company/NearbyPosition",
		async:true,
		data:{
			"Keyword": this.keyWord,
		    "Place": this.place,
		    "Occupation": this.pos,
		  	"SalaryType": this.salaryType,
		  	"PageIndex": this.pageIndexR,
		  	"PageSize": this.pageSize,
		  	"Lng": 0,
		  	"Lat": 0,
		  	"City": this.city
		},
		success:function(data){			
			if(data.Status == 1){	
				for(var i = 0; i < data.Result.List.length; i++){
					if(data.Result.List[i].IsUrgent == false){
						all += '<p class="index-guesstext" id="'+data.Result.List[i].ID+'" onclick="ShowIndexDe(this)">'
						all += '<span class="index-text04">'+data.Result.List[i].Name+'</span>'
						all += '<span class="index-text05">'+data.Result.List[i].CompanyName+'</span>'
						all += '<span class="index-text07">'+data.Result.List[i].Salary+'</span>'
						all += '</p>'
					}
					else{
						all += '<p class="index-guesstext" id="'+data.Result.List[i].ID+'" onclick="ShowIndexDe(this)">'
						all += '<span class="index-text04">'+data.Result.List[i].Name+'<span class="index-text06">[<img src="img/urgent.png" />加急]</span></span>'
						all += '<span class="index-text05">'+data.Result.List[i].CompanyName+'</span>'
						all += '<span class="index-text07">'+data.Result.List[i].Salary+'</span>'
						all += '</p>'
					}
				}
						
				$("#allArou").html(all);
				this.isNext = data.Result.IsNext
				this.pageIndexR ++
			}
			else{
				alert(data.Result);
			}
		}.bind(this)
	});
}
/*
 * 根据条件筛选周边工作
 */
$(".roundwork_salary").eq(0).css("color","#000000");
$(".roundwork_salary").each(function(){
	$(this).click(function(){
		$(".roundwork_salary").css("color","#3DA8F5");
		$(this).css("color", "#000000");
		type1 = $(this).attr("id");
		salaryType = type1;
		pageIndexR = 1;
		pageSize = 1000;
		GetRoundWork1();
	})
})
function KeySearch(){
	var keyw = $("#keywords").val();
	this.keyWord = keyw;
	this.pageIndexR = 1;
	this.pageIndex = 1;
	this.pageSize = 1000;
	GetRoundWork1();
	GetAllPosition1();
}