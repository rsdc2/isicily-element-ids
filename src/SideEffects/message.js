import Attrs from "./attrs.js"
import Elems from "./elems.js"

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

    /**
     * Hide the message bar
     */
    static hide = () => {
        Attrs.addClasses(Elems.messageDiv)("hidden")
    }

    /**
     * Show the message bar
     */
    static show = () => {
        Attrs.removeClasses(Elems.messageDiv)("hidden")
    }
}

