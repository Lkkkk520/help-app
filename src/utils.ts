const fs = require('fs');
let path = require('path')
export const isFileExisted = (path_way) => {
  return new Promise((resolve, reject) => {
    let returnPath = ''
    fs.exists(path.join(__dirname, path_way), exists => { 
      console.log(exists ? "The directory already exists":"Not found!"); 
    }); 
    fs.access(path.join(__dirname, path_way), (err) => {
      if (err) {
        try {
          let arr = path_way.split('/');
          if(arr.length > 1) arr.map((a, i) => {
            fs.mkdirSync(path.join(__dirname, i? arr[i-1] : '', a));
          })
          else fs.mkdirSync(path.join(__dirname, path_way));
          resolve(path.join(__dirname, path_way))
        } catch (err) {
          reject(err.stack);
        }
      } else {
        resolve(path.join(__dirname, path_way));
      }
    })
  })
};