# nw-template-ui

> 南网秘密小组件库

## Serve with hot reload at localhost:8080

```bash
  npm run dev
```

> 发布新版本时，执行打包压缩

## Build for production with minification

```bash
  npm run build
```

## 手把手教你用

```bash
  import "nwtemplate/dist/nwTemplateUi.css";
  import nwtemplate from 'nwtemplate';
  Vue.use(nwtemplate);
```

### uploader附件上传组件重点解释
~~参数分别有	NW_BASEURL: "", NW_PROXYUL: "", proxyIp: "", accessToken: "", lookFileArr2: [], fileInfo: {}
NW_BASEURL为真实开发ip地址，即为build上线后使用的地址，与下面代理地址、代理ip不可共存。开发时此参数传空。
NW_PROXYUL为开发环境代理地址,非IP，代理例如('/api')，目的是方便在本地开发时可以配置使用；
proxyIp为开发环境代理地址（IP），光有代理地址没有真实ip不行（上传附件需要用到）；~~

#### 必须要做的事:
  1. 在需要使用该库的项目下文件夹moduleAPI下必须要有个setData.js，该js文件里必须...（参考项目scyyd_module）
  2. 在项目登录的时候必须手动挂载NW_BASEURL，NW_PROXYUL（非必传）到window变量下。

#### NW_BASEURL为上线地址（开发环境可不传正式环境必传）；
#### NW_PROXYUL为代理地址（字符串如：'/api'）;如不传默认为'/moduleIp'，意味着你的项目代理地址必须是'/moduleIp';
#### proxyIp为开发环境下的后端调试的ip地址；如不传无法在开发环境下进行上传功能测试

#### 在vant_tab下使用附件预览会出现bug，解决方法-->
  1. 传参previewCompoment为false
  2. 页面要这样来
  ```javascript
  <!-- 在页面根目录下插入这句代码 -->
  <van-image-preview v-model="showPreview" :images="imageList" :startPosition="startPosition"></van-image-preview>
  <!-- 在data定义这些参数 -->
      showPreview: false,
      imageList: [],
      startPosition: 0,
  <!-- 在该页面挂载该监听 -->
  	  let _this =this;
      _this.$bus.$on("changePreview", function(data) {
        console.log(1111111111111);
        _this.imageList = data.imageList;
        _this.showPreview = data.showPreview;
        _this.startPosition = data.startPosition;
      });
  ```

####FixedHeader组件使用
```brash
<!--第一种--使用示例如下 直接自己全新定义 -->
  <nw-FixedHeader @headBackeHandle="backHandle" @threeClockHandle="ClockHandle" @backHomeHandle="HomeHandle">
      <div slot="default">
				<div class="header">
					<div class="left-btn">取消222</div>
					<div class="header-txt">标题标题222</div>
					<div class="right-content">4526</div>
				</div>
        <div slot="page-bottmo">需要固定在头部的其他东西</div>
			</div>
    </nw-FixedHeader>
<!-- 第二种--使用示例如下 title传进来，自己定义left和right内容，也可以不传，有默认内容 自个斟酌-->
  <nw-FixedHeader title="徐徐噶" @headBackeHandle="backHandle" @threeClockHandle="ClockHandle" @backHomeHandle="HomeHandle">
      <div slot="left"><i class="pl10 iconfont icon-huitui"></i></div>
      <div slot="right"><i class="pr10 iconfont icon-qianjin"></i></div>
      <div slot="page-bottmo">需要固定在头部的其他东西</div>
    </nw-FixedHeader>
<!-- methods说明 -->
<!-- headBackeHandle---点击左上角返回按钮事件  threeClockHandle---点击右上角三点按钮事件 backHomeHandle---点击右上角⚪点按钮事件-->
```

####自定义InsideLoading加载中组件使用
```brash
<!-- 调用示例-->
   <!--普通用法-->
    <nw-inside-loading> </nw-inside-loading>
    <!--替换插槽-->
    <nw-inside-loading>
      <div slot="loadingImg">
        <van-icon name="shrink" />
      </div>
      <label slot="loadingText">
       <span>获取数据中...</span>
      </label>
    </nw-inside-loading>
```


####无数据占位图组件使用
```brash
<!-- 调用示例-->
   <!--普通用法-->
    <nw-null-data></nw-null-data>
    <!--替换插槽-->
    <nw-null-data>
			<div slot="nullImg"><img src="https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2771978851,2906984932&fm=26&gp=0.jpg" alt="" /></div>
			<div slot="nullText">123</div>
		</nw-null-data>
```


####右侧弹出层组件使用
```brash
<!-- 调用示例-->
   	<!--普通用法-->
    <nw-PopupFilter v-model="popupState" @resetScreen="" @submitScreen=""></nw-PopupFilter>

    <!--替换插槽-->
    <nw-PopupFilter>
		<!-- 上部内容替换使用 -->
      <div slot="popup-content">
        123
      </div>
		<!-- 下部内容替换使用 -->
      <div slot="popup-btn">
        123
      </div>
		<!-- 全部替换 -->
		<div>不用所有的默认内容，自己重新定义的内容</div>
    </nw-PopupFilter>

		<!-- 事件说明 -->
		resetScreen--重置
		submitScreen--确定

		<!-- 参数说明 -->
		popupState--显示隐患该组件-默认为false
		popupWidth--弹出层宽度-默认为‘80%’
		choiceColor--选中类型的颜色-默认为'#287df5'
		popupData--弹出层数据结构-👇
		<!-- popupData数据结构 -->
		[
        {
          type: "type",
          name: "类型选择",
          node: true,
          isMultiple: false,
          list: [
            {
              name: "便电压",
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
          list: [
            {
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
          list: [
            {
              name: "隐患类型1",
              handle: "aa",
              value: ""
            },
            {
              name: "隐患类型2",
              handle: "bb",
              value: ""
            },
            {
              name: "隐患类型3",
              handle: "cc",
              value: ""
            }
          ]
        }
      ]
```


####详情页头部简介组件使用
```brash
<!-- 调用示例-->
<nwtop-introduce></nwtop-introduce>

<!-- 参数说明：接受一个对象，👇 -->
			{
        orderNumber: "GPL-2020-1020-LIMITED", //单号
        copyText: "复制", //展示的复制文本
        showCopy: true, //是否展示复制功能
        statusValue: ["审核中", "处理中"], //状态
        statusColor: "#fff", //状态字体颜色
        statusBg: "#1e87f0", //状态背景
        keyValues: [ //需要展示的简介信息--key-value形式
          {
            name: "缺陷设备",
            value: "缺陷设备2号"
          },
          {
            name: "缺陷等级",
            value: "1v"
          },
          {
            name: "缺陷应完成时间",
            value: "2020-10-20"
          }
        ]
      }
```
======================================================================================================

####BotButton底部按钮组件使用方法
```brash
<!-- 标签，存在默认值， -->
<nw-bot-button :zyBtn="dbZyBtn" :cyBtn="dbCyBtn" :twoZCyBtn="dbTwoZCyBtn" :zIconBtn="dbZIconBtn" @zyCliBtn="testZyCliBtn" @cyCliBtn="自定义方法" @towZyCliBtn="自定义方法" @towCyCliBtn="自定义方法" @cliIconItemBtn="自定义方法" @cliIconRBtn="自定义方法" />

<!-- poros数组说明 -->
	zyBtnm,// 主要按钮配置项
	data参数例子：dbZyBtn: { // 主要按钮配置项
		btnType: true, // 判断按钮是否显示，必传
		text: '主要按钮', //  按钮文案
		color: 'white', // 按钮文案颜色
		bgcolor: '#1E87F0',//  按钮背景颜色
		fsize: '16px' // 字体大小
	},
	cyBtn,// 次要按钮配置项
	data参数例子：dbCyBtn: { // 次要按钮配置项
		btnType: true,
		text: '次要按钮',
		color: '#262626',
		fsize: '16px'
	},
	twoZCyBtn,// 等分要按钮配置项
	data参数例子：dbTwoZCyBtn: { // 等分要按钮配置项
		btnType: true,
		zhuyaoBtn: {
			text: '发送',
			color: 'white',
			bgcolor: '#1E87F0',
			fsize: '16px'
		},
		ciyaoBtn: {
			text: '保存',
			color: '#262626',
			fsize: '16px'
		},
	},
	zIconBtn,// icon按钮配置项
	data参数例子：dbZIconBtn: { // icon按钮配置项
		btnType: true,
		iconList: [{ // icon数组最多为3个
				icon: 'icon-jinyongqingkuang', // icon名称
				iconText: '哈哈1', // icon文案
				iconSize: '14px', // icon大小
				textSize: '14px', // 文案大小
				iconColor: '', // icon颜色
				textColor: '' // icon文案颜色
			},
		],
		zhuyaoBtn: {
			text: '终结',
			color: 'white',
			bgcolor: '#1E87F0',
			fsize: '16px'
		},
	},

<!-- 方法说明 -->
zyCliBtn,// 主要按钮点击事件
cyCliBtn,// 次要按钮点击事件
towZyCliBtn,// 等分主要按钮点击事件
towCyCliBtn,// 等分次要按钮点击事件
cliIconItemBtn,// icon按钮点击事件,返回点击按钮对象
cliIconRBtn,// icon右边按钮点击事件
自定义方法例子：testZyCliBtn(){ js逻辑 }
```

####MapPop模块组件使用方法
```brash
<!-- 标签，存在默认值， -->
<nw-map-pop :isMapPop="show" :mapList="mList" :switchList="sList" @checkTheme="testCheckTheme" @zdcBtnShow="testZdcBtnShow" />

<!-- poros数据说明 -->
	isMapPop,// 控制显示地图弹窗
	data参数例子：show:false
	mapList,// 地图底图数组
	data参数例子：mList: [{ 
			label: "标准地图",//地图名称
			value: "1",//地图光标样式 ，值为2为选中样式
			key: require('@/assets/images/mapImg/layer_pic1.png'),//地图图片
			isChecked: true,//判断是否选中
		},
	]
	switchList,// 状态数组
	data参数例子：sList:[{ 
			mlTitle: '等级',//标题说明
			mlType: 'dj',//自定义状态，可用于逻辑判断
			mlList: [{
				dengCol: 1,// 注：非必传  警示灯，1：紧急，2：重大，3：一般，4：其他
				text: 'xx单',// 说明
				status: false//按钮判断，建议默认为false，有需要可为true
			}, ]
		},
		{
			mlTitle: '状态',
			mlType: 'zt',
			mlList: [{
				text: '即将超期',
				status: false
			}, ]
		},
		{
			mlTitle: '地图显示',
			mlType: 'dtxs',
			mlList: [{
				text: '未消缺',
				status: false
			}]
		}
	]
<!-- 方法说明 -->
checkTheme,// 地图样式切换
自定义方法例子：testCheckTheme(data){ js逻辑 }
zdcBtnShow,// 遮挡层关闭地图弹窗
自定义方法例子：testZdcBtnShow(data){ js逻辑 }
```

####ModuleTop模块头部组件使用方法
```brash
<!-- 标签，存在默认值， -->
	<nw-module-top :isSort="true" :isSreen="true" :sortDataList="ListPx" :sreenDataObj="objSx" :tabList="testTabList" @inputTopBtn="testInputTopBtn" @changeTab="testChangeTab" @changeSortItem="testChangeSortItem" @submitScreen="testSubmitScreen" @resetScreen="testResetScreen"></nw-module-top> 
	结合nw-fixed-header使用（带搜索和排序筛选）
	<nw-fixed-header title="头部标题" @headBackeHandle="backHandle" @threeClockHandle="ClockHandle" @backHomeHandle="HomeHandle">
		<div slot="page-bottmo">
			<nw-module-top :isSort="true" :isSreen="true" :mTop="0" :sortDataList="ListPx" :sreenDataObj="objSx" :tabList="testTabList"
			 @inputTopBtn="testInputTopBtn" @changeTab="testChangeTab" @changeSortItem="testChangeSortItem" @submitScreen="testSubmitScreen"
			 @resetScreen="testResetScreen"></nw-module-top>
		</div>
	</nw-fixed-header>
	结合nw-fixed-header使用 插槽（slot="topInput"：隐藏搜索，slot="taskSreenSort"：隐藏排序筛选）
	<nw-fixed-header title="头部标题" @headBackeHandle="backHandle" @threeClockHandle="ClockHandle" @backHomeHandle="HomeHandle">
		<div slot="page-bottmo">
			<nw-module-top :isSort="true" :isSreen="true" :mTop="0" :sortDataList="ListPx" :sreenDataObj="objSx" :tabList="testTabList">
				<div slot="topInput"></div>
				<div slot="taskSreenSort"></div>
			</nw-module-top>
		</div>
	</nw-fixed-header>

<!-- poros数据说明 -->
	tabList,// 头部tab数组
	data参数例子：testTabList: [
		{
			title: "已办",//标题
			number: 0,//数量
		}
	], 
	isSort: true, // 控制显示排序按钮，默认为true：显示
	isSreen: true, // 控制显示筛选按钮，默认为true：显示
	sortDataList,// 排序数组
	data参数例子：ListPx: [
		{
			text: "按日期升序",//标题
			isSelect: false, // 判断是否选中排序
			sortType: "asc", //排序类型
		},
	],
	sreenDataObj,// 筛选对象
	data参数例子：objSx: { 
			showPop: false,//判断显示筛选弹窗，默认不显示，false：否，true：是
			qfDdx: true,// 区分单选和多选，默认true为多选，false为单选
			sreenTodoItem: [// 待办数组
				{
					itemTitle: '待办状态',//标题
					isArrSta: 'todoZt',// 返回判断数组数据标识
					sreenList:[
						{
							id: "",
							text: "状态0",//数组标题
							isSelect: false//判断是否选中，false为否，true为是
						},
					]
				},
				{
					itemTitle: '待办等级',
					isArrSta: 'todoDj',// 返回判断数组数据标识
					sreenList:[
						{
							id: "",
							text: "0",
							isSelect: false
						},
					]
				},
			],
			sreenDoneItem: [// 已办数组
				{
					itemTitle: '已办状态',
					isArrSta: 'doneZt',// 返回判断数组数据标识
					sreenList:[
						{
							id: "",
							text: "已办0",
							isSelect: false
						},
					]
				},
				{
					itemTitle: '已办等级',
					isArrSta: 'doneDj',// 返回判断数组数据标识
					sreenList:[
						{
							id: "",
							text: "0",
							isSelect: false
						},
					]
				},
			],
	},
	
	
<!-- 方法说明 -->
inputTopBtn//moduletop模块头部搜索按钮
自定义方法例子：testInputTopBtn() { console.log('moduletop模块头部搜索按钮'); },
changeTab// moduletop模块tab切换
自定义方法例子：testChangeTab(data) { console.log('moduletop模块tab切换：', data); },
changeSortItem// moduletop模块排序
自定义方法例子：testChangeSortItem(data) { console.log('moduletop模块排序：', data); },
submitScreen// moduletop模块筛选确定
自定义方法例子：testSubmitScreen(data) { console.log('moduletop模块筛选确定：', data); },
resetScreen// moduletop模块筛选重置
自定义方法例子：testResetScreen() { console.log('moduletop模块筛选重置'); },
```

####UnitPop模块组件使用方法
```brash
<!-- 标签，存在默认值， -->
<nw-unit-pop :popShow="false" :popUserInfo="userInfo" @overlay="testOverlay" />

<!-- poros数据说明 -->
	popShow,//控制弹窗显示隐藏，默认为隐藏
	popUserInfo,//当前登录人信息
	data参数例子：userInfo:{ 
		"employeeId": "A9C0B502210946C5BD52494CD5442492",
		"userId": "AEEEE802803749E1841C857240F0C3B5",
		"employeeName": "毛嘉杰",
		"account": "maojiajie",
		"shortSpell": "mjj",
		"fullSpell": "maojiajie",
		"orgId": "1589BAA87C11BD64E053380F0A0A54B2",
		"orgName": "广州天河供电局",
		"nameFullPath": "中国南方电网有限责任公司/广州供电局有限公司/广州天河供电局",
		"orgCode": "080020",
		"sapHROrgId": "8816B370FB4A0B82E0440018FE2DCEF4",
		"orgStructureId": "A",
		"unitOid": "1589BAA87C11BD64E053380F0A0A54B2",
		"unitOname": "广州天河供电局",
		"unitCode": "030120",
		"shortOrgName": "天河"
	}
<!-- 方法说明 -->
overlay,//关闭弹窗
自定义方法例子：testOverlay(data) { console.log(data); },

```

####checkPerson选择人员使用方法
```brash
<!-- 打开页面传参说明 -->
	userInfo:{ 
		"employeeId": "A9C0B502210946C5BD52494CD5442492",
		"userId": "AEEEE802803749E1841C857240F0C3B5",
		"employeeName": "毛嘉杰",
		"account": "maojiajie",
		"shortSpell": "mjj",
		"fullSpell": "maojiajie",
		"orgId": "1589BAA87C11BD64E053380F0A0A54B2",
		"orgName": "广州天河供电局",
		"nameFullPath": "中国南方电网有限责任公司/广州供电局有限公司/广州天河供电局",
		"orgCode": "080020",
		"sapHROrgId": "8816B370FB4A0B82E0440018FE2DCEF4",
		"orgStructureId": "A",
		"unitOid": "1589BAA87C11BD64E053380F0A0A54B2",
		"unitOname": "广州天河供电局",
		"unitCode": "030120",
		"shortOrgName": "天河"
	}
	obj:{
		name: 'checkPerson',//选择人员页面名
		query: {
			type: 1,//单选或多选；1：单选；2：多选
			userInfo: this.userInfo,//当前登录人信息
			exeMun: ''//跨页面方法名，自定义（需要在接收页面挂载）
		}
	}

```