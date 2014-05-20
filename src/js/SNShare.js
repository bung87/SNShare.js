(function($){

		var options={
			title:document.title,
			images:'',
			url:document.location.href,
			site_url:document.location.origin,
			windowWidth:800,
			widnowHeight:500,
			site_name:'sitename',
			summary:'summarysummarysummarysummary',
			empty:'',
			reason:'reasonreasonreasonreason',
			pengyou:'pengyou'
		};
		
		var sns_args={
			tsina:{
				_shareUrl:"http://service.weibo.com/share/share.php?",
				_images_sep:'||',
				kwargs:{
					title:'summary',
					url:'url',
					pic:'images'
				}
			},
			tqq:{
				_shareUrl:"http://v.t.qq.com/share/share.php?",
				_images_sep:'|',
				kwargs:{
					title:'summary',
					url:'url',
					pic:'images'
				}
			},
			qzone:{
				_shareUrl:"http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?",
				kwargs:{
					title:'title',
					url:'url',
					summary:'summary',
					desc:'reason',
					pics:'images',
					site:'site_name'
				}

			},
			renren:{
				_shareUrl:"http://share.renren.com/share/buttonshare.do?",
				kwargs:{
					title:'title',
					link:'url'
				}
			},
			kaixin001:{
				_shareUrl:"http://www.kaixin001.com/repaste/share.php?",
				kwargs:{
					rtitle:'title',
					rurl:'url'
				}
			},
			t163:{
				_shareUrl :"http://t.163.com/article/user/checkLogin.do?",
				_images_sep:',',
				kwargs:{
					source:'site_name',
					info:'summary',
					images:'images'
				}
			},
			tsohu:{
				_shareUrl:"http://t.sohu.com/third/post.jsp?",
				kwargs:{
					title:'summary',
					url:'url',
					pic:'images'
				}
			},
			txpengyou:{
				_shareUrl:"http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?",
				kwargs:{
					to:'pengyou',
					url:'url'
				}
			},
			douban:{
				_shareUrl:"http://shuo.douban.com/!service/share?",
				kwargs:{
					name:'title',
					href:'url',
					image:'images'
				}
			}
		};
		function url_generate(which){
			var s = [];
				var a=sns_args[which];
				var u=a['_shareUrl'];
				var v;
				for(var i in a['kwargs']){
					if(a['kwargs'][i]=="images"){
						v=encodeURIComponent(typeof this.images=="object" ? this.images.join(a['_images_sep']) : this.images)
					}else{
						v=encodeURIComponent(this[a['kwargs'][i]]||'');
					}
					s.push(i + '=' + v);
				}
				return u+s.join('&');
		}
		
	function open(which){
		var iHeight=options.widnowHeight;
        var iWidth=options.windowWidth;
        var iTop = (window.screen.availHeight-iHeight)/2 ;
        var iLeft = (window.screen.availWidth-iWidth)/2 ;
    	var href=url_generate.call(options,which);
    	var win = window.open(href, name,'top='+ iTop +',left=' + iLeft + ',height= '+iHeight+',width='+iWidth+',resizable=yes,scrollbars=yes');
	};
	window.@@prefix=function(opts){
		$.extend(options,opts);
	}
	$(document).on('click',".@@prefix",function(e){
			e.preventDefault();
			var $this=$(this),c=$this.attr('class'),reg=/@@prefix-(\w+)/,m=[];
			if(reg.test(c)){
				m=c.match(reg);
				open(m[1]);
			}
		});
	
})(jQuery);
