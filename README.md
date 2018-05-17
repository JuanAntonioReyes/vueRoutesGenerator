# vueRoutesGenerator v2.1.1
A generator to make the routes.js file for Vue.js (WIP)
* [Test the generator](http://vue-routes-generator.surge.sh/) - Test it here! (WIP)

## Usage
* Input the Vue.js components names you want in the routes.js file in separate lines of the text area (You can use multi word names)
* If the component is child of another component, input it below the parent component using "-" before the child name (If the child didn't have another component above it in the list, the child will be put in the generated routes.js file as a "normal" component)
* Press the "Generate routes.js" button to obtain the routes.js file
* Press the "Copy!" button to copy the generated routes.js text to the clipboard
* Paste the generated code in the "routes.js" file of your Vue.js project

Usage example
```
component 1
component 2
component 3 parent
-child component 1
-child component 2
component 4
```

## Changelog
* v2.1 - Better UI using Bootstrap (But still a bit ugly)
* v2.1.1 - Fixed child components imports