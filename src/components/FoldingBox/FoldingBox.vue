<!-- FoldingBox折叠框组件
	<nw-folding-box>
		<div slot="topRIconSlot"></div>
		<div slot="boxCenten">
			<div>123123132</div>
			<div>123123132</div>
			<div>123123132</div>
			<div>123123132</div>
		</div>
		<div slot="botIconSlot"></div>
	</nw-folding-box>
 -->
<template>
	<div class="yw-folding">
		<div class="box p15 bg-white">
			<div class="box-title folding-row al-c">
				<div class="flex-1 f14 fw" :class="[showBs?'borc-l-1e8 pl5':'']">标题</div>
				<div class="icontrans" @click="showBox = !showBox" :class="[showBox?'showRotate':'']">
					<slot name="topRIconSlot">
						<i class="iconfont icon-sanjiao1 f12 gray9"></i>
					</slot>
				</div>
			</div>
			<div class="pt15" v-show="showBox">
				<slot name="boxCenten"></slot>
			</div>
			<slot name="botIconSlot">
				<div class="folding-row al-c ju-c pt15 txt-1e8">
					<div class="mr5" @click="showBox = !showBox">{{showBox?'收起':'展开'}}</div>
					<div class="icontrans" @click="showBox = !showBox" :class="[showBox?'showRotate':'']">
						<i class="iconfont icon-qianjin-copy txt-1e8 f12"></i>
					</div>
				</div>
			</slot>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'FoldingBox',
		display: 'FoldingBox折叠框组件',
		data() {
			return {
				showBox: true,
				showBs: true,
			}
		},
		props: {
			
		},
		computed: {

		},
		methods: {
			
		},
	}
</script>

<style scoped lang="scss">
	@import "../../assets/scss/nw_tool.scss";
	.yw-folding{
		width: 100%;
		text-align: left;
	}
	.box{
		width: 100%;
	}
	.folding-row{
		display: flex;
		flex-direction: row;
	}
	.icontrans {
		transition: all 0.3s;
		transform: rotate(0deg);
		
	}
	.showRotate {
		transform: rotate(180deg);
	}
	.borc-l-1e8{
		border-left: r(3px) solid #1E87F0;
	}
	.txt-1e8{
		color: #1E87F0;
	}
	.boxs{
		box-shadow: r(10px) r(10px) r(10px) r(10px) rgba(0,0,0,0.2);
	}
</style>
