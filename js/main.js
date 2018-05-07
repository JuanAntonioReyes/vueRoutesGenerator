alert("WIP!\nThis application is under development\n" 
			+ "We still have so much to do, but you can get your basic \n"
			+ "routes.js file without problem");

function capitalize(string) {
		string = string.toLowerCase();

    return string.charAt(0).toUpperCase() + string.slice(1);
}

function decapitalize(string) {
		return string.charAt(0).toLowerCase() + string.slice(1);
}

function copyTextToClipboard(text) {
	var dummy = '<textarea id="dummy">' + text + '</textarea>';
	$("body").append(dummy);

	$("#dummy").select();
	document.execCommand("copy");

	$("#dummy").remove();

	alert("Copied!");
}

function stringToResult(string) {
	var resultText = '<pre id="resultText">' + string + '</pre>';
	$("#resultDiv").html(resultText);

	//copyTextToClipboard($("#resultText").text());
}

// ============================================================================
$('#btnProcess').click(buttonHandler);
// ============================================================================

function buttonHandler(e) {
	var textArea = $('#textArea');
	var lines = textArea.val().split('\n');
	
	var components = generateComponents(lines);

	var imports = generateImports(components);
	var routes = generateRoutes(components);

	stringToResult(imports + "\n" + routes);
}
	
function generateComponents(lines) {
	var lineWords, components = [];

	for (var i = 0, l = lines.length; i < l; i++) {
		// Separate each line into words
		lineWords = lines[i].trim().split(' ');

		var startIndex;
		if (lineWords[0] === '-') {
			startIndex = 1;
		} else {
			startIndex = 0;
		}

		var nameText = '';
		for (var j = startIndex, lw = lineWords.length; j < lw; j++) {
			nameText += capitalize(lineWords[j]);
		}

		if (lineWords[0] === '-') {
			components[components.length - 1].children.push(nameText);
		} else {
			var newComponent = {
				text: nameText,
				children: []
			};

			components.push(newComponent);
		}
	}

	return components;
}

function generateImports(components) {
	var importLine, imports = '';

	for (var i = 0, l = components.length; i < l; i++) {
		importLine = "import " + components[i].text + " from './components/" + components[i].text + ".vue';\n";
	
		imports += importLine;
	}

	return imports;
}

function generateRoutes(components) {
	var routes = "export const routes = [\n";
	var decapName;

	for (var i = 0, l = components.length; i < l; i++) {
		decapName = decapitalize(components[i].text);

		routes += "\t{ path: '/" + decapName + "' , component: "
							+ components[i].text + " , name: '" + decapName + "Link'";
	
		if (components[i].children.length !== 0) {
			routes += ",\n\t\tchildren: [\n";

			var decapChild;
			for (var j = 0, lc = components[i].children.length; j < lc; j++) {
				decapChild = decapitalize(components[i].children[j]);

				routes += "\t\t\t{ path: '" + decapChild + "' , component: "
									+ components[i].children[j] + " , name: '" + decapChild
									+ "Link' }";
			
				if (j < (lc - 1)) {
					routes += ",";
				}
				routes += "\n";
			}

			routes += "\t\t]\n\t";
		}

		routes += "}";

		if (i < (l - 1)) {
			routes += ",";
		}
		routes += "\n";
	}

	routes += "];";

	return routes;
}



