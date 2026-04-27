/* =========================================
   CV Interativo - Rafael Barrios Garrido
   script.js
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {

    // -------------------------
    // Mobile Menu Toggle
    // -------------------------
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // -------------------------
    // Smooth Scrolling for Navigation
    // -------------------------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
            // Close mobile menu after clicking a link
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        });
    });

    // -------------------------
    // Timeline Interaction (expand/collapse)
    // -------------------------
    document.querySelectorAll('.timeline-item-trigger').forEach(trigger => {
        trigger.addEventListener('click', () => {
            const content = trigger.querySelector('.timeline-item-content');
            if (content) {
                content.classList.toggle('expanded');
            }
        });
    });

    // -------------------------
    // Skills Radar Chart (Chart.js)
    // -------------------------
    const canvas = document.getElementById('skillsChart');
    if (!canvas) return; // Sai silenciosamente se o elemento não existir

    const ctx = canvas.getContext('2d');

    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: [
                'Dados e IA',
                'Cloud & Infraestrutura',
                'Segurança',
                'Banco de Dados',
                'Automação',
                'Análise de Incidentes'
            ],
            datasets: [{
                label: 'Nível de Proficiência',
                data: [90, 85, 95, 90, 80, 90],
                backgroundColor: 'rgba(56, 189, 248, 0.2)',
                borderColor: 'rgba(56, 189, 248, 1)',
                pointBackgroundColor: 'rgba(56, 189, 248, 1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(56, 189, 248, 1)',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            let label = context.dataset.label || '';
                            if (label) label += ': ';
                            if (context.parsed.r !== null) {
                                label += context.parsed.r + '%';
                            }
                            return label;
                        },
                        title: function (context) {
                            const label = context[0].label;
                            const words = label.split(' ');
                            let lines = [];
                            let currentLine = '';
                            words.forEach(word => {
                                if ((currentLine + word).length > 16 && currentLine.length > 0) {
                                    lines.push(currentLine.trim());
                                    currentLine = word + ' ';
                                } else {
                                    currentLine += word + ' ';
                                }
                            });
                            lines.push(currentLine.trim());
                            return lines;
                        }
                    }
                }
            },
            scales: {
                r: {
                    angleLines: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    },
                    pointLabels: {
                        font: { size: 14 },
                        color: '#333'
                    },
                    suggestedMin: 0,
                    suggestedMax: 100,
                    ticks: {
                        display: false
                    }
                }
            }
        }
    });

});