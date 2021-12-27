console.log("Service Worker loaded")

self.addEventListener("push", e => {
    const data = e.data.json();
    console.log("push received")
    self.registration.showNotification(data.title, {
        body: "this is a test notification",
        icon: "../images/book.ico"
    })
})