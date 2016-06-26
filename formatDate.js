function formatDate(repStr, dateObj) {
	var date = new Date();
	var retStr = '';
	
	function padDate(num) {
		return (num.toString().length === 1 ? '0' : '') + num;
	}
	
	function amOrPm(hour) {
		return (hour > 12) ? 'pm' : 'am';
	}
	
	function get12h(hour24) {
		if (hour24 === 0) return {h: 12, s: 'pm'}; else if (hour24 <= 12) return {h: hour24, s: 'am'}; else return {h: hour24 - 12, s: 'pm'}
	}
	
	function getZone(delta) {
		var zone = {
			sign: ((delta <= 0) ? '+' : '-'),
			h: padDate(Math.floor(Math.abs(delta / 60))),
			m: padDate(Math.abs(delta) % 60)
		}
		return zone;
	}
	
	function leapYear(yr) {
		if (yr / 4 !== Math.floor(yr / 4)) return false;
		if (yr / 100 !== Math.floor(yr / 100)) return true;
		if (yr / 400 !== Math.floor(yr / 400)) return false;
		return true;
	}
	
	var commonNames = {
		daysInMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
	}
	var engNames = {
		week: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
		month: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
		suffix: ['', 'st', 'nd', 'rd', 'th']		
	}
	
	var replacements = {
		j : function() {return date.getDate()},
		d : function() {return padDate(date.getDate())},
		w : function() {return date.getDay()},
		N : function() {return (date.getDay() === 0) ? 7 : date.getDay()},
		Y : function() {return date.getFullYear()},
		y : function() {return date.getFullYear().toString().substr(2,2)},
		G : function() {return date.getHours()},
		H : function() {return padDate(date.getHours())},
		g : function() {return get12h(date.getHours()).h},
		h : function() {return padDate(get12h(date.getHours()).h)},
		a : function() {return get12h(date.getHours()).s},
		A : function() {return get12h(date.getHours()).s.toString().toUpperCase()},
		u : function() {return date.getMilliseconds() * 1000},
		i : function() {return padDate(date.getMinutes())},
		s : function() {return padDate(date.getSeconds())},
		U : function() {return Math.floor(date.getTime() / 1000)},
		O : function() {var zone = getZone(date.getTimezoneOffset()); return zone.sign + zone.h + zone.m},
		P : function() {var zone = getZone(date.getTimezoneOffset()); return zone.sign + zone.h + ':' + zone.m},
		Z : function() {return date.getTimezoneOffset() * 60},
		c : function() {var d = new Date(date.getTime()); d.setTime(date.getTime() - (date.getTimezoneOffset()*60000)); return d.toISOString().substr(0,19) + replacements.P()},
		R : function() {var d = new Date(date.getTime()); d.setTime(date.getTime() - (date.getTimezoneOffset()*60000)); return d.toUTCString().substr(0,26) + replacements.O()},
		l : function() {return engNames.week[date.getDay()]},
		D : function() {return engNames.week[date.getDay()].substr(0, 3)},
		S : function() {return (date.getDate() > 4) ? engNames.suffix[4] : engNames.suffix[date.getDate()]},
		n : function() {return date.getMonth() + 1},
		m : function() {return padDate(date.getMonth() + 1)},
		F : function() {return engNames.month[date.getMonth()]},
		M : function() {return engNames.month[date.getMonth()].substr(0, 3)},
		L : function() {return (leapYear(date.getFullYear())) ? 1 : 0},
		t : function() {return (leapYear(date.getFullYear()) && date.getMonth() === 1) ? 29 : commonNames.daysInMonth[date.getMonth()]},
		z : function() {var d = date.getDate() - 1; commonNames.daysInMonth.slice(0, date.getMonth()).forEach(function(md) {d += md}); if (leapYear(date.getFullYear()) && date.getMonth() > 0) d += 1; return d},
		W : function() {return Math.floor((replacements.z() + 1 - replacements.N() + 10) / 7)},
		o : function() {var d = 0;if (replacements.N() >= 5 && date.getMonth() === 1 && date.getDate() <= 3) d = -1;if (replacements.N() <= 4 && date.getMonth() === 12 && date.getDate() >= 28) d = 1;return date.getFullYear() + d;},
		B : function() {var b = Math.floor((((date.getUTCHours()+1) * 3600) + (date.getUTCMinutes() * 60) + date.getUTCSeconds()) / 86.4);return (b > 999) ? b - 1000 : b}
	}
	
	if (typeof dateObj === 'object') {
		if (typeof dateObj.str === 'string') date.setTime(Date.parse(dateObj.str));
		
		var setObj = {
			th: function(){date.setHours(dateObj.th)},
			tm: function(){date.setMinutes(dateObj.tm)},
			ts: function(){date.setSeconds(dateObj.ts)},
			dd: function(){date.setDate(dateObj.dd)},
			dm: function(){date.setMonth(dateObj.dm + 1)},
			dy: function(){date.setFullYear(dateObj.dy)}
		}
		
		for (var setting in setObj) if (typeof dateObj[setting] === 'number') {setObj[setting]();}
	}
	
	repStr.split('').forEach(function(chr) {retStr += (typeof replacements[chr] === 'function') ? replacements[chr]() : chr;});
	
	return retStr;
}
