import { ChangeEvent, FocusEventHandler, useRef } from "react";

interface Props {
    image: string;
    onChange: (image: string) => void;
    error?: string;
    name: string;
    onBlur: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    isTouched: boolean;
}

const ChooseImage = ({ image, onChange, name, error, isTouched, onBlur }: Props) => {
    const ref = useRef<HTMLInputElement>(null);

    //Handle file change
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        const reader = new FileReader();

        reader.onloadend = function () {
            const result = reader.result;
            if (result) {
                onChange(result.toString());
            }
        };

        if (files[0]) {
            reader.readAsDataURL(files[0]);
        }
    };

    //
    return (
        <>
            <div className="w-full h-[250px] rounded-xl overflow-hidden bg-slate-100 flex items-center justify-center">
                {image ? <img src={image} alt="Event" width={200} height={200} className="object-cover w-full h-full" /> :
                    <button type="button" onClick={() => ref.current?.click()} className="hover:scale-150" title="Choose Profile Image">
                        {/* <IconPhotoPlus size={15} /> */}   Select Image
                    </button>}
            </div>
            {isTouched && error && <p className="text-red-500 text-xs">{error}</p>}
            <input
                ref={ref}
                name={name}
                type="file"
                hidden
                accept="image/png,image/jpeg,image/jpg"
                onChange={handleFileChange}
                onBlur={onBlur}
            />
            {image && <button type="button" onClick={() => ref.current?.click()} className="hover:bg-opacity-80 bg-primary text-white p-2 rounded flex items-center gap-2 justify-center text-xs w-[150px]">
                {/* <IconPhotoPlus size={15} /> */}
                <span>Change Image</span>
            </button>}
        </>
    )
}

export default ChooseImage