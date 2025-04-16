import { ImageKitResponse } from '@/app/api/auth/imagekit/route';
import config from '@/lib/config';
import { useRef, useState } from 'react'
import { IKImage, IKUpload, ImageKitProvider } from 'imagekitio-next';
import { Button } from './ui/button';
import Image from 'next/image';

const authenticator = async () => {
  try {
    const res = await fetch(`${config.env.apiEndpoint}/api/auth/imagekit`)

    if(!res.ok) {
      const err= await res.text()
      throw new Error(`Error: ${err}`)
    }

    const data: ImageKitResponse = await res.json();

    const { token, signature, expire } = data;

    return { token, signature, expire };
  } catch (error: unknown) {
    throw new Error(`Error: ${error}`);
  }
}

const { env: {
  imagekit: { publicKey, urlEndpoint }
} } = config


const ImageUpload = () => {
  const ikUploader = useRef(null)
  const [file, setFile] = useState<{ filepath: string } | null>(null)

  const OnError = () => {}
  const OnSuccess = (res: any) => {
    setFile(res)
  }
  return (
    <ImageKitProvider
      publicKey={publicKey}
      urlEndpoint={urlEndpoint}
      authenticator={authenticator}
    >
      <IKUpload
        className='hidden'
        ref={ikUploader}
        onError={OnError}
        onSuccess={OnSuccess}
        fileName='test-upload.png'
      />

      <Button 
        className='upload-btn' 
        onClick={(e) => {
          e.preventDefault()
          if(ikUploader.current) ikUploader.current?.click()
        }}
      >
        <Image src='/public/icons/upload.svg' alt='upload-icon' width={20} height={20} className='object-contain' />
        <p className='text-base text-light-100'>Upload a File</p>
        {file && <p className='upload-filename'>{file.filepath}</p>} 
      </Button> 

      {file && (
        <IKImage
          alt={file.filepath}
          src={file.filepath}
          width={500}
          height={500}
        />
      )}
    </ImageKitProvider>
  )
}

export default ImageUpload