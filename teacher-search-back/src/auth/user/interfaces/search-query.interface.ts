export interface SearchByNameQuery {
  search: string;
  limit: number;
  offset: number;
  department: string;
  faculty: string;
}
export interface SearchByParametersQuery {
  department: string;
  faculty: string;
}
