import { Controller, Get } from '@nestjs/common';

@Controller('user')
export class UserController {



    @Get()
    async health(){
        return "Ok"
    }
}
