import * as Elements from "./elements"
import * as Attrs from "./elementAttributes"
export const Message = {
    /**
     * Broadcasts a message to the user via the top banner
     * @param {string} s  
     * @returns {void}
     */
    alert : s => {
        Elements.messageDiv.textContent = s
        Message.show()
    },

    hide : () => {
        Attrs.addClasses(Elements.messageDiv)("hidden")
    },

    show : () => {
        Attrs.removeClasses(Elements.messageDiv)("hidden")
    }
}

