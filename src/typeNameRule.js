"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var Lint = require("tslint");
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new TypeAliasWalker(sourceFile, this.getOptions()));
    };
    return Rule;
}(Lint.Rules.AbstractRule));
Rule.FAILURE_STRING = "bad type format";
exports.Rule = Rule;
var TypeAliasWalker = (function (_super) {
    __extends(TypeAliasWalker, _super);
    function TypeAliasWalker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TypeAliasWalker.prototype.visitTypeAliasDeclaration = function (node) {
        var typeStr = node.getFullText();
        if (!/type\s+([A-Z]\w+_t)/.test(typeStr)) {
            this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING));
        }
        // call the base version of this visitor to actually parse this node
        _super.prototype.visitTypeAliasDeclaration.call(this, node);
    };
    return TypeAliasWalker;
}(Lint.RuleWalker));
