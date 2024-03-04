
const express = require('express')
const app = express()
const { Worker } = require('bullmq')
const env = process.env

function sendEmail(data) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            return resolve("email send")
        }, 3000)
    })
}
const emailWoker = new Worker('email-queue', async (job) => {

    let k = await sendEmail(job.data)
    console.log(k)


}, {
    connection: {
        host: env.HOST,
        port: env.PORT,
        username: env.USER,
        password: env.PASSWORD
    }
})


app.listen(1200, () => console.log("listring to 3000"))