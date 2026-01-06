document.addEventListener('DOMContentLoaded', () => {

    
    if (history.scrollRestoration) {
        history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    
    const skills = [
        { name: 'Flutter', icon: '<img src="assets/img/flutter.svg" class="flutter-icon" alt="Flutter">' },
        { name: 'Python', icon: '<i class="fab fa-python"></i>' },
        { name: 'AI/ML', icon: '<i class="fas fa-brain"></i>' },
        { name: 'Java', icon: '<i class="fab fa-java"></i>' },
        { name: 'SQL', icon: '<i class="fas fa-database"></i>' },
        { name: 'Firebase', icon: '<i class="fas fa-fire"></i>' },
        { name: 'MS Office', icon: '<i class="fab fa-microsoft"></i>' },
        { name: 'Git', icon: '<i class="fab fa-git-alt"></i>' },
        { name: 'GCS', icon: '<i class="fab fa-google"></i>' },
        { name: 'Xcode', icon: '<i class="fab fa-apple"></i>' },
    ];

    const track = document.getElementById('techStackTrack');

    if (track) {
        const createSkillItems = () => {
            return skills.map(skill => {
                return `<span>${skill.icon} ${skill.name}</span>`;
            }).join('');
        };
        track.innerHTML = createSkillItems() + createSkillItems();
    }

    
    setTimeout(() => {
        document.body.classList.add('loaded');
        setTimeout(() => {
            document.querySelectorAll('.hero-card, .nav-card, .social-container, .stack-card, .header').forEach(el => el.classList.add('active'));
        }, 300);
    }, 1500);

    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal, .reveal-up, .reveal-left, .reveal-down').forEach(el => observer.observe(el));

    
    const aiTrigger = document.getElementById('aiTriggerCard');
    const chatOverlay = document.getElementById('chatOverlay');
    const closeChat = document.getElementById('closeChat');
    
    // Chat elemanlarını tanımlayalım
    const chatInput = document.getElementById('chatInput');
    const sendBtn = document.querySelector('.send-btn'); // HTML'deki butonu seçiyoruz
    const chatBody = document.getElementById('chatBody');

    if (aiTrigger && chatOverlay) {
        aiTrigger.addEventListener('click', () => {
            chatOverlay.classList.add('active');
            if (chatInput) {
                setTimeout(() => {
                    chatInput.focus();
                }, 100);
            }
        });

        closeChat.addEventListener('click', () => {
            chatOverlay.classList.remove('active');
        });

        chatOverlay.addEventListener('click', (e) => {
            if (e.target === chatOverlay) {
                chatOverlay.classList.remove('active');
            }
        });
    }

    let chatHistory = []; 

    
    async function sendMessage() {
       
        const chatInputReal = document.getElementById('chatInput');
        const chatBodyReal = document.getElementById('chatBody');

        const text = chatInputReal.value.trim();
        if (!text) return;

        
        addMessage(text, 'user');
        chatInputReal.value = '';

        
        const loadingDiv = document.createElement('div');
        loadingDiv.classList.add('message', 'bot');
        loadingDiv.innerHTML = '<i class="fas fa-ellipsis-h"></i>';
        loadingDiv.id = 'loadingMessage';
        chatBodyReal.appendChild(loadingDiv);
        chatBodyReal.scrollTop = chatBodyReal.scrollHeight;

        
        const sleepTimeout = setTimeout(() => {
            const currentLoading = document.getElementById('loadingMessage');
            if (currentLoading) {
                currentLoading.innerHTML = "🥱 Kusura bakma uyuyordum, sunucularımın uyanması 30-40 saniye sürebilir...";
            }
        }, 3000);

        try {
            
            const response = await fetch('https://berk-backend.onrender.com/chat', { 
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    message: text,
                    history: chatHistory 
                })
            });

            const data = await response.json();
            
            
            clearTimeout(sleepTimeout);
            const loadingMsg = document.getElementById('loadingMessage');
            if (loadingMsg) loadingMsg.remove();

            
            addMessage(data.reply, 'bot');

            
            chatHistory.push({ role: "user", parts: [{ text: text }] });
            chatHistory.push({ role: "model", parts: [{ text: data.reply }] });

        } catch (error) {
            console.error(error);
            clearTimeout(sleepTimeout);
            const loadingMsg = document.getElementById('loadingMessage');
            if (loadingMsg) loadingMsg.remove();
            addMessage("Bağlantı hatası oluştu.", 'bot');
        }
    }

    
    const translations = {
        en: {
            "hero-title": "Engineering Intelligence",
            "hero-desc": "I am a <strong> Software Engineer</strong>.",
            "btn-cv": "Resume",
            "nav-proj": "Projects", "nav-exp": "Experience", "nav-about": "About Me", "nav-contact": "Contact",
            "stack-title": "Technical Skills",
            "ai-promo-title": "AI Assistant Online", "ai-promo-desc": "Ask me about Berk's skills...", "ai-input-placeholder": "How can I help you?",
            "sect-exp": "Professional Experience",
            "exp1-role": "Software Engineer Intern",
            "exp1-desc": "Architected a cross-platform news application using Flutter. Implemented complex State Management solutions (Provider/Bloc) and integrated RESTful APIs for real-time data filtering, ensuring high performance.",
            "exp2-role": "Smart Contract Dev",
            "exp2-desc": "Engineered secure and gas-efficient Smart Contracts on the Ethereum blockchain using Solidity. Successfully integrated Web3.js to facilitate direct wallet connections and handled high-volume NFT minting transactions.",
            "exp3-role": "Web Developer",
            "exp3-desc": "Managed the full web development lifecycle using WordPress. Configured Linux servers, handled DNS & SSL certifications, and optimized frontend assets to achieve 90+ PageSpeed scores.",
            "sect-proj": "Selected Projects",
            "proj1-title": "Block Puzzle Flow",
            "proj1-desc": "A completely independent iOS Puzzle Game developed with Flutter. I managed the entire product lifecycle, from designing complex game logic algorithms and UI/UX to handling App Store Optimization (ASO).",
            "proj2-title": "Face Recognition AI",
            "proj2-desc": "A Python-based automated attendance system utilizing OpenCV and Machine Learning. The system processes real-time video feeds to identify students with high accuracy, securely logging data to Firebase.",
            "proj3-title": "University Chatbot (IzuBot)",
            "proj3-desc": "An intelligent Q&A bot trained on a dataset of 5,000+ university regulations. Powered by a FastAPI backend, it utilizes Natural Language Processing (NLP) to deliver instant, context-aware responses.",
            "about-text": "I'm a Software Engineering student at Istanbul Sabahattin Zaim University. Throughout my studies, I've had the chance to be part of different student communities and collaborative projects. I am interested in software development, artificial intelligence, and mobile application development. I hope to build my career in these areas. I am confident in my abilities to problem-solve, think analytically, and create solutions that truly meet user needs. I'm a team worker who’s curious about new technologies and always open to learning and growing through new experiences.",
            "contact-title": "Ready to create something amazing?",
            "contact-desc": "I am currently available for freelance projects and job opportunities.",
            "chat-header": "Berk's AI Assistant",
            "chat-welcome": "Hello! I am Berk's AI. How can I help you today?"
        },
        tr: {
            "hero-title": "Mühendislik Zekası",
            "hero-desc": "<strong> Yazılım Mühendisiyim</strong>.",
            "btn-cv": "Özgeçmiş",
            "nav-proj": "Projeler", "nav-exp": "Deneyim", "nav-about": "Hakkımda", "nav-contact": "İletişim",
            "stack-title": "Teknik Yetenekler",
            "ai-promo-title": "AI Asistan Çevrimiçi", "ai-promo-desc": "Berk'in yeteneklerini sor...", "ai-input-placeholder": "Nasıl yardımcı olabilirim?",
            "sect-exp": "Profesyonel Deneyim",
            "exp1-role": "Yazılım Müh. Stajyeri",
            "exp1-desc": "Flutter kullanarak çapraz platform bir haber uygulaması mimarisi oluşturdum. Karmaşık State Management (Provider/Bloc) çözümleri uyguladım ve gerçek zamanlı veri filtreleme için RESTful API entegrasyonu yaptım.",
            "exp2-role": "Akıllı Sözleşme Geliştirici",
            "exp2-desc": "Solidity kullanarak Ethereum blok zinciri üzerinde güvenli ve düşük maliyetli (gas-efficient) Akıllı Sözleşmeler geliştirdim. Web3.js entegrasyonu ile doğrudan cüzdan bağlantılarını sağladım.",
            "exp3-role": "Web Geliştirici",
            "exp3-desc": "WordPress kullanarak tüm web geliştirme sürecini yönettim. Linux sunucularını yapılandırdım, DNS & SSL sertifikalarını kurdum ve mobil uyumluluk için ön yüz varlıklarını optimize ettim.",
            "sect-proj": "Seçilmiş Projeler",
            "proj1-title": "Block Puzzle Flow",
            "proj1-desc": "Flutter ile geliştirilen tamamen bağımsız bir iOS Bulmaca Oyunu. Karmaşık oyun mantığı algoritmalarından UI/UX tasarımına, App Store Optimizasyonundan (ASO) yasal yayınlama gereksinimlerine kadar tüm süreci yönettim.",
            "proj2-title": "Yüz Tanıma AI",
            "proj2-desc": "OpenCV ve Makine Öğrenimi kullanan Python tabanlı otomatik yoklama sistemi. Sistem, gerçek zamanlı video akışlarını işleyerek öğrencileri yüksek doğrulukla tespit eder ve verileri Firebase'e kaydeder.",
            "proj3-title": "Üniversite Asistanı (IzuBot)",
            "proj3-desc": "5.000+ üniversite yönetmeliği verisiyle eğitilmiş akıllı bir soru-cevap botu. FastAPI altyapısı ile güçlendirilmiş olup, Doğal Dil İşleme (NLP) kullanarak öğrenci sorularına anlık yanıtlar verir.",
            "about-text": "İstanbul Sabahattin Zaim Üniversitesi'nde Yazılım Mühendisliği öğrencisiyim. Eğitimim boyunca farklı öğrenci topluluklarında ve ortak projelerde yer alma şansı buldum. Yazılım geliştirme, yapay zeka ve mobil uygulama geliştirme alanlarına ilgi duyuyorum ve kariyerimi bu alanlarda inşa etmeyi hedefliyorum. Sorun çözme yeteneğime, analitik düşünme becerime ve kullanıcı ihtiyaçlarını gerçekten karşılayan çözümler üretme konusundaki yetkinliğime güveniyorum. Yeni teknolojilere meraklı, öğrenmeye ve yeni deneyimlerle gelişmeye her zaman açık bir takım oyuncusuyum.",
            "contact-title": "Harika bir şey yaratmaya hazır mısın?",
            "contact-desc": "Şu anda freelance projeler ve iş fırsatları için uygunum.",
            "chat-header": "Berk'in AI Asistanı",
            "chat-welcome": "Merhaba! Ben Berk'in yapay zekasıyım. Bugün size nasıl yardımcı olabilirim?"
        }
    };

    let currentLang = "en";
    const langBtn = document.getElementById('langSwitch');
    updateText();

    if (langBtn) {
        langBtn.addEventListener('click', () => {
            currentLang = currentLang === "en" ? "tr" : "en";
            updateText();
        });
    }

    function updateText() {
        document.querySelectorAll("[data-i18n]").forEach(element => {
            const key = element.getAttribute("data-i18n");
            if (translations[currentLang][key]) {
                element.style.opacity = 0;
                setTimeout(() => {
                    if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                        element.placeholder = translations[currentLang][key];
                    } else {
                        element.innerHTML = translations[currentLang][key];
                    }
                    element.style.opacity = 1;
                }, 300);
            }
        });
    }

    
    // --- GÜNCELLENMİŞ MESAJ EKLEME FONKSİYONU ---
    function addMessage(text, sender) {
        const div = document.createElement('div');
        
        // CSS için sınıfları ekliyoruz (message + user/bot)
        div.classList.add('message', sender); 
        
        if (sender === 'bot') {
            // Bot ise Markdown'ı HTML'e çevir (Kalın, başlık vs. olsun)
            div.innerHTML = marked.parse(text);
        } else {
            // Kullanıcı ise düz metin bas (Güvenlik için)
            div.textContent = text;
        }
        
        chatBody.appendChild(div);
        chatBody.scrollTop = chatBody.scrollHeight; // En alta kaydır
    }

    async function sendMessage() {
        const text = chatInput.value.trim();
        if (!text) return;

        
        addMessage(text, 'user');
        chatInput.value = '';

        
        const loadingDiv = document.createElement('div');
        loadingDiv.classList.add('message', 'bot');
        loadingDiv.innerHTML = '<i class="fas fa-ellipsis-h"></i>';
        loadingDiv.id = 'loadingMessage';
        chatBody.appendChild(loadingDiv);
        chatBody.scrollTop = chatBody.scrollHeight;

        
        const sleepTimeout = setTimeout(() => {
            const currentLoading = document.getElementById('loadingMessage');
            if (currentLoading) {
                currentLoading.innerHTML = "🥱 Kusura bakma uyuyordum, sunucularımın uyanması 30-40 saniye sürebilir. Kahvemi alıp geliyorum...";
            }
        }, 3000);

        try {
            
            const response = await fetch('https://berk-backend.onrender.com/chat', { 
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: text })
            });

            const data = await response.json();
            
            
            clearTimeout(sleepTimeout);
            const loadingMsg = document.getElementById('loadingMessage');
            if (loadingMsg) loadingMsg.remove();

            
            addMessage(data.reply, 'bot');

        } catch (error) {
            console.error(error);
            clearTimeout(sleepTimeout);
            
            const loadingMsg = document.getElementById('loadingMessage');
            if (loadingMsg) loadingMsg.remove();
            
            addMessage("Bağlantı hatası oluştu. Lütfen tekrar dene.", 'bot');
        }
    }

    
    if(sendBtn) {
        sendBtn.addEventListener('click', sendMessage);
    }

    if(chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendMessage();
        });
    }

});