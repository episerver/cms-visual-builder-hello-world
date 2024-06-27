import { useRouter } from "next/navigation";

export default function useSimpleReloader() {
    const router = useRouter();
    
    setTimeout(() => {
        if (typeof window !== "undefined") {
            const epi = (window as any).epi;
            if (typeof epi !== "undefined") {
                epi.subscribe("contentSaved", async function () {
                    router.refresh();
                });
            }
        }
    }, 1000);
}