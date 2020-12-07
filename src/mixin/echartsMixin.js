/* 百度地图按钮-混入 */
export const echartsMixin = {
  data() {
    return {
      //存储对象
      myEchartObj: {},
      myEchartJsq: '', //计时器
      myEchartNub: 0, //记录数
      myEchartChenItme: {}, //存储当前点击地图选择数据
      myEchartMapOrgCode: null, //用户点击地图选择的部门code-
      myEchartChenItmeName: '',
    }
  },
  methods: {
    //统一初始化-建议统一使用ref，用id在tab切换的时候有兼容性
    $echartInit: function (obj) {
      // console.log('$echarts版本号：' + this.$echarts.version);
      let {
        echartsID = '',
          zdyWidth = this.tabScreenWidth, //屏幕宽度
          zdyHeight = 320, //默认高度
          openStatus = true, //初始化后，是否直接打开图表
          option = {},
          type = '', //图表类型map 地图
      } = obj
      var refType = this.$baseIsTypeof(this.$refs[echartsID]);
      var refObj = '';
      if (refType == 'obj') {
        refObj = this.$refs[echartsID];
      } else if (refType == 'arr') {
        refObj = this.$refs[echartsID][0];
      } else {
        refObj = document.getElementById(echartsID);
      };

      if (refObj) {
        //处理tab切换echarts无法正常显示--https://www.cnblogs.com/hao-1234-1234/p/9214525.html
        var yxwh = refObj.getBoundingClientRect(); //读取高宽
        if (yxwh.width == 0) {
          refObj.style.width = zdyWidth + 'px'; //屏幕宽度
          refObj.style.height = zdyHeight + 'px';
        };
        this.$dltEcharts(echartsID);
        this.myEchartObj[echartsID] = this.$echarts.init(refObj);
        if (openStatus) {
          this.$echartOption(echartsID, option, type);
        }
      };
    },
    //统一打开图表
    $echartOption: function (echartsID, option, type) {
      if (this.myEchartObj[echartsID]) {
        this.myEchartObj[echartsID].setOption(option, true);
      };
      /* 只有全网用户才可以绑定双击事件和地图图表*/
      if (type == 'map') {
        this.$mapselected1(echartsID);
      };
    },
    /* 模拟地图单双击事件*/
    $mapselected1: function (echartsID) {
      let that = this;
      this.myEchartObj[echartsID].off('click'); //防止多次触发
      this.myEchartObj[echartsID].on('click', function (obj) {
        if (that.myEchartChenItmeName != obj.name) {
          that.myEchartChenItmeName = obj.name;
        };
        that.myEchartNub = 1 + that.myEchartNub;
        that.myEchartJsq = setTimeout(() => {
          if (that.myEchartNub == 2 && that.myEchartChenItmeName == obj.name) {
            //console.log('双击');
            that.$disposeDblClickMapTap(obj, echartsID, 'next');
            //console.log(echartsID);
            clearTimeout(that.myEchartJsq);
          };
          if (that.myEchartNub == 1) {
            //console.log('单击');
          }
          that.myEchartNub = 0;
          that.myEchartChenItmeName = '';
        }, 300);
      });
    },
    //处理双击地图事件
    $disposeDblClickMapTap: function (mapItme, echartsID, type) {
      /* 要新建一个 用户要下钻省或市的部门myEchartMapOrgCode变量*/
      // //console.log(mapName);
      // //console.log(this.$route.name);
      // //console.log(JSON.stringify(this.UnitArr[this.UnitAreaIndex].arr))
      // //console.log(this.UnitAreaIndex);
      // //console.log(this.$tabOrgCode);
      // //console.log(this.$tabOrgLevel);
      var params = {
        forKey: 'orgName', //orgName,orgCode
        forVal: mapItme.name,
      };
      //console.log(mapItme.name)
      var itme = this.$tabGetOrgCodeArrItme(params);
      //console.log(JSON.stringify(itme))
      if (!itme) return;
      if (itme.orgLevel != 1 && itme.orgLevel != 2 && itme.orgLevel != 3) return;
      if (type == 'back') { //上级
        var orgCode = itme.topOrgCode;
        //清空返回上一级地图资源
        this.myEchartChenItme[echartsID] = this.$baseArrFilter(this.myEchartChenItme[echartsID], 'name', mapItme.name,
          false);
      } else if (type == 'next') { //下一级
        var orgCode = itme.orgCode;
        this.myEchartChenItme[echartsID].push(mapItme);
      };
      if (this.$route.name == 'voltageIndex') {
        this.voltageIndexDisposeUnitTap(this.UnitAreaIndex, [], 200, true, orgCode, 'mapBottm'); //请求数据各单位电压合格率
      } else if (this.$route.name == 'voltageSpecialized') {
        this.voltageSpecializedDisposeUnitTap(this.UnitAreaIndex, [], 200, true, orgCode, 'mapBottm'); //请求数据各单位电压合格率
      } else if (this.$route.name == 'lowIndex') {
        this.lowIndexDisposeUnitTap(this.UnitAreaIndex, [], 200, true, orgCode, 'mapBottm'); //低电压分布
      } else if (this.$route.name == 'highIndex') {
        this.highIndexDisposeUnitTap(this.UnitAreaIndex, [], 200, true, orgCode, 'mapBottm'); //请求数据各单位电压合格率
      }
    },
    //返回地图上一级
    $mapBackTap: function (obj) {
      let {
        echartsID = '',
      } = obj;
      var leg = this.myEchartChenItme[echartsID].length;
      var itme = this.myEchartChenItme[echartsID][leg - 1] || {};
      if (itme.name) {
        this.$disposeDblClickMapTap(itme, echartsID, 'back');
        // this.myEchartChenItme[echartsID] = '';//清空返回上一级地图资源
      }
    },
    //圆形指针图
    $echartYXZZ: function (obj) {
      let {
        echartsID = '',
          val1Data = 50,
          namePop = '台区电压',
          nameData = '合格率',
          outTime = 150,
          colorArr = [
            [0.2, '#e8655c'],
            [0.8, '#ffaa00'],
            [1, '#62b867']
          ],
          deteTxt = '',
      } = obj;
      deteTxt = deteTxt ? deteTxt : val1Data + '%';
      setTimeout(() => {
        let option = {
          tooltip: {
            formatter: '{a} <br/>{b} : {c}%'
          },
          toolbox: {
            feature: {
              // restore: {},
              // saveAsImage: {}
            }
          },
          series: [{
            name: namePop,
            type: 'gauge',
            detail: {
              formatter: (res) => {
                /* val1Data+1+'%' + ' \n ' + '同比'+val2Data*/
                return deteTxt;
              },
              fontSize: 20,
              offsetCenter: [0, '80%']
            },
            axisLine: {
              show: true,
              // 属性lineStyle控制线条样式
              lineStyle: {
                width: 10,
                color: colorArr
              }
            },
            data: [{
              value: val1Data,
              name: nameData,

            }, ]
          }]
        };
        this.$echartInit({
          'echartsID': echartsID,
          'option': option
        });
      }, outTime);
    },
    //柱状图
    $echartsZZT: function (obj) {
      let {
        echartsID = '',
          nameArr = ['深圳', '广州', '佛山', '珠海', '中山', '贵阳', '东莞', '凯里', '昆明', '毕节'],
          valArr = [10, 20, 20, 34, 90, 30, 20, 20, 34, 90],
          colorArr = ['#5fc24a', '#33bcca', '#4a9ef2', '#f77c3a', '#fd8d6a'],
          namePop = '合格率',
          outTime = 150,
          yAxisName = '百分比%',
          statusReverse = true, //是否排序
          typeReverse = false, //升序true,降序 false
          yAxisMax = 0,
          // min: yAxisMim, // 设置y轴刻度的最小值
          // max: yAxisMax, // 设置y轴刻度的最大值
      } = obj;
      if (valArr.length > 40) {
        var showEnd = 50;
      } else {
        var showEnd = 100;
      };
      if (statusReverse) {
        var newArr = [];
        for (var i = 0; i < valArr.length; i++) {
          var itme = {
            name: '',
            val: 0
          };
          itme.name = nameArr[i];
          itme.val = valArr[i];
          newArr.push(itme);
        };
        var retArr = this.$baseArrReverse(newArr, typeReverse, 'val'); //降序
        for (var i = 0; i < retArr.length; i++) {
          var itme = {
            name: '',
            val: 0
          };
          nameArr[i] = retArr[i].name;
          valArr[i] = retArr[i].val;
        };
      };
      setTimeout(() => {
        let option = {
          color: colorArr,
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              // 坐标轴指示器，坐标轴触发有效
              type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            top: '16%',
            bottom: '4%',
            containLabel: true
          },
          xAxis: [{
            type: 'category',
            data: nameArr,
            axisTick: {
              alignWithLabel: true
            }
          }],
          yAxis: [{
            type: 'value',
            name: yAxisName
          }],
          /* 配置左右滑动区域*/
          dataZoom: [
            /* 表内滑动*/
            // {
            // show: true,
            // realtime: true,
            // start: 0,
            // end: showEnd
            // },
            // /* 底部滑动*/
            {
              type: 'inside',
              realtime: true,
              start: 0,
              end: showEnd,
              preventDefaultMouseMove: false
            }
          ],
          series: [{
            name: namePop,
            type: 'bar',
            barWidth: '60%',
            label: {
              show: true
            },
            itemStyle: {
              normal: {
                color: function (params) {
                  return colorArr[params.dataIndex]
                },
              }
            },
            data: valArr
          }]
        };
        if (yAxisMax) {
          option.yAxis[0]['max'] = yAxisMax;
        }
        this.$echartInit({
          'echartsID': echartsID,
          'option': option
        });
      }, outTime)
    },
    //折线图堆叠
    $echartsZXT: function (obj) {
      let {
        echartsID = '',
          outTime = 100,
          orient = 'horizontal',
          showEndNub = 0,
          yAxisName = '',
          gridRight = '4%',
          yAxisMax = '',
          yAxisMim = 0,
          ySplitNumber = 5,
          xAxisData = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
          legendData = ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎'],
          legendColor = '',
          seriesArr = [{
              name: '邮件营销',
              type: 'line',
              data: [120, 132, 101, 134, 90, 230, 210, 120, 132, 101, 134, 90, 230, 210]
            },
            {
              name: '联盟广告',
              type: 'line',
              data: [220, 182, 191, 234, 290, 330, 310, 120, 132, 101, 134, 90, 230, 210]
            },
            {
              name: '视频广告',
              type: 'line',
              data: [150, 232, 201, 154, 190, 330, 410, 120, 132, 101, 134, 90, 230, 210]
            },
            {
              name: '直接访问',
              type: 'line',
              data: [320, 332, 301, 334, 390, 330, 320, 120, 132, 101, 134, 90, 230, 210]
            },
            {
              name: '搜索引擎',
              type: 'line',
              data: [820, 932, 901, 934, 290, 330, 320, 120, 132, 101, 134, 90, 230, 210]
            }
          ],
      } = obj;
      if (xAxisData.length > 20) {
        var showEnd = showEndNub || 50;
      } else {
        var showEnd = showEndNub || 100;
      };
      setTimeout(() => {
        var option = {
          title: {
            text: '折线图',
            show: false
          },
          tooltip: {
            trigger: 'axis'
          },
          color: legendColor,
          legend: {
            //默认横向布局 horizontal，纵向布局值为'vertical'
            orient: orient,
            x: 'right', //可设定图例在左、右、居中
            itemWidth: 20,
            // y:'center',     //可设定图例在上、下、居中
            // padding:[0,50,0,0],   //可设定图例[距上方距离，距右方距离，距下方距离，距左方距离]
            data: legendData,
            selectedMode: 'multiple', //可以设成 false 关闭除此之外也可以设成 'single' 或者 'multiple' 使用单选或者多选模式。
          },
          grid: {
            left: '1%',
            right: gridRight,
            bottom: '4%',
            top: '14%',
            containLabel: true
          },
          //下载工具
          // toolbox: {
          //     feature: {
          //         saveAsImage: {},
          //     }
          // },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: xAxisData
          },
          yAxis: {
            name: yAxisName,
            type: 'value',
            // min: yAxisMim, // 设置y轴刻度的最小值
            // max: yAxisMax, // 设置y轴刻度的最大值
            splitNumber: ySplitNumber, // 设置y轴刻度间隔个数
            axisLine: {
              lineStyle: {
                // 设置y轴颜色
                color: '#87CEFA'
              }
            }
          },
          /* 配置左右滑动区域*/
          dataZoom: [
            /* 表内滑动*/
            // {
            // show: true,
            // realtime: true,
            // start: 0,
            // end: showEnd
            // },
            // /* 底部滑动*/
            {
              type: 'inside',
              realtime: true,
              start: 0,
              end: showEnd,
              preventDefaultMouseMove: false
            }
          ],

          series: seriesArr
        };
        if (yAxisMax) {
          option.yAxis['max'] = yAxisMax
        };
        if (yAxisMim) {
          option.yAxis['min'] = yAxisMim
        };

        this.$echartInit({
          'echartsID': echartsID,
          'option': option
        });
      }, outTime)
    },
    //生成地图
    $echartsMap: function (obj) {
      let {
        echartsID = '',
          valuess = [],
          mapData = [], //地图数据
          mapType = 'wsMap1', //哪里的地图，五省或者海南
          popTxt = '合格率', //
          dwTxt = '%', //单位
          dataRangeShow = false, //控件是否显示
          dataRangeMin = 0, //颜色区间的最小值
          dataRangeMax = 100, //颜色区间的最大值，和data中的最大值一致
          dataRangeX = 'left', //控件位置
          dataRangeY = 'bottom', //控件位置
          dataRangeText = ['高', '低'], // 文本，默认为数值文本
          dataRangeCalculable = false,
          //颜色区间
          dataRangeColor = ['#A0D9EF', '#71BDE2', '#6484C7', '#5869C3', '#0033CC']
      } = obj;
      var maxMinObj = this.$baseArrMaxMin(valuess);
      dataRangeMin = maxMinObj.min;
      dataRangeMax = maxMinObj.max;
      setTimeout(() => {
        var markdata = []; //这是为了给地图上添加气泡图标,拿取备用数据
        //取得json的样式，读取json文件
        markdata = this.convertData(mapData.features, valuess);
        this.$echarts.registerMap('demo', mapData);
        var option = {
          dataRange: {
            //值域选择，每个图表最多仅有一个值域控件
            show: dataRangeShow,
            min: dataRangeMin, //颜色区间的最小值
            max: dataRangeMax, //颜色区间的最大值，和data中的最大值一致
            x: dataRangeX,
            y: dataRangeY,
            text: dataRangeText, // 文本，默认为数值文本
            calculable: dataRangeCalculable,
            inRange: {
              //颜色区间
              color: dataRangeColor
            }
          },
          /* 浮层级弹窗*/
          tooltip: {
            show: true,
            formatter: function (params) {
              // //console.log(JSON.stringify(params))
              //点击事件
              // 根据自己的需求返回数据
              var dw = dwTxt ? dwTxt : '%';
              return `<div onclick='aaTap'>` + params.name + `</div><div>` + popTxt + `：<span>` + params.value +
                dw +
                `</span></div>`;
            },
            /* 浮层的渲染模式，默认以 'html 即额外的 DOM 节点展示 tooltip；此外还可以设置为 'richText' 表示以富文本的形式渲染，*/
            renderMode: 'html', //
            confine: false
          },
          series: [{
            type: 'map',
            roam: false, //开始放大缩小
            map: 'demo',
            itemStyle: {
              normal: {
                label: {
                  show: true
                }
              },
              emphasis: {
                label: {
                  show: true
                }
              }
            },
            data: markdata
            //悬停气泡
            // markPoint: {
            //   symbolSize: 60,
            //   itemStyle: {
            //     normal: {
            //       borderColor: '#33CBFF',
            //       color: '#33CBFF',
            //       borderWidth: 1, // 标注边线线宽，单位px，默认为1
            //       label: {
            //         show: true
            //       }
            //     }
            //   },

            //   data: markdata
            // }
          }]
        };
        if (mapType == 'hnsMap2') {
          //由于海南地图包括南海及南海诸岛在内的大片区域，所以显示海南地图时，要将地图放大，并设置海南岛居中显示
          option.series[0].center = [109.844902, 19.0392];
          option.series[0].layoutCenter = ['50%', '55%'];
          option.series[0].layoutSize = '700%';
        } else if (mapType == 'wsMap1' && dataRangeShow) {
          //全网-五省
          option.series[0].layoutCenter = ['50%', '50%'];
          option.series[0].layoutSize = '90%';
        } else {
          //非显示海南时，将设置的参数恢复默认值
          option.series[0].center = undefined;
          option.series[0].layoutCenter = undefined;
          option.series[0].layoutSize = undefined;
        }
        this.$echartInit({
          'echartsID': echartsID,
          'option': option,
          'type': 'map', //地图
        });
      }, obj.outTime || 150)
    },
    //处理整合   气泡图标数据
    convertData: function (arrs = [], valuess = []) {
      var markdata = [];
      for (var i = 0; i < arrs.length; i++) {
        markdata.push({});
        markdata[i].coord = arrs[i].properties.center;
        markdata[i].name = arrs[i].properties.name;

        markdata[i].value = valuess[i];
      }
      // //console.log(markdata);
      return markdata;
    },
    //包含关系的柱状图
    $echartsBHZZT: function (obj) {
      let {
        echartsID = '',
          outTime = 100,
          colorArr = ['#f8d457', '#ef7f54'],
          yAxisName = '%',
          legend = {
            //默认横向布局 horizontal，纵向布局值为'vertical'
            orient: 'horizontal',
            x: 'right', //可设定图例在左、右、居中
            itemWidth: 20,
            // y:'center',     //可设定图例在上、下、居中
            // padding:[0,50,0,0],   //可设定图例[距上方距离，距右方距离，距下方距离，距左方距离]
            data: ['执行中', '已完成', '取消'],
            selectedMode: 'multiple', //可以设成 false 关闭除此之外也可以设成 'single' 或者 'multiple' 使用单选或者多选模式。
          },
          nameArr = ['深圳', '广州', '佛山', '珠海', '中山', '贵阳', '东莞', '凯里', '昆明', '毕节'],
          seriesArr = [{
              name: '低电压',
              type: 'bar',
              label: {
                show: true,
                position: 'insideTop', //设置文字位置
              },
              data: [300, 302, 301, 334, 390, 330, 320, 390, 330, 320]
            },
            {
              name: '严重低电压',
              barGap: '-100%',
              type: 'bar',
              label: {
                show: true,
                position: 'insideTop'
              },
              data: [120, 132, 101, 134, 90, 230, 210, 90, 230, 210]
            },
          ],
          statusReverse = true, //是否排序
          typeReverse = false, //升序true,降序 false
      } = obj;
      if (nameArr.length > 40) {
        var showEnd = 50;
      } else {
        var showEnd = 100;
      };
      if (statusReverse) {
        var newArr = [];
        for (var i = 0; i < nameArr.length; i++) {
          var itme = {};
          for (var k = 0; k < seriesArr.length; k++) {
            itme['val' + k] = seriesArr[k].data[i];
          };
          itme.name = nameArr[i];
          newArr.push(itme);
        };
        var retArr = this.$baseArrReverse(newArr, typeReverse, 'val0'); //降序
        for (var i = 0; i < retArr.length; i++) {
          for (var k = 0; k < seriesArr.length; k++) {
            seriesArr[k].data[i] = retArr[i]['val' + k];
          };
          nameArr[i] = retArr[i].name;
        };
      };
      setTimeout(() => {
        let option = {
          color: colorArr,
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              // 坐标轴指示器，坐标轴触发有效
              type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '4%',
            top: '10%',
            containLabel: true
          },
          legend: legend,
          xAxis: {
            type: 'category',
            data: nameArr,
          },
          yAxis: {
            type: 'value',
            name: yAxisName,
          },
          /* 配置左右滑动区域*/
          dataZoom: [
            /* 表内滑动*/
            // {
            // show: true,
            // realtime: true,
            // start: 0,
            // end: showEnd
            // },
            // /* 底部滑动*/
            {
              type: 'inside',
              realtime: true,
              start: 0,
              end: showEnd,
              preventDefaultMouseMove: false
            }
          ],

          series: seriesArr,
        };
        this.$echartInit({
          'echartsID': echartsID,
          'option': option
        });
      }, outTime || 300)
    },
    /**
     * 柱状图
     */
    $echartsZZTS: function (obj) {
      let {
        echartsID = '',
          outTime = 150,
          colorArr = ['#ef7f54', '#f3a840', '#f8d457'],
          legend = {
            //默认横向布局 horizontal，纵向布局值为'vertical'
            orient: 'horizontal',
            x: 'right', //可设定图例在左、右、居中
            // y:'center',     //可设定图例在上、下、居中
            itemWidth: 20,
            // padding:[0,50,0,0],   //可设定图例[距上方距离，距右方距离，距下方距离，距左方距离]
            data: ['执行中', '已完成', '取消'],
            selectedMode: 'multiple', //可以设成 false 关闭除此之外也可以设成 'single' 或者 'multiple' 使用单选或者多选模式。
          },
          yAxisName = '百分比%',
          seriesArr = [{
              name: '长时间过载',
              type: 'bar',
              label: {
                show: true,
              },
              data: [320, 302, 301, 334, 390, 330, 320, 390, 330, 320]
            },
            {
              name: '过载',
              type: 'bar',
              label: {
                show: true,
              },
              data: [320, 302, 301, 334, 390, 330, 320, 390, 330, 320]
            },
            {
              name: '总载',
              type: 'bar',
              label: {
                show: true,
              },
              data: [120, 132, 101, 134, 90, 230, 210, 90, 230, 210]
            }
          ],
          addressList = ['深圳', '广州', '佛山', '珠海', '中山', '贵阳', '东莞', '凯里', '昆明', '毕节'],
          statusReverse = true, //是否排序
          typeReverse = false, //升序true,降序 false
      } = obj;
      if (addressList.length > 40) {
        var showEnd = 50;
      } else {
        var showEnd = 100;
      };
      if (statusReverse) {
        var newArr = [];
        for (var i = 0; i < addressList.length; i++) {
          var itme = {
            hzNub: 0
          };
          for (var k = 0; k < seriesArr.length; k++) {
            itme['val' + k] = seriesArr[k].data[i];
            itme.hzNub += Number(seriesArr[k].data[i]);
          };
          itme.name = addressList[i];
          newArr.push(itme);
        };
        var retArr = this.$baseArrReverse(newArr, typeReverse, 'hzNub'); //降序
        for (var i = 0; i < retArr.length; i++) {
          for (var k = 0; k < seriesArr.length; k++) {
            seriesArr[k].data[i] = retArr[i]['val' + k];
          };
          addressList[i] = retArr[i].name;
        };
      };
      setTimeout(() => {
        let option = {
          color: colorArr,
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              // 坐标轴指示器，坐标轴触发有效
              type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          legend: legend,
          grid: {
            left: '3%',
            right: '4%',
            bottom: '4%',
            top: '10%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            data: addressList
          },
          yAxis: {
            type: 'value',
            name: yAxisName
          },
          /* 配置左右滑动区域*/
          dataZoom: [
            /* 表内滑动*/
            // {
            // show: true,
            // realtime: true,
            // start: 0,
            // end: showEnd
            // },
            // /* 底部滑动*/
            {
              type: 'inside',
              realtime: true,
              start: 0,
              end: showEnd,
              preventDefaultMouseMove: false
            }
          ],

          series: seriesArr
        };

        this.$echartInit({
          'echartsID': echartsID,
          'option': option
        });

      }, outTime)
    },
    //销毁图表-释放图表实例，释放后实例不再可用。
    $dltEcharts: function (byId) {
      if (this.myEchartObj[byId]) {
        this.myEchartObj[byId].dispose();
      }
    },
    //隐藏图表 清空绘画内容，清空后实例可用，因为并非释放示例的资源，释放资源我们需要dispose()
    $hidEcharts: function (byId) {
      if (this.myEchartObj[byId]) {
        this.myEchartObj[byId].clear();
      }
    },
    //还原图表，各种状态均被清除，还原为最初展现时的状态。
    $restoreEcharts: function (byId) {
      this.myEchartObj[byId].restore();
    },
  }
}
