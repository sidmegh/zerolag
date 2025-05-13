document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Mobile Navigation Toggle ---
  const navToggle = document.querySelector('.nav-toggle');
  const mainNavMenu = document.getElementById('main-nav-menu');

  if (navToggle && mainNavMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = mainNavMenu.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', isOpen.toString());
      // Optional: change burger icon to a close icon when open
      // navToggle.classList.toggle('is-active'); // If you have CSS for an active state burger
    });
  }

  // --- 2. Code Block Copy Buttons ---
  const codeBlocks = document.querySelectorAll('pre'); // Target all <pre> elements

  if (navigator.clipboard) { // Check if Clipboard API is available
    codeBlocks.forEach(block => {
      // Only add button if there's a <code> child, common for highlighted code
      const codeElement = block.querySelector('code');
      if (!codeElement) return;

      const copyButton = document.createElement('button');
      copyButton.className = 'copy-code-button';
      copyButton.textContent = 'Copy'; // Or use an icon
      // copyButton.innerHTML = '<svg>...</svg> Copy'; // Example with SVG icon

      block.appendChild(copyButton);

      copyButton.addEventListener('click', async () => {
        const codeToCopy = codeElement.innerText;
        try {
          await navigator.clipboard.writeText(codeToCopy);
          copyButton.textContent = 'Copied!';
          setTimeout(() => {
            copyButton.textContent = 'Copy';
          }, 2000); // Reset button text after 2 seconds
        } catch (err) {
          console.error('Failed to copy code: ', err);
          copyButton.textContent = 'Error';
           setTimeout(() => {
            copyButton.textContent = 'Copy';
          }, 2000);
        }
      });
    });
  } else {
    console.warn('Clipboard API not available. Copy buttons will not function.');
  }


  // --- 3. Active Table of Contents Link Highlighting on Scroll ---
  const tocSidebar = document.querySelector('.sidebar');
  if (tocSidebar) {
    const tocLinks = Array.from(tocSidebar.querySelectorAll('ul li a'));
    const headings = tocLinks.map(link => {
      const id = link.getAttribute('href');
      try {
        // Make sure it's a valid selector (e.g. starts with # and has content)
        if (id && id.startsWith('#') && id.length > 1) {
          return document.querySelector(id);
        }
      } catch (e) {
        // Catch invalid selectors that querySelector might throw
        console.warn(`Invalid selector for TOC link: ${id}`, e);
        return null;
      }
      return null;
    }).filter(Boolean); // Filter out nulls if any heading wasn't found

    if (tocLinks.length > 0 && headings.length > 0) {
      const headerOffset = document.querySelector('.site-header')?.offsetHeight || 60; // Get sticky header height dynamically
      const scrollPaddingOffset = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || headerOffset + 20;


      const observerOptions = {
        rootMargin: `-${scrollPaddingOffset}px 0px -${window.innerHeight - scrollPaddingOffset - 100}px 0px`, // Target area is a 100px band at the scroll-padding-top position
        threshold: 0 // Trigger as soon as the element enters/leaves the rootMargin band
      };

      const activateTocLink = (id) => {
        tocLinks.forEach(link => {
          link.classList.remove('active-toc-link');
          if (link.getAttribute('href') === id) {
            link.classList.add('active-toc-link');
            // Optional: Scroll the TOC link into view if TOC is scrollable
            // link.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
        });
      };
      
      // Fallback for initial load or if IntersectionObserver is too complex to manage for all cases immediately
      // Find the first visible heading on load
      let firstVisibleHeadingSet = false;
      for (const heading of headings) {
          const rect = heading.getBoundingClientRect();
          if (rect.top >= scrollPaddingOffset && rect.bottom <= window.innerHeight) {
              activateTocLink(heading.getAttribute('id') ? `#${heading.getAttribute('id')}`: null);
              firstVisibleHeadingSet = true;
              break;
          }
      }
      if (!firstVisibleHeadingSet && headings.length > 0 && headings[0].getAttribute('id')) {
         // If no heading is fully visible, activate the first one if it's near the top
         const firstHeadingRect = headings[0].getBoundingClientRect();
         if (firstHeadingRect.top < scrollPaddingOffset + 100) { // Check if it's near or above the target area
            activateTocLink(`#${headings[0].getAttribute('id')}`);
         }
      }


      const headingObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          const id = entry.target.getAttribute('id');
          if (entry.isIntersecting && id) {
            // When multiple headings are in the observation area, this will activate the one that just intersected.
            // This means if you scroll down, the new one entering the top band gets active.
            // If you scroll up, the one re-entering the top band gets active.
            activateTocLink(`#${id}`);
          }
        });
      }, observerOptions);

      headings.forEach(heading => headingObserver.observe(heading));
    }
  }

  // --- Add other JavaScript functionalities below ---

}); // End DOMContentLoaded