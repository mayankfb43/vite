import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, loadAll } from "./app/features/usersSlice";
import { RootState, AppDispatch } from "./app/store"; // Import RootState & AppDispatch if needed

const Random = () => {
  const dispatch = useDispatch<AppDispatch>(); //
  const users = useSelector((state: any) => state.user.users);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    if (counter > 0) dispatch(fetchUsers(counter));
  }, [counter]);

  return (
    <>
      <h1 className="heading"></h1>
      <button
        className="rounded"
        data-testid="load-next-user"
        onClick={() => {
          setCounter((c) => c + 1);
        }}
      >
        Load next
      </button>
      <button
        className="rounded"
        data-testid="load-all-button"
        onClick={() => {
          dispatch(loadAll());
        }}
      >
        Load all
      </button>
      <div>
        <div data-testid="users-container">
          {users.length ? (
            users.map((user: any) => {
              return <li key={user.id}>{user.name}</li>;
            })
          ) : (
            <h1>error</h1>
          )}
        </div>
      </div>
    </>
  );
};
export { Random };
