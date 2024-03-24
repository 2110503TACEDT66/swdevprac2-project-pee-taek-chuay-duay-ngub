// Response Interfaces
export interface Company {
    id: string;
    name: string;
    description: string;
    location: string;
}

export interface Interview {
    id: string;
    user: string;
    company: string;
    date: string;
}

// User Registration Request Interface
export interface RegisterUserRequest {
    name: string;
    telephoneNumber: string;
    email: string;
    role: 'admin' | 'company' | 'user';
    password: string;
    company?: string; // Optional since a user might not belong to a company
}

// Success Response Interface
export interface RegisterUserSuccessResponse {
    success: true;
}

// Error Response Interface
export interface RegisterUserErrorResponse {
    success: false;
    error: string;
}

// Combined Response Type
export type RegisterUserResponse = RegisterUserSuccessResponse | RegisterUserErrorResponse;
