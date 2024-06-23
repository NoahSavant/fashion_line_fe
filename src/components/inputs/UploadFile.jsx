import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import Dropzone from 'react-dropzone';
import { Modal, Button } from 'rsuite';
import { getCroppedImg } from './cropImage';
import 'rsuite/dist/rsuite.min.css';
import {
    CameraRetroIcon,
    HiMiniXCircle
} from '@/components/icons.js';

const UploadFile = ({ cropDimensions = null, values, setValues, number = null, className = '' }) => {
    const [files, setFiles] = useState(Array.isArray(values) ? values : [values] );
    const [imageSrc, setImageSrc] = useState(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [currentFile, setCurrentFile] = useState(null);

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const onDrop = useCallback((acceptedFiles) => {
        const newFiles = [...files, ...acceptedFiles];
        setFiles(newFiles);
        setValues(newFiles);

        const imageFile = acceptedFiles.find(file => file.type && file.type.startsWith('image/'));
        if (imageFile) {
            const reader = new FileReader();
            reader.readAsDataURL(imageFile);
            reader.onload = () => {
                setImageSrc(reader.result);
                setCurrentFile(imageFile);
                setShowModal(true);
            };
        }
    }, [files, setValues]);

    const handleCrop = async () => {
        try {
            const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
            const updatedFiles = files.map(file => {
                if (file === currentFile) {
                    return new File([croppedImage], file.name, { type: file.type });
                }
                return file;
            });
            setFiles(updatedFiles);
            setShowModal(false);
            setValues(updatedFiles);
        } catch (e) {
            console.error(e);
        }
    };

    const handleRemoveFile = (fileToRemove) => {
        const filteredFiles = files.filter(file => file !== fileToRemove);
        setFiles(filteredFiles);
        setValues(filteredFiles);
    };

    function getPreviewUrl(file) {
        if(file) {
            if(typeof file === 'string') {
                return file;
            }
            return URL.createObjectURL(file)
        }
        return '#'
    }

    return (
        <div className="space-y-4">
            <div className="flex space-x-4">
                {files.map((file, index) => (
                    <div key={index} className={`relative border-2 border-gray-300 border-dashed rounded-lg p-1 flex justify-center items-center ${className}`}>
                        <img
                            src={getPreviewUrl(file)}
                            alt={file?.name}
                            className="w-full h-full rounded-lg cursor-pointer object-contain"
                        />
                        <HiMiniXCircle className="text-xl text-gray-400 absolute -top-3 -right-3 z-10 cursor-pointer" onClick={() => handleRemoveFile(file)} />
                    </div>
                ))}
                {(!number || files.length < number) && (
                    <Dropzone onDrop={onDrop} accept="image/*,.pdf,.doc,.docx">
                        {({ getRootProps, getInputProps }) => (
                            <div {...getRootProps()} className={`border-2 border-gray-300 border-dashed rounded-lg p-4 flex justify-center items-center ${className}`}>
                                <input {...getInputProps()} />
                                <CameraRetroIcon style={{ fontSize: 40 }} />
                            </div>
                        )}
                    </Dropzone>
                )}
            </div>

            {cropDimensions && imageSrc && (
                <Modal open={showModal} onClose={() => setShowModal(false)}>
                    <Modal.Header>
                        <Modal.Title>Crop Image</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="crop-container">
                            <Cropper
                                image={imageSrc}
                                crop={crop}
                                zoom={zoom}
                                aspect={cropDimensions[0] / cropDimensions[1]}
                                onCropChange={setCrop}
                                onZoomChange={setZoom}
                                onCropComplete={onCropComplete}
                            />
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => setShowModal(false)} appearance="subtle">
                            Cancel
                        </Button>
                        <Button onClick={handleCrop} appearance="primary">
                            Crop
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </div>
    );
};

export default UploadFile;
