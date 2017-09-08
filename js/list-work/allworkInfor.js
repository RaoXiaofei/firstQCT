var AllPo = '';
var hr = window.location.href;

/*
 * 全部工作全局变量
 */
var keyWord=''
var keyWord1 = "-1";
var place = "全部"; 
var pos = "全部"; 
var salaryType = 0; 
var pageIndex = 1;  
var region = "";
var city = "";

if(getCookie("indexKey") == null){
	keyWord = keyWord1;
}
else{
	var keywwwww = unescape(getCookie("indexKey")) ;
	delCookie("indexKey");
	keyWord = keywwwww;
}
/*
 * 加载页面全局
 */
var isNext = false;
var isLoading = false;
var cityxity = unescape(getCookie("city"))


var changeC = getCookie("change");
if(getCookie("change") == null){
	atCity.innerHTML = unescape(getCookie("city"));
	this.city = cityxity;
}
else{
	atCity.innerHTML = unescape(getCookie("change"));
	this.city = unescape(changeC);
}

GetAllPosition();
$('#all-pos').attr("href","#allwork-infor").click(function(){
	this.keyWord = '-1';
	this.pageIndex = 1;
	this.pageSize = 20;
	this.place = "全部";
	this.pos = "全部";
	this.salaryType = 0;
	this.AllPo = "";
	GetAllPosition();
}.bind(this))

/*
 * 全部工作职位
 */
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
					allWork +=	'<li class="list-work01 list-text03 allwork_position" id="'+data.Result[i].PositionList[j].ID+'">'+data.Result[i].PositionList[j].Name+'</li>'
				}
			}
			$("#list-job01").html(allWork);
		}
		$(".allwork_position").eq(0).css("color","#000000");
		$(".allwork_position").each(function(){
			$(this).click(function(){
				$(".allwork_position").css("color","#3DA8F5");
				$(this).css("color","#000000");
				pos1 = this.innerText;
				pos = pos1;
				pageIndex = 1;
				pageSize = 1000;
				keyWord = '-1';
				GetAllPosition1()
			})
		})
	}
});

/*
 * 全部工作根据市获取区
 */
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
				cityty += '<li class="list-work01 list-text03 allwork_region">'+data.Result[i].RegionName+'</li>' 				
			}		
			$("#list-city01").html(cityty);
		}
		$(".allwork_region").eq(0).css("color", "#000000");
		$(".allwork_region").each(function(){
			$(this).click(function(){
				$(".allwork_region").css("color", "#3DA8F5");
				$(this).css("color","#000000")
				place1 = this.innerText;
				place = place1;
				pageIndex = 1;
				pageSize = 1000;
				keyWord = '-1';
				GetAllPosition1()
			})
		})
	}
});

/*
 * 获取全部工作函数
 */
function GetAllPosition(){
//	console.log(this.pageIndex)
	$.ajax({
		type:"post",
		url:urlf+"api/Company/AllPosition",
		async:true,
		data:{
			"Keyword": this.keyWord,
		    "Place": this.place,
		    "Occupation": this.pos,
		  	"SalaryType": this.salaryType,
		  	"PageIndex": this.pageIndex,
		  	"PageSize": this.pageSize,
		  	"Lng": 0,
		  	"Lat": 0
		},
		success:function(data){
//			console.log(data.Result)
			if(data.Status == 1){					
				for(var i in data.Result.List){
					if(data.Result.List[i].IsUrgent == false){
						AllPo += '<p class="index-guesstext" id="'+data.Result.List[i].ID+'" onclick="ShowIndexDe(this)">'
						AllPo += '<span class="index-text04">'+data.Result.List[i].Name+'</span>'
						AllPo += '<span class="index-text05">'+data.Result.List[i].CompanyName+'</span>'
						AllPo += '<span class="index-text12">'+data.Result.List[i].Distance+'</span>'
						AllPo += '<span class="index-text07">'+data.Result.List[i].Salary+'</span>'
						AllPo += '</p>'
					}
					else{
						AllPo += '<p class="index-guesstext" id="'+data.Result.List[i].ID+'" onclick="ShowIndexDe(this)">'
						AllPo += '<span class="index-text04">'+data.Result.List[i].Name+'<span class="index-text06">[<img src="img/urgent.png" />加急]</span></span>'
						AllPo += '<span class="index-text05">'+data.Result.List[i].CompanyName+'</span>'
						AllPo += '<span class="index-text12">'+data.Result.List[i].CompanyName+'</span>'
						AllPo += '<span class="index-text07">'+data.Result.List[i].Salary+'</span>'
						AllPo += '</p>'
					}
					
				}
						
				$("#allP").html(AllPo);
				this.isNext = data.Result.IsNext
				this.pageIndex ++;

//				console.log(this.PageIndex)
			}
			else{
				alert(data.Result);
			}
		}.bind(this)
	});	
}
//点击加载
function GetMore1(){
    this.isLoading = true;
    if(this.isLoading = true){ 
    	if(this.isNext){		
//  		console.log(this.pageIndex)
			$.ajax({
				type:"post",
				url:urlf+"api/Company/AllPosition",
				async:true,
				data:{
					"Keyword": this.keyWord,
				    "Place": this.place,
				    "Occupation": this.pos,
				  	"SalaryType": this.salaryType,
				  	"PageIndex": this.pageIndex,
				  	"PageSize": this.pageSize,
				  	"Lng": 0,
				  	"Lat": 0
				},
				success:function(data){
					if(data.Status == 1){			
						for(var i in data.Result.List){
							if(data.Result.List[i].IsUrgent == false){
								AllPo += '<p class="index-guesstext" id="'+data.Result.List[i].ID+'" onclick="ShowIndexDe(this)">'
								AllPo += '<span class="index-text04">'+data.Result.List[i].Name+'</span>'
								AllPo += '<span class="index-text05">'+data.Result.List[i].CompanyName+'</span>'
								AllPo += '<span class="index-text12">'+data.Result.List[i].Distance+'</span>'
								AllPo += '<span class="index-text07">'+data.Result.List[i].Salary+'</span>'
								AllPo += '</p>'
							}
							else{
								AllPo += '<p class="index-guesstext" id="'+data.Result.List[i].ID+'" onclick="ShowIndexDe(this)">'
								AllPo += '<span class="index-text04">'+data.Result.List[i].Name+'<span class="index-text06">[<img src="img/urgent.png" />加急]</span></span>'
								AllPo += '<span class="index-text05">'+data.Result.List[i].CompanyName+'</span>'
								AllPo += '<span class="index-text12">'+data.Result.List[i].CompanyName+'</span>'
								AllPo += '<span class="index-text07">'+data.Result.List[i].Salary+'</span>'
								AllPo += '</p>'
							}
						}											
						$("#allP").html(AllPo);
						this.isNext = data.Result.IsNext;
                        this.pageIndex++;  
                        
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

function GetAllPosition1(){
	var Allo = ''
	$.ajax({
		type:"post",
		url:urlf+"api/Company/AllPosition",
		async:true,
		data:{
			"Keyword": this.keyWord,
		    "Place": this.place,
		    "Occupation": this.pos,
		  	"SalaryType": this.salaryType,
		  	"PageIndex": this.pageIndex,
		  	"PageSize": this.pageSize,
		  	"Lng": 0,
		  	"Lat": 0
		},
		success:function(data){
//			console.log(data.Result)
			if(data.Status == 1){					
				for(var i in data.Result.List){
					if(data.Result.List[i].IsUrgent == false){
						Allo += '<p class="index-guesstext" id="'+data.Result.List[i].ID+'" onclick="ShowIndexDe(this)">'
						Allo += '<span class="index-text04">'+data.Result.List[i].Name+'</span>'
						Allo += '<span class="index-text05">'+data.Result.List[i].CompanyName+'</span>'
						Allo += '<span class="index-text12">'+data.Result.List[i].CompanyName+'</span>'
						Allo += '<span class="index-text07">'+data.Result.List[i].Salary+'</span>'
						Allo += '</p>'
					}
					else{
						Allo += '<p class="index-guesstext" id="'+data.Result.List[i].ID+'" onclick="ShowIndexDe(this)">'
						Allo += '<span class="index-text04">'+data.Result.List[i].Name+'<span class="index-text06">[<img src="img/urgent.png" />加急]</span></span>'
						Allo += '<span class="index-text05">'+data.Result.List[i].CompanyName+'</span>'
						Allo += '<span class="index-text12">'+data.Result.List[i].CompanyName+'</span>'
						Allo += '<span class="index-text07">'+data.Result.List[i].Salary+'</span>'
						Allo += '</p>'
					}
				}
						
				$("#allP").html(Allo);
				this.isNext = data.Result.IsNext
				this.pageIndex ++;

//				console.log(this.PageIndex)
			}
			else{
				alert(data.Result);
			}
		}.bind(this)
	});	
}
/*
 * 根据条件筛选全部工作
 */
$(".allwork_salary").eq(0).css("color", "#000000");
$(".allwork_salary").each(function(){
	$(this).click(function(){
		$(".allwork_salary").css("color","#3DA8F5");
		$(this).css("color","#000000");
		type1 = $(this).attr("id");
		salaryType = type1;
		pageIndex = 1;
		pageSize = 1000;
		keyWord = '-1';
		GetAllPosition1()
	})
})
/*
 * 显示工作详情
 */
function ShowWorkDe(workID){
	window.open("detail-parttimejob.html?id="+workID.id);
}
