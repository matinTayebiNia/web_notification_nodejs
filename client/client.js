const publicVapidKey = "BPcyRKGUs45kzLzRVh5BwdN9x8dh6KUP1L4T410KX8e-DU5Uwb9dJSFo0QfXBoDHAiWbnA7IJ_Gfn5NfmrelTSM";

//check the service worker
if ('serviceWorker' in navigator) {
    send().catch(err => console.error(err))
}




async function send() {
    console.log("Register service worker...")
    const register = await navigator.serviceWorker.register("./worker.js", {
        scope: "/"
    })
    console.log("service worker registered..")
    //Register push
    console.log("registering push ... ")
    const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: publicVapidKey
    });
    console.log("push registered...")
    //send push notification
    console.log("Sending push ...")
    console.log(subscription)
    await fetch("/subscribe", {
        method: "POST",
        body: JSON.stringify(subscription),
        headers: {
            "content-type": "application/json",
            "authorization":subscription.options.applicationServerKey
        }
    });

    console.log("push sent...")

}