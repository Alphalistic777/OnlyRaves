export function header(authState = {}) {
    const { user, active = '' } = authState;

    // Nav-Punkte (Profil)
    const navItems = [
        { url: '/raves',  label: 'Raves' },
        { url: '/cart',   label: 'Warenkorb' },
        ...(user?.promoter ? [{ url: '/create-rave', label: 'Rave erstellen' }] : [])

    ];
    const nav = navItems.map(i =>
        `<li><a href="${i.url}" class="${i.url === active ? 'active' : ''}">${i.label}</a></li>`
    ).join('');

    // Auth-Bereich rechts
    const auth = user
        ? `<a href="/profile" class="user">${user.first_name}</a>`
        : `<a href="/login">Login</a> / <a href="/register">Registrieren</a>`;

    return `
    <header>
      <div class="logo">OnlyFcknRaves</div>
      <nav><ul>${nav}</ul></nav>
      <div class="auth">${auth}</div>
    </header>`;
}