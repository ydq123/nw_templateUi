const mapCenter = {
  guangzhou: [113.26388, 23.12946], // 广州
  hainan: [113.5067379, 22.771645], // 海南
  mingzhu: [110.3386641, 20.03184008] // 明珠广场
}

const mapStyle = {
  online: {
    'standard': 'mapbox://styles/mapbox/outdoors-v10',
    'light': 'mapbox://styles/mapbox/light-v9 ',
    'dark': 'mapbox://styles/mapbox/dark-v9',
    'satellite': 'mapbox://styles/mapbox/satellite-streets-v10',
    'raster': 'mapbox://styles/mapbox/satellite-v9'
  },
  offline: {
    'standard': 'minemap://service/solu/style/id/vector', // 灰色版
    // standard: 'http://172.16.69.86:7003/psrassets/massets/style_basic.json', // 修改地图的默认 style
    'standard-night': 'minemap://service/solu/style/id/vector!dark@dw', // 黑夜
    'satellite': 'minemap://service/solu/style/id/satellite', // 影像12687 'minemap://service/solu/style/id/12656'
    'raster': 'minemap://service/solu/style/id/raster' // 栅格
  }
}

// 版本更新
export const copyRight = 'Copyright © 2020/7/6 nanfdwxxxx.com.'
export const currentVersionAPI = 'http://172.16.119.79:9040/appversioninfo/current'
export const updateRecordAPI = 'http://172.16.119.79:9040/appversioninfo/history?page_size=10&page_num=1'
export const updateApkUrl = 'http://192.168.43.2:7087/apk/app.apk' // apk 在服务端的位置
export const apkPosition = 'cdvfile://localhost/temporary/tuner.apk' // apk 下载到手机的位置

// 加载在线配置
// 是否开启加载在线配置
export const isloadOnline = false
// 外网在线配置服务地址
export const onlineConfigUrlWw = 'https://app.csg.cn:7553/tydt/gate/proxy/styleconf/nwgd-zb-idc.json'
// 内网在线配置服务地址
export const onlineConfigUrlNw = 'http://172.16.119.79:9040/styleconf/nwgd-test.json'

export default {
  bounds: [113.26388, 23.12946, 113.47388, 23.23946], // 初始化通过四个点进行范围定位，覆盖center与zoom
  fullExtent: {
    xmin: 105.992204,
    ymin: 36.979711,
    xmax: 109.5338915,
    ymax: 39.543712
  },
  isOnline: false,
  mapCenter: mapCenter.hainan, // 默认的地图中心点
  style: mapStyle,
  mapZoom: 11,
  strategy: ['mapboxgl', 'openlayers', 'leaflet'],

  service: 'http://172.16.119.79:9040/',
  guid: '9d7450722a8448d6b9087f68e2444ebf',

  trafficStyle: './style/trafficStyle.json',
  trafficSource(date) {
    return 'http://10.92.224.55/dynamicdata/Trafficrtic/{z}/{x}/{y}/' + date + '?appKey=68f554eb34064b84b4b9f797211c26f4&solu=12710'
  }
}
