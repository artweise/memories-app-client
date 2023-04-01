import { useState } from "react";
import {
  Autocomplete,
  TextField,
  Chip,
  Button,
  FormHelperText,
  FormControl,
  Typography,
} from "@mui/material";

import { validateEmail } from "./utils";
import { StyledForm, helperTextStyle, formControlStyle } from "./style";

import ModalComponent from "../Modal";

const CreateFamilyModal = ({ isOpen, handleClose, onCreate }) => {
  const [familyValues, setFamilyValues] = useState({
    members: [],
    title: "",
    description: "",
  });
  const [emailsError, setEmailsError] = useState("");
  const [titleError, setTitleError] = useState("");

  // When start typing new email clear emails error if there is one
  const handleEmailsInputChange = () => {
    if (emailsError) {
      setEmailsError("");
    }
  };

  const handleTitleChange = (value) => {
    setTitleError("");
    setFamilyValues({
      ...familyValues,
      title: value,
    });
  };

  const handleMembersChange = (value, reason) => {
    // When clear emails - remove error message
    value === [] && setEmailsError("");
    // When added new email - validate before saving to the state
    if (reason === "createOption" || reason === "blur") {
      const newEmail = value[value.length - 1];
      const isValidEmail = validateEmail(newEmail);
      if (isValidEmail) {
        setFamilyValues({
          ...familyValues,
          members: [...familyValues.members, newEmail],
        });
      } else {
        setEmailsError("Invalid email");
      }
    } else {
      // When removed one email or all emails - update the state
      setEmailsError("");
      setFamilyValues({
        ...familyValues,
        members: value,
      });
    }
  };

  const onClose = () => {
    // clear errors
    setEmailsError("");
    setTitleError("");
    // clear form
    setFamilyValues({
      members: [],
      title: "",
      description: "",
    });
    // close modal
    handleClose();
  };

  const onSubmitForm = (event) => {
    event.preventDefault();
    if (!emailsError) {
      // send request
      onCreate(familyValues);
      // clear errors
      setEmailsError("");
      setTitleError("");
      // clear form
      setFamilyValues({
        members: [],
        title: "",
        description: "",
      });
    }
  };

  return (
    <ModalComponent isOpen={isOpen} handleClose={() => onClose()}>
      <Typography variant="h5">Create new family</Typography>
      <StyledForm onSubmit={(event) => onSubmitForm(event)}>
        <FormControl sx={formControlStyle}>
          <TextField
            required
            id="family-title"
            label="Title"
            error={!!titleError}
            value={familyValues.title}
            onChange={(event) => handleTitleChange(event.target.value)}
            // When input looses focus if title was not filled - set error
            onBlur={() =>
              familyValues.title === "" && setTitleError("Title is required")
            }
          />
          {titleError && (
            <FormHelperText sx={helperTextStyle}>{titleError}</FormHelperText>
          )}
        </FormControl>
        <FormControl sx={formControlStyle}>
          <TextField
            id="family-description"
            label="Description"
            value={familyValues.description}
            onChange={(event) => {
              setFamilyValues({
                ...familyValues,
                description: event.target.value,
              });
            }}
          />
        </FormControl>
        <FormControl sx={formControlStyle}>
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
            // Validation and saving new value to the state
            onChange={(_, value, reason) => handleMembersChange(value, reason)}
            // When start typing - clear error
            onInputChange={() => handleEmailsInputChange()}
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
                onFocus={() => setEmailsError("")}
                error={!!emailsError}
              />
            )}
          />
          {emailsError && (
            <FormHelperText sx={helperTextStyle}>{emailsError}</FormHelperText>
          )}
        </FormControl>

        <Button variant="contained" sx={{ mt: 2 }} type="submit">
          Create
        </Button>
      </StyledForm>
    </ModalComponent>
  );
};

export default CreateFamilyModal;
