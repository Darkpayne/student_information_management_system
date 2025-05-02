import { students } from "@/lib/db";
import { isValidCGPA, validateStudent } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ student_id: string }> }
) {
  const studentId = (await params).student_id;
  const student = students.find((student) => student.id === studentId);

  if (!student) {
    return NextResponse.json({ error: "Student not found" }, { status: 404 });
  }

  return NextResponse.json(student);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ student_id: string }> }
) {
  const studentId = (await params).student_id;
  const body = await request.json();

  const isValidGpa = isValidCGPA(body.gpa);
  if (!isValidGpa) {
    return Response.json({ message: "Invalid GPA" }, { status: 400 });
  }
  const isValid = validateStudent(body);

  if (!isValid) {
    return Response.json({ message: "Invalid data" }, { status: 400 });
  }
  const studentIndex = students.findIndex((student) => student.id == studentId);

  if (studentIndex === -1) {
    return Response.json({ error: "Student not found" }, { status: 404 });
  }

  const updatedStudent = {
    ...students[studentIndex],
    ...body,
  };

  students[studentIndex] = updatedStudent;

  return Response.json(updatedStudent);
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ student_id: string }> }
) {
  const studentId = (await params).student_id;
  const studentIndex = students.findIndex((student) => student.id == studentId);

  if (studentIndex === -1) {
    return Response.json({ error: "Student not found" }, { status: 404 });
  }

  students.splice(studentIndex, 1);

  return Response.json({ message: "Student deleted successfully" });
}