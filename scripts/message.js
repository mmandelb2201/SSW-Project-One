async function storeMessage(room, username, imageURL, mssg) {
    const messageInfo = {
        username,
        mssg,
        imageURL,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }
    try {
        const messageRef = await db.collection("rooms").doc(room).collection("messages").add(messageInfo)
        return messageRef
    } catch (error) {
        return error
    }

}

async function processMessage(message) {
    try { 
        const messageRef = await storeMessage(currentRoom, currentUser.username, currentUser.imageURL, message)
        displayMessage({ username: currentUser.username, mssg: message, imageURL: currentUser.imageURL})
        console.log("currentRoom", currentRoom)
        await db.collection("rooms").doc(currentRoom).update({
            chatters: firebase.firestore.FieldValue.arrayUnion(currentUser.email)
        })
    } catch (error) {
        console.log(error)
    }
}

let getMessageFromInput = (elementId) => {
    let element = document.getElementById(elementId)
    let message = element.value
    element.value = ""
    if (currentUser) {
        if (message) {
            processMessage(message)
        }
    } else {
        console.log("User is not signed in!!!")
    }   
}