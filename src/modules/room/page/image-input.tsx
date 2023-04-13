import { useState } from 'react'
import { Box, Image, Button, CircularProgress } from '@chakra-ui/react'
import { uploadImage } from '../api/room.api'

interface Props {
  onImageUploaded: (urls: string[] | null) => void
}

const UploadImage = ({ onImageUploaded }: Props) => {
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null)
  const [previewImages, setPreviewImages] = useState<string[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const handleFileInputChange = (e: any) => {
    setSelectedFiles(e.target.files)
    const images = []
    for (let i = 0; i < e.target.files.length; i++) {
      images.push(URL.createObjectURL(e.target.files[i]))
    }
    if (images.length > 0) {
      setPreviewImages(images)
      onImageUploaded(images) // Pass an array of image URLs to the parent component
    }
  }

  const handleSubmit = async () => {
    if (!selectedFiles) {
      console.log('No file selected')
      return
    }
    setLoading(true)
    const formData = new FormData()
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append('files', selectedFiles[i])
    }
    try {
      const response = await uploadImage(formData)
      const data = response.data
      const urls = data.map((image: any) => image.url)
      onImageUploaded(urls) // Pass the uploaded image URLs to the parent component
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box>
      {previewImages.length > 0 ? (
        <Box display='flex' flexWrap='wrap' justifyContent='center'>
          {previewImages.map((imageUrl, index) => (
            <Box key={index} mx={2} my={2}>
              <Image src={imageUrl} alt={`Preview Image ${index}`} boxSize='200px' />
            </Box>
          ))}
        </Box>
      ) : (
        <Box h='200px' w='200px' borderWidth='1px' borderStyle='dashed' textAlign='center'>
          <input type='file' onChange={handleFileInputChange} multiple />
          <p>Drag and drop or click to select images</p>
        </Box>
      )}
      <Button mt={4} colorScheme='blue' onClick={handleSubmit}>
        Upload Images
      </Button>
      {loading && (
        <Box textAlign='center' mt={4}>
          <CircularProgress isIndeterminate color='blue.500' />
        </Box>
      )}
    </Box>
  )
}

export default UploadImage
