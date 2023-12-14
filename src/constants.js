
const REST = " ... "
const EQ = " = "

const BLANKCOMPRESSION = `${EQ}?`
const BLANKMIDPOINT = `${REST}?${REST}`

const LOWERCASELATIN = [
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

const LOWERCASEGREEK = [
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


const STRICT = true

const UPPERCASELATIN = LOWERCASELATIN.map(toUpper)
const UPPERCASEGREEK = LOWERCASEGREEK.map(toUpper)
