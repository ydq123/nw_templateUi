/* 按钮-混入 */
export const NWmyJsSdkMixin = {
  data() {
    return {

    }
  },
  methods: {
    /* 活体检测*/
    $sdkSilentliveness: function(callback) {
      this.myJssdk.extendMobileJssdk(
        'com.comtop.silentliveness', //插件的pluginId
        'start', //调用插件的action
        {
          success(data) {
            if(typeof data =='string'){
              data=JSON.parse(data)
            }
            callback({
              data: data,
              status: true,
              msg: '成功'
            });
          },
          fail(error) {
            callback({
              data: error,
              status: false,
              msg: '失败'
            });
          }
        }, //action函数需要的参数，以字典形式提供
      );
    },
    /* 人脸识别 */
    $sdkjumpToFaceDetect: function(callback) {
      cordova.plugins.FaceDetectPlugin.openDetectWindow({
          cameraDirection: "front",
          quality: "50"
        }, (imageBase64) => {
          // this.$textLoading('身份识别中');
          let data = {
            db_name: 'scyyd',
            top: 1,
            image: imageBase64
          }
          searchFace(data).then(ret => {
            this.$textHid();
            if (ret.result) {
              if (ret.result[0]) {
                if (ret.result[0].score > 0.8) {
                  let name = ret.result[0].info
                  /* 有资质 */
                  var obj = {
                    name: ret.result[0].info,
                    status: true
                  }
                  callback(obj)
                } else {
                  /* 无资质 */
                  var obj = {
                    name: '',
                    status: false
                  };
                  callback(obj)
                }
              } else {
                /* 无资质 */
                var obj = {
                  name: '',
                  status: false
                };
                callback(obj)
              }
            } else {
              /* 无资质 */
              var obj = {
                name: '',
                status: false
              };
              callback(obj)
            }

          }).catch(err => {
            var obj = {
              name: '',
              status: false
            };
            callback(obj)
          });
        },
        () => {
          var obj = {
            name: '',
            status: false
          };
          callback(obj)
        });
    },
    /* 获取文件大小 */
    $sdkGetFileLength: function(url, callback) {
      this.myJssdk.callMobileJsSdk(
        'file/info', {
          path: url,
          success(data) {
            var dataType = typeof data;
            if (dataType == 'string') {
              data = JSON.parse(data)
            }
            data['status'] = true;
            callback(data);
          },
          fail(error) {
            console.log(error);
            error['status'] = false;
            callback(error);
          }
        }
      );
    },
    /* 物理返回键监听*/
    $sdkCallMobile: function(obj = {
      type: 'setType'
    }, callBack) {
      let _this = this;
      this.myJssdk.callMobileJsSdk('web/eventRegister', {
        eventType: 'BackPressEvent',
        eventcallback(res) {
          // console.log(_this.$route.meta.moduleName)
          // console.log(_this.$route.name)
          var keepLength = _this.$store.getters.pageUrlObj.keepNameArr.length;
          if (obj.type == 'setType') { //自适应写法
            if (keepLength > 1) {
              _this.$textHid(); //关闭加载提示框
              _this.$tabBack(-1);
            } else if (_this.$route.name == 'root_tab') {
              _this.$msgThenCatch('确定要退出程序吗？', function(res) {
                _this.myJssdk.closeWindow();
              })
            } else {
              _this.$sdkCloseWxView(); //关闭子应用
            }
          } else if (obj.type == 'home') {
            if (keepLength > 1) {
              _this.$textHid(); //关闭加载提示框
              _this.$tabBack(-1);
            } else {
              _this.$msgThenCatch('确定要退出程序吗？', function(res) {
                _this.myJssdk.closeWindow();
              })
            }
          } else if (obj.type == 'itme') {
            if (keepLength > 1) {
              _this.$textHid(); //关闭加载提示框
              _this.$tabBack(-1);
            } else {
              _this.$sdkCloseWxView(); //关闭子应用
            }
          } else if (obj.type == 'zdy') {
            callBack({
              status: true,
              pageName: _this.$route.name,
            })
          }
        },
        success(res2) {
          console.log(2)
          console.log(res2)
        },
        fail(err) {
          console.log(3)
          console.log(err)
        }
      })
    },
    /* 数字签名 */
    $sdkSignature: function(obj, callback) {
      var key = this.$baseIsTypeof(obj);
      if (key == 'obj') {
        var {
          color = '000000', width = 3
        } = obj;
      } else {
        var newObj = {
          color: obj || '000000',
        };
        var {
          color = '000000', width = 3
        } = newObj;
      };
      this.myJssdk.signature({
        color: color,
        width: width,
        success(res) {
          /* data:{
          imagePath: '', // 签名照片的路径
          imageStr: '' //签名照片base64之后的缩略图数据
          } */
          callback({
            status: true,
            data: res
          })
          console.info(res)
        },
        fail(err) {
          console.info(err)
          callback({
            status: false,
            data: err
          })
        }
      });
    },
    /* 单独上传 */
    $sdkUploadMedia: function(obj, callback) {
      var {
        fileurl = '',
          parStr = '',
          headers = JSON.stringify({
            'access-token': this.$store.getters.jdapUserInfo.token
          })
      } = obj;
      var baseUpUrl = window.NW_BASEURL || 'http://172.16.68.42:80';
      this.myJssdk.uploadMedia({
        url: baseUpUrl + '/web/upload/api/top/atm/restClient/uploadAttachmentFile',
        fileurl: fileurl,
        params: parStr,
        headers: headers,
        filekey: 'file',
        success(data) {
          var dataType = typeof data;
          if (dataType == 'string') {
            data = JSON.parse(data)
          }
          console.log(data)
          callback({
            status: true,
            data: data
          })

        },
        fail(data) {
          /* 上传失败 */
          callback({
            status: false,
            data: data
          })
        }
      })
    },
    /* 下载附件 callMobileJsSdk*/
    $sdkDownload: function(obj = {}, callback1, callback2) {
      console.log(obj.url)
      /* success:文件绝对路径
      	fail：失败信息
      		progresscallback：进度值0-100  */
      // 附件下载通用方法示例 /storage/emulated/0/deviceid.txt
      this.myJssdk.callMobileJsSdk(
        'file/download', {
          headers: JSON.stringify({
            'access-token': this.$store.getters.jdapUserInfo.token
          }),
          params: JSON.stringify({
            'url': obj.url,
          }),
          url: obj.url,
          path: obj.path, //下载存放地址
          success(data) {
            console.log(11111);
            console.log(data);
            callback1({
              status: true,
              data: data
            });
          },
          fail(error) {
            console.log(222);
            console.log(error);
            callback1({
              status: false,
              data: error
            });
          },
          progresscallback(progress) {
            console.log(333333);
            console.log(progress);
            callback2(progress);
          }
        });
    },
    /* 解压 */
    $sdkUnZip: function(obj = {
      url: 'file:///storage/emulated/0/dwglpt/h5/aa.zip', //解压的地址也是访问地址
      path: '/storage/emulated/0/dwglpt/h5',
    }, StatusCallback, ProgressCallback) {
      console.log('解压2')
      console.log(obj)
      window.zip.unzip(obj.url, obj.path, (ret1) => {
        if (ret1 == 0) {
          StatusCallback({
            status: true,
            msg: '解压成功'
          });
        } else if (ret1 == -1) {
          StatusCallback({
            status: false,
            msg: '解压失败'
          });
        }
      }, (ret2) => {
        var percent = Math.round((ret2.loaded / ret2.total) * 100);
        ProgressCallback({
          data: ret2,
          percent: percent,
          msg: '解压进度'
        });
      });
    },
    /* 文件预览 */
    $sdkQuicklook: function(url, callback) {
      this.myJssdk.callMobileJsSdk(
        'file/quicklook', {
          title: 'write',
          urlOrPath: url,
          success(data) {
            callback({
              status: true,
              msg: '文档预览成功'
            });
          },
          fail(error) {
            callback({
              status: false,
              msg: error
            });
          }
        });
    },
    /* 本地缓存操作 */
    $sdkKvSync: function(obj, callBack) {
      /*
      this.$sdkKvSync({type:'set',key:'csKey',value:'啊啊啊'},function(res){
      	console.log(11111);
      	console.log(res);
      }) */
      var {
        type = 'set', //新增或修改set 读取get 删除delete
          key = '',
          value = ''
      } = obj;
      if (type == 'set') {
        var va2 = this.$baseIsTypeof(value);
        if (va2 == 'arr' || va2 == 'obj') {
          value = JSON.stringify(value);
        }
      }
      this.myJssdk.kv({
        action: type,
        key: key,
        value: value,
        success(res) {
          var resObj = {
            status: true,
            data: res,
          }
          callBack(resObj);
          // console.log(res);
        },
        fail(err) {
          var resObj = {
            status: false,
            data: err
          }
          callBack(resObj);
          // console.log(err);
        }
      });
    },
    /* 获取安全距离
    {
        "left": 40,//px
        "top": 40,//px
        "right": 40,//px
        "bottom":80//px
    }
    */
    $sdkSafearea: function(callBack) {

      this.myJssdk.callMobileJsSdk(
        'system/safearea', {
          success(data) {
            callBack({
              status: true,
              data: data
            })
          },
          fail(error) {
            callBack({
              status: false,
              data: error
            })
          }
        }
      );
    },
    /* 扫一扫 */
    $sdkScanQRCode: function(type = 1, callback) {
      this.myJssdk.scanQRCode({
        needResult: type ? 1 : 0, // 0 企信发生扫描结果跳转 1 返回扫描结果，不发生页面跳转
        success(qRData) {
          callback({
            status: true,
            data: qRData
          })
        },
        fail(data) {
          callback({
            status: false,
            data: data
          })
        }
      })
    },
    /* 获取经纬度
    第一个参数的格式为以英文逗号分隔字符串：113.988165,22.556328,中国广东省深圳市南山区侨香路辅路
    第二个参数的格式为JSON格式字符串：
    {
      "latitude": 22.22,
      "longitude": 132.33,
      "province": "广东省",
      "city": "深圳市",
      "district": "南山区",
      "street": "侨香路",
      "street_number": "4068号",
      "address": "广东省深圳市福田区莲花路2075号"
    }
    */
    $sdkGetLocation: function(callback) {
      this.myJssdk.getLocation({
        success: (value, json) => {
          callback({
            status: true,
            data: value,
            json: json ? JSON.parse(json) : {},
          });
        },
        fail: (err) => {
          callback({
            status: false,
            data: err
          });
        }
      });
    },
    /* 播放声音 */
    $sdkAudioPlay: function(fileUrl, calllback) {
      jssdk.audioPlay({
        fileUrl: fileUrl || '',
        action: 'start',
        success: (data) => {
          calllback({
            status: true,
            data: data
          })
        },
        fail: (data) => {
          calllback({
            status: false,
            data: data
          })
        }
      })
    },

    /*
    success	function	成功回调
    fail	function	失败回调
    action	字符串	操作类型（new 创建新窗口，close 关闭窗口，check 切换窗口，floating 悬浮）
    url	字符串	创建窗口时必须传递，窗口加载的url
    windowid	字符串	窗口id （创建新窗口时 不需要；悬浮以及关闭窗口时，如果不传windowId则默认对最上层的window进行操作）
    logo	字符串	窗口的logo，缩虐图的base64
    title	字符串	窗口的标题
    */
    /* 创建窗口 */
    $sdkNewWxView: function(obj, callback) {
      // 基础创建
      this.jcNewWxView(obj, callback);
    },
    /* 基础创建 */
    jcNewWxView: function(obj, callback) {
      var that = this;
      if (obj.jsonStr) {
        var winUrl = obj.url + '?aa=11&jsonStr=' + obj.jsonStr + '&suiji=' + this.$jsdkNubRandom(32);
      } else {
        var winUrl = obj.url + '?aa=11&suiji=' + this.$jsdkNubRandom(32);
      }
      this.myJssdk.callMobileJsSdk('system/mutablewindow', {
        url: winUrl,
        action: 'new',
        windowid: '',
        logo: obj.logo,
        title: obj.title,
        success(ret) {
          // 创建窗口成功会跳转页面，如果弹框看不到弹窗消息。
          // 返回值是创建窗口的windowid
          console.log(`创建窗口成功: ${ret}`)
          var data = {
            winName: obj.winName,
            windowid: ret,
          };
          that.DQWinName = obj.winName;
          that.nwWindowidArr.push(data);
          callback({
            status: true,
            data: data,
            type: 'new'
          });
        },
        fail(err) {
          console.log(`创建窗口失败: ${err}`)
          callback({
            status: false,
            data: err,
            type: 'new'
          });
        }
      })
    },
    // 悬浮窗口
    $sdkFloatingWxView: function(obj, callback) {
      this.myJssdk.callMobileJsSdk('system/mutablewindow', {
        action: 'floating',
        windowid: '',
        success(data) {
          console.log(`悬浮窗口: ${data}`)
        },
        fail(data) {}
      })
    },
    // 关闭窗口
    $sdkCloseWxView: function(obj, callback) {
      this.myJssdk.callMobileJsSdk('system/mutablewindow', {
        action: 'close',
        windowid: '',
        success(ret) {
          console.log(3332222)
          console.log(`关闭窗口: ${ret}`);
          callback({
            status: true,
            data: ret,
            type: 'close'
          });
        },
        fail(err) {
          console.log(3332222111)
          callback({
            status: false,
            data: err,
            type: 'close'
          });
        }
      })
    },
    // 切换窗口
    $sdkCheckWxView: function(obj, callback) {
      this.myJssdk.callMobileJsSdk('system/mutablewindow', {
        action: 'check',
        windowid: obj.windowid,
        success(data) {
          console.log(`切换窗口: ${data}`)
        },
        fail(data) {}
      })
    },
    /* 删除窗口 缓存*/
    $sdkclearWxView: function(obj, callback) {
      this.myJssdk.callMobileJsSdk('web/cache/clear', {
        success(ret) {
          callback({
            status: true,
            data: ret,
            type: 'clear'
          });
        },
        fail(err) {
          callback({
            status: false,
            data: err,
            type: 'clear'
          });
        }
      })
    },
    //获取指定长度的随机数
    $jsdkNubRandom: function(val) {
      var number = val || 32;
      var date = new Date();
      var timeStr = new Date().getTime() + ''; //获取时间戳
      var timeLeg = timeStr.length;
      var newNub = 0;
      if (number > timeLeg) {
        newNub = number - timeLeg;
      } else {
        newNub = number;
      }
      var _basechars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'; /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
      var maxPos = _basechars.length;
      var pwd = '';
      for (var i = 0; i < newNub; i++) {
        pwd += _basechars.charAt(Math.floor(Math.random() * maxPos));
      }
      if (number > timeLeg) {
        return pwd + timeStr;
      } else {
        return pwd;
      }

    },

  }
}
