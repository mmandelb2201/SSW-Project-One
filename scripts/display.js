function displayMessage(data) {
    let room = document.getElementById("message-room");
    let messageBoxElement =
        `<div class="message-container">
        <abbr title="${data.username}"><a href="${"#"}"><img class="message-profile-photo" src="${data.imageURL}" \></a></abbr>
        <div class="message-container-handle">
            <p class="message-timestamp">${(data.timestamp) ? data.timestamp.toDate() : new Date()}</p>
            <p class="message-field">${data.mssg}</p>
        <div>
    </div>`
    room.innerHTML += messageBoxElement
}

function displayMessages(room) {
    db.collection("rooms").doc(room).collection("messages").orderBy("timestamp")
        .get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc => {
                displayMessage(doc.data())
            })
        })
        .catch(err => {
            console.log(err)
        })
}

function displayRooms() {
    console.log(currentUser.rooms)
    let nav = document.getElementById("rooms-nav")
    currentUser.rooms.forEach(room => {
        nav.innerHTML += `<div class="room-topic">${room}</div>`
    })
    document.querySelectorAll(".room-topic").forEach(topic => {
        topic.addEventListener("click", (event) => {

            changeRooms(event.target.innerHTML)
        })
    })

    document.getElementById("room-button").addEventListener("click", () => {
        let roomInput = document.getElementById("room-name-input")
        let roomName = roomInput.value
        roomInput.value = ""
        if (currentUser) {
            if (roomName) {
                createRoom(roomName)
            } else {
                console.log("Room name field is empty")
            }
        }
    })
}


function changeRooms(newRoom) {
    console.log(newRoom)
    let messageRoom = document.getElementById("message-room")
    messageRoom.innerHTML = ""
    currentRoom = newRoom
    displayMessages(newRoom)
}

function createRoom(roomName) {

    const welcomeMessageInfo = {
        username: "bot",
        mssg: "Welcome and have a great time!",
        imageURL: "https://mpng.subpng.com/20200529/pko/transparent-royalty-free-robot-internet-bot-artificial-intelli-5ed16ca886cf00.0014092615907831445522.jpg",
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }

    db.collection("rooms").doc(roomName).set({ chatters: ["0"] }).then(() => {
        db.collection("rooms").doc(roomName).collection("messages").add(welcomeMessageInfo)
    })
    .catch(error => {
        console.log(error)
    })
    
    db.collection("users").where("email", "==", currentUser.email).get().then(querySnapshot => {
        querySnapshot.forEach((doc) => {
            doc.ref.update({rooms: firebase.firestore.FieldValue.arrayUnion(roomName)})
            document.getElementById("rooms-nav").innerHTML += `<div class="room-topic">${roomName}</div>`
        })

        document.querySelectorAll(".room-topic").forEach(topic => {
            topic.addEventListener("click", (event) => {
    
                changeRooms(event.target.innerHTML)
            })
        })
    })  
    
    currentRoom = roomName

    
}
