import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { Tokens } from './types';
import { AtGuard } from './../common/guards/at.guard';
import { RtGuard } from './../common/guards/rt.guard';
import {
  GetCurrentuser,
  GetCurrentuserId,
  Public,
} from 'src/common/decorators';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('local/signup')
  @HttpCode(HttpStatus.CREATED)
  signupLocal(@Body() dto: AuthDto): Promise<Tokens> {
    return this.authService.signupLocal(dto);
  }

  @Public()
  @Post('local/signin')
  @HttpCode(HttpStatus.OK)
  signinLocal(
    @Body() dto: AuthDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<Tokens> {
    console.log(this.authService.signinLocal(dto));
    response.cookie('jwt', 'tttteeeesssstttt', { httpOnly: true });
    return this.authService.signinLocal(dto);
  }

  @UseGuards(AtGuard)
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@GetCurrentuserId('sub') userId: number) {
    this.authService.logout(userId);
  }

  @UseGuards(RtGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refreshTokens(
    @GetCurrentuserId('sub') userId: number,
    @GetCurrentuser('refreshToken') refreshToken: string,
  ) {
    return this.authService.refreshTokens(userId, refreshToken);
  }

  @UseGuards(AtGuard)
  @Post('atGuardTest')
  atGuardTest() {
    return 'AtGuard test';
  }

  //@UseGuards(RtGuard)
  @Post('test')
  test(@Res({ passthrough: true }) response: Response) {
    response.cookie('jwt', 'tttteeeesssstttt', { httpOnly: true });
    return 'test';
  }
}
