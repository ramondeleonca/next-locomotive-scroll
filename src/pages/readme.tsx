import NextLocomotiveScroll from "../components/NextLocomotiveScroll";
import React from "react";

export default function Readme() {
    return (
        <>
            {/* Simply add the component to the root of your page */}
            <NextLocomotiveScroll
                // Configure it with any options you'd use with locomotive-scroll
                options={{
                    lerp: 0.133
                }}
                // Optionally integrate it with GSAP ScrollTrigger
                gsap={true}
            >
                {/* And add your page's children */}
                <div>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</div>
            </NextLocomotiveScroll>
        </>
    )
}