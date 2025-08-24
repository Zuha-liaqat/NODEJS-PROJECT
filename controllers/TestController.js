const testusercontroller = (req,res) =>{
try {
    res.send('<h1>Test Page</h1>')
} catch (error) {
    console.log(error)
}
}

module.exports = {testusercontroller}