var provideID = ''
var Token = getCookie("token");
/*
 * 获取供人信息列表
 */
function getProvideList(){
	var token = getCookie("token");	
	
	var allP="";
	$.ajax({
		type:"get",
		url:urlf+"api/Release/MyRelease?pageIndex=1&pageSize=10000&type=4",
		async:true,
		data:{
			"Token":token
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
		success: function(data){
			if(data.Status == 1){
//				console.log(data.Result);
				var re = data.Result;
				for(var i in re){
					allP += '<p class="index-guesstext" id="'+re[i].ID+'" onclick="ShowProvideInfor(this)">'
					allP += 		'<span class="index-text30">'+re[i].Name+'</span>'
					allP += 		'<span class="index-text31">'+re[i].Company+'</span>'
					allP += 		'<span class="index-text32">'+re[i].Address+'</span>'
					allP += 		'<span class="index-text33">'+re[i].Salary+'/月</span>'
					allP += '</p>'
				}
				$("#allpr").html(allP);
			}
			else{
				alert(data.Result);
			}
		}
	});
}

/*
 * 显示  修改  删除供人信息详细信息
 */
function ShowProvideInfor(inforID){
	provideID = inforID.id;	
	$("#PCR02").replaceWith('<form class="form-inline"  id="PCR02"><div id="distpicker-provide-infor'+provideID+'"><div class="form-group"><label class="sr-only" for="province6">Province</label><select class="select-frame02" id="providecmbProvince"></select></div><div class="form-group"><label class="sr-only" for="city6">City</label><select class="select-frame02" id="providecmbCity"></select></div><div class="form-group"><label class="sr-only" for="district6">District</label><select class="select-frame02" id="providecmbArea"></select></div></div></form>');
	$("#modify-provide-button").show();
	$("#SaveProvide").hide();
	$('.information-right1').hide();
	$(".information-right2").hide();
	$('#provide-information').show();
	
	var na = '';
	var add = '';
	var sala = '';
	var count = '';
	var linkna = '';
	var linkpho = '';
	var pro = '';
	$.ajax({
		type:"get",
		url:urlf+"api/Release/PCGetProvideDetail?id="+provideID+"&token="+Token,
		async:true,
		success:function(data){
			if(data.Status == 1){
//				console.log(data.Result);
				var re = data.Result;
				//显示省市区
				$("#distpicker-provide-infor"+provideID).distpicker({
					province: re.Province,
					city: re.City,
					district: re.Region
				})
				$("#providecmbProvince").attr("disabled",true);
				$("#providecmbCity").attr("disabled",true);
				$("#providecmbArea").attr("disabled",true);
				
				na += '<input type="text" class="input-text01" id="provide-worktype" value="'+re.WorkType+'" readonly="readonly"/>'
				add += '<input type="text" class="input-text01" id="provide-address" value="'+re.Address+'" readonly="readonly"/>'
				sala += '<input type="text" class="input-text01" id="provide-salary" value="'+re.Salary+'" readonly="readonly"/>'
				count += '<input type="text" class="input-text01" id="provide-count" value="'+re.Count+'" readonly="readonly"/>'
				linkna += '<input type="text" class="input-text01" id="provide-name"value="'+re.Name+'" readonly="readonly"/>'
				linkpho += '<input type="text" class="input-text01" id="provide-phone"value="'+re.Phone+'" readonly="readonly"/>'
				
				$("#provideName").html(na);
				$("#provideAddress").html(add);
				$("#provideSalary").html(sala);
				$("#provideCount").html(count);
				$("#provideLinkman").html(linkna);
				$("#provideLinkphone").html(linkpho);
			}
			else{
				alert(data.Result);
			}
			
			/*
			 * 修改供人信息
			 */
			$("#modify-provide-button").click(function(){
				$(this).hide();
				$("#SaveProvide").show();
				$('input').attr("readonly",false);
				$("#providecmbProvince").attr("disabled",false);
				$("#providecmbCity").attr("disabled",false);
				$("#providecmbArea").attr("disabled",false);
			})
		}
	});
}
/*
 * 修改供人信息
 */
$("#SaveProvide").click(function(){
	var ID = provideID;
	var WorkType = $("#provide-worktype").val()
	var Salary = parseInt($("#provide-salary").val());
	var Count = parseInt($("#provide-count").val());
	var Name = $("#provide-name").val();
	var Phone = $("#provide-phone").val();
	var Province = $("#providecmbProvince").val();
	var City = $("#providecmbCity").val();
	var Region = $("#providecmbArea").val();
	var Address = $("#provide-address").val();
	
	$.ajax({
		type:"POST",
		url:urlf+"api/Release/PCUpdateProvide",
		data:{
			"ID":ID,
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
				alert("修改供人信息成功");
				$("#SaveProvide").hide();
				$('input').attr("readonly",true);
				$("#providecmbProvince").attr("disabled",true);
				$("#providecmbCity").attr("disabled",true);
				$("#providecmbArea").attr("disabled",true);
			}
			else{
				alert(data.Result);
			}
		}
	});
})

/*
 * 删除供人信息
 */
$("#delete-provide-button").click(function(){
	if(Del() == true){
		$.ajax({
			type:"get",
			url:urlf+"api/Release/PCDelProvide?id="+provideID+"&token="+Token,
			async:true,
			success:function(data){
				if(data.Status == 1){
					alert("删除成功")
					$('#menu-provide-infor').click();
				}
				else{
					alert("删除失败")
				}
			}
		});
	}
})