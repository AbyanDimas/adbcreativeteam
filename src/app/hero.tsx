"use client";

import Image from "next/image";
import { Button, Typography, Card } from "@material-tailwind/react";

function Hero() {
  return (
    <div className="!flex h-[55vh] w-full items-center justify-between px-10">
      <Image
        width={1200}
        height={1200}
        src="/logos/hero1.webp"
        alt="bg-img"
        className="absolute inset-0 ml-auto w-[920px] h-[780px] rounded-bl-[100px] object-cover object-center"
      />
      <div className="container mx-auto mt-28">
        <div className="grid grid-cols-12 text-center lg:text-left">
          <Card className="col-span-full rounded-xl border border-white bg-white/90 py-10 p-8 shadow-lg shadow-black/10 backdrop-blur-sm backdrop-saturate-200 xl:col-span-7">
            <Typography
              variant="h1"
              color="blue-gray"
              className="lg:text-5xl !leading-snug text-3xl lg:max-w-3xl mt-5"
            >
              Kenalin, kami ADB Creative Team dari SMKN 1 Adiwerna
            </Typography>
            <Typography variant="lead" className="mb-10 mt-6 !text-gray-900">
              Tempatnya anak-anak kreatif ngulik web, desain, dan banyak hal seru lainnya. Siap ikut bareng?
            </Typography>
            <div className="mb-8 flex justify-center gap-4 lg:justify-start">
              <Button color="gray">Gabung Sekarang</Button>
              <Button color="gray" variant="outlined">
                Lihat Divisi
              </Button>
            </div>
<div className="text-center lg:text-left mt-8">
  <Typography variant="small" className="text-gray-600 font-medium mb-2">
    Didukung oleh
  </Typography>
  <Image
    width={144}
    height={144}
    className="mx-auto lg:mx-0 w-56"
    src="/logos/adb.png" // ganti sesuai file logo kamu
    alt="Logo SMKN 1 Adiwerna"
  />
</div>

          </Card>
        </div>
      </div>
    </div>
  );
}
export default Hero;
