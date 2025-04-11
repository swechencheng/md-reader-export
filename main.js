(function () {
    // One-time initialization function
    function initialize() {
        // Only create the button if it doesn't exist
        if (document.querySelector('#md-export-btn')) {
            return;
        }

        // Create export button
        const btn = document.createElement('button');
        btn.id = 'md-export-btn';
        btn.innerHTML = 'Export HTML';
        btn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 9999;
        background: #4CAF50;
        color: white;
        border: none;
        border-radius: 4px;
        padding: 10px 15px;
        cursor: pointer;
        font-family: -apple-system, BlinkMacSystemFont, sans-serif;
        font-size: 14px;
        box-shadow: 0 2px 5px rgba(0,0,0,0.3);
      `;

        // Single click handler - won't be duplicated
        btn.addEventListener('click', exportMarkdown);

        // Add to page
        document.body.appendChild(btn);
    }

    // Export function
    function exportMarkdown() {
        console.log('Starting export...');

        // Get content
        const content = document.querySelector('.mdr-content');
        if (!content) {
            alert('Could not find markdown content to export');
            return;
        }

        // Create HTML document
        const doc = document.implementation.createHTMLDocument(document.title || 'Exported Markdown');

        // Add meta tags
        const meta = document.createElement('meta');
        meta.setAttribute('charset', 'UTF-8');
        doc.head.appendChild(meta);

        const viewport = document.createElement('meta');
        viewport.setAttribute('name', 'viewport');
        viewport.setAttribute('content', 'width=device-width, initial-scale=1.0');
        doc.head.appendChild(viewport);

        const colorScheme = document.createElement('meta');
        colorScheme.setAttribute('name', 'color-scheme');
        colorScheme.setAttribute('content', 'light dark');
        doc.head.appendChild(colorScheme);

        // Set data-theme attribute on HTML element
        doc.documentElement.setAttribute('data-theme', 'light');

        // Add the complete CSS from all.css
        const style = document.createElement('style');
        style.textContent = `
      :root {
        --color-white: #fff;
        --color-primary: #607cd2;
        --color-primary--hover: #4c68bb;
        --color-success: #2fc178;
        --color-warning: #ff6767;
        --color-mark: #fff07e;
        --color-text-primary: #2d3d50;
        --color-text-secondary: #586069;
        --color-text-gray: #909090;
        --color-border: #d0d7de;
        --color-bg: #fff;
        --color-side: var(--color-text-secondary);
        --color-side-bg: #f9fafb;
        --color-side-border: #eaebee;
        --color-side-shadow: 0 0 5px rgba(35, 36, 49, 0.02), 0 0 20px rgba(35, 36, 49, 0.2);
        --color-img-bg: #f8f9fa;
        --color-block-bg: var(--hljs-base);
        --color-code-bg: #f3f6ff;
        --color-thead-bg: #f6f8fa;
        --color-disabled: #d2d2d2;
        --color-button: rgba(88, 96, 105, 0.4);
        --color-button-bg: none;
        --color-button-hover: rgba(88, 96, 105, 0.6);
        --color-button-bg-hover: rgba(241, 241, 241, 0.8);
        --color-button-active: rgba(88, 96, 105, 0.6);
        --color-button-bg-active: rgba(241, 241, 241, 0.5);
        --shadow-button-text: 0.5px 0.5px 1px rgba(0, 0, 0, 0.12);
        --color-button_copy: var(--color-button);
        --color-button_copy-bg: var(--color-button-bg);
        --color-button_copy-hover: var(--color-button-hover);
        --color-button_copy-bg-hover: rgba(241, 241, 241, 0.8);
        --color-button_copy-active: var(--color-button-active);
        --color-button_copy-bg-active: rgba(241, 241, 241, 0.6);
        --size-scrollbar: 6.5px;
        --color-scrollbar-thumb: rgba(0, 0, 0, 0.25);
        --color-scrollbar-thumb-hover: rgba(0, 0, 0, 0.35);
        --color-modal-bg: rgba(255, 255, 255, 0.6);
        --opacity-img: 1;
        --hljs-base: hsl(220, 29%, 97%);
        --hljs-mono-1: hsl(220, 8%, 20%);
        --hljs-mono-2: hsl(220, 6%, 44%);
        --hljs-mono-3: hsl(220, 4%, 54%);
        --hljs-hue-1: hsl(198, 99%, 37%);
        --hljs-hue-2: hsl(221, 87%, 60%);
        --hljs-hue-3: hsl(301, 63%, 40%);
        --hljs-hue-4: hsl(119, 34%, 47%);
        --hljs-hue-5: hsl(5, 74%, 59%);
        --hljs-hue-5-2: hsl(344, 84%, 43%);
        --hljs-hue-6: hsl(35, 99%, 36%);
        --hljs-hue-6-2: hsl(35, 99%, 40%);
        
        /* Export specific vars */
        --primary-color: var(--color-primary);
        --primary-color-hover: var(--color-primary--hover);
        --primary-color-alpha-10: rgba(96, 124, 210, 0.1);
        --success-color: var(--color-success);
        --success-color-alpha-10: rgba(47, 193, 120, 0.1);
        --warning-color: var(--color-warning);
        --warning-color-alpha-10: rgba(255, 103, 103, 0.1);
        --danger-color: var(--color-warning);
        --danger-color-alpha-10: rgba(255, 103, 103, 0.1);
        --important-color: #a16cfd;
        --important-color-alpha-10: rgba(161, 108, 253, 0.1);
        --highlight-color: var(--color-mark);
        --text-muted: var(--color-text-gray);
        --text-disabled: var(--color-disabled);
        --border-color: var(--color-border);
        --bg-stripe: var(--color-thead-bg);
        --bg-code: var(--color-code-bg);
        --bg-block: var(--color-block-bg);
        --bg-image: var(--color-img-bg);
        --opacity-image: var(--opacity-img);
      }
      :root pre.hljs-pre {
        border-radius: 6px;
        background: var(--hljs-base);
      }
      :root .hljs {
        display: block;
        overflow-x: auto;
        color: var(--hljs-mono-1);
        background: var(--hljs-base);
      }
      :root .hljs-comment,
      :root .hljs-quote {
        color: var(--hljs-mono-3);
        font-style: italic;
      }
      :root .hljs-doctag,
      :root .hljs-keyword,
      :root .hljs-formula {
        color: var(--hljs-hue-3);
      }
      :root .hljs-section,
      :root .hljs-name,
      :root .hljs-selector-tag,
      :root .hljs-deletion,
      :root .hljs-subst {
        color: var(--hljs-hue-5);
      }
      :root .hljs-literal {
        color: var(--hljs-hue-1);
      }
      :root .hljs-string,
      :root .hljs-regexp,
      :root .hljs-addition,
      :root .hljs-attribute,
      :root .hljs-meta-string {
        color: var(--hljs-hue-4);
      }
      :root .hljs-built_in,
      :root .hljs-class .hljs-title {
        color: var(--hljs-hue-6-2);
      }
      :root .hljs-attr,
      :root .hljs-variable,
      :root .hljs-template-variable,
      :root .hljs-type,
      :root .hljs-selector-class,
      :root .hljs-selector-attr,
      :root .hljs-selector-pseudo,
      :root .hljs-number {
        color: var(--hljs-hue-6);
      }
      :root .hljs-symbol,
      :root .hljs-bullet,
      :root .hljs-link,
      :root .hljs-meta,
      :root .hljs-selector-id,
      :root .hljs-title {
        color: var(--hljs-hue-2);
      }
      :root .hljs-emphasis {
        font-style: italic;
      }
      :root .hljs-strong {
        font-weight: bold;
      }
      :root .hljs-link {
        text-decoration: underline;
      }
      @media (prefers-color-scheme: dark) {
        :root {
          --color-white: #fff;
          --color-primary: #6785e0;
          --color-primary--hover: #7191f3;
          --color-success: #269f63;
          --color-warning: #ee6262;
          --color-mark: #fce79b;
          --color-text-primary: #b5b5b8;
          --color-text-secondary: #bbbbbb;
          --color-text-gray: #909090;
          --color-border: #30363d;
          --color-bg: #131415;
          --color-side: var(--color-text-primary);
          --color-side-bg: #030405;
          --color-side-border: #131415;
          --color-side-shadow: 0 0 5px rgba(0, 0, 0, 0.1), 0 0 20px rgba(0, 0, 0, 0.5);
          --color-img-bg: #5a5a5a;
          --color-block-bg: var(--hljs-base);
          --color-code-bg: #1d253d;
          --color-thead-bg: #222425;
          --color-disabled: #989898;
          --color-button: rgba(181, 181, 184, 0.4);
          --color-button-bg: none;
          --color-button-hover: rgba(181, 181, 184, 0.6);
          --color-button-bg-hover: rgba(58, 60, 62, 0.5);
          --color-button-active: rgba(181, 181, 184, 0.6);
          --color-button-bg-active: rgba(58, 60, 62, 0.3);
          --shadow-button-text: 0.5px 0.5px 1px rgba(0, 0, 0, 0.12);
          --color-button_copy: rgba(181, 181, 184, 0.7);
          --color-button_copy-bg: var(--color-button-bg);
          --color-button_copy-hover: rgba(181, 181, 184, 0.9);
          --color-button_copy-bg-hover: rgba(58, 60, 62, 0.8);
          --color-button_copy-active: rgba(181, 181, 184, 0.9);
          --color-button_copy-bg-active: rgba(58, 60, 62, 0.6);
          --size-scrollbar: 6.5px;
          --color-scrollbar-thumb: rgba(255, 255, 255, 0.25);
          --color-scrollbar-thumb-hover: rgba(255, 255, 255, 0.35);
          --color-modal-bg: rgba(0, 0, 0, 0.4);
          --opacity-img: 0.8;
          --hljs-base: hsl(220, 18%, 14%);
          --hljs-mono-1: hsl(220, 17%, 79%);
          --hljs-mono-2: hsl(220, 9%, 55%);
          --hljs-mono-3: hsl(220, 8%, 45%);
          --hljs-hue-1: hsl(187, 60%, 61%);
          --hljs-hue-2: hsl(212, 100%, 74%);
          --hljs-hue-3: hsl(261, 76%, 76%);
          --hljs-hue-4: hsl(135, 46%, 66%);
          --hljs-hue-5: hsl(354, 92%, 72%);
          --hljs-hue-5-2: hsl(354, 71%, 66%);
          --hljs-hue-6: hsl(25, 100%, 72%);
          --hljs-hue-6-2: hsl(25, 73%, 65%);
        }
        :root pre.hljs-pre {
          border-radius: 6px;
          background: var(--hljs-base);
        }
        :root .hljs {
          display: block;
          overflow-x: auto;
          color: var(--hljs-mono-1);
          background: var(--hljs-base);
        }
        :root .hljs-comment,
        :root .hljs-quote {
          color: var(--hljs-mono-3);
          font-style: italic;
        }
        :root .hljs-doctag,
        :root .hljs-keyword,
        :root .hljs-formula {
          color: var(--hljs-hue-3);
        }
        :root .hljs-section,
        :root .hljs-name,
        :root .hljs-selector-tag,
        :root .hljs-deletion,
        :root .hljs-subst {
          color: var(--hljs-hue-5);
        }
        :root .hljs-literal {
          color: var(--hljs-hue-1);
        }
        :root .hljs-string,
        :root .hljs-regexp,
        :root .hljs-addition,
        :root .hljs-attribute,
        :root .hljs-meta-string {
          color: var(--hljs-hue-4);
        }
        :root .hljs-built_in,
        :root .hljs-class .hljs-title {
          color: var(--hljs-hue-6-2);
        }
        :root .hljs-attr,
        :root .hljs-variable,
        :root .hljs-template-variable,
        :root .hljs-type,
        :root .hljs-selector-class,
        :root .hljs-selector-attr,
        :root .hljs-selector-pseudo,
        :root .hljs-number {
          color: var(--hljs-hue-6);
        }
        :root .hljs-symbol,
        :root .hljs-bullet,
        :root .hljs-link,
        :root .hljs-meta,
        :root .hljs-selector-id,
        :root .hljs-title {
          color: var(--hljs-hue-2);
        }
        :root .hljs-emphasis {
          font-style: italic;
        }
        :root .hljs-strong {
          font-weight: bold;
        }
        :root .hljs-link {
          text-decoration: underline;
        }
      }
      
      /* Core MD-Reader Styles */
      body {
        margin: 0;
        padding: 0;
        background: var(--color-bg);
        font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        counter-reset: katexEqnNo mmlEqnNo;
        color: var(--color-text-primary);
      }
      
      .markdown-content {
        padding: 30px 70px 40px;
        margin: 0 auto;
        max-width: 900px;
        font-size: 16px;
        line-height: 1.5;
        font-weight: normal;
        text-rendering: optimizeLegibility;
        letter-spacing: 0.2px;
        word-break: break-word;
        overflow-x: hidden;
      }
      
      /* Typography */
      .markdown-content h1,
      .markdown-content h2,
      .markdown-content h3,
      .markdown-content h4,
      .markdown-content h5,
      .markdown-content h6 {
        line-height: 1.5;
        padding-bottom: 5px;
        margin-top: 35px;
        margin-bottom: 10px;
      }
      
      .markdown-content h1 {
        font-size: 32px;
        margin: 1.3rem 0;
        margin-bottom: 5px;
      }
      
      .markdown-content h2 {
        font-size: 24px;
        padding-bottom: 8px;
        border-bottom: 1px solid var(--border-color);
      }
      
      .markdown-content h3 {
        font-size: 20px;
        padding-bottom: 0;
      }
      
      .markdown-content h4 {
        font-size: 16px;
      }
      
      .markdown-content h5 {
        font-size: 14px;
      }
      
      .markdown-content h6 {
        font-size: 13px;
      }
      
      /* Links */
      .markdown-content a {
        text-decoration: underline;
        cursor: pointer;
        color: var(--primary-color);
      }
      
      .markdown-content a:active,
      .markdown-content a:hover {
        color: var(--primary-color-hover);
      }
      
      /* Lists */
      .markdown-content ol,
      .markdown-content ul {
        padding-left: 28px;
      }
      
      .markdown-content ol li,
      .markdown-content ul li {
        margin-bottom: 0.4em;
        list-style: inherit;
      }
      
      .markdown-content ol li.task-list-item,
      .markdown-content ul li.task-list-item {
        list-style: none;
      }
      
      .markdown-content ol ol,
      .markdown-content ol ul,
      .markdown-content ul ol,
      .markdown-content ul ul {
        margin-top: 0.27rem;
      }
      
      /* Paragraphs */
      .markdown-content p {
        margin-top: 16px;
        margin-bottom: 16px;
      }
      
      /* Blockquotes */
      .markdown-content blockquote {
        padding: 1px 18px;
        margin: 22px 0;
        border-left: 4px solid var(--border-color);
      }
      
      .markdown-content blockquote:after {
        display: block;
        content: '';
      }
      
      .markdown-content blockquote > :first-child {
        margin-top: 0;
      }
      
      .markdown-content blockquote > :last-child {
        margin-bottom: 0;
      }
      
      .markdown-content blockquote > p {
        margin: 10px 0;
      }
      
      /* Special blockquotes */
      .markdown-content blockquote.info,
      .markdown-content blockquote.tip,
      .markdown-content blockquote.success,
      .markdown-content blockquote.warning,
      .markdown-content blockquote.danger {
        position: relative;
        padding-left: 42px;
        border-left: none;
        border-radius: 6px;
        background: var(--bg-block);
      }
      
      .markdown-content blockquote.tip {
        background: var(--primary-color-alpha-10);
      }
      
      .markdown-content blockquote.success {
        background: var(--success-color-alpha-10);
      }
      
      .markdown-content blockquote.warning {
        background: var(--warning-color-alpha-10);
      }
      
      .markdown-content blockquote.danger {
        background: var(--danger-color-alpha-10);
      }
      
      .markdown-content blockquote.info:before,
      .markdown-content blockquote.tip:before,
      .markdown-content blockquote.success:before,
      .markdown-content blockquote.warning:before,
      .markdown-content blockquote.danger:before {
        position: absolute;
        top: 50%;
        left: 16px;
        transform: translateY(-50%);
        text-align: center;
        width: 17px;
        height: 17px;
        line-height: 17px;
        font-size: 13px;
        border-radius: 50%;
        color: var(--color-white);
      }
      
      .markdown-content blockquote.info:before {
        content: 'i';
        font-family: 'KaTeX_Main', serif;
        background: var(--text-muted);
      }
      
      .markdown-content blockquote.tip:before {
        content: '?';
        background: var(--primary-color);
      }
      
      .markdown-content blockquote.success:before {
        content: '✓';
        font-size: 11px;
        background: var(--success-color);
      }
      
      .markdown-content blockquote.warning:before {
        content: '!';
        background: var(--warning-color);
      }
      
      .markdown-content blockquote.danger:before {
        content: '✕';
        font-size: 10px;
        background: var(--danger-color);
      }
      
      /* Code blocks */
      .markdown-content code,
      .markdown-content pre {
        font-family: Menlo, Monaco, Consolas, Courier New, monospace;
      }
      
      .markdown-content code {
        overflow-x: auto;
        font-size: 0.88rem;
        word-break: break-word;
        padding: 0.065em 0.4em;
        border-radius: 6px;
        background: var(--bg-code);
        color: var(--primary-color);
      }
      
      .markdown-content pre {
        overflow: auto;
        position: relative;
        line-height: 1.6;
      }
      
      .markdown-content pre > code {
        display: block;
        overflow-x: auto;
        font-size: 0.88rem;
        padding: 0.67rem 1rem;
        margin: 0;
        word-break: normal;
        -webkit-overflow-scrolling: touch;
        background: var(--hljs-base);
        color: var(--hljs-mono-1);
      }
      
      .markdown-content pre > code.hljs[lang] {
        min-height: 2.2em;
      }
      
      .markdown-content pre > code.hljs[lang]:before {
        content: attr(lang);
        position: absolute;
        right: 10px;
        top: 10px;
        line-height: 1;
        color: var(--text-muted);
      }
      
      /* Images */
      .markdown-content img {
        max-width: 100%;
        height: auto;
        opacity: var(--opacity-image);
      }
      
      /* Tables */
      .markdown-content table {
        display: block;
        width: auto;
        max-width: 100%;
        border-collapse: collapse;
        margin: 1rem 0;
        overflow-x: auto;
      }
      
      .markdown-content thead {
        background: var(--bg-stripe);
        text-align: left;
      }
      
      .markdown-content tr {
        border-top: 1px solid var(--border-color);
      }
      
      .markdown-content tr:nth-child(2n) {
        background: var(--bg-stripe);
      }
      
      .markdown-content th,
      .markdown-content td {
        border: 1px solid var(--border-color);
        padding: 0.6em 1em;
      }
      
      /* Alert boxes */
      .markdown-content .markdown-alert {
        padding: 16px 22px;
        border-radius: 12px;
        margin-bottom: 16px;
        color: inherit;
      }
      
      .markdown-content .markdown-alert > :first-child {
        margin-top: 0;
      }
      
      .markdown-content .markdown-alert > :last-child {
        margin-bottom: 0;
      }
      
      .markdown-content .markdown-alert .markdown-alert-title {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        font-weight: bold;
      }
      
      .markdown-content .markdown-alert .markdown-alert-title + p {
        margin-top: 0;
      }
      
      .markdown-content .markdown-alert > p {
        margin-top: 10px;
        margin-bottom: 10px;
      }
      
      .markdown-content .markdown-alert .markdown-alert-title:before {
        content: '';
        width: 16px;
        height: 16px;
        margin-right: 8px;
        background-position: left;
        background-repeat: no-repeat;
      }
      
      .markdown-content .markdown-alert.markdown-alert-note {
        background-color: var(--primary-color-alpha-10);
      }
      
      .markdown-content .markdown-alert.markdown-alert-note .markdown-alert-title {
        color: var(--primary-color);
      }
      
      .markdown-content .markdown-alert.markdown-alert-important {
        background-color: var(--important-color-alpha-10);
      }
      
      .markdown-content .markdown-alert.markdown-alert-important .markdown-alert-title {
        color: var(--important-color);
      }
      
      .markdown-content .markdown-alert.markdown-alert-tip {
        background-color: var(--success-color-alpha-10);
      }
      
      .markdown-content .markdown-alert.markdown-alert-tip .markdown-alert-title {
        color: var(--success-color);
      }
      
      .markdown-content .markdown-alert.markdown-alert-warning {
        background-color: var(--warning-color-alpha-10);
      }
      
      .markdown-content .markdown-alert.markdown-alert-warning .markdown-alert-title {
        color: var(--warning-color);
      }
      
      .markdown-content .markdown-alert.markdown-alert-caution {
        background-color: var(--danger-color-alpha-10);
      }
      
      .markdown-content .markdown-alert.markdown-alert-caution .markdown-alert-title {
        color: var(--danger-color);
      }
      
      /* Responsive styles */
      @media (max-width: 720px) {
        .markdown-content {
          padding: 20px 20px 30px;
        }
        
        .markdown-content h1 {
          font-size: 24px;
        }
        
        .markdown-content h2 {
          font-size: 20px;
        }
        
        .markdown-content h3 {
          font-size: 18px;
        }
      }
      
      /* Dark mode toggle button */
      .theme-toggle {
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 1000;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        background: rgba(200, 200, 200, 0.2);
        color: var(--color-text-primary);
        border: none;
        border-radius: 50%;
        cursor: pointer;
        box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        transition: background 0.3s;
      }
      
      .theme-toggle:hover {
        background: rgba(200, 200, 200, 0.3);
      }
      
      .theme-toggle svg {
        width: 24px;
        height: 24px;
        fill: currentColor;
      }
      
      [data-theme="light"] .theme-toggle .sun-icon {
        display: none;
      }
      
      [data-theme="light"] .theme-toggle .moon-icon {
        display: block;
      }
      
      [data-theme="dark"] .theme-toggle .sun-icon {
        display: block;
      }
      
      [data-theme="dark"] .theme-toggle .moon-icon {
        display: none;
      }
      
      /* Back-to-top button */
      .back-to-top {
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 999;
        display: none;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: var(--primary-color);
        color: white;
        border: none;
        cursor: pointer;
        box-shadow: 0 2px 5px rgba(0,0,0,0.3);
        font-size: 20px;
      }
      `;

        doc.head.appendChild(style);

        // Create body structure
        doc.body.className = '';

        // Add theme toggle button
        const themeToggle = document.createElement('button');
        themeToggle.className = 'theme-toggle';
        themeToggle.setAttribute('aria-label', 'Toggle theme');
        themeToggle.innerHTML = `
        <svg class="sun-icon" viewBox="0 0 24 24">
          <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0 .39-.39.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0 .39-.39.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41.39.39 1.03.39 1.41 0l1.06-1.06zM7.05 18.36c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41.39.39 1.03.39 1.41 0l1.06-1.06z"></path>
        </svg>
        <svg class="moon-icon" viewBox="0 0 24 24">
          <path d="M9.5,2c-1.82,0-3.53,0.5-5,1.35c2.99,1.73,5,4.95,5,8.65s-2.01,6.92-5,8.65C5.97,21.5,7.68,22,9.5,22c5.52,0,10-4.48,10-10S15.02,2,9.5,2z"></path>
        </svg>
      `;
        doc.body.appendChild(themeToggle);

        // Clone and clean content
        const contentClone = content.cloneNode(true);
        contentClone.className = 'markdown-content';

        // Remove any copy buttons, etc.
        contentClone.querySelectorAll('.mdr-block-copy-btn, .mdr__anchor').forEach(el => {
            el.remove();
        });

        // Add content to the document
        doc.body.appendChild(contentClone);

        // Add back to top button
        const backToTop = document.createElement('button');
        backToTop.className = 'back-to-top';
        backToTop.setAttribute('aria-label', 'Back to top');
        backToTop.innerHTML = '↑';
        doc.body.appendChild(backToTop);

        // Add scripts for functionality
        const script = document.createElement('script');
        script.textContent = `
        document.addEventListener('DOMContentLoaded', function() {
          // Theme toggle
          const themeToggle = document.querySelector('.theme-toggle');
          if (themeToggle) {
            themeToggle.addEventListener('click', function() {
              const html = document.documentElement;
              const currentTheme = html.getAttribute('data-theme') || 'light';
              const newTheme = currentTheme === 'light' ? 'dark' : 'light';
              
              html.setAttribute('data-theme', newTheme);
              localStorage.setItem('md-reader-theme', newTheme);
            });
          }
          
          // Initialize theme based on preference
          const storedTheme = localStorage.getItem('md-reader-theme');
          if (storedTheme) {
            document.documentElement.setAttribute('data-theme', storedTheme);
          } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.setAttribute('data-theme', 'dark');
          }
          
          // Back to top button
          const backToTop = document.querySelector('.back-to-top');
          if (backToTop) {
            window.addEventListener('scroll', function() {
              if (window.scrollY > 300) {
                backToTop.style.display = 'flex';
              } else {
                backToTop.style.display = 'none';
              }
            });
            
            backToTop.addEventListener('click', function() {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            });
          }
          
          // Add heading anchors
          document.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(heading => {
            if (!heading.id) {
              const id = heading.textContent
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/^-|-$/g, '');
              heading.id = id;
            }
            
            const link = document.createElement('a');
            link.href = '#' + heading.id;
            link.className = 'heading-anchor';
            link.innerHTML = ' #';
            link.style.opacity = '0';
            link.style.textDecoration = 'none';
            link.style.marginLeft = '0.2em';
            link.style.transition = 'opacity 0.2s';
            
            heading.appendChild(link);
            
            heading.addEventListener('mouseenter', () => {
              link.style.opacity = '0.5';
            });
            
            heading.addEventListener('mouseleave', () => {
              link.style.opacity = '0';
            });
          });
        });
      `;
        doc.body.appendChild(script);

        // Handle syntax highlighting if present
        if (contentClone.querySelectorAll('pre code').length > 0) {
            const highlightCSS = document.createElement('link');
            highlightCSS.rel = 'stylesheet';
            highlightCSS.href = 'https://cdn.jsdelivr.net/npm/highlight.js@11/styles/github.min.css';
            doc.head.appendChild(highlightCSS);

            const highlightScript = document.createElement('script');
            highlightScript.src = 'https://cdn.jsdelivr.net/npm/highlight.js@11/lib/highlight.min.js';
            highlightScript.defer = true;
            doc.head.appendChild(highlightScript);

            const initHighlightScript = document.createElement('script');
            initHighlightScript.textContent = `
          document.addEventListener('DOMContentLoaded', () => {
            document.querySelectorAll('pre code').forEach((el) => {
              hljs.highlightElement(el);
            });
          });
        `;
            doc.body.appendChild(initHighlightScript);
        }

        // Handle mermaid diagrams if present
        if (contentClone.querySelector('.mermaid')) {
            const mermaidScript = document.createElement('script');
            mermaidScript.src = 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js';
            mermaidScript.defer = true;
            doc.head.appendChild(mermaidScript);

            const initMermaidScript = document.createElement('script');
            initMermaidScript.textContent = `
          document.addEventListener('DOMContentLoaded', () => {
            mermaid.initialize({ startOnLoad: true });
          });
        `;
            doc.body.appendChild(initMermaidScript);
        }

        // Generate HTML string
        const htmlString = '<!DOCTYPE html>\n' + new XMLSerializer().serializeToString(doc);

        // Download the HTML file
        const fileName = (document.title || 'exported-markdown').toLowerCase().replace(/[^a-z0-9]/g, '-') + '.html';
        downloadFile(htmlString, fileName, 'text/html');
    }

    // Helper function to download a file
    function downloadFile(content, fileName, contentType) {
        const blob = new Blob([content], { type: contentType });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        a.style.display = 'none';

        // Use a different approach to avoid duplicate downloads
        document.body.appendChild(a);
        a.onclick = function () {
            // Clean up after a slight delay to ensure the download starts
            setTimeout(() => {
                URL.revokeObjectURL(url);
                document.body.removeChild(a);
            }, 150);
        };

        a.click();
    }

    // Initialize only once
    if (document.readyState === 'complete') {
        initialize();
    } else {
        window.addEventListener('load', initialize, { once: true });
    }
})();
