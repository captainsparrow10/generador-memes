import React from 'react';
import { Button } from '@Components/UI';
import useImageHandler from '@Hooks/useImageHandler';

const AddImageUrl = () => {
  const { inputUrl, error, handleOnChange, handleInsertUrl } = useImageHandler();

  return (
    <div className="mx-6 flex flex-col gap-12 pb-4">
      <div className="flex flex-col gap-3">
        <p className="font-semibold">Image URL</p>
        <div className="relative flex h-12 flex-col gap-10 rounded border border-gray-300">
          <input
            type="text"
            className="px-4 py-2"
            placeholder="Image link"
            value={inputUrl?.url || ''}
            onChange={handleOnChange}
          />
          {error && <p className="text-sm text-red-500">Url not valid</p>}
        </div>
      </div>
      <Button onClickHandler={handleInsertUrl}>Add Image</Button>
    </div>
  );
};

export default AddImageUrl;