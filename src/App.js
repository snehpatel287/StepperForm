import React, { useReducer, useState } from "react";
import {
  Button,
  Container,
  Grid,
  Paper,
  Step,
  StepLabel,
  Stepper,
} from "@mui/material";
import tableReducer, { initialState } from "./reducers/tableReducer";
import UserTable from "./components/Table";
import UserForm from "./components/UserForm";
import StepperComponent from "./components/Stepper";

const App = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    selectedGender: "",
    salary: "",
    mobile: "",
    bankName: "",
    email: "",
    houseName: "",
    file: null,
    selectedDate: null,
  });

  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [genderError, setGenderError] = useState("");
  const [salaryError, setSalaryError] = useState("");
  const [dateOfBirthError, setDateOfBirthError] = useState("");
  const [fileError, setFileError] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [bankNameError, setBankNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [houseNameError, setHouseNameError] = useState("");

  const [buttonText, setButtonText] = useState("Cancel");
  const [editId, setEditId] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [showForm, setShowForm] = useState(true);
  const [showTable, setShowTable] = useState(false);
  const [state, dispatch] = useReducer(tableReducer, initialState);
  const validFileType = "application/pdf";
  const fileInputRef = React.useRef(null);

  const steps = [
    "Personal Details",
    "Contact Info",
    "Bank Details",
    "Upload Documents",
    "Review & Submit",
  ];

  const getOneYearAgo = () => {
    const date = new Date();
    date.setFullYear(date.getFullYear() - 1);
    return date;
  };

  const handleButtonClick = () => {
    if (buttonText === "Clear") {
      handleClear();
      setButtonText("Cancel");
    } else {
      setShowForm(false);
      setShowTable(true);
    }
  };

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep((prevStep) => prevStep + 1);
    } else {
      setShowForm(false);
      setShowTable(true);
    }
  };

  const handleClear = () => {
    setFormData({
      firstName: "",
      lastName: "",
      selectedGender: "",
      salary: "",
      mobile: "",
      bankName: "",
      email: "",
      houseName: "",
      file: null,
      selectedDate: null,
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; 
    }
  };

  const handleTextChange = (field) => (e) => {
    const value = e.target.value;

    switch (field) {
      case "firstName":
        setFormData((prev) => ({ ...prev, firstName: value }));
        setFirstNameError("");
        break;
      case "lastName":
        setFormData((prev) => ({ ...prev, lastName: value }));
        setLastNameError("");
        break;
      case "mobile":
        setFormData((prev) => ({ ...prev, mobile: value }));
        setMobileError("");
        break;
      case "bankName":
        setFormData((prev) => ({ ...prev, bankName: value }));
        setBankNameError("");
        break;
      case "email":
        setFormData((prev) => ({ ...prev, email: value }));
        setEmailError("");
        break;
      case "houseName":
        setFormData((prev) => ({ ...prev, houseName: value }));
        setHouseNameError("");
        break;
      case "selectedDate":
        setFormData((prev) => ({ ...prev, selectedDate: value }));
        setDateOfBirthError("");
        break;
      case "salary":
        setFormData((prev) => ({ ...prev, salary: value }));
        setSalaryError("");
        break;
      default:
        break;
    }

    if (
      formData.firstName.trim() !== "" ||
      formData.lastName.trim() !== "" ||
      formData.mobile.trim() !== "" ||
      formData.bankName.trim() !== "" ||
      formData.email.trim() !== "" ||
      formData.houseName.trim() !== "" ||
      (formData.selectedDate && formData.selectedDate instanceof Date) ||
      formData.salary.trim() !== ""
    ) {
      setButtonText("Clear");
    } else {
      setButtonText("Cancel");
    }
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
  
    if (selectedFile) {
      const name = selectedFile.name.split(".")[0];
      const extension = selectedFile.name.split(".")[1];
      const newFileName = `${name}_xyz.${extension}`;
  
      const modifiedFile = new File([selectedFile], newFileName, {
        type: selectedFile.type,
      });
  
      setFormData({
        ...formData, 
        file: modifiedFile, 
      });
      setFileError("");
    } else {
      setFormData({
        ...formData, 
        file: null, 
      });
    }
  
    setFileError("");
    setButtonText(selectedFile ? "Clear" : "Cancel");
  };
  

  const handleGenderChange = (event) => {
    const selectedValue = event.target.value;
    setFormData((prevData) => ({
      ...prevData,
      selectedGender: selectedValue,
    }));

    setGenderError("");
    setButtonText(selectedValue ? "Clear" : "Cancel");
  };

  const editUser = (user) => {
    setFormData({
      firstName: user.firstName,
      lastName: user.lastName,
      selectedGender: user.selectedGender,
      salary: user.salary,
      mobile: user.mobile,
      bankName: user.bankName,
      email: user.email,
      houseName: user.houseName,
      selectedDate: new Date(user.selectedDate),
      file: user.file ? { name: user.file } : null,
    });
    setButtonText("Clear");
    setShowForm(true);
    setShowTable(false);
  };

  const validateForm = (isEdit = false) => {
    let hasErrors = false;
    const oneYearAgo = getOneYearAgo();

    setFirstNameError("");
    setLastNameError("");
    setGenderError("");
    setSalaryError("");
    setDateOfBirthError("");
    setFileError("");
    setMobileError("");
    setBankNameError("");
    setEmailError("");
    setHouseNameError("");

    if (!formData.firstName) {
      setFirstNameError("First Name is required");
      hasErrors = true;
    } else if (formData.firstName.length > 10) {
      setFirstNameError("First Name cannot be more than 10 characters");
      hasErrors = true;
    }

    if (!formData.lastName) {
      setLastNameError("Last Name is required");
      hasErrors = true;
    } else if (formData.lastName.length > 10) {
      setLastNameError("Last Name cannot be more than 10 characters");
      hasErrors = true;
    }

    if (!formData.selectedGender) {
      setGenderError("Gender is required");
      hasErrors = true;
    }

    if (!formData.salary) {
      setSalaryError("Salary is required");
      hasErrors = true;
    }

    if (!formData.selectedDate) {
      setDateOfBirthError("Date of Birth is required");
      hasErrors = true;
    } else if (formData.selectedDate > oneYearAgo) {
      setDateOfBirthError("Only dates older than one year are allowed");
      hasErrors = true;
    }

    if (formData.selectedGender === "male") {
      if (!formData.mobile) {
        setMobileError("Mobile number is required for male");
        hasErrors = true;
      }
      if (!formData.bankName) {
        setBankNameError("Bank name is required for male");
        hasErrors = true;
      }
    }

    if (!formData.file) {
      setFileError("File is required");
      return;
    } else if (formData.file && formData.file.type !== validFileType) {
      setFileError("Only PDF files are allowed");
      return;
    }

    if (formData.selectedGender === "female") {
      if (!formData.email) {
        setEmailError("Email is required for female");
        hasErrors = true;
      }
      if (!formData.houseName) {
        setHouseNameError("House name is required for female");
        hasErrors = true;
      }
    }

    return hasErrors;
  };

  const saveEdit = () => {
    if (validateForm(true)) return;

    dispatch({
      type: "EDIT_USER",
      payload: {
        id: editId,
        firstName: formData.firstName,
        lastName: formData.lastName,
        selectedGender: formData.selectedGender,
        mobile: formData.mobile || "NA",
        bankName: formData.bankName || "NA",
        email: formData.email || "NA",
        houseName: formData.houseName || "NA",
        salary: formData.salary,
        selectedDate: formData.selectedDate
          ? formData.selectedDate.toISOString().split("T")[0]
          : "",
        file: formData.file ? formData.file.name : "",
      },
    });

    handleClear();
    setShowTable(true);
    setShowForm(false);
    setButtonText("Cancel");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validateForm()) {
      return;
    }

    const nextId = `emp${state.users.length + 1}`;

    dispatch({
      type: "save",
      payload: {
        id: nextId,
        firstName: formData.firstName,
        lastName: formData.lastName,
        selectedGender: formData.selectedGender,
        mobile: formData.mobile || "NA",
        bankName: formData.bankName || "NA",
        email: formData.email || "NA",
        houseName: formData.houseName || "NA",
        salary: formData.salary,
        selectedDate: formData.selectedDate
          ? formData.selectedDate.toISOString().split("T")[0]
          : "",
        file: formData.file ? formData.file.name : "",
      },
    });

    handleNext();
    handleClear();
    setButtonText("Cancel");
  };

  return (
    <Container style={{ marginTop: "50px" }}>
      <Grid item xs={6}>
        {showForm && (
          <Grid container spacing={3}>
            <StepperComponent steps={steps} activeStep={activeStep} />

            <Grid item xs={9}>
              <h2>{steps[activeStep]}</h2>
              <UserForm
                formData={formData}
                setFormData={setFormData}
                steps={steps}
                activeStep={activeStep}
                firstName={formData.firstName}
                lastName={formData.lastName}
                selectedGender={formData.selectedGender}
                salary={formData.salary}
                mobile={formData.mobile}
                bankName={formData.bankName}
                email={formData.email}
                houseName={formData.houseName}
                selectedDate={formData.selectedDate}
                file={formData.file}
                buttonText={buttonText}
                editId={editId}
                firstNameError={firstNameError}
                lastNameError={lastNameError}
                genderError={genderError}
                salaryError={salaryError}
                dateOfBirthError={dateOfBirthError}
                fileError={fileError}
                mobileError={mobileError}
                bankNameError={bankNameError}
                emailError={emailError}
                houseNameError={houseNameError}
                handleTextChange={handleTextChange}
                handleGenderChange={handleGenderChange}
                handleFileChange={handleFileChange}
                handleSubmit={handleSubmit}
                setselectedDate={formData.selectedDate}
                setDateOfBirthError={setDateOfBirthError}
                saveEdit={saveEdit}
                handleButtonClick={handleButtonClick}
                fileInputRef={fileInputRef}
              />
            </Grid>
          </Grid>
        )}

        {showTable && (
          <UserTable
            users={state.users}
            onDelete={(id) => dispatch({ type: "remove", payload: id })}
            onEdit={editUser}
            onAdd={() => {
              setShowForm(true);
              setShowTable(false);
              setActiveStep(0);
            }}
          />
        )}
      </Grid>
    </Container>
  );
};

export default App;
