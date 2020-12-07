/* 按钮-混入 */
export const myJsSdkMixin = {
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
									callback || callback(obj)
								} else {
									/* 无资质 */
									var obj = {
										name: '',
										status: false
									};
									callback || callback(obj)
								}
							} else {
								/* 无资质 */
								var obj = {
									name: '',
									status: false
								};
								callback || callback(obj)
							}
						} else {
							/* 无资质 */
							var obj = {
								name: '',
								status: false
							};
							callback || callback(obj)
						}

					}).catch(err => {
						var obj = {
							name: '',
							status: false
						};
						callback || callback(obj)
					});
				},
				() => {
					var obj = {
						name: '',
						status: false
					};
					callback || callback(obj)
				});
		},
		/* 获取文件大小 */
		$sdkGetFileLength: function(url, callback) {
			cordova.plugins.FaceDetectPlugin.getFileLength({
					filePath: url
				}, (fileLength) => {
					console.log('funFileSize:' + fileLength)
					callback || callback(fileLength);
				},
				(err) => {
					console.log('获取文件长度失败' + err);
					callback || callback(false);
				});
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
							_this.$tabBack(-1);
						} else {
							_this.$msgThenCatch('确定要退出程序吗？', function(res) {
								_this.myJssdk.closeWindow();
							})
						}

					} else {
						_this.$tabWxBack(-1);
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
					callback || callback({
						status: true,
						data: res
					})
					console.info(res)
				},
				fail(err) {
					console.info(err)
					callback || callback({
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
			var baseUpUrl = 'http://172.16.68.42:80';
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
					callback || callback({
						status: true,
						data: data
					})

				},
				fail(data) {
					/* 上传失败 */
					callback || callback({
						status: false,
						data: data
					})
				}
			})
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






	}
}
