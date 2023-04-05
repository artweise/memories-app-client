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
import { StyledForm, formControlStyle } from "../style";

const CreateMemoryModal = ({ isOpen, handleClose }) => {
  const [memoryValues, setMemoryValues] = useState({
    title: "",
    publication: "",
    date: null,
    place: "",
    isPrivate: false,
    tags: [],
  });

  const onClose = () => {
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
      <StyledForm>
        <FormGroup>
          <FormControlLabel control={<Switch />} label="Private" />
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
      </StyledForm>
      <Button sx={{ mt: 2 }} type="submit" isFormButton={true}>
        Create
      </Button>
    </ModalComponent>
  );
};

export default CreateMemoryModal;
