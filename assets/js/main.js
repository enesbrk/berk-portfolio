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
    
    
    const chatInput = document.getElementById('chatInput');
    const sendBtn = document.querySelector('.send-btn'); 
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
    let isFirstMessage = true;  

    
    function addMessage(text, sender) {
        const div = document.createElement('div');
        div.classList.add('message', sender); 
        
        if (sender === 'bot') {
            
            div.innerHTML = marked.parse(text);
        } else {
            
            div.textContent = text;
        }
        
        chatBody.appendChild(div);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    
    async function sendMessage() {
        
        const text = chatInput.value.trim();
        if (!text) return;

        
        addMessage(text, 'user');
        chatInput.value = '';

        
        const loadingDiv = document.createElement('div');
        loadingDiv.classList.add('message', 'bot');
        loadingDiv.id = 'loadingMessage';
        loadingDiv.innerHTML = '<i class="fas fa-ellipsis-h"></i>';
        chatBody.appendChild(loadingDiv);
        chatBody.scrollTop = chatBody.scrollHeight;

        
        let sleepTimeout;

        
        if (isFirstMessage) {
            sleepTimeout = setTimeout(() => {
                const currentLoading = document.getElementById('loadingMessage');
                if (currentLoading) {
                    currentLoading.innerHTML = "☕ Sunucularımı uyandırıyorum, kahvemi alıp gelmem 30-40 saniye sürebilir. Lütfen bekleyin...";
                }
            }, 2000); 
        }

        try {
            
            const response = await fetch('https://berkd.vercel.app/chat', { 
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    message: text,
                    history: chatHistory 
                })
            });

            const data = await response.json();
            
            
            if (isFirstMessage) {
                clearTimeout(sleepTimeout);
                isFirstMessage = false;
            }

            const loadingMsg = document.getElementById('loadingMessage');
            if (loadingMsg) loadingMsg.remove();

            
            addMessage(data.reply, 'bot');

            
            chatHistory.push({ role: "user", parts: [{ text: text }] });
            chatHistory.push({ role: "model", parts: [{ text: data.reply }] });

        } catch (error) {
            console.error(error);
            if (isFirstMessage) clearTimeout(sleepTimeout);
            
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
            "exp1-desc": "A cross-platform news application compatible with both iOS and Android was developed using Flutter. Category-based filtering was implemented to help users access content based on their interests. Complex state management solutions (Provider/Bloc) were implemented, and RESTful APIs were integrated for real-time data filtering.",
            "exp2-role": "Backend Developer",
            "exp2-desc": "Smart contracts for the Cool Skull Club NFT project were developed using Solidity on the Ethereum blockchain, and a secure and scalable minting architecture was implemented. MetaMask was integrated via Web3.js to enable direct ETH payments.",
            "exp3-role": "Full Stack Developer & Content Creator",
            "exp3-desc": "The Videomarketi website was developed from scratch using WordPress, with customized themes and plugins. A seamless and secure online payment infrastructure was established by integrating the Iyzico payment gateway. Digital content was designed using Adobe Creative Suite.",
            "sect-proj": "Projects",
            "proj1-title": "Block Puzzle Flow",
            "proj1-desc": "A completely independent iOS Puzzle Game developed with Flutter. I managed the entire product lifecycle, from designing complex game logic algorithms and UI/UX to handling App Store Optimization (ASO).",
            "proj2-title": "Face Recognition AI",
            "proj2-desc": "A Python-based automated attendance system utilizing OpenCV and Machine Learning. The system processes real-time video feeds to identify students with high accuracy, securely logging data to Firebase.",
            "proj3-title": "University Chatbot (IzuBot)",
            "proj3-desc": "An intelligent Q&A bot trained on a dataset of 5,000+ university regulations. Powered by a FastAPI backend, it utilizes Natural Language Processing (NLP) to deliver instant, context-aware responses.",
            "about-text": "I am a software engineer who graduated from Istanbul Sabahattin Zaim University with a degree in Software Engineering, and I focus on mobile application development, JAVA and artificial intelligence. I have experience in end-to-end project development, backend architectures (FastAPI), and AI integrations in Flutter and Python ecosystems. I am a team player who is curious about learning new technologies, open to collaboration, and solution-oriented.",
            "proj4-title": "EcoLens",
            "proj4-desc": "Mobile waste recognition and classification app developed with Swift and YOLOv11. It processes camera input in real-time to identify waste types for recycling.",
            "proj5-title": "AI Powered Portfolio",
            "proj5-desc": "An interactive portfolio website powered by FastAPI and Gemini 2.5 Flash. Unlike static sites, it features a context-aware AI assistant that answers questions about my CV in real-time.",
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
            "exp1-desc": "Hem iOS hem de Android ile uyumlu, Flutter kullanarak platformlar arası bir haber uygulaması geliştirildi. Kullanıcıların ilgi alanlarına göre içeriğe erişmelerine yardımcı olmak için kategori tabanlı bir filtreleme özelliği uygulandı. Karmaşık Durum Yönetimi çözümleri (Provider/Bloc) uygulandı ve gerçek zamanlı veri filtreleme için RESTful API'ları entegre edildi.",
            "exp2-role": "Backend Geliştirici",
            "exp2-desc": "Ethereum blok zinciri üzerinde Solidity kullanarak Cool Skull Club NFT projesi için akıllı sözleşmeler geliştirildi ve güvenli ve ölçeklenebilir bir basım yapısı uygulandı. Doğrudan ETH ödemelerini sağlamak için MetaMask'ı Web3.js aracılığıyla entegre edildi.",
            "exp3-role": "Tam Zamanlı Geliştirici & İçerik Üreticisi",
            "exp3-desc": "WordPress kullanarak Videomarketi web sitesini sıfırdan geliştirildi, temaları ve eklentileri özelleştirildi. Iyzico ödeme ağ geçidini entegre edilerek sorunsuz ve güvenli bir çevrimiçi ödeme altyapısı kuruldu. Adobe Creative Suite kullanarak dijital içerik tasarlandı.",
            "sect-proj": "Projeler",
            "proj1-title": "Block Puzzle Flow",
            "proj1-desc": "Flutter ile geliştirilen tamamen bağımsız bir iOS Bulmaca Oyunu. Karmaşık oyun mantığı algoritmalarından UI/UX tasarımına, App Store Optimizasyonundan (ASO) yasal yayınlama gereksinimlerine kadar tüm süreci yönettim.",
            "proj2-title": "Yüz Tanıma AI",
            "proj2-desc": "OpenCV ve Makine Öğrenimi kullanan Python tabanlı otomatik yoklama sistemi. Sistem, gerçek zamanlı video akışlarını işleyerek öğrencileri yüksek doğrulukla tespit eder ve verileri Firebase'e kaydeder.",
            "proj3-title": "Üniversite Asistanı (IzuBot)",
            "proj3-desc": "5.000+ üniversite yönetmeliği verisiyle eğitilmiş akıllı bir soru-cevap botu. FastAPI altyapısı ile güçlendirilmiş olup, Doğal Dil İşleme (NLP) kullanarak öğrenci sorularına anlık yanıtlar verir.",
            "proj4-title": "EcoLens",
            "proj4-desc": "Swift ve YOLOv11 kullanılarak geliştirilen mobil atık tanıma ve sınıflandırma uygulaması. Geri dönüşüm sürecini hızlandırmak için kamera görüntülerini gerçek zamanlı işler.",
            "proj5-title": "AI Destekli Portfolyo",
            "proj5-desc": "FastAPI ve Gemini 2.5 Flash ile güçlendirilmiş interaktif portfolyo sitesi. Statik sitelerin aksine, CV'm hakkındaki soruları gerçek zamanlı yanıtlayan bağlam duyarlı bir yapay zeka asistanı içerir.",
            "about-text": "İstanbul Sabahattin Zaim Üniversitesi Yazılım Mühendisliği bölümünden mezun olmuş bir yazılım mühendisiyim ve mobil uygulama geliştirme, JAVA ve yapay zekâ alanlarına odaklanıyorum. Uçtan uca proje geliştirme, arka uç mimarileri (FastAPI) ve Flutter ve Python ekosistemlerinde yapay zekâ entegrasyonları konusunda deneyimliyim. Yeni teknolojileri öğrenmeye meraklı, iş birliğine açık ve çözüm odaklı bir ekip oyuncusuyum.",
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

});