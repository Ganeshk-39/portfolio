/**
 * K Ganesh - Portfolio Main Script
 * Handles theme switching, typewriter, filter tabs, modal dialogues,
 * navigation scrollspy, and copy-to-clipboard actions.
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initTypewriter();
  initHeaderScroll();
  initMobileDrawer();
  initSkillsFilter();
  initProjectModals();
  initCopyButtons();
  initContactForm();
  initCurrentYear();
});

/* --------------------------------------------------------------------------
   1. Theme Toggle (Dark / Light)
   -------------------------------------------------------------------------- */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const htmlRoot = document.documentElement;

  // Retrieve saved preference or default to dark
  const savedTheme = localStorage.getItem('kg-theme') || 'dark';
  htmlRoot.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlRoot.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      htmlRoot.setAttribute('data-theme', newTheme);
      localStorage.setItem('kg-theme', newTheme);
      updateThemeIcon(newTheme);
      showToast(`Switched to ${newTheme} mode`, 'success');
    });
  }
}

function updateThemeIcon(theme) {
  const themeIcon = document.querySelector('#theme-toggle i');
  if (!themeIcon) return;
  if (theme === 'light') {
    themeIcon.className = 'fa-solid fa-sun';
  } else {
    themeIcon.className = 'fa-solid fa-moon';
  }
}

/* --------------------------------------------------------------------------
   2. Typewriter Effect
   -------------------------------------------------------------------------- */
function initTypewriter() {
  const targetElement = document.getElementById('typewriter');
  if (!targetElement) return;

  const words = [
    'Java Full Stack Developer',
    'Spring Boot & Hibernate Engineer',
    'React & Frontend Enthusiast',
    'Python & Machine Learning Intern',
    'AWS Cloud Practitioner'
  ];

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    const currentWord = words[wordIndex];
    if (isDeleting) {
      targetElement.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      targetElement.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 110;
    }

    if (!isDeleting && charIndex === currentWord.length) {
      typingSpeed = 2000; // Pause at end of word
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typingSpeed = 400;
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* --------------------------------------------------------------------------
   3. Header Sticky & Active Navigation Scrollspy
   -------------------------------------------------------------------------- */
function initHeaderScroll() {
  const header = document.getElementById('header');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    // Header shadow toggle
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Scrollspy for active link
    let currentSectionId = '';
    const scrollPosition = window.scrollY + 180;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   4. Mobile Navigation Drawer
   -------------------------------------------------------------------------- */
function initMobileDrawer() {
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const drawerBackdrop = document.getElementById('drawer-backdrop');
  const drawerCloseBtn = document.getElementById('drawer-close');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  function openDrawer() {
    mobileDrawer.classList.add('open');
    drawerBackdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    mobileDrawer.classList.remove('open');
    drawerBackdrop.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (hamburgerBtn) hamburgerBtn.addEventListener('click', openDrawer);
  if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeDrawer);
  if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeDrawer);

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });
}

/* --------------------------------------------------------------------------
   5. Skills Category Filter
   -------------------------------------------------------------------------- */
function initSkillsFilter() {
  const filterTabs = document.querySelectorAll('.filter-tab');
  const skillCards = document.querySelectorAll('.skill-card');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Update active tab
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const selectedCategory = tab.getAttribute('data-category');

      skillCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (selectedCategory === 'all' || cardCategory === selectedCategory) {
          card.classList.remove('hide');
        } else {
          card.classList.add('hide');
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   6. Project Modals Deep Dive
   -------------------------------------------------------------------------- */
const projectDetailsData = {
  'ocd-project': {
    title: 'A Machine Learning-Based Predictive Analytics Framework for Early Diagnosis of OCD',
    category: 'Major Project • Healthcare AI & Full Stack',
    stack: ['Python', 'Flask', 'CNN', 'Deep Learning', 'Decision Trees', 'Random Forest', 'SQL', 'HTML5/CSS3'],
    content: `
      <h4>Overview & Medical Impact</h4>
      <p>Obsessive-Compulsive Disorder (OCD) often goes undiagnosed for years due to stigma and heterogeneous symptomatology. This project introduces an early diagnosis intelligence pipeline engineered to classify OCD subtypes with clinical predictive rigor.</p>
      
      <h4>Technical Architecture</h4>
      <ul>
        <li><strong>Data Ingestion & Cleaning:</strong> Preprocessed multi-dimensional psychological assessments and clinical symptom surveys, normalizing continuous features and encoding categorical attributes.</li>
        <li><strong>Multi-Model Benchmarking:</strong> Trained and comparatively evaluated ensemble models (Random Forests, Decision Trees) against 1D/2D Convolutional Neural Network (CNN) architectures to identify feature importances and nonlinear risk factors.</li>
        <li><strong>Web Portal & Inference Service:</strong> Developed a Flask-driven RESTful backend facilitating automated inference. Clinicians can upload patient feature sets and obtain probabilistic subclass forecasts instantly.</li>
        <li><strong>Secure Admin & Data Integrity:</strong> Implemented SQL persistence for patient evaluation histories and protected medical diagnostic access behind authenticated admin roles.</li>
      </ul>

      <h4>Key Results</h4>
      <p>Achieved high classification accuracy with low false-negative rates on critical diagnostic subclasses, demonstrating the feasibility of machine learning in psychiatric screening assistance.</p>
    `
  },
  'java-project': {
    title: 'Enterprise Web Application with Spring Boot, Hibernate & React',
    category: 'Enterprise Java Architecture',
    stack: ['Core Java', 'Spring Boot', 'Hibernate JPA', 'React.js', 'MySQL', 'JWT Authentication', 'Maven'],
    content: `
      <h4>System Architecture</h4>
      <p>Engineered an end-to-end full stack web application leveraging Java's robust multi-tier enterprise design principles. Adheres strictly to the Controller-Service-Repository structural separation.</p>
      
      <h4>Core Engineering Highlights</h4>
      <ul>
        <li><strong>Spring Boot Micro-services:</strong> Created RESTful controllers handling transactional workloads with custom exception interceptors and JSON response wrappers.</li>
        <li><strong>Hibernate JPA Persistence:</strong> Designed relational database schemas mapped via JPA entity annotations, optimizing queries through indexed joins and first/second-level caching to eliminate the N+1 query problem.</li>
        <li><strong>Dynamic React Frontend:</strong> Built reusable React components consuming backend REST endpoints with real-time state feedback and form validations.</li>
        <li><strong>Enterprise Security:</strong> Integrated Spring Security with stateless JWT bearer tokens for role-based route protection.</li>
      </ul>
    `
  },
  'cloud-project': {
    title: 'Cloud-Native Intelligent Query Portal on AWS',
    category: 'AWS Virtual Internship Project',
    stack: ['Amazon Web Services (AWS)', 'Python', 'Flask', 'AWS S3', 'AWS EC2', 'GenAI APIs'],
    content: `
      <h4>Background & Objectives</h4>
      <p>Designed during the AWS & AICTE EduSkills Virtual Internship. The initiative addressed scalable cloud hosting and AI-augmented question-answering systems deployed directly to cloud infrastructure.</p>

      <h4>Cloud Features</h4>
      <ul>
        <li><strong>AWS Cloud Infrastructure:</strong> Configured AWS EC2 instances, security group ingress/egress rules, and Amazon S3 buckets for object storage.</li>
        <li><strong>Python Microservice API:</strong> Packaged lightweight Flask endpoints communicating with generative AI inference layers.</li>
        <li><strong>Cloud Monitoring:</strong> Leveraged automated monitoring and logging to maintain high service availability and latency monitoring.</li>
      </ul>
    `
  }
};

function initProjectModals() {
  const modal = document.getElementById('project-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalBody = document.getElementById('modal-body');

  window.openProjectModal = function(projectId) {
    if (!modal) return;
    const data = projectDetailsData[projectId];
    if (!data) return;

    modal.classList.remove('cert-mode');
    modalTitle.textContent = data.title;
    
    let stackPills = data.stack.map(s => `<span class="tag">${s}</span>`).join(' ');

    modalBody.innerHTML = `
      <div style="margin-bottom: 1.25rem;">
        <span class="category-pill">${data.category}</span>
      </div>
      <div style="margin-bottom: 1.25rem;">
        ${data.content}
      </div>
      <div style="margin-top: 1.5rem; border-top: 1px solid var(--border-subtle); padding-top: 1rem;">
        <h5 style="margin-bottom: 0.6rem; font-size: 0.85rem; text-transform: uppercase; color: var(--text-muted);">Technologies Used</h5>
        <div class="tech-tags">${stackPills}</div>
      </div>
    `;

    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  window.openCertModal = function(imageSrc, certTitle) {
    if (!modal) return;
    modalTitle.textContent = certTitle;
    modal.classList.add('cert-mode');
    
    modalBody.innerHTML = `
      <div style="text-align: center;">
        <img src="${imageSrc}" alt="${certTitle}" style="width: 100%; max-height: 72vh; object-fit: contain; border-radius: var(--radius-md); box-shadow: var(--shadow-md); border: 1px solid var(--border-subtle); margin-bottom: 1.25rem; background: #0b0f19;" />
        <div style="display: flex; justify-content: center; flex-wrap: wrap; gap: 1rem;">
          <a href="${imageSrc}" download="${certTitle.replace(/[^a-zA-Z0-9]/g, '_')}.png" class="btn btn-primary btn-sm">
            <i class="fa-solid fa-download"></i> Download Certificate
          </a>
          <a href="${imageSrc}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm">
            <i class="fa-solid fa-arrow-up-right-from-square"></i> Open High-Res
          </a>
        </div>
      </div>
    `;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  window.closeAppModal = function() {
    if (!modal) return;
    modal.classList.remove('open');
    modal.classList.remove('cert-mode');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  // Delegated document click listener - intercepts any click on .open-cert-modal or .open-project-modal
  document.addEventListener('click', (e) => {
    const certTrigger = e.target.closest('.open-cert-modal');
    if (certTrigger) {
      e.preventDefault();
      const certSrc = certTrigger.getAttribute('data-cert');
      const certTitle = certTrigger.getAttribute('data-title') || 'Certificate Verification';
      if (certSrc) {
        window.openCertModal(certSrc, certTitle);
      }
      return;
    }

    const projectTrigger = e.target.closest('.open-project-modal');
    if (projectTrigger) {
      e.preventDefault();
      const projectId = projectTrigger.getAttribute('data-project');
      if (projectId) {
        window.openProjectModal(projectId);
      }
      return;
    }

    if (e.target.closest('#modal-close-btn') || e.target.closest('#modal-close-action') || e.target.id === 'modal-backdrop') {
      window.closeAppModal();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('open')) {
      window.closeAppModal();
    }
  });
}

/* --------------------------------------------------------------------------
   7. Copy to Clipboard Utility with Toasts
   -------------------------------------------------------------------------- */
function initCopyButtons() {
  const copyButtons = document.querySelectorAll('.copy-btn');

  copyButtons.forEach(btn => {
    btn.addEventListener('click', async () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (!textToCopy) return;

      try {
        await navigator.clipboard.writeText(textToCopy);
        const originalHtml = btn.innerHTML;
        btn.innerHTML = '<i class="fa-solid fa-check text-success"></i>';
        showToast(`Copied to clipboard: ${textToCopy}`, 'success');

        setTimeout(() => {
          btn.innerHTML = originalHtml;
        }, 2200);
      } catch (err) {
        // Fallback for older browsers
        const tempInput = document.createElement('input');
        tempInput.value = textToCopy;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        showToast(`Copied to clipboard: ${textToCopy}`, 'success');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   8. Contact Form Handling
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const subjectInput = document.getElementById('contact-subject');
    const messageInput = document.getElementById('contact-message');

    let isValid = true;

    // Reset error messages
    document.querySelectorAll('.field-error').forEach(el => el.textContent = '');

    if (!nameInput.value.trim()) {
      document.getElementById('name-error').textContent = 'Please enter your name.';
      isValid = false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value.trim() || !emailPattern.test(emailInput.value.trim())) {
      document.getElementById('email-error').textContent = 'Please enter a valid email address.';
      isValid = false;
    }

    if (!subjectInput.value.trim()) {
      document.getElementById('subject-error').textContent = 'Please provide a subject.';
      isValid = false;
    }

    if (!messageInput.value.trim() || messageInput.value.trim().length < 10) {
      document.getElementById('message-error').textContent = 'Message must be at least 10 characters long.';
      isValid = false;
    }

    if (isValid) {
      const submitBtn = document.getElementById('contact-submit-btn');
      const originalContent = submitBtn.innerHTML;

      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Preparing message...';
      submitBtn.disabled = true;

      // Construct mailto link
      const mailtoUrl = `mailto:reddysganigani@gmail.com?subject=${encodeURIComponent(subjectInput.value.trim())}&body=${encodeURIComponent(
        `Name: ${nameInput.value.trim()}\nEmail: ${emailInput.value.trim()}\n\nMessage:\n${messageInput.value.trim()}`
      )}`;

      setTimeout(() => {
        window.location.href = mailtoUrl;
        showToast('Opening your email client to send message!', 'success');
        form.reset();
        submitBtn.innerHTML = originalContent;
        submitBtn.disabled = false;
      }, 700);
    }
  });
}

/* --------------------------------------------------------------------------
   9. Toast Notifications
   -------------------------------------------------------------------------- */
function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <i class="fa-solid ${type === 'success' ? 'fa-circle-check text-success' : 'fa-circle-exclamation'}"></i>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

/* --------------------------------------------------------------------------
   10. Current Year Utility
   -------------------------------------------------------------------------- */
function initCurrentYear() {
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}
