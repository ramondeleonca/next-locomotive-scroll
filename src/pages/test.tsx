import "locomotive-scroll/dist/locomotive-scroll.min.css"
import NextLocomotiveScroll from "../components/NextLocomotiveScroll";

export default function Test() {
    return (
        <NextLocomotiveScroll options={{ lerp: 0.05 }}>
            <div className="section">
                <h1 style={{fontSize: "25vh"}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum explicabo deleniti eveniet iusto ab ratione nemo consectetur, corrupti commodi! Iste corrupti repellat minus omnis nesciunt reprehenderit neque, ipsa beatae est nihil quae praesentium aperiam at temporibus fugit eligendi qui quo porro alias modi veritatis. Reiciendis quaerat, laudantium odio excepturi nostrum dicta eum unde, est temporibus optio consequuntur? Optio rerum beatae, odio quibusdam expedita quis recusandae fuga dolorem quam possimus aliquid ipsa ab voluptatum hic accusamus ex culpa harum officia autem minima dolores in ad consequatur. Aliquam beatae rem, ullam soluta voluptate fuga est debitis dicta voluptatem facere ipsam quasi tenetur.</h1>
            </div>
        </NextLocomotiveScroll>
    );
}