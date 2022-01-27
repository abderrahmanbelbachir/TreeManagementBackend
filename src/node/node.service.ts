import { Injectable } from '@nestjs/common';
import { CreateNodeDto } from './dto/create-node.dto';
import { UpdateNodeDto } from './dto/update-node.dto';
import { Connection } from 'typeorm';
import { Node } from './entities/node.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class NodeService {

  constructor(private connection: Connection,
              @InjectRepository(Node)
              private nodesRepository: Repository<Node>) {}

  async create(createNodeDto: CreateNodeDto) {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const node: Node = new Node();
      node.id = createNodeDto.id;
      node.successorId = createNodeDto.successorId;
      await queryRunner.manager.save(node);
      await queryRunner.commitTransaction();
      return 'added node successfully !';
    } catch (err) {
      // since we have errors lets rollback the changes we made
      await queryRunner.rollbackTransaction();
      const error = {
        title: 'eror while saving node!',
        body: err
      };
      throw new Error(`ERROR Saving node: ${err}`);
    } finally {
      // you need to release a queryRunner which was manually instantiated
      await queryRunner.release();
    }
    return 'This action adds a new node';
  }

  findAll(): Promise<Node[]> {
    return this.nodesRepository.find({relations: ['successor']});
    // return `This action returns all node`;
  }

  findOne(id: number) {
    return `This action returns a #${id} node`;
  }

  update(id: number, updateNodeDto: UpdateNodeDto) {
    this.nodesRepository.update(id , updateNodeDto);
    return `This action updates a #${id} node`;
  }

  remove(id: number) {
    const node: Node = new Node();
    node.id = id;
    this.nodesRepository.remove(node);
    return `This action removes a #${id} node`;
  }
}
