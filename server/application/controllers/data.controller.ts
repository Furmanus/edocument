import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Session,
  UseInterceptors,
} from '@nestjs/common';
import { CreateTagDto } from '../dto/tags.dto';
import { IApplicationSession } from '../../common/interfaces/interfaces';
import { TagsService } from '../services/tags.service';
import { CreateTagValidationPipe } from '../pipes/createTag.pipe';
import { UserRequestInterceptor } from '../interceptors/userRequest.interceptor';

@Controller('/data')
@UseInterceptors(UserRequestInterceptor)
export class DataController {
  public constructor(private tagsService: TagsService) {}

  @Post('/tags')
  @HttpCode(HttpStatus.CREATED)
  public async addTag(
    @Body(CreateTagValidationPipe) createTagDto: CreateTagDto,
    @Session() session: IApplicationSession,
  ): Promise<string> {
    const { tagName } = createTagDto;

    return this.tagsService
      .create({
        owner: session.userId,
        tagName,
      })
      .then((tag) => tag.tagName);
  }

  @Get('/tags')
  @HttpCode(HttpStatus.OK)
  public getTags(@Session() session: IApplicationSession): Promise<string[]> {
    return this.tagsService
      .findAll(session.userId)
      .then((tags) => tags.map((tag) => tag.tagName));
  }
}
