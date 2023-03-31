import { useState } from "react";
import {
  Autocomplete,
  TextField,
  Chip,
  Button,
  FormHelperText,
} from "@mui/material";

import { validateEmail } from "./utils";
import { Container, helperTextStyle } from "./style";

import ModalComponent from "../Modal";

const CreateFamilyModal = ({ isOpen, handleClose, onCreate }) => {
  const [familyValues, setFamilyValues] = useState({
    members: [],
    title: "",
    description: "",
  });
  const [error, setError] = useState("");

  const handleInputChange = () => {
    if (error) {
      setError("");
    }
  };

  const onClose = () => {
    setError("");
    handleClose();
  };

  const handleChange = (value, reason) => {
    value === [] && setError("");
    if (reason === "createOption" || reason === "blur") {
      const newEmail = value[value.length - 1];
      const isValidEmail = validateEmail(newEmail);
      if (isValidEmail) {
        setFamilyValues({
          ...familyValues,
          members: [...familyValues.members, newEmail],
        });
      } else {
        setError("Invalid email");
      }
    } else {
      setFamilyValues({
        ...familyValues,
        members: value,
      });
    }
  };

  return (
    <ModalComponent isOpen={isOpen} handleClose={onClose}>
      <Container>
        <Autocomplete
          multiple
          value={familyValues.members}
          id="new-family-members"
          clearOnEscape
          clearOnBlur
          freeSolo
          blurOnSelect
          autoSelect
          options={[]}
          onChange={(_, value, reason) => handleChange(value, reason)}
          onInputChange={() => handleInputChange()}
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
              label="Members"
              placeholder="Family members emails"
            />
          )}
        />

        {error && <FormHelperText sx={helperTextStyle}>{error}</FormHelperText>}

        <Button
          onClick={() => onCreate(familyValues)}
          variant="contained"
          sx={{ m: 1 }}
        >
          Create
        </Button>
      </Container>
    </ModalComponent>
  );
};

export default CreateFamilyModal;
