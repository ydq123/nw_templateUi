<template>
	<div class="">
		<div>
			<checkPerson v-show='changeIndex==0' class="root-page" ref='tabItme0' @openUnit="changeTap(2)" @openSearch="changeTap(1)" @checkSubmit="testCheckSubmit"></checkPerson>
			<searchcheckPerson v-show='changeIndex==1' class="root-page" ref='tabItme1' @openCherk="changeTap(0)" @searchSubmit="testCheckSubmit"></searchcheckPerson>
			<checkUnit v-show='changeIndex==2' class="root-page" ref='tabItme2' @openCherk="changeTap(0)" @unitSubmit="testUnitSubmit"></checkUnit>
		</div>
	</div>
</template>
<script>
	import checkPerson from "./checkPerson.vue";
	import searchcheckPerson from "./searchCheckPerson.vue";
	import checkUnit from "./checkUnit.vue";
	import {
		NWtabMinxin
	} from "../mixin/NWtabMinxin.js";
	export default {
		name: 'tabSearchPerson',
		mixins: [NWtabMinxin],
		components: {
			checkPerson,
			searchcheckPerson,
			checkUnit
		},
		data() {
			return {
				param:{},
				removeEvenStatus: true,
				changeIndex: 0, //底部tab切换下标
				changeIndexCP: 0,
				changeArr: [{
					title: '选择人员',
					status: false,
					scrollY: 0,
				}, {
					title: '搜索人员',
					status: false,
					scrollY: 0,
				}, {
					title: '选择单位',
					status: false,
					scrollY: 0,
				}], //记录子组件的生命周期的
			};
		},
		mounted() {
			this.init();
		},
		methods: {
			//初始化
			init: function(){
				this.param = this.$tabPageData() || {};
			},
			testUnitSubmit: function(){
				this.changeTap(0);
			},
			testCheckSubmit: function(data){
				// console.log('testCheckSubmit:::' + JSON.stringify(data));
				var name = this.param.exeMun;
				// console.log("name::::",name);
				// this.$across.$emit("testemitunit", data);
				var _this = this;
				setTimeout(()=>{
					_this.$across.$emit(name, data);
				},500);
				_this.$router.go(-1);
			},
			divScroll: function() {
				// console.log('divScroll********************************************');
				if (this.removeEvenStatus == true) {
					this.changeArr[this.changeIndex].scrollY = this.$refs['tabItme' + this.changeIndex].$el.scrollTop;
					// console.log('**********',this.$refs['tabItme' + this.changeIndex].$el.scrollTop)
					// console.log('divScroll------------------------',this.changeArr[this.changeIndex].scrollY);
				}
			},
			changeTap: function(index) {
				if (this.changeIndex != index) {
					this.changeIndex = index;
					if (!this.changeArr[index].status) {
						this.$refs['tabItme' + index].onLoad(index); //拟生命周期函数
						this.changeArr[index].status = true;
					};
					// this.$refs.rootTabRef.swipeTo(index); //轮播器切换到指定位置
					this.$refs['tabItme' + index].onShow(index); //拟生命周期函数
				};
				setTimeout(() => {
					this.$refs['tabItme' + index].$el.scrollTop = this.changeArr[index].scrollY
				}, 60)
			},
		},
		//进入前
		beforeRouteEnter(to, from, next) {
			next(vm => {
				//监听div滚动条

				vm.removeEvenStatus = true
				document.addEventListener('scroll', vm.divScroll, true);
				vm.$refs['tabItme' + vm.changeIndex].$el.scrollTop = vm.changeArr[vm.changeIndex].scrollY
				// //设置-前进不刷新-后退刷新
				// if (vm.changeIndex == -1) {
				//   vm.changeTap(0);
				// } else {
				//   vm.$refs.rootTabRef.swipeTo(vm.changeIndex); //轮播器切换到指定位置
				// }
			});
		},
		//离开前
		beforeRouteLeave(to, from, next) {
			//移除监听
			this.removeEvenStatus = false;
			window.removeEventListener('scroll', this.divScroll);
			// next(vm => {
			//    vm.changeIndexCP = vm.changeIndex;
			// });
			this.changeIndexCP = this.changeIndex;
			next(true) //否则允许跳转
		},
	};
</script>
<style scoped lang='less'>
	@import "../plugin/vant/index.css";
	@import "../plugin/vant/icon/local.css";

	.root-page {
		height: 90vh;
		overflow-y: scroll !important;
	}
</style>
