type ApiResponse = {
    data: any,
    code: number
}

interface ApiError {
  message: string;
  code: number;
}

// const request: Promise<ApiError> = new Promise((resolve) => setTimeout(() => resolve({ message: "Error", code: 403 }), 1000));
const request: Promise<ApiResponse> = new Promise((resolve) => setTimeout(() => resolve({ data: { id: 123, name:"Alice" }, code: 200 }), 1000));

function isApiError(obj: unknown): obj is ApiError {
    return (
        typeof obj === "object" &&
        obj !== null &&
        'message' in obj &&
        'code' in obj &&
        typeof (obj as ApiError).message === "string" &&
        typeof (obj as ApiError).code === "number"
    );
}

async function main() {
    let response = await request
    if (isApiError(response)) {
      console.log(response.message);
      console.log(response.code);
    } else {
      console.log("Invalid API Error");
    }
}

main()