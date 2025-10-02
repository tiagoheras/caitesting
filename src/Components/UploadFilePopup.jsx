import { useRef, useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { bucket } from '../utils/supabaseClient';
import LogIn from './LogIn';

function createSafeFilename(file) {
    const fileNameParts = file.name.split('.');
    const fileExtension = fileNameParts.pop().toLowerCase();
    let baseName = fileNameParts.join('.');

    // Pasa a minúsculas
    baseName = baseName.toLowerCase();
    // Reemplaza acentos y caracteres especiales
    baseName = baseName.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    // Reemplaza espacios y cualquier caracter no alfanumérico por un guión
    baseName = baseName.replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');

    const uniquePrefix = Date.now();

    const safeFilename = `${uniquePrefix}-${baseName}.${fileExtension}`;

    return safeFilename;
}

function UploadFilePopup({ handleLastUpdatedChange, session }) {
    const [open, setOpen] = useState(false);
    const closeModal = () => {
        setOpen(false);
        setFilesToUpload([]);
    };
    const fileInputRef = useRef(null);

    const [isDragging, setIsDragging] = useState(false);
    const [filesToUpload, setFilesToUpload] = useState([]);
    const [isUploading, setIsUploading] = useState(false);


    // --- LÓGICA MODIFICADA Y NUEVA ---

    const handleFileSelection = (fileList) => {
        const newFiles = Array.from(fileList);
        setFilesToUpload(prevFiles => [...prevFiles, ...newFiles]);
    };

    // 2. Manejadores de eventos para el input y el dropzone
    const handleChange = (e) => {
        if (e.target.files) {
            handleFileSelection(e.target.files);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault(); // <-- Esencial para que onDrop funcione
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files) {
            handleFileSelection(e.dataTransfer.files);
        }
    };

    const handleClean = () => {
        setFilesToUpload([]);
        if (fileInputRef.current) {
            fileInputRef.current.value = null;
        }
    }

    const uploadPicture = async (file) => {
        try {
            const { data, error } = await bucket
                .upload(`imagenes/${createSafeFilename(file)}`, file, {
                    cacheControl: '3600',
                    upsert: false
                });

            if (error) {
                throw error;
            }
            return data;
        } catch (error) {
            console.error(`Error al subir ${file.name}:`, error);
            throw error;
        }
    };

    // 4. Nueva función para subir TODOS los archivos de la lista
    const handleUploadAll = async () => {
        if (filesToUpload.length === 0) return;

        setIsUploading(true);
        // Creamos un array de promesas, una por cada archivo a subir
        const uploadPromises = filesToUpload.map(file => uploadPicture(file));

        try {
            // Promise.all espera a que todas las subidas terminen
            await Promise.all(uploadPromises);
            console.log("¡Todos los archivos se subieron con éxito!");
            handleLastUpdatedChange(Math.floor(new Date().getTime() / 1000.0));
            closeModal();
        } catch (error) {
            console.error("Al menos una de las subidas falló.", error);
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div>
            <button onClick={() => setOpen(o => !o)} className='flex items-center'>
                <p className='px-2'>Upload</p>
                <i id='upload-icon' className="fa-solid fa-cloud-arrow-up"></i>
            </button>
            <Popup open={open} closeOnDocumentClick onClose={closeModal}>
                <LogIn session={session}>
                    <div className="p-4 flex flex-col items-center justify-center w-full">
                        {/* El Dropzone ahora usa los nuevos manejadores de eventos */}
                        <label
                            htmlFor="dropzone-file"
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            className={`flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer transition-colors
                                ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-gray-50 hover:bg-gray-100'}`}
                        >
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                                <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click para subir</span> o arrastrá y soltá</p>
                                <p className="text-xs text-gray-500">SVG, PNG, JPG, GIF, etc.</p>
                            </div>
                            <input
                                onChange={handleChange}
                                id="dropzone-file"
                                type="file"
                                className="hidden"
                                ref={fileInputRef}
                                multiple
                            />
                        </label>

                        {/* --- NUEVA SECCIÓN PARA MOSTRAR ARCHIVOS Y SUBIR --- */}
                        {filesToUpload.length > 0 && (
                            <div className="w-full mt-4">
                                <h3 className="font-semibold text-lg">Archivos seleccionados:</h3>
                                <ul className="mt-2 list-disc list-inside max-h-40 overflow-y-auto">
                                    {filesToUpload.map((file, index) => (
                                        <li key={index} className="text-sm text-gray-700 truncate">{file.name}</li>
                                    ))}
                                </ul>
                                <div className='flex justify-between items-center mt-4'>
                                    <button
                                        onClick={handleClean}
                                        className='text-sm text-red-500 hover:underline'
                                    >
                                        Limpiar todo
                                    </button>
                                    <button
                                        onClick={handleUploadAll}
                                        disabled={isUploading}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
                                    >
                                        {isUploading ? 'Subiendo...' : `Subir ${filesToUpload.length} archivo(s)`}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </LogIn>
            </Popup>
        </div>
    );
}

export default UploadFilePopup;