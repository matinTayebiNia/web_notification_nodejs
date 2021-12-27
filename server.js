const express = require('express');
const webPush = require('web-push');
const bodyParser = require('body-parser');
const path = require('path')
const publicVapidKey = "BPcyRKGUs45kzLzRVh5BwdN9x8dh6KUP1L4T410KX8e-DU5Uwb9dJSFo0QfXBoDHAiWbnA7IJ_Gfn5NfmrelTSM";
const privateVapidKey = "_p-DZCaXDYdz-wDg3RU38R6RL2KxKUjHaYOg3GVdJJU";
const app = express();

//set static path 
app.use(express.static(path.join(__dirname, "client")))

app.use(bodyParser.json())

webPush.setVapidDetails("mailto:test@test.com", publicVapidKey, privateVapidKey);

//Subscribe Route
app.post('/subscribe', (req, res) => {
    // Get pushSubscription object 
    const subscription = req.body;
    // Send 201 -resource created
    console.log(subscription)
    res.status(201).json({})


    // create payload
    const payload = JSON.stringify({ title: "Push Test" });

    console.log(subscription.endpoint)
    // Pass object into sendNotification
    webPush.sendNotification(subscription, payload).catch(err => console.error(err));

})

app.listen(3000, () => {
    console.log("listening on port 3000")
})

