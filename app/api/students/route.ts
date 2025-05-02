import { students } from "@/lib/db";
import { isValidCGPA, validateStudent } from "@/lib/utils";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;

    const query = searchParams.get("query");

    if (query) {
        const lowerQuery = query.toLowerCase();

        const filteredStudents = students.filter((student) => {
            const matchesName = student.name.toLowerCase().includes(lowerQuery);
            const matchesMajor = student.major.toLowerCase().includes(lowerQuery);
            const matchesReg = student.registrationNumber.toLowerCase().includes(lowerQuery);
            const matchesGpa = student.gpa.toString().includes(query);

            return matchesName || matchesMajor || matchesGpa || matchesReg;
        });

        return Response.json(filteredStudents);
    }

    return Response.json(students);
}

export async function POST(request: Request) {

    const body = await request.json();
    const isValidGpa = isValidCGPA(body.gpa);
    if (!isValidGpa) {
        return Response.json({ message: "Invalid GPA" }, { status: 400 });
    }

    const isValid = validateStudent(body);

    if (!isValid) {
        return Response.json({ message: "Invalid data" }, { status: 400 });
    }

    const newStudent = {
      id: `student-${Date.now()}`,
      ...body,
    };
    students.push(newStudent);
    return Response.json(students, { status: 201 });
}
