import request from './nw_request.js';
// 请求头
const myQqt1 = window.NW_BASEURL || window.NW_PROXYURL || '/moduleIp'; //隐患-自定义请求头-本地开发写法

//变电站
export function querySubstationList(params) {

  return new Promise(function(resolve, reject) {
    //做一些异步操作
    setTimeout(function() {
      var obj = {
        "msg": "操作成功",
        "total": 10,
        "code": 200,
        "rows": [{
            "_id": null,
            "actionType": null,
            "idList": null,
            "pageNo": 1,
            "pageSize": 20,
            "sortFieldName": null,
            "sortType": "",
            "primaryName": "ID",
            "sortNames": [],
            "sortTypes": [],
            "sortFields": [],
            "id": "64f0b7b9aff34a63943a73b87be1f908",
            "dataFrom": "更新变电站容量台数等信息",
            "operationFlag": null,
            "logTrajectoryDescribe": null,
            "provinceCode": "08",
            "bureauCode": "0800",
            "optimisticLockVersion": "3",
            "outputCount": null,
            "inputCount": null,
            "transformerCapacity": 126,
            "transformerNumber": 2,
            "type": "变电站",
            "subType": "组合电器式",
            "centerSubstationId": "08000000000033",
            "centerSubstationName": "500kV增城巡维中心",
            "address": "广州市增城区东进东路8号之55",
            "designedCompany": "广州市电力工程设计院有限公司",
            "builderCompany": null,
            "proprietorCompanyOname": "广州供电局有限公司",
            "proprietorCompanyOid": "1589BAA876FDBD64E053380F0A0A54B2",
            "dirtinessAreaLevel": "e",
            "controlType": null,
            "ownerArea": null,
            "controlCenter": null,
            "dutyType": "无人值守",
            "electricalInstalCompany": "广州电力建设有限公司",
            "connectionMode": "线变组接线",
            "outletCount500kv": 0,
            "outletCount220kv": 0,
            "outletCount110kv": 2,
            "outletCount35kv": 0,
            "outletCount20kv": 0,
            "outletCount10kv": 30,
            "capacitorCompensateCapacity": null,
            "reactorRc": 0,
            "communicationsOverlay": "0",
            "coastalAltitude": 0,
            "seismicIntensity": "Ⅵ",
            "capacityConstitute": null,
            "marketingNumber": null,
            "busSection": 0,
            "intervalNums": 0,
            "mainnetCode": null,
            "mainnetId": null,
            "runmanageDepId": null,
            "isRing": null,
            "contactPerso": null,
            "contactPhone": null,
            "powerLine": null,
            "alternateLine": null,
            "windSppedThirtyYear": null,
            "windSppedFiftyYear": "35m/s",
            "cloudToGroundFalsh": null,
            "thunderRiskGrade": "Ⅱ",
            "iceClassification": "无冰区",
            "floodHundredYear": 8,
            "floodHighedt": 10,
            "siteDesign": 18.3,
            "outletSpecialUserCount": 0,
            "outletOneLevelUserCount": 0,
            "outletTwoLevelUserCount": 0,
            "voltagePageShow": "110kV",
            "nominalVoltage": "110000",
            "bureauName": "广州供电局",
            "runmanageOid": null,
            "runmanageOname": null,
            "vindicateOid": "1589BAA87A27BD64E053380F0A0A54B2",
            "vindicateOname": "500kV增城巡维中心",
            "plantTransferDate": 1514563100000,
            "runningState": "运行",
            "flName": "110kV群星站",
            "flCode": null,
            "runningCode": null,
            "longitude": 113.5905555556,
            "latitude": 23.1322222222,
            "dominionMode": "直管",
            "fullPath": "广东电网公司/茂名供电局/变电设施/220***",
            "updateTime": 1565065544000,
            "primaryValue": "64f0b7b9aff34a63943a73b87be1f908"
          },
          {
            "_id": null,
            "actionType": null,
            "idList": null,
            "pageNo": 1,
            "pageSize": 20,
            "sortFieldName": null,
            "sortType": "",
            "primaryName": "ID",
            "sortNames": [],
            "sortTypes": [],
            "sortFields": [],
            "id": "08002144720619",
            "dataFrom": "更新变电站容量台数等信息",
            "operationFlag": null,
            "logTrajectoryDescribe": null,
            "provinceCode": "08",
            "bureauCode": "0800",
            "optimisticLockVersion": "1",
            "outputCount": null,
            "inputCount": null,
            "transformerCapacity": 126,
            "transformerNumber": 2,
            "type": "变电站",
            "subType": "组合电器式",
            "centerSubstationId": "08000000000033",
            "centerSubstationName": "500kV增城巡维中心",
            "address": "广州市黄埔区兴诚路（兴诚路与恒达路交界）",
            "designedCompany": "广州电力设计院",
            "builderCompany": "新疆维吾尔自治区送变电工程公司",
            "proprietorCompanyOname": "广州供电局有限公司",
            "proprietorCompanyOid": "1010107739",
            "dirtinessAreaLevel": "d",
            "controlType": "遥控",
            "ownerArea": 8000,
            "controlCenter": "区控",
            "dutyType": "无人值守",
            "electricalInstalCompany": "新疆维吾尔自治区送变电工程公司",
            "connectionMode": "线变组接线",
            "outletCount500kv": 0,
            "outletCount220kv": 0,
            "outletCount110kv": 2,
            "outletCount35kv": 0,
            "outletCount20kv": 0,
            "outletCount10kv": 30,
            "capacitorCompensateCapacity": null,
            "reactorRc": 0,
            "communicationsOverlay": "0",
            "coastalAltitude": null,
            "seismicIntensity": "Ⅴ",
            "capacityConstitute": null,
            "marketingNumber": null,
            "busSection": 0,
            "intervalNums": 0,
            "mainnetCode": null,
            "mainnetId": null,
            "runmanageDepId": null,
            "isRing": null,
            "contactPerso": null,
            "contactPhone": null,
            "powerLine": null,
            "alternateLine": null,
            "windSppedThirtyYear": null,
            "windSppedFiftyYear": null,
            "cloudToGroundFalsh": null,
            "thunderRiskGrade": null,
            "iceClassification": "无冰区",
            "floodHundredYear": 1,
            "floodHighedt": 1,
            "siteDesign": 0,
            "outletSpecialUserCount": null,
            "outletOneLevelUserCount": null,
            "outletTwoLevelUserCount": null,
            "voltagePageShow": "110kV",
            "nominalVoltage": "110000",
            "bureauName": "广州供电局",
            "runmanageOid": "1589BAA87C04BD64E053380F0A0A54B2",
            "runmanageOname": "变电管理一所",
            "vindicateOid": "1589BAA87A27BD64E053380F0A0A54B2",
            "vindicateOname": "500kV增城巡维中心",
            "plantTransferDate": 1449936000000,
            "runningState": "运行",
            "flName": "110kV荔联站",
            "flCode": "08-00-B-11000268",
            "runningCode": null,
            "longitude": 113.5333333333,
            "latitude": 23.1166666667,
            "dominionMode": "直管",
            "fullPath": "广东电网公司/茂名供电局/变电设施/220***",
            "updateTime": 1559037694000,
            "primaryValue": "08002144720619"
          },
          {
            "_id": null,
            "actionType": null,
            "idList": null,
            "pageNo": 1,
            "pageSize": 20,
            "sortFieldName": null,
            "sortType": "",
            "primaryName": "ID",
            "sortNames": [],
            "sortTypes": [],
            "sortFields": [],
            "id": "08002144473987",
            "dataFrom": "更新变电站容量台数等信息",
            "operationFlag": null,
            "logTrajectoryDescribe": null,
            "provinceCode": "08",
            "bureauCode": "0800",
            "optimisticLockVersion": "3",
            "outputCount": null,
            "inputCount": null,
            "transformerCapacity": 126,
            "transformerNumber": 2,
            "type": "变电站",
            "subType": "组合电器式",
            "centerSubstationId": "08000000000033",
            "centerSubstationName": "500kV增城巡维中心",
            "address": "广州市黄埔区骏丰路",
            "designedCompany": "广州电力设计院",
            "builderCompany": "广东省输变电工程公司",
            "proprietorCompanyOname": "广州供电局有限公司",
            "proprietorCompanyOid": "1010107739",
            "dirtinessAreaLevel": "d",
            "controlType": "遥控",
            "ownerArea": 8000,
            "controlCenter": "区控",
            "dutyType": "无人值守",
            "electricalInstalCompany": "广东省输变电工程公司",
            "connectionMode": "线变组接线",
            "outletCount500kv": 0,
            "outletCount220kv": 0,
            "outletCount110kv": 2,
            "outletCount35kv": 0,
            "outletCount20kv": 0,
            "outletCount10kv": 30,
            "capacitorCompensateCapacity": null,
            "reactorRc": 0,
            "communicationsOverlay": "0",
            "coastalAltitude": null,
            "seismicIntensity": "Ⅴ",
            "capacityConstitute": null,
            "marketingNumber": null,
            "busSection": 0,
            "intervalNums": 0,
            "mainnetCode": null,
            "mainnetId": null,
            "runmanageDepId": null,
            "isRing": null,
            "contactPerso": null,
            "contactPhone": null,
            "powerLine": null,
            "alternateLine": null,
            "windSppedThirtyYear": "33m/s",
            "windSppedFiftyYear": "33m/s",
            "cloudToGroundFalsh": "B2",
            "thunderRiskGrade": "Ⅲ",
            "iceClassification": "无冰区",
            "floodHundredYear": 1,
            "floodHighedt": 1,
            "siteDesign": 0,
            "outletSpecialUserCount": null,
            "outletOneLevelUserCount": null,
            "outletTwoLevelUserCount": null,
            "voltagePageShow": "110kV",
            "nominalVoltage": "110000",
            "bureauName": "广州供电局",
            "runmanageOid": "1589BAA87C04BD64E053380F0A0A54B2",
            "runmanageOname": "变电管理一所",
            "vindicateOid": "1589BAA87A27BD64E053380F0A0A54B2",
            "vindicateOname": "500kV增城巡维中心",
            "plantTransferDate": 1450627100000,
            "runningState": "运行",
            "flName": "110kV榕村站",
            "flCode": "08-00-B-11000269",
            "runningCode": null,
            "longitude": 113.5477777778,
            "latitude": 23.0972222222,
            "dominionMode": "直管",
            "fullPath": "广东电网公司/茂名供电局/变电设施/220***",
            "updateTime": 1563325213000,
            "primaryValue": "08002144473987"
          },
          {
            "_id": null,
            "actionType": null,
            "idList": null,
            "pageNo": 1,
            "pageSize": 20,
            "sortFieldName": null,
            "sortType": "",
            "primaryName": "ID",
            "sortNames": [],
            "sortTypes": [],
            "sortFields": [],
            "id": "08002144692963",
            "dataFrom": "更新变电站容量台数等信息",
            "operationFlag": null,
            "logTrajectoryDescribe": null,
            "provinceCode": "08",
            "bureauCode": "0800",
            "optimisticLockVersion": "1",
            "outputCount": null,
            "inputCount": null,
            "transformerCapacity": 126,
            "transformerNumber": 2,
            "type": "变电站",
            "subType": "组合电器式",
            "centerSubstationId": "08000000000033",
            "centerSubstationName": "500kV增城巡维中心",
            "address": "广州市黄埔区刘村路",
            "designedCompany": "广州电力设计院",
            "builderCompany": "广州电力设计院",
            "proprietorCompanyOname": "广州供电局有限公司",
            "proprietorCompanyOid": "1010107739",
            "dirtinessAreaLevel": "d",
            "controlType": "遥控",
            "ownerArea": 8000,
            "controlCenter": "区控",
            "dutyType": "无人值守",
            "electricalInstalCompany": "广州市电力工程有限公司",
            "connectionMode": "线变组接线",
            "outletCount500kv": 0,
            "outletCount220kv": 0,
            "outletCount110kv": 2,
            "outletCount35kv": 0,
            "outletCount20kv": 0,
            "outletCount10kv": 30,
            "capacitorCompensateCapacity": null,
            "reactorRc": 0,
            "communicationsOverlay": "0",
            "coastalAltitude": null,
            "seismicIntensity": "Ⅴ",
            "capacityConstitute": null,
            "marketingNumber": null,
            "busSection": 0,
            "intervalNums": 0,
            "mainnetCode": null,
            "mainnetId": null,
            "runmanageDepId": null,
            "isRing": null,
            "contactPerso": null,
            "contactPhone": null,
            "powerLine": null,
            "alternateLine": null,
            "windSppedThirtyYear": null,
            "windSppedFiftyYear": null,
            "cloudToGroundFalsh": null,
            "thunderRiskGrade": null,
            "iceClassification": "无冰区",
            "floodHundredYear": 1,
            "floodHighedt": 1,
            "siteDesign": 0,
            "outletSpecialUserCount": null,
            "outletOneLevelUserCount": null,
            "outletTwoLevelUserCount": null,
            "voltagePageShow": "110kV",
            "nominalVoltage": "110000",
            "bureauName": "广州供电局",
            "runmanageOid": "1589BAA87C04BD64E053380F0A0A54B2",
            "runmanageOname": "变电管理一所",
            "vindicateOid": "1589BAA87A27BD64E053380F0A0A54B2",
            "vindicateOname": "500kV增城巡维中心",
            "plantTransferDate": 1418572800000,
            "runningState": "运行",
            "flName": "110kV斗园站",
            "flCode": "08-00-B-11000267",
            "runningCode": null,
            "longitude": 113.5166666667,
            "latitude": 23.15,
            "dominionMode": "直管",
            "fullPath": "广东电网公司/茂名供电局/变电设施/220***",
            "updateTime": 1563264881000,
            "primaryValue": "08002144692963"
          },
          {
            "_id": null,
            "actionType": null,
            "idList": null,
            "pageNo": 1,
            "pageSize": 20,
            "sortFieldName": null,
            "sortType": "",
            "primaryName": "ID",
            "sortNames": [],
            "sortTypes": [],
            "sortFields": [],
            "id": "08000000360302",
            "dataFrom": "更新变电站容量台数等信息",
            "operationFlag": null,
            "logTrajectoryDescribe": null,
            "provinceCode": "08",
            "bureauCode": "0800",
            "optimisticLockVersion": "0",
            "outputCount": null,
            "inputCount": null,
            "transformerCapacity": 120,
            "transformerNumber": 3,
            "type": "变电站",
            "subType": "敞开式",
            "centerSubstationId": "08000000000033",
            "centerSubstationName": "500kV增城巡维中心",
            "address": "广州技术开发区东区罗南大道",
            "designedCompany": "广州市电力工程设计院有限公司",
            "builderCompany": null,
            "proprietorCompanyOname": "广州供电局有限公司",
            "proprietorCompanyOid": "1010107739",
            "dirtinessAreaLevel": "c",
            "controlType": "遥测",
            "ownerArea": 8000,
            "controlCenter": "监控中心",
            "dutyType": "无人值守",
            "electricalInstalCompany": "广州南方电力建设集团有限公司",
            "connectionMode": "线变组接线",
            "outletCount500kv": 0,
            "outletCount220kv": 0,
            "outletCount110kv": 3,
            "outletCount35kv": 0,
            "outletCount20kv": 0,
            "outletCount10kv": 42,
            "capacitorCompensateCapacity": null,
            "reactorRc": 0,
            "communicationsOverlay": null,
            "coastalAltitude": null,
            "seismicIntensity": "Ⅴ",
            "capacityConstitute": null,
            "marketingNumber": null,
            "busSection": null,
            "intervalNums": null,
            "mainnetCode": null,
            "mainnetId": null,
            "runmanageDepId": null,
            "isRing": null,
            "contactPerso": null,
            "contactPhone": null,
            "powerLine": null,
            "alternateLine": null,
            "windSppedThirtyYear": null,
            "windSppedFiftyYear": null,
            "cloudToGroundFalsh": null,
            "thunderRiskGrade": null,
            "iceClassification": "无冰区",
            "floodHundredYear": 1,
            "floodHighedt": 1,
            "siteDesign": 0,
            "outletSpecialUserCount": null,
            "outletOneLevelUserCount": null,
            "outletTwoLevelUserCount": null,
            "voltagePageShow": "110kV",
            "nominalVoltage": "110000",
            "bureauName": "广州供电局",
            "runmanageOid": "1589BAA87C04BD64E053380F0A0A54B2",
            "runmanageOname": "变电管理一所",
            "vindicateOid": "1589BAA87A27BD64E053380F0A0A54B2",
            "vindicateOname": "500kV增城巡维中心",
            "plantTransferDate": 943286400000,
            "runningState": "运行",
            "flName": "110kV荷村站",
            "flCode": "08-00-B-11000222",
            "runningCode": null,
            "longitude": 113.525376972222,
            "latitude": 23.140905625000002,
            "dominionMode": "直管",
            "fullPath": "广东电网公司/茂名供电局/变电设施/220***",
            "updateTime": 1563325213000,
            "primaryValue": "08000000360302"
          }
        ],
        "timestamp": 1611892221438
      }
      resolve(obj);
    }, 1000);
  });


  return request({
    baseURL: myQqt1,
    url: '/api/web/transform/querySubstationList',
    method: 'post',
    headers: {},
    data: params
  })
}
/* 查询变电站电压等级*/
export function querySubstationGroupByVoltage(params) {
  return new Promise(function(resolve, reject) {
    //做一些异步操作
    setTimeout(function() {
      var obj = {
        "msg": "操作成功",
        "code": 200,
        "data": [{
            "baseVoltageId": "298",
            "voltagePageShow": "110kV"
          },
          {
            "baseVoltageId": "318",
            "voltagePageShow": "500kV"
          },
          {
            "baseVoltageId": "306",
            "voltagePageShow": "220kV"
          }
        ],
        "timestamp": 1611900468475
      }
      resolve(obj);
    }, 1000);
  });


  return request({
    baseURL: myQqt1,
    url: '/api/web/transform/querySubstationGroupByVoltage',
    method: 'post',
    headers: {},
    data: params
  })
}

// 获取功能位置接口
export function querySubsIntervalById(params) {

  return new Promise(function(resolve, reject) {
    //做一些异步操作
    setTimeout(function() {
      var obj = {
        "msg": "操作成功",
        "code": 200,
        "data": [{
            "intervalId": null,
            "intervalName": "主变区域",
            "childrenIntervals": [{
              "intervalId": null,
              "intervalName": null,
              "childrenIntervals": [{
                  "intervalId": "08000000594293",
                  "intervalName": "#3主变间隔",
                  "childrenIntervals": null
                },
                {
                  "intervalId": "08000000594289",
                  "intervalName": "#1主变间隔",
                  "childrenIntervals": null
                },
                {
                  "intervalId": "08000000594291",
                  "intervalName": "#2主变间隔",
                  "childrenIntervals": null
                }
              ]
            }]
          },
          {
            "intervalId": null,
            "intervalName": "220kV电压等级区域",
            "childrenIntervals": [{
                "intervalId": "08000000595601",
                "intervalName": "220kV母线",
                "childrenIntervals": [{
                    "intervalId": "08000000595623",
                    "intervalName": "220kV1M母线间隔",
                    "childrenIntervals": null
                  },
                  {
                    "intervalId": "08000000595625",
                    "intervalName": "220kV2M母线间隔",
                    "childrenIntervals": null
                  },
                  {
                    "intervalId": "08000000595627",
                    "intervalName": "220kV3M母线间隔",
                    "childrenIntervals": null
                  }
                ]
              },
              {
                "intervalId": null,
                "intervalName": "主变开关",
                "childrenIntervals": [{
                    "intervalId": "08000000595603",
                    "intervalName": "#1主变变高2201",
                    "childrenIntervals": null
                  },
                  {
                    "intervalId": "08000000595605",
                    "intervalName": "#2主变变高2202",
                    "childrenIntervals": null
                  },
                  {
                    "intervalId": "08000000595607",
                    "intervalName": "#3主变变高2203",
                    "childrenIntervals": null
                  }
                ]
              },
              {
                "intervalId": null,
                "intervalName": "220kV线路",
                "childrenIntervals": [{
                    "intervalId": "08000000595609",
                    "intervalName": "木碧甲线9110间隔",
                    "childrenIntervals": null
                  },
                  {
                    "intervalId": "08000000595611",
                    "intervalName": "木碧乙线9111间隔",
                    "childrenIntervals": null
                  },
                  {
                    "intervalId": "08000000595613",
                    "intervalName": "黄碧甲线2252间隔",
                    "childrenIntervals": null
                  },
                  {
                    "intervalId": "08000000595615",
                    "intervalName": "黄碧乙线2279间隔",
                    "childrenIntervals": null
                  },
                  {
                    "intervalId": "08000000595617",
                    "intervalName": "碧炼乙线2943间隔",
                    "childrenIntervals": null
                  },
                  {
                    "intervalId": "08000006363871",
                    "intervalName": "碧炼甲线2942间隔",
                    "childrenIntervals": null
                  }
                ]
              },
              {
                "intervalId": null,
                "intervalName": null,
                "childrenIntervals": [{
                    "intervalId": "08000000595619",
                    "intervalName": "母联2012间隔",
                    "childrenIntervals": null
                  },
                  {
                    "intervalId": "08000000595621",
                    "intervalName": "旁路2030间隔",
                    "childrenIntervals": null
                  }
                ]
              }
            ]
          },
          {
            "intervalId": null,
            "intervalName": "110kV电压等级区域",
            "childrenIntervals": [{
                "intervalId": "08000000600723",
                "intervalName": "110kV母线",
                "childrenIntervals": [{
                    "intervalId": "08000000600749",
                    "intervalName": "110kV1M母线间隔",
                    "childrenIntervals": null
                  },
                  {
                    "intervalId": "08000000600751",
                    "intervalName": "110kV2M母线间隔",
                    "childrenIntervals": null
                  },
                  {
                    "intervalId": "08000005979701",
                    "intervalName": "110kV6M母线间隔",
                    "childrenIntervals": null
                  }
                ]
              },
              {
                "intervalId": null,
                "intervalName": "主变开关",
                "childrenIntervals": [{
                    "intervalId": "08000000600725",
                    "intervalName": "#1主变变中101",
                    "childrenIntervals": null
                  },
                  {
                    "intervalId": "08000000600727",
                    "intervalName": "#2主变变中102",
                    "childrenIntervals": null
                  },
                  {
                    "intervalId": "08000000600729",
                    "intervalName": "#3主变变中103",
                    "childrenIntervals": null
                  }
                ]
              },
              {
                "intervalId": null,
                "intervalName": "110kV线路",
                "childrenIntervals": [{
                    "intervalId": "08000000600735",
                    "intervalName": "碧圃奥氮线123间隔",
                    "childrenIntervals": null
                  },
                  {
                    "intervalId": "08000000600737",
                    "intervalName": "碧加南科甲线124间隔",
                    "childrenIntervals": null
                  },
                  {
                    "intervalId": "08000000600739",
                    "intervalName": "碧圃奥丙线125间隔",
                    "childrenIntervals": null
                  },
                  {
                    "intervalId": "08000000600741",
                    "intervalName": "备用126间隔",
                    "childrenIntervals": null
                  },
                  {
                    "intervalId": "08000006027615",
                    "intervalName": "碧本线128间隔",
                    "childrenIntervals": null
                  },
                  {
                    "intervalId": "08000006035521",
                    "intervalName": "碧沦线130间隔",
                    "childrenIntervals": null
                  },
                  {
                    "intervalId": "08000006197262",
                    "intervalName": "碧圃奥乙线131间隔",
                    "childrenIntervals": null
                  },
                  {
                    "intervalId": "08000006197418",
                    "intervalName": "碧文线132间隔",
                    "childrenIntervals": null
                  },
                  {
                    "intervalId": "08000006197570",
                    "intervalName": "碧加南科乙线133间隔",
                    "childrenIntervals": null
                  },
                  {
                    "intervalId": "08000006236551",
                    "intervalName": "备用134间隔",
                    "childrenIntervals": null
                  },
                  {
                    "intervalId": "08000014977725",
                    "intervalName": "备用127间隔",
                    "childrenIntervals": null
                  },
                  {
                    "intervalId": "08000014978007",
                    "intervalName": "备用129间隔",
                    "childrenIntervals": null
                  }
                ]
              },
              {
                "intervalId": null,
                "intervalName": null,
                "childrenIntervals": [{
                    "intervalId": "08000000600745",
                    "intervalName": "1M-6M母联100A开关间隔",
                    "childrenIntervals": null
                  },
                  {
                    "intervalId": "08000006004901",
                    "intervalName": "2M-6M分段100B开关间隔",
                    "childrenIntervals": null
                  }
                ]
              }
            ]
          },
          {
            "intervalId": null,
            "intervalName": "10kV电压等级区域",
            "childrenIntervals": [{
                "intervalId": null,
                "intervalName": "主变开关",
                "childrenIntervals": [{
                    "intervalId": "08000004036207",
                    "intervalName": "#3主变变低503A间隔",
                    "childrenIntervals": null
                  },
                  {
                    "intervalId": "08000004036297",
                    "intervalName": "#3主变变低503B间隔",
                    "childrenIntervals": null
                  },
                  {
                    "intervalId": "08000004036777",
                    "intervalName": "#1主变变低501A间隔",
                    "childrenIntervals": null
                  },
                  {
                    "intervalId": "08000004036857",
                    "intervalName": "#1主变变低501B间隔",
                    "childrenIntervals": null
                  },
                  {
                    "intervalId": "08000004036945",
                    "intervalName": "#2主变变低502A间隔",
                    "childrenIntervals": null
                  },
                  {
                    "intervalId": "08000004037049",
                    "intervalName": "#2主变变低502B间隔",
                    "childrenIntervals": null
                  }
                ]
              },
              {
                "intervalId": null,
                "intervalName": null,
                "childrenIntervals": [{
                    "intervalId": "08000004037223",
                    "intervalName": "母联500A甲间隔",
                    "childrenIntervals": null
                  },
                  {
                    "intervalId": "08000004037293",
                    "intervalName": "母联500B甲间隔",
                    "childrenIntervals": null
                  },
                  {
                    "intervalId": "08000004037363",
                    "intervalName": "母联500A乙间隔",
                    "childrenIntervals": null
                  },
                  {
                    "intervalId": "08000004037419",
                    "intervalName": "母联500B乙间隔",
                    "childrenIntervals": null
                  }
                ]
              }
            ]
          },
          {
            "intervalId": null,
            "intervalName": "公用设施",
            "childrenIntervals": [{
              "intervalId": null,
              "intervalName": null,
              "childrenIntervals": [{
                  "intervalId": "08000000604939",
                  "intervalName": "在线监测系统",
                  "childrenIntervals": null
                },
                {
                  "intervalId": "08000000604959",
                  "intervalName": "桥吊系统",
                  "childrenIntervals": null
                },
                {
                  "intervalId": "08000000604957",
                  "intervalName": "变电站视频及环境监控系统",
                  "childrenIntervals": null
                },
                {
                  "intervalId": "08002110860804",
                  "intervalName": "全站资产",
                  "childrenIntervals": null
                },
                {
                  "intervalId": "08000000604947",
                  "intervalName": "时间同步系统",
                  "childrenIntervals": null
                },
                {
                  "intervalId": "08000008076713",
                  "intervalName": "电能采集系统",
                  "childrenIntervals": null
                },
                {
                  "intervalId": "08000000604963",
                  "intervalName": "防小动物设施",
                  "childrenIntervals": null
                },
                {
                  "intervalId": "08000000604941",
                  "intervalName": "接地系统",
                  "childrenIntervals": null
                },
                {
                  "intervalId": "08000000604949",
                  "intervalName": "暖通系统",
                  "childrenIntervals": null
                },
                {
                  "intervalId": "08000000604927",
                  "intervalName": "交流不间断电源系统",
                  "childrenIntervals": null
                },
                {
                  "intervalId": "08000000604953",
                  "intervalName": "消防系统",
                  "childrenIntervals": null
                },
                {
                  "intervalId": "08002144651407",
                  "intervalName": "电能质量监测站端系统",
                  "childrenIntervals": null
                },
                {
                  "intervalId": "08000000604955",
                  "intervalName": "照明动力系统",
                  "childrenIntervals": null
                },
                {
                  "intervalId": "08000000604961",
                  "intervalName": "建构筑物",
                  "childrenIntervals": null
                },
                {
                  "intervalId": "08000000604951",
                  "intervalName": "给排水系统",
                  "childrenIntervals": null
                },
                {
                  "intervalId": "08000000604937",
                  "intervalName": "公用保护系统",
                  "childrenIntervals": null
                },
                {
                  "intervalId": "08000000604925",
                  "intervalName": "站用交流电源系统",
                  "childrenIntervals": null
                },
                {
                  "intervalId": "08000000604945",
                  "intervalName": "五防系统",
                  "childrenIntervals": null
                },
                {
                  "intervalId": "08000000604923",
                  "intervalName": "站用直流电源系统",
                  "childrenIntervals": null
                },
                {
                  "intervalId": "08000000604943",
                  "intervalName": "防雷系统",
                  "childrenIntervals": null
                },
                {
                  "intervalId": "08000000604929",
                  "intervalName": "事故照明系统",
                  "childrenIntervals": null
                },
                {
                  "intervalId": "08000016153551",
                  "intervalName": "通信室",
                  "childrenIntervals": null
                },
                {
                  "intervalId": "08000007904279",
                  "intervalName": "变电站自动化系统",
                  "childrenIntervals": null
                },
                {
                  "intervalId": "08002110806646",
                  "intervalName": "通信设施",
                  "childrenIntervals": null
                }
              ]
            }]
          }
        ],
        "timestamp": 1611891774579
      }
      resolve(obj);
    }, 1000);
  });


  return request({
    baseURL: myQqt1,
    url: '/api/web/transform/querySubsIntervalById?substationId=' + params.id,
    method: 'get',
    headers: {},
    data: params
  })
}
/* 根据设备类型分组设备*/
export function groupByDeviceOnClassify(params) {

  return new Promise(function(resolve, reject) {
    //做一些异步操作
    setTimeout(function() {
      var obj = {
        "msg": "操作成功",
        "code": 200,
        "data": [{
            "classifyId": "13656",
            "classifyName": "变电金具",
            "deviceCount": 1
          },
          {
            "classifyId": "13363",
            "classifyName": "电容式电压互感器",
            "deviceCount": 1
          },
          {
            "classifyId": "13356",
            "classifyName": "地刀",
            "deviceCount": 1
          },
          {
            "classifyId": "13393",
            "classifyName": "独立式避雷器",
            "deviceCount": 3
          },
          {
            "classifyId": "13654",
            "classifyName": "间隔内联线",
            "deviceCount": 1
          }
        ],
        "timestamp": 1611900720547
      }
      resolve(obj);
    }, 1000);
  });



  return request({
    baseURL: myQqt1,
    url: '/api/web/transform/groupByDeviceOnClassify',
    method: 'post',
    headers: {},
    data: params
  })
}
/* 设备查询 api/web/transform/queryDeviceList*/
export function queryDeviceList(params) {


  return new Promise(function(resolve, reject) {
    //做一些异步操作
    setTimeout(function() {
      var obj = {
        "msg": "操作成功",
        "total": 7,
        "code": 200,
        "rows": [{
            "baseInfoData": {
              "_id": null,
              "actionType": null,
              "idList": null,
              "pageNo": 1,
              "pageSize": 20,
              "sortFieldName": null,
              "sortType": "",
              "primaryName": "ID",
              "sortNames": [],
              "sortTypes": [],
              "sortFields": [],
              "id": "08000015584185",
              "dataFrom": null,
              "operationFlag": null,
              "logTrajectoryDescribe": null,
              "provinceCode": "08",
              "bureauCode": "0800",
              "optimisticLockVersion": "0",
              "versionId": 0,
              "deviceCode": "08-00-Z-A217-0000000486",
              "deviceName": "C相避雷器",
              "classifyId": "13393",
              "plantTransferDate": 1198944000000,
              "assetState": "运行",
              "parentId": "08000015584179",
              "vendorId": "MT_42a407bddcec4bb3be5b",
              "vendor": "南阳金冠电气有限公司",
              "manufacturerId": "1500000007",
              "manufacturer": "南阳金冠电气有限公司",
              "latestManufacturer": "南阳金冠电气有限公司",
              "deviceModelId": null,
              "deviceModel": "Y10W-108/268W",
              "leaveFactoryNo": "66250",
              "leaveFactoryDate": 1191168000000,
              "proprietorCompanyOid": "1589BAA876FDBD64E053380F0A0A54B2",
              "proprietorCompanyOname": "广州供电局有限公司",
              "proprietorOwner": "局属资产",
              "statusDate": 1271347200000,
              "installationLocation": "110kV罗岗站",
              "measurementUnit": "只",
              "dispatchLevel": "中调",
              "isCapitalAssets": 1,
              "amount": 1,
              "warrantyPeriod": null,
              "runningCode": null,
              "longitude": 113.3030119139,
              "latitude": 23.1319906417,
              "altitude": null,
              "topography": null,
              "bureauUnitsOid": "1589BAA876FDBD64E053380F0A0A54B2",
              "baseVoltageId": 298,
              "dataSource": null,
              "isShareDevice": 2,
              "isAssambly": 2,
              "isLabel": 2,
              "retireDate": null,
              "isVirtualDevice": 2,
              "remark": " *",
              "inventorytaskno": null,
              "assetDeviceId": null,
              "financeAssetState": "使用中",
              "runPlace": null,
              "runmanageOwner": null,
              "installationOid": null,
              "updateTime": 1557488500000,
              "businessCode": null,
              "businessType": null,
              "classifyName": "独立式避雷器",
              "fullName": "变电设备/一次设备/独立式避雷器",
              "fullPath": "广州供电局有限公司/变电设施/变电一所/220kV碧山巡维中心/110kV罗岗站/110kV电压等级区域/华罗加水迁线间隔/避雷器/C相避雷器",
              "runmanageOid": "1589BAA87C04BD64E053380F0A0A54B2",
              "runmanageOname": "变电管理一所",
              "vindicateOid": "1589BAA87A23BD64E053380F0A0A54B2",
              "vindicateOname": "220kV碧山巡维中心站",
              "voltagePageShow": "110kV",
              "baseVoltageValue": null,
              "bureauUnitsName": null,
              "bureauRunmanageName": null,
              "imageUrl": null,
              "nodeId": "08000015584184",
              "parentFunctionLocationId": null,
              "primaryValue": "08000015584185"
            }
          },
          {
            "baseInfoData": {
              "_id": null,
              "actionType": null,
              "idList": null,
              "pageNo": 1,
              "pageSize": 20,
              "sortFieldName": null,
              "sortType": "",
              "primaryName": "ID",
              "sortNames": [],
              "sortTypes": [],
              "sortFields": [],
              "id": "08000015584183",
              "dataFrom": null,
              "operationFlag": null,
              "logTrajectoryDescribe": null,
              "provinceCode": "08",
              "bureauCode": "0800",
              "optimisticLockVersion": "0",
              "versionId": 0,
              "deviceCode": "08-00-Z-A217-0000000485",
              "deviceName": "B相避雷器",
              "classifyId": "13393",
              "plantTransferDate": 1198944000000,
              "assetState": "运行",
              "parentId": "08000015584179",
              "vendorId": "MT_42a407bddcec4bb3be5b",
              "vendor": "南阳金冠电气有限公司",
              "manufacturerId": "1500000007",
              "manufacturer": "南阳金冠电气有限公司",
              "latestManufacturer": "南阳金冠电气有限公司",
              "deviceModelId": null,
              "deviceModel": "Y10W-108/268W",
              "leaveFactoryNo": "66280",
              "leaveFactoryDate": 1191168000000,
              "proprietorCompanyOid": "1589BAA876FDBD64E053380F0A0A54B2",
              "proprietorCompanyOname": "广州供电局有限公司",
              "proprietorOwner": "局属资产",
              "statusDate": 1271347200000,
              "installationLocation": "110kV罗岗站",
              "measurementUnit": "只",
              "dispatchLevel": "中调",
              "isCapitalAssets": 1,
              "amount": 1,
              "warrantyPeriod": null,
              "runningCode": null,
              "longitude": 113.3030119139,
              "latitude": 23.1319906417,
              "altitude": null,
              "topography": null,
              "bureauUnitsOid": "1589BAA876FDBD64E053380F0A0A54B2",
              "baseVoltageId": 298,
              "dataSource": null,
              "isShareDevice": 2,
              "isAssambly": 2,
              "isLabel": 2,
              "retireDate": null,
              "isVirtualDevice": 2,
              "remark": " *",
              "inventorytaskno": null,
              "assetDeviceId": null,
              "financeAssetState": "使用中",
              "runPlace": null,
              "runmanageOwner": null,
              "installationOid": null,
              "updateTime": 1557488500000,
              "businessCode": null,
              "businessType": null,
              "classifyName": "独立式避雷器",
              "fullName": "变电设备/一次设备/独立式避雷器",
              "fullPath": "广州供电局有限公司/变电设施/变电一所/220kV碧山巡维中心/110kV罗岗站/110kV电压等级区域/华罗加水迁线间隔/避雷器/B相避雷器",
              "runmanageOid": "1589BAA87C04BD64E053380F0A0A54B2",
              "runmanageOname": "变电管理一所",
              "vindicateOid": "1589BAA87A23BD64E053380F0A0A54B2",
              "vindicateOname": "220kV碧山巡维中心站",
              "voltagePageShow": "110kV",
              "baseVoltageValue": null,
              "bureauUnitsName": null,
              "bureauRunmanageName": null,
              "imageUrl": null,
              "nodeId": "08000015584182",
              "parentFunctionLocationId": null,
              "primaryValue": "08000015584183"
            }
          },
          {
            "baseInfoData": {
              "_id": null,
              "actionType": null,
              "idList": null,
              "pageNo": 1,
              "pageSize": 20,
              "sortFieldName": null,
              "sortType": "",
              "primaryName": "ID",
              "sortNames": [],
              "sortTypes": [],
              "sortFields": [],
              "id": "08002143684482",
              "dataFrom": null,
              "operationFlag": null,
              "logTrajectoryDescribe": null,
              "provinceCode": "08",
              "bureauCode": "0800",
              "optimisticLockVersion": "0",
              "versionId": 0,
              "deviceCode": "08-00-Z-A189-0000001455",
              "deviceName": "电容式电压互感器",
              "classifyId": "13363",
              "plantTransferDate": 1198944000000,
              "assetState": "运行",
              "parentId": "08000000318493",
              "vendorId": "MT_ba4eabbd7e244d6dbd89",
              "vendor": "日新电机（无锡）有限公司",
              "manufacturerId": "1023",
              "manufacturer": "日新电机（无锡）有限公司",
              "latestManufacturer": "日新电机（无锡）有限公司",
              "deviceModelId": null,
              "deviceModel": "WVL110-10H",
              "leaveFactoryNo": "172194",
              "leaveFactoryDate": 1188576000000,
              "proprietorCompanyOid": "1589BAA876FDBD64E053380F0A0A54B2",
              "proprietorCompanyOname": "广州供电局有限公司",
              "proprietorOwner": "局属资产",
              "statusDate": 1265212800000,
              "installationLocation": "110kV罗岗站",
              "measurementUnit": "台",
              "dispatchLevel": "中调",
              "isCapitalAssets": 1,
              "amount": 1,
              "warrantyPeriod": null,
              "runningCode": null,
              "longitude": 113.3030119139,
              "latitude": 23.1319906417,
              "altitude": null,
              "topography": null,
              "bureauUnitsOid": "1589BAA876FDBD64E053380F0A0A54B2",
              "baseVoltageId": 298,
              "dataSource": null,
              "isShareDevice": 2,
              "isAssambly": 2,
              "isLabel": 2,
              "retireDate": null,
              "isVirtualDevice": 2,
              "remark": null,
              "inventorytaskno": null,
              "assetDeviceId": null,
              "financeAssetState": "使用中",
              "runPlace": null,
              "runmanageOwner": null,
              "installationOid": null,
              "updateTime": 1557488500000,
              "businessCode": null,
              "businessType": null,
              "classifyName": "电容式电压互感器",
              "fullName": "变电设备/一次设备/电压互感器/电容式电压互感器",
              "fullPath": "广州供电局有限公司/变电设施/变电一所/220kV碧山巡维中心/110kV罗岗站/110kV电压等级区域/华罗加水迁线间隔/线路电压互感器/电容式电压互感器",
              "runmanageOid": "1589BAA87C04BD64E053380F0A0A54B2",
              "runmanageOname": "变电管理一所",
              "vindicateOid": "1589BAA87A23BD64E053380F0A0A54B2",
              "vindicateOname": "220kV碧山巡维中心站",
              "voltagePageShow": "110kV",
              "baseVoltageValue": null,
              "bureauUnitsName": null,
              "bureauRunmanageName": null,
              "imageUrl": null,
              "nodeId": "08002143684483",
              "parentFunctionLocationId": null,
              "primaryValue": "08002143684482"
            }
          },
          {
            "baseInfoData": {
              "_id": null,
              "actionType": null,
              "idList": null,
              "pageNo": 1,
              "pageSize": 20,
              "sortFieldName": null,
              "sortType": "",
              "primaryName": "ID",
              "sortNames": [],
              "sortTypes": [],
              "sortFields": [],
              "id": "08000000318613",
              "dataFrom": null,
              "operationFlag": null,
              "logTrajectoryDescribe": null,
              "provinceCode": "08",
              "bureauCode": "0800",
              "optimisticLockVersion": "1",
              "versionId": 0,
              "deviceCode": "08-00-Z-A342-0000000072",
              "deviceName": "金具",
              "classifyId": "13656",
              "plantTransferDate": 1193673600000,
              "assetState": "运行",
              "parentId": "08000000318499",
              "vendorId": "MT_c7f42cedab284b9b9979",
              "vendor": "资料不详",
              "manufacturerId": "MT_188fcc0f9a5b418592e9",
              "manufacturer": "金具厂",
              "latestManufacturer": "资料不详",
              "deviceModelId": null,
              "deviceModel": "无型号",
              "leaveFactoryNo": "00000000",
              "leaveFactoryDate": 1178121600000,
              "proprietorCompanyOid": "1589BAA876FDBD64E053380F0A0A54B2",
              "proprietorCompanyOname": "广州供电局有限公司",
              "proprietorOwner": "局属资产",
              "statusDate": 1258041600000,
              "installationLocation": "110kV罗岗站",
              "measurementUnit": "台",
              "dispatchLevel": "中调",
              "isCapitalAssets": 2,
              "amount": 1,
              "warrantyPeriod": null,
              "runningCode": null,
              "longitude": 113.3030119139,
              "latitude": 23.1319906417,
              "altitude": null,
              "topography": null,
              "bureauUnitsOid": "1589BAA876FDBD64E053380F0A0A54B2",
              "baseVoltageId": 298,
              "dataSource": null,
              "isShareDevice": 2,
              "isAssambly": 2,
              "isLabel": 2,
              "retireDate": null,
              "isVirtualDevice": 2,
              "remark": " *",
              "inventorytaskno": null,
              "assetDeviceId": null,
              "financeAssetState": "使用中",
              "runPlace": null,
              "runmanageOwner": null,
              "installationOid": null,
              "updateTime": 1564025618000,
              "businessCode": null,
              "businessType": null,
              "classifyName": "变电金具",
              "fullName": "变电设备/一次设备/辅助设施及材料/变电金具",
              "fullPath": "广州供电局有限公司/变电设施/变电一所/220kV碧山巡维中心/110kV罗岗站/110kV电压等级区域/华罗加水迁线间隔/间隔内导线/金具",
              "runmanageOid": "1589BAA87C04BD64E053380F0A0A54B2",
              "runmanageOname": "变电管理一所",
              "vindicateOid": "1589BAA87A23BD64E053380F0A0A54B2",
              "vindicateOname": "220kV碧山巡维中心站",
              "voltagePageShow": "110kV",
              "baseVoltageValue": null,
              "bureauUnitsName": null,
              "bureauRunmanageName": null,
              "imageUrl": null,
              "nodeId": "08000000318612",
              "parentFunctionLocationId": null,
              "primaryValue": "08000000318613"
            }
          },
          {
            "baseInfoData": {
              "_id": null,
              "actionType": null,
              "idList": null,
              "pageNo": 1,
              "pageSize": 20,
              "sortFieldName": null,
              "sortType": "",
              "primaryName": "ID",
              "sortNames": [],
              "sortTypes": [],
              "sortFields": [],
              "id": "08000000318611",
              "dataFrom": null,
              "operationFlag": null,
              "logTrajectoryDescribe": null,
              "provinceCode": "08",
              "bureauCode": "0800",
              "optimisticLockVersion": "0",
              "versionId": 0,
              "deviceCode": "08-00-Z-A174-0000000087",
              "deviceName": "间隔内联线",
              "classifyId": "13654",
              "plantTransferDate": 1193673600000,
              "assetState": "运行",
              "parentId": "08000000318499",
              "vendorId": "MT_7b0a6b26366446739bab",
              "vendor": "资料不详",
              "manufacturerId": "MT_9ed6725691b94bb18f2b",
              "manufacturer": "资料不详",
              "latestManufacturer": "资料不详",
              "deviceModelId": null,
              "deviceModel": "无型号",
              "leaveFactoryNo": "00000000",
              "leaveFactoryDate": 1178121600000,
              "proprietorCompanyOid": "1589BAA876FDBD64E053380F0A0A54B2",
              "proprietorCompanyOname": "广州供电局有限公司",
              "proprietorOwner": "局属资产",
              "statusDate": 1258041600000,
              "installationLocation": "110kV罗岗站",
              "measurementUnit": "台",
              "dispatchLevel": "中调",
              "isCapitalAssets": 2,
              "amount": 1,
              "warrantyPeriod": null,
              "runningCode": null,
              "longitude": 113.3030119139,
              "latitude": 23.1319906417,
              "altitude": null,
              "topography": null,
              "bureauUnitsOid": "1589BAA876FDBD64E053380F0A0A54B2",
              "baseVoltageId": 298,
              "dataSource": null,
              "isShareDevice": 2,
              "isAssambly": 2,
              "isLabel": 2,
              "retireDate": null,
              "isVirtualDevice": 2,
              "remark": " *",
              "inventorytaskno": null,
              "assetDeviceId": null,
              "financeAssetState": "使用中",
              "runPlace": null,
              "runmanageOwner": null,
              "installationOid": null,
              "updateTime": 1557488500000,
              "businessCode": null,
              "businessType": null,
              "classifyName": "间隔内联线",
              "fullName": "变电设备/一次设备/辅助设施及材料/高压设备联线/间隔内联线",
              "fullPath": "广州供电局有限公司/变电设施/变电一所/220kV碧山巡维中心/110kV罗岗站/110kV电压等级区域/华罗加水迁线间隔/间隔内导线/间隔内联线",
              "runmanageOid": "1589BAA87C04BD64E053380F0A0A54B2",
              "runmanageOname": "变电管理一所",
              "vindicateOid": "1589BAA87A23BD64E053380F0A0A54B2",
              "vindicateOname": "220kV碧山巡维中心站",
              "voltagePageShow": "110kV",
              "baseVoltageValue": null,
              "bureauUnitsName": null,
              "bureauRunmanageName": null,
              "imageUrl": null,
              "nodeId": "08000000318610",
              "parentFunctionLocationId": null,
              "primaryValue": "08000000318611"
            }
          }
        ],
        "timestamp": 1611900858672
      }
      resolve(obj);
    }, 1000);
  });



  return request({
    baseURL: myQqt1,
    url: '/api/web/transform/queryDeviceList',
    method: 'post',
    headers: {},
    data: params
  })
}

/* 查询离我最近的变电站 queryNearestSubstation */
export function queryNearestSubstation(params) {


  return new Promise(function(resolve, reject) {
    //做一些异步操作
    setTimeout(function() {
      var obj = {
    "msg": "操作成功",
    "code": 200,
    "data": {
        "_id": null,
        "actionType": null,
        "idList": null,
        "pageNo": 1,
        "pageSize": 20,
        "sortFieldName": null,
        "sortType": "",
        "primaryName": "ID",
        "sortNames": [],
        "sortTypes": [],
        "sortFields": [],
        "id": "ec739f9224354b68bc35434369da9327",
        "dataFrom": "更新变电站容量台数等信息",
        "operationFlag": null,
        "logTrajectoryDescribe": null,
        "provinceCode": "08",
        "bureauCode": "0800",
        "optimisticLockVersion": "3",
        "outputCount": null,
        "inputCount": null,
        "transformerCapacity": 126,
        "transformerNumber": 2,
        "type": "变电站",
        "subType": "组合电器式",
        "centerSubstationId": "08000000000044",
        "centerSubstationName": "220kV林益集控中心",
        "address": "广州市花都区宏发南路（中央粮库附近）",
        "designedCompany": "广州市电力工程设计院有限公司",
        "builderCompany": null,
        "proprietorCompanyOname": "广州供电局有限公司",
        "proprietorCompanyOid": "1589BAA876FDBD64E053380F0A0A54B2",
        "dirtinessAreaLevel": "d",
        "controlType": null,
        "ownerArea": null,
        "controlCenter": null,
        "dutyType": "无人值守",
        "electricalInstalCompany": "广州番电电力建设集团有限公司",
        "connectionMode": "线变组接线",
        "outletCount500kv": 0,
        "outletCount220kv": 0,
        "outletCount110kv": 2,
        "outletCount35kv": 0,
        "outletCount20kv": 0,
        "outletCount10kv": 32,
        "capacitorCompensateCapacity": null,
        "reactorRc": 0,
        "communicationsOverlay": "0",
        "coastalAltitude": 0,
        "seismicIntensity": "Ⅵ",
        "capacityConstitute": null,
        "marketingNumber": null,
        "busSection": 0,
        "intervalNums": 0,
        "mainnetCode": null,
        "mainnetId": null,
        "runmanageDepId": null,
        "isRing": null,
        "contactPerso": null,
        "contactPhone": null,
        "powerLine": null,
        "alternateLine": null,
        "windSppedThirtyYear": "31m/s",
        "windSppedFiftyYear": "35m/s",
        "cloudToGroundFalsh": "C1",
        "thunderRiskGrade": "Ⅱ",
        "iceClassification": "无冰区",
        "floodHundredYear": 0,
        "floodHighedt": 0,
        "siteDesign": 12,
        "outletSpecialUserCount": 0,
        "outletOneLevelUserCount": 0,
        "outletTwoLevelUserCount": 0,
        "voltagePageShow": "110kV",
        "nominalVoltage": "110000",
        "bureauName": null,
        "runmanageOid": null,
        "runmanageOname": null,
        "vindicateOid": "1589BAA87941BD64E053380F0A0A54B2",
        "vindicateOname": "220kV林益巡维中心",
        "plantTransferDate": 1540828800000,
        "runningState": "运行",
        "flName": "110kV雅宝站",
        "flCode": null,
        "runningCode": null,
        "longitude": 113.1861111111,
        "latitude": 23.4122222222,
        "dominionMode": "直管",
        "fullPath": null,
        "updateTime": 1561508617000,
        "distance": 1778.0671726130975,
        "primaryValue": "ec739f9224354b68bc35434369da9327"
    },
    "timestamp": 1612234288637
}
      resolve(obj);
    }, 1000);
  });



  return request({
    baseURL: myQqt1,
    url: '/api/web/transform/queryNearestSubstation',
    method: 'post',
    headers: {},
    data: params
  })
}