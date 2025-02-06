const tableReducer = (state, action) => {
  switch (action.type) {
    case "save":
      return { users: [...state.users, action.payload] };

    case "remove":
      return {
        users: state.users.filter((user) => user.id !== action.payload),
      };

    case "EDIT_USER":
      return {
        users: state.users.map((user) =>
          user.id === action.payload.id
            ? {
                ...user,
                firstName: action.payload.firstName,
                lastName: action.payload.lastName,
                selectedGender: action.payload.selectedGender,
                mobile: action.payload.mobile,
                bankName: action.payload.bankName,
                email: action.payload.email,
                houseName: action.payload.houseName,
                salary: action.payload.salary,
                selectedDate: action.payload.selectedDate,
                file: action.payload.file,
              }
            : user
        ),
      };

    default:
      return state;
  }
};

export default tableReducer;


export const initialState = {
  users: [
    // {id:1, firstName:'sneh', lastName:'patel',selectedGender:'male',mobile:'9313061115',bankName:'SBI',  salary:'0-1000',selectedDate:'02/03/2025', file:'sneh.pdf'}
  ],
};  