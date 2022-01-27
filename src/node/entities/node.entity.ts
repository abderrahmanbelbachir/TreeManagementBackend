import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class Node {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  public successorId?: number;

  @ManyToOne(() => Node, node => node.id)
  @JoinColumn({ name: "successorId" })
  public successor?: Node;

  @OneToMany(() => Node, node => node.successor)
  public children: Node[]

  @Column({ default: true })
  isActive: boolean;


}
