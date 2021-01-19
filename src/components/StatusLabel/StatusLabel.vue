<!-- StatusLabel状态标签组件
	<nw-status-label></nw-status-label>

	bqStaLabel: [{ // 标签数据
			staCal: '',// 当status字段大于3时，需要传入的自定义样式（样式之间用空格隔开）
			staLabTxt: '待审核',//展示文本
			status: 0,// 用于判断需要展示的默认样式
			staBorCol: '#1E87F0',//边框和字体颜色；注：当status状态为0时必传字段
		},
		{
			staCal: '',
			staLabTxt: '待审核',
			status: 1
		},
		{
			staCal: '',
			staLabTxt: '待审核',
			status: 2
		},
		{
			staCal: '',
			staLabTxt: '待审核',
			status: 3
		}
	]
 -->
<template>
  <div class="yw-statuslabel  fl-w row al-c">
    <!-- :style="{border: '0.5px solid '+[borVal.status == 0&&borVal.staBorCol&&val.staBorCol!=''?borVal.staBorCol:'#1E87F0']}" -->
    <label v-for="(itme,bgcIndex) in bqStaLabel">
      <div v-if="itme.status==0" class="pl5 pr5 mt6 ptb1  mr5 border pos-r" :key="'bor'+bgcIndex"
      :class="[itme.fsize?itme.fsize:'f6']"
       :style="{'--borderSolide':itme.staBorCol,color:itme.staBorCol}">{{itme.staLabTxt}}</div>
      <div v-if="itme.status!=0" class="pl5 pr5 mt6 ptb2  mr5 border pos-r" :key="'bgc'+bgcIndex" 
      :class="[itme.staCal?itme.staCal:'',itme.status==1?'state1':'',
		   itme.status==2?'state2':'',itme.status==3?'state3':'',itme.fsize?itme.fsize:'f6']">{{itme.staLabTxt}}</div>
    </label>


  </div>
</template>

<script>
  export default {
    name: 'StatusLabel',
    display: 'StatusLabel状态标签组件',
    data() {
      return {
        borList: [],
        bgcList: [],
        objStaLabel: this.bqStaLabel
      }
    },
    props: {
      bqStaLabel: { // 标签数据
        type: Array,
        default: () => [{
            staCal: 'borc-l-1e8 border',
            staLabTxt: '待审核',
            status: 0,
            staBorCol: '#1E87F0',
          },
          {
            staCal: '',
            staLabTxt: '待审核',
            status: 1
          },
          {
            staCal: '',
            staLabTxt: '待审核',
            status: 2
          },
          {
            staCal: '',
            staLabTxt: '待审核',
            status: 3
          }
        ]
      }
    },
    computed: {

    },
    mounted() {
      this.initList();
    },
    methods: {
      initList: function() {
        for (var i = 0; i < this.bqStaLabel.length; i++) {
          if (this.bqStaLabel[i].status == 0) {
            this.borList.push(this.bqStaLabel[i]);
          } else {
            this.bgcList.push(this.bqStaLabel[i]);
          }
        }
      }
    },
  }
</script>

<style scoped lang="less">
  @import "../../assets/less/nw_tool.less";

  .yw-statuslabel {
    // width: 100%;
    // text-align: center;
  }

  .pos-r {
    position: relative;
  }

  .ptb1 {
    .pxToremLess(padding-top, 1px);
    .pxToremLess(padding-bottom, 1px);
  }

  .ptb2 {
    .pxToremLess(padding-top, 2px);
    .pxToremLess(padding-bottom, 3px);
    .pxToremLess(border-radius, 4px);
  }

  .textput-row {
    display: flex;
    flex-direction: row;
  }

  .borc-l-1e8 {
    // border:1px solid #1E87F0;
    border: 0.03125rem solid #1E87F0;
    color: #1E87F0;
  }

  .state1 {
    color: #1ca300 !important;
    background: #DDF1D9 !important;
  }

  .state2 {
    color: #ffc417 !important;
    background: #FFF6DC !important;
  }

  .state3 {
    color: #1e87f0 !important;
    background: #DDEDFD !important;
  }

  .border {
    &:after {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      width: 200%;
      height: 200%;
      .pxToremLess(border-radius, 8px);
      // border-left: 1px solid #ccc;
      // border-right: 1px solid #ccc;
      border-left: 0.0425rem solid var(--borderSolide);
      border-right: 0.0425rem solid var(--borderSolide);
      -webkit-transform-origin: 0 0;
      transform-origin: 0 0;
      -webkit-transform: scale(0.5);
      transform: scale(0.5);
    }

    &:before {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      width: 200%;
      height: 200%;
      .pxToremLess(border-radius, 8px);
      // border-bottom: 1px solid #ccc;
      // border-top: 1px solid #ccc;
      border-bottom: 0.0425rem solid var(--borderSolide);
      border-top: 0.0425rem solid var(--borderSolide);
      -webkit-transform-origin: 0 0;
      transform-origin: 0 0;
      -webkit-transform: scale(0.5);
      transform: scale(0.5);
    }
  }
</style>
