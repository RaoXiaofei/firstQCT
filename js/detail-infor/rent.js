var city = unescape(getCookie("city"));
var changeC = getCookie("change");
if(getCookie("change") == null) {
	atCity.innerHTML = unescape(getCookie("city"));
	this.city = unescape(city);
} else {
	atCity.innerHTML = unescape(getCookie("change"));
	this.city = unescape(changeC);
}


var ListID = window.document.location.href;
//console.log(ListID);
var liID = ListID.split("id=")[1];
//console.log(liID)

var work = '';
var intro = '';
var tImg = '';
var img = '';
var ss = "";
$(document).ready(function(){
	$.ajax({
		type:"get",
		url:urlf+"api/Company/HouseDetail?id="+liID,
		async:true,
		success:function(data){
			if(data.Status == 1){
				console.log(data.Result);
				var re = data.Result;
				
				for(var i = 0; i < re.ImageList.length; i++){
					tImg += '<div class="swiper-slide"><img src="'+re.ImageList[i].Image+'"  style="width: 400px;height: 280px;"/></div>'
				}
				$("#detailBanner").html(tImg);
				
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
				
				work+= '<div class="work-line01" style="margin-top:90px;">'
				work+= 		'<span class="work-text09">'+re.Name+'</span>'
				work+= '</div>'
				work+= '<div class="work-line01 work-address">'
				work+= 	'<img src="assets/坐标.png" class="img"/>'
				work+= 	'<span class="work-text05">'+re.Address+'</span>'
//				if(re.IsUrgent == true){
//					work+= 	  '<img src="img/jiaji.png" class="img"/>'
//					work+= 	  '<span class="work-text005">加急</span>'
//					work+= '</div>'
//					work+= '<div class="work-line01 jiaji">'
//					work+= 	   '<img src="img/daojishi.png" class="imgggg"/>'
//					work+= 	   '<span class="CountDown">距结束00：00：40</span>'
//				}
				work+= '</div>'
				work+= '<div class="work-line02" style="margin-top:20px;">'
				work += '<div class="btn-group" role="group">'
				work +=	  '<button type="button" class="btn btn-default dropdown-toggle btn-danger" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">电话联系</button>'
				work +=	  '<ul class="dropdown-menu">'
				work +=		 '<li>'+re.Phone+'</li>'
				work +=	  '</ul>'
				work +=	'</div>'
				work+= '</div>'
				
				intro += '<p class="work-section01">'+re.Introduce+'</p>'
				
				img += '<img src="'+urlf+re.PriceImage+'" class="work-section03" style="width: 600px;height: 400px;"/>'
				
				$("#Work").html(work);
				$("#wr").html(intro);
				$("#wrimg").html(img);
				
			}
			else{
				alert(data.Result);
			}
		}
	});
})