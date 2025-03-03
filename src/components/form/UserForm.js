import React from "react";
import {
  Typography,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormHelperText,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Box,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

const UserForm = ({
  fileInputRef,
  formData,
  setFormData,
  activeStep,
  steps,
  firstName,
  lastName,
  selectedGender,
  mobile,
  bankName,
  email,
  houseName,
  salary,
  // selectedDate,
  file,
  editId,
  buttonText,
  firstNameError,
  lastNameError,
  genderError,
  mobileError,
  bankNameError,
  emailError,
  houseNameError,
  salaryError,
  dateOfBirthError,
  fileError,
  handleTextChange,
  handleGenderChange,
  handleFileChange,
  handleSubmit,
  saveEdit,
  handleButtonClick,
  // setselectedDate,
  setDateOfBirthError,
}) => {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <TextField
          label="First Name"
          variant="outlined"
          type="text"
          fullWidth
          value={firstName}
          onChange={handleTextChange("firstName")}
          style={{ marginBottom: "20px" }}
          error={!!firstNameError}
          helperText={firstNameError}
        />

        <TextField
          label="Last Name"
          variant="outlined"
          type="text"
          fullWidth
          value={lastName}
          onChange={handleTextChange("lastName")}
          style={{ marginBottom: "20px" }}
          error={!!lastNameError}
          helperText={lastNameError}
        />

        <RadioGroup
          row
          name="gender"
          value={selectedGender}
          onChange={handleGenderChange}
          style={{
            marginBottom: "20px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <label style={{ marginRight: "10px" }}>Gender:</label>
          <FormControlLabel value="male" control={<Radio />} label="Male" />
          <FormControlLabel value="female" control={<Radio />} label="Female" />
        </RadioGroup>
        {genderError && <FormHelperText error>{genderError}</FormHelperText>}

        {selectedGender === "male" && (
          <>
            <TextField
              label="Mobile Number"
              variant="outlined"
              type="number"
              fullWidth
              value={mobile}
              onChange={handleTextChange("mobile")}
              style={{ marginBottom: "20px" }}
              error={!!mobileError}
              helperText={mobileError}
            />
            <TextField
              label="Bank Name"
              variant="outlined"
              type="text"
              fullWidth
              value={bankName}
              onChange={handleTextChange("bankName")}
              style={{ marginBottom: "20px" }}
              error={!!bankNameError}
              helperText={bankNameError}
            />
          </>
        )}

        {selectedGender === "female" && (
          <>
            <TextField
              label="Email"
              variant="outlined"
              type="email"
              fullWidth
              value={email}
              onChange={handleTextChange("email")}
              style={{ marginBottom: "20px" }}
              error={!!emailError}
              helperText={emailError}
            />
            <TextField
              label="House Name"
              variant="outlined"
              type="text"
              fullWidth
              value={houseName}
              onChange={handleTextChange("houseName")}
              style={{ marginBottom: "20px" }}
              error={!!houseNameError}
              helperText={houseNameError}
            />
          </>
        )}

        <FormControl fullWidth style={{ marginBottom: "20px" }}>
          <InputLabel>Salary</InputLabel>
          <Select
            value={salary}
            onChange={handleTextChange("salary")}
            name="salary"
            label="Salary"
            error={!!salaryError}
          >
            <MenuItem value="0-1000">0-1000</MenuItem>
            <MenuItem value="1000-2000">1000-2000</MenuItem>
            <MenuItem value="2000-3000">2000-3000</MenuItem>
            <MenuItem value="3000-4000">3000-4000</MenuItem>
          </Select>
          {salaryError && <FormHelperText error>{salaryError}</FormHelperText>}
        </FormControl>

        <Box style={{ marginBottom: "20px" }}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Select Date"
              value={formData.selectedDate} 
              onChange={(newDate) => {
                setFormData({
                  ...formData,
                  selectedDate: newDate, 
                });
                setDateOfBirthError(""); 
              }}
            />
          </LocalizationProvider>
          {dateOfBirthError && (
            <FormHelperText error>{dateOfBirthError}</FormHelperText>
          )}
        </Box>

        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          style={{ marginBottom: 20 }}
        >
          <input
            accept="application/pdf"
            id="file-upload"
            name="file"
            type="file"
            onChange={handleFileChange}
            ref={fileInputRef}
          />
          {editId && file?.name && (
            <p style={{ margin: 0 }}>Selected File: {file.name}</p>
          )}
        </Box>

        {fileError && <FormHelperText error>{fileError}</FormHelperText>}

        <Box>
          <Button
            variant="contained"
            color="primary"
            style={{ marginRight: "10px" }}
            onClick={editId ? `saveEdit` : handleSubmit}
          >
            {editId
              ? "Save Changes"
              : activeStep === steps.length - 1
              ? "Submit"
              : "Next"}
          </Button>

          <Button
            variant="outlined"
            color="secondary"
            onClick={handleButtonClick}
          >
            {buttonText}
          </Button>
        </Box>
      </form>
    </>
  );
};

export default UserForm;
