export const Subatomic = {    
    Ex: "ex",
    Expan: "expan",
    Unclear: "unclear",
    Abbr: "abbr",
    Supplied: "supplied",
    Del: "del",
    Choice: "choice",   // Choice always contained by an atomic word type, but never smaller than that, so not like others in this category
    Hi: "hi", // can also contain atomic token types
    Surplus: "surplus",
    Subst: "subst",
    C: "c" // Character element    
}

export const Atomic = {
    Name: "name",
    AddName: "addName",
    W: "w",
    Num: "num",
    Measure: "measure"
}

export const AtomicNonToken = {
    G: "g",
    Lb: "lb",
    Space: "space",
    Gap: "gap",
    Orig: "orig",
    Seg: "seg",  
    Note: "note",   
    Milestone: "milestone",
    Certainty: "certainty",
    HandShift: "handShift",
    Link: "link"
}

export const Compound = {
    PersName: "persName",
    Choice: "choice",
    PlaceName: "placeName",
    RoleName: "roleName",
    OrgName: "orgName",
    Foreign: "foreign",
    Hi: "hi", // can also contain atomic token types
    Note: "note",
    Date: "date",
    RS: "rs",
    Add: "add", // Correct place?    
    Cb: "cb" // Column beginning
}

export const IDCarrier = {
    ...Subatomic, 
    ...Atomic, 
    ...AtomicNonToken, 
    ...Compound
}

export const IDCarrierMap = new Map(Object.entries(IDCarrier))