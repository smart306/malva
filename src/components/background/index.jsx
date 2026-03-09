import Image from "next/image";

export default function Background(){
    return (
      <div className="-z-10 w-full h-full overflow-hidden">
        <div className="relative w-full h-full">
          <div className="absolute left-0 z-10 w-1/2 h-full bg-linear-to-l from-primary/15 to-linear"></div>
          <div className="absolute right-0 z-10 w-1/2 h-full bg-linear-to-r from-primary/15 to-linear"></div>
          <div className="relative w-full h-full">
            <div className="-z-10 absolute w-full h-full lg:left-5 xl:translate-x-1/2 translate-y-1/2 bottom-0 lg:top-130 xl:top-60">
              <div className="relative aspect-video w-1/2 h-auto rounded-xl">
                <Image
                  src="/Header.gif"
                  alt="p"
                  fill
                  className="object-cover rounded-4xl"
                />
              </div>
            </div>
            <div className="-z-10 absolute w-full h-full right-25 xl:right-0 lg:translate-y-2/5 xl:translate-y-1/3">
              <div className="relative aspect-video w-1/2 h-auto rounded-xl">
                <Image
                  src="/Header.gif"
                  alt="p"
                  fill
                  className="object-cover rounded-4xl"
                />
              </div>
            </div>
            <div className="-z-10 absolute w-full h-full lg:right-55 xl:right-0 xl:translate-x-5/8 translate-y-1">
              <div className="relative aspect-video w-1/2 h-auto rounded-xl">
                <Image
                  src="/Header.gif"
                  alt="p"
                  fill
                  className="object-cover rounded-4xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}