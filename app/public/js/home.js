document.addEventListener("DOMContentLoaded", () => {
    const startAnonymousGameButton = document.getElementById("start-anonymous-game");

    startAnonymousGameButton.addEventListener("click", () => {
        window.location.href = "/lobby"
    })
})