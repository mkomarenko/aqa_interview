type ApiError = {
    message: string,
    code: number
}

interface ApiResponse {
    data: Array<number>,
    code: number
}

function isApiError(obj: any): obj is ApiError {
    return obj && typeof obj.message === "string" && typeof obj.code === "number"
}

function isApiResponse(obj: any): obj is ApiResponse {
    return obj && Array.isArray(obj.data) && obj.data.every((item: any) => typeof item === "number") && typeof obj.code === "number"

}

const requestFailure: any = new Promise((resolve) => setTimeout(() => resolve({ message: "Internal server error", code: 503 }), 2000));
const requestSuccess: any = new Promise((resolve) => setTimeout(() => resolve({ data: [1, 2, 3], code: 200 }), 2000));

function parseResponse<T>(response: unknown, validator: (data: unknown) => data is T): T {
    if (validator(response)) {
      return response;
    }
    throw new Error("Invalid response");
  }

async function main() {
    const response: unknown = await requestSuccess;
    const parsedResponse = parseResponse(response, isApiResponse)
    console.log(parsedResponse.data);
}

main()
