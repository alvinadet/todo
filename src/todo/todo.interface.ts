export interface TodoDto {
  id: string;
  todo: string;
}

export interface TodoUpdateDto extends TodoDto {}

export interface TodoCreateDto extends Omit<TodoUpdateDto, 'id'> {}
