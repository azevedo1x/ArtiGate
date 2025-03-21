import { Body, Controller, Post } from '@nestjs/common';
import { CreateAddressDTO } from '../applications/dtos/address/createAddress.dto';
import { CreateAddressService } from '../applications/services/address/createAddress.service';

@Controller('address')
export class AddressController {
  constructor(private readonly createAddressService: CreateAddressService) {}

  @Post('create')
  async create(@Body() data: CreateAddressDTO) {
    return this.createAddressService.execute(data);
  }
}
