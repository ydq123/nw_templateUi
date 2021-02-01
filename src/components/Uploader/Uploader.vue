<template>
	<div class="p0 m0">
		<div class="flex al-c ju-f fl-w" :class="classArr">
			<div @click="ylTap(fileIndex, fileItem)" class="fill_Upimg_list_item" :style="{'background-image':'url('+ fileItem.fmImg +')'}"
			 v-for="(fileItem,fileIndex) in lookFileArr" :key="fileIndex">
				<div class="pathStatus column ju-c al-c f10 text-white" v-show="fileItem.status==1||fileItem.status==2">
					<span v-if="fileItem.status==1">
						上传中...
					</span>
					<span v-if="fileItem.status==2">
						上传失败
					</span>
				</div>
				<div class="pathName column ju-c al-c" v-show="fileItem.pathName&&fileItem.status==3">
					<div class="text-center clamp1 f10 text-white">{{fileItem.pathName}}</div>
				</div>
				<img @click.stop="dltFile(fileIndex, fileItem)" v-show="deletable" class="imgdlt" src="../../assets/images/dlt.png" />
			</div>
			<div v-if="showUpload" class="fill_Upimg_list_item column al-c ju-c" m="click" @click="selectFileUpload">
				<i class="iconfont icon-jia1 f32 graydf"></i>
			</div>
		</div>
		<van-image-preview v-model="showPreview" :images="imageList.arr1" :startPosition="startPosition"></van-image-preview>
	</div>
</template>

<script>
	import { NWtabMinxin } from "../../mixin/NWtabMinxin.js";
	export default {
		mixins: [NWtabMinxin],
		props: {
			NW_BASEURL: {
				type: String, //真实开发ip地址
				default: window.NW_BASEURL
			},
			NW_PROXYURL: {
				type: String, //开发环境代理地址非IP('/api')
				default: window.NW_BASEURL
			},
			proxyIp: {
				type: String, //开发环境代理地址（IP）
				default: 'http://172.16.68.42:80'
			},
			accessToken: {
				type: String, //token
				default: window.accessToken
			},
			previewCompoment: {
				type: Boolean, //是否需要预览
				default: true
			},
			deletable: {
				type: Boolean, //是否展示删除按钮
				default: true
			},
			showUpload: {
				type: Boolean, //是否展示上传区域
				default: true
			},
			upNub: {
				type: Number,
				default: 9
			},
			upSize: {
				type: Number,
				default: 100
			},
			lookFileArr2: {
				type: Array,
				default: () => []
			},
			fileInfo: {
				type: Object,
				default: function() {
					return {
						jobTypeCode: "",
						objId: ""
					};
				}
			},
			classArr: {
				type: Array,
				default: () => ["pl10", "pb10","pt10", "pr10", "bg-white"]
			},
			videoTypeArr: {
				type: Array,
				default: () => [{
					type: 0,
					typeKey: 'mp4',
					fmImg: require("../../assets/images/fileTypeImg/video.png")
				}]
			},
			imgTypeArr: {
				type: Array,
				default: () => [{
					type: 1,
					typeKey: 'png',
					fmImg: ''
				}, {
					type: 1,
					typeKey: 'jpg',
					fmImg: ''
				}, {
					type: 1,
					typeKey: 'jpeg',
					fmImg: 'bmp'
				}, ]
			},
			txtTypeArr: {
				type: Array,
				default: () => [{
						type: 3,
						typeKey: 'doc',
						fmImg: require("../../assets/images/fileTypeImg/word.png")
					}, {
						type: 3,
						typeKey: 'docx',
						fmImg: require("../../assets/images/fileTypeImg/word.png")
					},
					{
						type: 3,
						typeKey: 'xls',
						fmImg: require("../../assets/images/fileTypeImg/xlsx.png")
					}, {
						type: 3,
						typeKey: 'xlsx',
						fmImg: require("../../assets/images/fileTypeImg/xlsx.png")
					},
					{
						type: 3,
						typeKey: 'ppt',
						fmImg: require("../../assets/images/fileTypeImg/text.png")
					}, {
						type: 3,
						typeKey: 'pptx',
						fmImg: require("../../assets/images/fileTypeImg/text.png")
					},
					{
						type: 3,
						typeKey: 'pdf',
						fmImg: require("../../assets/images/fileTypeImg/pdf.png")
					}, {
						type: 3,
						typeKey: 'pdfx',
						fmImg: require("../../assets/images/fileTypeImg/pdf.png")
					},
					{
						type: 3,
						typeKey: 'zip',
						fmImg: require("../../assets/images/fileTypeImg/zip.png")
					}, {
						type: 3,
						typeKey: 'text',
						fmImg: require("../../assets/images/fileTypeImg/text.png")
					}
				]
			}
		},
		data() {
			return {
				uploaderFun: null,
				startPosition: 0,
				showPreview: false,
				videoPng: require("../../assets/images/fileTypeImg/video.png"),
				dltPng: require("../../assets/images/dlt.png"),
				upFileArr: [],
				lookFileArr: [],
			};
		},
		watch: {
			/* 里面的 */
			lookFileArr: function(va1, va2) {
				this.$emit("update:lookFileArr2", this.lookFileArr);
			},
			/* 外面的*/
			lookFileArr2: function(va1, va2) {
				this.lookFileArr = this.lookFileArr2;
			},
			// NW_BASEURL:function(newval,oldval) {
			// 	console.log('newval'+newval);
			// 	console.log('oldval'+oldval);
			// 	if(newval) {
			// 		window.NW_BASEURL = newval;
			// 	}
			// },
			// NW_PROXYURL: function(newval, oldval) {
			// 		console.log('11111');
			// 	if(newval) {
			// 		console.log('11111');
			// 		window.NW_PROXYURL = newval;
			// 	}
			// 	this.uploaderFun = require('./upload.js').default;
			// },
			fileInfo: {
				deep: true,
				handler: function(newval, oldval) {
					if (newval.objId) {
						this.getAttchmentList(newval.objId); //获取已上传附件列表
					}
				}
			}
		},
		created() {
			if(this.NW_BASEURL || this.NW_PROXYURL) {
				window.NW_BASEURL = this.NW_BASEURL;
				window.NW_PROXYURL = this.NW_PROXYURL;
			}
			this.uploaderFun = require('./upload.js').default;
		},
		mounted() {
			this.lookFileArr = this.lookFileArr2;
		},
		computed: {
			imageList: function() {
				var arr1 = []; //预览数组
				var arr2 = []; //逻辑数组
				for (var i = 0; i < this.lookFileArr.length; i++) {
					/* 0图片，1视频，3文档，4压缩包，未知*/
					if (this.lookFileArr[i].type == 1) {
						arr1.push(this.lookFileArr[i].fmImg);
						arr2.push(this.lookFileArr[i]);
					}
				}
				return {
					arr1: arr1,
					arr2: arr2
				};
			}
		},
		methods: {
			// 附件预览
			ylTap: function(index, itme) {
				/* 0图片，1视频，3文档，4压缩包，未知*/
				console.log('---');
				console.log(itme);
				let _this = this;
				if (itme.status == 0 || itme.status == 1) {
					this.$textCatch("上传中..");
					return;
				}
				if (itme.type == 0) {
					this.myJssdk.playVideo({
						videoJson: JSON.stringify({
							url: itme.path
						})
					});
				} else if (itme.type == 1) {
					//   @arr：目标数组，@key=值的str,@value=具体值--retObj={itme:null,indexLnull}
					var retObj = this.$baseArrExchange(this.imageList.arr2, 'attachmentId', itme.attachmentId);
					console.log(retObj);
					if (this.previewCompoment) {
						this.startPosition = Number(retObj.index);
						this.showPreview = true;
					} else {
						if (window.NW_MODULE_TYPE == 'scyyd_templateUI') {
							this.$across.$emit("changePreview", {
								imageList: this.imageList.arr1,
								showPreview: true,
								startPosition: Number(retObj.index),
							});
						} else if (window.NW_MODULE_TYPE == 'nwTemplateUI') {
							this.$bus.$emit("changePreview", {
								imageList: this.imageList.arr1,
								showPreview: true,
								startPosition: Number(retObj.index),
							});
						}
					}
				} else if (itme.type == 3) {
					this.myJssdk.callMobileJsSdk(
						'file/quicklook', {
							title: 'write',
							urlOrPath: itme.path,
							success(data) {
								console.log('文档预览成功')
							},
							fail(error) {
								_this.$textCatch('文档预览失败');
							}
						});
				} else {
					this.$textCatch('不支持该类型文件');
				}
			},
			// 获取附件列表
			getAttchmentList: function(id) {
				let params = {
					jobTypeCode: this.fileInfo.jobTypeCode,
					objId: this.fileInfo.objId
				};
				let _this = this;
				// this.lookFileArr2 = [];
				this.uploaderFun.$tabAttchmentList(params, function(res) {
					console.log(res);
					if (res && res.length > 0) {
						res.forEach(item => {
							/*type 0视频，1图片，3文档，4压缩包，5未知*/
							var checkObj = _this.checkFileType(item.fileType) || {
								type: 1,
								fmImg: ''
							};
							if (checkObj.type == 0) {
								_this.clVideoFcun(item, checkObj)
							} else if (checkObj.type == 1) {
								_this.clImgFun(item, checkObj);
							} else if (checkObj.type == 3) {
								_this.clFlieFun(item, checkObj);
							}
						});
					}
				});
			},
			/* 处理视频 ，文档*/
			clVideoFcun: function(item, checkObj) {
				var baseUpUrl = this.NW_BASEURL || this.proxyIp;
				var filePath = baseUpUrl + '/web/api/top/atm/attachment/downloadAttachment?attachmentId=' + item.attachmentId +
					'&.' + item.fileType;
				this.lookFileArr.push({
					/* 0图片，1视频，3文档，4压缩包，未知*/
					path: filePath,
					type: checkObj.type,
					//base64之后的缩略图数据
					thumbnailDataStr: '',
					//附件id
					attachmentId: item.attachmentId,
					//封面图
					fmImg: checkObj.fmImg,
					//文件名称
					pathName: item.fileName,
					//具体类型 png jgp mp4
					fileType: item.fileType,
					//状态 待上传0 上传中1  上传失败2 上传完成3
					status: 3
				});
			},
			/* 处理图片 */
			clImgFun: function(item, checkObj) {
				let _this = this;
				this.uploaderFun.$tabDownloadAttachment(item.attachmentId, function(res) {
					if (res) {
						var blob = new Blob([res]);
						var imageUrl = window.URL.createObjectURL(blob);
						_this.lookFileArr.push({
							path: '',
							/* 0图片，1视频，3文档，4压缩包，未知*/
							type: checkObj.type,
							//base64之后的缩略图数据
							thumbnailDataStr: blob,
							//附件id
							attachmentId: item.attachmentId,
							//封面图
							fmImg: imageUrl,
							//文件名称
							pathName: item.fileName,
							//具体类型 png jgp mp4
							fileType: item.fileType,
							//状态 待上传0 上传中1  上传失败2 上传完成3
							status: 3
						});
					} else {
						console.log(res);
					}
				});
			},
			/* 处理文档 */
			clFlieFun: function(item, checkObj) {
				var baseUpUrl = this.NW_BASEURL || this.proxyIp;
				var filePath = baseUpUrl + '/web/api/top/atm/attachment/downloadAttachment?attachmentId=' + item.attachmentId +
					'&.' + item.fileType;
				this.lookFileArr.push({
					/* 0图片，1视频，3文档，4压缩包，未知*/
					path: filePath,
					type: checkObj.type,
					//base64之后的缩略图数据
					thumbnailDataStr: '',
					//附件id
					attachmentId: item.attachmentId,
					//封面图
					fmImg: checkObj.fmImg,
					//文件名称
					pathName: item.fileName,
					//具体类型 png jgp mp4
					fileType: item.fileType,
					//状态 待上传0 上传中1  上传失败2 上传完成3
					status: 3
				});
			},
			/* 删除按钮 */
			dltFile: function(index, itme) {
				/* lookFileArr */
				console.log('--------------');
				console.log(itme);
				let _this = this;
				/* status: 0, //状态 待上传0 上传中1  上传失败2 上传完成3 */
				if (itme.status == 2) {
					var retArr = _this.$baseArrFilter(_this.lookFileArr, 'index', index, false);
					_this.lookFileArr = retArr;
					_this.$textThen("删除成功");
				} else if (itme.status == 3) {
					let params = {
						attachmentTransDTO: {
							/* 表单id */
							jobTypeCode: this.fileInfo.jobTypeCode,
							/* 附件id*/
							attachmentId: itme.attachmentId
						}
					};
					this.$textLoading("加载中");
					this.uploaderFun.$tabDeleteAttachmentById(params, function(res) {
						if (res) {
							_this.$textHid();
							var retArr = _this.$baseArrFilter(_this.lookFileArr, 'index', index, false);
							_this.lookFileArr = retArr;
							_this.$textThen("删除成功");
						} else {
							console.log(err);
							_this.$textHid();
							_this.$textShow(err.message || "删除失败，请重试");
						}
					});
				} else {
					_this.$textCatch("上传中..");
				}


			},
			//选择附件
			selectFileUpload: function() {
				var _this = this;
				// console.log(this.myJssdk);
				/* 0: 默认值，拍照/摄像/相册选择，终端弹出选择框 1: 仅相册选择 直接打开相册
				2: 拍摄 拍照和摄像都支持 直接弹出拍摄界面 3: 仅拍照 直接打开拍照界面 4: 仅摄像 直接打开摄像界面*/
				this.myJssdk.shoot({
					id: 'mine',
					type: 0,
					limit: 9, //选图最大张数
					maxduration: 30, //视频录制最大时长，默认15秒，最大不超过60秒。
					success(data) {
						var dataType = typeof data;
						if (dataType == 'string') {
							data = JSON.parse(data)
						}
						_this.upFileArr = [];
						data.forEach((JssdkItme) => {
							console.log(JssdkItme);
							var retArr = _this.$baseStrSplit(JssdkItme.path, '/');
							var retLeg = retArr.length;
							var pathName = retArr[retLeg - 1];
							var retArr2 = _this.$baseStrSplit(pathName, '.');
							var retLeg2 = retArr2.length;
							var fileType = retArr2[retLeg2 - 1];
							var checkFileObj = _this.checkFileType(fileType);
							if (checkFileObj.type != 5) {
								var itmeUpData = {
									type: JssdkItme.type, ///0 视频  1 照片
									path: JssdkItme.path, // 视频/照片 资源路径
									thumbnailDataStr: JssdkItme.thumbnailDataStr, //base64之后的缩略图数据
									pathName: pathName, //文件名称
									fileType: fileType, //具体类型 png jgp mp4
									fmImg: '', //封面图
									status: 0, //状态 待上传0 上传中1  上传失败2 上传完成3
									attachmentId: '', //附件id
									size: 0,
								};
								switch (itmeUpData.type) {
									case 0: //视频
										itmeUpData['fmImg'] = _this.videoPng;
										break;
									case 1: //照片
										itmeUpData['fmImg'] = 'data:image/' + itmeUpData['fileType'] + ';base64,' + itmeUpData.thumbnailDataStr;
										break;
									default:
										break;
								};
								itmeUpData['size'] = _this.showSize(itmeUpData['thumbnailDataStr'], itmeUpData.path);
								itmeUpData['status'] = 1;
								console.log('imgPageFileSize:' + itmeUpData['size'])
								//  @arr=目标数组，@type：根据什么去筛选数组 index 或id(字符型),@value:值,@status:true 筛选相同的数组 ，false，查找不同的数组--retArr=arr
								var retArr = _this.$baseArrFilter(_this.lookFileArr, 'path', itmeUpData.path, true);
								if (retArr.length > 0) {
									_this.$textCatch('已存在' + itmeUpData.pathName);
								} else {
									_this.upFileArr.push(itmeUpData);
								}
							} else {
								_this.$textCatch('不支持：' + fileType);
							}
						});


						_this.lookFileArr.push.apply(_this.lookFileArr, _this.upFileArr);
						_this.uploadMediaFun(_this.upFileArr[0], 0);
					},
					fail(data) {
						console.info('失败')
						console.info(data)
					}
				})
			},
			//具体上传
			uploadMediaFun: function(itmeUpData, keynNumber) {
				console.log(111111111111)
				console.log(itmeUpData.path)
				console.log(itmeUpData)
				var _this = this;
				var keyLeg = this.upFileArr.length - 1;
				var objectId = this.fileInfo.objId ? this.fileInfo.objId : this.newGuid();
				var obj = {
					param: {
						attachmentTransDTO: {
							jobTypeCode: this.fileInfo.jobTypeCode,
							objectId: objectId, //可以随机造
							fileName: itmeUpData['pathName'],
							fileSize: itmeUpData['size'],
							fileType: itmeUpData['fileType'],
						}
					}
				};
				var parStr = JSON.stringify(obj);
				var headers = JSON.stringify({
					'access-token': this.accessToken
				})
				// console.log(this.accessToken);
				// console.log(this.NW_BASEURL);
				// console.log(this.NW_PROXYURL);
				var baseUpUrl = this.NW_BASEURL || this.proxyIp;
				this.myJssdk.uploadMedia({
					url: baseUpUrl + '/web/upload/api/top/atm/restClient/uploadAttachmentFile',
					fileurl: itmeUpData.path,
					params: parStr,
					headers: headers,
					filekey: 'file',
					success(data) {
						var dataType = typeof data;
						console.log(dataType);
						if (dataType == 'string') {
							data = JSON.parse(data)
						}
						console.log(data);
						console.log(333333333333)
						console.log(data)
						if (data) {
							if (data.data) {
								var retObj = _this.$baseArrExchange(_this.lookFileArr, 'pathName', itmeUpData.pathName);
								_this.lookFileArr[retObj.index]['attachmentId'] = data.data;
								_this.lookFileArr[retObj.index]['status'] = 3;
								_this.upFileArr[keynNumber]['status'] = 3;
								if (keyLeg > keynNumber) {
									_this.uploadMediaFun(_this.upFileArr[keynNumber++], keynNumber++);
								}
							} else {
								/* 上传失败 */
								var retObj = _this.$baseArrExchange(_this.lookFileArr, 'pathName', itmeUpData.pathName);
								_this.lookFileArr[retObj.index]['attachmentId'] = data.data;
								_this.lookFileArr[retObj.index]['status'] = 2;
								_this.upFileArr[keynNumber]['status'] = 2;
								if (keyLeg > keynNumber) {
									_this.uploadMediaFun(_this.upFileArr[keynNumber++], keynNumber++);
								}
							}
						} else {
							/* 上传失败 */
							var retObj = _this.$baseArrExchange(_this.lookFileArr, 'pathName', itmeUpData.pathName);
							_this.lookFileArr[retObj.index]['attachmentId'] = data.data;
							_this.lookFileArr[retObj.index]['status'] = 2;
							_this.upFileArr[keynNumber]['status'] = 2;
							if (keyLeg > keynNumber) {
								_this.uploadMediaFun(_this.upFileArr[keynNumber++], keynNumber++);
							}
						}
						console.log(4444444444)
						console.log(_this.upFileArr);

					},
					fail(data) {
						/* 上传失败 */
						console.log('22222222222222');
						console.log(data);
						var retObj = this.$baseArrExchange(_this.lookFileArr, 'pathName', itmeUpData.pathName);
						_this.lookFileArr[retObj.index]['attachmentId'] = data.data;
						_this.lookFileArr[retObj.index]['status'] = 2;
						_this.upFileArr[keynNumber]['status'] = 2;
						if (keyLeg > keynNumber) {
							_this.uploadMediaFun(_this.upFileArr[keynNumber++], keynNumber++);
						}
					}
				})
			},
			// 检查文件类型 /* 0图片，1视频，3文档，4压缩包，未知*/
			checkFileType: function(fileType) {
				const lowerFileType = fileType.toLowerCase();
				var newArr = [...this.videoTypeArr, ...this.imgTypeArr, ...this.txtTypeArr];
				for (var i = 0; i < newArr.length; i++) {
					if (newArr[i].typeKey == lowerFileType) {
						return newArr[i];
					}
				};
				/* 不支持的文件类型 */
				return {
					type: 5,
					typeKey: 'null',
					fmImg: require("../../assets/images/fileTypeImg/null.png")
				};
			},
			/* 计算base 64  */
			showSize: function(base64url, path, index) {
				//获取base64图片大小，返回KB数字
				var str = base64url;
				var equalIndex = str.indexOf('=');
				if (str.indexOf('=') > 0) {
					str = str.substring(0, equalIndex);
				}
				var strLength = str.length;
				return parseInt(strLength * 16);
			}
		}
	};
</script>

<style scoped lang="less">
	@import "../../assets/less/nw_tool.less";
	.fill_Upimg_list_item {
		position: relative;
		.pxToremLess(height,70px);
		.pxToremLess(width,70px);
		margin-right: 12px;
		margin-top: 12px;
		/* background-size: cover; */
		background-size: 100% 100%;
		background-position: center;
		background-repeat: no-repeat;
		border: 1px #d8d8d8 solid;

		.pathName {
			width: 69px;
			position: absolute;
			left: 0;
			bottom: 0;
			padding: 4px 0;
			background: rgba(0, 0, 0, 0.5);

			div {
				width: 90%;
			}
		}

		.pathStatus {
			height: 70px;
			width: 70px;
			position: absolute;
			left: 0;
			bottom: 0;
			background: rgba(0, 0, 0, 0.5);
		}

		.imgdlt {
			position: absolute;
			right: -6px;
			top: -6px;
			height: 16px;
			width: 16px;
		}
	}
</style>
