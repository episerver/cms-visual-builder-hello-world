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