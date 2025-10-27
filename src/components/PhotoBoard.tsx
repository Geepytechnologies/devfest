import React from "react";
import Image from "next/image";
import { useState, useEffect, forwardRef } from "react";
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

const TARGET_WIDTH = 250;
const TARGET_HEIGHT = 290;

function PhotoBoardInner(
  { tag, name, image }: Props,
  ref: React.Ref<HTMLDivElement>
) {
  const [imageScale, setImageScale] = useState({
    width: TARGET_WIDTH,
    height: TARGET_HEIGHT,
    x: 0,
    y: 0,
  });

  useEffect(() => {
    if (!image) return;

    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.src = image;

    img.onload = () => {
      const { width: imgWidth, height: imgHeight } = img;

      const imgAspect = imgWidth / imgHeight;
      const targetAspect = TARGET_WIDTH / TARGET_HEIGHT;

      let scaledWidth = TARGET_WIDTH;
      let scaledHeight = TARGET_HEIGHT;
      let offsetX = 0;
      let offsetY = 0;

      if (imgAspect > targetAspect) {
        // Image is wider than target (landscape or wide portrait)
        scaledHeight = TARGET_HEIGHT;
        scaledWidth = imgWidth * (TARGET_HEIGHT / imgHeight);
        offsetX = -(scaledWidth - TARGET_WIDTH) / 2;
      } else {
        // Image is taller than target (portrait or full-body)
        scaledWidth = TARGET_WIDTH;
        scaledHeight = imgHeight * (TARGET_WIDTH / imgWidth);
        offsetY = -(scaledHeight - TARGET_HEIGHT) / 2;
      }

      // Intelligent centering adjustment
      const portraitBias = imgAspect < 0.7 ? 0.05 : 0.01; // more top bias for full-body
      offsetY -= (scaledHeight - TARGET_HEIGHT) * portraitBias;

      setImageScale({
        width: scaledWidth,
        height: scaledHeight,
        x: offsetX,
        y: offsetY,
      });
    };
  }, [image]);

  return (
    <div className="bg-[#FFFDEB] py-9 px-5" ref={ref}>
      <div className="flex flex-row justify-between">
        <Image src={Logo} alt="devfest-maiduguri" />
        <Image src={Castle} alt="devfest-maiduguri" />
      </div>

      <div className="flex flex-row justify-between">
        <div className="space-y-4 flex flex-col justify-center">
          <div className="relative inline-block">
            <Image src={Shape} alt="shape" />
            <span className="absolute inset-0 flex items-center justify-center text-black -translate-y-2 font-[500] font-poppins">
              {tag || "{Tag Hook Here}"}
            </span>
          </div>

          <div className="bg-[#F9AB00] w-[197px] h-[115px] rounded-[32px] pt-4 relative inline-block">
            <div className="absolute inset-0 flex items-center justify-center text-black font-[500] font-poppins gap-[18px] flex-col">
              <span>{name || "{First Name Here}"}</span>
              <span className="font-[700]">I WILL BE THERE</span>
            </div>
          </div>
        </div>

        {image ? (
          <svg
            width={TARGET_WIDTH}
            height={TARGET_HEIGHT}
            viewBox={`0 0 ${TARGET_WIDTH} ${TARGET_HEIGHT}`}
            className="bg-white rounded-[22px]"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <clipPath id="image-clip">
                <rect
                  x="0"
                  y="0"
                  width={TARGET_WIDTH}
                  height={TARGET_HEIGHT}
                  rx="22"
                />
              </clipPath>
            </defs>

            <image
              href={image}
              x={imageScale.x}
              y={imageScale.y}
              width={imageScale.width}
              height={imageScale.height}
              preserveAspectRatio="xMidYMid slice"
              clipPath="url(#image-clip)"
              crossOrigin="anonymous"
            />
          </svg>
        ) : (
          <Image
            src={Usman}
            alt="attendee"
            className="bg-white rounded-[22px] w-[250px] h-[295px] object-cover object-top"
          />
        )}
      </div>

      <div className="flex flex-row items-center gap-[10px] pt-[10px]">
        <Image src={LogoYear} alt="devfest-maiduguri" />
        <div className="flex flex-row items-center gap-[6px]">
          <Image src={Globe} alt="globe" />
          <p className="font-josef text-[20px] lowercase font-[600] leading-[22px] text-black">
            www.gdgmaiduguri.com
          </p>
        </div>
      </div>

      <div className="flex flex-row gap-3 mt-3">
        <Image src={Anniversary} alt="anniversary" />
        <div className="flex flex-col gap-[5px]">
          <div className="bg-[#F6B819] rounded-3xl px-3 py-[10px] text-black tracking-[0.499px] text-xs font-coolvetica max-w-fit flex items-center justify-center">
            <p>22nd November, 2025 | 9:00am</p>
          </div>
          <div className="bg-black rounded-3xl px-3 py-[10px] text-white flex flex-row items-center gap-1">
            <Image src={LocationIcon} alt="location" />
            <p className="text-center text-xs capitalize font-[600] font-josef">
              Borno State Hotel Conference Hall, Maiduguri
            </p>
          </div>
        </div>
      </div>

      <div className="mt-[30px] flex items-center justify-center">
        <Image src={Sponsors} alt="sponsors" />
      </div>
    </div>
  );
}

const PhotoBoard = forwardRef<HTMLDivElement, Props>(PhotoBoardInner);

PhotoBoard.displayName = "PhotoBoard";

export default PhotoBoard;
