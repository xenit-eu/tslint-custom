import * as ts from "typescript";
import * as Lint from "tslint";



export class Rule extends Lint.Rules.AbstractRule {
    public static FAILURE_STRING = "bad type format";

    public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
        return this.applyWithWalker(new TypeAliasWalker(sourceFile, this.getOptions()));
    }
}

class TypeAliasWalker extends Lint.RuleWalker {
    public visitTypeAliasDeclaration(node: ts.TypeAliasDeclaration) {
        const typeStr : string = node.getFullText();

        if (!/type\s+([A-Z]\w+_t)/.test(typeStr)) {
            this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING));
        }

        // call the base version of this visitor to actually parse this node
        super.visitTypeAliasDeclaration(node);
    }
}
