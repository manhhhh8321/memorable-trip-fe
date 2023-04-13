import { useState } from 'react';
import {
    Box,
    Flex,
    Text,
    VStack,
    HStack,
    Icon,
    Button,
    useColorModeValue,
} from '@chakra-ui/react';
import { AiOutlineUpload } from 'react-icons/ai';
import { uploadImage } from '../api/room.api';

interface DropZoneProps {
    onDrop: (files: File[]) => void;
}

const ImageInput: React.FC<DropZoneProps> = ({ onDrop }) => {
    const [isDragging, setIsDragging] = useState(false);

    const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);

        if (e.dataTransfer.files.length > 0) {
            const files = Array.from(e.dataTransfer.files).filter((file) => file.type.startsWith('image/'));
            const formData = new FormData();
            files.forEach((file) => {
                formData.append('images', file);
            });

            try {
                const response = await uploadImage(formData)

                if (response.status === 200) {
                    const data = await response.data;
                    onDrop(data);
                } else {
                    throw new Error('Failed to upload images');
                }
            } catch (error) {
                console.error(error);
            }
        }
    };

    const borderColor = useColorModeValue('gray.200', 'gray.700');
    const backgroundColor = useColorModeValue('gray.50', 'gray.800');
    const textColor = useColorModeValue('gray.500', 'gray.400');

    return (
        <Box
            border={`2px dashed ${borderColor}`}
            borderRadius='lg'
            p={8}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            bg={isDragging ? 'gray.100' : backgroundColor}
        >
            <VStack spacing={4} alignItems='center'>
                <Icon as={AiOutlineUpload} boxSize={12} color={textColor} />
                <Text color={textColor}>Drag and drop your image here or click to browse</Text>
                <Text fontSize='sm' color={textColor}>
                    (Only .jpg and .png files are supported)
                </Text>
                <HStack>
                    <Button size='sm'>Browse</Button>
                    <Text fontSize='sm' color={textColor}>
                        to choose a file
                    </Text>
                </HStack>
            </VStack>
        </Box>
    );
};

export default ImageInput;
