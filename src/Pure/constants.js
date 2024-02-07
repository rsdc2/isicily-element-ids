import Str from "./str.js"

export default class Constants {
    static EQ = " = "
    
    static REST = " ... "
    
    static FIVEBLANKS = "?????"

    static BLANKCOMPRESSION = "?"

    static BLANKMIDPOINT= `${Constants.REST}${Constants.FIVEBLANKS}${Constants.REST}`

    static BLANKISIC = "ISic??????-?????"
    
    static LOWERCASELATIN = [
        'a', 
        'b', 
        'c', 
        'd', 
        'e', 
        'f', 
        'g', 
        'h', 
        'i', 
        'j', 
        'k', 
        'l', 
        'm', 
        'n', 
        'o', 
        'p', 
        'q', 
        'r', 
        's', 
        't', 
        'u', 
        'v',
        'w',
        'x',
        'y', 
        'z'
    ]
    
    static LOWERCASEGREEK = [
        'α',
        'β', 
        'γ', 
        'δ', 
        'ε', 
        'ζ', 
        'η', 
        'θ', 
        'ι', 
        'κ', 
        'λ', 
        'μ', 
        'ν', 
        'ξ', 
        'ο', 
        'π', 
        'ρ', 
        'σ', 
        'τ', 
        'υ',
        'φ', 
        'χ', 
        'ψ',
        'ω'
    ]
    
    static METAKEYS = ["Alt", "Control", "Shift", "CapsLock", "ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight"]
    
    static MAXFILESIZE = 100000
    
    static STRICT = true
    
    static UPPERCASELATIN = Constants.LOWERCASELATIN.map(Str.toUpper)
    static UPPERCASEGREEK = Constants.LOWERCASEGREEK.map(Str.toUpper)
    static GREEKCHARSET = Constants.LOWERCASEGREEK.concat(Constants.UPPERCASEGREEK)

    static BASE52 = Constants.UPPERCASELATIN.concat(Constants.LOWERCASELATIN)

    static BASE100 = Constants.BASE52
            .concat(Constants.UPPERCASEGREEK)
            .concat(Constants.LOWERCASEGREEK)

    static CURRENTBASE = Constants.BASE100

    static TEINS = "http://www.tei-c.org/ns/1.0"
    static VALIDBASES = ["52", "100"]
  
}