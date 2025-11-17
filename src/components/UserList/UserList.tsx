import type { User } from "@/types/index";

interface UserListProps {
  users: User[]; // It takes an array of users as a prop
}

export const UserList = ({ users }: UserListProps) => {
  // --- Conditional Rendering ---
  if (users.length === 0) {
    return <p data-cy="no-users-message">No users found.</p>;
  }

  // --- List Rendering ---
  return (
    <ul data-cy="user-list">
      {users.map((user) => (
        <li key={user.id} data-cy="user-item">
          <strong>{user.name}</strong> ({user.email})
        </li>
      ))}
    </ul>
  );
};
