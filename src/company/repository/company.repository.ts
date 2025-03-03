import { Injectable } from '@nestjs/common'
import { Company, Prisma } from '@prisma/client'
import { CompanyEntity } from '../company.entity'

@Injectable()
export class CompanyRepository {
  constructor(private companyEntity: CompanyEntity) {}

  async create(data: Prisma.CompanyCreateInput): Promise<Company> {
    return this.companyEntity.company.create({ data })
  }

  async findOne(id: string): Promise<Company> {
    return this.companyEntity.company.findFirstOrThrow({ where: { id } })
  }

  async update(id: string, data: Prisma.CompanyUpdateInput): Promise<Company> {
    return this.companyEntity.company.update({ where: { id }, data })
  }

  async delete(id: string): Promise<Company> {
    return this.companyEntity.company.delete({ where: { id } })
  }
}
