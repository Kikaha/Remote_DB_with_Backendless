export default function el(type, content, attributes) {
    const result = document.createElement(type);

    if (attributes !== undefined) {
        // Object.keys(attributes).forEach(k=>{
        //     result[k] = attributes[k];})
        Object.assign(result, attributes);
    }
    if (Array.isArray(content)) {
        content.forEach(x=>append(x));
    } else {
        append(content);
    }

    function append(node) {
        if (typeof node === 'string' || typeof node === 'number') {
            node = document.createTextNode(node);
        }
        result.appendChild(node);
    }

    return result;
}