import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { Message } from "./message";
import { User } from "./user";
import { Wallet } from "./wallet";

@Entity()
export class Device extends BaseEntity {
  @PrimaryColumn("uuid", { nullable: false, length: 64 })
  id: string;

  @Column({ nullable: false })
  userId: number;

  @Column({ type: "uuid", nullable: false, length: 64 })
  walletId: string;

  @OneToMany(() => Message, (msg) => msg.device, {
    createForeignKeyConstraints: false,
  })
  msgs: Message[];

  @ManyToOne(() => Wallet, (wallet) => wallet.devices, {
    cascade: true,
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: "walletId", referencedColumnName: "id" })
  wallet: Wallet;

  @ManyToOne(() => User, (user) => user.devices, {
    cascade: true,
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: "userId", referencedColumnName: "id" })
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
