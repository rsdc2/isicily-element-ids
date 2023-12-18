
const Message = {
    /**
     * Broadcasts a message to the user via the top banner
     * @param {string} s  
     * @returns {void}
     */
    alert : s => {
        messageDiv.textContent = s
        Message.show()
        // setTimeout(() => {
        //     Message.hide()
        // }, 4000);
    },

    hide : () => {
        addClasses(messageDiv)("hidden")
    },

    show : () => {
        removeClasses(messageDiv)("hidden")
    }
}

