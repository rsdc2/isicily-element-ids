import Handlers from "./SideEffects/eventHandlers.js"
import Listener from "./SideEffects/eventListeners.js"
import Elems from "./SideEffects/elements.js"
import Attrs from "./SideEffects/attrs.js"

Listener.addListeners()
Handlers.selection()
Handlers.hideAllPopups()
Attrs.show(Elems.div(".input"))
Elems.textInput1.focus()
