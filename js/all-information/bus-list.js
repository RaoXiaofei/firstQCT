var busID = ''
var busCardImg = ''
/*
 * 获取全国大巴信息
 */
var Token = getCookie("token");
function getBusInfor(){
	var allB = '';
	
	$.ajax({
		type:"get",
		url:urlf+"api/Release/MyRelease?pageIndex=1&pageSize=10000&type=5",
		async:true,
		data:{
			"Token": Token
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
			if(data.Status == 1){
//				console.log(data.Result);
				var re = data.Result;
				for(var i in re){
					allB += '<p class="index-guesstext" id="'+re[i].ID+'" onclick="ShowBusInfor(this)">'
					allB +=		'<span class="index-text40">'+re[i].Name+'</span>'
					allB +=		'<span class="index-text41">'+re[i].Address+'</span>'
					allB +=		'<span class="index-text43">'+re[i].Company+'</span>'
					allB +=	'</p>'
				}			
				$("#BUS").html(allB);
			}
			else{
				alert(data.Result);
			}
		}
	});
}

/*
 * 显示  修改  删除  全国大巴详细信息
 */
function ShowBusInfor(inforID){
	busCardImg = '';
	busID = inforID.id;
	$("#PCR01").replaceWith('<form class="form-inline"  id="PCR01"><div id="distpicker-bus-infor'+busID+'"><div class="form-group"><label class="sr-only" for="province6">Province</label><select class="select-frame02" id="buscmbProvince"></select></div><div class="form-group"><label class="sr-only" for="city6">City</label><select class="select-frame02" id="buscmbCity"></select></div><div class="form-group"><label class="sr-only" for="district6">District</label><select class="select-frame02" id="buscmbArea"></select></div></div></form>')
	$("#modify-bus-button").show();
	$("#SaveBus").hide();
	$('.information-right1').hide();
	$(".information-right2").hide();
	$('#bus-information').show();
	var na = '';
	var addr = '';
	var intro = '';
	var num = '';
	var pro = '';
	$.ajax({
		type:"get",
		url:urlf+"api/Release/PCGetBusDetail?id="+busID+"&token="+Token,
		async:true,
	    success:function(data){
	    	if(data.Status == 1){
//	    		console.log(data.Result);
	    		var re = data.Result;
	    		//显示省市区
	    		$("#distpicker-bus-infor"+busID).distpicker({
					province: re.Province,
					city: re.City,
					district: re.Region ,
				})
   			 	$("#updateCardImga").attr("src", re.Image);
   			 	busCardImg = re.Image;
   			 	$('input').attr("readonly", true);
   			 	$("#buscmbProvince").attr("disabled",true);
	    		$("#buscmbCity").attr("disabled",true);
	    		$("#buscmbArea").attr("disabled",true);
	    		pro+= '<input type="text" class="input-text02" id="busProvince" value="'+re.Province+'" readonly="readonly"/>'
				pro+= '<input type="text" class="input-text02" id="busCity" value="'+re.City+'" readonly="readonly"/>'
				pro+= '<input type="text" class="input-text02" id="busArea" value="'+re.Region+'" readonly="readonly"/>'
	    		
	    		$("#driver-name").val(re.DriverName);
	    		$("#car-address").val(re.Address);
	    		$("#car-number").val(re.LicensePlate);
	    		
	    		$("#showPCR8").html(pro);
	    	}
	    }
	});
}

/*
 * 修改全国大巴信息
 */
$("#modify-bus-button").click(function(){
	UploadCardImg("updateCardImage", "updateCardImge", "updateCardImga");
	$(this).hide();
	$("#SaveBus").show();
	$('input').attr("readonly",false);
	$('textarea').attr("readonly",false);
	$("#buscmbProvince").attr("disabled",false);
	$("#buscmbCity").attr("disabled",false);
	$("#buscmbArea").attr("disabled",false);
})
/*
 * 修改全国大巴信息
 */
$("#SaveBus").click(function(){
	var busImgID = busCardImg;
	var Name = $("#driver-name").val();
	var Plate = $("#car-number").val();
	var Province = $("#buscmbProvince").val();
	var City = $("#buscmbCity").val();
	var Region = $("#buscmbArea").val();
	var Address = $("#car-address").val();
	var Image1 = img_value;
	var Image = '';
	if(Image1 == ""){
		Image = busImgID;
		busCardImg = '';
	}
	else{
		Image = Image1;
	}
	var id = busID;
	$.ajax({
		type:"post",
		url:urlf+"api/Release/PCUpdateBus",
		async:true,
		data:{
			"BusID": id,
			"DriverName": Name,
  			"LicensePlate": Plate,
 		 	"Province": Province,
  			"City": City,
  			"Region": Region,
  			"Address": Address,
  			"Image": Image ,
  			"Longitude": 0,
  			"Latitude": 0,
  			"Token": Token
		},
		success:function(data){
			if(data.Status == 1){
				alert("修改成功");
				$("#SaveBus").hide();
				$('input').attr("readonly",true);
				$('textarea').attr("readonly",true);
				$("#buscmbProvince").attr("disabled",true);
	    		$("#buscmbCity").attr("disabled",true);
	    		$("#buscmbArea").attr("disabled",true);
	    		busCardImg = '';
			}
			else{
				alert(data.Result);
			}
		}
		
	});
})
/*
 * 删除全国大巴信息
 */
$("#delete-bus-button").click(function(){
	if(Del() == true){
		$.ajax({
			type:"get",
			url:urlf+"api/Release/PCDelBus?id="+busID+"&token="+Token,
			async:true,
			success:function(data){
				if(data.Status == 1){
					alert("删除成功");
					$("#menu-bus-infor").click();
				}
				else{
					alert("删除失败");
				}
			}
		});
	}
})