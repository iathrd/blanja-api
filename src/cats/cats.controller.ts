import { Body, Controller, Delete, Get, Param, Put } from '@nestjs/common';
import EditCatsDto from './dto/edit-cats.dto';

@Controller('cats')
export class CatsController {
  @Get()
  async findAll(): Promise<string> {
    // error handling
    // throw new HttpException(
    //   { STATUS_CODES: HttpStatus.FORBIDDEN, error: 'this is a custom message' },
    //   HttpStatus.FORBIDDEN,
    //   {
    //     cause: 'You are not allowed to access this resource',
    //   },
    // );

    //custom exception
    // throw new ForbiddenException();
    return 'This action returns all cats';
  }

  @Put(':id')
  update(@Body() editCatsDto: EditCatsDto, @Param('id') id: string): string {
    return `${editCatsDto.name} with id ${id}`;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This action returns a #${id} cat`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} cat`;
  }
}
