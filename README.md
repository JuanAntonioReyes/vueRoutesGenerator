# vueRoutesGenerator
A generator to make the routes.js file for Vue.js (WIP)
* [Test the generator](http://vue-routes-generator.surge.sh/) - Test it here! (WIP)

## Usage
* Input the Vue.js components names you want in the routes.js file in separate lines of the text area (You can use multi word names)
* (If the component is child of another component, input it below the parent component using "- " before the child name)
* Press the "Process component names and copy!" button
* Paste the generated code in the routes.js file of your Vue.js project

Usage example
```
component 1
component 2
component 3 parent
- child component 1
- child component 2
component 4
```