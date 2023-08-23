import Image from "next/image";
import topImg from "public/top.png";

const HeroInvestments = () => {
    return (
        <div className="flex sm:h-[483px] h-auto justify-center items-center bg-cream gap-6 sm:flex-row p-12 flex-col-reverse">
            <div className="flex flex-col max-w-3xl gap-8 py-6 px-7">
                <p className="text-3xl">My Investments</p >
                <p className="text-lg">
                    Paragraph about your portfolio, what you can see, why it is useful and
                    how it works so they know exactly what it is before they scroll.
                    Paragraph about your portfolio, what you can see, why it is useful and
                    how it works so they know exactly what it is before they scroll.
                </p>
            </div>
            <Image src={topImg} alt="Rings and pendants ilustration" objectFit="contain" />
        </div>
    )
}

export default HeroInvestments