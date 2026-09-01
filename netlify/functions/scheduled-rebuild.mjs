export default async () => {
  const buildHook = Netlify.env.get('NETLIFY_BUILD_HOOK');

  if (!buildHook) {
    console.warn('NETLIFY_BUILD_HOOK is not configured; skipping the scheduled rebuild.');
    return new Response('Build hook not configured.', {status: 200});
  }

  const response = await fetch(buildHook, {
    method: 'POST',
    headers: {'content-type': 'application/json'},
    body: '{}',
  });

  if (!response.ok) throw new Error(`Build hook returned ${response.status}.`);
  return new Response('Rebuild requested.', {status: 200});
};
