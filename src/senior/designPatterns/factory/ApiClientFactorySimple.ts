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

/* This is an implementation of Simple factory pattern - https://refactoring.guru/design-patterns/facory-comparison. 
   Ideally to be replaced with Factory method pattern especially if we expect to add new Api client classes later.
*/
class ApiClientFactory {
  static create(type: ClientType): ApiClient {
    switch (type) {
      case "rest":
        return new RestClient();
      case "graphql":
        return new GraphQLClient();
      default:
        throw new Error(`Unkown type: ${type}`);
    }
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
  const restClient = ApiClientFactory.create("rest");
  const todoItem = await restClient.request<ToDoItem>(
    "https://jsonplaceholder.typicode.com/todos/1",
  );
  console.log(todoItem.title);

  const graphqlClient = ApiClientFactory.create("graphql");
  const post = await graphqlClient.request<Post>(
    "https://graphqlzero.almansi.me/api",
    `query {
  post(id: 1) {
    id
    title
    body
  }
}`,
  );
  console.log(JSON.stringify(post.post.title));
}

main();
