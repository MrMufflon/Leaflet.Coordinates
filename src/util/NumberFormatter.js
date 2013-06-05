L.NumberFormatter = {
	round: function (num,dec,sep) {
		var res = L.Util.formatNum(num,dec)+"",
		numbers=res.split(".");
		if (numbers[1]) {
			var d = dec-numbers[1].length;
			for (; d > 0; d--) {
				numbers[1]+="0";
			}
			res = numbers.join(sep||".");
		}
		return res;
	},

	createValidNumber:function(num,sep){
		if (num&&num.length>0){
			var numbers = num.split(sep||".");
			try{
				var numRes=Number(numbers.join("."));
				if(isNaN(numRes)){
					return undefined;
				}
				return numRes;
			}catch(e){
				return undefined;
			}
		}
		return undefined;
	}
};