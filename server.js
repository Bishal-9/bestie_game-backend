require("dotenv").config()

const app = require("./app")
const port = process.env.PORT || 5000

// * Initialize MongoDB
require("./config/database")

app.listen(port, () => console.log(`Server is running on http://localhost:${port}`))
