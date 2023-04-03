import { useState } from "react";
import {
  Autocomplete,
  TextField,
  Chip,
  Button,
  FormHelperText,
  FormControl,
  Typography,
  Switch,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
import ModalComponent from "../Modal";
import DatePickerComponent from "../../DatePickerComponent/DatePickerComponent";

const CreateMemoryModal = ({ isOpen, handleClose }) => {
  const [memoryValues, setMemoryValues] = useState({
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
    <ModalComponent isOpen={isOpen} handleClose={() => onClose()}>
      <Typography variant="h5">Create new memory</Typography>
      <div>
        <FormGroup>
          <FormControlLabel control={<Switch />} label="Private" />
        </FormGroup>
        <FormControl>
          <TextField
            id="memory-title"
            label="Title"
            value={memoryValues.title}
            // error={!!titleError}
            // value={familyValues.title}
            // onChange={(event) => handleTitleChange(event.target.value)}
            // // When input looses focus, if title was not filled - set title error
            // onBlur={() =>
            //   familyValues.title === "" && setTitleError("Title is required")
            // }
          />
          {/* {titleError && (
            <FormHelperText sx={helperTextStyle}>{titleError}</FormHelperText>
          )} */}
        </FormControl>
        <FormControl>
          <DatePickerComponent
            value={memoryValues.date}
            setDate={(date) => {
              setMemoryValues({ ...memoryValues, date });
            }}
          />
        </FormControl>
        <FormControl>
          <TextField
            id="memory-place"
            label="Place"
            value={memoryValues.place}
          />
        </FormControl>
        <FormControl>
          <TextField
            id="memory-publication"
            label="Publication"
            multiline
            rows={3}
            value={memoryValues.publication}
          />
        </FormControl>
      </div>
    </ModalComponent>
  );
};

export default CreateMemoryModal;
