const epiPropertyName = "data-epi-property-name";
const epiEdit = "data-epi-edit";
let safeCrypto: Crypto;

function uuidFallback() {
    return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (c) =>
        (parseInt(c) ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (parseInt(c) / 4)))).toString(16),
    ) as `${string}-${string}-${string}-${string}-${string}`;
}

if (window && "crypto" in window && "randomUUID" in window.crypto) {
    // it is always defined in https context
    safeCrypto = window.crypto;
} else {
    // fallback for http contexts based on the getRandomValues method that is always available
    safeCrypto = window.crypto ?? ({ randomUUID: uuidFallback } as Crypto);
    safeCrypto.randomUUID = uuidFallback;
}

interface OverlayInfo {
    offsetLeft: number;
    offsetTop: number;
    offsetHeight: number;
    offsetWidth: number;
}

interface BlockOverlayInfo extends OverlayInfo {
    id: string;
    blockNodes: BlockOverlayInfo[] | undefined;
}

interface DocumentProperty extends OverlayInfo {
    name: string;
    tagName: string;
    uniqueName: string;
    dataset: any;
    blockNodes: BlockOverlayInfo[];
    innerHTML: string;
    style: any;
}

function getPropertyNodes(doc: Document) {
    const allNodes = Array.from(doc.querySelectorAll("[data-epi-edit], [data-epi-property-name]"));
    // Write out all the combinations of nested nodes to avoid runtime calculations which would always give the same result.
    const nestedNodes = Array.from(
        doc.querySelectorAll(
            "[data-epi-edit] [data-epi-edit], [data-epi-property-name] [data-epi-property-name], [data-epi-property-name] [data-epi-edit], [data-epi-edit] [data-epi-property-name]",
        ),
    );

    return allNodes.filter(function (node) {
        // return the nodes that are not nested
        return nestedNodes.indexOf(node) === -1;
    });
}

// each property will have unique name that helps when refreshing when size changed
function assignIds(array: DocumentProperty[]) {
    const names = array.map(function (x) {
        return x.name;
    });

    array.forEach(function (x) {
        // when property name occurs only once then it's a unique value
        if (names.filter((y) => y === x.name).length === 1) {
            x.uniqueName = x.name;
            return;
        }

        // when more than once, then add name and unique hash
        const postfix = safeCrypto.randomUUID();
        x.uniqueName = x.name + "_" + postfix;
    });
}

//TODO: node parameter seems unused, clean this up someday:)
function getMarginExtents(node: Element, computedStyle: CSSStyleDeclaration): any {
    const toPixelValue = (element: Element, value: string | null): number => {
        // style values can be floats, client code may want
        // to round for integer pixels.
        return parseFloat(value || "") || 0;
    };

    const l = toPixelValue(node, computedStyle.marginLeft),
        t = toPixelValue(node, computedStyle.marginTop),
        r = toPixelValue(node, computedStyle.marginRight),
        b = toPixelValue(node, computedStyle.marginBottom);
    return { l: l, t: t, r: r, b: b, w: l + r, h: t + b };
}

// negative margin affects size of the overlays
// we need to calculate them and adjust the size
function adjustMargins(overlayInfo: OverlayInfo, node: Element) {
    if (!node.ownerDocument || !node.ownerDocument.defaultView) {
        return;
    }

    const computedStyle =
        node.nodeType === 1 /* ELEMENT_NODE*/ ? node.ownerDocument.defaultView.getComputedStyle(node, null) : null;

    if (!computedStyle) {
        return;
    }

    // deal with negative margins
    const margin = getMarginExtents(node, computedStyle);

    if (margin.l < 0) {
        overlayInfo.offsetLeft -= margin.l;
        overlayInfo.offsetWidth += margin.l;
    }
    if (margin.r < 0) {
        overlayInfo.offsetWidth -= margin.r;
    }
    if (margin.t < 0) {
        overlayInfo.offsetTop -= margin.t;
        overlayInfo.offsetHeight += margin.t;
    }
    if (margin.b < 0) {
        overlayInfo.offsetHeight -= margin.b;
    }
}

function getOverlayInfo(elem: Element, adjustPadding: boolean): OverlayInfo {
    const htmlElem = elem as HTMLElement;
    const rect = elem.getBoundingClientRect();
    const computedStyle = getComputedStyle(htmlElem);
    const paddingTop = parseInt(computedStyle.paddingTop, 10);
    const paddingLeft = parseInt(computedStyle.paddingLeft, 10);
    const paddingRight = parseInt(computedStyle.paddingRight, 10);
    const paddingBottom = parseInt(computedStyle.paddingBottom, 10);

    const newVar = {
        offsetHeight: rect.height - (adjustPadding ? paddingTop + paddingBottom : 0),
        offsetLeft: rect.left + (adjustPadding ? paddingLeft : 0),
        offsetTop: rect.top + (adjustPadding ? paddingTop : 0),
        offsetWidth: rect.width - (adjustPadding ? paddingLeft + paddingRight : 0),
    };

    adjustMargins(newVar, elem);

    return newVar;
}

function constructDocumentProperty(elem: Element) {
    const htmlElem = elem as HTMLElement;
    const overlayInfo = getOverlayInfo(elem, false);
    const propertyName = elem.getAttribute(epiPropertyName) || elem.getAttribute(epiEdit);
    const property: DocumentProperty = {
        name: propertyName || "",
        uniqueName: propertyName ? propertyName + safeCrypto.randomUUID() : safeCrypto.randomUUID(),
        tagName: elem.tagName,
        dataset: Object.assign({}, htmlElem.dataset),
        blockNodes: [],
        innerHTML: elem.innerHTML,
        style: Object.assign({}, htmlElem.style),
        ...overlayInfo,
    };
    property.blockNodes = getBlockNodes(htmlElem);
    return property;
}

const blockSelector = "[data-epi-block-id], [data-epi-content-id]";

function getParentBlock(el: HTMLElement) {
    // @ts-ignore
    while ((el = el.parentNode as HTMLElement) && el !== document) {
        if (el.matches(blockSelector)) {
            return el;
        }
    }
    return null;
}

function getBlockId(element: HTMLElement) {
    return (element.dataset.epiBlockId || element.dataset.epiContentId)!;
}

export function getBlockNodes(element: HTMLElement): BlockOverlayInfo[] {
    const blockElements: BlockOverlayInfo[] = [];
    const elements = element.querySelectorAll(blockSelector);
    const renderBlockElements = (
        blockElements: BlockOverlayInfo[],
        parentBlockId: string,
        blockNode: BlockOverlayInfo,
    ) => {
        blockElements.map((e: BlockOverlayInfo) => {
            if (e.id === parentBlockId) {
                e.blockNodes?.push(blockNode);
            } else {
                renderBlockElements(e.blockNodes || [], parentBlockId, blockNode);
            }
        });
    };
    for (let i = 0; i < elements.length; i++) {
        const element = elements[i] as HTMLElement;
        const overlayInfo = getOverlayInfo(element, false) as BlockOverlayInfo;
        overlayInfo.id = getBlockId(element);
        overlayInfo.blockNodes = [];
        const parentBlock = getParentBlock(element);
        if (parentBlock) {
            renderBlockElements(blockElements, getBlockId(parentBlock), overlayInfo);
        } else {
            blockElements.push(overlayInfo);
        }
    }

    return blockElements;
}

const buildPropertyCollection = () => {
    // collect data about the properties and its positions and send to server for use in calculating bounding boxes in overlay.
    const properties: DocumentProperty[] = [];
    getPropertyNodes(document).forEach(function (elem) {
        properties.push(constructDocumentProperty(elem));
    });
    assignIds(properties);
    return properties;
};

const buildFullReloadPropertyCollection = (): string[] => {
    let fullReloadProperties: string[] = [];
    const element = document.querySelector(
        "input[data-epi-full-refresh-property-names][type='hidden']",
    ) as HTMLInputElement;
    if (element?.dataset?.epiFullRefreshPropertyNames) {
        fullReloadProperties = element.dataset.epiFullRefreshPropertyNames.split(",");
    }

    return fullReloadProperties;
};

export { buildFullReloadPropertyCollection, buildPropertyCollection };
