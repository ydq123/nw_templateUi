/* 按钮-混入 */
export const NWbaseMinxin = {
	data() {
		return {

		}
	},
	methods: {
		/*************************************杂项***********************************/
		//缓存数据
		$baseSetData: function(keyName, valObj) {
			var retObj = {
				msg: '',
				status: false
			};
			var va1 = this.$baseIsTypeof(keyName);
			if (va1 == 'string') {
				var va2 = this.$baseIsTypeof(valObj);
				if (va2 == 'arr' || va2 == 'obj') {
					valObj = JSON.stringify(valObj);
				}
				localStorage.setItem(keyName, valObj);
				retObj.msg = '缓存成功';
				retObj.status = true;
			} else {
				retObj.msg = 'keyName：不是字符串';
			}
			return retObj;
		},
		//读取缓存数据
		$baseGetData: function(keyName) {
			var retObj = {
				msg: '',
				status: false,
				data: '',
			};
			var va1 = this.$baseIsTypeof(keyName);
			if (va1 == 'string') {
				var va1 = localStorage.getItem(keyName);
				retObj.msg = '读取缓存成功';
				retObj.status = true;
				retObj.data = JSON.parse(va1);
			} else {
				retObj.msg = 'keyName：不是字符串';
			}
			return retObj;
		},
		/* *********************************时间类型方法***************************/
		// 获取当前时间或时间戳转换成自定义的时间格式
		// @dateSeparator：日期分隔符
		// @timeSeparator：时间分隔符
		// @isShowTime：是否显示时间
		// @ datetime：自定义日期格式
		$baseTimeFormat: function(dateSeparator, timeSeparator, isShowTime, datetime,isShowSecond) {
			dateSeparator = this.$baseIsNullOrEmpty(dateSeparator) ? "-" : dateSeparator;
			timeSeparator = this.$baseIsNullOrEmpty(timeSeparator) ? ":" : timeSeparator;
			isShowTime = (typeof arguments[2] != 'boolean') ? true : arguments[2];
			isShowSecond = (typeof arguments[4] != 'boolean') ? false : arguments[4];
			var now = datetime ? new Date(datetime) : new Date();
			var year = now.getFullYear();
			var month = now.getMonth() + 1;
			var date = now.getDate();
			var hours = now.getHours();
			var minutes = now.getMinutes();
			var seconds = now.getSeconds();

			if (month >= 1 && month <= 9) {
				month = "0" + month;
			}
			if (date >= 0 && date <= 9) {
				date = "0" + date;
			}
			if (hours >= 0 && hours <= 9) {
				hours = "0" + hours;
			}
			if (minutes >= 0 && minutes <= 9) {
				minutes = "0" + minutes;
			}
			if (seconds >= 0 && seconds <= 9) {
				seconds = "0" + seconds;
			}
			var _date = year + dateSeparator + month + dateSeparator + date;
			// var _time = hours + timeSeparator + minutes + timeSeparator + seconds;
			if(isShowSecond){
				 var _time = hours + timeSeparator + minutes + timeSeparator + seconds;
			} else{
			    var _time = hours + timeSeparator + minutes;
			}
			return isShowTime ? (_date + " " + _time) : _date;
		},
		//获取年
		// @ datetime：自定义日期
		$baseTimeGetN: function(datetime) {
			var DateObj = datetime ? new Date(datetime) : new Date();
			return DateObj.getFullYear(); //年

		},
		//获取月
		// @ datetime：自定义日期
		$baseTimeGetY: function(datetime) {
			var DateObj = datetime ? new Date(datetime) : new Date();
			var month = DateObj.getMonth() + 1; //月
			if (month >= 1 && month <= 9) {
				month = "0" + month;
			}
			return month;
		},
		//获取日
		// @ datetime：自定义日期
		$baseTimeGetR: function(datetime) {
			var DateObj = datetime ? new Date(datetime) : new Date();
			return DateObj.getDate(); //日
		},
		// 获取当前时间戳或日期转换为时间戳 @value传在则转换，不传在则获取当前，@key 时间分割符不传这默认-为分隔符
		$baseTimeStr: function(value, key) {
			if (value) {
				var time = this.$baseIsNullOrEmpty(key) ? value.replace(new RegExp(key, 'g'), "/") : value.replace(/-/g,
					"/");
				var date = new Date(time);
			} else {
				var date = new Date();
			}
			return date.getTime();
		},
		//计算两个时间差 timeStr1-timeStr2 值得类型=时间戳
		$baseTimeDifference: function(timeStr1, timeStr2) {
			var dateDiff = timeStr1 - timeStr2; //时间差的毫秒数
			var dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000)); //计算出相差天数
			var leave1 = dateDiff % (24 * 3600 * 1000); //计算天数后剩余的毫秒数
			var hours = Math.floor(leave1 / (3600 * 1000)); //计算出小时数
			//计算相差分钟数
			var leave2 = leave1 % (3600 * 1000); //计算小时数后剩余的毫秒数
			var minutes = Math.floor(leave2 / (60 * 1000)); //计算相差分钟数
			//计算相差秒数
			var leave3 = leave2 % (60 * 1000); //计算分钟数后剩余的毫秒数
			var seconds = Math.round(leave3 / 1000);
			var time = '';
			if (dayDiff > 0) {
				time = dayDiff + "天 " + hours + "小时 " + minutes + " 分钟";
			} else if (hours > 0) {
				time = hours + "小时 " + minutes + " 分钟";
			} else if (minutes > 0) {
				time = minutes + " 分钟";
			} else {
				time = 0 + " 分钟";
			}
			return time;
			//console.log(" 相差 " + dayDiff + "天 " + hours + "小时 " + minutes + " 分钟" + seconds + " 秒")
		},
		/*评论时间转换--传时间戳，$baseTimeFormat 以秒为单位*/
		$baseTimeGetDateDiff: function(publishTime, timeStatus) {
			var val = publishTime;
			var now, difference;
			now = this.$baseTimeNowInt();
			difference = now - val;
			if (difference <= 0) { //1秒内
				return '刚刚';
				//			return difference + '秒前';
			} else if (difference < 60) { //1分钟内
				return difference + '秒前';
			} else if (difference < 60 * 60) { //1小时内
				return parseInt(difference / 60) + '分钟前';
				//return parseInt(difference / 60) + '分' + parseInt(difference % 60) + '秒前';
			} else if (this.$baseTimeDate('d', val) === this.$baseTimeDate('d', now) && this.$baseTimeDate('Y', val) === this.$baseTimeDate(
					'Y', now) && this.$baseTimeDate('m', val) ===
				this.$baseTimeDate('m', now)) { //当天
				return parseInt(difference / 3600) + '小时前';
				//return this.$baseTimeDate('H:i', val);
			} else if (parseInt(this.$baseTimeDate('d', val)) + 1 === parseInt(this.$baseTimeDate('d', now)) && this.$baseTimeDate(
					'Y', val) === this.$baseTimeDate('Y',
					now) && this.$baseTimeDate('m', val) === this.$baseTimeDate('m', now)) { //1天以上2天内
				return '昨天 ' + this.$baseTimeDate('H:i', val);
			} else if (this.$baseTimeDate('Y', val) === this.$baseTimeDate('Y', now)) { //当年
				if (timeStatus) {
					return this.$baseTimeDate('m-d H:i', val);
				} else {
					return this.$baseTimeDate('m-d', val);
				}
			} else { //不是当年
				if (timeStatus) {
					return this.$baseTimeDate('Y-m-d H:i:s', val);
				} else {
					return this.$baseTimeDate('Y-m-d', val);
				}

			}
		},
		// 时间格式化 2019-09-08
		$baseTimeFormatYMD(time) {
			var time2 = time || new Date();
			if (time2) {
				let year = time2.getFullYear();
				let month = time2.getMonth() + 1;
				let day = time2.getDate();
				return year + '-' + this.$baseTimeAddNum(month) + '-' + this.$baseTimeAddNum(day)
			} else {
				return '参数不能为空'
			}
		},
    /* 获取今天星期几 time-2015-7-12*/
    $baseTimeGetMyDay:function(time){
      var data=time?new Date(time):new Date();
      var week;
      if(date.getDay()==0) week="周日"
      if(date.getDay()==1) week="周一"
      if(date.getDay()==2) week="周二"
      if(date.getDay()==3) week="周三"
      if(date.getDay()==4) week="周四"
      if(date.getDay()==5) week="周五"
      if(date.getDay()==6) week="周六"
      return week;
    },
		// 转换时间日期格式
		$baseTimeAddNum(m) {
			return m < 10 ? '0' + m : m
		},
		//获取当前时间戳(毫秒)
		$baseTimeNow: function() {
			return (new Date()).getTime();
		},
		//获取当前时间戳(秒)
		$baseTimeNowInt: function() {
			return parseInt(this.$baseTimeNow() / 1000);
		},
		//将时间戳格式化(规则与php的格式化时间相同)
		$baseTimeDate: function(format, timestamp) {
			var a, jsdate = ((timestamp) ? new Date(timestamp * 1000) : new Date());
			var pad = function(n, c) {
				if ((n = n + "").length < c) {
					return new Array(++c - n.length).join("0") + n;
				} else {
					return n;
				}
			};
			var txt_weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

			var txt_ordin = {
				1: "st",
				2: "nd",
				3: "rd",
				21: "st",
				22: "nd",
				23: "rd",
				31: "st"
			};

			var txt_months = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September",
				"October", "November", "December"
			];

			var f = {
				// Day
				d: function() {
					return pad(f.j(), 2);
				},
				D: function() {
					t = f.l();
					return t.substr(0, 3);
				},
				j: function() {
					return jsdate.getDate();
				},
				l: function() {
					return txt_weekdays[f.w()];
				},
				N: function() {
					return f.w() + 1;
				},
				S: function() {
					return txt_ordin[f.j()] ? txt_ordin[f.j()] : 'th';
				},
				w: function() {
					return jsdate.getDay();
				},
				z: function() {
					return (jsdate - new Date(jsdate.getFullYear() + "/1/1")) / 864e5 >> 0;
				},

				// Week
				W: function() {
					var a = f.z(),
						b = 364 + f.L() - a;
					var nd2, nd = (new Date(jsdate.getFullYear() + "/1/1").getDay() || 7) - 1;

					if (b <= 2 && ((jsdate.getDay() || 7) - 1) <= 2 - b) {
						return 1;
					} else {

						if (a <= 2 && nd >= 4 && a >= (6 - nd)) {
							nd2 = new Date(jsdate.getFullYear() - 1 + "/12/31");
							return date("W", Math.round(nd2.getTime() / 1000));
						} else {
							return (1 + (nd <= 3 ? ((a + nd) / 7) : (a - (7 - nd)) / 7) >> 0);
						}
					}
				},

				// Month
				F: function() {
					return txt_months[f.n()];
				},
				m: function() {
					return pad(f.n(), 2);
				},
				M: function() {
					t = f.F();
					return t.substr(0, 3);
				},
				n: function() {
					return jsdate.getMonth() + 1;
				},
				t: function() {
					var n;
					if ((n = jsdate.getMonth() + 1) == 2) {
						return 28 + f.L();
					} else {
						if (n & 1 && n < 8 || !(n & 1) && n > 7) {
							return 31;
						} else {
							return 30;
						}
					}
				},

				// Year
				L: function() {
					var y = f.Y();
					return (!(y & 3) && (y % 1e2 || !(y % 4e2))) ? 1 : 0;
				},
				//o not supported yet
				Y: function() {
					return jsdate.getFullYear();
				},
				y: function() {
					return (jsdate.getFullYear() + "").slice(2);
				},

				// Time
				a: function() {
					return jsdate.getHours() > 11 ? "pm" : "am";
				},
				A: function() {
					return f.a().toUpperCase();
				},
				B: function() {
					// peter paul koch:
					var off = (jsdate.getTimezoneOffset() + 60) * 60;
					var theSeconds = (jsdate.getHours() * 3600) +
						(jsdate.getMinutes() * 60) +
						jsdate.getSeconds() + off;
					var beat = Math.floor(theSeconds / 86.4);
					if (beat > 1000) beat -= 1000;
					if (beat < 0) beat += 1000;
					if ((String(beat)).length == 1) beat = "00" + beat;
					if ((String(beat)).length == 2) beat = "0" + beat;
					return beat;
				},
				g: function() {
					return jsdate.getHours() % 12 || 12;
				},
				G: function() {
					return jsdate.getHours();
				},
				h: function() {
					return pad(f.g(), 2);
				},
				H: function() {
					return pad(jsdate.getHours(), 2);
				},
				i: function() {
					return pad(jsdate.getMinutes(), 2);
				},
				s: function() {
					return pad(jsdate.getSeconds(), 2);
				},
				//u not supported yet

				// Timezone
				//e not supported yet
				//I not supported yet
				O: function() {
					var t = pad(Math.abs(jsdate.getTimezoneOffset() / 60 * 100), 4);
					if (jsdate.getTimezoneOffset() > 0) t = "-" + t;
					else t = "+" + t;
					return t;
				},
				P: function() {
					var O = f.O();
					return (O.substr(0, 3) + ":" + O.substr(3, 2));
				},
				//T not supported yet
				//Z not supported yet

				// Full Date/Time
				c: function() {
					return f.Y() + "-" + f.m() + "-" + f.d() + "T" + f.h() + ":" + f.i() + ":" + f.s() + f.P();
				},
				//r not supported yet
				U: function() {
					return Math.round(jsdate.getTime() / 1000);
				}
			};

			return format.replace(/[\\]?([a-zA-Z])/g, function(t, s) {
				var ret;
				if (t != s) {
					// escaped
					ret = s;
				} else if (f[s]) {
					// a date function exists
					ret = f[s]();
				} else {
					// nothing special
					ret = s;
				}
				return ret;
			});
		},
		/* *********************************判断类型的方法***************************/
		// 判断是否是数组
		// @arr：数组对象
		$baseIsArray: function(arr) {
			return toString.apply(arr) === '[object Array]';
		},
		//判断类型number、string、boolean、undefined、null、arr，obj、function
		$baseIsTypeof: function(is) {
			var value = typeof is;
			if (value == 'object') {
				var valArr = this.$baseIsArray(is);
				if (valArr) {
					return 'arr';
				} else {
					return 'obj';
				}
			} else {
				return value;
			}
		},
		// 判断对象是否是一个元素
		// @obj：对象
		$baseIsElement: function(obj) {
			return !!(obj && obj.nodeType == 1);
		},
		// 判断对象是否是空对象
		// @obj：对象
		$baseIsEmptyObject: function(obj) {
			if (JSON.stringify(obj) === '{}') {
				return true;
			}
			return false;
		},
		//判断字符串是否存在
		// @str：字符串 @val 目标值
		$baseIsIndexOf: function(str, val) {
			if (str.indexOf(val) != -1) {
				return true;
			} else {
				return false;
			}
		},
		// 判断是否为null，或者为空
		// @str：字符串
		$baseIsNullOrEmpty: function(str) {
			return (str == null || str == undefined || this.$baseStrTrim(str) == "") ? true : false;
		},
		// 判断是否为null，或者undefined
		// @str：字符串
		$baseIsNullOrUndefined: function(str) {
			return (str == null || str == undefined) ? true : false;
		},
		/* *************************************数字类型的方法****************************/
		// 生成唯一字符串
		newGuid: function () {
			function S4() {
				return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
			}
			return (S4() + S4() + S4() + S4() + S4() + S4() + S4() + S4());
		},
		//获取指定长度的随机数
		$baseNubRandom: function(val) {
			var number = val || 32;
			var date = new Date();
			var timeStr = new Date().toLocaleString() + ''; //获取时间戳
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
		// 阿拉伯数字转成大写
		// 精度只限于正整数（后期再优化）
		$baseNubToChinese: function(num) {
			var num = parseInt(num);
			var overWan = Math.floor(num / 10000);
			var noWan = num % 10000;
			if (noWan.toString().length < 4) noWan = '0' + noWan;

			return overWan ? this.getWan(overWan) + '万' + this.getWan(noWan) : this.getWan(num);
		},
		getWan: function(temp) {
			var changeNum = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']; //changeNum[0] = "零"
			var unit = ['', '十', '百', '千', '万'];
			var strArr = temp.toString().split('').reverse();
			var newNum = '';
			for (var i = 0; i < strArr.length; i++) {
				newNum = (i == 0 && strArr[i] == 0 ? '' : i > 0 && strArr[i] == 0 && strArr[i - 1] == 0 ? '' : changeNum[
						strArr[i]] +
					(strArr[i] == 0 ? unit[0] : unit[i])) + newNum;
			}
			return newNum;
		},
		/* 不四舍五入--保留若干位小数  nub=2保留两位小数 */
		$baseNubToFixedPrice: function(value, nub = 2) {
			var key = Math.pow(10, nub); //10的若干次方
			if (value < 0) {
				var value1 = Math.abs(value); //取绝对值
				return -Math.floor(value1 * key) / key;
			} else if (value == 0) {
				return 0
			} else if (value > 0) {
				return Math.floor(value * key) / key;
			}
		},
		/* **************************字符串类型的方法*************************************/
		// 字符串转json对象
		// @str：字符串
		$baseStrToJson: function(str) {
			if (typeof str === 'string') {
				return JSON && JSON.parse(str);
			}
		},
		// json对象转字符串
		// @obj：字符串
		$baseobjTostr: function(obj) {
			if (typeof obj === 'object') {
				return JSON && JSON.stringify(obj);
			}
		},
		// 去掉字符串首尾空格
		// @str：字符串
		$baseStrTrim: function(str) {
			if (String.prototype.trim) {
				return str == null ? "" : String.prototype.trim.call(str);
			} else {
				return str.replace(/(^\s*)|(\s*$base)/g, "");
			}
		},
		// 去掉字符串所有空格
		// @str：字符串
		$baseStrTrimAll: function(str) {
			return str.replace(/\s*/g, '');
		},
		//分割字符串 @目标字符串 @key 用什么去分割字符串
		$baseStrSplit: function(str, key) {
			return str.split(key);
		},
		//截取字符串 val=值，index=开始的下标,leg=要截取的长度
		$baseStrSubstr(obj) {
			let {
				val = '',
					index = 0,
					leg = 2,
			} = obj;
			return obj.val.substr(obj.index, obj.leg);
		},
		/* ***************************数组类型的方法***************************/
		/*获取数组 某个值的下标号 */
		$baseArrExchange: function(arr, key, value) {
      for (var i = 0; i < arr.length; i++) {
        var itmeVal = ''
        if (key) {
          itmeVal = arr[i][key];
        } else {
          itmeVal = arr[i];
        }
        if (itmeVal == value) {
          return {
            itme: arr[i],
            index: i + ''
          };
        }
      };
      return {
        itme: null,
        index: null
      };
    },
		//根据条件去筛选出一个新的数组
		// @arr：目标数组
		//@type：根据什么去筛选数组 index 或id(字符型)
		//@value:值
		//status:true 筛选相同的数组 ，false，查找不同的数组
		$baseArrFilter: function(arr, type, value, status) {
			var newArr1 = []; //不同
			var newArr2 = []; //相同
			for (var i = 0; i < arr.length; i++) {
				switch (type) {
					case 'index':
						if (value != i) {
							newArr1.push(arr[i])
						} else {
							newArr2.push(arr[i])
						}
						break;
					case 'null':
						if (value != arr[i]) {
							newArr1.push(arr[i])
						} else {
							newArr2.push(arr[i])
						}
						break;
					default:
						if (value != arr[i][type]) {
							newArr1.push(arr[i])
						} else {
							newArr2.push(arr[i])
						}
						break;
				};
			};
			if (status) {
				return newArr2;
			} else {
				return newArr1;
			}
		},
		// 数组转成字符串@arr目标数组@type 以什么分割数组
		$baseArrJoin: function(arr, type) {
			return arr.join(type);
		},
		//将数组倒叙（反转）
		$baseArrReverse2: function(arr) {
			return arr.reverse();
		},
		//往数组头部添加数据;@arr目标数组@itme 数据
		$baseArrUnshift: function(arr, itme) {
			arr.unshift(itme);
			return arr;
		},
		/* 求数组中的最大值或最小值*/
		$baseArrMaxMin: function(arr, key) {
			var obj = {
				max: 0,
				min: 0,
			};
			if (key) {
				var newArr = []
				for (var i = 0; i < arr.length; i++) {
					var val = arr[i][key];
					val = Number(val);
					newArr.push(val);
					obj.max = Math.max.apply(null, newArr);
					obj.min = Math.min.apply(null, newArr);
				};
			} else {
				obj.max = Math.max.apply(null, arr);
				obj.min = Math.min.apply(null, arr);
			};
			return obj;
		},
		/* 升降序*/
		$baseArrReverse: function(arr, type, key) {
			if (type) {
				if (key) {
					return arr.sort((a, b) => a[key] - b[key]); //升序
				} else {
					return arr.sort((a, b) => a - b); //升序
				};

			} else {
				if (key) {
					return arr.sort((a, b) => a[key] - b[key]).reverse(); //结合reverse(),成功实现降序排列
				} else {
					return arr.sort((a, b) => a - b).reverse(); //结合reverse(),成功实现降序排列
				};
			};
		},
		/* ***************************DOM类型的方法***************************/
		// 为DOM元素绑定事件
		// @el：DOM元素
		// @name：事件名称
		// @fn：事件处理函数
		// @useCapture：是否捕获事件
		$baseDomAddEvt: function(el, name, fn, useCapture) {
			if (!this.$baseIsElement(el)) {
				//console.warn('$baseapi.addEvt Function need el param, el param must be DOM Element');
				return;
			}
			useCapture = useCapture || false;
			if (el.addEventListener) {
				el.addEventListener(name, fn, useCapture);
			}
		},
		// 为DOM元素移除事件
		// @el：DOM元素
		// @name：事件名称
		// @fn：事件处理函数
		// @useCapture：是否捕获事件
		$baseDomRmEvt: function(el, name, fn, useCapture) {
			if (!this.$baseIsElement(el)) {
				//console.warn('$baseapi.rmEvt Function need el param, el param must be DOM Element');
				return;
			}
			useCapture = useCapture || false;
			if (el.removeEventListener) {
				el.removeEventListener(name, fn, useCapture);
			}
		},
		// 为DOM绑定事件，但该事件只执行一次
		// @el：DOM元素
		// @name：事件名称
		// @fn：事件处理函数
		// @useCapture：是否捕获事件
		$baseDomOne: function(el, name, fn, useCapture) {
			if (!this.$baseIsElement(el)) {
				//console.warn('$baseapi.one Function need el param, el param must be DOM Element');
				return;
			}
			useCapture = useCapture || false;
			var that = this;
			var cb = function() {
				fn && fn();
				that.$baseDomRmEvt(el, name, cb, useCapture);
			};
			that.$baseDomAddEvt(el, name, cb, useCapture);
		},
		// 选择第一个匹配的DOM元素
		// @el：DOM元素
		// @selector：CSS选择器
		$baseDomClass: function(el, selector) {
			if (arguments.length === 1 && typeof arguments[0] == 'string') {
				if (document.querySelector) {
					return document.querySelector(arguments[0]);
				}
			} else if (arguments.length === 2) {
				if (el.querySelector) {
					return el.querySelector(selector);
				}
			}
		},
		// 选择所有匹配的DOM元素
		// @el：DOM元素
		// @selector：CSS选择器
		$baseDomAllClass: function(el, selector) {
			if (arguments.length === 1 && typeof arguments[0] == 'string') {
				if (document.querySelectorAll) {
					return document.querySelectorAll(arguments[0]);
				}
			} else if (arguments.length === 2) {
				if (el.querySelectorAll) {
					return el.querySelectorAll(selector);
				}
			}
		},
		// 根据ID选择DOM元素
		// @id：ID
		$baseDomById: function(id) {
			return document.getElementById(id);
		},
		// 选择第几个元素
		// @el：DOM元素
		// @index：索引
		$baseDomEq: function(el, index) {
			return this.domClass(el, ':nth-child(' + index + ')');
		},

		// 获取元素在页面中的位置与宽高，(此为距离页面左侧及顶端的位置，并非距离窗口的位置)
		// @el：DOM元素
		$baseDomOffset: function(el, type) {
			if (!this.$baseIsElement(el)) {
				//console.warn('$baseapi.offset Function need el param, el param must be DOM Element');
				return;
			}
			if (type) { //是否加上滚动条距离
				var sl = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft);
				var st = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
			} else {
				var sl = 0;
				var st = 0;
			}
			var rect = el.getBoundingClientRect();
			return {
				l: rect.left + sl,
				t: rect.top + st,
				w: el.offsetWidth,
				h: el.offsetHeight
			};
		},
		// 设置所传入的DOM元素的样式，可传入多条样式
		// @el：DOM元素
		// @css：想要设置的CSS样式
		$baseDomCss: function(el, css) {
			if (!this.$baseIsElement(el)) {
				//console.warn('$baseapi.css Function need el param, el param must be DOM Element');
				return;
			}
			if (typeof css == 'string' && css.indexOf(':') > 0) {
				el.style && (el.style.cssText += ';' + css);
			}
		},
		// 滚动到文档底部
		$baseDomScrollToDocButton: function() {
			document.getElementsByTagName('body')[0].scrollTop = document.getElementsByTagName('body')[0].scrollHeight;
		},
	}
}
