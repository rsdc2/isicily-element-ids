import Str from "./str.js"

export default class Const {
    static REST = " ... "

    static EQ = " = "
    
    static FIVEBLANKS = "?????"

    static BLANKCOMPRESSION = "?"

    static BLANKMIDPOINT= `${Const.REST}${Const.FIVEBLANKS}${Const.REST}`

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
        'υ',
        'τ', 
        'φ', 
        'χ', 
        'ψ',
        'ω'
    ]
    
    static METAKEYS = ["Alt", "Control", "Shift", "CapsLock", "ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight"]
    
    static ABOUTTEXT = `
    <p>This software was written by Robert Crellin as part of the Crossreads project at the Faculty of Classics, 
    University of Oxford, and is licensed under the MIT license. This project has received funding from 
    the European Research Council (ERC) under the European Union’s Horizon 2020 research and innovation programme 
    (grant agreement No 885040, “Crossreads”). For further details see 
    <a href="https=//github.com/rsdc2/isicily-element-ids" target="_blank">the source code on Github</a>.</p> 
    `
    
    static NOTESTEXT = `
    <ul>
      <li>Uncompressed ID= ISic012345-01234, e.g. ISic000002-00100</li>
      <li>Compressed ID= ABCDE, where each digit may be any character a-z, A-Z, α-ω, Α-Ω, e.g. zzzzz = ISic051515-15151</li>
    </ul>
    `
    
    static STRICT = true
    
    static UPPERCASELATIN = Const.LOWERCASELATIN.map(Str.toUpper)
    static UPPERCASEGREEK = Const.LOWERCASEGREEK.map(Str.toUpper)
  
}

