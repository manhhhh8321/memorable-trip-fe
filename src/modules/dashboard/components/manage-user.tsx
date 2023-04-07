import React, { useState } from 'react';
import { Table, Tbody, Tr, Td, Button, VStack } from '@chakra-ui/react';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface Props {
  users: User[];
  onView: (user: User) => void;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
}

const ManageUsersTable = ({ users, onView, onEdit, onDelete }: Props) => {  
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleViewClick = (user: any) => {
    setSelectedUser(user);
    onView(user);
  };

  const handleEditClick = (user: any) => {
    setSelectedUser(user);
    onEdit(user);
  };

  const handleDeleteClick = (user: any) => {
    setSelectedUser(user);
    onDelete(user);
  };

  return (
    <VStack spacing={4} align="stretch">
      <Table variant="simple">
        <thead>
          <Tr>
            <Td>Name</Td>
            <Td>Email</Td>
            <Td>Role</Td>
            <Td>Action</Td>
          </Tr>
        </thead>
        <Tbody>
          {users.map((user) => (
            <Tr key={user.id}>
              <Td>{user.name}</Td>
              <Td>{user.email}</Td>
              <Td>{user.role}</Td>
              <Td>
                <Button colorScheme="blue" size="sm" onClick={() => handleViewClick(user)}>
                  View
                </Button>{' '}
                <Button colorScheme="yellow" size="sm" onClick={() => handleEditClick(user)}>
                  Edit
                </Button>{' '}
                <Button colorScheme="red" size="sm" onClick={() => handleDeleteClick(user)}>
                  Delete
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      {selectedUser && (
        <VStack align="stretch" spacing={4}>
          <h4>{selectedUser.name}</h4>
          <p>Email: {selectedUser.email}</p>
          <p>Role: {selectedUser.role}</p>
          {/* additional user details could go here */}
        </VStack>
      )}
    </VStack>
  );
};

export default ManageUsersTable;
