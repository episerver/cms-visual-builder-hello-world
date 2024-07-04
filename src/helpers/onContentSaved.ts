interface PropertySaved {
    name: string;
    successful: boolean;
}

interface ContentSavedEventArgs {
    contentLink: string;
    previewUrl: string;
    isIndexed: boolean;
    properties: PropertySaved[];
    parentId?: string;
    sectionId?: string;
}

export function getPreviewToken() {
    if (typeof window !== "undefined" && window.location !== undefined) {
        const queryString = window?.location?.search;
        const urlParams = new URLSearchParams(queryString);
        return urlParams.get('preview_token');
    } else {
        return undefined;
    }
}

function isInEditMode() {
    return !!getPreviewToken();
}

function ensureEpiLoaded() {
    if (typeof window !== "undefined") {
        const epi = (window as any).epi;
        if (typeof epi !== "undefined" && epi.isEditable && epi.ready) {
            return epi;
        }
    } else {
        return null;
    }
}

export function onContentSaved(callback: ((message: ContentSavedEventArgs) => void )) {
    if (!isInEditMode()) {
        return;
    }
    
    const epi = ensureEpiLoaded();
    if (epi) {
        console.info("successfully connected to CMS.");
        epi.subscribe("contentSaved", function (message: ContentSavedEventArgs) {
            callback(message);
        });
    } else {
        setTimeout(() => {
            console.info("connecting to CMS...");
            onContentSaved(callback);
        }, 100);
    }
}