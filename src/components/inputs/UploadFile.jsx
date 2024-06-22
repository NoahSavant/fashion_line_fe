
import CameraRetroIcon from '@rsuite/icons/legacy/CameraRetro';
import { Uploader, Message, Loader, useToaster } from 'rsuite';
import { useState } from 'react';

function previewFile(file, callback) {
    const reader = new FileReader();
    reader.onloadend = () => {
        callback(reader.result);
    };
    reader.readAsDataURL(file);
}

const UploadFile = ({ onFileUpload }) => {
    const toaster = useToaster();
    const [uploading, setUploading] = useState(false);
    const [fileInfo, setFileInfo] = useState(null);

    return (
        <Uploader
            fileListVisible={false}
            listType="picture"
            action="//jsonplaceholder.typicode.com/posts/"
            onUpload={file => {
                setUploading(true);
                previewFile(file.blobFile, value => {
                    setFileInfo(value);
                });
            }}
            onSuccess={(response, file) => {
                setUploading(false);
                toaster.push(<Message type="success">Uploaded successfully</Message>);
                console.log(response);
                onFileUpload(file);
            }}
            onError={() => {
                setFileInfo(null);
                setUploading(false);
                toaster.push(<Message type="error">Upload failed</Message>);
            }}
        >
            <button style={{ width: 150, height: 150 }}>
                {uploading && <Loader backdrop center />}
                {fileInfo ? (
                    <img src={fileInfo} width="100%" height="100%" />
                ) : (
                    <CameraRetroIcon style={{ fontSize: 80 }} />
                )}
            </button>
        </Uploader>
    );
};

export default UploadFile
