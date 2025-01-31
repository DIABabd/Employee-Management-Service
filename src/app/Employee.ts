// Employee.ts
export interface Employee {
  id?: number;
  lastName: string;
  firstName: string;
  street: string;
  postcode: string;  // Must be exactly 5 characters
  city: string;
  phone: string;
  skillSet?: Qualification[];  // Array of qualifications
}

export interface Qualification {
  id?: number;
  skill: string;
}
