import Image from "next/image";
import bottomImg from "public/bottom.png";
import Link from "next/link";

const UIHeroMine = () => {
    return (
        <div className="flex flex-col sm:grid sm:grid-cols-2">
            <div className="flex flex-col items-center justify-center w-full p-20 bg-cream">
                <Image src={bottomImg} alt="img" objectFit="contain" />    
            </div>
            <div className="flex flex-col justify-center gap-6 px-20 my-10 sm:gap-10">
                <span className="text-xs">THE MINE</span>
                <h2 className="text-3xl">How our jewellery is made</h2>
                <p>
                    Suscipit ut faucibus habitant scelerisque feugiat. Feugiat id massa
                    sapien lacus, praesent. Et lectus neque, sed egestas nisl, faucibus
                    urna vulputate. Curabitur nunc eu rhoncus, tempor tincidunt.
                </p>
                <Link href="https://7879.co" className="p-2 text-white bg-black w-min" target={"_blank"}>
                    <div className="flex items-center justify-center min-w-[163px]">
                        Explore more &rarr;
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default UIHeroMine