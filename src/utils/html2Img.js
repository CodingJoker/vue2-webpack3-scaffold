import html2Canvas from 'html2canvas';
export default async (nodeId, config = {}) => {
    const node = document.getElementById(nodeId);
    const w = node.offsetWidth;
    const h = node.offsetHeight;
    const myCanvas = document.createElement('canvas');
    // 放大画布
    myCanvas.width = w;
    myCanvas.height = h;
    const img = new Image();
    let b64Data = '';
    const returnCanvas = await html2Canvas(node, Object.assign({
        canvas : myCanvas,
        useCORS : true
    }, config));
    try {
        b64Data = returnCanvas.toDataURL('image/jpeg', '1.0');
        img.width = w;
        img.height = h;
        img.src = b64Data;
    } catch (err) {
        console.log(err)
    }
    return b64Data;
};
