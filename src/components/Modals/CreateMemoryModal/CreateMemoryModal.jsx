import { useState } from "react";
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
import { StyledForm, formControlStyle } from "../style";

const CreateMemoryModal = ({
  isOpen,
  onCreate,
  handleClose,
  loading,
  familyId,
}) => {
  const [memoryValues, setMemoryValues] = useState({
    title: "",
    publication: "",
    date: null,
    place: "",
    isPrivate: false,
    tags: [],
  });

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
    let values = { ...memoryValues, familyId };
    let date;
    // if the date was not added  - set todays's date in ISO format
    if (!values.date) {
      const newDate = new Date();
      date = formatToISO(newDate);
    } else {
      date = formatToISO(values.date);
    }
    values = { ...values, date };

    // send request
    onCreate(values);
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

  return (
    <ModalComponent
      isOpen={isOpen}
      handleClose={() => onClose()}
      title="Create new memory"
    >
      <StyledForm onSubmit={(event) => onSubmitForm(event)}>
        <FormGroup>
          <FormControlLabel
            onChange={(event) =>
              setMemoryValues({
                ...memoryValues,
                isPrivate: event.target.value ? true : false,
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
            value={memoryValues.date}
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
            Object.values(memoryValues).every((element) => isEmpty(element))
          }
          loading={loading}
        >
          Create
        </Button>
      </StyledForm>
    </ModalComponent>
  );
};

export default CreateMemoryModal;
