import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserDto } from 'src/user/dto/users.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(user: Readonly<UserDto>): Promise<UserDto | any> {
    const { email, password } = user;

    const existingUser = await this.userService.findByEmail(email);

    if (existingUser) {
      throw new HttpException(
        'an account with that email already exists',
        HttpStatus.CONFLICT,
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await this.userService.create(email, hashedPassword);
  }
  async doesPasswordMatch(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  async userExists(user: UserDto): Promise<UserDto | null> {
    const userFound = await this.userService.findByEmail(user.email);
    if (!userFound) return null;

    const doesPasswordMatch = await this.doesPasswordMatch(
      user.password,
      userFound.password,
    );

    if (!doesPasswordMatch) return null;
    return user;
  }

  async login(user: UserDto): Promise<{ token: string | null }> {
    const { email, password } = user;
    const userCheck = await this.userExists(user);

    if (!userCheck)
      throw new HttpException('Credentials wrong', HttpStatus.UNAUTHORIZED);

    const jwt = await this.jwtService.signAsync({ userCheck });
    return { token: jwt };
  }
}
