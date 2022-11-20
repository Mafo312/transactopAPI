

import { ApiProperty } from "@nestjs/swagger";

/**dto transaction  */
export class CreateTransactionDto {

    @ApiProperty({ required: true})
    value: number

    @ApiProperty({ required: true})
    timestamp: number

    @ApiProperty({ required: true})
    receiver: string

    @ApiProperty({ required: true, default: false })
    confirmed?: boolean = false

    @ApiProperty({ required: true })
    sender: string
}


