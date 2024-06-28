import VisualBuilderComponent from "@/components/base/VisualBuilderComponent";
import { Inter } from "next/font/google";
import useSimpleReloader from "@/hooks/useSimpleReloader";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
    useSimpleReloader();
    let version: string | undefined;
    let key: string | undefined;
    if (typeof window !== "undefined" && window.location !== undefined) {
        if (window.location.pathname.indexOf("CMS/Content") && window.location.pathname.indexOf(",,")) {
            const pathArray = window?.location?.pathname?.split('/')
            const contentId = pathArray[pathArray.length - 1]

            const contentIdArray = contentId.split('_')
            if (contentIdArray.length > 1) {
                version = contentIdArray[contentIdArray.length - 1]
            }
        } else if (window.location.pathname.indexOf("/preview/")) {
            try {
                const url = new URL(window.location.toString());
                const urlKey = url.searchParams.get("key");
                if (urlKey) {
                    key = urlKey;
                }
            } catch {
                key = undefined;   
            }
        }
    }

    return (
        <main className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}>
            <VisualBuilderComponent version={version} key={key} />
        </main>
    );
}
