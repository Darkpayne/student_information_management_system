import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import StudentForm from "@/components/shared/Form";
import { useRouter } from "next/navigation";
import { toaster } from "@/components/ui/toaster";
import { AddNewStudent, UpdateStudent } from "@/services/student_service";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@/lib/api", () => ({
  AddNewStudent: jest.fn(),
  UpdateStudent: jest.fn(),
}));

jest.mock("@/lib/toaster", () => ({
  create: jest.fn(),
}));

describe("StudentForm", () => {
  const push = jest.fn();

  beforeEach(() => {
    jest.mock('next/router', () => ({
        useRouter: () => ({ push: jest.fn() }),
      }));
    jest.clearAllMocks();
  });

  it("renders form inputs correctly (create mode)", () => {
    render(<StudentForm />);

    expect(screen.getByPlaceholderText(/Enter full name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter registration number/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter major/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter GPA/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Add Student/i })).toBeInTheDocument();
  });

  it("renders form with initial data (edit mode)", () => {
    render(
      <StudentForm
        initialData={{
          id: "1",
          name: "John Doe",
          registrationNumber: "12345",
          major: "CS",
          dob: "2000-01-01",
          gpa: 3.5,
        }}
      />
    );

    expect(screen.getByDisplayValue("John Doe")).toBeInTheDocument();
    expect(screen.getByDisplayValue("12345")).toBeInTheDocument();
    expect(screen.getByDisplayValue("CS")).toBeInTheDocument();
    expect(screen.getByDisplayValue("2000-01-01")).toBeInTheDocument();
    expect(screen.getByDisplayValue("3.5")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Update Student/i })).toBeInTheDocument();
  });

  it("submits new student successfully", async () => {
    (AddNewStudent as jest.Mock).mockResolvedValueOnce({ success: true });

    render(<StudentForm />);
    fireEvent.change(screen.getByPlaceholderText(/Enter full name/i), {
      target: { value: "Jane Doe", name: "name" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Enter registration number/i), {
      target: { value: "67890", name: "registrationNumber" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Enter major/i), {
      target: { value: "Math", name: "major" },
    });
    fireEvent.change(screen.getByLabelText(/Date of Birth/i), {
      target: { value: "1999-12-31", name: "dob" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Enter GPA/i), {
      target: { value: "4.0", name: "gpa" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Add Student/i }));

    await waitFor(() => {
      expect(AddNewStudent).toHaveBeenCalledWith({
        name: "Jane Doe",
        registrationNumber: "67890",
        major: "Math",
        dob: "1999-12-31",
        gpa: 4.0,
      });
      expect(toaster.create).toHaveBeenCalledWith(
        expect.objectContaining({ type: "success" })
      );
      expect(push).toHaveBeenCalledWith("/students");
    });
  });

  it("shows error toast if API fails", async () => {
    (AddNewStudent as jest.Mock).mockRejectedValueOnce(new Error("Server error"));

    render(<StudentForm />);

    fireEvent.click(screen.getByRole("button", { name: /Add Student/i }));

    await waitFor(() => {
      expect(toaster.create).toHaveBeenCalledWith(
        expect.objectContaining({ description: "Server error", type: "error" })
      );
    });
  });

  it("calls UpdateStudent in edit mode", async () => {
    (UpdateStudent as jest.Mock).mockResolvedValueOnce({ success: true });

    const initialData = {
      id: "abc123",
      name: "Old Name",
      registrationNumber: "999",
      major: "Old Major",
      dob: "2001-01-01",
      gpa: 2.5,
    };

    render(<StudentForm initialData={initialData} />);

    fireEvent.change(screen.getByPlaceholderText(/Enter full name/i), {
      target: { value: "New Name", name: "name" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Update Student/i }));

    await waitFor(() => {
      expect(UpdateStudent).toHaveBeenCalledWith(
        expect.objectContaining({ name: "New Name" }),
        "abc123"
      );
    });
  });
});
