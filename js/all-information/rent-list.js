var rentID = ''

var rentPrO = ''
var rentCit = ''
var rentReg = ''
/*
 * 获取周边住房列表
 */
var Token = getCookie("token");
function getRentList(){
	var allRen = '';
	
	$.ajax({
		type:"get",
		url:urlf+"api/Release/MyRelease?pageIndex=1&pageSize=10000&type=7",
		async:true,
		data:{
			"Token":Token
		},
		error:function(){
			layer.open({
				content: "请先登录",
				title: '温馨提示',
				area: ['320px', '180px'],
				success: function(layer) {
					layer[0].childNodes[3].childNodes[0].attributes[0].value = 'layui-layer-btn1';
				},
			});
		},
		success:function(data){
//			console.log(data.Result);
			var re = data.Result;

			if(data.Status == 1){
				for(var i in re){
					allRen += '<p class="index-guesstext" id="'+re[i].ID+'" onclick="ShowRentInfor(this)">'
					allRen +=		'<span class="index-text04">'+re[i].Name+'</span>'
					allRen +=		'<span class="index-text05">'+re[i].Address+'</span>'
					allRen += '</p>'
				}				
				$("#rentList").html(allRen);
			}
			else{
				alert(data.Result);
			}
		}
	});
}

/*
 * 显示  修改  删除 周边租房详情信息
 */
function ShowRentInfor(inforID){
	rentID = inforID.id;
	
	$("#SaveRent").hide();
	$("#modify-rent-button").show();
	$('.information-right1').hide();
	$(".information-right2").hide();
	$('#rent-information').show();
	var Token = getCookie("token");
	var na = "";
	var addr = "";
	var intro = "";
	var priImg = '';
	var rentImg = [];
	var img = '';
	var pro = '';
	$.ajax({
		type:"get",
		url:urlf+"api/Release/PCGetHouseDetail?id="+rentID+"&token="+Token,
		async:true,
		success:function(data){
			if(data.Status == 1){
//				console.log(data.Result);	
				var re = data.Result;
				//显示省市区
				$("#distpicker-rent-infor").distpicker({
					province: re.Province,
					city: re.City,
					district: re.Region
				})
				$("#rentcmbProvince").attr("disabled",true);
				$("#rentcmbCity").attr("disabled",true);
				$("#rentcmbArea").attr("disabled",true);
				
				na += '<input type="text" class="input-text01" id="rent-name" value="'+re.Name+'"/>'
				addr += '<input type="text" class="input-text01" id="rent-address" value="'+re.Address+'"/>'
				intro += '<textarea class="input-textarea01" id="rent-intro">'+re.Introduce+'</textarea>'
				
				$("#updateRentImga").attr("src",urlf+re.PriceImage);
				
				img += '<input type="file" id="updateRentInforImge" multiple="multiple"/>'
				for (var i = 0; i < re.ImageList.length; i++) {
					rentImg[i] = urlf+re.ImageList[i].Image;	
					img +=	'<img src="'+rentImg[i]+'" id="rent_imgList0"/>'					
				}
				
				$("#rentName").html(na);
				$("#rentAddress").html(addr);
				$("#rentIntro").html(intro);
				$("#updateRentInforImage").html(img);
			}
			else{
				alert(data.Result);
			}
			
			/*
			 * 修改信息
			 */
			$("#modify-rent-button").click(function(){
				//修改上传周边租房价目表和工作介绍图片
				UploadPriceImg("updateRentImage", "updateRentImge", "updateRentImga");
				UploadWorkImg("updateRentInforImage", "updateRentInforImge", "rent_imgList0");
				
				$("#modify-rent-button").hide();
				$("#SaveRent").show();
				
				$("input").attr("readonly",false);
				$('textarea').attr("readonly",false);
				$("#rentcmbProvince").attr("disabled",false);
				$("#rentcmbCity").attr("disabled",false);
				$("#rentcmbArea").attr("disabled",false);
			})
			
		}
	});
}
/*
 * 修改周边租房信息
 */
$("#SaveRent").click(function(){
	var ID = rentID;
	var Name = $("#rent-name").val();
	var Province = $("#rentcmbProvince").val();
	var City = $("#rentcmbCity").val();
	var Region = $("#rentcmbArea").val();
	var Address = $("#rent-address").val()
	var Longitude = 0;
	var Latitude = 0;
	var Introduce = $("#rent-intro").val();
	
	var PriceImage = image_value;
	
	var img=[];	
	var ImageList = bimg.join(",")
	
	var Token = getCookie("token");
	
	$.ajax({
		type:"post",
		url:urlf+"api/Release/PCUpdateHouse",
		async:true,
		data:{
			"ID":ID,
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
				alert("修改成功");						
				$("#SaveRent").hide();
				$("input").attr("readonly",true);
				$('textarea').attr("readonly",true);
				$("#rentcmbProvince").attr("disabled",true);
				$("#rentcmbCity").attr("disabled",true);
				$("#rentcmbArea").attr("disabled",true);
			}
			else{
				alert(data.Result);
			}
		}
		
	});
})
/*
 * 删除信息
 */
$("#delete-rent-button").click(function(){
	if(Del() == true){
		$.ajax({
			type:"get",
			url:urlf+"api/Release/PCDelHouse?id="+rentID+"&Token="+Token,
			async:true,
			success:function(data){
				if(data.Status == 1){
					alert("删除成功");
					$('#menu-rent-infor').click();
				}
				else{
					alert("删除失败")
				}
			}
		});
	}
})