# nw-template-ui

> 南网秘密小组件库

# 项目目录
``` bash
.
├── dist                         # 压缩后文件目录
├── site                         # 项目结构目录
│   ├── App.vue                  # 单页应用父组件          
│   └── main.js                  # 单页应用启动入口文件
├── src                           # 开发目录
│   ├── assets                    # 静态文件：scss/image
│   ├── components                # 存放共用组件库
│   ├── index.js                  # 全局注册组件插件
│   └── style.js                  # 导入scss
├── index.html
├── package.json                  # 依赖管理
├── webpack.dev.js                #项目启动配置文件：npm run dev
├── webpack.config.js             #项目打包配置文件：npm run build
└── README.md                     #README
```

# Usage

## Install dependencies

```bash
  npm install
```
## Serve with hot reload at localhost:8080

```bash
  npm run dev
```

> 发布新版本时，执行打包压缩

## Build for production with minification

```bash
  npm run build
```

## uploader附件上传组件重点解释
### 必传参数分别有	baseUrl: "", proxyUrl: "", proxyIp: "", accessToken: "", lookFileArr2: [], fileInfo: {}
### baseUrl为真实开发ip地址，即为build上线后使用的地址，与下面代理地址、代理ip不可共存。开发时此参数传空。
### proxyUrl为开发环境代理地址,非IP，代理例如('/api')，目的是方便在本地开发时可以配置使用；
### proxyIp为开发环境代理地址（IP），光有代理地址没有真实ip不行（上传附件需要用到）；
