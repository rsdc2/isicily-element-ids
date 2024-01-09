import * as Handler from "./SideEffects/eventHandlers"
import * as Listeners from "./SideEffects/eventListeners"
import * as Elements from "./SideEffects/elements"
import * as Attrs from "./SideEffects/elementAttributes"

Listeners.addListeners()
Handler.selection()
Handler.hideAllPopups()
Attrs.show(Elements.div(".input"))
Elements.textInput1.focus()
