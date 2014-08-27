/*
window.onload = function() {
	Utils.validate(
		{
			dd : {
				require : true,
				minLen : 5,
				tipId : "ddTip"
			},
			cc : {
				require : true,
				maxLen : 5
			}
		},
		{
			dd : {
				require : "pls enter",
				minLen : "min len"
			},
			cc : {
				require : "p e",
				maxLen : "max len"
			}
		},
		{
			okCls : "ok",
			okTip : "sb",
			errCls : "err"
		}
	);
};
*/
var Utils = (function(mod) {

	mod.defaultRegExp = {
		email : /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/,
		url : /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/,
		date : /\d{4}[年|\-|\.]\d{\1-\12}[月|\-|\.]\d{\1-\31}日?/,
		creditCard : /^((?:4\d{3})|(?:5[1-5]\d{2})|(?:6011)|(?:3[68]\d{2})|(?:30[012345]\d))[ -]?(\d{4})[ -]?(\d{4})[ -]?(\d{4}|3[4,7]\d{13})$/,
		mobile : /^1[3|5|8][0-9]\d{8}$/,
		postCode : /[1-9]\d{5}(?!\d)/,
		phone : /((\(\d{3}\)|\d{3}-)|(\(\d{4}\)|\d{4}-))?(\d{8}|\d{7})/,
		QQ : /[1-9][0-9]\{4,13}/,
		IP : /((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)/,
		letter :/^[A-Za-z]+$/,
		capLetter : /^[A-Z]+$/,
		lowLetter : /^[a-z]+$/,
		ID : /^[1-9]([0-9]{16}|[0-9]{13})[xX0-9]$/
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
	
	mod.defaultFn = function(tip, msg, cls) {
		tip.innerHTML = msg;
		tip.className = cls;
		return false;
	};
	
	mod.require = function(tip, val, msg, errCls) {
		return !val ? $fn(tip, msg, errCls) : true;
	};
	
	mod.regExp = function(tip, val, type, msg, errCls) {
		return !$regExp[type].test(val) ? $fn(tip, msg, errCls) : true;
	};
	
	mod.number = function(tip, val, num, msg, errCls) {
		return ~~val !== num ? $fn(tip, msg, errCls) : true;
	};
	
	mod.numberOnly = function(tip, val, len, msg, errCls) {
		return !new RegExp("^\\d{" + len + "}$").test(~~val) ? 
				$fn(tip, msg, errCls) : true;
	};
	
	mod.numberRange = function(tip, val, len, range, msg, errCls) {
		return !(new RegExp("^\\d{" + len + "}$").test(~~val) && 
				len >= range[0] && len <= range[1]) ? $fn(tip, msg, errCls) : true;
	};
	
	mod.equalTo = function(tip, val, equalTo, msg, errCls) {
		var target = mod.$(equalTo);
		return val !== target.value ? $fn(tip, msg, errCls) : true;
	};
	
	mod.maxLen = function(tip, len, maxLen, msg, errCls) {
		return len > maxLen ? $fn(tip, msg, errCls) : true;
	};
	
	mod.minLen = function(tip, len, minLen, msg, errCls) {
		return len <minLen ? $fn(tip, msg, errCls) : true;
	};
	
	mod.range = function(tip, val, range, msg, errCls) {
		return !new RegExp("^\[" + range[0] + "-" + range[1] + "\]$").test(val) ?
				$fn(tip, msg, errCls) : true;
	};
	
	mod.rangeLength = function(tip, len, range, msg, errCls) {
		return !(len >= range[0] && len <= range[1]) ?
				$fn(tip, msg, errCls) : true;
	};
	
	mod.max = function(tip, val, max, msg, errCls) {
		return ~~val > max ? $fn(tip, msg, errCls) : true;
	};
	
	mod.min = function(tip, val, min, msg, errCls) {
		return ~~val < min ? $fn(tip, msg, errCls) : true;
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
			  //校验附加
			  okCls = addition.okCls || {},
			  okTip = addition.okTip || {},
			  errCls = addition.errCls || {},			 
			  handler = addition.fire || "blur";
		//触发代理事件	  
		mod.delegate(id, handler, function(e) {
			var target = mod.getTarget(e),
				  val = target.value,
				  len = val.length,
				  tip = mod.$(tipId);
				  
			if (require && !mod.require(tip, val, requireMsg, errCls)) return false;
			if (number && !mod.number(tip, val, number, numberMsg, errCls)) return false;
			if (numberOnly && !mod.numberOnly(tip, val, len, numberOnlyMsg, errCls)) return false;
			if (numberRange && !mod.numberRange(tip, val, len, numberRange, numberRangeMsg, errCls)) return false;
			if (equalTo && !mod.equalTo(tip, val, equalTo, equalToMsg, errCls)) return false;
			if (maxLen && !mod.maxLen(tip, val, maxLen, maxLenMsg, errCls)) return false;
			if (minLen && !mod.minLen(tip, val, minLen, minLenMsg, errCls)) return false;
			if (rangeLength && !mod.rangeLength(tip, val, rangeLength, rangeLengthMsg, errCls)) return false;
			if (range && !mod.range(tip, val, range, rangeMsg, errCls)) return false;
			if (max && !mod.max(tip, val, max, maxMsg, errCls)) return false;
			if (min && !mod.min(tip, val, min, minMsg, errCls)) return false;
			if (email && !mod.regExp(tip, val, "email", emailMsg, errCls)) return false;
			if (url && !mod.regExp(tip, val, "url", urlMsg, errCls)) return false;
			if (date && !mod.regExp(tip, val, "date", dateMsg, errCls)) return false;
			if (creditCard && !mod.regExp(tip, val, "creditCard", creditCardMsg, errCls)) return false;
			if (mobile && !mod.regExp(tip, val, "mobile", mobileMsg, errCls)) return false;
			if (postCode && !mod.regExp(tip, val, "postCode", postCodeMsg, errCls)) return false;
			//校验通过显示内容
			$fn(tip, okTip, okCls);
		});
	};	
	
	mod.validate = function() {
	
		var options = arguments[0] || {},
			  msg = arguments[1] || {},
			  addition = arguments[2] || {};
		//遍历校验元素
		for (i in options) {
			mod.chkTar(i, options[i], msg[i], addition);
		}	
	};
	
	var $regExp = mod.defaultRegExp,
		  $msg = mod.defaultMsg,
		  $fn = mod.defaultFn;
	
	return mod;
}) (Utils || {});
