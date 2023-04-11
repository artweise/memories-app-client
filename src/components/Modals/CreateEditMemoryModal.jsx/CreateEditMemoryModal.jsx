import { useState, useEffect } from "react";
import {
  Autocomplete,
  TextField,
  Chip,
  FormHelperText,
  FormControl,
  Typography,
  Switch,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { isEmpty } from "lodash";

import Button from "../../Button/Button";
import ModalComponent from "../Modal";
import DatePickerComponent from "../../DatePickerComponent/DatePickerComponent";
import { formatToISO } from "../../../utilities/dateUtilities";
import { uploadFiles } from "../../../sevices/memoryService";
import { notifySuccess, notifyError } from "../../../utilities/toastUtilities";
import { formControlStyle } from "../style";
import {
  FormContentContainer,
  UploadContainer,
  UploadedData,
  FilesContainer,
  CloseRoundedIconStyles,
  DuoContainer,
  formControlStyleDuo,
} from "./style";

const CreateEditMemoryModal = ({
  isOpen,
  onCreate,
  onUpdate,
  handleClose,
  loading,
  familyId,
  isEditMode,
  memoryToUpdateValues,
  memoryToUpdateId,
}) => {
  const [memoryValues, setMemoryValues] = useState({
    title: "",
    publication: "",
    date: null,
    place: "",
    isPrivate: false,
    tags: [],
    gallery: [],
  });

  const [galleryValues, setGalleryValues] = useState([]);
  const [uploadLoading, setUploadLoading] = useState(false);

  const clearMemoryValues = () => {
    setMemoryValues({
      title: "",
      publication: "",
      date: null,
      place: "",
      isPrivate: false,
      tags: [],
      gallery: [],
    });
  };

  const clearGalleryValues = () => {
    setGalleryValues([]);
  };

  const onSubmitForm = (event) => {
    event.preventDefault();
    // take the state and create copy object, add familyId to the object
    let values = { ...memoryValues, familyId };
    // initialize date variable
    let date;
    // if the date was not added  - set todays's date in ISO format
    if (!values.date) {
      const newDate = new Date();
      date = formatToISO(newDate);
    } else {
      date = formatToISO(values.date);
    }
    // add the date in the ISO format to the object
    values = { ...values, date };
    // send request to update/create memory
    isEditMode
      ? onUpdate({ memoryId: memoryToUpdateId, data: values }) // one parameter - object with two keys: memoryId and data, where memoryId - memoryId to update, and data - your object
      : onCreate(values); // one parameter - just the values
    // clear form
    clearMemoryValues();
  };

  const onClose = () => {
    clearMemoryValues();
    handleClose();
  };

  const handleTagsChange = (value, reason) => {
    // When added new tag - add # before the new tag
    if (reason === "createOption" || reason === "blur") {
      const newTag = "#" + value[value.length - 1];
      setMemoryValues({
        ...memoryValues,
        tags: [...memoryValues.tags, newTag],
      });
    } else {
      // When removed one tag or all tags - update the state
      setMemoryValues({
        ...memoryValues,
        tags: value,
      });
    }
  };

  const handleUploadFiles = async () => {
    const formData = new FormData();

    if (galleryValues.length > 10) {
      notifyError("You are only allowed to upload a maximum of 10 files", "🔖");
      return;
    }

    for (let i = 0; i < galleryValues.length; i++) {
      formData.append("gallery", galleryValues[i]);
    }
    setUploadLoading(true);
    try {
      const res = await uploadFiles(formData);
      const fileUrls = res.data.fileUrls;
      setGalleryValues([...galleryValues, ...fileUrls]);
      // Add the file URLs to the memory values
      setMemoryValues({
        ...memoryValues,
        gallery: [...memoryValues.gallery, ...fileUrls],
      });
      setUploadLoading(false);
      clearGalleryValues(); // clear input field values
    } catch (e) {
      console.log(e);
      setUploadLoading(false);
    }
  };

  // const handleDeleteFile = (fileToDelete) => {
  //   let newGallery = memoryValues.gallery.filter((file) => {
  //     return file !== fileToDelete;
  //   });
  //   setMemoryValues({
  //     ...memoryValues,
  //     gallery: newGallery,
  //   });
  // };

  // If isEditMode - set the form values to the memoryToUpdateValues received from props
  useEffect(() => {
    if (isEditMode && memoryToUpdateValues) {
      setMemoryValues(memoryToUpdateValues);
    }
  }, [isEditMode, memoryToUpdateValues]);

  return (
    <ModalComponent
      isOpen={isOpen}
      handleClose={() => onClose()}
      title={isEditMode ? "Edit memory" : "Create new memory"}
    >
      <form onSubmit={(event) => onSubmitForm(event)}>
        <FormContentContainer>
          <FormGroup>
            <FormControlLabel
              checked={memoryValues.isPrivate}
              onChange={(event) =>
                setMemoryValues({
                  ...memoryValues,
                  isPrivate: event.target.checked,
                })
              }
              control={<Switch />}
              label="Private"
            />
          </FormGroup>
          <DuoContainer>
            <FormControl sx={formControlStyleDuo}>
              <TextField
                id="memory-title"
                label="Title"
                value={memoryValues.title}
                onChange={(event) =>
                  setMemoryValues({
                    ...memoryValues,
                    title: event.target.value,
                  })
                }
              />
            </FormControl>
            <FormControl sx={formControlStyleDuo}>
              <DatePickerComponent
                date={memoryValues.date}
                setDate={(date) => {
                  setMemoryValues({ ...memoryValues, date });
                }}
              />
            </FormControl>
          </DuoContainer>

          <FormControl sx={formControlStyle}>
            <TextField
              id="memory-place"
              label="Place"
              value={memoryValues.place}
              onChange={(event) =>
                setMemoryValues({ ...memoryValues, place: event.target.value })
              }
            />
          </FormControl>
          <FormControl sx={formControlStyle}>
            <TextField
              id="memory-publication"
              label="Publication"
              multiline
              rows={6}
              value={memoryValues.publication}
              onChange={(event) =>
                setMemoryValues({
                  ...memoryValues,
                  publication: event.target.value,
                })
              }
            />
          </FormControl>
          <div>
            {!!memoryValues?.gallery?.length && (
              <UploadedData>
                {memoryValues.gallery.map((file, index) => (
                  <FilesContainer key={index}>
                    <img src={file} width="auto" height="100" alt="preview" />
                    <CloseRoundedIcon
                      sx={CloseRoundedIconStyles}
                      fontSize="small"
                      // handleDeleteFile() doesn't work
                      // onClick={handleDeletePreview}
                      // onDelete={() => handleDeleteFile(file)}
                      onClick={() => {
                        const newGallery = [...memoryValues.gallery];
                        newGallery.splice(index, 1);
                        setMemoryValues({
                          ...memoryValues,
                          gallery: newGallery,
                        });
                      }}
                    />
                  </FilesContainer>
                ))}
              </UploadedData>
            )}
          </div>

          <UploadContainer>
            <input
              type="file"
              name="gallery"
              multiple="multiple"
              // accept=".jpg, .jpeg, .png"
              accept="image/*,audio/*,video/*,.pdf"
              onChange={(event) => {
                setGalleryValues(Array.from(event.target.files));
              }}
            />
            <div>
              <Button
                disabled={uploadLoading || isEmpty(galleryValues)}
                onClick={handleUploadFiles}
                loading={uploadLoading}
              >
                Upload
              </Button>
            </div>
          </UploadContainer>
          <Typography variant="subtitle2">*maximum 10 files at once</Typography>
          <FormControl sx={formControlStyle}>
            <Autocomplete
              autoFocus
              multiple
              value={memoryValues.tags}
              id="new-family-tags"
              clearOnEscape
              clearOnBlur
              freeSolo
              blurOnSelect
              autoSelect
              options={memoryValues.tags}
              // Adding # and saving new value to the state
              onChange={(_, value, reason) => handleTagsChange(value, reason)}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    variant="outlined"
                    label={option}
                    {...getTagProps({ index })}
                  />
                ))
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Tags"
                  placeholder="Add some tags"
                />
              )}
            />
          </FormControl>
        </FormContentContainer>
        <Button
          sx={{ mt: 2 }}
          type="submit"
          isFormButton={true}
          disabled={
            loading ||
            uploadLoading ||
            (!memoryValues.title && !memoryValues.publication)
          }
          loading={loading}
        >
          {isEditMode ? "Update" : "Create"}
        </Button>
      </form>
    </ModalComponent>
  );
};

export default CreateEditMemoryModal;
