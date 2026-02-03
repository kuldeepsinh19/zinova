import { PrismaClient, User as PrismaUser } from "@prisma/client";
import {
  IUserRepository,
  UserFilters,
} from "@domain/Interfaces/IUserRepository";
import { User } from "@domain/Entities/User";
import { UserMapper } from "../Mappers/UserMapper";

/**
 * Prisma/Supabase Implementation of IUserRepository
 *
 * This is ONE possible implementation. You can create:
 * - MongoUserRepository implements IUserRepository
 * - MySQLUserRepository implements IUserRepository
 * - FirebaseUserRepository implements IUserRepository
 *
 * Your use cases don't care which one you use!
 */
export class PrismaUserRepository implements IUserRepository {
  constructor(private prisma: PrismaClient) {}

  async findById(id: string): Promise<User | null> {
    const prismaUser = await this.prisma.user.findUnique({
      where: { id },
    });

    return prismaUser ? UserMapper.toDomain(prismaUser) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const prismaUser = await this.prisma.user.findUnique({
      where: { email },
    });

    return prismaUser ? UserMapper.toDomain(prismaUser) : null;
  }

  async create(user: User): Promise<User> {
    const prismaData = UserMapper.toPrisma(user);

    const created = await this.prisma.user.create({
      data: prismaData,
    });

    return UserMapper.toDomain(created);
  }

  async update(user: User): Promise<User> {
    const prismaData = UserMapper.toPrisma(user);

    const updated = await this.prisma.user.update({
      where: { id: user.id },
      data: prismaData,
    });

    return UserMapper.toDomain(updated);
  }

  async updateCreditBalance(userId: string, newBalance: number): Promise<void> {
    await this.prisma.user.update({
      where: { id: userId },
      data: { creditBalance: newBalance },
    });
  }

  async findMany(filters?: UserFilters): Promise<User[]> {
    const prismaUsers = await this.prisma.user.findMany({
      where: {
        email: filters?.email,
        createdAt: filters?.createdAfter
          ? { gte: filters.createdAfter }
          : undefined,
      },
      take: filters?.limit,
      orderBy: { createdAt: "desc" },
    });

    return prismaUsers.map(UserMapper.toDomain);
  }
}
