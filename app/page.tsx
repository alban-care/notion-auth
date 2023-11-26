import { options } from "./api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";

type User = {
  id: string;
  email: string;
  name: string;
};

const Home = async () => {
  const session = await getServerSession(options);

  if (!session) {
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
      <p>
        Name : <span>{session.user?.name}</span>
      </p>
      <p>
        Email : <span>{session.user?.email}</span>
      </p>
    </main>
  );
};

export default Home;
