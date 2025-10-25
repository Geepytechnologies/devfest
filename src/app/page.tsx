"use client";

import Image from "next/image";
import Logo from "@/assets/group-logo.svg";
import Background from "@/assets/bgfill.jpg";
import PhotoBoard from "@/components/PhotoBoard";
import React, { useRef, useState, DragEvent, ChangeEvent } from "react";
import html2canvas from "html2canvas";

export default function Home() {
  // Drag and drop/file input handlers
  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const reader = new FileReader();
      reader.onload = (ev) => {
        setImage(ev.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (ev) => {
        setImage(ev.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  const [name, setName] = useState("");
  const [tag, setTag] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  // States for generated values
  const [generatedName, setGeneratedName] = useState("");
  const [generatedTag, setGeneratedTag] = useState("");
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const photoBoardRef = useRef<HTMLDivElement>(null);
  // Handle generate button
  const handleGenerate = () => {
    setGeneratedName(name);
    setGeneratedTag(tag);
    setGeneratedImage(image);
  };

  // Handle download button
  // const handleDownload = async () => {
  //   if (photoBoardRef.current) {
  //     const canvas = await html2canvas(photoBoardRef.current, {
  //       backgroundColor: null,
  //     });
  //     const link = document.createElement("a");
  //     link.download = "photoboard.png";
  //     link.href = canvas.toDataURL();
  //     link.click();
  //   }
  // };

  const handleDownload = async () => {
    if (photoBoardRef.current) {
      // Pre-load fonts to ensure they're available for html2canvas
      await document.fonts.ready;

      const canvas = await html2canvas(photoBoardRef.current, {
        scale: 2, // Double the scale for better quality
        useCORS: true, // Enable cross-origin images
        allowTaint: false, // Disable tainting for better security
        backgroundColor: "#FFFDEB", // Match your background color
        logging: false, // Disable logging for better performance
        width: photoBoardRef.current.scrollWidth,
        height: photoBoardRef.current.scrollHeight,
        onclone: (clonedDoc, element) => {
          // Fix any styling issues in the cloned document
          const clonedElement = element as HTMLElement;

          // Ensure proper font loading in the clone
          clonedElement.style.fontFamily = "'Poppins', Arial, sans-serif";

          // Force images to load properly
          const images = clonedElement.getElementsByTagName("img");
          for (let img of images) {
            img.style.display = "block";
            img.style.objectFit = "cover";
          }

          // Fix alignment issues for specific elements
          const globeContainer = clonedElement.querySelector(
            '[alt="devfest-maiduguri"]'
          )?.parentElement;
          if (globeContainer) {
            globeContainer.style.display = "flex";
            globeContainer.style.alignItems = "center";
          }
        },
      });

      // Create a higher quality image
      const link = document.createElement("a");
      link.download = "devfest-ticket.png";
      link.href = canvas.toDataURL("image/png", 1.0); // Highest quality
      link.click();
    }
  };

  // Handle file selection
  return (
    <>
      <div className="font-poppins bg-white">
        {/* Hero Section */}
        <section>
          <div className="relative min-h-screen overflow-hidden bg-gray-100">
            <div className="relative z-50">
              <nav className="relative z-50 mt-10 lg:mt-20">
                <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                  <div className="flex items-center justify-between h-16 sm:h-18 lg:h-20">
                    <div className="flex items-center flex-shrink-0">
                      <a href="/" className="flex items-center">
                        <Image src={Logo} alt="devfest-maiduguri" />
                      </a>
                    </div>
                  </div>
                </div>
              </nav>
            </div>
            <div className="absolute inset-0 z-0 flex justify-center">
              <Image
                src={Background}
                alt="Background"
                className="object-cover w-full h-full opacity-50"
              />
              <div className="absolute inset-0 bg-white/20"></div>
            </div>
            <div className="relative z-10">
              <div className="flex flex-col items-center justify-center text-center px-4 sm:px-6 md:px-12 lg:px-8 pt-20 sm:pt-24 md:pt-28 lg:pt-10 min-h-[70vh] sm:min-h-[75vh] md:min-h-[70vh] lg:min-h-[80vh]">
                <p className="max-w-xs mb-3 text-base font-medium tracking-wide text-gray-800 sm:mb-4 md:mb-5 sm:text-lg md:text-2xl lg:text-xl sm:max-w-sm md:max-w-2xl lg:max-w-none drop-shadow-sm">
                  Let everyone know you're coming!
                </p>
                <h1 className="max-w-xs mb-6 text-5xl font-black leading-tight text-black sm:text-3xl md:text-8xl lg:text-6xl xl:text-7xl sm:mb-8 md:mb-10 sm:max-w-md md:max-w-5xl lg:max-w-6xl drop-shadow-sm font-poppins">
                  Create your custom DevFest display photo
                </h1>
                <a
                  href="#dp-container"
                  className="z-10 cursor-pointer px-6 py-3 text-base font-bold text-white transition-all duration-300 transform bg-[linear-gradient(to_right,#4285F4,#EA4335,#FBBC05,#34A853)] shadow-lg sm:px-8 sm:py-4 md:px-10 md:py-5 rounded-xl sm:text-lg md:text-xl hover:bg-gray-800 border-[2px] border-white hover:scale-105 hover:shadow-xl active:scale-95">
                  Get Started!
                </a>
              </div>
              <div className="absolute top-20 left-10 w-4 h-4 bg-yellow-400 rounded-full animate-bounce animation-delay-[1s] z-30 drop-shadow-md"></div>
              <div className="absolute top-32 right-16 w-0 h-0 border-l-4 border-r-4 border-b-6 border-l-transparent border-r-transparent border-b-pink-400 animate-pulse animation-delay-[2s] z-30 drop-shadow-md"></div>
              <div className="absolute bottom-32 left-8 w-6 h-2 bg-blue-400 rounded-full animate-pulse animation-delay-[500ms] z-30 drop-shadow-md"></div>
              <div className="absolute bottom-40 right-12 w-4 h-4 bg-green-400 transform rotate-45 animate-spin animation-duration-[6s] z-30 drop-shadow-md"></div>
            </div>
          </div>
        </section>
        <div className="container mx-auto">
          {/* Form Section */}
          <section
            className="flex flex-col md:flex-row items-center justify-center gap-10 my-10 px-6 md:pl-16  min-h-[90vh] "
            id="dp-container">
            {/* Left side: form */}
            <div className="w-full md:w-2/5 flex flex-col justify-center ">
              <h2 className="pb-4 mb-8 text-3xl text-black font-bold border-b-2 border-black">
                Input your details
              </h2>

              {/* Full Name */}
              <div className="mb-4">
                <label className="text-black" htmlFor="name">
                  Full Name
                </label>
                <input
                  placeholder="Your Name"
                  type="text"
                  id="name"
                  name="name"
                  className="border border-gray-300 rounded-md p-2 mt-1 w-full"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              {/* Tag Hook */}
              <div className="mb-4">
                <label className="text-black" htmlFor="tag">
                  Tag Hook
                </label>
                <input
                  placeholder="e.g. #DevFest2025"
                  type="text"
                  id="tag"
                  name="tag"
                  className="border border-gray-300 rounded-md p-2 mt-1 w-full"
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                />
              </div>

              {/* Upload Image */}
              <div>
                <label
                  className="block mb-3 font-semibold"
                  htmlFor="file-upload">
                  Upload Image
                </label>
                <div
                  className={`relative flex flex-col justify-center h-64 p-12 text-center transition-all border-2 border-dashed rounded-2xl ${
                    dragActive
                      ? "border-blue-500 bg-blue-50"
                      : "hover:border-blue-500"
                  }`}
                  onClick={handleClick}
                  onDragEnter={handleDrag}
                  onDragOver={handleDrag}
                  onDragLeave={handleDrag}
                  onDrop={handleDrop}
                  style={{ cursor: "pointer" }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-cloud-upload mx-auto mb-2">
                    <path d="M12 13v8" />
                    <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
                    <path d="m8 17 4-4 4 4" />
                  </svg>
                  <p className="text-sm">
                    Click or drag and drop your profile picture
                    <br />
                    SVG, PNG, JPG or GIF (max. 800 × 400 px)
                  </p>
                  <input
                    id="file-upload"
                    ref={inputRef}
                    accept="image/*"
                    type="file"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />
                  {typeof image === "string" && image && (
                    <img
                      src={image}
                      alt="Preview"
                      className="mx-auto mt-4 rounded-lg object-cover max-h-32"
                    />
                  )}
                </div>
              </div>

              {/* Generate button */}
              <div className="flex flex-col items-center gap-4 w-full mt-6">
                <button
                  className="px-4 py-2 font-medium transition duration-150 ease-in-out bg-blue-500 text-white hover:bg-blue-600 w-full rounded-2xl h-14 text-lg"
                  onClick={handleGenerate}
                  type="button"
                  disabled={!name && !tag && !image}
                  style={{
                    opacity: !name && !tag && !image ? 0.5 : 1,
                    cursor: !name && !tag && !image ? "not-allowed" : "pointer",
                  }}>
                  Generate
                </button>
              </div>
            </div>

            {/* Right side: preview */}
            <div className="w-full overflow-x-auto ">
              <div
                ref={photoBoardRef}
                className="min-w-[700px] mx-auto flex justify-center items-center">
                <PhotoBoard
                  tag={generatedTag}
                  name={generatedName}
                  image={generatedImage}
                />
              </div>
            </div>
          </section>

          {/* Show PhotoBoard and Download button only if generated */}
          {(generatedName || generatedTag || generatedImage) && (
            <section className="flex flex-col items-center gap-4 w-full px-6 md:px-16">
              <button
                className="px-4 py-2 font-medium transition duration-150 ease-in-out bg-green-500 text-white hover:bg-green-600 w-full rounded-2xl h-14 text-lg"
                onClick={handleDownload}
                type="button">
                Download PhotoBoard
              </button>
            </section>
          )}
        </div>
      </div>
      {/* footer */}
      <footer className="bg-[#f0f0f0] text-black min-h-[80px] py-6 px-6 mt-10">
        <div className="container mx-auto text-center">
          <Image src={Logo} alt="devfest-maiduguri" />

          <p className="text-sm">
            &copy; {new Date().getFullYear()} DevFest Maiduguri. All rights
            reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
