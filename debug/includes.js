(function() {
	function getFiles() {
		var memo = {},
		    files = [],
		    i, src;

		function addFiles(srcs) {
			for (var j = 0, len = srcs.length; j < len; j++) {
				memo[srcs[j]] = true;
			}
		}

		for (i in deps) {
			addFiles(deps[i].src);
		}

		for (src in memo) {
			files.push(src);
		}

		return files;
	}
	var scripts = getFiles();

	function getSrcUrl() {
		return "../src/";
	}

	var path = getSrcUrl();
    for (var i = 0; i < scripts.length; i++) {
		document.writeln("<script src='" + path + scripts[i] + "'></script>");
	}
    document.writeln('<script defer>L.Icon.Default.imagePath = "' + path + '../dist/images";</script>');
})();

function logEvent(e) {
	console.log(e.type);
}
