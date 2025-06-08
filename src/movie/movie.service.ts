import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class MovieService {
  public constructor(private readonly userService: UserService) {}
  test() {
    return this.userService.test();
  }
}
