import { useState } from 'react'
import { Box, Button, CircularProgress, CloseButton, Image, Stack, Text } from '@chakra-ui/react'
import { uploadImage } from '../api/room.api'
import { toast } from 'react-toastify'

type Props = {
  onImageUploaded: (urls: string[]) => void
}

const UploadImage = ({ onImageUploaded }: Props) => {
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null)
  const [previewImages, setPreviewImages] = useState<string[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [uploadSuccess, setUploadSuccess] = useState<boolean>(false)

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
      const urls = data.map((image: any) => image)

      onImageUploaded(urls) // Pass the uploaded image URLs to the parent component
      setUploadSuccess(true)
      toast.success('Images uploaded successfully!')
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const handleRemoveImage = (imageUrl: string) => {
    const filteredImages = previewImages.filter((image) => image !== imageUrl)
    setPreviewImages(filteredImages)
    onImageUploaded(filteredImages)
  }

  const handleUploadMore = () => {
    setSelectedFiles(null)
  }

  return (
    <Box>
      {previewImages.length > 0 ? (
        <Stack direction='row' flexWrap='wrap' justifyContent='center' spacing={4}>
          {previewImages.map((imageUrl, index) => (
            <Box key={index} position='relative'>
              <Image src={imageUrl} alt={`Preview Image ${index}`} boxSize='200px' />
              <Box position='absolute' top='0' right='0'>
                <CloseButton onClick={() => handleRemoveImage(imageUrl)} size='sm' />
              </Box>
            </Box>
          ))}
          {selectedFiles === null && (
            <Box>
              <input type='file' onChange={handleFileInputChange} multiple hidden={previewImages.length > 0} />
            </Box>
          )}
        </Stack>
      ) : (
        <Box h='200px' w='200px' borderWidth='1px' borderStyle='dashed' textAlign='center'>
          <input type='file' onChange={handleFileInputChange} multiple />
          <p>Drag and drop or click to select images</p>
        </Box>
      )}
      {uploadSuccess ? (
        <Box mt={4} textAlign='center'>
          <Button colorScheme='blue' onClick={handleUploadMore}>
            Upload More Images
          </Button>
        </Box>
      ) : (
        <Box mt={4} textAlign='center'>
          <Button colorScheme='blue' onClick={handleSubmit}>
            Upload Images
          </Button>
        </Box>
      )}
      {loading && (
        <Box mt={4} textAlign='center'>
          <CircularProgress isIndeterminate color='blue.300' />
        </Box>
      )}
    </Box>
  )
}

export default UploadImage
