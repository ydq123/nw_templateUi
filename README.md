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
  <nw-FixedHeader>
    <div slot="default">
      <div class="header">
        <div class="left-btn">取消222</div>
        <div class="header-txt">标题标题222</div>
        <div class="right-content">4526</div>
      </div>
    </div>
  </nw-FixedHeader>
<!-- 第二种--使用示例如下 title传进来，自己定义left和right内容，也可以不传，有默认内容 自个斟酌-->
  <nw-FixedHeader title="徐徐噶">
    <div slot="left"><i class="pl10 iconfont icon-huitui"></i></div>
    <div slot="right"><i class="pr10 iconfont icon-qianjin"></i></div>
  </nw-FixedHeader>
```

