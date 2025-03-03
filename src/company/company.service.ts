import { Injectable } from '@nestjs/common'
import { Company } from '@prisma/client'
import { CreateCompanyDto } from './dto/create-company.dto'
import { UpdateCompanyDto } from './dto/update-company.dto'
import { CompanyRepository } from './repository/company.repository'

@Injectable()
export class CompanyService {
  constructor(private company: CompanyRepository) {}

  public async create(data: CreateCompanyDto): Promise<Company> {
    return this.company.create(data)
  }

  public findOne(id: string): Promise<Company | null> {
    return this.company.findOne(id)
  }

  public update(id: string, updateCompanyDto: UpdateCompanyDto) {
    return this.company.update(id, updateCompanyDto)
  }

  public remove(id: string) {
    return this.company.delete(id)
  }
}
