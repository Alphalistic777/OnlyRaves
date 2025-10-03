import { header } from './header.js';

// Wrapper für jede seite
export function layout(bodyHTML, authState = {}){
    return `<!DOCTYPE html>

<html lang="de">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>oknow – ${authState.title || 'Raves'}</title>
  <link rel="stylesheet" href="/main/styles.css"/>
  <link rel="stylesheet" href="/main/layout.css"/>
</head>
<body>
  ${header(authState)}
  <main class="content">${bodyHTML}</main>
  <footer>© 2025 OnlyRaves – Only for the Fans</footer>
</body>
</html>`;
}