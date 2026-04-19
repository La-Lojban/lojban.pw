/*
 * Lighthouse CI config for lojban.pw production audits.
 *
 * Form factor is picked from LHCI_FORM_FACTOR env var so the GitHub Actions
 * matrix can reuse the same config for both mobile and desktop. Defaults to
 * mobile (Lighthouse's own default).
 *
 * Assertions are all `warn` so this workflow never blocks a deploy. Tighten
 * to `error` on specific audits once the numbers are stable on prod.
 */
const formFactor = process.env.LHCI_FORM_FACTOR === 'desktop' ? 'desktop' : 'mobile';

const collectSettings = {
  chromeFlags: '--no-sandbox --headless=new --disable-gpu',
  throttlingMethod: 'simulate',
  // `uses-http2` is noisy on Cloudflare / GitHub Pages edge — HTTP/3 is
  // sometimes misreported. Audit manually from the HTML report if needed.
  skipAudits: ['uses-http2'],
};

if (formFactor === 'desktop') {
  collectSettings.preset = 'desktop';
}

module.exports = {
  ci: {
    collect: {
      numberOfRuns: 1,
      settings: collectSettings,
    },
    assert: {
      preset: 'lighthouse:no-pwa',
      assertions: {
        'categories:performance': ['warn', { minScore: 0.75 }],
        'categories:accessibility': ['warn', { minScore: 0.9 }],
        'categories:best-practices': ['warn', { minScore: 0.9 }],
        'categories:seo': ['warn', { minScore: 0.9 }],
        'largest-contentful-paint': ['warn', { maxNumericValue: 2500 }],
        'first-contentful-paint': ['warn', { maxNumericValue: 1800 }],
        'cumulative-layout-shift': ['warn', { maxNumericValue: 0.1 }],
        'total-blocking-time': ['warn', { maxNumericValue: 200 }],
        interactive: ['warn', { maxNumericValue: 3800 }],
        'speed-index': ['warn', { maxNumericValue: 3400 }],
        'server-response-time': ['warn', { maxNumericValue: 600 }],
        'unused-javascript': ['warn', { maxNumericValue: 150000 }],
        'unused-css-rules': ['warn', { maxNumericValue: 50000 }],
        'uses-text-compression': 'warn',
        'uses-responsive-images': 'warn',
        'modern-image-formats': 'warn',
        'efficient-animated-content': 'warn',
        'third-party-summary': 'off',
        'uses-long-cache-ttl': 'off',
        'csp-xss': 'off',
        'bf-cache': 'off',
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
