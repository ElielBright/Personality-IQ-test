const ENDPOINT = process.env.REACT_APP_OLLAMA_ENDPOINT || 'https://api.ollama.com/v1';
const API_KEY = process.env.REACT_APP_OLLAMA_API_KEY || '';
const TIMEOUT_MS = 15000;

async function fetchWithTimeout(url, options, timeoutMs = TIMEOUT_MS) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { ...options, signal: controller.signal });
    return res;
  } finally {
    clearTimeout(id);
  }
}

async function chatCompletion(messages, options = {}) {
  const { model = 'qwen3-coder:480b-cloud', temperature = 0.7, maxTokens = 4096, format } = options;
  if (!API_KEY) throw new Error('API key not configured. Set REACT_APP_OLLAMA_API_KEY in .env');

  const body = {
    model,
    messages,
    temperature,
    max_tokens: maxTokens,
  };
  if (format) body.response_format = format;

  const res = await fetchWithTimeout(`${ENDPOINT}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => 'Unknown error');
    throw new Error(`API ${res.status}: ${errText.slice(0, 200)}`);
  }

  const data = await res.json();
  return data.choices?.[0]?.message?.content?.trim() || '';
}

async function generateJSON(messages, options = {}) {
  const text = await chatCompletion(messages, { ...options, format: { type: 'json_object' } });
  try {
    return JSON.parse(text);
  } catch {
    const match = text.match(/\{[\s\S]*\}/);
    if (match) return JSON.parse(match[0]);
    throw new Error('Failed to parse JSON from API response');
  }
}

export { chatCompletion, generateJSON };
