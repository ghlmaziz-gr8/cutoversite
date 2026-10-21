// "Ask Cutover" for the marketing site: a button and a panel that answers common questions.
// No model and no network call. Answers are written here, and the panel only matches the question to them.
// To change an answer, edit the list below. Contact details come from site.js (CUTOVER.contactEmail).
(function () {
  const QA = [
    { q: 'What is Cutover?',
      a: 'Cutover reads a legacy application and shows what it does, what depends on what, and what a migration would involve. You review the findings, then choose the next stage: a deeper assessment, a modernization plan or a migration plan.',
      k: ['what', 'cutover', 'about', 'does', 'overview'] },
    { q: 'Who is it for?',
      a: 'Platform engineers start the analyses. Security officers, informatics leads, CIOs and CTOs, and auditors each see the findings their role allows. Work is shared in a workspace.',
      k: ['who', 'for', 'role', 'team', 'audience'] },
    { q: 'How do I start an analysis?',
      a: 'Sign in at app.cutover.site, open the Analyses tab, choose Start a new assessment, name the application, and then either enter its GitHub repository or upload a zip of the code. Confirm the data rule: sample or public code only, with no patient data.',
      k: ['start', 'begin', 'analysis', 'assessment', 'run', 'how'] },
    { q: 'Do I need GitHub?',
      a: 'No. You can connect a GitHub repository through the Cutover reader app, or upload a .zip of the code, up to 50 MB, from your computer. Leave out builds, images and backups.',
      k: ['github', 'zip', 'upload', 'repository', 'repo'] },
    { q: 'Is my source code stored?',
      a: 'Code from GitHub is not kept. A zip you upload is stored privately only until its analysis finishes, then it is deleted. Only the findings and the status are kept, and results are deleted after 30 days.',
      k: ['store', 'stored', 'keep', 'kept', 'source', 'code', 'privacy', 'delete', 'deleted'] },
    { q: 'Does it handle patient data?',
      a: 'Cutover is for code and settings only. Confirm the data rule before each analysis: use sample or public code, with no patient information. Database structure can be uploaded as names and counts, with no row values.',
      k: ['patient', 'health', 'phi', 'hipaa', 'data', 'regulated'] },
    { q: 'Which languages and databases does it read?',
      a: 'Cutover reads Classic ASP, VBScript, JavaScript, Java with Spring Boot and JSP, .NET, and many older languages such as COBOL, Visual Basic 6, Delphi, PL/SQL and T-SQL. It names the files it cannot identify rather than guessing.',
      k: ['language', 'languages', 'java', 'asp', 'net', 'cobol', 'support', 'database', 'sql'] },
    { q: 'What is the AI estimate?',
      a: 'When an analysis uses a language model that the workspace has chosen, Cutover also estimates when the application was first written, from the years in the code, file names and git dates, with its confidence and reasons. The estimate from the years alone is always shown.',
      k: ['ai', 'estimate', 'model', 'llm', 'origin', 'age'] },
    { q: 'What are the modernization options?',
      a: 'Each review shows three options chosen by rules from its findings: run the application as it is in containers, a modern web front end over an API, or services over a modern database. Each has its own preview page.',
      k: ['modernize', 'modernise', 'modern', 'template', 'templates', 'option', 'options'] },
    { q: 'Does it produce Terraform?',
      a: 'After the intake is confirmed, a platform engineer can make a Terraform draft for Google Cloud, AWS or Azure. Each draft is marked DRAFT, lists the inputs it used, and is kept as a numbered version.',
      k: ['terraform', 'cloud', 'infrastructure', 'gcp', 'aws', 'azure'] },
    { q: 'Who makes Cutover?',
      a: 'Cutover is powered by Datorian.',
      k: ['datorian', 'who', 'company', 'made', 'builds'] },
    { q: 'How do I see the demo?',
      a: 'Use the Try the demo button on this page. It runs on synthetic sample data and needs no sign-up.',
      k: ['demo', 'try', 'sample', 'example', 'preview'] }
  ];

  // Common words that do not say what a question is about. They are ignored when matching.
  const STOP = new Set(['a', 'an', 'the', 'i', 'me', 'my', 'we', 'our', 'do', 'does', 'is', 'are', 'it', 'to', 'of', 'in', 'on',
    'and', 'or', 'how', 'what', 'who', 'can', 'it', 'be', 'for', 'with', 'by', 'at', 'if', 'so', 'you', 'your', 'there', 'that', 'this']);
  const words = (text) => text.toLowerCase().split(/[^a-z0-9]+/).filter((w) => w && !STOP.has(w));

  // Scores each question by its keywords and its wording. Returns the best one, or null if nothing matches.
  function bestAnswer(question) {
    const asked = words(question);
    let best = null;
    let bestScore = 0;
    for (const item of QA) {
      const keys = new Set(item.k.concat(words(item.q)));
      let score = 0;
      for (const w of asked) if (keys.has(w)) score += 1;
      if (score > bestScore) { best = item; bestScore = score; }
    }
    return best;
  }

  function contactLink(parent) {
    const contact = (window.CUTOVER && window.CUTOVER.contactEmail) || 'hello@cutover.site';
    const link = document.createElement('a');
    link.href = `mailto:${contact}?subject=${encodeURIComponent('Question about Cutover')}`;
    link.textContent = contact;
    parent.appendChild(link);
  }

  function build() {
    const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'ask-toggle';
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-controls', 'askPanel');
    toggle.textContent = 'Ask Cutover';

    const panel = document.createElement('section');
    panel.id = 'askPanel';
    panel.className = 'ask-panel';
    panel.hidden = true;
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-label', 'Ask Cutover');

    const head = document.createElement('div');
    head.className = 'ask-head';
    const title = document.createElement('strong');
    title.textContent = 'Ask Cutover';
    const close = document.createElement('button');
    close.type = 'button';
    close.className = 'ask-close';
    close.setAttribute('aria-label', 'Close');
    close.textContent = '×';
    head.append(title, close);

    const form = document.createElement('form');
    form.className = 'ask-form';
    const input = document.createElement('input');
    input.type = 'search';
    input.placeholder = 'Type a question, for example: do I need GitHub?';
    input.setAttribute('aria-label', 'Your question');
    input.maxLength = 200;
    const send = document.createElement('button');
    send.type = 'submit';
    send.textContent = 'Ask';
    form.append(input, send);

    const answer = document.createElement('div');
    answer.className = 'ask-answer';
    answer.setAttribute('aria-live', 'polite');

    const suggested = document.createElement('div');
    suggested.className = 'ask-suggested';
    const label = document.createElement('p');
    label.className = 'ask-label';
    label.textContent = 'Common questions';
    suggested.appendChild(label);
    const list = document.createElement('div');
    list.className = 'ask-chips';
    for (const item of QA) {
      const chip = document.createElement('button');
      chip.type = 'button';
      chip.className = 'ask-chip';
      chip.textContent = item.q;
      chip.addEventListener('click', () => show(item));
      list.appendChild(chip);
    }
    suggested.appendChild(list);

    panel.append(head, form, answer, suggested);
    document.body.append(toggle, panel);

    function show(item) {
      answer.textContent = '';
      const q = document.createElement('p');
      q.className = 'ask-q';
      q.textContent = item.q;
      const a = document.createElement('p');
      a.textContent = item.a;
      answer.append(q, a);
    }

    function unmatched(question) {
      answer.textContent = '';
      const p = document.createElement('p');
      p.textContent = `I don't have an answer to "${question}" yet. Choose one of the common questions, or email `;
      contactLink(p);
      p.append('.');
      answer.appendChild(p);
    }

    function open() {
      panel.hidden = false;
      toggle.setAttribute('aria-expanded', 'true');
      input.focus();
    }
    function shut() {
      panel.hidden = true;
      toggle.setAttribute('aria-expanded', 'false');
      toggle.focus();
    }

    toggle.addEventListener('click', () => (panel.hidden ? open() : shut()));
    close.addEventListener('click', shut);
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !panel.hidden) shut(); });
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const question = input.value.trim();
      if (!question) return;
      const item = bestAnswer(question);
      if (item) show(item); else unmatched(question);
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', build);
  else build();
})();
