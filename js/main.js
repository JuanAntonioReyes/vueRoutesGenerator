alert("WIP!\nThis application is under development\n"
			+ "There is still some bugs, use this with caution\n"
			+ "We still have so much to do, but you can get your basic \n"
			+ "routes.js file without problem");

function capitalize(string) {
		string = string.toLowerCase();

    return string.charAt(0).toUpperCase() + string.slice(1);
}

function decapitalize(string) {
		return string.charAt(0).toLowerCase() + string.slice(1);
}

function copyResultToClipboard() {
	var resultText = $("#resultText").text();

	if (resultText !== '') {
		var dummy = '<textarea id="dummy">' + resultText + '</textarea>';
		$("body").append(dummy);

		$("#dummy").select();
		document.execCommand("copy");

		$("#dummy").remove();

		alert("Copied!");
	}
}

function stringToResult(text) {
	$("#resultText").text(text);
}

// ============================================================================
$('#btnProcess').click(buttonHandler);
$('#btnCopy').click(copyResultToClipboard);
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

		// Check if first character is "-" (The component is a child)
		var firstChar = lineWords[0].charAt(0);
		var isChild = (firstChar === '-');

		if (isChild) {
			lineWords[0] = lineWords[0].slice(1);
		}

		var componentName = '';
		for (var j = 0, lw = lineWords.length; j < lw; j++) {
			componentName += capitalize(lineWords[j]);
		}

		if (isChild && (components.length > 0)) {
			// If the component is a child and it have another component above it
			components[components.length - 1].children.push(componentName);
		} else {
			var newComponent = {
				name: componentName,
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
		importLine = "import " + components[i].name + " from './components/" + components[i].name + ".vue';\n";
	
		imports += importLine;

		// If the component have childs
		for (var j = 0, lc = components[i].children.length; j < lc; j++) {

			var childName = components[i].children[j];
			importLine = "import " + childName + " from './components/" + childName + ".vue';\n";

			imports += importLine;

		}

	}

	return imports;
}

function generateRoutes(components) {
	var routes = "export const routes = [\n";
	var decapName;

	for (var i = 0, l = components.length; i < l; i++) {
		decapName = decapitalize(components[i].name);

		routes += "\t{ path: '/" + decapName + "' , component: "
							+ components[i].name + " , name: '" + decapName + "Link'";
	
		var lc = components[i].children.length;
		if (lc !== 0) {
			routes += ",\n\t\tchildren: [\n";

			var decapChild;
			for (var j = 0; j < lc; j++) {
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



