function capitalize(string) {
		string = string.toLowerCase();

    return string.charAt(0).toUpperCase() + string.slice(1);
}

function decapitalize(string) {
		return string.charAt(0).toLowerCase() + string.slice(1);
}

function stringToClipboard(string) {
	// Create a dummy input to copy the string array inside it
	var dummy = document.createElement("textarea");

	// Add it to the document
	document.body.appendChild(dummy);

	// Set its ID
	dummy.setAttribute("id", "dummy_id");

	// Output the array into it
	document.getElementById("dummy_id").value = string

	// Select it
	dummy.select();

	// Copy its contents
	document.execCommand("copy");

	// Remove it as its not needed anymore
	document.body.removeChild(dummy);

	alert("Copied to clipboard!");
}

// ============================================================================
$('#btnProcess').click(buttonHandler);
// ============================================================================

function buttonHandler(e) {
	var textArea = $('#textArea');
	var lines = textArea.val().split('\n');
	var names = generateNames(lines);
	
	//console.log(names);

	var imports = generateImports(names);
	var routes = generateRoutes(names);

	stringToClipboard(imports + "\n" + routes);
}
	
function generateNames(lines) {
	var lineWords, names = [];

	for (var i = 0, l = lines.length; i < l; i++) {
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
			names[names.length - 1].children.push(nameText);
		} else {
			var name = {
				text: nameText,
				children: []
			};

			names.push(name);
		}
	}

	return names;
}

function generateImports(names) {
	var importLine, imports = '';

	for (var i = 0, l = names.length; i < l; i++) {
		importLine = "import " + names[i].text + " from './components/" + names[i].text + ".vue';\n";
	
		imports += importLine;
	}

	return imports;
}

function generateRoutes(names) {
	var routes = "export const routes = [\n";
	var decapName;

	for (var i = 0, l = names.length; i < l; i++) {
		decapName = decapitalize(names[i].text);

		routes += "\t{ path: '/" + decapName + "' , component: " + names[i].text 
							+ " , name: '" + decapName + "Link'";
	
		if (names[i].children.length !== 0) {
			routes += ",\n\t\tchildren: [\n";

			var decapChild;
			for (var j = 0, lc = names[i].children.length; j < lc; j++) {
				decapChild = decapitalize(names[i].children[j]);

				routes += "\t\t\t{ path: '" + decapChild + "' , component: "
									+ names[i].children[j] + " , name: '" + decapChild
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



