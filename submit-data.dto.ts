import { IsEmail, IsNotEmpty } from 'class-validator';

export class SubmitDataDto {
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @IsEmail({}, { message: 'Email must be valid' })
  email: string;

  @IsNotEmpty({ message: 'Status is required' })
  status: string;
}