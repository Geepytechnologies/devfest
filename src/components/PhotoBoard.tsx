import Image from "next/image";
import Logo from "@/assets/group-logo.svg";
import Castle from "@/assets/castle.svg";
import Shape from "@/assets/shape.svg";
import Globe from "@/assets/globe.svg";
import LogoYear from "@/assets/DF25-Logo.svg";
import Anniversary from "@/assets/Anniversary.svg";
import LocationIcon from "@/assets/location.svg";
import Sponsors from "@/assets/sponsors.svg";
import Usman from "@/assets/usman.png";
type Props = {
  tag?: string;
  name?: string;
  image?: string | null;
};

const PhotoBoard = ({ tag, name, image }: Props) => {
  return (
    <div className="bg-[#FFFDEB] py-9 px-5">
      <div className="flex flex-row justify-between">
        <div>
          <Image src={Logo} alt="devfest-maiduguri" />
        </div>
        <div>
          <Image src={Castle} alt="devfest-maiduguri" />
        </div>
      </div>
      <div className="flex flex-row gap-[30px]">
        <div className="space-y-4 flex flex-col justify-center">
          <div className="relative inline-block">
            <Image src={Shape} alt="devfest-maiduguri" />
            <span className="absolute inset-0 flex items-center justify-center text-black -translate-y-2 font-[500] font-poppins">
              {tag ? tag : "{Tag Hook Here}"}
            </span>
          </div>
          <div className="bg-[#F9AB00] w-[197px] h-[115px] rounded-[32px] pt-4 relative inline-block">
            <div className="absolute inset-0 flex items-center justify-center text-black font-[500] font-poppins gap-[18px] flex-col">
              <span>{name ? name : "{First Name Here}"}</span>
              <span className="font-[700]">I WILL BE THERE </span>
            </div>
          </div>
        </div>
        {image ? (
          <svg
            width={290}
            height={255}
            viewBox="0 0 290 255"
            className="bg-[#E74436] rounded-[22px]"
            style={{
              borderRadius: 22,
              width: 290,
              height: 255,
              overflow: "hidden",
            }}
            xmlns="http://www.w3.org/2000/svg"
          >
            <image
              href={image}
              x="0"
              y="0"
              width="290"
              height="255"
              preserveAspectRatio="xMidYMid slice"
              crossOrigin="anonymous"
              clipPath=""
            />
          </svg>
        ) : (
          <Image
            src={Usman}
            alt="attendee"
            className="bg-[#E74436] rounded-[22px] w-[290px] h-[255px] object-cover"
            style={{ objectPosition: "top" }}
          />
        )}
      </div>
      <div className="flex flex-row items-center gap-[10px] pt-[10px]">
        <Image src={LogoYear} alt="devfest-maiduguri" />
        <div className="flex flex-row items-center gap-[6px]">
          <Image src={Globe} alt="devfest-maiduguri" />
          <p className="font-josef text-[20px] lowercase font-[600] -tracking-[0.099px] leading-[22px] text-black">
            www.gdgmaiduguri.com
          </p>
        </div>
      </div>
      <div className="flex flex-row gap-3 mt-3">
        <Image src={Anniversary} alt="devfest-maiduguri" />
        <div className="flex flex-col gap-[5px]">
          <div className="bg-[#F6B819] rounded-3xl px-3 py-[10px]  text-black tracking-[0.499px] text-xs font-coolvetica max-w-fit flex items-center justify-center">
            <p className="text-center">22nd November, 2025 | 9:00am</p>
          </div>
          <div className="bg-black rounded-3xl px-3 py-[10px]  text-white flex flex-row items-center gap-1">
            <Image src={LocationIcon} alt="devfest-maiduguri" />
            <p className="text-center text-xs capitalize font-[600] font font-josef -tracking-[0.059px]">
              Borno State Hotel Conference Hall, Maiduguri
            </p>
          </div>
        </div>
      </div>
      <div className="mt-[30px] flex items-center justify-center">
        <Image src={Sponsors} alt="devfest-maiduguri-sponsors" />
      </div>
    </div>
  );
};

export default PhotoBoard;
