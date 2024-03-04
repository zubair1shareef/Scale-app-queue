const express = require('express')
const app = express()
const { Queue } = require('bullmq')
app.use(express.json())
const env = process.env

const emilaQueue = new Queue('email-queue', {
    connection: {
        host: env.HOST,
        port: env.PORT,
        username: env.USER,
        password: env.PASSWORD
    }
})
function addUser() {

}

app.post('/add-user', async (req, res, next) => {
    let body = req.body
    console.log(body)
    await addUser()
    let emailObj = {
        from: 'zubair@fns.cdo',
        to: body.email,
        name: body.userName,
        content: 'sucess'
    }
    await emilaQueue.add(`${Date.now()}`, emailObj)
    res.status(200).send({ result: true, message: "sucess" })
})


app.listen(3000, () => console.log("listring to 3000"))