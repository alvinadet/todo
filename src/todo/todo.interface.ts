export interface TodoDto {
  id: string;
  name: string;
}

export interface TodoUpdateDto extends TodoDto {}

export interface TodoCreateDto extends Omit<TodoUpdateDto, 'id'> {}
