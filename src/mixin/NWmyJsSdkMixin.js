/* 按钮-混入 */
export const NWmyJsSdkMixin = {
	data() {
		return {

		}
	},
	methods: {
		/* 人脸识别 */
		$sdkjumpToFaceDetect: function(callback) {
			cordova.plugins.FaceDetectPlugin.openDetectWindow({
					cameraDirection: "front",
					quality: "50"
				}, (imageBase64) => {
					// this.$textLoading('身份识别中');
					let data = {
						db_name: 'scyyd',
						top: 1,
						image: imageBase64
					}
					searchFace(data).then(ret => {
						this.$textHid();
						if (ret.result) {
							if (ret.result[0]) {
								if (ret.result[0].score > 0.8) {
									let name = ret.result[0].info
									/* 有资质 */
									var obj = {
										name: ret.result[0].info,
										status: true
									}
									callback(obj)
								} else {
									/* 无资质 */
									var obj = {
										name: '',
										status: false
									};
									callback(obj)
								}
							} else {
								/* 无资质 */
								var obj = {
									name: '',
									status: false
								};
								callback(obj)
							}
						} else {
							/* 无资质 */
							var obj = {
								name: '',
								status: false
							};
							callback(obj)
						}

					}).catch(err => {
						var obj = {
							name: '',
							status: false
						};
						callback(obj)
					});
				},
				() => {
					var obj = {
						name: '',
						status: false
					};
					callback(obj)
				});
		},
		/* 获取文件大小 */
		$sdkGetFileLength: function(url, callback) {
			this.myJssdk.callMobileJsSdk(
				'file/info', {
					path: url,
					success(data) {
						var dataType = typeof data;
						if (dataType == 'string') {
							data = JSON.parse(data)
						}
						data['status'] = true;
						callback(data);
					},
					fail(error) {
						console.log(error);
						error['status'] = false;
						callback(error);
					}
				}
			);
		},
		/* 物理返回键监听*/
		$sdkCallMobile: function() {
			let _this = this;
			this.myJssdk.callMobileJsSdk('web/eventRegister', {
				eventType: 'BackPressEvent',
				eventcallback(res) {
					console.log('eventcallback:' + 1)
					// console.log(_this.$route.meta.moduleName)
					// console.log(_this.$route.name)
					if (_this.$route.meta.moduleName == 'root') {
						if (_this.$route.name != 'root_tab') {
							_this.$textHid();//关闭加载提示框
							_this.$tabBack(-1);
						} else {
							_this.$msgThenCatch('确定要退出程序吗？', function(res) {
								_this.myJssdk.closeWindow();
							})
						}

					} else {
						_this.$textHid();//关闭加载提示框
						_this.$tabBack(-1);
					}
				},
				success(res2) {
					console.log(2)
					console.log(res2)
				},
				fail(err) {
					console.log(3)
					console.log(err)
				}
			})
		},
		/* 数字签名 */
		$sdkSignature: function(obj, callback) {
			var key = this.$baseIsTypeof(obj);
			if (key == 'obj') {
				var {
					color = '000000', width = 3
				} = obj;
			} else {
				var newObj = {
					color: obj || '000000',
				};
				var {
					color = '000000', width = 3
				} = newObj;
			};
			this.myJssdk.signature({
				color: color,
				width: width,
				success(res) {
					/* data:{
					imagePath: '', // 签名照片的路径
					imageStr: '' //签名照片base64之后的缩略图数据
					} */
					callback({
						status: true,
						data: res
					})
					console.info(res)
				},
				fail(err) {
					console.info(err)
					callback({
						status: false,
						data: err
					})
				}
			});
		},
		/* 单独上传 */
		$sdkUploadMedia: function(obj, callback) {
			var {
				fileurl = '',
					parStr = '',
					headers = JSON.stringify({
						'access-token': this.$store.getters.jdapUserInfo.token
					})
			} = obj;
			var baseUpUrl = window.NW_BASEURL || 'http://172.16.68.42:80';
			this.myJssdk.uploadMedia({
				url: baseUpUrl + '/web/upload/api/top/atm/restClient/uploadAttachmentFile',
				fileurl: fileurl,
				params: parStr,
				headers: headers,
				filekey: 'file',
				success(data) {
					var dataType = typeof data;
					if (dataType == 'string') {
						data = JSON.parse(data)
					}
					console.log(data)
					callback({
						status: true,
						data: data
					})

				},
				fail(data) {
					/* 上传失败 */
					callback({
						status: false,
						data: data
					})
				}
			})
		},
		/* 下载附件 callMobileJsSdk*/
		$sdkDownload: function(url,callback1,callback2) {
			console.log(url)
			/* success:文件绝对路径
				fail：失败信息
					progresscallback：进度值0-100  */
			// 附件下载通用方法示例 /storage/emulated/0/deviceid.txt
			this.myJssdk.callMobileJsSdk(
				'file/download',
				{
					headers: JSON.stringify({
						'access-token': this.$store.getters.jdapUserInfo.token
					}),
					params:JSON.stringify({
						'url': url,
					}),
					url: url,
					path: '',//下载地址
					success(data) {
						console.log(11111);
						console.log(data);
						callback1({
							status: true,
							data: data
						});
					},
					fail(error) {
						console.log(222);
						console.log(error);
						callback1({
							status: false,
							data: error
						});
					},
					progresscallback(progress) {
						console.log(333333);
						console.log(progress);
							// callback2(progress);
					}
				});
		},
		/* 文件预览 */
		$sdkQuicklook:function(url,callback){
			this.myJssdk.callMobileJsSdk(
				'file/quicklook', {
					title: 'write',
					urlOrPath: url,
					success(data) {
						callback({status:true,msg:'文档预览成功'});
					},
					fail(error) {
						callback({status:false,msg:error});
					}
				});
		},
		/* 本地缓存操作 */
		$sdkKvSync: function(obj, callBack) {
			/* 
			this.$sdkKvSync({type:'set',key:'csKey',value:'啊啊啊'},function(res){
				console.log(11111);
				console.log(res);
			}) */
			var {
				type = 'set', //新增或修改set 读取get 删除delete
					key = '',
					value = ''
			} = obj;
			if (type == 'set') {
				var va2 = this.$baseIsTypeof(value);
				if (va2 == 'arr' || va2 == 'obj') {
					value = JSON.stringify(value);
				}
			}
			this.myJssdk.kv({
				action: type,
				key: key,
				value: value,
				success(res) {
					var resObj = {
						status: true,
						data: res,
					}
					callBack(resObj);
					// console.log(res);
				},
				fail(err) {
					var resObj = {
						status: false,
						data: err
					}
					callBack(resObj);
					// console.log(err);
				}
			});
		},
		/* 获取安全距离 
		{
		    "left": 40,//px
		    "top": 40,//px
		    "right": 40,//px
		    "bottom":80//px
		}
		*/
		$sdkSafearea:function(callBack){
			
			this.myJssdk.callMobileJsSdk(
			  'system/safearea', 
			  {
			    success (data) {
			      callBack({
					  status:true,
					  data:data
				  })
			    },
			    fail (error) {
					callBack({
						status:false,
						data:error
					})
			    }
			  }
			);
		}




	}
}
