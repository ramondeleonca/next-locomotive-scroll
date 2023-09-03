"use client";

import { RefObject, createContext, useContext, useEffect, useRef, useState } from "react";
import __LocomotiveScroll from 'locomotive-scroll';

type NextLocomotiveContextValue = {
    wrapperRef: RefObject<HTMLDivElement>,
    instance: __LocomotiveScroll | null,
    ready: boolean,
}
export const NextLocomotiveScrollContext = createContext<NextLocomotiveContextValue | null>(null)

type Props = {
    children?: any;
    options?: __LocomotiveScroll.InstanceOptions;
    gsap?: boolean;
}
export default function NextLocomotiveScroll(props: Props) {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [instance, setInstance] = useState<__LocomotiveScroll | null>(null);
    const [ready, setReady] = useState<boolean>(false);

    useEffect(() => {
        import("locomotive-scroll").then(({ default: LocomotiveScroll }) => {
            const instance = new LocomotiveScroll({
                smooth: true,
                ...props.options,
                el: wrapperRef.current!
            });
            setInstance(instance);
            setReady(true);
        });

        return () => {
            instance?.destroy();
            setReady(false);
        }
    }, []);

    useEffect(() => {
        if (ready && instance) import("gsap").then(({ default: gsap }) => {
            import("gsap/dist/ScrollTrigger").then(({ default: ScrollTrigger }) => {
                gsap.registerPlugin(ScrollTrigger);
                instance.on("scroll", ScrollTrigger.update);
                ScrollTrigger.scrollerProxy(wrapperRef.current, {
                    scrollTop(value) {
                        return value ? (instance.scrollTo as any)(value ?? 0, 0, 0) : (instance as any)?.scroll?.instance?.scroll?.y;
                    },
                    getBoundingClientRect() {
                        return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
                    },
                    pinType: wrapperRef.current?.style?.transform ? "transform" : "fixed"
                });
                ScrollTrigger.defaults({ scroller: wrapperRef.current, start: "top top" });
                ScrollTrigger.refresh();
            });
        });
    }, [ready, instance]);

    return (
        <NextLocomotiveScrollContext.Provider value={{wrapperRef, instance, ready}}>
            <div ref={wrapperRef} style={{ position: "fixed", top: "0px", minWidth: "100%", minHeight: "100%" }}>
                {props.children}
            </div>
        </NextLocomotiveScrollContext.Provider>
    )
}

export function useNextLocomotiveScroll() {
    return useContext(NextLocomotiveScrollContext);
}