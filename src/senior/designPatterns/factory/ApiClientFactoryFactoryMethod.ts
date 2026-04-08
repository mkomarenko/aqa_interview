type ClientType = "rest" | "graphql";

interface ApiClient {
  request<T>(endpoint: string, params?: unknown): Promise<T>;
}

class RestClient implements ApiClient {
  async request<T>(endpoint: string, data?: unknown): Promise<T> {
    const response = await fetch(endpoint, {
      method: data ? "POST" : "GET",
      body: data ? JSON.stringify(data) : null,
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.json();
  }
}

class GraphQLClient implements ApiClient {
  async request<T>(endpoint: string, query?: unknown): Promise<T> {
    const response = await fetch(endpoint, {
      method: "POST",
      body: JSON.stringify({ query }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    return result.data;
  }
}

/* This is an implementation of a Factory method pattern - https://refactoring.guru/design-patterns/facory-comparison.
   Compared with a simple factory pattern it complies to OCP (Open/Closed) principle
 */
abstract class ApiClientCreator {
  abstract create(): ApiClient;
}

class RestClientCreator {
  create(): ApiClient {
    return new RestClient();
  }
}

class GraphQLClientCreator {
  create(): ApiClient {
    return new GraphQLClient();
  }
}

type ToDoItem = {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
};

type Post = {
  post: {
    id: number;
    title: string;
    body: string;
  };
};

async function main() {
  const API_CLIENT: string = "graphql";
  let apiClientCreator: ApiClientCreator;
  let endpoint: string;
  let params: string = "";

  switch (API_CLIENT) {
    case "rest":
      apiClientCreator = new RestClientCreator();
      endpoint = "https://jsonplaceholder.typicode.com/todos/1";
      break;
    case "graphql":
      apiClientCreator = new GraphQLClientCreator();
      endpoint = "https://graphqlzero.almansi.me/api";
      params = `query {
        post(id: 1) {
          id
          title
          body
        }
      }`;
      break;
    default:
      throw new Error(`Wrond type: ${API_CLIENT}`);
  }

  const apiClient: ApiClient = apiClientCreator.create();
  const response = await apiClient.request(endpoint, params);

  console.log(JSON.stringify(response));
}

main();
