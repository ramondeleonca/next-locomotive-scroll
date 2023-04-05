# Next Locomotive Scroll

An implementation / wrapper of [locomotive-scroll](https://locomotive-scroll.github.io) for Next.JS with built in integration with [GSAP](https://gsap.com)

## Usage
Usage is pretty straight forward:

```tsx
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
```

To use GSAP tweens with ScrollTrigger a little extra code is needed:

```tsx
{/* Add these two lines to track page loaded state */}
const [loaded, __setLoaded] = useState(false);
useEffect(() => document.readyState === "complete" ? __setLoaded(true) : window.addEventListener("load", () => __setLoaded(true)), []);
```

```tsx
useEffect(() => {
    {/* Place all gsap-related content in a gsap context like normal */}
    const ctx = gsap.context(() => {
        {/* Everything else is normal */}
        gsap.to(polaroidsRef.current, {
            x: `-${100 * polaroidsScale}%`,
            scale: polaroidsScale,
            scrollTrigger: {
                scrub: true,
                trigger: polaroidsRef.current,
                end: "bottom"
            }
        });
    });

    return () => ctx.revert();
}, [
    {/* Except down here... Make sure to add the loaded state to the dependency array */}
    loaded
]);
```