import { useState } from 'react';
import { v4 } from 'uuid';
import { useRouter } from 'next/navigation';
import { MemeImageType } from '@Types';
import { useCanvaContext } from '@Contexts/Canva';

const useImageHandler = () => {
  const { setImageSelected, setShowModal, } = useCanvaContext(); 

  const router = useRouter();
  const [inputUrl, setInputUrl] = useState<MemeImageType | null>(null);
  const [error, setError] = useState<boolean>(false);
  const [errorDropImage, setErrorDropImage] = useState(false);

  const handleInsertUrl = () => {
    if (!inputUrl) return;

    if (!isImage(inputUrl.url, ['.jpg', '.jpeg', '.png'])) {
      setError(true);
      return;
    }

    setError(false);

    setImageSelected(inputUrl);
    setShowModal(false);
    router.push('/' + inputUrl.id);
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === '') {
      setError(false);
    }

    const meme: MemeImageType = {
      id: v4(),
      name: 'example',
      url: e.target.value,
    };
    setInputUrl(meme);
  };

  const isImage = (url: string, extensions: string[]) => {
    return extensions.some((ext) => url.endsWith(ext));
  };

  const displayFile = (file: any) => {
    if (!isImage(file.type, ['png', 'jpeg', 'jpg'])) {
      setErrorDropImage(true);
      return;
    }

    setErrorDropImage(false);

    const meme = {
      id: v4(),
      name: file.name,
      url: URL.createObjectURL(file),
    };
    setImageSelected(meme);
    setShowModal(false);
    router.push('/' + meme.id, { scroll: false });
  };

  const loadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    displayFile(file);
  };

  const loadImageDrop = (e: any) => {
    const file = e.dataTransfer.files[0];
    if (!file) return;
    displayFile(file);
  };

  return { inputUrl, error, handleOnChange, handleInsertUrl, errorDropImage, loadImage, setErrorDropImage, loadImageDrop };
};

export default useImageHandler;
