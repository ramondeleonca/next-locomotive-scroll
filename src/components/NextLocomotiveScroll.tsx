import React, { DetailedHTMLProps, HTMLAttributes } from "react";
import __LocomotiveScroll from 'locomotive-scroll';
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

type Props = {
    children?: JSX.Element | JSX.Element[];
    options?: __LocomotiveScroll.InstanceOptions;
    onInit?: (instance: __LocomotiveScroll) => void;
    gsap?: boolean;
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export default class NextLocomotiveScroll extends React.Component<Props> {
    public instance: __LocomotiveScroll = null as never;
    public container = React.createRef<HTMLDivElement>();

    public state = {
        isReady: false
    }

    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <>
                <div ref={this.container}>
                    {this.props.children}
                </div>
            </>
        )
    }

    componentDidMount(): void {
        import("locomotive-scroll").then(_LocomotiveScroll => {
            const container = this.container.current as HTMLDivElement;
            const LocomotiveScroll = _LocomotiveScroll.default;
            const instance = new LocomotiveScroll({
                smooth: true,
                ...this.props.options,
                el: container
            });
            this.instance = instance;
            this.props.onInit && this.props.onInit(instance);
            this.props.gsap && this.integrateGSAP(instance, container);
            this.setState({isReady: true});
        })
    }

    componentWillUnmount(): void {
        this.instance && this.instance?.destroy();
    }

    integrateGSAP(instance: any, container: HTMLDivElement): void {
        console.log("gsap", instance, container)
        gsap.registerPlugin(ScrollTrigger);
        instance.on("scroll", ScrollTrigger.update);
        ScrollTrigger.scrollerProxy(container, {
            scrollTop(value) {
                return value ? (instance.scrollTo as any)(value ?? 0, 0, 0) : (instance as any)?.scroll?.instance?.scroll?.y;
            },
            getBoundingClientRect() {
                return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
            },
            pinType: container?.style.transform ? "transform" : "fixed"
        });
        ScrollTrigger.defaults({ scroller: container, start: "top top" });
        ScrollTrigger.refresh();
    }

    isReady(): boolean {
        return this.state.isReady;
    }
}