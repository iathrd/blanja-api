import { Body, Controller, Get, Post } from '@nestjs/common';
import EditCatsDto from './dto/edit-cats.dto';
import { CatsService } from './cats.service';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Post()
  async create(@Body() createCatDto: EditCatsDto) {
    this.catsService.create(createCatDto);
  }

  @Get()
  async findAll() {
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
    return this.catsService.findAll();
  }
}
