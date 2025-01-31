"use client";

import { Media } from "@prisma/client";
import Image from "next/image";

interface PostProps {
  attachments: Media[];
}

const ImageGrid = ({ attachments: images }: PostProps) => {
  if (images.length === 1) {
    return (
      <div className="relative aspect-[16/9] w-full border bg-slate-200">
        <MediaPreview media={images[0]} />
      </div>
    );
  }

  if (images.length === 2) {
    return (
      <div className="grid aspect-[16/9] grid-cols-2 gap-1">
        {images.map((image, index) => (
          <div key={index} className="relative border bg-slate-200">
            <MediaPreview media={image} />
          </div>
        ))}
      </div>
    );
  }

  if (images.length === 3) {
    return (
      <div className="grid aspect-[16/9] grid-cols-2 gap-1">
        <div className="relative border bg-slate-200">
          <MediaPreview media={images[0]} />
        </div>
        <div className="grid grid-rows-2 gap-1">
          {images.slice(1).map((image, index) => (
            <div key={index} className="relative border bg-slate-200">
              <MediaPreview media={image} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (images.length === 4) {
    return (
      <div className="grid aspect-[16/9] grid-cols-2 gap-1">
        {images.map((image, index) => (
          <div key={index} className="relative border bg-slate-200">
            <MediaPreview media={image} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid aspect-[16/9] grid-cols-5 grid-rows-2 gap-1">
      <div className="relative col-span-2 row-span-2 border bg-slate-200">
        <MediaPreview media={images[0]} />
      </div>
      <div className="relative col-span-3 border bg-slate-200">
        <MediaPreview media={images[1]} />
      </div>
      <div className="relative border bg-slate-200">
        <MediaPreview media={images[2]} />
      </div>
      <div className="relative border bg-slate-200">
        <MediaPreview media={images[3]} />
      </div>
      <div className="relative border bg-slate-200">
        <MediaPreview media={images[4]} />
      </div>
    </div>
  );
};

export default function PostGallery({ attachments }: PostProps) {
  return (
    <div className="p-2">
      <div className="overflow-hidden rounded-lg">
        <ImageGrid attachments={attachments} />
      </div>
    </div>
  );
}

interface MediaPreviewProps {
  media: Media;
}

function MediaPreview({ media }: MediaPreviewProps) {
  if (media.type === "IMAGE") {
    return (
      <div className="group relative h-full w-full overflow-hidden">
        <Image
          priority={true}
          src={media.url}
          alt={"Post Image"}
          fill
          sizes="100vw"
          className="object-cover brightness-75 transition-all duration-300 group-hover:scale-150"
        />
      </div>
    );
  }

  if (media.type === "VIDEO") {
    return (
      <div className="group relative flex h-full items-center justify-center bg-black">
        <video
          src={media.url}
          controls
          className="brightness-75 transition-all duration-300 group-hover:scale-105"
        />
      </div>
    );
  }

  return <p className="text-destructive">Unsupported media type</p>;
}
