/* Packages:-
          A directory with a package.json file that defines a reusable set of functionalities (library or tool) you can install
          via npm/yarn (e.g., express).

Dependencies in Package.json:- 
                              "dependencies" is a section in package.json listing all the packages your project needs to run in production.
                              They are installed using npm install <package>, and saved under "dependencies" automatically.
*/


/* Modules:-
Any individual JS file or folder you can import using require or import. It can be a built-in, local, or third-party file
providing specific functionality.


/* npm i cat-me */
let cat = require('cat-me');
console.log(cat())

/* npm i http ❌*/
let http = require('http');

/* http => Module */
/* cat-me => packages */