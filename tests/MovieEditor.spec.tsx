import type { Movie } from "../src/interfaces/movie";
import { MovieEditor } from "../src/components/MovieEditor";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("MovieEditor Component", () => {
    const mockMovie: Movie = {
        id: "test-movie-123",
        title: "The Test Movie",
        rating: 8,
        description: "A movie for testing",
        released: 2020,
        soundtrack: [{ id: "song1", name: "Test Song", by: "Test Artist" }],
        watched: {
            seen: true,
            liked: true,
            when: "2023-01-01",
        },
    };

    const mockChangeEditing = jest.fn();
    const mockEditMovie = jest.fn();
    const mockDeleteMovie = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        render(
            <MovieEditor
                changeEditing={mockChangeEditing}
                movie={mockMovie}
                editMovie={mockEditMovie}
                deleteMovie={mockDeleteMovie}
            ></MovieEditor>,
        );
    });

    test("renders MovieEditor with initial movie data", () => {
        const title = screen.getByDisplayValue("The Test Movie");

        expect(title).toBeInTheDocument();
    });
});

const mockMovie = {
    id: "test-movie-123",
    title: "The Test Movie",
    rating: 8,
    description: "A movie for testing",
    released: 2020,
    soundtrack: [{ id: "song1", name: "Test Song", by: "Test Artist" }],
    watched: {
        seen: true,
        liked: true,
        when: "2023-01-01",
    },
};

describe("MovieEditor interactions", () => {
    let mockChangeEditing: jest.Mock;
    let mockEditMovie: jest.Mock;
    let mockDeleteMovie: jest.Mock;

    beforeEach(() => {
        mockChangeEditing = jest.fn();
        mockEditMovie = jest.fn();
        mockDeleteMovie = jest.fn();

        render(
            <MovieEditor
                changeEditing={mockChangeEditing}
                movie={mockMovie}
                editMovie={mockEditMovie}
                deleteMovie={mockDeleteMovie}
            />,
        );
    });

    test("allows updating the title and saving (calls editMovie)", () => {
        const titleInput = screen.getByDisplayValue("The Test Movie");
        userEvent.clear(titleInput);
        userEvent.type(titleInput, "New Title");

        const saveButton = screen.getByRole("button", { name: /save/i });
        userEvent.click(saveButton);

        expect(mockEditMovie).toHaveBeenCalled();
        expect(mockChangeEditing).toHaveBeenCalled();
    });

    test("calls deleteMovie when Delete button is clicked", () => {
        const deleteButton = screen.getByRole("button", { name: /delete/i });
        userEvent.click(deleteButton);
        expect(mockDeleteMovie).toHaveBeenCalled();
    });
});
