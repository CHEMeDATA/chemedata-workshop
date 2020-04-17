/**
 * Executes a shell command and return it as a Promise.
 * @param cmd {string}
 * @return {Promise<string>}
 */

function openBabelToSdf(arg) {
  const exec = require('child_process').exec;
  return new Promise((resolve, reject) => {
    let cmdf = 'obabel molecules/' + arg + ' -o sdf -O molecules/' + arg + '.sdf';
    exec(cmdf, (error, stdout, stderr) => {
      if (error) {
        console.warn(error);
      }
      resolve(stdout ? stdout : stderr);
    });
  });
}

const convToSdf = openBabelToSdf('structure.cdxml');
console.log(convToSdf);

convToSdf.then((exec) => {
  // successMessage is whatever we passed in the resolve(...) function above.
  // It doesn't have to be a string, but if it is only a succeed message, it probably will be.
  console.log('Version: ... ' + exec);
});
