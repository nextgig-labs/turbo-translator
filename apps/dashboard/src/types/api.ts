import type { operations } from '@turbo-translator/api-types'

// Reusable type aliases for OpenAPI response types
export type LanguagesResponse = operations['TranslationController_getSupportedLanguages']['responses']['200']['content']['application/json']
export type TranslateResponse = operations['TranslationController_translate']['responses']['200']['content']['application/json']
export type TranslateRequest = operations['TranslationController_translate']['requestBody']['content']['application/json']

// Error response types
export type ErrorResponse = {
  statusCode?: number
  message?: string
  error?: string
}

export type TranslateErrorResponse = operations['TranslationController_translate']['responses'][400 | 500]['content']['application/json']
export type LanguagesErrorResponse = operations['TranslationController_getSupportedLanguages']['responses'][500]['content']['application/json']

// Type guards for response validation
export function isLanguagesResponse(data: unknown): data is LanguagesResponse {
  return typeof data === 'object' &&
         data !== null &&
         'languages' in data &&
         Array.isArray((data as LanguagesResponse).languages)
}

export function isTranslateResponse(data: unknown): data is TranslateResponse {
  return typeof data === 'object' &&
         data !== null &&
         'translatedText' in data &&
         'sourceLanguage' in data &&
         'targetLanguage' in data
}

export function isErrorResponse(data: unknown): data is ErrorResponse {
  return typeof data === 'object' &&
         data !== null &&
         ('statusCode' in data || 'message' in data || 'error' in data)
}

// API error type for React Query error handling
export type ApiError = {
  message: string
  statusCode?: number
  error?: string
}