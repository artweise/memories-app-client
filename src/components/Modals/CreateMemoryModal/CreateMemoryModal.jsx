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
            onChange={(event) =>
              setMemoryValues({ ...memoryValues, title: event.target.value })
            }
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
            onChange={(event) =>
              setMemoryValues({ ...memoryValues, place: event.target.value })
            }
          />
        </FormControl>
        <FormControl>
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
      </div>
    </ModalComponent>
  );
};

export default CreateMemoryModal;
