import Attrs from "./elementAttributes.js"
import Elems from "./elements.js"

export default class Message {
    /**
     * Broadcasts a message to the user via the top banner
     * @param {string} s  
     * @returns {void}
     */
    static alert = s => {
        Elems.messageDiv.textContent = s
        Message.show()
    }

    static hide = () => {
        Attrs.addClasses(Elems.messageDiv)("hidden")
    }

    static show = () => {
        Attrs.removeClasses(Elems.messageDiv)("hidden")
    }
}

