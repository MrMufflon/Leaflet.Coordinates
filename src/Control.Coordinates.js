/*
 * L.Control.Coordinates is used for displaying current mouse coordinates on the map.
 */

L.Control.Coordinates = L.Control.extend({
	options: {
		position: 'bottomright',
		decimals:4,
		decimalSeperator:".",
		labelTemplateLat:"Lat: {y}",
		labelTemplateLng:"Lng: {x}",
		enableUserInput:true
	},

	onAdd: function (map) {
		this._map = map;

		var className = 'leaflet-control-coordinates',
			container = this._container = L.DomUtil.create('div', className),
			options = this.options;

		//label containers
		this._labelcontainer = L.DomUtil.create("div", "uiElement label", container);
		this._labelX=L.DomUtil.create("span", "labelX", this._labelcontainer);
		this._labelY=L.DomUtil.create("span", "labelY", this._labelcontainer);


		//input containers
		this._inputcontainer = L.DomUtil.create("div", "uiElement input uiHidden", container);
		L.DomUtil.create("span", "", this._inputcontainer).innerHTML=options.labelTemplateLng.replace("{x}","");
		this._inputX=this._createInput("inputX", this._inputcontainer);
		L.DomUtil.create("span", "", this._inputcontainer).innerHTML=options.labelTemplateLat.replace("{y}","");
		this._inputY=this._createInput("inputY", this._inputcontainer);
		L.DomEvent.on(this._inputX, 'keyup', this._handleKeypress, this);
		L.DomEvent.on(this._inputY, 'keyup', this._handleKeypress, this);

		map.on("mousemove", this._update, this);
		map.on('dragstart', this.collapse, this);

		map.whenReady(this._update,this);

		this._showsCoordinates=true;
		if (options.enableUserInput) {
			L.DomEvent.addListener(this._container, "click",this._switchUI,this);
		}

		return container;
	},

	_createInput : function(classname, container) {
		var input = L.DomUtil.create("input", classname, container);
		input.type="text";
		L.DomEvent.disableClickPropagation(input);
		return input;
	},

	_clearMarker : function() {
		this._map.removeLayer(this._marker);
	},

	_handleKeypress : function(e) {
		switch(e.keyCode)
		{
			case 27: //Esc
				this.collapse();
			break;
			case 13: //Enter
				this._handleSubmit();
				this.collapse();
			break;
			default://All keys
				this._handleSubmit();
			break;
		}
	},

	_handleSubmit : function()  {
		var x = this._createValidInput(this._inputX.value);
		var y = this._createValidInput(this._inputY.value);
		if (x!==undefined&&y!==undefined){
			if (!this._marker){
				var marker = this._marker = L.marker();
				marker.on("click",this._clearMarker,this);
			}
			this._marker.setLatLng(new L.LatLng(y, x));
			this._marker.addTo(this._map);
		}
	},

	_createValidInput:function(num){
		if (num&&num.length>0){
			var numbers = num.split(this.options.decimalSeperator);
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
	},

	expand:function() {
		this._showsCoordinates=false;

		L.DomEvent.addListener(this._container,"mousemove",L.DomEvent.stop);
		L.DomEvent.removeListener(this._container, "click",this._switchUI,this);

		L.DomUtil.addClass(this._labelcontainer, "uiHidden");
		L.DomUtil.removeClass(this._inputcontainer, "uiHidden");
	},

	collapse:function() {
		if (!this._showsCoordinates) {
			this._showsCoordinates=true;
			var opts = this.options;
			L.DomEvent.addListener(this._container, "click",this._switchUI,this);
			L.DomEvent.removeListener(this._container,"mousemove",L.DomEvent.stop);

			L.DomUtil.addClass(this._inputcontainer, "uiHidden");
			L.DomUtil.removeClass(this._labelcontainer, "uiHidden");

			if(this._marker) {
				var m = L.marker(),
				ll=this._marker.getLatLng();
				m.setLatLng(ll);

				var container = L.DomUtil.create("div", "");
				var label=L.DomUtil.create("div", "", container);
				label.innerHTML = labelX = L.Util.template(opts.labelTemplateLng, {
					x:ll.lng
				}) +" "+ L.Util.template(opts.labelTemplateLat, {
					y:ll.lat
				});

				var close=L.DomUtil.create("a", "", container);
				close.innerHTML="Remove";
				close.href="#";
				L.DomEvent.addListener(close, "click",function(){
					this._map.removeLayer(m);
				},this);
				m.bindPopup(container);
				m.addTo(this._map);
				this._map.removeLayer(this._marker);
				this._marker=null;
			}
		}
	},

	_switchUI : function(evt){
		L.DomEvent.stop(evt);
		L.DomEvent.stopPropagation(evt);
		L.DomEvent.preventDefault(evt);
		if (this._showsCoordinates) {
			//show textfields
			this.expand();
		}else {
			//show coordinates
			this.collapse();
		}
	},

	onRemove: function (map) {
		map.off("mousemove", this._update, this);
	},

	_update: function (evt) {
		var pos=evt.latlng,
		labelX="",
		labelY="",
		opts = this.options,
		x="",
		y="";
		if (pos) {
			this._currentPos=pos;
			y=this._getRoundNum(pos.lat);
			x=this._getRoundNum(pos.lng);
			this._inputX.value=x;
			this._inputY.value=y;
		}
		labelY = L.Util.template(opts.labelTemplateLat, {
			y:y
		});
		labelX = L.Util.template(opts.labelTemplateLng, {
			x:x
		});
		this._labelX.innerHTML = labelX;
		this._labelY.innerHTML = labelY;
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
			}
			res = numbers.join(opts.decimalSeperator);
		}
		return res;
	}
});

L.control.coordinates = function (options) {
	return new L.Control.Coordinates(options);
};
