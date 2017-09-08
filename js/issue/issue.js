/*
 * 点击跳转各项发布信息
 */
$('.TableCon').hide();
$('#issue-resume').show();
$('#distpicker-resume').distpicker({
    province: '',
    city: '',
    district: ''
  });
function SelectCon(e){
//	console.log(e.value);
	var TableCon = $('.TableCon');
//	console.log(TableCon);
	$('.TableCon').hide();
	$('#'+e.value).show();
	
	var dispicker = e.value;
	var disss = dispicker.split("-")[1];
	$('#distpicker-'+ disss).distpicker({
	    province: '',
	    city: '',
	    district: ''
	  });
	  
	Jobs('销售');
}
var city = unescape(getCookie("city"));
var changeC = getCookie("change");
if(getCookie("change") == null){
	atCity.innerHTML = unescape(getCookie("city"));
	this.city = unescape(city);
}
else{
	atCity.innerHTML = unescape(getCookie("change"));
	this.city = unescape(changeC);
}

/*
 * 获取职位名称和职位类名
 */
var position = '';
var deposition = '';
$(document).ready(function(){
	$.ajax({
		url:urlf+"api/Sys/GetPositionListToRe",
		success:function(data){
//			console.log(data.Result);
			if(data.Status == 1){
				for(var i = 0; i < data.Result.length; i++){
					var re = data.Result;
					position += '<option><span class="issuetop-text03">'+re[i].ClassName+'</span></option>';
//					for(var j in re[i].PositionList){
//						deposition += '<option value="'+ re[0].PositionList[j].ID+'"><span class="issuetop-text03">'+re[0].PositionList[j].Name+'</span></option>';
//					}
				}
				
				$(".recruit-select01").html(position);
//				$(".recruit-select02").html(deposition);
			}
		else{
				alert(data.Status);
			}
		}
	});
});

/*
 * 职位二级联动
 */
function Jobs(e){
var deposition1 = '';
	$.ajax({
		url:urlf+"api/Sys/GetPositionList",
		success:function(data){
			if(data.Status ==1){
//				console.log(data.Result);
				var abc = data.Result;
				for(var i = 0; i < abc.length; i++){
					if(abc[i].ClassName == e){
//						console.log(abc[i].PositionList);
						for(var j = 0; j < abc[i].PositionList.length; j++){
							deposition1 += '<option value="'+abc[i].PositionList[j].ID+'"><span class="issuetop-text03">'+abc[i].PositionList[j].Name+'</span></option>';
						}
					}					
				}
//				console.log(deposition1)
				$(".recruit-select02").html(deposition1);
			}
		}
	}); 
}
Jobs('销售')

/**
 * 获取公司福利标签
 
var tagg = '';
var taggID = '';
$.ajax({
	type:"get",
	url:urlf+"api/Sys/GetWelfareTagList",
	async:true,
	success:function(data){	
		console.log(data.Result);
		if(data.Status == 1){
			for(var i = 0; i < data.Result.length; i++){
				var welName = data.Result[i].Name; 
				var welID = data.Result[i].ID;
				tagg +=	'<span class="recWelfare-text" id='+welID+'>'+welName+'</span>';
			}
			$("#recuit-wel").html(tagg);
		}
		else{
			alert(data.Result);
		}
		$(".recWelfare-text").each(function(){
			$(this).click(function(){
				$(this).toggleClass("recWelfare-text");			
				taggID += ""+$(this).attr("id")+",";
				console.log(taggID);
			})
		})
	}
});*/


/*
 * 点击发布简历信息
 */
$("#issue-resume-button").click(function(){
	var Name = $("#resume-name").val();
	var Sex = $('input:radio:checked').val();
	var ResumeQQ = $("#resumeQQ").val();
	var Province = $("#issue-resumecmbProvince").val();
	var City = $("#issue-resumecmbCity").val();
	var Region = $("#issue-resumecmbArea").val();
	var Address = $("#resume-address").val();
	var WorkExperience = $("#resume-select01").find("option:selected").text();
	var Phone = $("#resume-phone").val();
	var Qualifications = $("#resume-select02").find("option:selected").text();
	var PositionID = $("#resume-select03").find("option:selected").val();
	var SalaryExpectation = parseInt($("#salary-expire").val());
	var Introduction = $("#resume-selfIntro").val();
	var Token = getCookie("token");
	
	$.ajax({
		type:"POST",
		url:urlf+"api/Release/PCCreateResume",
		async:true,
		data:{
			"Name": Name,
		    "Sex": Sex,
		    "Province": Province,
		    "City": City,
		    "Region": Region,
		    "Address": Address,
		    "WorkExperience": WorkExperience,
		    "phone": Phone,
		    "QQNumber":ResumeQQ,
		    "Qualifications": Qualifications,
		    "PositionID": PositionID,
		    "SalaryExpectation": SalaryExpectation,
		    "Introduction": Introduction,
		    "Token": Token
		},
		success:function(data){
//			console.log(data.Result);
			if(data.Status == 1){
				alert("发布简历信息成功");
			}
			else{
				alert(data.Result);
			}
		}
	});
})

/*
 * 点击发布供人信息
 */
$("#issue-provide-button").click(function(){
	var WorkType = $("#provide-worktype").val()
	var Salary = parseInt($("#provide-salary").val());
	var Count = parseInt($("#provide-count").val());
	var Name = $("#provide-name").val();
	var Phone = $("#provide-phone").val();
	var Province = $("#issue-providecmbProvince").val();
	var City = $("#issue-providecmbCity").val();
	var Region = $("#issue-providecmbArea").val();
	var Address = $("#provide-address").val();
	var Token = getCookie("token");
	
	$.ajax({
		type:"POST",
		url:urlf+"api/Release/PCCreateProvide",
		data:{
			"WorkType": WorkType,
		  	"Salary": Salary,
		  	"Count": Count,
		  	"Name": Name,
		  	"Phone": Phone,
		  	"Province": Province,
		  	"City": City,
		  	"Region": Region,
		  	"Address": Address,
		  	"Token": Token
		},
		success:function(data){
			if(data.Status == 1){
				alert("发布供人成功");
			}
			else{
				alert(data.Result);
			}
		}
	});
	
})

//出租房价目表上传
UploadPriceImg("rentImage", "rentImge", "rentImga")
//出租房详情上传
UploadListImg("rentInforImage", "rentInforImge", "rentInforImga")

/*
 * 点击发布周边租房信息
 */
$("#issue-rent-button").click(function(){
	var Name = $("#rent-name").val();
	var Province = $("#issue-rentcmbProvince").val();
	var City = $("#issue-rentcmbCity").val();
	var Region = $("#issue-rentcmbArea").val();
	var Address = $("#rent-address").val()
	var Longitude = 0;
	var Latitude = 0;
	var Introduce = $("#rent-intro").val();
	var PriceImage = image_value;
	
	
	var img=[];	
	var ImageList = aimg.join(",")
	
	var Token = getCookie("token");
	
	$.ajax({
		type:"post",
		url:urlf+"api/Release/PCCreateHouse",
		async:true,
		data:{
			"Name": Name,
			"Province": Province,
			"City": City,
			"Region": Region,
			"Address": Address,
			"Longitude": 0,
			"Latitude": 0,
			"Introduce": Introduce,
			"PirceImage": PriceImage,
			"ImageList": ImageList,
			"Token": Token
		},
		success:function(data){
			if(data.Status == 1){
				alert("发布成功");
			}
			else{
				alert(data.Result);
			}
		}
		
	});
})

UploadCardImg("cardImage", "cardImge", "cardImga")
/*
 * 发布车辆信息
 */
$("#issue-bus-button").click(function(){
	var Name = $("#driver-name").val();
	var Plate = $("#car-number").val();
	var Province = $("#issue-buscmbProvince").val();
	var City = $("#issue-buscmbCity").val();
	var Region = $("#issue-buscmbArea").val();
	var Address = $("#car-address").val()
	var Image = img_value;
	var Token = getCookie("token");
	
	$.ajax({
		type:"post",
		url:urlf+"api/Release/PCCreateBus",
		async:true,
		data:{
			"DriverName": Name,
  			"LicensePlate": Plate,
 		 	"Province": Province,
  			"City": City,
  			"Region": Region,
  			"Address": Address,
  			"Image": Image,
  			"Longitude": 0,
  			"Latitude": 0,
  			"Token": Token
		},
		success:function(data){
			if(data.Status == 1){
				alert("发布成功");
			}
			else{
				alert(data.Result);
			}
		}
		
	});
})
