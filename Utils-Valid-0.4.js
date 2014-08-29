/*!
 * Utils Validate v0.2
 * Copyright (c) 2014 arnold
 */
var Utils = (function(mod) {

	mod.defaultRegExp = {
		email : /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/,
		url : /^(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/,
		date : /^\d{4}[年|\-|\.]\d{\1-\12}[月|\-|\.]\d{\1-\31}日?$/,
		creditCard : /^((?:4\d{3})|(?:5[1-5]\d{2})|(?:6011)|(?:3[68]\d{2})|(?:30[012345]\d))[ -]?(\d{4})[ -]?(\d{4})[ -]?(\d{4}|3[4,7]\d{13})$/,
		mobile : /^1[3|5|8][0-9]\d{8}$/,
		postCode : /^[1-9]\d{5}(?!\d)$/,
		phone : /^((\(\d{3}\)|\d{3}-)|(\(\d{4}\)|\d{4}-))?(\d{8}|\d{7})$/,
		QQ : /^[1-9][0-9]{4,13}$/,
		IP : /^((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)$/,
		letter :/^[A-Za-z]+$/,
		capLetter : /^[A-Z]+$/,
		lowLetter : /^[a-z]+$/,
		ID : /^[1-9]([0-9]{16}|[0-9]{13})[xX0-9]$/,
		chkAllVal : /^(require|numberOnly|numberRange|email|url|date|creditCard|mobile|postCode|phone|QQ|IP|letter|capLetter|lowLetter|ID|number|equalTo|range|max|min|maxLen|minLen|rangeLength|tipId)$/,
		chkRegExp : /^(email|url|date|creditCard|mobile|postCode|phone|QQ|IP|letter|capLetter|lowLetter|ID)$/,
		chkOtherVal : /^(number|equalTo|range|max|min)$/,
		chkLenVal : /^(maxLen|minLen|rangeLength)$/
	};

	mod.defaultMsg = {
		require : "必须填写",
		email : "请输入有效的电子邮件",
		url : "请输入有效的网址",
		date : "请输入有效的日期",
		number : "请输入正确的数字",
		numberOnly : "只可输入数字",
		numberRange : "只可输入指定位数的数字",
		creditCard : "请输入有效的信用卡号码",
		equalTo : "你的输入不相同",
		mobile : "请输入正确手机号",
		postCode : "请输入正确邮编",
		maxLen : "超过规定的输入长度",
		minLen : "未到规定的输入长度",
		rangeLength : "不符合输入长度范围",
		range : "请输入范围内的数",
		max : "输入值过大",
		min : "输入值过小",
		
		phone : "请输入正确的固定电话号码",
		QQ : "请输入正确的QQ号",
		IP : "请输入正确的IP地址",
		letter : "请输入英文字母",
		capLetter : "请输入大写英文字母",
		lowLetter : "请输入小写英文字母",
		ID : "请输入正确的身份证号"
	};
	
	mod.defaultVal = {
		okCls : "ok",
		errCls : "err",
		okMsg : "okMsg"		
	};
	
	mod.getEvent = function(e) {
		return e || window.event;
	};

	mod.getTarget = function(e) {
		e = mod.getEvent(e);
		return e.srcElement || e.target;
	};
	
	mod.$ = function(id) {
		return document.getElementById(id);
	};
	
	mod.hasClass = function(tagStr, classStr) {
		var arr = tagStr.className.split(/\s+/);
		for (var i = 0; i < arr.length; i++) {
			if (arr[i] === classStr) {
				return true;
			}
		}
		return false;
	};
	
	mod.removeClass = function(id, classStr) {  
		var obj = document.getElementById(id);
		if (mod.hasClass(obj, classStr)) {  
			var reg = new RegExp('(\\s|^)' + classStr + '(\\s|$)');  
			obj.className = obj.className.replace(reg, ' ');  
		}  
	};  
	
	mod.addClass = function(id, newClass) {
		var target = document.getElementById(id),
			  classes = target.className.split(" ");
		if (!mod.hasClass(target, newClass)) {
			classes.push(newClass);
			target.className = classes.join(" ");
		}
	};

	mod.addEvent = function(id, handler, fn, capture) {
		capture = capture || false;
		var target = document.getElementById(id);
		if (target) {
			if (window.attachEvent) {
				target.attachEvent("on" + handler, fn);
			}else if (window.addEventListener){
				target.addEventListener(handler, fn, capture);
			}else {
				target["on" + handler] = fn;
			}
		}else {
			return false;
		}
	};
	
	mod.delegate = function(id, handler, fn) {
		return mod.addEvent(id, handler, fn);
	};
	
	mod.defaultFn = function(tip, msg) {
		mod.$(tip).innerHTML = msg;
		mod.addClass(tip, $val.errCls);
		mod.removeClass(tip, $val.okCls);
		return false;
	};
	
	mod.okFn = function(tip, msg) {
		mod.$(tip).innerHTML = msg;
		mod.addClass(tip, $val.okCls);
		mod.removeClass(tip, $val.errCls);
		return false;
	};
	
	mod.require = function(tip, val, msg) {
		return !val ? $fn(tip, msg) : true;
	};
	
	mod.regExp = function(tip, val, type, msg) {
		return !$regExp[type].test(val) ? $fn(tip, msg) : true;
	};
	
	mod.number = function(tip, val, num, msg) {
		return ~~val !== num ? $fn(tip, msg) : true;
	};
	
	mod.numberOnly = function(tip, val, len, msg) {
		return !new RegExp("^\\d{" + len + "}$").test(~~val) ? 
				$fn(tip, msg) : true;
	};
	
	mod.numberRange = function(tip, val, len, range, msg) {
		return !(new RegExp("^\\d{" + len + "}$").test(~~val) && 
				len >= range[0] && len <= range[1]) ? $fn(tip, msg) : true;
	};
	
	mod.equalTo = function(tip, val, equalTo, msg) {
		var target = mod.$(equalTo);
		return val !== target.value ? $fn(tip, msg) : true;
	};
	
	mod.maxLen = function(tip, len, maxLen, msg) {
		return len > maxLen ? $fn(tip, msg) : true;
	};
	
	mod.minLen = function(tip, len, minLen, msg) {
		return len <minLen ? $fn(tip, msg) : true;
	};
	
	mod.range = function(tip, val, range, msg) {
		return !new RegExp("^\[" + range[0] + "-" + range[1] + "\]$").test(val) ?
				$fn(tip, msg) : true;
	};
	
	mod.rangeLength = function(tip, len, range, msg) {
		return !(len >= range[0] && len <= range[1]) ?
				$fn(tip, msg) : true;
	};
	
	mod.max = function(tip, val, max, msg) {
		return ~~val > max ? $fn(tip, msg) : true;
	};
	
	mod.min = function(tip, val, min, msg) {
		return ~~val < min ? $fn(tip, msg) : true;
	};
	
	mod.chkTar = function(id) {
			
		var options = arguments[1] || {},	//校验主体部分			
			  msg = arguments[2] || {},		//校验提示部分
			  addition = arguments[3] || {},		//校验附加部分		
			  //校验主体参数	
			  require = options.require,
			  email = options.email,
			  url = options.url,
			  date = options.date,
			  number = options.number,
			  numberOnly = options.numberOnly,
			  numberRange = options.numberRange,
			  creditCard = options.creditCard,
			  equalTo = options.equalTo,
			  mobile = options.mobile,
			  postCode = options.postCode,
			  maxLen = options.maxLen,
			  minLen = options.minLen,
			  range = options.range,
			  rangeLength = options.rangeLength,
			  max = options.max,
			  min = options.min,
			  tipId = options.tipId,
			  phone = options.phone,
			  QQ = options.QQ,
			  IP = options.IP,
			  letter = options.letter,
			  capLetter = options.capLetter,
			  lowLetter = options.lowLetter,
			  ID = options.ID,
			  //校验提示
			  requireMsg = msg.require || $msg.require,
			  emailMsg = msg.email || $msg.email,
			  urlMsg = msg.url || $msg.url,
			  dateMsg = msg.date || $msg.date,
			  numberMsg = msg.number || $msg.number,
			  numberOnlyMsg = msg.numberOnly || $msg.numberOnly,
			  numberRangeMsg = msg.numberRange || $msg.numberRange,
			  creditCardMsg = msg.creditCard || $msg.creditCard,
			  equalToMsg = msg.equalTo || $msg.equalTo,
			  mobileMsg = msg.mobile || $msg.mobile,
			  postCodeMsg = msg.postCode || $msg.postCode,
			  maxLenMsg = msg.maxLen || $msg.maxLen,
			  minLenMsg = msg.minLen || $msg.minLen,
			  rangeMsg = msg.range || $msg.range,
			  rangeLengthMsg = msg.rangeLength || $msg.rangeLength,
			  maxMsg = msg.max || $msg.max,
			  minMsg = msg.min || $msg.min,
			  phoneMsg = msg.phone || $msg.phone,
			  QQMsg = msg.QQ || $msg.QQ,
			  IPMsg = msg.IP || $msg.IP,
			  letterMsg = msg.letter || $msg.letter,
			  capLetterMsg = msg.capLetter || $msg.capLetter,
			  lowLetterMsg = msg.lowLetter || $msg.lowLetter,
			  IDMsg = msg.ID || $msg.ID,
			  //校验附加
			  okCls = addition.okCls || {},
			  okTip = addition.okTip || {},
			  errCls = addition.errCls || {},	
			  handler = addition.fire || "blur",
			  defaultArrKey = new Array(),
			  defaultArrValue = new Array();
			  
			  $val.okCls = okCls;
			  $val.errCls = errCls;
			  
		for (var i in options) {
			defaultArrKey.push(i);//require,email,range....
			defaultArrValue.push(options[i]);//true, [1,5],19,....
		}
		
		//触发代理事件	  
		mod.delegate(id, handler, function(e) {
			var target = mod.getTarget(e),
				  val = target.value,
				  len = val.length,
				  tip = tipId,
				  ranMsg;

			for (var i = 0, arrLen = defaultArrKey.length; i < arrLen; i += 1) {			
				//判断验证条件是否符合
				if (!$regExp.chkAllVal.test(defaultArrKey[i])) {
					//alert("parameter entered wrong!");
					alert(defaultArrKey[i]);
					break;
				}
				//tipId是消息显示标签id，不予验证处理
				if (defaultArrKey[i] === "tipId") {
					continue;
				}
				//获取msg变量值
				ranMsg = eval(defaultArrKey[i] + "Msg");
				//判断require = true
				if (defaultArrKey[i] === "require" && 
						!mod.require(tip, val, requireMsg)) {
					break;
				//判断numberOnly = true
				}else if (defaultArrKey[i] === "numberOnly" &&
						!mod.numberOnly(tip, val, len, numberOnlyMsg)) {
					break;
				//判断numberRange = [n, m]
				}else if (defaultArrKey[i] === "numberRange" &&
						!mod.numberRange(tip, val, len, defaultArrValue[i], numberRangeMsg)) {
					break;
				//判断验证类型是否需要正则表达式校验
				}else if ($regExp.chkRegExp.test(defaultArrKey[i]) &&
						!mod.regExp(tip, val, defaultArrKey[i], ranMsg)) {
					break;
				//判断验证类型是否属于maxLen、minLen、rangeLength
				}else if ($regExp.chkLenVal.test(defaultArrKey[i]) &&
						!eval("mod." + defaultArrKey[i])(tip, len, defaultArrValue[i], ranMsg)) {		
					break;
				//判断验证类型是否属于number、equalTo、range、max、min
				}else if ($regExp.chkOtherVal.test(defaultArrKey[i]) &&
						!eval("mod." + defaultArrKey[i])(tip, val, defaultArrValue[i], ranMsg)) {
					break;
				//验证通过显示内容
				}else {				
					mod.okFn(tip, okTip);
				}
			}		
		});
	};	
	
	mod.validate = function() {	
		var args = arguments[0] || {},
			  options = args.rules,////校验主体部分					
			  msg = args.message || {},//校验提示部分
			  addition = args.addition || {};//校验附加部分	
		//遍历校验元素
		for (i in options) {
			mod.chkTar(i, options[i], msg[i], addition);
		}	
	};
	
	var $regExp = mod.defaultRegExp,
		  $msg = mod.defaultMsg,
		  $fn = mod.defaultFn,
		  $val = mod.defaultVal;
	
	return mod;
}) (Utils || {});
/*
window.onload = function() {
	Utils.validate(
	{
		rules :{
			aa : {
				maxLen : 5,
				tipId : "aaTip"
			},
			bb : {
				require : true,
				email : true,
				tipId : "bbTip"
			},
			cc : {
				mobile : true,
				tipId : "ccTip"
			},
			dd : {
				require : true,
				minLen : 5,
				tipId : "ddTip"
			},
			ee : {
				require : true,
				maxLen : 5,
				tipId : "eeTip"
			},
			ff : {
				QQ : true,
				tipId : "ffTip"
			}
		},
		message : {
			aa : {
				maxLen : "max len is 5"
			},
			bb : {
				require : "pls enter",
				email : "email is needed"
			},
			cc : {
				mobile : "mobile is needed"
			},
			dd : {
				require : "pls enter",
				minLen : "min len is 5"
			},
			ee : {
				require : "pls enter",
				maxLen : "max len is 5"
			},
			ff : {
				QQ : "QQ is needed"
			}
		},
		addition: {
			okCls : "ok",
			okTip : "pass",
			errCls : "err"
		}
	});
};
*/
//Object.keys(rules).forEach(function(key) {
//		alert(key);
//});
