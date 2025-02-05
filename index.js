//var gen = require("sillyname"); //import to gen
import inquirer from 'inquirer';
import sillyname from 'sillyname';
import {randomSuperhero} from 'superheroes';
import qr from 'qr-image';
import fs from 'fs';

var sname = sillyname();
var supername = randomSuperhero();

//console.log("I am",sname);

inquirer
  .prompt([
    {
        message: "What is your name?:\n",
        name:"rambiut"
    }
  ])
  .then((answers) => {
    console.log("\nHello", answers.rambiut)
    console.log("your villain name will be", sname)
    console.log("and your superhero name will be", supername)

    var name = qr.image(answers.rambiut, { type: 'png' });
    name.pipe(fs.createWriteStream('name.png'));

    var sillyn = qr.image(sname, { type: 'png' });
    sillyn.pipe(fs.createWriteStream('sillyname.png'));

    var superh = qr.image(supername, { type: 'png' });
    superh.pipe(fs.createWriteStream('superheroname.png'));

    console.log("\nQR codes are generated");

    const fileContent = `Name: ${answers.rambiut}\nVillain Name: ${sname}\nSuperhero Name: ${supername}`;
    const data = new Uint8Array(Buffer.from(fileContent));
    
    fs.writeFile('myhero.txt', data, (err) => {
      if (err) throw err;
      console.log("Text file updated");
    });
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });
