import { useEffect } from "react";
import Lenis from "lenis";

export function useLenis() {
    useEffect(() => {
        let lenis: any;

        const initLenis = async () => {
            try {
                // Try new package name first
                const LenisModule = await import("lenis").catch(() =>
                    import("@studio-freight/lenis")
                );
                const Lenis = LenisModule.default;

                lenis = new Lenis({
                    duration: 1.4,
                    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                    orientation: "vertical",
                    smoothWheel: true,
                });

                function raf(time: number) {
                    lenis.raf(time);
                    requestAnimationFrame(raf);
                }
                requestAnimationFrame(raf);
            } catch (e) {
                console.warn("Lenis not installed. Run: npm install lenis");
            }
        };

        initLenis();

        return () => {
            if (lenis) lenis.destroy();
        };
    }, []);
}