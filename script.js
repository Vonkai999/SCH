function scrollToSection(id) {
    const el = document.getElementById(id);
    if (!el) return;

    el.scrollIntoView({
        behavior: "smooth"
    });

    // update the URL hash without jumping
    if (history.pushState) {
        history.pushState(null, '', '#' + id);
    } else {
        // fallback
        location.hash = id;
    }
}

const questions = document.querySelectorAll(".faq-question");

questions.forEach(btn => {
    btn.addEventListener("click", () => {
        const answer = btn.nextElementSibling;
        answer.style.display =
            answer.style.display === "block" ? "none" : "block";
    });
});

// New: attach smooth scroll behavior to all internal links and optional buttons
document.addEventListener('DOMContentLoaded', () => {
    // handle <a href="#section"> links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            // If href is exactly "#" (no target), allow default
            const href = this.getAttribute('href');
            if (!href || href === '#') return;

            const targetId = href.slice(1);
            if (!targetId) return;

            e.preventDefault();
            scrollToSection(targetId);
        });
    });

    // handle buttons that want to scroll using data-scroll="id"
    document.querySelectorAll('button[data-scroll]').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-scroll');
            if (id) scrollToSection(id);
        });
    });
});

// --- Back to Top Button Logic ---
(function() {
    const btn = document.getElementById('backToTopBtn');
    if (!btn) return;
    let hideTimeout = null;
    let lastScrollY = window.scrollY;
    let ticking = false;

    function showBtn() {
        btn.classList.add('show');
    }
    function hideBtn() {
        btn.classList.remove('show');
    }
    function handleScroll() {
        if (window.scrollY > window.innerHeight / 2) {
            showBtn();
            if (hideTimeout) clearTimeout(hideTimeout);
            hideTimeout = setTimeout(() => {
                hideBtn();
            }, 2000);
        } else {
            hideBtn();
        }
    }
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        } else {
            // still schedule hide
            if (window.scrollY > window.innerHeight / 2) {
                if (hideTimeout) clearTimeout(hideTimeout);
                hideTimeout = setTimeout(() => {
                    hideBtn();
                }, 2000);
            }
        }
    });
    // Show on any scroll after hidden
    window.addEventListener('scroll', () => {
        if (window.scrollY > window.innerHeight / 2) {
            showBtn();
        }
    }, { passive: true });
    // Hide on click and scroll to top
    btn.addEventListener('click', () => {
        hideBtn();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    // Hide if at top after scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY <= 10) {
            hideBtn();
        }
    });
})();
#scrollTopBtn {
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 55px;
  height: 55px;
  border-radius: 50%;
  border: none;
  cursor: pointer;

  background-color: #5b0f1a;
  color: black;
  font-size: 24px;
  font-weight: bold;

  display: flex;
  align-items: center;
  justify-content: center;

  opacity: 0;
  visibility: hidden;
  transition: opacity 0.4s ease, transform 0.3s ease;
}

#scrollTopBtn.show {
  opacity: 1;
  visibility: visible;
}

#scrollTopBtn:hover {
  transform: scale(1.1);
}
