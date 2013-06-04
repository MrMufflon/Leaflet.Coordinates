Leaflet.Coordinates
===================

### What is this?
Leaflet plugin to view mouse coordinates. Also the user can change the coordinates and get a marker on that position.

*Tested with Leaflet 0.5*

### Demo anyone?
<a href"http://mrmufflon.github.io/Leaflet.Coordinates/examples/demo.html" target="_blank">Have a look</a>

### How to use?
```javascript
L.control.coordinates({
	position:"bottomleft", //optional default "bootomright"
	decimals:2, //optional default 4
	decimalSeperator:".", //optional default "."
	labelTemplateLat:"Latitude: {y}", //optional default "Lat: {y}"
	labelTemplateLng:"Longitude: {x}" //optional default "Lng: {x}",
	enableUserInput:true //optional default true
}).addTo(map);
```

### Releases
none yet

### License 
<a rel="license" href="http://creativecommons.org/licenses/by/3.0/deed.en_US"><img alt="Creative Commons License" style="border-width:0" src="http://i.creativecommons.org/l/by/3.0/88x31.png" /></a><br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by/3.0/deed.en_US">Creative Commons Attribution 3.0 Unported License</a>.
