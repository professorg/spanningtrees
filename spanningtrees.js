#!/bin/node

var a   = ["ab","bc","ac"]
var bc  = ["ce"]
var bd  = ["cf","ef"]
var cd  = ["cd","de"]
var all = ["ab","bc","ac","cd","de","ef","cf","ce"]

Array.prototype.cartesian = function(other) {
    return this.map(i => other.map(j => [i,j]))
}

Array.prototype.without = function(element) {
    return this.filter(e => e != element)
}

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

