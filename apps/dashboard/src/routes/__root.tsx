import { createFileRoute } from '@tanstack/react-router'
import { TranslationService } from '../components/TranslationService'

export const Route = createFileRoute('/')({
  component: TranslationService,
})