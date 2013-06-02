/*
 * L.Control.Coordinates is used for displaying current mouse coordinates on the map.
 */

L.Control.Coordinates = L.Control.extend({
	options: {
		position: 'bottomright',
		decimals:4,
		decimalSeperator:".",
		labelTemplate:"Lat: {x} Lng:{y}"
	},

	onAdd: function (map) {
		this._map = map;

		var className = 'leaflet-control-coordinates',
		    container = this._container= L.DomUtil.create('div', className),
		    options = this.options;

		map.on("mousemove", this._update, this);
		map.whenReady(this._update,this);

		return container;
	},

	onRemove: function (map) {
		map.off("mousemove", this._update, this);
	},

	_update: function (evt) {
		var pos=evt.latlng,
		label="",
		opts = this.options;
		if (pos) {
			label = L.Util.template(opts.labelTemplate, {
				x:this._getRoundNum(pos.lng),
				y:this._getRoundNum(pos.lat),
			});
		} else {
			label = L.Util.template(opts.labelTemplate, {
				x:"",
				y:"",
			});
		}
		this._container.innerHTML = label;
	},

	_getRoundNum: function (num) {
		var opts=this.options,
		decimals = opts.decimals,
		res = L.Util.formatNum(num,decimals)+"",
		numbers=res.split(".");
		if (numbers[1]) {
			var d = decimals-numbers[1].length;
			for (; d > 0; d--) {
				numbers[1]+="0";
			};
			res = numbers.join(opts.decimalSeperator);
		}
		return res;
	}
});

L.control.coordinates = function (options) {
	return new L.Control.Coordinates(options);
};
