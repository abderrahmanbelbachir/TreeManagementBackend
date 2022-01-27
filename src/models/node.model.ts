import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class NodeModel extends Model {
  @Column
  id: number;

  @Column
  successorId: number;

  @Column({ defaultValue: true })
  isActive: boolean;
}
