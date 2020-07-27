const fs = require("fs");
const folder = "./new-directory-name";


//this just to create a testing json data dir & file
// fs.mkdir(folder, function(err) {
//   if (err) {
//     console.log(err)
//   } else {
//     console.log("New directory successfully created.")
//   }

//   const user = [
// {
//     "id": 1,
//     "name": "John Doe",
//     "age": 22,
//       "status" : "i like node.js"
// },
// ];

// // convert JSON object to string
// const data = JSON.stringify(user);

// // write JSON string to a file
// fs.writeFile('./new-directory-name/user.json', data, (err) => {
//     if (err) {
//         throw err;
//     }
//     console.log("JSON data is saved.");
// });
// });

//getting the existing json data
const data = fs.readFileSync('./new-directory-name/user.json'),
      dataJson = JSON.parse(data);

// setting the update argument   
const update = process.argv[2];


//update data function
function updateData(id, update) {
    const updates = [];
 
    //looping through the json data
    for (const key in dataJson) {
        if (dataJson.hasOwnProperty(key)) {
            const element = dataJson[key];
            
            if (element.id === id) {

                // getting the data(status) and updating the status
               const result = element.status = update

               //pushing the new update into a new array
               console.log(updates.push(element));
               console.log(updates)
            }
        }
    }
    //stringifing the new data
    const data2 = JSON.stringify(updates);
    
    //over-riding the new data on the existing json data
    fs.writeFileSync('./new-directory-name/user.json', data2);
}


updateData(1, update);