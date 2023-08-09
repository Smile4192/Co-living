import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Box,
  Button,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { FormikErrors, useFormikContext } from 'formik';
import React from 'react';
import Resizer from 'react-image-file-resizer';
import ImageUploading from 'react-images-uploading';

const resizeFile = (file) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      1920,
      1920,
      'JPEG',
      90,
      0,
      (uri) => {
        resolve(uri);
      },
      'file',
    );
  });

interface Image {
  id: number; // Replace 'number' with the appropriate type for the image ID
  url: string;
}

interface ImageUploaderFieldProps {
  existingImages: Image[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formError?: string | string[] | FormikErrors<any> | FormikErrors<any>[];
  name: string;
  setExistingImages: (category: string, newImages: object) => void;
  setUploadedImages:
    | React.Dispatch<React.SetStateAction<never[]>>
    | ((category: string, newImages: object) => void);
  title: string;
  uploadedImages: Image[];
}

export default function ImageUploaderField({
  title = '',
  name,
  formError = '',
  existingImages,
  setExistingImages,
  uploadedImages,
  setUploadedImages,
}: ImageUploaderFieldProps) {
  const theme = useTheme();
  const formikContext = useFormikContext();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  const maxNumber = 8;
  const onChange = async (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);

    if (addUpdateIndex)
      try {
        for (const index of addUpdateIndex) {
          const file = imageList[addUpdateIndex[index]].file;
          const image = await resizeFile(file);
          imageList[addUpdateIndex[index]].file = image;
        }
      } catch (err) {
        console.log(err);
      }
    formikContext.setFieldValue(
      name,
      imageList.map((i) => i.file),
    );
    if (name === 'residentPictures') setUploadedImages(imageList);
    else setUploadedImages(name, imageList);
  };
  return (
    <Box>
      <span name={name}></span>
      <ImageUploading
        multiple
        value={uploadedImages}
        onChange={onChange}
        maxNumber={maxNumber}
      >
        {({ imageList, onImageUpload, onImageRemove, errors }) => (
          <>
            {/* Anchor for scroll */}
            <span name={name}></span>
            {title && (
              <Typography
                variant="subtitle1"
                color={errors?.maxNumber || formError ? 'error' : 'initial'}
              >
                {title} (max: 8)
              </Typography>
            )}

            {formError && (
              <Typography
                variant="caption"
                component="p"
                color="error"
                ml={'14px'}
              >
                {formError}
              </Typography>
            )}
            {errors?.maxNumber && (
              <Typography
                variant="caption"
                component="p"
                color="error"
                ml={'14px'}
              >
                Exceeded the limit of images
              </Typography>
            )}
            <ImageList cols={matches ? 6 : 4} style={{ height: 'auto' }}>
              {existingImages.map((image, index) => (
                <ImageListItem key={index}>
                  <img
                    src={image}
                    alt=""
                    width="100"
                    style={{ aspectRatio: '1' }}
                  />
                  <ImageListItemBar
                    actionIcon={
                      <IconButton
                        sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                        //   aria-label={`info about ${item.title}`}
                        onClick={() => {
                          const newImages = [...existingImages];
                          newImages.splice(index, 1);
                          if (name === 'residentPictures')
                            setExistingImages(newImages);
                          else setExistingImages(name, newImages);
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    }
                  />
                </ImageListItem>
              ))}
              {imageList.map((image, index) => (
                <ImageListItem key={index}>
                  <img
                    src={image.dataURL}
                    alt=""
                    width="100"
                    style={{ aspectRatio: '1' }}
                  />
                  <ImageListItemBar
                    actionIcon={
                      <IconButton
                        sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                        //   aria-label={`info about ${item.title}`}
                        onClick={() => onImageRemove(index)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    }
                  />
                </ImageListItem>
              ))}

              {uploadedImages.length !== maxNumber && (
                <Button
                  variant="outlined"
                  color="inherit"
                  sx={{ width: '100%', aspectRatio: '1' }}
                  onClick={onImageUpload}
                >
                  <AddPhotoAlternateIcon />
                </Button>
              )}
            </ImageList>
          </>
        )}
      </ImageUploading>
    </Box>
  );
}
