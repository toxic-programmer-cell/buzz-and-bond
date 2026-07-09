import { RefObject } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP);

export function useHeaderAnimation(headerRef: RefObject<HTMLElement | null>) {
    useGSAP(() => {
        if (!headerRef.current) return;

        gsap.fromTo(
            headerRef.current,
            {
                opacity: 0,
                y: -40,
            },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power3.out",
            }
        )
    }, [])
}