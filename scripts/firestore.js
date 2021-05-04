let db = firebase.firestore()
let currentUser = null
let currentRoom = null

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        // User is signed in.
        console.log("Email", user.email)
        db.collection("users").where("email", "==", user.email).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                currentUser = doc.data()
                console.log(currentUser)
                currentRoom = currentUser.rooms[0]

                displayMessages(currentRoom)
                displayRooms()
            })
        }).catch(err => {
            console.log(err)
        })
        
    } else {
        // No user is signed in.
    }
})

//document.querySelectorAll("message-profile-photo").classList.toggle("show")
