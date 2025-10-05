import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  Get,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Headers } from "@nestjs/common";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}
  // @Post('login')
  // async login(@Body() body) {
  //   const user = await this.authService.validateUser(body.username, body.password);
  //   if (!user) throw new UnauthorizedException();
  //   return this.authService.login(user);
  // }

  @Post("login")
  async login(@Headers("authorization") authHeader: string) {
    console.log("authHeader", authHeader);
    // return authHeader;
    if (!authHeader || !authHeader.startsWith("Basic ")) {
      throw new UnauthorizedException(
        "Missing or invalid Authorization header"
      );
    }

    const base64Credentials = authHeader.split(" ")[1];
    const credentials = Buffer.from(base64Credentials, "base64").toString(
      "ascii"
    );
    const [username, password] = credentials.split(":");
    console.log(username, password);

    const user = await this.authService.validateUser(username, password);
    console.log("user3456789", user);
    if (!user) {
      throw new UnauthorizedException();
    }
    return this.authService.login(user);
  }

  @Get("loing")
  log() {
    return "working fine";
  }
}
