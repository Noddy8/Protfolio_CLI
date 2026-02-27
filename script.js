// Mode Toggle
        const guiMode = document.getElementById('gui-mode');
        const cliMode = document.getElementById('cli-mode');
        const toggleBtns = document.querySelectorAll('.toggle-btn');

        toggleBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const mode = btn.dataset.mode;
                
                // Update active button
                toggleBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Toggle visibility
                if (mode === 'gui') {
                    guiMode.classList.remove('hidden');
                    cliMode.classList.add('hidden');
                } else {
                    guiMode.classList.add('hidden');
                    cliMode.classList.remove('hidden');
                    document.getElementById('input').focus();
                    if (cliMode.innerHTML.includes('hidden')) {
                        initializeCLI();
                    }
                }
            });
        });

        // GUI Mode - Smooth Scroll
        function scrollToSection(id) {
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }

        // CLI Mode
        const cliContent = document.getElementById('cli-content');
        const input = document.getElementById('input');
        let commandHistory = [];
        let historyIndex = -1;
        let cliInitialized = false;

        const cliCommands = {
            help: () => `
<span class="section-title">╔═══════════════════════════════════════════════════════════════╗</span>
<span class="section-title">║                   AVAILABLE COMMANDS                             ║</span>
<span class="section-title">╚═══════════════════════════════════════════════════════════════╝</span>

<span class="item"><span class="highlight">about</span> — Learn about me and my background</span>
<span class="item"><span class="highlight">skills</span> — View my technical skills and expertise</span>
<span class="item"><span class="highlight">projects</span> — Check out my featured projects</span>
<span class="item"><span class="highlight">experience</span> — View my work experience and education</span>
<span class="item"><span class="highlight">contact</span> — Get my contact information</span>
<span class="item"><span class="highlight">clear</span> — Clear the terminal screen</span>
<span class="item"><span class="highlight">help</span> — Display this help message</span>`,

            about: () => `
<span class="section-title">╔═══════════════════════════════════════════════════════════════╗</span>
<span class="section-title">║                    ABOUT ME                                      ║</span>
<span class="section-title">╚═══════════════════════════════════════════════════════════════╝</span>

<div class="ascii-art">
 _____ _____ _____ _______  _____  
|_   _|  __ \\|  __ \\__   __||  _  |
  | | | |  | | |  | |  | |  | | | |
  | | | |  | | |  | |  | |  | | | |
  | | | |__| | |__| |  | |  \\ \\_/ /
  |_| |_____/|_____/   |_|   \\___/ 
</div>

<span class="item"><span class="highlight">Name:</span> Aamir Nodhla</span>
<span class="item"><span class="highlight">Role:</span> Software Developer & Android Specialist</span>
<span class="item"><span class="highlight">Location:</span> Surat, Gujarat, India</span>
<span class="item"><span class="highlight">Status:</span> MCA Student @ Sardar Patel University (2nd Sem)</span>

<span class="section-title">Professional Summary:</span>
<span class="item">Motivated Software Developer with hands-on Android development experience
using Kotlin, Java, MVVM architecture, and Firebase integration.</span>

<span class="item">Recently completed internship at GraspHopp developing gamified
educational applications with Android SDK and Python scripting.</span>

<span class="item">Passionate about building educational technology solutions that make
learning more accessible and engaging for everyone.</span>`,

            skills: () => `
<span class="section-title">╔═══════════════════════════════════════════════════════════════╗</span>
<span class="section-title">║                    TECHNICAL SKILLS                             ║</span>
<span class="section-title">╚═══════════════════════════════════════════════════════════════╝</span>

<span class="skill-category-cli">
<span class="skill-category-name">▸ Mobile Development</span>
<span class="tags">Android | Kotlin | Java | MVVM | Firebase | Room DB</span>
</span>

<span class="skill-category-cli">
<span class="skill-category-name">▸ Programming Languages</span>
<span class="tags">Python | Kotlin | Java | JavaScript | SQL | XML | HTML | CSS</span>
</span>

<span class="skill-category-cli">
<span class="skill-category-name">▸ Backend & Databases</span>
<span class="tags">Firebase Auth | Firestore | Django | REST APIs | SQLite</span>
</span>

<span class="skill-category-cli">
<span class="skill-category-name">▸ Development Tools</span>
<span class="tags">Android Studio | VS Code | Git | GitHub | Gradle</span>
</span>`,

            projects: () => `
<span class="section-title">╔═══════════════════════════════════════════════════════════════╗</span>
<span class="section-title">║                    FEATURED PROJECTS                            ║</span>
<span class="section-title">╚═══════════════════════════════════════════════════════════════╝</span>

<span class="warning">[1] ISLAMIC LITERATURE MOBILE APPLICATION</span>
<span class="item"><span class="highlight">Type:</span> Solo Android Application (In Progress)</span>
<span class="item"><span class="highlight">Tech:</span> Kotlin | Android Studio | Firebase | Room DB</span>

<span class="warning">[2] QUIZBOT - INTERACTIVE QUIZ PLATFORM</span>
<span class="item"><span class="highlight">Type:</span> Full-Stack Web Application (Team Project)</span>
<span class="item"><span class="highlight">Tech:</span> Python | Django | JavaScript | SQLite</span>

<span class="warning">[3] LEARNME - VIDEO LEARNING PLATFORM</span>
<span class="item"><span class="highlight">Type:</span> Android Application (Minor Project)</span>
<span class="item"><span class="highlight">Tech:</span> Kotlin | Android Studio | Firebase</span>`,

            experience: () => `
<span class="section-title">╔═══════════════════════════════════════════════════════════════╗</span>
<span class="section-title">║                   EXPERIENCE & EDUCATION                        ║</span>
<span class="section-title">╚═══════════════════════════════════════════════════════════════╝</span>

<span class="warning">WORK EXPERIENCE</span>
<span class="info">▶ Software Developer Intern (GraspHopp Pvt Ltd)</span>
<span class="item">April 2025 – May 2025 | Developed Android & Python applications</span>

<span class="info">▶ Video Editor (Fusion of Wisdom)</span>
<span class="item">Aug 2024 – Aug 2025 | Video editing and content creation</span>

<span class="divider">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</span>

<span class="warning">EDUCATION</span>
<span class="info">▶ MCA (Master of Computer Applications)</span>
<span class="item">Sardar Patel University | 2025 – 2027</span>

<span class="info">▶ BCA (Bachelor of Computer Applications)</span>
<span class="item">Maharaja Sayajirao University | CGPA: 6.77/10 (Completed)</span>`,

            contact: () => `
<span class="section-title">╔═══════════════════════════════════════════════════════════════╗</span>
<span class="section-title">║                    CONTACT INFORMATION                          ║</span>
<span class="section-title">╚═══════════════════════════════════════════════════════════════╝</span>

<span class="item"><span class="highlight">📧 Email:</span> <span class="info">workspace.aamir@gmail.com</span></span>
<span class="item"><span class="highlight">📱 Phone:</span> <span class="info">+91 76219 01553</span></span>
<span class="item"><span class="highlight">💻 GitHub:</span> <span class="info">github.com/Noddy8</span></span>
<span class="item"><span class="highlight">🔗 LinkedIn:</span> <span class="info">linkedin.com/in/aamir-nodhla</span></span>

<span class="success">Feel free to reach out! I'm always interested in new opportunities.</span>`,

            clear: () => {
                cliContent.innerHTML = '';
                return null;
            },

            default: (cmd) => `<span class="error">Command not found: ${cmd}</span>
<span class="error">Type 'help' to see available commands</span>`
        };

        function addCLIOutput(text) {
            if (text === null) return;
            const div = document.createElement('div');
            div.className = 'output';
            div.innerHTML = text;
            cliContent.appendChild(div);
            
            // Smooth scroll to bottom with a small delay to ensure DOM update
            setTimeout(() => {
                cliMode.scrollTop = cliMode.scrollHeight;
                div.scrollIntoView({ behavior: 'smooth', block: 'end' });
            }, 0);
        }

        function executeCLICommand(cmd) {
            cmd = cmd.trim().toLowerCase();
            if (!cmd) return;

            addCLIOutput(`<span class="prompt">→ $</span> <span class="success">${cmd}</span>`);
            commandHistory.push(cmd);
            historyIndex = commandHistory.length;

            const result = cliCommands[cmd] ? cliCommands[cmd]() : cliCommands.default(cmd);
            addCLIOutput(result);
        }

        function initializeCLI() {
            if (cliInitialized) return;
            cliInitialized = true;

            addCLIOutput(`
<span class="ascii-art">
╔═══════════════════════════════════════════════════════════════╗
║          WELCOME TO AAMIR NODHLA'S PORTFOLIO SHELL            ║
║                     v1.0.0 [STABLE]                           ║
╚═══════════════════════════════════════════════════════════════╝
</span>

<span class="success">$ System initialized successfully...</span>
<span class="info">→ Type 'help' to see available commands</span>
<span class="divider">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</span>`);

            input.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    executeCLICommand(input.value);
                    input.value = '';
                } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    if (historyIndex > 0) {
                        historyIndex--;
                        input.value = commandHistory[historyIndex];
                    }
                } else if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    if (historyIndex < commandHistory.length - 1) {
                        historyIndex++;
                        input.value = commandHistory[historyIndex];
                    } else {
                        historyIndex = commandHistory.length;
                        input.value = '';
                    }
                }
            });
        }

        // Initialize CLI on page load
        initializeCLI();