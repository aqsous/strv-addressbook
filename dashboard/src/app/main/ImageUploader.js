import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  GridList,
  GridListTile,
  GridListTileBar,
  Button,
  IconButton,
  Icon,
  CircularProgress,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import Cropper from 'react-cropper';

// eslint-disable-next-line import/no-extraneous-dependencies
import 'cropperjs/dist/cropper.css';

import { saveMedia, uploadImage } from '../services/mediaService';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  defaultCoverImageDelete: {
    position: 'absolute',
    top: 0,
    right: 0,
    opacity: 0,
  },
  defaultCoverImage: {
    transitionProperty: 'box-shadow',
    transitionDuration: theme.transitions.duration.short,
    transitionTimingFunction: theme.transitions.easing.easeInOut,
    '&:hover': {
      '& $defaultCoverImageDelete': {
        opacity: 0.8,
      },
    },
  },
}));

function ImageUploader(props) {
  const {
    onMediaUploaded,
    aspectRatio,
    name,
    media: oldMedia,
    disableCropping,
  } = props;
  const classes = useStyles();
  const [uploading, setUploading] = React.useState(false);
  const [uploadProgress, setUploadProgress] = React.useState(0);
  const [uploadResponse, setUploadResponse] = React.useState({});

  const [file, setFile] = React.useState(null);
  const [uploadedFile, setUploadedFile] = React.useState(null);
  const [media, setMedia] = React.useState(oldMedia);
  const cropper = React.createRef(null);

  useEffect(() => {
    setMedia(props.media);
  }, [props, props.media]);

  const handleMediaUploaded = (value) => {
    if (onMediaUploaded) {
      onMediaUploaded(value);
    }
  };

  function handleResetImageFile() {
    setFile(null);
    setMedia(null);
  }

  function uploadSelectedFile(selectedFile) {
    const reader = new FileReader();
    reader.onload = () => {
      setUploadedFile(reader.result);
    };
    reader.readAsDataURL(selectedFile);
    setUploading(true);
    uploadImage(selectedFile, (progressEvent) => {
      setUploadProgress(Math.round((progressEvent.loaded * 100) / progressEvent.total));
    })
      .then((mUploadResponse) => {
        const imageUrl = mUploadResponse.data.Location;
        return saveMedia(imageUrl, selectedFile.contentType, 'image');
      })
      .then((mediaResponse) => {
        setUploading(false);
        setMedia(mediaResponse.data);
        handleMediaUploaded(mediaResponse.data);
      })
      .catch((error) => {
        setUploadResponse({ error });
        console.log('error on load image', error);
      });
  }

  function dataURLtoBlob(dataurl) {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n) {
      n -= 1;
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  }

  function handleUploadClick() {
    uploadSelectedFile(
      dataURLtoBlob(cropper.current.getCroppedCanvas()
        .toDataURL()),
    );
  }

  function handleUploadChange(e) {
    const selectedFile = e.target.files[0];
    if (!selectedFile) {
      return;
    }

    if (disableCropping) {
      uploadSelectedFile(selectedFile);
    } else {
      const reader = new FileReader();
      reader.onload = () => {
        setFile(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  }

  if (uploading) {
    return (
      <GridList className="" spacing={8} cols={0}>
        <GridListTile
          classes={{
            root: 'w-full sm:w-1/2 md:w-1/4',
            tile: 'rounded-8',
          }}
        >
          <img
            src={uploadedFile}
            alt="media"
            style={{
              height: '100%',
              width: '100%',
            }}
          />
          {uploadResponse.error == null ? (
            <GridListTileBar
              title={`${uploadProgress}% Uploading...`}
              actionIcon={(
                <CircularProgress
                  size={24}
                  className="text-white opacity-75"
                />
                // <IconButton>
                //   <Icon className="text-white opacity-75">info</Icon>
                // </IconButton>
              )}
            />
          ) : (
            <GridListTileBar
              title="ERROR"
              actionIcon={(
                <IconButton
                  onClick={() => {
                    setUploadResponse({});
                    setUploading(false);
                  }}
                >
                  <Icon className="text-white opacity-75">autorenew</Icon>
                </IconButton>
              )}
            />
          )}
        </GridListTile>
      </GridList>
    );
  }
  if (media) {
    return (
      <GridList className="" spacing={6} cols={0}>
        <GridListTile
          classes={{
            root: 'sm:w-1/2 md:w-1/4',
            tile: 'rounded-8',
          }}
        >
          <img
            src={media.originalUrl}
            alt="media"
            style={{
              height: '100%',
              width: '100%',
              objectFit: 'contain',
            }}
          />
          <GridListTileBar
            title="Uploaded"
            actionIcon={(
              <IconButton
                onClick={handleResetImageFile}
              >
                <Icon className="text-white opacity-75">delete_outline</Icon>
              </IconButton>
            )}
          />
        </GridListTile>
      </GridList>
    );
  }

  return (
    <div className="max-w-md">
      <input
        accept="image/*"
        className="hidden"
        id={`${name}-button-file`}
        type="file"
        onChange={handleUploadChange}
      />
      {(file == null && media == null)
        ? (
          <label htmlFor={`${name}-button-file`}>
            <Button
              variant="contained"
              color="primary"
              component="span"
              startIcon={<Icon>folder_open</Icon>}
            >
              Select Image
            </Button>
          </label>
        ) : (
          <div>
            {media == null ? (
              <div>
                <Cropper
                  ref={cropper}
                  src={file}
                  zoomOnWheel={false}
                  style={{ width: '100%' }}
                  aspectRatio={aspectRatio}
                  guides={false}
                />
                <div className={classes.root}>
                  <IconButton
                    aria-label="delete"
                    onClick={handleResetImageFile}
                  >
                    <Icon>delete</Icon>
                  </IconButton>
                  <div className={classes.wrapper}>
                    <Button
                      variant="contained"
                      color="primary"
                      component="span"
                      startIcon={<Icon>cloud_upload</Icon>}
                      onClick={handleUploadClick}
                    >
                      Upload
                    </Button>
                  </div>
                </div>
              </div>
            ) : ''}
          </div>
        )}

    </div>
  );
}

export default React.memo(ImageUploader);

ImageUploader.defaultProps = {
  name: 'media',
  media: undefined,
  aspectRatio: null,
  disableCropping: false,
};

ImageUploader.propTypes = {
  name: PropTypes.string,
  onMediaUploaded: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  media: PropTypes.object,
  aspectRatio: PropTypes.number,
  disableCropping: PropTypes.bool,
};
