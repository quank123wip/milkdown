export default"# Node & Mark\n\nNode and Mark are two structures that used to define prosemirror [Node](https://prosemirror.net/docs/ref/#model.Node) and [Mark](https://prosemirror.net/docs/ref/#model.Mark).\n\n## Overview\n\nUsers can easily define a node by the following code:\n\n```typescript\nimport { nodeFactory } from '@milkdown/core';\n\nconst id = 'paragraph';\nconst paragraph = nodeFactory({\n    id,\n    schema: {\n        content: 'inline*',\n        group: 'block',\n        parseDOM: [{ tag: 'p' }],\n        toDOM: () => ['p', { class: 'paragraph' }, 0],\n    },\n    parser: {\n        match: (node) => node.type === id,\n        runner: (state, node, type) => {\n            state.openNode(type).next(node.children).closeNode();\n        },\n    },\n    serializer: {\n        match: (node) => node.type.name === id,\n        runner: (state, node) => {\n            state.openNode('paragraph').next(node.content).closeNode();\n        },\n    },\n});\n```\n\n---\n\n## Properties\n\nThere are 4 required properties and 3 optional properties need to be implemented by every node/mark.\n\n### id\n\n**Required.** The identifier of the node/mark, will be used as key of [prosemirror schema][schema].\n\n### schema\n\n**Required.** The [prosemirror schema][schema] specification of this node/mark.\n\n### parser\n\n**Required.** The parser specification, used to define the parsing process of current node/mark.\n\n### serializer\n\n**Required.** The serializer specification, used to define the serializing process of current node/mark.\n\n### inputRules?\n\n**Optional.** The [prosemirror input rules][input-rules] this node/mark creates. It's used to match the user input and generate response for them, such as input ``` to generate code fence.\n\n### commands?\n\n**Optional.** The [prosemirror commands][commands] this node/mark creates. It's used to define commands to operate the editor programmatically.\n\n### keymap?\n\n**Optional.** The [prosemirror key map][key-map] this node/mark creates. It's used to define keyboard shortcuts and bind them to target command.\n\n### view?\n\n**Optional.** The [prosemirror node view][node-view] of this node/mark. It's used to define special render logic for current node/mark.\n\n---\n\n> You can find more examples in the official repositories like [preset-commonmark][preset-commonmark] and [preset-gfm][preset-gfm].\n>\n> In real world, we recommend you to use `createNode` and `createMark` from [@milkdown/utils][utils], they can make define node/mark much easier.\n\n[schema]: https://prosemirror.net/docs/ref/#model.Schema\n[input-rules]: https://prosemirror.net/docs/ref/#inputrules.InputRule\n[key-map]: https://prosemirror.net/docs/ref/#keymap\n[node-view]: https://prosemirror.net/docs/ref/#view.NodeView\n[commands]: https://prosemirror.net/docs/guide/#commands\n[preset-commonmark]: https://github.com/Saul-Mirone/milkdown/tree/main/packages/preset-commonmark\n[preset-gfm]: https://github.com/Saul-Mirone/milkdown/tree/main/packages/preset-gfm\n[utils]: https://github.com/Saul-Mirone/milkdown/tree/main/packages/utils\n";