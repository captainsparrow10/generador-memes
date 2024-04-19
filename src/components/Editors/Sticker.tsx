'use client'
import { useTextContext } from "@Contexts/Text";
import { PhotoIcon } from "@heroicons/react/16/solid";
import Image from "next/image";

type StickerEditorProps = {
  editSticker: (e: React.ChangeEvent<HTMLInputElement>) => void;
  deleteSticker: () => void;
};

const StickerEditor = ({ deleteSticker, editSticker }: StickerEditorProps) => {
  const { stickerSelected } = useTextContext();

  return (
    <div className="flex items-center gap-x-6">
      <div className="relative h-24 w-24 shrink-0">
        {stickerSelected.url ? (
          <Image src={stickerSelected.url} alt="img" fill />
        ) : (
          <PhotoIcon className="h-full w-full text-gray-300" />
        )}
      </div>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <label htmlFor="width">Tamaño</label>
          <input
            type="number"
            placeholder="Escribe el tamaño"
            className=" boder-gray-3000 rounded border px-3 py-2"
            value={stickerSelected.size}
            onChange={editSticker}
            min={1}
          />
          <button
            onClick={deleteSticker}
            className="h-fit rounded-sm border border-transparent bg-black px-2 py-2 text-white duration-150 ease-in-out hover:border-black hover:bg-white hover:text-black"
          >
            Eliminar
          </button>
        </div>
      </div>
      <div className="flex h-full items-end py-2 "></div>
    </div>
  );
};

export default StickerEditor;
