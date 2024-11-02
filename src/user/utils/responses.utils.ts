export const userResponseExample = {
    id: 1,
    fName: 'John',
    lName: 'Doe',
    email: 'john.doe@example.com',
    createdAt: new Date(),
    updatedAt: new Date(),
    role: 'user',
  };
  
  export const notFoundResponseExample = {
    statusCode: 404,
    message: 'User not found',
    error: 'Not Found',
  };
  
  export const multipleUsersResponseExample = {
    users: [
      {
        id: 1,
        fName: 'John',
        lName: 'Doe',
        email: 'john.doe@example.com',
        role: 'user',
      },
      {
        id: 2,
        fName: 'Jane',
        lName: 'Smith',
        email: 'jane.smith@example.com',
        role: 'admin',
      },
    ],
  };
  
  export const updatedUserResponseExample = {
    id: 1,
    fName: 'Mike',
    lName: 'Doe',
    email: 'john.doe@example.com',
    createdAt: new Date(),
    updatedAt: new Date().setDate(new Date().getDate() +1),
    role: 'user',
  };