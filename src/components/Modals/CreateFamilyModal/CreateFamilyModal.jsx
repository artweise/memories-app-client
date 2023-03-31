import { useState } from "react";
import { Autocomplete, TextField, Chip, Button } from "@mui/material";
import { validEmailPattern } from "../../../utilities/formUtilities";
import { Container } from "./style";

import ModalComponent from "../Modal";

const CreateFamilyModal = ({ isOpen, handleClose, onCreate }) => {
  const [familyValues, setFamilyValues] = useState({
    members: [],
    title: "",
    description: "",
  });

  const isValidEmail = (value, reason) => {
    value.match(validEmailPattern);
  };

  const handleChange = (value, reason) => {
    setFamilyValues({ ...familyValues, members: value });
  };

  return (
    <ModalComponent isOpen={isOpen} handleClose={handleClose}>
      <Container>
        <Autocomplete
          multiple
          id="new-family-members"
          options={[]}
          onChange={(_, value, reason) => handleChange(value, reason)}
          onInputChange={(_, value, reason) => isValidEmail(value, reason)}
          freeSolo
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
