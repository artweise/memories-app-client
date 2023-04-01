import { useState, useEffect } from "react";
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

const CreateFamilyModal = ({
  isOpen,
  handleClose,
  onCreate,
  errorMessage,
  setErrorMessage,
}) => {
  const [familyValues, setFamilyValues] = useState({
    members: [],
    title: "",
    description: "",
  });
  const [error, setError] = useState("");
  const [titleError, setTitleError] = useState("");

  const handleInputChange = () => {
    if (error) {
      setError("");
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
      setError("");
      setFamilyValues({
        ...familyValues,
        members: value,
      });
    }
  };

  const onClose = () => {
    setError("");
    setTitleError("");
    setErrorMessage("");
    // clear form
    setFamilyValues({
      members: [],
      title: "",
      description: "",
    });
    handleClose();
  };

  const onSubmitForm = (event) => {
    event.preventDefault();
    if (!error) {
      // send request
      onCreate(familyValues);
      // clear errors
      setError("");
      setTitleError("");
      setErrorMessage("");
      // clear form
      setFamilyValues({
        members: [],
        title: "",
        description: "",
      });
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setErrorMessage("");
    }, 2000);
  }, [errorMessage]);

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
            onChange={(_, value, reason) => handleMembersChange(value, reason)}
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
                onFocus={() => setError("")}
                error={!!error}
              />
            )}
          />
          {error && (
            <FormHelperText sx={helperTextStyle}>{error}</FormHelperText>
          )}
          {errorMessage && (
            <FormHelperText sx={helperTextStyle}>{errorMessage}</FormHelperText>
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
