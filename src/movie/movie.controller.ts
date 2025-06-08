import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Headers,
  Req,
  Res,
  Param,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import type { Request, Response } from 'express';
@Controller({
  path: 'movies',
  // host: ['api.google.com'],
})
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  findALL(@Query('genre') genre: string) {
    return genre
      ? { message: `Movie with genre ${genre}` }
      : [{ title: 'mortal combat' }, { title: 'mortal combat 2' }];
  }

  @Get('id/fewfwef/:reviewId')
  finById(@Param('id') id: string) {
    return id;
  }

  @Get('findAll')
  findALLTwo(@Query() genre: any) {
    return JSON.stringify(genre);
  }

  @Get('test')
  test() {
    return this.movieService.test();
  }

  @Post('exampleFirst')
  create(@Body('title') title: string) {
    return title;
  }

  @Post('exampleSecond')
  create1(@Body() body: { title: string; genre: string }) {
    return `${body.title} with genre ${body.genre}`;
  }

  @Get('header')
  getHeaders(@Headers() headers: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return headers;

    /*
    {
	"host": "localhost:3000",
	"content-type": "application/json",
	"user-agent": "insomnia/11.0.1",
	"accept": "*\/*",
	"content-length": "42"
 */
  }

  @Get('userAgent')
  getUserAgent(@Headers('user-agent') userAgent: string) {
    return { userAgent };
    /* {
	"userAgent": "insomnia/11.0.1"
} */
  }

  @Get('request')
  getRequestDetails(@Req() req: Request) {
    return {
      method: req.method,
      url: req.url,
      headers: req.headers,
      query: req.query,
      params: req.params,
    };
  }

  @Get('response')
  getResponseDetails(@Res() res: Response) {
    res.status(201).json({ message: 'hello' });
  }
}
