import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'todo',
})
export class TodoEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;
}
