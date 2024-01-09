
const Message = {
    /**
     * Broadcasts a message to the user via the top banner
     * @param {string} s  
     * @returns {void}
     */
    alert : s => {
        Elems.messageDiv.textContent = s
        Message.show()
    },

    hide : () => {
        Attrs.addClasses(Elems.messageDiv)("hidden")
    },

    show : () => {
        Attrs.removeClasses(Elems.messageDiv)("hidden")
    }
}

