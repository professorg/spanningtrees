#!/bin/node

var a   = ["ab","bc","ac"]  // edges in cycle a
var bc  = ["ce"]            // edges in cycles b and c
var bd  = ["cf","ef"]       // edges in cycles b and d
var cd  = ["cd","de"]       // edges in cycles c and d
var all = ["ab","bc","ac","cd","de","ef","cf","ce"] // all edges

// Example: [a,b].cartesian([c,d]) => [[a,c],[a,d],[b,c],[b,d]]
Array.prototype.cartesian = function(other) {
    return this.map(i => other.map(j => [i,j]))
}

// Example: [a,b,c,d].without([a,d]) => [b,c]
Array.prototype.without = function(element) {
    return this.filter(e => e != element)
}

// Example: [[a,b,c,d]].withoutOneOf([a,d]) => [[b,c,d],[a,b,c]]
Array.prototype.withoutOneOf = function(other) {
    return this.flatMap(a => other.map(e => a.without(e)))
}

var graphs = []
    .concat(
        // Case 1: remove from bc first
        [all]
            .withoutOneOf(bc)
            .withoutOneOf([].concat(bd, cd)),
        // Case 2: don't remove from bc
        [all]
            .withoutOneOf(bd)
            .withoutOneOf(cd))
    .withoutOneOf(a)

var output = "{\n"
    + graphs
        .map(graph => graph
            .map(e => "{" + e.split("").join(",") + "}"))
        .map(graph => "\t{ " + graph.join(",") + " }")
        .join(",\n")
    + "\n}"

console.log(output.replace(/[{}]/g, match => "\\" + match))

