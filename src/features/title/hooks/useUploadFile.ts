import { useState } from 'react';
import { useDropzone, type DropzoneInputProps, type DropzoneRootProps } from 'react-dropzone';

interface useUploadFileReturn {
  uploadedFile: File | null;
  uploadProgress: number;
  isDragActive: boolean;
  getRootProps: <T extends DropzoneRootProps>(props?: T) => T;
  getInputProps: <T extends DropzoneInputProps>(props?: T) => T;
  handleRemoveFile: () => void;
  handleFileClick: () => void;
}

export function useUploadFile(): useUploadFileReturn {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'application/pdf': ['.pdf'],
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        if (file) {
          setUploadedFile(file);

          setUploadProgress(0);
          const interval = setInterval(() => {
            setUploadProgress((prev) => {
              if (prev >= 100) {
                clearInterval(interval);
                return 100;
              }
              return prev + 10;
            });
          }, 200);
        }
      }
    },
  });

  const handleRemoveFile = () => {
    setUploadedFile(null);
    setUploadProgress(0);
  };

  const handleFileClick = () => {
    if (uploadedFile) {
      const fileUrl = URL.createObjectURL(uploadedFile);
      window.open(fileUrl, '_blank');
    }
  };

  return {
    uploadedFile,
    uploadProgress,
    isDragActive,
    getRootProps,
    getInputProps,
    handleRemoveFile,
    handleFileClick,
  };
}
