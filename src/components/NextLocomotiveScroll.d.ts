import React, { DetailedHTMLProps, HTMLAttributes } from "react";
import __LocomotiveScroll from 'locomotive-scroll';
type Props = {
    children?: JSX.Element | JSX.Element[];
    options?: __LocomotiveScroll.InstanceOptions;
    onInit?: (instance: __LocomotiveScroll) => void;
    gsap?: boolean;
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
export default class NextLocomotiveScroll extends React.Component<Props> {
    instance: __LocomotiveScroll;
    container: any;
    state: {
        isReady: boolean;
    };
    constructor(props: Props);
    render(): JSX.Element;
    componentDidMount(): void;
    componentWillUnmount(): void;
    integrateGSAP(instance: any, container: HTMLDivElement): void;
    isReady(): boolean;
}
export {};
