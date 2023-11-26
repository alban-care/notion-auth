const API_URL = "https://api.notion.com/v1";
const API_VERSION = "2022-06-28";
const NOTION_TOKEN = process.env.NOTION_TOKEN;
const NOTION_USERS_DATABASE_ID = process.env.NOTION_USERS_DATABASE_ID;

type Properties = {
  properties: {
    id: {
      unique_id: {
        number: number;
      };
    };
    email: {
      email: string;
    };
    username: {
      title: [
        {
          plain_text: string;
        }
      ];
    };
  };
};

export const getUsers = async () => {
  const res = await fetch(
    `${API_URL}/databases/${NOTION_USERS_DATABASE_ID}/query`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${NOTION_TOKEN}`,
        "Notion-Version": API_VERSION,
        "content-type": "application/json",
      },
    }
  );

  const { results } = await res.json();

  const users = results.map(({ properties }: Properties) => {
    const { id, email, username } = properties;

    return {
      id: id.unique_id.number,
      email: email.email,
      username: username.title[0].plain_text,
    };
  });

  return users;
};
