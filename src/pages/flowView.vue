<template>
	<div class="hiddenDanger_page_wrap pt44">
		<nw-fixed-header :title="(tabPageData.pageTitle?tabPageData.pageTitle:'')+'流程视图'">
      <div slot="left" @click="$router.go(-1)">
        <i class="iconfont icon-houtui"></i>
      </div>
		</nw-fixed-header>
		<div class="p10 " v-if="nodeList.length>0">
			<div class="borderRadius_10 bg-287 p15">
				<div class="verticle-center">
					<i class="iconfont icon-jiedian1 text-white f14 mr5"></i>
					<div class="lh150 f14 text-white">当前节点：{{nodeData.curNodeName}}（已停留{{nodeData.curNodeTime}}）</div>
				</div>
				<div class="verticle-center mt5">
					<i class="iconfont icon-cebianlan-haoshi text-white f16 mr5"></i>
					<div class="lh150 f14 text-white">总耗时：{{nodeData.countTime}}</div>
				</div>
			</div>
			<div class="pt30 pl10 pb30">
				<div class="progress">
					<div class="pb30">
						<div class="progress-l-iconfont bg-d9e0ea"></div>
						<div class="flex-1 f13">流程结束</div>
					</div>
					<div class="progress-centent">
						<div class="progress-centent-c bg-white mb30" v-for="(nodeItme,nodeIndex) in nodeList" :key="nodeIndex">
							<div class="progress-a bg-white">
								<i v-if="nodeItme.completeType==-1" class="icon-jiedian1 iconfont f18 txt-1e8"></i>
								<i v-else class="icon-gouxuan1 iconfont f18 txt-1e8"></i>
							</div>
							<div class="p15 radius-8" >
								<!-- nodeItme.colStatus -->
								<label  v-if="nodeItme.colStatus?nodeItme.colStatus:colIndex==0"
								 v-for="(colItme,colIndex) in nodeItme.colTransTrackInfo">
									<div class="flex al-c" >
										<div class="flex-1" >
											<div class="mb20" >
												<div class="flex ju-b mb5">
													<div class="f15 fw">{{nodeItme.curNodeName}}</div>
													<div>{{colItme.actorName}}</div>
													<div class="f13 txt-666">{{$baseTimeFormat("-", ":", true, colItme.overTime)}}</div>
												</div>
												<div class="flex al-c f13 txt-666">
													<div class="mr5 text-overflow txt-nowrap pr5">
														意见：{{colItme.msg||'同意'}}
													</div>
													<div class="box-bor-l txt-595 f13">
														耗时：{{$baseTimeDifference(colItme.overTime,colItme.handleTime)}}
													</div>
												</div>
											</div>
										</div>
										<div @click="callPhone(colItme)">
											<i class="iconfont txt-1e8 icon-dianhua f23 ml10"></i>
										</div>
									</div>
								</label>
								<div @click="nodeItme.colStatus=!nodeItme.colStatus" class="txt-1e8 f13 flex"
								v-if="nodeItme.colTransTrackInfo.length>1">
									<div class="mr5">
										{{nodeItme.colStatus?'收起':'更多'}}
									</div>
									<i  :class="{'showRotate': !nodeItme.colStatus}" class="iconfont icontrans icon-houtui f10 txt-1e8"></i>
								</div>
							</div>
						</div>
					</div>
					<div class="">
						<div class="progress-l-iconfont bg-d9e0ea "></div>
						<div class="flex-1 f13">流程开始</div>
					</div>
				</div>
			</div>
		</div>

		<div @click="getFlowData">
			<nw-null-data class="mt100"  v-if="nodeList.length==0"></nw-null-data>
		</div>

	</div>
</template>

<script>
	import {
		queryAllTrackByProcessInsId
	} from "../moduleAPI/bpms.js"
	import { NWtabMinxin } from "../mixin/NWtabMinxin.js";
	export default {
		name: "flowView",
		mixins: [NWtabMinxin],
		data() {
			return {
				nodeData: {
					curNodeName: "", //当前节点名称
					curNodeTime: "", //当前节点名称已停留
					countTime: "" //总耗时
				},
				nodeList: []
			};
		},
		components: {},
		created() {},
		mounted() {
			console.log("路由参数", this.tabPageData);
			this.initFun();
		},
		methods: {

		initFun: function() {
			this.getFlowData();
		},
		// 获取流程信息
		getFlowData: function() {
			this.$textLoading("加载中");
			let params = {
				processId: this.tabPageData.processId,
				processInsId: this.tabPageData.processInsId
			};
			queryAllTrackByProcessInsId(params)
				.then(ret => {
					this.$textHid();
					console.log(ret);
					if(ret){
						// retBoolean=true(数组)，false(不是数组)
						var retBoolean =this.$baseIsArray(ret);
						if(retBoolean){
							if(ret.length>0){
								//将数组倒叙（反转）@arr目标数组
								let sumMin = 0;
								ret=this.$baseArrReverse2(ret);
								ret=ret.filter(item => item.colTransTrackInfo.length>0);//筛选无用数据
								ret.forEach(item => {
									item['colStatus']=false;
								  item.time = this.$baseTimeFormat("-", ":", true, item.createTime);
								  item.diffTime = this.$baseTimeDifference(
								    item.overTime,
								    item.createTime
								  );
								  sumMin += item.overTime - item.createTime;
								});
								console.log(sumMin)
								this.nodeData.curNodeName = ret[0].curNodeName;//当前节点名称
								this.nodeData.curNodeTime = this.$baseTimeDifference(ret[0].overTime,ret[0].createTime);//当前节点名称已停留
								this.nodeData.countTime = this.$baseTimeDifference(sumMin, 0);
								this.nodeList=ret;
							}
						}
					}
				})
				.catch(error => {
					console.log(error);
					this.$textHid();
				});

		},
		// 拨打电话
		callPhone: function(item) {
			console.log(item);
			if (item.phone) {
				this.myJssdk.phoneCall({
					phonedangerCode: item.phone
				});
			}else{
				this.$textCatch('无号码信息')
			}
		}
	}
	};
</script>

<style scoped lang="less">
	.hiddenDanger_page_wrap {
		height: 100%;
		background-color: #f5f5f5;
		// overflow: hidden;
	}

	.f15 {
		font-size: 15px;
	}

	.f23 {
		font-size: 23px;
	}

	.borderRadius_10 {
		border-radius: 5px;
	}

	.radius-8 {
		border-radius: 8px;
	}

	.progress {
		position: relative;
		padding-left: 15px;
		border-left: 1px solid #d9e0ea;
	}

	.progress-a {
		position: absolute;
		border-radius: 50%;
		left: -7.5px;
		margin-top: 13px;
	}

	.progress-l-iconfont {
		position: absolute;
		width: 16px;
		height: 16px;
		border-radius: 50%;
		left: -7.5px;
	}

	.progress-centent {}

	.progress-centent-c {}

	.txt-1e8 {
		color: #1e87f0;
	}

	.txt-666 {
		color: #666666;
	}

	.bg-d9e0ea {
		background-color: #d9e0ea;
	}

	.icontrans {
		-moz-transition: all 0.3s;
		-moz-transform: rotate(-90deg);
		-webkit-transition: all 0.3s;
		-webkit-transform: rotate(-90deg);

		&.showRotate {
			-moz-transform: rotate(90deg);
			-webkit-transform: rotate(90deg);
		}
	}
</style>
