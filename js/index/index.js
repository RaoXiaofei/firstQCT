var isNext = false;
var isLoading = false;
var pageIndex0 = 1;
var pageSize = 20;
var li = '';
var infor = '';
var city = ""
var citycici = unescape(getCookie("city"));

var changeC = getCookie("change");

window.onload = function() {
	if(getCookie("change") == null) {
		atCity.innerHTML = unescape(getCookie("city"));
		this.city = citycici;
	} else {
		atCity.innerHTML = unescape(getCookie("change"));
		this.city = unescape(changeC);
	}
	$.ajax({
		type: "POST",
		url: urlf + "api/Home/Info",
		data: {
			"pageIndex": this.pageIndex0,
			"pageSize": this.pageSize,
			"lat": 0,
			"lng": 0,
			"city": this.city
		},
		success: function(data) {
			if(data.Status == 1) {
				//轮播图
				//			console.log(data.Result.Banner);			
				for(var i = 0; i < data.Result.Banner.length; i++) {
					var a = data.Result.Banner[i];
					if(a.IsJump == false){
						li +='<div class="swiper-slide" ><img src="'+a.Image+'" style="width: 100%;height:100%"/></div>';
					}else{
						li += '<div class="swiper-slide" ><a herf="' + a.Url + '"><img src="' + a.Image + '" style="width: 100%;height:100%"/></a></div>';
					}
				}
				$('#banner1').html(li);
				
				var swiper = new Swiper('.swiper-container', {
					pagination: '.swiper-pagination',
					nextButton: '.swiper-button-next',
					prevButton: '.swiper-button-prev',
					slidesPerView: 1,
					paginationClickable: true,
					spaceBetween: 30,
					loop: true,
					autoplay: 3000
				});
				
//							console.log(data.Result);
				//猜你喜欢
				for(var i = 0; i < data.Result.List.length; i++) {
					var b = data.Result.List[i];
					if(b.IsUrgent == false){
						infor += '<p class="index-guesstext" id="' + b.ID + '" onclick="ShowIndexDe(this)">'
						infor += '<span class="index-text04">' + b.Name + '</span>'
						infor += '<span class="index-text05">' + b.CompanyName + '</span>'
						infor += '<span class="index-text07">' + b.Salary + '</span>'
						infor += '</p>';
					}
					else{
						infor += '<p class="index-guesstext" id="' + b.ID + '" onclick="ShowIndexDe(this)">'
						infor += '<span class="index-text04">' + b.Name + '<span class="index-text06" id="faster">[<img src="img/urgent.png" />加急]</span></span>'
						infor += '<span class="index-text05">' + b.CompanyName + '</span>'
						infor += '<span class="index-text07">' + b.Salary + '</span>'
						infor += '</p>';
					}
					
					
				}
				$('#Guess-Infor').html(infor);
				this.isNext = data.Result.IsNext
				this.pageIndex0++
			}
		}.bind(this)
	});
}

var im = ""

function GetMore() {
	this.isLoading = true;
	if(this.isLoading = true) {
		//计算
		if(this.isNext) {
			$.ajax({
				type: "POST",
				url: urlf + "api/Home/Info",
				async: true,
				data: {
					"pageIndex": this.pageIndex0,
					"pageSize": this.pageSize,
					"lat": 0,
					"lng": 0,
					"city": this.city
				},
				success: function(data) {
					if(data.Status == 1) {
						//							console.log(data.Result);
						//猜你喜欢
						for(var i = 0; i < data.Result.List.length; i++) {
							var b = data.Result.List[i];
							infor += '<p class="index-guesstext" id="' + b.ID + '" onclick="ShowIndexDe(this)">'
							infor += '<span class="index-text04">' + b.Name + '</span>'
							infor += '<span class="index-text05">' + b.CompanyName + '</span>'
							infor += '<span class="index-text07">' + b.Salary + '</span>'
							infor += '</p>';
						}
						$('#Guess-Infor').html(infor);

						this.isNext = data.Result.IsNext;
						this.pageIndex0++;
						this.isLoading = false;
					} else {
						alert(data.Result);
					}
				}.bind(this)
			});
		} else {
			alert("没有更多了");
		}
	}
}
/*
 * 首页信息详情显示
 */
function ShowIndexDe(listID) {
	window.open('index-detail.html?id=' + listID.id);

}

$('.top').click(function() {
	window.open('issue.html');
})

function Issue(){
	location.href = "issue.html";
}

/*
 * 首页搜素跳转全部工作界面
 */
function SearchAllposition(e){
	var keyw = $("#index-keywords").val();
	if(keyw == ""){
		alert("请输入关键字搜索！")
//		layer.open({
//			content: "请输入关键字搜索",
//			title: '温馨提示',
//			area: ['320px', '180px'],
//			success: function(layer) {
//				layer[0].childNodes[3].childNodes[0].attributes[0].value = 'layui-layer-btn1';
//			},
//		});
	}
	else{
		setCookie("indexKey", keyw);
		location.href = "list-work.html#allwork-infor";
	}
}
