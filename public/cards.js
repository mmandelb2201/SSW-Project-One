const card = document.querySelector('.cardInner')

card.addEventListener('click', function() {
    card.classList.toggle('isFlipped')
})

/* Set the width of the side navigation to 250px */
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}

/* Set the width of the side navigation to 0 */
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}