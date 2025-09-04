const index = require('./index')

const port = process.env.PORT || 3000

index.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
