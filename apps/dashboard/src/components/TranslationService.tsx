import { useState, useEffect } from 'react'
import { $api } from '../utils/apiClient'

export function TranslationService() {
  const [fromLanguage, setFromLanguage] = useState<string>('')
  const [toLanguage, setToLanguage] = useState<string>('')
  const [textToTranslate, setTextToTranslate] = useState<string>('')

  // Type-safe query for fetching supported languages - types inferred from OpenAPI
  const {
    data: languagesData,
    isLoading: isLoadingLanguages,
    error: languagesError
  } = $api.useQuery('get', '/translation/languages')

  // Type-safe mutation for translating text with proper callbacks - types inferred from OpenAPI
  const translateMutation = $api.useMutation('post', '/translation/translate', {
    onSuccess: (data) => {
      console.log('Translation successful:', data)
    },
    onError: (error) => {
      console.error('Translation failed:', error)
    }
  })

  // Set default languages when data is loaded - type inferred from OpenAPI
  useEffect(() => {
    if (languagesData?.languages && languagesData.languages.length >= 2 && !fromLanguage && !toLanguage) {
      setFromLanguage(languagesData.languages[0].code)
      setToLanguage(languagesData.languages[1].code)
    }
  }, [languagesData, fromLanguage, toLanguage])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (textToTranslate.trim() && fromLanguage && toLanguage) {
      translateMutation.mutate({
        body: {
          text: textToTranslate,
          sourceLanguage: fromLanguage,
          targetLanguage: toLanguage,
        },
      })
    }
  }

  if (isLoadingLanguages) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-gray-600">Loading languages...</div>
      </div>
    )
  }

  const languages = languagesData?.languages || []

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Translation Service</h2>
        <p className="text-gray-600">Type-safe OpenAPI data fetching</p>
      </div>

      {(languagesError || translateMutation.error) && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          <strong>Error:</strong> {languagesError?.message || translateMutation.error?.message || 'Unknown error occurred'}
          {(languagesError?.statusCode || translateMutation.error?.statusCode) && (
            <span className="ml-2 text-sm">
              (Status: {languagesError?.statusCode || translateMutation.error?.statusCode})
            </span>
          )}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="fromLanguage" className="block text-sm font-medium text-gray-700 mb-1">
              From Language
            </label>
            <select
              id="fromLanguage"
              value={fromLanguage}
              onChange={(e) => setFromLanguage(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isLoadingLanguages}
            >
              <option value="">Select source language</option>
              {languages.map((lang) => (
                <option key={`from-${lang.code}`} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="toLanguage" className="block text-sm font-medium text-gray-700 mb-1">
              To Language
            </label>
            <select
              id="toLanguage"
              value={toLanguage}
              onChange={(e) => setToLanguage(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isLoadingLanguages}
            >
              <option value="">Select target language</option>
              {languages.map((lang) => (
                <option key={`to-${lang.code}`} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              disabled={translateMutation.isPending || !textToTranslate.trim() || !fromLanguage || !toLanguage}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {translateMutation.isPending ? 'Translating...' : 'Translate'}
            </button>
          </div>
        </div>

        <div>
          <label htmlFor="textToTranslate" className="block text-sm font-medium text-gray-700 mb-1">
            Text to Translate
          </label>
          <textarea
            id="textToTranslate"
            value={textToTranslate}
            onChange={(e) => setTextToTranslate(e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter text to translate..."
            disabled={translateMutation.isPending}
          />
        </div>

        {translateMutation.data && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Translated Text
            </label>
            <div className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md min-h-[100px]">
              {translateMutation.data.translatedText}
            </div>
            <div className="mt-2 text-sm text-gray-500">
              Confidence: {translateMutation.data.confidence?.toFixed(2) || 'N/A'}
            </div>
          </div>
        )}
      </form>

      <div className="mt-6 p-4 bg-gray-50 rounded-md">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">OpenAPI Integration Details</h3>
        <div className="text-sm text-gray-600 space-y-1">
          <p><strong>Type Safety:</strong> Using <code className="bg-gray-200 px-1 rounded">openapi-react-query</code> with OpenAPI types from <code className="bg-gray-200 px-1 rounded">@turbo-translator/api-types</code></p>
          <p><strong>Auto-generated:</strong> All hooks and types are automatically generated from OpenAPI schema</p>
          <p><strong>Endpoints:</strong></p>
          <ul className="list-disc list-inside ml-2">
            <li><code>GET /translation/languages</code> - Fetch supported languages</li>
            <li><code>POST /translation/translate</code> - Translate text between languages</li>
          </ul>
          <p><strong>Benefits:</strong> Full end-to-end type safety, automatic error handling, loading states, and optimal data fetching</p>
        </div>
      </div>
    </div>
  )
}