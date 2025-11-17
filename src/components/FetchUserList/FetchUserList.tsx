import type * as types from "@/types/index";
import React, { useEffect } from "react";
import { UserList } from "@/components/UserList";

export const API_URL = "/api/users";

export const FetchUserList = () => {
  const [users, setUsers] = React.useState<types.User[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch users");
        }
        return res.json();
      })
      .then((data: types.User[]) => {
        setUsers(data);
        setIsLoading(false);
      })
      .catch((err: Error) => {
        setError(err.message);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <p data-cy="loading-message">Loading...</p>;
  }

  if (error) {
    return <p data-cy="error-message">{error}</p>;
  }

  return <UserList users={users} />;
};
