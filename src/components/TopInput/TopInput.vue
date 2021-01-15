<!-- TopInput模块头部组件使用方法
	搜索按钮
	<nw-top-input>
		<div slot="taskSreenSort"></div>
		<div slot="fousInput"></div>
	</nw-top-input>
	搜索输入框带排序和筛选
	<nw-top-input>
		<div slot="topInput"></div>
	</nw-top-input>
	搜索输入框
	<nw-top-input>
		<div slot="topInput"></div>
		<div slot="taskSreenSort"></div>
	</nw-top-input>
	参数说明
	mTop:0,// 距离头部高度
	TopInput模块头部组件参数
	isSort: true, // 控制显示排序按钮，默认为true：显示
	isSreen: true, // 控制显示筛选按钮，默认为true：显示
	sortDataList: [ // 排序数组
		{
			text: "按日期升序",
			isSelect: false,
			sortType: "asc", //排序类型
		},
	],
 -->
<template>
	<div>
		<div class="yw-topinput bg-f5" >
			<slot name="topInput">
				<!-- 搜索框按钮 -->
				<div class="top-input" v-if="!topInput">
					<div class="input-box" @click="inputTopBtn">
						<i class="iconfont icon-sousuo f14 text-99"></i>
						<span class="f14 text-99">搜索</span>
					</div>
				</div>
				<div class="top-input input-row al-c" v-show="topInput">
					<div class="input-box flex-1 input-row">
						<i class="iconfont icon-sousuo f14 text-99 ml10 mr5" @click="inputTopBtn"></i>
						<input id="tapInput" type="text" class="input flex-1 f14" v-model="searchValue" placeholder="搜索" @keypress="inputSearch()" />
						<i v-if="searchValue.length > 0" class="iconfont icon-shanchu3 f15 pl5 mr5 gray9" @click="cancelSearch"></i>
					</div>
				</div>
			</slot>
			<slot name="fousInput">
				<!-- 搜索框 -->
				<div class="top-input input-row al-c">
					<div class="input-box flex-1 mr15 input-row">
						<i class="iconfont icon-sousuo f14 text-99 ml10 mr5" @click="inputTopBtn"></i>
						<input type="text" class="input flex-1 f14" v-model="searchValue" placeholder="搜索" @keypress="inputSearch()" />
						<i v-if="searchValue.length > 0" class="iconfont icon-shanchu3 f15 pl5 mr5 gray9" @click="cancelSearch"></i>
					</div>
					<div class="txt-1e8 f14" @click="cancellBtn">取消</div>
				</div>
			</slot>
			<slot name="taskSreenSort">
				<div class="input-row input-srot borderTopE8">
					<div class="flex-1 text-left gray6 pl15 f16 verticle-center">共{{listNub}}条记录</div>
					<div class="task-top-sreen-btn pl15 pr15 verticle-center" m="click" @click="changeSort" v-if="isSort">
						<span class="f16 mr5 gray6">排序</span>
						<i class="iconfont icon-qianjin-copy f10 gray9" :class="{'showRotate': sortData.showPop}"></i>
					</div>
					<div class="task-top-sreen-btn pl15 pr15 verticle-center" m="click" @click="changeSreen" v-if="isSreen">
						<span class="f16 mr5 gray6">筛选</span>
						<i class="iconfont icon-shaixuan1 f10 gray9"></i>
					</div>
				</div>
			</slot>
			<!-- 排序 -->
			<div v-if="sortData.showPop" class="bg-white">
				<div v-for="(sortItem, sortIndex) in sortData.list" :key="sortIndex">
					<div class="f16 p15 gray3 borderTopE8 input-row" @click="changeSortItem(sortIndex)">
						<div class="flex-1 text-left">{{sortItem.text}}</div>
						<i class="iconfont pos-a gray287 icon-gou" v-if="sortIndex==sortData.dtIndex"></i>
					</div>
				</div>
			</div>
		</div>
		<div class="zdc" :style="{'z-index':mTopZindex}" v-show="showPop" @click.stop="zdcBtnShow"></div>
	</div>
</template>

<script>
	export default {
		name: 'TopInput',
		display: 'TopInput模块头部组件',
		data() {
			return {
				topInput: false,
				searchValue: '',
				showPop: false,
				//排序数组
				sortData: {
					list: this.sortDataList,
					dtIndex: 0,
					showPop: false
				},
			}
		},
		props: {
      mTopStatus:{// 是否需要固定布局
				type: Boolean,
				default: false
			},
      mTopZindex:{// 列表数据总数
				type: Number,
				default: 9
			},
			listNub: {// 列表数据总数
				type: Number,
				default: 0
			},
			isTopInput: { // 控制头部搜索点击事件是否显示搜索框，默认为false不显示，true显示
				type: Boolean,
				default: false
			},
			mTop: { // 距离头部高度
				type: Number,
				default: 0
			},
			isSort: { // 控制显示排序按钮，默认为true：显示
				type: Boolean,
				default: true
			},
			isSreen: { // 控制显示筛选按钮，默认为true：显示
				type: Boolean,
				default: true
			},
			sortDataList: { // 排序数组
				type: Array,
				default: () => [{
						text: "按日期降序",
						isSelect: true,
						sortType: "desc", //排序类型
					},
					{
						text: "按日期升序",
						isSelect: false,
						sortType: "asc", //排序类型
					},
				]
			},
		},
		computed: {

		},
		watch: {
			showPop: function() {
				if (!this.showPop) {
					document.body.style.overflow = '';
				} else {
					document.body.style.overflow = 'hidden';
				}
			},
			searchValue: function(val){
				if(val){
					console.log('val:',val);
					this.fousSearch();
				}
			},
		},
		mounted() {

		},
		methods: {
			// 取消按钮
			cancellBtn: function(){
				console.log('cancellBtn');
				this.$emit('cancellBtn');
			},
			// 监听搜索内容
			fousSearch: function(){
				console.log('fousSearch');
				this.$emit('fousSearch',this.searchValue);
			},
			// 手机键盘回车键
			inputSearch: function() {
				if (event.keyCode == 13) {
					event.preventDefault(); //阻止默认事件
					if (this.searchValue != '') {
						this.$emit('inputSearch',this.searchValue);
					}
				}
			},
			cancelSearch: function() {
				this.searchValue = '';
			},
			//头部搜索按钮
			inputTopBtn: function() {
				console.log('inputTopBtn');
				if(this.isTopInput){
					this.topInput = true;
					document.getElementById("tapInput").focus();
				}
				this.$emit('inputTopBtn');
			},
			// 显示隐藏排序
			changeSort: function() {
				this.sortData.showPop = !this.sortData.showPop;
				this.showPop = !this.showPop;
			},
			// 筛选
			changeSreen: function() {
				console.log('changeSreen');
				this.$emit('changeSreen');
			},
			//选择排序类型
			changeSortItem: function(index) {
				// 待办的点击排序
				this.sortData.dtIndex = index;
				var data = {
					item: this.sortData.list[index]
				}
				this.$emit('changeSortItem', data);
				this.changeSort();
			},
			// 遮挡层隐藏
			zdcBtnShow: function() {
				this.showPop = false;
				this.sortData.showPop = false;
			},
		},
	}
</script>

<style scoped lang="less">
	@import "../../assets/less/nw_tool.less";
	.yw-topinput {
		text-align: center;
		width: 100%;
	}

	.text-99{
		color: #999999;
	}

	.pos-a{
		position: absolute;
		.pxToremLess(right,15px);
	}

	.top-input {
			.pxToremLess(padding,10px);

		.input-box {
			.pxToremLess(border-radius,5px);
			.pxToremLess(height,30px);
			.pxToremLess(line-height,30px);
				background: white;
			}
	}

	.input-srot {
		.pxToremLess(height,40px);
		background-color: #fff;
	}

	.zdc {
		width: 100vw;
		height: 100vh;
		background-color: rgba(0, 0, 0, 0.5);
		position: relative;
		top: 0;
		left: 0;
	}


	.zIndex999 {
		z-index: 999 !important;
	}

	.input-row {
		display: flex;
		flex-direction: row;
	}

	.task-top-sreen-btn {
		border-left: 1px solid rgb(240, 238, 238);

		i {
			-moz-transition: all 0.3s;
			-moz-transform: rotate(0deg);
			-webkit-transition: all 0.3s;
			-webkit-transform: rotate(0deg);

			&.showRotate {
				-moz-transform: rotate(180deg);
				-webkit-transform: rotate(180deg);
			}
		}
	}
	.txt-1e8{
		color: #1E87F0;
	}
</style>
