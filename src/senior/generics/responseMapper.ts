function mapResponse<T, U>(data: T, mapper: (input: T) => U ): U {
    return mapper(data)
}

type userResponse = {
    user_id: number,
    user_name: string
}

type userType = {
    id: number,
    name: string
}

type ApiResponse = {
    data: any,
    code: number
}

const request: Promise<ApiResponse> = new Promise((resolve) => setTimeout(() => resolve({ data: { user_id: 123, user_name:"Alice" }, code: 200 }), 1000));

function userMapper(input: userResponse): userType {
    let output: userType = { id: input.user_id, name: input.user_name }
    return output
}

async function main() {
    let response: ApiResponse = await request
    let mappedData: userType = mapResponse(response.data, userMapper);
    console.log(mappedData.id);
    console.log(mappedData.name);
}

main()