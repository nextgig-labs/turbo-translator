import createFetchClient from "openapi-fetch";
import createClient from "openapi-react-query";
import type { paths } from '@turbo-translator/api-types'

// Create fetch client with proper configuration
const fetchClient = createFetchClient<paths>({
  baseUrl: 'http://localhost:3000',
})

// Create openapi-react-query client
export const $api = createClient(fetchClient)