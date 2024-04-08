'use client'
import { toPng } from 'html-to-image'
import { useEffect, useRef, useState } from 'react'
import download from 'downloadjs'

const Canvas = () => {
    const canvasRef = useRef<HTMLDivElement>(null)
    const [boxes, setBoxes] = useState<JSX.Element[]>([])
    const [text, setText] = useState<string>('')
    const [previewImg, setPreviewImg] = useState<Blob | MediaSource | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const prevTextRef = useRef<HTMLElement | null>(null)
    const [color, setColor] = useState<string>('black')
    const [size, setSize] = useState<number>(50)
    const [font, setFont] = useState<string>('arial')

    const loadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return
        setPreviewImg(file)
    }

    const addText = () => {
        const newText = (
            <div key={boxes.length} className="absolute text-black cursor-pointer" onMouseDown={handleOnMouseDown}>
                {text}
            </div>
        )
        setBoxes((prevText) => [...prevText, newText])
        setText('')
    }

    const handleOnMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault()
        const target = event.target as HTMLElement

        const offsetX = event.nativeEvent.offsetX
        const offsetY = event.nativeEvent.offsetY

        if (prevTextRef.current === null) {
            prevTextRef.current = target
        }

        if (prevTextRef.current && prevTextRef.current !== target) {
            prevTextRef.current.style.backgroundColor = 'transparent'
            prevTextRef.current = target
        }

        target.style.backgroundColor = 'green'

        const onMouseMove = (e: MouseEvent) => {
            const rect = canvasRef.current?.getBoundingClientRect()
            if (!rect) return

            const newX = e.clientX - rect.left - offsetX
            const newY = e.clientY - rect.top - offsetY

            const maxX = rect.width - target.clientWidth
            const maxY = rect.height - target.clientHeight

            const boundedX = Math.max(0, Math.min(newX, maxX))
            const boundedY = Math.max(0, Math.min(newY, maxY))

            target.style.left = `${boundedX}px`
            target.style.top = `${boundedY}px`
        }

        const onMouseUp = () => {
            document.removeEventListener('mousemove', onMouseMove)
            document.removeEventListener('mouseup', onMouseUp)
        }

        document.addEventListener('mousemove', onMouseMove)
        document.addEventListener('mouseup', onMouseUp)
    }

    const saveImage = () => {
        if (!canvasRef.current) return
        if (prevTextRef.current) {
            prevTextRef.current.style.backgroundColor = 'transparent'
        }
        toPng(canvasRef.current).then((dataUrl) => {
            download(dataUrl, 'custom-image.png')
        })
    }

    const editText = () => {
        if (!prevTextRef.current) return
        prevTextRef.current.style.color = color
        prevTextRef.current.style.fontSize = size.toString()
        prevTextRef.current.style.fontFamily = font
    }

    const deleteText = () => {
        if (!prevTextRef.current) return
        const elementToRemove = prevTextRef.current
        prevTextRef.current.parentNode?.removeChild(elementToRemove)
    }


    return (
        <div className="">
            <div className="relative w-fit" ref={canvasRef}>
                {boxes.map((box, index) => (
                    <div key={index}>{box}</div>
                ))}
                {previewImg ? (
                    <img className="max-w-[600px] max-h-[600px]" src={URL.createObjectURL(previewImg)} alt="preview" />
                ) : (
                    <img src="image-placeholder.svg" alt="preview-img" />
                )}
            </div>
            <div>
                <div>
                    <button className="p-2 m-2 bg-black text-white rounded" onClick={addText}>
                        Agregar Texto
                    </button>
                    <input
                        type="text"
                        className="border rounded p-2border-stone-950"
                        value={text}
                        placeholder="Agregar texto..."
                        onChange={(e) => setText(e.target.value)}
                    />
                </div>

                <div>
                    <input type="file" accept="image/*" hidden ref={fileInputRef} onChange={loadImage} />
                    <button
                        className="p-2 m-2 bg-black text-white rounded"
                        onClick={() => fileInputRef.current?.click()}
                    >
                        Elegir imagen
                    </button>
                </div>
                <div>
                    <button className="p-2 m-2 bg-black text-white rounded" onClick={saveImage}>
                        Guardar imagen
                    </button>
                </div>
                <div>
                    <button className="p-2 m-2 bg-black text-white rounded" onClick={editText}>
                        Cambiar texto
                    </button>
                </div>
                <div>
                    <button className="p-2 m-2 bg-black text-white rounded" onClick={deleteText}>
                        Eliminar texto
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Canvas
