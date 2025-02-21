import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchUsers } from "./app/features/usersSlice";
import { RootState, AppDispatch } from "./app/store"; // Import RootState & AppDispatch if needed

const Random = () => {
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch<AppDispatch>(); //

  useEffect(() => {
    dispatch(fetchUsers())
      .unwrap()
      .then((data) => {
        setUsers(data);
      });
  }, []);

  return (
    <>
      <div data-testid="users-container">
        {users.length ? (
          users.map((user: any) => {
            return <li key={user.id}>{user.name}</li>;
          })
        ) : (
          <h1>error</h1>
        )}
      </div>
    </>
  );
};
export { Random };
