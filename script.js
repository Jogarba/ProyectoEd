// ============================================
// DATOS DEL CURSO
// ============================================
const courseData = {
    modules: [
        {
            id: 1,
            title: 'Módulo 1: Introducción',
            description: 'Conceptos básicos de ecuaciones diferenciales ordinarias y su clasificación.',
            topics: ['Definiciones básicas', 'Clasificación de ED', 'Soluciones generales'],
            progress: 100,
            completed: true,
            locked: false,
            lessons: [
                {
                    id: 1,
                    title: '¿Qué es una ecuación diferencial?',
                    content: 'Una ecuación diferencial es una ecuación que relaciona una función con sus derivadas...',
                    duration: 15
                },
                {
                    id: 2,
                    title: 'Clasificación de ecuaciones diferenciales',
                    content: 'Las ecuaciones diferenciales se clasifican según su orden, linealidad...',
                    duration: 20
                },
                {
                    id: 3,
                    title: 'Soluciones generales y particulares',
                    content: 'La solución general de una ED contiene constantes arbitrarias...',
                    duration: 25
                }
            ]
        },
        {
            id: 2,
            title: 'Módulo 2: Primer Orden',
            description: 'Métodos de solución para ecuaciones diferenciales de primer orden.',
            topics: ['Variables separables', 'Ecuaciones lineales', 'Ecuaciones exactas'],
            progress: 75,
            completed: false,
            locked: false,
            lessons: [
                {
                    id: 1,
                    title: 'Ecuaciones de variables separables',
                    content: 'Método para resolver ecuaciones de la forma dy/dx = f(x)g(y)...',
                    duration: 30
                },
                {
                    id: 2,
                    title: 'Ecuaciones lineales de primer orden',
                    content: 'Forma estándar: dy/dx + P(x)y = Q(x). Uso del factor integrante...',
                    duration: 35
                },
                {
                    id: 3,
                    title: 'Ecuaciones exactas',
                    content: 'Condición de exactitud y método de solución...',
                    duration: 30
                }
            ]
        },
        {
            id: 3,
            title: 'Módulo 3: Orden Superior',
            description: 'Resolución de ecuaciones diferenciales de orden superior.',
            topics: ['Homogéneas', 'No homogéneas', 'Coeficientes constantes'],
            progress: 50,
            completed: false,
            locked: false,
            lessons: [
                {
                    id: 1,
                    title: 'Ecuaciones lineales homogéneas',
                    content: 'Solución mediante ecuación característica...',
                    duration: 40
                },
                {
                    id: 2,
                    title: 'Ecuaciones no homogéneas',
                    content: 'Método de coeficientes indeterminados y variación de parámetros...',
                    duration: 45
                }
            ]
        },
        {
            id: 4,
            title: 'Módulo 4: Transformada de Laplace',
            description: 'Uso de la transformada de Laplace para resolver ED.',
            topics: ['Definición y propiedades', 'Transformada inversa', 'Aplicaciones'],
            progress: 25,
            completed: false,
            locked: false,
            lessons: [
                {
                    id: 1,
                    title: 'Definición de la transformada de Laplace',
                    content: 'La transformada de Laplace es una técnica integral...',
                    duration: 35
                },
                {
                    id: 2,
                    title: 'Propiedades fundamentales',
                    content: 'Linealidad, traslación, derivadas...',
                    duration: 40
                }
            ]
        },
        {
            id: 5,
            title: 'Módulo 5: Series',
            description: 'Soluciones en series de potencias y series de Frobenius.',
            topics: ['Series de potencias', 'Puntos ordinarios', 'Puntos singulares'],
            progress: 0,
            completed: false,
            locked: true,
            lessons: []
        },
        {
            id: 6,
            title: 'Módulo 6: Sistemas',
            description: 'Sistemas de ecuaciones diferenciales lineales.',
            topics: ['Método matricial', 'Valores propios', 'Plano fase'],
            progress: 0,
            completed: false,
            locked: true,
            lessons: []
        }
    ],
    stats: {
        totalHours: 12.5,
        exercisesSolved: 47
    }
};

// ============================================
// INICIALIZACIÓN
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    initializeCourse();
    loadUserData();
    renderModules();
    updateProgressBars();
    updateStats();
    setupEventListeners();
    animateCards();
    checkDarkMode();
});

// ============================================
// FUNCIONES DE INICIALIZACIÓN
// ============================================
function initializeCourse() {
    console.log('Curso de Ecuaciones Diferenciales iniciado');
    console.log(`Total de módulos: ${courseData.modules.length}`);
    console.log(`Progreso general: ${calculateTotalProgress()}%`);
}

function loadUserData() {
    const userName = localStorage.getItem('userName') || 'Estudiante';
    document.getElementById('userName').textContent = userName;
}

// ============================================
// RENDERIZADO DE MÓDULOS
// ============================================
function renderModules() {
    const container = document.getElementById('modulesContainer');
    container.innerHTML = '';

    courseData.modules.forEach((module, index) => {
        const moduleCard = createModuleCard(module, index);
        container.innerHTML += moduleCard;
    });

    // Agregar eventos a los botones después de renderizar
    setTimeout(() => {
        document.querySelectorAll('.module-card').forEach((card, index) => {
            card.addEventListener('click', function() {
                showModuleDetails(index + 1);
            });
        });
    }, 100);
}

function createModuleCard(module, index) {
    const badgeClass = module.completed ? '' : module.locked ? 'locked' : 'in-progress';
    const badgeText = module.completed ? '✓ Completado' : module.locked ? '🔒 Bloqueado' : '⏳ En progreso';
    
    return `
        <div class="col-md-4 mb-4">
            <div class="card module-card">
                <span class="module-badge ${badgeClass}">${badgeText}</span>
                <div class="card-body">
                    <h5 class="card-title">${module.title}</h5>
                    <p class="card-text">${module.description}</p>
                    <ul class="list-group list-group-flush mb-3">
                        ${module.topics.map(topic => `<li class="list-group-item">${topic}</li>`).join('')}
                    </ul>
                    <div class="mb-3">
                        <small class="text-muted">Progreso: ${module.progress}%</small>
                        <div class="progress mt-2">
                            <div class="progress-bar" role="progressbar" style="width: ${module.progress}%" 
                                 aria-valuenow="${module.progress}" aria-valuemin="0" aria-valuemax="100">
                            </div>
                        </div>
                    </div>
                    <button class="btn btn-primary w-100" ${module.locked ? 'disabled' : ''}>
                        ${module.locked ? 'Bloqueado' : module.progress === 0 ? 'Comenzar' : 'Continuar'}
                    </button>
                </div>
            </div>
        </div>
    `;
}

// ============================================
// MODAL DE MÓDULO
// ============================================
function showModuleDetails(moduleId) {
    const module = courseData.modules.find(m => m.id === moduleId);
    if (!module || module.locked) {
        showNotification('Este módulo está bloqueado. Completa los módulos anteriores primero.', 'warning');
        return;
    }

    const lessonsHTML = module.lessons.length > 0 ? 
        module.lessons.map((lesson, index) => `
            <div class="list-group-item d-flex justify-content-between align-items-center">
                <div>
                    <strong>${index + 1}. ${lesson.title}</strong>
                    <br>
                    <small class="text-muted">⏱️ ${lesson.duration} minutos</small>
                </div>
                <button class="btn btn-sm btn-outline-primary" onclick="startLesson(${moduleId}, ${lesson.id})">
                    Iniciar
                </button>
            </div>
        `).join('') : '<p class="text-muted">No hay lecciones disponibles aún.</p>';

    const modalHTML = `
        <div class="modal fade" id="moduleModal" tabindex="-1">
            <div class="modal-dialog modal-lg modal-dialog-scrollable">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">${module.title}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <p class="lead">${module.description}</p>
                        
                        <h6 class="mt-4 mb-3">📚 Temas del módulo:</h6>
                        <ul class="list-group list-group-flush mb-4">
                            ${module.topics.map(topic => `<li class="list-group-item">${topic}</li>`).join('')}
                        </ul>

                        <h6 class="mb-3">📖 Lecciones:</h6>
                        <div class="list-group mb-4">
                            ${lessonsHTML}
                        </div>

                        <div class="mt-4">
                            <div class="d-flex justify-content-between align-items-center mb-2">
                                <h6 class="mb-0">Progreso del módulo:</h6>
                                <span class="badge bg-primary">${module.progress}%</span>
                            </div>
                            <div class="progress" style="height: 20px;">
                                <div class="progress-bar progress-bar-striped" role="progressbar" 
                                     style="width: ${module.progress}%" 
                                     aria-valuenow="${module.progress}" aria-valuemin="0" aria-valuemax="100">
                                    ${module.progress}%
                                </div>
                            </div>
                        </div>

                        ${module.completed ? 
                            '<div class="alert alert-success mt-4 mb-0"><strong>✓</strong> ¡Has completado este módulo!</div>' : 
                            '<div class="alert alert-info mt-4 mb-0"><strong>⏳</strong> Módulo en progreso</div>'
                        }
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                        <button type="button" class="btn btn-primary" onclick="continueModule(${moduleId})">
                            ${module.progress === 0 ? 'Comenzar Módulo' : 'Continuar Estudiando'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;

    removeExistingModal();
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    const modal = new bootstrap.Modal(document.getElementById('moduleModal'));
    modal.show();
}

function removeExistingModal() {
    const oldModal = document.getElementById('moduleModal');
    if (oldModal) oldModal.remove();
}

// ============================================
// LECCIONES
// ============================================
function startLesson(moduleId, lessonId) {
    const module = courseData.modules.find(m => m.id === moduleId);
    const lesson = module.lessons.find(l => l.id === lessonId);

    const lessonHTML = `
        <div class="modal fade" id="lessonModal" tabindex="-1">
            <div class="modal-dialog modal-xl modal-dialog-scrollable">
                <div class="modal-content">
                    <div class="modal-header">
                        <div>
                            <h5 class="modal-title">${lesson.title}</h5>
                            <small class="text-muted">${module.title} - Lección ${lessonId}</small>
                        </div>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <div class="lesson-content">
                            <div class="alert alert-info">
                                <strong>⏱️ Duración estimada:</strong> ${lesson.duration} minutos
                            </div>
                            
                            <h4>Contenido de la Lección</h4>
                            <p>${lesson.content}</p>

                            <h4>Ejemplos Prácticos</h4>
                            <div class="alert alert-warning">
                                <strong>Ejemplo 1:</strong> Resolver la ecuación diferencial dy/dx = 2x
                            </div>
                            <pre>Solución:
∫dy = ∫2x dx
y = x² + C</pre>

                            <h4>Ejercicios de Práctica</h4>
                            <div class="list-group">
                                <div class="list-group-item">
                                    <strong>Ejercicio 1:</strong> Resolver dy/dx = 3x²
                                    <button class="btn btn-sm btn-outline-primary float-end" onclick="showSolution(1)">
                                        Ver Solución
                                    </button>
                                </div>
                                <div class="list-group-item">
                                    <strong>Ejercicio 2:</strong> Resolver dy/dx = sin(x)
                                    <button class="btn btn-sm btn-outline-primary float-end" onclick="showSolution(2)">
                                        Ver Solución
                                    </button>
                                </div>
                            </div>

                            <div class="lesson-navigation">
                                <button class="btn btn-outline-secondary" onclick="previousLesson(${moduleId}, ${lessonId})">
                                    ← Lección Anterior
                                </button>
                                <button class="btn btn-success" onclick="completeLesson(${moduleId}, ${lessonId})">
                                    ✓ Marcar como Completada
                                </button>
                                <button class="btn btn-outline-secondary" onclick="nextLesson(${moduleId}, ${lessonId})">
                                    Siguiente Lección →
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Cerrar modal de módulo
    const moduleModal = bootstrap.Modal.getInstance(document.getElementById('moduleModal'));
    if (moduleModal) moduleModal.hide();

    removeExistingModal('lessonModal');
    document.body.insertAdjacentHTML('beforeend', lessonHTML);
    const modal = new bootstrap.Modal(document.getElementById('lessonModal'));
    modal.show();
}

function removeExistingModal(id = 'moduleModal') {
    const oldModal = document.getElementById(id);
    if (oldModal) oldModal.remove();
}

function completeLesson(moduleId, lessonId) {
    showNotification('¡Lección completada! Has ganado 10 puntos de experiencia.', 'success');
    
    // Actualizar progreso
    const module = courseData.modules.find(m => m.id === moduleId);
    if (module.progress < 100) {
        module.progress = Math.min(100, module.progress + 15);
        updateProgressBars();
        updateStats();
    }
}

function nextLesson(moduleId, lessonId) {
    const module = courseData.modules.find(m => m.id === moduleId);
    const nextLesson = module.lessons.find(l => l.id === lessonId + 1);
    
    if (nextLesson) {
        startLesson(moduleId, lessonId + 1);
    } else {
        showNotification('Has completado todas las lecciones de este módulo.', 'success');
    }
}

function previousLesson(moduleId, lessonId) {
    if (lessonId > 1) {
        startLesson(moduleId, lessonId - 1);
    } else {
        showNotification('Esta es la primera lección del módulo.', 'info');
    }
}

function showSolution(exerciseId) {
    const solutions = {
        1: 'y = x³ + C',
        2: 'y = -cos(x) + C'
    };
    alert(`Solución del Ejercicio ${exerciseId}:\n\n${solutions[exerciseId]}`);
}

// ============================================
// CONTINUAR MÓDULO
// ============================================
function continueModule(moduleId) {
    const module = courseData.modules.find(m => m.id === moduleId);
    
    if (module.lessons.length > 0) {
        // Encontrar la primera lección no completada
        const firstLesson = module.lessons[0];
        startLesson(moduleId, firstLesson.id);
    } else {
        showNotification('Este módulo no tiene lecciones disponibles aún.', 'info');
    }
}

// ============================================
// PROGRESO Y ESTADÍSTICAS
// ============================================
function updateProgressBars() {
    const container = document.getElementById('progressBarsContainer');
    if (!container) return;

    container.innerHTML = courseData.modules.map(module => `
        <div class="mb-3">
            <div class="d-flex justify-content-between align-items-center mb-2">
                <p class="mb-0">${module.title}</p>
                <span class="badge bg-primary">${module.progress}%</span>
            </div>
            <div class="progress">
                <div class="progress-bar" role="progressbar" 
                     style="width: ${module.progress}%" 
                     aria-valuenow="${module.progress}" 
                     aria-valuemin="0" 
                     aria-valuemax="100">
                </div>
            </div>
        </div>
    `).join('');

    // Actualizar barra de progreso total en el header
    const totalProgress = calculateTotalProgress();
    const totalBar = document.getElementById('totalProgressBar');
    const totalText = document.getElementById('totalProgressText');
    if (totalBar && totalText) {
        totalBar.style.width = totalProgress + '%';
        totalText.textContent = totalProgress + '%';
    }
}

function updateStats() {
    const completedCount = courseData.modules.filter(m => m.completed).length;
    document.getElementById('completedModules').textContent = completedCount;
    document.getElementById('totalHours').textContent = courseData.stats.totalHours;
    document.getElementById('exercisesSolved').textContent = courseData.stats.exercisesSolved;
}

function calculateTotalProgress() {
    const total = courseData.modules.reduce((sum, module) => sum + module.progress, 0);
    return Math.round(total / courseData.modules.length);
}

// ============================================
// RECURSOS
// ============================================
function openResource(resourceType) {
    const messages = {
        ejercicios: 'Abriendo biblioteca de ejercicios prácticos...',
        videos: 'Cargando videos tutoriales...',
        simuladores: 'Iniciando simuladores interactivos...',
        bibliografia: 'Mostrando bibliografía recomendada...'
    };

    showNotification(messages[resourceType] || 'Recurso no disponible', 'info');
    
    // Simular carga de recurso
    setTimeout(() => {
        showNotification('Recurso cargado correctamente', 'success');
    }, 1500);
}

// ============================================
// QUIZ
// ============================================
function checkAnswer(optionId, isCorrect) {
    const buttons = document.querySelectorAll('.quiz-option');
    const resultDiv = document.getElementById('quizResult');

    buttons.forEach(btn => btn.disabled = true);
    
    buttons[optionId - 1].classList.add(isCorrect ? 'correct' : 'incorrect');

    if (isCorrect) {
        resultDiv.innerHTML = '<div class="alert alert-success">✓ ¡Correcto! La ecuación es de segundo orden.</div>';
        courseData.stats.exercisesSolved++;
        updateStats();
    } else {
        resultDiv.innerHTML = '<div class="alert alert-danger">✗ Incorrecto. La ecuación es de segundo orden porque la derivada más alta es y\'\'.</div>';
    }

    setTimeout(() => {
        buttons.forEach(btn => {
            btn.disabled = false;
            btn.classList.remove('correct', 'incorrect');
        });
        resultDiv.innerHTML = '';
    }, 3000);
}

// ============================================
// FORMULARIO DE CONTACTO
// ============================================
function setupEventListeners() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }

    const startButton = document.getElementById('startButton');
    if (startButton) {
        startButton.addEventListener('click', startCourse);
    }

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', handleSmoothScroll);
    });

    // Navbar scroll effect
    window.addEventListener('scroll', handleNavbarScroll);

    // Header parallax
    window.addEventListener('scroll', handleParallax);
}

function handleContactSubmit(e) {
    e.preventDefault();
    
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const asunto = document.getElementById('asunto').value;
    const mensaje = document.getElementById('mensaje').value;

    if (!nombre || !email || !asunto || !mensaje) {
        showNotification('Por favor completa todos los campos', 'warning');
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('Por favor ingresa un email válido', 'warning');
        return;
    }

    showNotification('¡Mensaje enviado correctamente! Te contactaremos pronto.', 'success');
    e.target.reset();
}

function startCourse() {
    const firstIncompleteModule = courseData.modules.find(m => !m.completed && !m.locked);
    if (firstIncompleteModule) {
        showModuleDetails(firstIncompleteModule.id);
    } else {
        showNotification('¡Felicidades! Has completado todos los módulos disponibles.', 'success');
    }
}

// ============================================
// NAVEGACIÓN SUAVE
// ============================================
function handleSmoothScroll(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        
        const navbarCollapse = document.querySelector('.navbar-collapse');
        if (navbarCollapse && navbarCollapse.classList.contains('show')) {
            navbarCollapse.classList.remove('show');
        }
    }
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// ============================================
// EFECTOS VISUALES
// ============================================
function handleNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }
}

function handleParallax() {
    const header = document.querySelector('header');
    const scrolled = window.pageYOffset;
    if (header && scrolled < 600) {
        header.style.transform = `translateY(${scrolled * 0.5}px)`;
        header.style.opacity = 1 - (scrolled / 600);
    }
}

function animateCards() {
    const cards = document.querySelectorAll('.card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('show');
                }, index * 100);
            }
        });
    }, { threshold: 0.1 });

    cards.forEach(card => observer.observe(card));
}

// ============================================
// SISTEMA DE NOTIFICACIONES
// ============================================
function showNotification(message, type = 'info') {
    const alertClass = {
        success: 'alert-success',
        warning: 'alert-warning',
        danger: 'alert-danger',
        info: 'alert-info'
    }[type];

    const alertHTML = `
        <div class="alert ${alertClass} alert-dismissible fade show notification" role="alert">
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', alertHTML);
    
    setTimeout(() => {
        const alert = document.querySelector('.notification');
        if (alert) {
            alert.classList.remove('show');
            setTimeout(() => alert.remove(), 150);
        }
    }, 5000);
}

// ============================================
// MODO OSCURO
// ============================================
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDark);
    
    const button = event.target;
    button.textContent = isDark ? '☀️' : '🌙';
    
    showNotification(`Modo ${isDark ? 'oscuro' : 'claro'} activado`, 'info');
}

function checkDarkMode() {
    const isDark = localStorage.getItem('darkMode') === 'true';
    if (isDark) {
        document.body.classList.add('dark-mode');
        const button = document.querySelector('.btn-outline-light');
        if (button) button.textContent = '☀️';
    }
}

// ============================================
// GUARDADO LOCAL
// ============================================
function saveProgress() {
    localStorage.setItem('courseProgress', JSON.stringify(courseData));
    showNotification('Progreso guardado correctamente', 'success');
}

function loadProgress() {
    const saved = localStorage.getItem('courseProgress');
    if (saved) {
        const data = JSON.parse(saved);
        courseData.modules = data.modules;
        courseData.stats = data.stats;
        updateProgressBars();
        updateStats();
        renderModules();
    }
}

// Guardar progreso automáticamente cada 5 minutos
setInterval(saveProgress, 300000);

// ============================================
// CONSOLA DE INFORMACIÓN
// ============================================
console.log('%c🎓 Curso de Ecuaciones Diferenciales', 'color: #2c3e50; font-size: 24px; font-weight: bold;');
console.log('%cSistema de aprendizaje interactivo cargado correctamente', 'color: #27ae60; font-size: 14px;');
console.log(`%cProgreso total del curso: ${calculateTotalProgress()}%`, 'color: #3498db; font-size: 12px;');
console.log(`%cMódulos completados: ${courseData.modules.filter(m => m.completed).length}/${courseData.modules.length}`, 'color: #f39c12; font-size: 12px;');