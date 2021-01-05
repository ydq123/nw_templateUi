//内外网切换 
//3.0 2D版地图
// const layerConfig = {
//     'standard':{
//         "url":'minemap://service/solu/style/id/4744'
//     },
//     'light':{
//         "url":'minemap://service/solu/style/id/4753'
//     },
//     'dark':{
//         "url":'minemap://service/solu/style/id/4738'
//     },
//     'satellite':{
//         "url":'minemap://service/solu/style/id/4742'
//     },
//     'raster':{
//         "url":'minemap://service/solu/style/id/4750'
//     }
// }
// 3.1.2地图服务
const layerConfig = {
    // 'standard': {
    //     "url": 'minemap://service/solu/style/id/12727'
    // },
    // 'standard': {
    //     "url": 'minemap://service/solu/style/id/12762'  //灰色版
    // },
    // 'standard': {
    //     "url": 'minemap://service/solu/style/id/12657'  //灰色版
    // },
    'standard': {
        "url": 'minemap://service/solu/style/id/vector' //灰色版
    },
    'standard-night': {
        "url": 'minemap://service/solu/style/id/vector!dark@dw' // 黑夜
    },
    // 'satellite': {
    //     "url": 'minemap://service/solu/style/id/12654'
    // },
    // 'satellite': {
    //     // "url": 'minemap://service/solu/style/id/12656' //影像12687
    //     "url": 'minemap://service/solu/style/id/12687' //影像
    // },
    'satellite': {
        // "url": 'minemap://service/solu/style/id/12656' //影像12687
        "url": 'minemap://service/solu/style/id/satellite' //影像
    },
    // 'raster': {
    //     "url": 'minemap://service/solu/style/id/12729'  //栅格
    // }
    // 'raster': {
    //     "url": 'minemap://service/solu/style/id/12658'  //栅格
    // }
    'raster': {
        "url": 'minemap://service/solu/style/id/raster' //栅格
    }
}

const layerConfigOnline = {
    'standard': {
        "url": 'mapbox://styles/mapbox/outdoors-v10'
    },
    'light': {
        "url": 'mapbox://styles/mapbox/light-v9 '
    },
    'dark': {
        "url": 'mapbox://styles/mapbox/dark-v9'
    },
    'satellite': {
        "url": 'mapbox://styles/mapbox/satellite-streets-v10'
    },
    'raster': {
        "url": 'mapbox://styles/mapbox/satellite-v9'
    }
}

export function getLayerConfig(value) {
    if (value == true) {
        return layerConfigOnline
    } else {
        return layerConfig
    }
}