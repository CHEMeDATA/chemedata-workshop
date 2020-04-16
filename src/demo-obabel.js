var fs = require('fs');
var ob = require('openbabel');

var conversion = new ob.Conversion();
var mol = conversion.setInFormat('smiles').read('C1CCCC1');
console.log(mol.atomsCount);



var data = fs.readFileSync('../molecules/compound1.mol');
var conversion = new ob.Conversion();
var mol = conversion.setInFormat('smiles').read(data);
console.log(mol.atomsCount);
