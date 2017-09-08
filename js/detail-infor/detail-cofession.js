var ListID = window.document.location.href;
//console.log(ListID);
//console.log(ListID.split("id=")[1])
listID = ListID.split("id=")[1]

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

var pro = '';
var ProvIn01= '';
var ProvIn02='';
$.ajax({
	type:"get",
	url:urlf+"api/Company/ProvideDetail?id="+listID,
	async:true,
	success:function(data){
//		console.log(data.Result);
		var re = data.Result;
		
		pro += '<span class="work-line" style="float: right;cursor: pointer;"onclick="Report()">'
		pro += 		'<img src="assets/举报.png" />'
		pro += 		'<span class="work-text01">&nbsp;举报</span>'
		pro += '</span>'
		pro += '<br />'
		pro += '<span class="work-line" style="margin-bottom:17px;">'
		pro += 		'<span class="work-text02">'+re.WorkType+'</span><span class="work-text03">'+re.Count+'人</span>'
		pro += '</span>'
		pro += '<br />'
		pro +='<span class="work-line" >'
		pro +=	'<img src="assets/坐标.png"class="img" />'
		pro +=	'<span class="work-text05">'+re.Address+'</span>'
		if(re.IsUrgent == true){
			var hour = Math.floor(re.CountDown/3600);
			var minute = Math.floor((re.CountDown-hour*3600)/60);
			var second = Math.floor(re.CountDown-hour*3600-minute*60);
			pro +=	'<img src="img/jiaji.png" class="img"/>'
			pro +=	' <span class="work-text005">加急</span>'
			pro += '</span>'
			pro +=	'<br />'
			pro +=	'<span class="work-line jiaji">'
			pro +=		'<img src="img/daojishi.png" class="imgggg"/>'
			pro +=		'<span class="CountDown">距结束&nbsp;'+hour+'：'+minute+'：'+second+'</span>'
		}
		pro +=	'</span>'
		pro += '<br />'
		pro += '<span class="work-line">'
		pro += '<div class="btn-group" role="group" style = "margin-right:30px">'
		pro +=	  '<button type="button" class="btn btn-default dropdown-toggle btn-danger" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">电话联系</button>'
		pro +=	  '<ul class="dropdown-menu">'
		pro +=		 '<li>'+re.Phone+'</li>'
		pro +=	  '</ul>'
		pro +=	'</div>'
		pro += 		'<a target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin='+re.QQNumber+'&site=qq&menu=yes"><img border="0" src="http://wpa.qq.com/pa?p=2:1352197441:51" alt="点击这里给我发消息" title="点击这里给我发消息"/></a>'
		pro += '</span>'
		
		ProvIn01 += '<img src="assets/我.png" />'
		ProvIn01 += 	'<span class="work-text05">&nbsp;'+re.Name+'</span>&nbsp;&nbsp;'
		ProvIn01 += 	'<img src="assets/电话.png" />'
		ProvIn01 +=  '<span class="work-text05">&nbsp; '+re.Phone+'</span>'
		
		ProvIn02 += '<p class="work-section01">'+re.CompanyIntroduce+'</p>'
		
		$("#ProvInfor").html(pro);
		$("#bProv01").html(ProvIn01);
		$("#bProv02").html(ProvIn02);
	}
});

function Report(){
	
	$.ajax({
		type:"get",
		url:urlf+"api/Report/UserReport?id="+listID+"&type=4",
//		async:true,
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
