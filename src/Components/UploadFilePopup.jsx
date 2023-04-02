import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { bucket, supabase } from '../utils/supabaseClient';
import LogIn from './LogIn';

function UploadFilePopup({handleLastUpdatedChange, session}) {
    const [open, setOpen] = useState(false);
    const closeModal = () => setOpen(false);

    const handleChange = (e) => {
        const file = e.target.files[0]
        if(file) {
            uploadPicture(file);
            closeModal();
        }
    }

    const uploadPicture = async (file) => {
        console.log(file)
        try {
            const { data, error } = await bucket
                .upload(`imagenes/${file.name}`, file, {
                    cacheControl: '3600',
                    upsert: false
                })
            if (data) {
                handleLastUpdatedChange(Math.floor(new Date().getTime() / 1000.0));
                console.log(data)
            } else {
                throw new Error(error)
            }
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <div>
            <button onClick={() => setOpen(o => !o)} className='flex items-center'>
                <p className='px-2'>Upload</p>
                <i id='upload-icon' className="fa-solid fa-cloud-arrow-up"></i>
            </button>
            <Popup open={open} closeOnDocumentClick onClose={closeModal}>
                <LogIn session={session}>
                    <div class="flex items-center justify-center w-full">
                        <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 hover:bg-gray-100">
                            <div class="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg aria-hidden="true" class="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                                <p class="mb-2 text-sm text-gray-500"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                                <p class="text-xs text-gray-500">SVG, PNG, JPG or GIF</p>
                            </div>
                            <input onChange={handleChange} id="dropzone-file" type="file" class="hidden" />
                        </label>
                    </div>
                </LogIn>
            </Popup>
        </div>

    );
}

export default UploadFilePopup;