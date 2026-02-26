import Button from "../Buttons_And_Links/Button";
import ConcaveCarousel from "../ConcaveCarousel";

export default function StayConnected() {

    return (
        <section className="py-12 sm:py-16 lg:py-20 flex flex-col gap-5 w-full overflow-hidden">
            <div className="flex flex-col items-center gap-5 w-full">
                <div className="flex items-center gap-2 bg-black text-white rounded-full px-4 py-1.5 text-[13px] font-Inter tracking-[-0.02em] select-none">
                    Stay connected
                </div>

                <h2 className="text-[40px]! sm:text-[48px]! mb-0! text-center px-4">
                    See our community<br />in modern silhouettes
                </h2>

                <p className="t16 mb-0! text-center max-w-105 px-6">
                    Connect with us on social media for a daily dose of fresh style, featuring exclusive looks from our community.
                </p>

                <div className="flex items-center gap-3 flex-wrap justify-center">
                    <Button variant="btn2" title="See collections" href="/products" />
                    <Button variant="btn1" title="Contact us" href="/contact" />
                </div>
            </div>

            <div className="mt-15">
                <ConcaveCarousel />
            </div>
        </section>
    );
}
