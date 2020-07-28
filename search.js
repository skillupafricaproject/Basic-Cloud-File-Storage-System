const fs = require('fs');

const url = './database/users.json';

const searchParam = process.argv[2];

function searchStatus(searchParam) {
    

 fs.readFile(url, function (err, data) {

    if (err) throw err;
    if(data.indexOf(searchParam) >= 0){
       
        const data2 = JSON.parse(data.toString());
        console.log(data2[0].status);

    } else {
        console.log('searched result not found')
    }
  
});

}

searchStatus(searchParam);