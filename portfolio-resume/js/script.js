/* DOM 요소 가져오기 */
const darkModeToggle = document.getElementById('darkModeToggle');
const themeIcon = document.getElementById('themeIcon');
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const copyEmailBtn = document.querySelector('.copyEmailBtn');
const toast = document.getElementById('toast');

/* 다크모드 초기화 및 토글 기능 */
function initializeDarkMode() {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        document.documentElement.classList.add('dark');
        themeIcon.textContent = '☀️';
    } else {
        document.documentElement.classList.remove('dark');
        themeIcon.textContent = '🌙';
    }
}

darkModeToggle.addEventListener('click', () => {
    const isDarkMode = document.documentElement.classList.toggle('dark');
    localStorage.setItem('darkMode', isDarkMode);
    themeIcon.textContent = isDarkMode ? '☀️' : '🌙';
});

/* 모바일 메뉴 토글 */
menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

/* 메뉴 링크 클릭 시 모바일 메뉴 닫기 */
document.querySelectorAll('#mobileMenu a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });
});

/* 스크롤 시 네비게이션 활성화 */
document.addEventListener('scroll', () => {
    /* 네비게이션 배경 및 그림자 추가 */
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    /* 현재 스크롤 위치에 따른 active 링크 업데이트 */
    updateActiveNavLink();
});

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            const activeLink = document.querySelector(`.nav-link[href="#${section.id}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
}

/* 부드러운 스크롤 네비게이션 */
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

            /* 모바일 메뉴가 열려있으면 닫기 */
            mobileMenu.classList.add('hidden');
        }
    });
});

/* IntersectionObserver로 스크롤 애니메이션 구현 */
function initializeScrollAnimation() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                /* 한 번 보이면 관찰 중단 */
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.fade-in').forEach(element => {
        observer.observe(element);
    });
}

/* 이메일 복사 기능 */
if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', async () => {
        const email = 'test@example.com';
        try {
            await navigator.clipboard.writeText(email);
            showToast('이메일이 복사되었습니다!');
        } catch (err) {
            console.error('복사 실패:', err);
        }
    });
}

/* 토스트 알림 표시 함수 */
function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    toast.classList.remove('hide');

    /* 3초 후 자동 숨김 */
    setTimeout(() => {
        toast.classList.add('hide');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 300);
    }, 3000);
}

/* 타이핑 효과 함수 */
function typewriterEffect() {
    const el = document.getElementById('typingText');
    const text = '백엔드 개발자';
    let index = 0;

    /* 사용자가 모션 축소를 선호하는 경우 즉시 표시 */
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
        el.textContent = text;
        return;
    }

    /* 페이지 진입 후 0.5초 뒤에 타이핑 시작 */
    setTimeout(() => {
        const interval = setInterval(() => {
            el.textContent = text.slice(0, index + 1);
            index++;
            if (index >= text.length) clearInterval(interval);
        }, 120); /* 글자당 120ms */
    }, 500);
}

/* 페이지 로드 시 초기화 */
document.addEventListener('DOMContentLoaded', () => {
    initializeDarkMode();
    initializeScrollAnimation();
    updateActiveNavLink();
    typewriterEffect();

    /* 초기 로드 시 animate 클래스 리셋 */
    document.querySelectorAll('.fade-in').forEach((el, index) => {
        el.style.animationDelay = `${index * 0.1}s`;
    });
});

/* 창 크기 조정 시 활성 링크 업데이트 */
window.addEventListener('resize', updateActiveNavLink);
