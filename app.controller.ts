import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { GoogleSheetsService } from './utils/google-sheets.service';
import { SubmitDataDto } from 'src/dto/submit-data.dto';

@Controller('')
export class AppController {
  constructor(private readonly gsheetService: GoogleSheetsService) {}

  @Get()
  getRoot(): string {
    return 'NestJS Google Sheets API is running!';
  }

  @Post('submit')
  async submitData(@Body() body: SubmitDataDto) {
    const { name, email, status } = body;

    if (!name || !email || !status) {
      return { success: false, message: 'Missing fields' };
    }

    await this.gsheetService.appendRow([name, email, status]);

    return {
      success: true,
      message: 'Data written to Google Sheet',
      data: body,
    };
  }

  @Get('export')
  exportSheet(@Query('format') format: 'pdf' | 'xlsx') {
    if (!['pdf', 'xlsx'].includes(format)) {
      return {
        success: false,
        message: 'Invalid format. Use ?format=pdf or ?format=xlsx',
      };
    }

    const today = new Date().toISOString().split('T')[0];
    const link = this.gsheetService.getExportUrl(format, today);

    return {
      success: true,
      downloadLink: link,
      note: 'Make sure your Google Sheet is shared as "Anyone with the link can view"',
    };
  }
}