var listID = window.document.location.href;
//console.log(listID)
//console.log(listID.split("id=")[1])
var id = listID.split("id=")[1];

var detail = '';
var detaP1 = '';
var detaP2 = '';
var compInfor = '';
var Token = getCookie("token");

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

$.ajax({
	type:"get",
	url:urlf+"api/Company/PositionDetail?id="+id+"&lng=0&lat=0",
	async:true,
	success:function(data){
//		console.log(data.Result)
		var re = data.Result;
		
		detail += '<span class="work-line" style="float: right; cursor: pointer;" onclick = "ReportThis()">'
		detail +=	'<img src="assets/举报.png" />'
		detail +=	'<span class="work-text01">&nbsp;举报</span>'
		detail +='</span>'
		detail +='<br />'
		detail +='<span class="work-line">'
		detail +=	'<span class="work-text02">'+re.Name+'</span><span class="work-text03">'+re.Salary+'</span>'
		detail +='</span>'
		detail +='<br />'
		detail +='<span class="work-line">'
		for(var i in re.WelfareTag){
			detail += '<span class="work-text04">'+re.WelfareTag[i].Name+'&nbsp;&nbsp;&nbsp;</span>'
		}
		
		detail +='</span>'
		detail +='<br />'
		detail +='<span class="work-line">'
		detail +=	'<img src="assets/坐标.png" />'
		detail +=	'<span class="work-text05">'+re.CompanyAddress+'<span class="worktttext"><img src="img/jiaji.png" />加急</span></span>'
		detail +='</span>'
		detail +=	'<br />'
		detail +=	'<span class="work-line">'
		detail +=		'<img src="img/daojishi.png"/>'
		detail +=		'<span class="CountDown">距结束00：00：40</span>'
		detail +=	'</span>'
		detail +='<br />'
		detail += '<span class="work-line">'
		detail += '<div class="btn-group" role="group" >'
		detail +=	  '<button type="button" class="btn btn-default dropdown-toggle btn-danger" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">电话联系</button>'
		detail +=	  '<ul class="dropdown-menu">'
		detail +=		 '<li>'+re.Phone+'</li>'
		detail +=	  '</ul>'
		detail +=	'</div>'
		detail +=	 '<a target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin='+re.QQNumber+'&site=qq&menu=yes"><img border="0" src="http://wpa.qq.com/pa?p=2:1352197441:51" alt="点击这里给我发消息" title="点击这里给我发消息"/></a>'
		detail += '</span>'
		
		detaP1 += '<p class="work-section01">'+re.JobDescription+'</p>'
		detaP2 += '<p class="work-section01">'+re.Requirement+'</p>'
		
		compInfor += '<h1 class="work-text08">'+re.CompanyName+'</h1>'
		compInfor += '<h1 class="work-text04">'+re.CompanyIndustry+'&nbsp;&nbsp;'+re.CompanyScale+'</h1>'
		compInfor += '<p class="work-section02">'+re.CompanyIntroduce+'</p>'
		
		
		$("#detail1").html(detail);
		$("#para01").html(detaP1);
		$("#para02").html(detaP2);
		$("#compIn").html(compInfor);	
	}
	
});

//举报
function ReportThis(){
	$.ajax({
		type:"get",
		url:urlf+"api/Report/UserReport?id="+id+"&type=6",
		async:true,
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Authorization",getCookie('token'));
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
				layer.open({
					content: data.Result,
					title: '温馨提示',
					area: ['320px', '180px'],
					success: function(layer) {
						layer[0].childNodes[3].childNodes[0].attributes[0].value = 'layui-layer-btn1';
					},
				});
			}
			else{
				layer.open({
					content: data.Result,
					title: '温馨提示',
					area: ['320px', '180px'],
					success: function(layer) {
						layer[0].childNodes[3].childNodes[0].attributes[0].value = 'layui-layer-btn1';
					},
				});
			}
		}
	});
}
