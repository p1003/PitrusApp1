export interface User {
  id: string;
  role: string;
  courses: {
    id: string;
    rate?: number;
  }[];
}
