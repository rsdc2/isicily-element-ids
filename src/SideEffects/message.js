import Attrs from "./attrs.js"
import Elems from "./elems.js"

const { messageDiv } = Elems

export default class Message {
    /**
     * 
     * @param {string} s 
     */
    static alert = s => {
        messageDiv.classList.remove("error")
        messageDiv.textContent = s
        Message.show()
    }

    /**
     * Broadcasts a message to the user via the top banner
     * @param {string} s  
     * @returns {void}
     */
    static error = s => {
        messageDiv.classList.add("error")
        messageDiv.textContent = s
        Message.show()
    }

    /**
     * Hide the message bar
     */
    static hide = () => {
        Attrs.addClasses(messageDiv)("hidden")
    }

    /**
     * Show the message bar
     */
    static show = () => {
        Attrs.removeClasses(messageDiv)("hidden")
    }
}

