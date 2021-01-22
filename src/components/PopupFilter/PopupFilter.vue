<template>
	<div class="popup-container">
		<van-popup v-model="showPopup" @close="hidePopup" position="right" :style="{ width: `${popupWidth}`, height: '100%' }">
			<slot name="default">
				<div class="pos-r text-hidden h100 pb60">
					<div class="popup-content pb15 pl15 pr15 h100">
						<slot name="popup-content">
							<div v-for="(popupItem, popupIndex) in popupData" :key="popupIndex">
								<div class="choiceType" v-if="popupItem.type == 'type'">
									<div class="title f16 flex ju-b pb15 pt15" @click="showHideNode(popupItem)">
										<div class="name">{{ popupItem.name }}</div>
										<i class="iconfont icon-sanjiao1 f14" :class="[popupItem.node ? '' : 'icon-sanjiao2']"></i>
									</div>
									<div class="content flex fl-w" v-show="popupItem.node">
										<div class="type-item border_1_dc f14 pt8 pb8 pl10 pr10 mr10 mb10" :class="[item.check ? 'text-white' : '']"
										 :style="{ background: item.check ? choiceColor : '' }" v-for="(item, index) in popupItem.list" :key="index"
										 @click="choiceType(item, popupIndex)">
											{{ item.name }}
										</div>
									</div>
								</div>
								<div class="choiceTime" v-if="popupItem.type == 'time'">
									<div class="title f16 flex ju-b pb15 pt15" @click="showHideNode(popupItem)">
										<div class="name">{{ popupItem.name }}</div>
										<i class="iconfont icon-sanjiao1 f14 " :class="[popupItem.node ? '' : 'icon-sanjiao2']"></i>
									</div>
									<div class="content" v-show="popupItem.node">
										<div class="time-item flex ju-b f14 pt15 pb15 borderButtomE8" v-for="(item, index) in popupItem.list" :key="index"
										 @click="choiceTime(item)">
											<div class="name">{{ item.name }}</div>
											<div class="check flex-1 text-right verticle-center ju-e">
												<span class="text gray3" v-if="item.value">{{
                        item.value
                      }}</span>
												<span class="text gray9" v-else>请选择</span>
												<i class="iconfont icon-qianjin gray9 f13"></i>
											</div>
										</div>
									</div>
								</div>
								<div class="choicePage" v-if="popupItem.type == 'goPage'">
									<div class="title f16 flex ju-b pb15 pt15" @click="showHideNode(popupItem)">
										<div class="name">{{ popupItem.name }}</div>
										<i class="iconfont icon-sanjiao1 f14" :class="[popupItem.node ? '' : 'icon-sanjiao2']"></i>
									</div>
									<div class="content" v-show="popupItem.node">
										<div class="time-item flex ju-b f14 pt15 pb15 borderButtomE8" v-for="(item, index) in popupItem.list" :key="index"
										 @click="emitHandle(popupIndex,index)">
											<div class="name">{{ item.name }}</div>
											<div class="check flex-1 text-right verticle-center ju-e">
												<span class="text gray3" v-if="item.value">{{
                        item.value
                      }}</span>
												<span class="text gray9" v-else>请选择</span>
												<i class="iconfont icon-qianjin gray9 f13"></i>
											</div>
										</div>
									</div>
								</div>
							</div>
						</slot>
					</div>
					<div class="popup-btn bg-white flex ju-b f14 p15 pos-a line-t">
						<slot name="popup-btn">
							<div class="nw_buttom_125_44 bg-f5 border_1_dc gray3" @click="resetScreen">
								重置
							</div>
							<div class="nw_buttom_125_44 bg-287 text-white" @click="submitScreen">
								确定
							</div>
						</slot>
					</div>
				</div>
			</slot>
		</van-popup>

		<van-popup v-model="showChoiceTime" position="bottom">
			<van-datetime-picker v-model="currentDate" type="date" title="选择年月日" @confirm="enterTime" @cancel="showChoiceTime = false" />
		</van-popup>
	</div>
</template>
<!-- 调用示例-->
<!--
    普通用法
    <nw-PopupFilter v-model="popupState"></nw-PopupFilter>
    替换插槽
    <nw-PopupFilter>
      <div slot="popup-content">
        123
      </div>
    </nw-PopupFilter>
    -->
<script>
	import {
		NWbaseMinxin
	} from "../../mixin/NWbaseMinxin.js";
	export default {
		data() {
			return {
				tempItem: null,
				showChoiceTime: false,
				currentDate: new Date()
			};
		},
		mixins: [NWbaseMinxin],
		model: {
			prop: "popupState",
			event: "input"
		},
		props: {
			// 显示隐患该组件
			popupState: {
				type: Boolean,
				default: false
			},
			// 弹出层宽度
			popupWidth: {
				type: String,
				default: "80%"
			},
			// 选中类型的颜色
			choiceColor: {
				type: String,
				default: "#287df5"
			},
			popupData: {
				type: Array,
				default: () => [{
						type: "type",
						name: "类型选择",
						node: true,
						isMultiple: false,
						list: [{
								name: "便电压1",
								check: false
							},
							{
								name: "便电压2",
								check: false
							},
							{
								name: "便电压3",
								check: false
							},
							{
								name: "便电压4",
								check: false
							}
						]
					},
					{
						type: "time",
						name: "时间选择",
						node: true,
						list: [{
								name: "开始时间1",
								value: ""
							},
							{
								name: "结束时间",
								value: ""
							},
							{
								name: "竣工时间",
								value: ""
							}
						]
					},
					{
						type: "goPage",
						name: "右箭头选择",
						node: true,
						list: [{
								name: "隐患类型1",
								value: ""
							},
							{
								name: "隐患类型2",
								value: ""
							},
							{
								name: "隐患类型3",
								value: ""
							}
						]
					}
				]
			}
		},
		computed: {
			showPopup: {
				get() {
					return this.popupState;
				},
				set(val) {
					this.$emit("input", val);
				}
			}
		},
		watch: {},
		methods: {
			choiceType(item, popupIndex) {
				if (this.popupData[popupIndex].isMultiple) {
					//多选
					item.check = !item.check;
				} else {
					this.popupData[popupIndex].list.map(item => (item.check = false));
					item.check = true;
				}
			},
			emitHandle(index1, index2) {
				this.$emit("emitHandlePage", {
					index1: index1,
					index2: index2
				});
			},
			setHandle(index1, index2, value) {
				this.popupData[index1].list[index2]['value'] = value;
			},
			enterTime(value) {
				this.showChoiceTime = false;
				this.tempItem.value = this.$baseTimeFormatYMD(value);
			},
			choiceTime(item) {
				this.tempItem = item;
				this.showChoiceTime = true;
			},
			hidePopup() {
				this.$emit("input", false);
			},
			showHideNode(item) {
				item.node = !item.node;
			},
			// 重置
			resetScreen() {
				this.$emit("resetScreen");
			},
			// 确定
			submitScreen() {
				this.$emit("submitScreen");
			}
		}
	};
</script>

<style scoped lang="less">
	@import "../../assets/less/nw_tool.less";

	.h100 {
		height: 100%;
	}

	.ju-e {
		justify-content: flex-end;
	}

	.popup-container {
		i {
			transition: all 0.3s;

			&.icon-sanjiao2 {
				transform: rotate(180deg);
			}
		}

		.popup-content {
			overflow: scroll;
		}

		.content {
			.type-item {
				.pxToremLess(border-radius, 4px);
			}
		}

		.popup-btn {
			width: 100%;
			bottom: 0;
			left: 0;
		}
	}
</style>
