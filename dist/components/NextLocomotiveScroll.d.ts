import { RefObject } from "react";
import __LocomotiveScroll from 'locomotive-scroll';
type NextLocomotiveContextValue = {
    wrapperRef: RefObject<HTMLDivElement>;
    instance: __LocomotiveScroll | null;
    ready: boolean;
};
export declare const NextLocomotiveScrollContext: import("react").Context<NextLocomotiveContextValue | null>;
type Props = {
    children?: any;
    options?: __LocomotiveScroll.InstanceOptions;
    gsap?: boolean;
};
export default function NextLocomotiveScroll(props: Props): JSX.Element;
export declare function useNextLocomotiveScroll(): NextLocomotiveContextValue | null;
export {};
