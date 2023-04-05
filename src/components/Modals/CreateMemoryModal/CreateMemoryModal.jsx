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

import Button from "../../Button/Button";
import ModalComponent from "../Modal";
import DatePickerComponent from "../../DatePickerComponent/DatePickerComponent";
import { formatToISO } from "../../../utilities/dateUtilities";
import { StyledForm, formControlStyle } from "../style";

const CreateMemoryModal = ({ isOpen, onCreate, handleClose }) => {
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
    let values = { ...memoryValues };
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
  // const setDate = (date) => {
  //   setMemoryValues({ ...memoryValues, date });
  // };

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
        <Button
          sx={{ mt: 2 }}
          type="submit"
          isFormButton={true}
          // loading={loading}
        >
          Create
        </Button>
      </StyledForm>
    </ModalComponent>
  );
};

export default CreateMemoryModal;
