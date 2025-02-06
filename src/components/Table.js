import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const UserTable = ({ users, onDelete, onEdit, onAdd }) => {
  return (
    <>
      <Box display="flex" justifyContent="flex-end" style={{ marginBottom: "20px" }}>
        <Button onClick={onAdd} variant="contained" color="primary" style={{ fontSize: 15 }}>
          ADD
        </Button>
      </Box>
      
      <Typography variant="h3" gutterBottom textAlign="center">
        Table
      </Typography>
      
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>id</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Mobile Number</TableCell>
              <TableCell>Bank Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>House Name</TableCell>
              <TableCell>Salary</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>File Name</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.firstName}</TableCell>
                <TableCell>{user.lastName}</TableCell>
                <TableCell>{user.selectedGender}</TableCell>
                <TableCell>{user.mobile}</TableCell>
                <TableCell>{user.bankName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.houseName}</TableCell>
                <TableCell>{user.salary}</TableCell>
                <TableCell>{user.selectedDate}</TableCell>
                <TableCell>
                  {user.file ? (
                    <a
                      href={URL.createObjectURL(new Blob([user.file]))}
                      download={user.file}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {user.file}
                    </a>
                  ) : (
                    "No file uploaded"
                  )}
                </TableCell>
                <TableCell>
                  <DeleteIcon style={{ color: "red" }} onClick={() => onDelete(user.id)} />
                  <EditIcon onClick={() => onEdit(user)} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default UserTable;
