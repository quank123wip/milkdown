import { Decoration, DecorationSet } from 'prosemirror-view';
import { Node } from 'prosemirror-model';
import { findChildren } from '@milkdown/utils';
import { highlight, RefractorNode } from 'refractor';

export type FlattedNode = {
    text: string;
    className: string[];
};

const flatNodes = (nodes: RefractorNode[], className: string[] = []) =>
    nodes.flatMap((node): FlattedNode[] =>
        node.type === 'element'
            ? flatNodes(node.children, [...className, ...(node.properties.className || [])])
            : [{ text: node.value, className }],
    );

export function getDecorations(doc: Node, name: string) {
    const decorations: Decoration[] = [];

    findChildren((node) => node.type.name === name)(doc).forEach((block) => {
        let from = block.pos + 1;
        const { language } = block.node.attrs;
        if (!language) return;
        const nodes = highlight(block.node.textContent, language);

        flatNodes(nodes).forEach((node) => {
            const to = from + node.text.length;

            if (node.className.length) {
                const decoration = Decoration.inline(from, to, {
                    class: node.className.join(' '),
                });

                decorations.push(decoration);
            }

            from = to;
        });
    });

    return DecorationSet.create(doc, decorations);
}