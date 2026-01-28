export interface LexicalNode {
    text?: string;
    children?: LexicalNode[];
    [key: string]: unknown;
}

export interface LexicalContent {
    root?: LexicalNode;
    [key: string]: unknown;
}

export function calculateReadingTime(content: LexicalContent | null | undefined): number {
    if (!content) return 0;

    let text = '';

    // Recursively extract text from Lexical JSON structure
    const extractText = (node: LexicalNode) => {
        if (node.text) {
            text += node.text + ' ';
        }
        if (node.children) {
            node.children.forEach(extractText);
        }
    };

    if (content.root) {
        extractText(content.root);
    }

    const wordsPerMinute = 200;
    const noOfWords = text.trim().split(/\s+/).filter(Boolean).length;
    if (noOfWords === 0) return 0;

    const minutes = noOfWords / wordsPerMinute;
    const readTime = Math.ceil(minutes);

    return readTime;
}
