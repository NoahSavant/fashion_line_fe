import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css'; // Import SunEditor CSS
import React, { useState, useEffect } from 'react';

const buttonList = [
    ['undo', 'redo'],
    ['font', 'fontSize', 'fontColor', 'hiliteColor'],
    ['align', 'bold', 'underline', 'italic', 'strike'],
    ['list', 'subscript', 'superscript', 'indent', 'outdent', 'removeFormat'],
    ['link', 'image'],
    ['fullScreen', 'codeView', 'preview']
];

const ClassicEditor = () => {
    const [imageUploads, setImageUploads] = useState([]);
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);

    const handleImageUpload = (imageInfo) => {
        if (!imageInfo) return;
        setImageUploads([...imageUploads, {
            name: imageInfo.name,
            src: imageInfo.src
        }]);
    };

    const handleUpload = async (src) => {
        try {
            const data = new FormData();
            data.append('file', src);
            data.append('cloud_name', 'dvcdmxgyk');
            data.append('upload_preset', 'uerym79f');

            const response = await fetch('https://api.cloudinary.com/v1_1/dvcdmxgyk/image/upload', {
                method: 'POST',
                body: data
            });

            const responseData = await response.json();
            return responseData?.url.toString();
        } catch (error) {
            return false;
        }
    };

    const saveContent = async () => {
        setLoading(true);
        const parser = new DOMParser();
        const doc = parser.parseFromString(content, 'text/html');

        const promises = imageUploads.map(async (imageUpload) => {
            const imgElement = doc.querySelector(`img[data-file-name="${imageUpload.name}"]`);
            if (imgElement) {
                let src = await handleUpload(imageUpload.src);
                imgElement.src = src || '';
            }
        });

        setImageUploads([]);

        await Promise.all(promises);
        setLoading(false);
        setContent(doc.documentElement.innerHTML);
        return doc.documentElement.innerHTML;
    };

    const handleResize = (event) => {
        // Check if preventDefault is allowed on the event
        if (event.cancelable) {
            event.preventDefault();
        }
    };

    useEffect(() => {
        document.addEventListener('touchstart', handleResize, { passive: false });
        document.addEventListener('touchmove', handleResize, { passive: false });
        document.addEventListener('wheel', handleResize, { passive: false });

        return () => {
            document.removeEventListener('touchstart', handleResize);
            document.removeEventListener('touchmove', handleResize);
            document.removeEventListener('wheel', handleResize);
        };
    }, []);

    return {
        SunEditorComponent: (
            <SunEditor
                onChange={setContent}
                height="auto"
                placeholder="Please type here..."
                setOptions={{
                    buttonList: buttonList,
                    imageSize: { width: 'auto', height: 'auto' }
                }}
                setContents={content}
                onImageUpload={(targetImgElement, index, state, imageInfo, remainingFilesCount) => handleImageUpload(imageInfo)}
            />
        ),
        saveContent,
        loading,
        setContent
    };
};

export default ClassicEditor;
