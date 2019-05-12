const fs = require('fs')
var res = ''
fs.readdirSync('src/assets/welldone-gif').forEach(file => {
  res += `,'${file}'`
});
res = '[' + res.slice(1) + ']'
console.log(res)
