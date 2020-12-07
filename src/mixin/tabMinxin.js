/* 按钮-混入 */
import {
	baseMinxin,
} from './baseMinxin.js'
import {
	vantMixin,
} from './vantMixin.js'
import {
	myJsSdkMixin,
} from './myJsSdkMixin.js'
import {
	aUiMinxin,
} from './aUiMinxin.js'
// import baseOrgCodeArr from '../assets/a_orgCodeData.js'; //部门code数据
import {
	uploader,
	downloadAttachmentByAttachmentId,
	getAttchmentByObjId,
	deleteAttachmentById
} from '@/moduleAPI/atm.js'
export const tabMinxin = {
	mixins: [baseMinxin, vantMixin, myJsSdkMixin, aUiMinxin], //混入公共类
	data() {
		return {
			tabPageData: '',
			tabScreenWidth: document.body.clientWidth, // 屏幕宽
			tabScreeHeight: document.body.clientHeight, //屏幕高度
			tabZzcStatu: false, //遮罩层状态-同时-是否允许底层滑动
		}
	},
	mounted() {
		this.tabPageData = this.$tabPageData(); //接受页面参数
		if (this.$store.getters.jdapUserInfo.userInfo) {
			var jdapUserInfo = localStorage.getItem("userInfo");
			// console.info(jdapUserInfo);
			this.$store.commit("setJdapUserInfo", jdapUserInfo);
		}
	},
	
	methods: {
		// 附件上传方法
		$tabUploadFile(file, params, callback) {
			file.status = "uploading";
			file.message = "上传中...";
			const formData = new FormData(); // 声明一个FormData对象
			formData.append("file", file.file);
			formData.append("param", JSON.stringify(params));
			uploader(formData)
				.then(res => {
					callback(res);
				})
				.catch(err => {
					callback(err);
				});
		},
		// 附件下载--后端返回文件流格式
		$tabDownloadAttachment(id, callback) {
			let params = {
				attachmentId: id
			};
			downloadAttachmentByAttachmentId(params)
				.then(res => {
					callback(res)
				})
				.catch(err => {
					callback(err);
				});
		},
		// 获取附件列表以及下载列表图片展示在页面
		$tabAttchmentList(params, callback) {
			getAttchmentByObjId(params)
				.then(res => {
					console.log('success');
					callback(res);
				})
				.catch(err => {
					console.log('fail');
					callback(err);
				});
		},
		// 删除附件
		$tabDeleteAttachmentById(params, callback) {
			deleteAttachmentById(params)
				.then(res => {
					callback(res);
				})
				.catch(err => {
					callback(err);
				});
		},
		$tabClickInit: function() {
			$('body').on('touchstart', '[m="click"]', function(e) {
				var e = e || window.event;
				$(this).addClass('click-active');
			});
			$('body').on('touchmove', '[m="click"]', function(e) {
				var e = e || window.event;
				$(this).removeClass('click-active')
			});
			$('body').on('touchend', '[m="click"]', function(e) {
				var e = e || window.event;
				$(this).removeClass('click-active')
			});

			$('body').on('touchstart', '[m="btn"]', function(e) {
				var e = e || window.event;
				$(this).addClass('btn-active');
			});
			$('body').on('touchmove', '[m="btn"]', function(e) {
				var e = e || window.event;
				$(this).removeClass('btn-active')
			});
			$('body').on('touchend', '[m="btn"]', function(e) {
				var e = e || window.event;
				$(this).removeClass('btn-active')
			});
		},
		/* 自定义网络请求*/
		$myAjax: function(obj) {
			let {
				apiName = '',
					data = '',
					url = '',
					method = '',
					headers = {},
			} = obj;
			var $apiConfItme = apiName ? this.$apiConfigMsg[apiName] : '';
			if (!method) {
				if (!$apiConfItme) {
					this.$textCatch('apiName 不存在');
					return new Promise((reslove, reject) => {
						reject({
							msg: 'apiName 不存在',
							code: 403,
						});
					})
				};
			};
			return new Promise((reslove, reject) => {
				this.$api[method || $apiConfItme.method](url || $apiConfItme.url, data || $apiConfItme.data, headers).then(
					(ret) => {
						reslove(ret)
					}).catch((err) => {
					reject(err)
				});
			});
		},

		/*************************************页面内***********************************/
		$tabWxBack: function(pageNub, jlRoute) {
			this.$tabBack(pageNub, jlRoute);
		},
		//关闭模块组
		$tabWxAllDlt: function(pageName, tabPageData, jlRoute) {
			this.$tabBackHome('');
		},
		//关闭当前页-打开到一个新的页面
		$tabWxToWin: function(winName, pageData, jlRoute) {},
		$tabWxOpenWin: function(obj, pageData = {}) {
			this.$tabOpenWin(obj, pageData || {});
		},
		//直接返回当前页的上一页，数据全部消息，是个新页面
		$tabBack: function(nub, dhType) {
			this.$store.commit('setPageDataObj', {
				pageSlide: dhType || 'slide-right', //默认后退
			});
			var val = this.$baseIsTypeof(nub); //判断类型number、string、boolean、undefined、null、arr，obj、function
			var pageNub = -1;
			if (val == 'number') {
				//返回上 nub 页
				pageNub = nub
			} else if(val == 'string' ){
				/* keepNameArr */
				var keepNameArr=this.$store.getters.pageUrlObj.keepNameArr;
				var keepLeg=this.$store.getters.pageUrlObj.keepNameArr.length;
				var retObj =this.$baseArrExchange(keepNameArr, '', nub);
				console.log(keepNameArr)
				console.log(keepLeg)
				console.log(retObj)
				console.log(this.$route.meta)
				pageNub=-(keepLeg-1-Number(retObj.index));
				console.log(pageNub)
			}else {
				this.$tabBackHome('');
				return
			}
			this.$store.commit('setPageUrlObj', {
				funType: 'keepBack', //删除缓存页面
				pageNub:pageNub,
			});
			this.$router.back(pageNub);
		},
		$tabBackHome: function(winName, dhType) {
			this.$store.commit('setPageUrlObj', {
				funType: 'keepBackArr', //删除缓存页面
				pageNub:0,
			});
			this.jcOpenWin({
				winName: winName || 'root_tab',
				dhType: 'slide-bottom'
			});
		},
		/* 路由跳转
		to:要去页面的name 或者path
		pageData:要传递的参数
		*/
		$tabOpenWin(obj, pageData = {}) {
			var retStr = this.$baseIsTypeof(obj);
			if (retStr == 'obj') {
				var {
					winName = '',
				} = obj;
			} else if (retStr == 'string') {
				var winName = obj;
			};
			/* 记录 */
			
			
			this.jcOpenWin(obj, pageData);
		},
		$tabSetkeepName: function(winName, moduleName) {
			this.$store.commit('setPageUrlObj', {
				moduleName: moduleName || this.$route.meta.moduleName,
				winName: winName || this.$route.name,
				type: 'push',
			});
		},
		/* 基础openWin*/
		jcOpenWin: function(obj, pageData = {}) {
			var retStr = this.$baseIsTypeof(obj);
			if (retStr == 'obj') {
				var {
					winName = '',
						pageData = {},
						dhType = pageData.dhType || 'slide-left',
				} = obj;
			} else if (retStr == 'string') {
				var winName = obj;
				var dhType = pageData.dhType || 'slide-left';
			}
			this.$store.commit('setPageDataObj', {
				pageSlide: dhType, //默认前进
			});
			this.$store.commit('setPageUrlObj', {
				funType: 'keepPush', //新增缓存页面
				winName:winName,
			});
			var val = this.$baseIsTypeof(pageData); //判断类型number、string、boolean、undefined、null、arr，obj、function
			if (val == 'number' || val == 'boolean' || val == 'string' || val == 'arr') {
				pageData = {
					$default_dataVal: pageData, //默认值
					$default_dataMsg: '传的参数不是对象，方法自定义一个默认对象',
					$default_dataKeyStatus: true, //表示存在不带key 的参数
				};
			} else if (val == 'null' || val == 'function') {
				pageData = {}; //不传参数
			}
			var status = this.$baseIsIndexOf(winName, '/');
			if (status) {
				var obj = {
					path: winName,
					query: pageData
				};
			} else {
				var obj = {
					name: winName,
					params: pageData
				};
			}
			this.$router.push(obj);
		},
		/*
		接受页面传递过来的参数
		*/
		$tabPageData: function() {
			var query = this.$route.query;
			var queryStatus = this.$baseIsEmptyObject(query); //判断是否是空对象

			var params = this.$route.params;
			var paramsStatus = this.$baseIsEmptyObject(params); //判断是否是空对象

			if (!paramsStatus) {
				return params;
			} else if (!queryStatus) {
				return query;
			} else {
				return obj || '';
			}
		},

	},
	computed: {

	},
	//过滤
	filters: {
		//保留两位小数
		$tabSetNub2: function(value) {
			if (value) {
				var key = Math.pow(10, 2); //10的若干次方
				if (value < 0) {
					var newVal = Math.abs(value); //取绝对值
					return -Math.floor(newVal * key) / key;
				} else if (value == 0) {
					return 0
				} else if (value > 0) {
					return Math.floor(value * key) / key;
				}
			} else {
				return 0;
			};
		},
	},
	watch: {
		tabZzcStatu: function(va1, va2) {
			if (va1) {
				/* 禁止底层滑动*/
				document.getElementsByTagName('body')[0].style.height = '100%';
				document.getElementsByTagName('body')[0].style.overflow = 'hidden';
			} else {
				/* 允许底层滑动*/
				document.getElementsByTagName('body')[0].style.height = '';
				document.getElementsByTagName('body')[0].style.overflow = '';
			}
		}
	},
	/* 进入页面前-复原导航条*/
	beforeRouteEnter(to, from, next) {
		next(vm => {
			// if(to.name!='root_tab'){
			// var leg = vm.$store.getters.pageUrlObj[to.meta.moduleName].length;
			// if (leg > 0) {
			// 	if (vm.$store.getters.pageUrlObj[to.meta.moduleName][leg - 1]['scrollY'] > 0) {
			// 		setTimeout(function() {
			// 			window.scroll(0, vm.$store.getters.pageUrlObj[to.meta.moduleName][leg - 1]['scrollY'] || 0);
			// 		}, 90)
			// 	}
			// } else {
			// 	setTimeout(function() {
			// 		window.scroll(0, 0);
			// 	}, 90)
			// }
			// }

		});
	},
}
