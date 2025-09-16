"use client"

type InputDivData ={
    div:HTMLDivElement,
    options?: {scale?:number , withBorder?:boolean}
}


export default function CreateImage({div,options}:InputDivData):HTMLImageElement{
    const scale = options?.scale ?? 1; // 預設不縮放
    const withBorder = options?.withBorder ?? true;

    const rect = div.getBoundingClientRect();
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas not supported");

     // 支援高 DPI 螢幕
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * scale * dpr;
    canvas.height = rect.height * scale * dpr;
    canvas.style.width = rect.width * scale + "px";
    canvas.style.height = rect.height * scale + "px";
    ctx.scale(dpr, dpr);

    // 填滿 div 背景
    const divStyle = getComputedStyle(div);
    ctx.fillStyle = divStyle.backgroundColor || "white";
    ctx.fillRect(0, 0, rect.width * scale, rect.height * scale);

    // 逐一畫每個子元素
    drawElement(ctx,div,rect,1,withBorder)
    // const blocks = Array.from(div.children);
    // blocks.forEach((block) => {
    //     const r = (block as HTMLElement).getBoundingClientRect();
    //     const style = getComputedStyle(block as HTMLElement);

    //     const x = (r.left - rect.left) * scale;
    //     const y = (r.top - rect.top) * scale;
    //     const w = r.width * scale;
    //     const h = r.height * scale;

    //     // 畫背景
    //     ctx.fillStyle = style.backgroundColor;
    //     ctx.fillRect(x, y, w, h);

    //     // 畫邊框
    //     if (withBorder) {
    //     const borderWidth = parseFloat(style.borderWidth);
    //     if (borderWidth > 0) {
    //         ctx.strokeStyle = style.borderColor;
    //         ctx.lineWidth = borderWidth * scale;
    //         ctx.strokeRect(x, y, w, h);
    //     }
    //     }
    // });

    // 轉換成圖片
    const img = document.createElement("img");
    img.src = canvas.toDataURL("image/png");
    return img;
}
// df 將所有的子div都畫出來
function drawElement(ctx: CanvasRenderingContext2D, element: HTMLElement, rect: DOMRect, scale: number, withBorder = true) {
    const r = element.getBoundingClientRect();
    const style = getComputedStyle(element);

    const x = (r.left - rect.left) * scale;
    const y = (r.top - rect.top) * scale;
    const w = r.width * scale;
    const h = r.height * scale;

    // 畫背景
    ctx.fillStyle = style.backgroundColor;
    ctx.fillRect(x, y, w, h);

    // 畫邊框
    if (withBorder) {
        const borderWidth = parseFloat(style.borderWidth);
        if (borderWidth > 0) {
            ctx.strokeStyle = style.borderColor;
            ctx.lineWidth = borderWidth * scale;
            ctx.strokeRect(x, y, w, h);
        }
    }

    // 遞迴處理子元素
    Array.from(element.children).forEach((child) => {
        drawElement(ctx, child as HTMLElement, rect, scale, withBorder);
    });
}