import { isValidCredentials } from "@/lib/utils";

export async function POST(request: Request) {

    const body = await request.json();

    const isValid = isValidCredentials(body);

    if (!isValid) {
        return Response.json({ message: "Invalid Credentials" }, { status: 400 });
    }

    return Response.json(body, { status: 201 });
}
