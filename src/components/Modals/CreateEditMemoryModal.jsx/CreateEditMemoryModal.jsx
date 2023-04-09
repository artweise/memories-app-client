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
import { isEmpty } from "lodash";

import Button from "../../Button/Button";
import ModalComponent from "../Modal";
import DatePickerComponent from "../../DatePickerComponent/DatePickerComponent";
import { formatToISO } from "../../../utilities/dateUtilities";
import { uploadFiles } from "../../../pages/Memories/services/memoryServices";
import { StyledForm, formControlStyle } from "../style";
import { UploadContainer } from "./style";

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
    });
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

    for (let i = 0; i < galleryValues.length; i++) {
      formData.append("gallery", galleryValues[i]);
    }
    setUploadLoading(true);
    try {
      const res = await uploadFiles(formData);
      // TODO - save to the state for preview
      // TODO - and add to the form for the memory create
      console.log("res", res);
      setUploadLoading(false);
    } catch (e) {
      console.log(e);
      setUploadLoading(false);
    }
  };

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
      <StyledForm onSubmit={(event) => onSubmitForm(event)}>
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
        <FormControl sx={formControlStyle}>
          <TextField
            id="memory-title"
            label="Title"
            value={memoryValues.title}
            onChange={(event) =>
              setMemoryValues({ ...memoryValues, title: event.target.value })
            }
          />
        </FormControl>
        <FormControl sx={formControlStyle}>
          <DatePickerComponent
            date={memoryValues.date}
            setDate={(date) => {
              setMemoryValues({ ...memoryValues, date });
            }}
          />
        </FormControl>
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
            rows={3}
            value={memoryValues.publication}
            onChange={(event) =>
              setMemoryValues({
                ...memoryValues,
                publication: event.target.value,
              })
            }
          />
        </FormControl>
        {/* NEED TO CHANGE - FOR PREVIEW */}
        {/* {isEditMode && !!memoryValues?.gallery?.length && (
          <div>
            {memoryValues.gallery.map((file) => (
              <img src={file} width="auto" height="50" />
            ))}
          </div>
        )} */}
        <UploadContainer>
          <input
            type="file"
            name="gallery"
            multiple="multiple"
            accept=".jpg, .jpeg, .png"
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
              <TextField {...params} label="Tags" placeholder="Add some tags" />
            )}
          />
        </FormControl>

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
      </StyledForm>
    </ModalComponent>
  );
};

export default CreateEditMemoryModal;
