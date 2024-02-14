import Handlers from "./SideEffects/handlers.js"
import Listener from "./SideEffects/listener.js"
import Elems from "./SideEffects/elems.js"
import Attrs from "./SideEffects/attrs.js"
import { setTitles } from "./Pure/constants/titles.js"

Listener.addListeners()
Handlers.selection()
Handlers.hideAllPopups()
Attrs.show(Elems.div(".input"))
Elems.textInput1.focus()
setTitles()
