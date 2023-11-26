import { options } from "./api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";
import { getUsers } from "./api/notion";

type User = {
  id: string;
  email: string;
  username: string;
};

const Home = async () => {
  const session = await getServerSession(options);

  console.log("session", session);
  const users = await getUsers();

  if (!users) {
    return (
      <main>
        <h1>Notion authentication</h1>
        <p>There was an error fetching the users</p>
      </main>
    );
  }

  return (
    <main>
      <h1>Notion authentication</h1>
      <p>Users : </p>
      <ul>
        {users.map(({ id, email, username }: User) => (
          <li key={id}>
            <p>{email}</p>
            <p>{username}</p>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default Home;
