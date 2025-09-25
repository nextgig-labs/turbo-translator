import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

export interface TranslateRequest {
  text: string;
  sourceLanguage: string;
  targetLanguage: string;
}

export interface TranslateResponse {
  translatedText: string;
  sourceLanguage: string;
  targetLanguage: string;
  confidence?: number;
}

@ApiTags('translation')
@Controller('translation')
export class TranslationController {
  @Post('translate')
  @ApiOperation({ summary: 'Translate text from one language to another' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        text: { type: 'string', example: 'Hello world' },
        sourceLanguage: { type: 'string', example: 'en' },
        targetLanguage: { type: 'string', example: 'es' },
      },
      required: ['text', 'sourceLanguage', 'targetLanguage']
    }
  })
  @ApiResponse({
    status: 200,
    description: 'Text translated successfully',
    schema: {
      type: 'object',
      properties: {
        translatedText: { type: 'string', example: 'Hola mundo' },
        sourceLanguage: { type: 'string', example: 'en' },
        targetLanguage: { type: 'string', example: 'es' },
        confidence: { type: 'number', example: 0.95 }
      },
      required: ['translatedText', 'sourceLanguage', 'targetLanguage']
    }
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - Invalid input parameters',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 400 },
        message: { type: 'string', example: 'Bad Request' },
        error: { type: 'string', example: 'Invalid translation request' }
      }
    }
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 500 },
        message: { type: 'string', example: 'Internal Server Error' },
        error: { type: 'string', example: 'Translation service unavailable' }
      }
    }
  })
  async translate(@Body() request: TranslateRequest): Promise<TranslateResponse> {
    // Mock translation logic - replace with actual translation service
    const translatedText = `[Translated] ${request.text}`;
    return {
      translatedText,
      sourceLanguage: request.sourceLanguage,
      targetLanguage: request.targetLanguage,
      confidence: 0.95,
    };
  }

  @Get('languages')
  @ApiOperation({ summary: 'Get supported languages' })
  @ApiResponse({
    status: 200,
    description: 'List of supported languages',
    schema: {
      type: 'object',
      properties: {
        languages: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              code: { type: 'string', example: 'en' },
              name: { type: 'string', example: 'English' }
            },
            required: ['code', 'name']
          }
        }
      },
      required: ['languages']
    }
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 500 },
        message: { type: 'string', example: 'Internal Server Error' },
        error: { type: 'string', example: 'Failed to fetch supported languages' }
      }
    }
  })
  async getSupportedLanguages() {
    return {
      languages: [
        { code: 'en', name: 'English' },
        { code: 'es', name: 'Spanish' },
        { code: 'fr', name: 'French' },
        { code: 'de', name: 'German' },
        { code: 'zh', name: 'Chinese' },
        { code: 'ja', name: 'Japanese' },
      ],
    };
  }
}