import { WordRotate } from "@/components/ui/word-rotate";

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden">
      <div className="relative z-10 h-[42.5dvh] md:h-[51.2dvh] md:min-h-[50dvh] xl:h-[61.2dvh]">
        <div className="relative flex h-full flex-col items-center justify-center">
          <div className="flex w-full items-center justify-center px-4 md:px-6">
            <h1 className="text-4xl font-light sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl">
              <span>A </span>
              <span>developer</span>
              <br />
              <span className="flex items-center gap-2 md:gap-4">
                <span>Who</span>
                <span className="relative mx-2 my-auto inline-block aspect-1.5/1 h-13 overflow-hidden rounded-full bg-linear-to-br from-pink-200 from-40% to-pink-400 md:mx-4 md:h-[7.8rem]">
                  <span className="absolute inset-0 flex items-center justify-center text-4xl select-none md:text-7xl">
                    ❤️
                  </span>
                </span>
                <div className="flex flex-col">
                  <span>to</span>
                  <div className="relative flex items-center">
                    <span className="opacity-0">hidden</span>
                    <WordRotate
                      className="absolute inset-0"
                      words={["code", "build", "create", "solve"]}
                    />
                  </div>
                </div>
              </span>
            </h1>
          </div>
        </div>
      </div>

      {/*<div className="relative flex h-full flex-col items-center justify-center">
        <div className="flex flex-col w-full px-4 md:px-6">
          <span className="text-base font-light sm:text-lg md:text-xl lg:text-1xl xl:text-2xl 2xl:text-3xl tracking-tight">
            Hi, my name is
          </span>
          <h1 className="text-2xl font-light sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl">
            Anthony Amiluddin
          </h1>
        </div>
      </div>*/}
    </section>
  );
}
