interface User {
    id: number;
    name: string;
  }

  type ApiResponse = {
    data: any,
    code: number
}

const request: Promise<ApiResponse> = new Promise((resolve) => setTimeout(() => resolve({ data: { id: 123, name:"Alice" }, code: 200 }), 1000));

function isUser(data: unknown): data is User {
    return (typeof data === 'object' && 
      data !== null 
      && 'id' in data &&
      'name' in data &&
      typeof data.id === 'number' &&
      typeof data.name === 'string'
    );
}

async function main() {
    let response: ApiResponse = await request
    let user: User = response.data
    if (isUser(user)) {
      console.log(user.id);
      console.log(user.name);
    } else {
      console.log("Invalid user");
    }
}

main()