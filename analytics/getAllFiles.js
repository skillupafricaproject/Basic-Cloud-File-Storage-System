const fs = require("fs")
const path = require("path")

const getAllFiles = (filePath) =>{
  files = fs.readdirSync(filePath)

  const maxCount = { count:0, user:''}
  let totalFiles = 0;
  let totalUsers = 0

  const dssee = files.map((folder) =>{
    try {
      const size = fs.readdirSync(`${filePath}/${folder}`).length;
      let result = { user: folder, size };
      if (size > maxCount.count){
        maxCount.count = size;
        maxCount.user = folder
      }
      totalFiles += size;
      totalUsers++      
      return result
    } catch(err) {
      console.log(err.message)
    }
  });
  
  
  
  console.log(`Total Files: ${totalFiles}`)
  console.log(`Total Users: ${totalUsers}`)
  console.log(`${maxCount.user} has ${maxCount.count} files`)
  
  return files
}
getAllFiles('./users')

