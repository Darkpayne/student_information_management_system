import { Student } from "@/types/student";

export const validateStudent = (student: Student) => {
    if (
        !student.name || typeof student.name !== "string" ||
        !student.registrationNumber || typeof student.registrationNumber !== "string" ||
        !student.major || typeof student.major !== "string" ||
        !student.dob || isNaN(Date.parse(student.dob)) ||
        typeof student.gpa !== "number" || student.gpa < 0 || student.gpa > 5
    ) {
        return false;
    }
    return true;
}

export function isValidCGPA(value: number): boolean {

    return !isNaN(value) && value >= 1.0 && value <= 5.0;
}