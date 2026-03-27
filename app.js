/**
 * Harvest For All - Core Application Logic
 * Hackathon Prototype (MICT SETA 2026)
 */

// --- Global State ---
let state = {
    impact: JSON.parse(localStorage.getItem('h4a_impact')) || {
        meals: 12450,
        water: 487000,
        money: 184000,
        waste: 450,
        badges: []
    },
    userResults: JSON.parse(localStorage.getItem('h4a_user_results')) || {
        crops: [],
        checklists: {},
        marketplaceListings: []
    },
    currentSection: 'home'
};

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    lucide.createIcons();
    
    // Initial routing
    const path = window.location.hash.replace('#', '') || 'home';
    navigateTo(path);

    // Mobile menu toggle
    const menuBtn = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Start stats animation if on home
    if (state.currentSection === 'home') {
        animateStats();
    }
});

// --- Routing Engine ---
function navigateTo(sectionId) {
    const root = document.getElementById('content-root');
    const template = document.getElementById(`${sectionId}-template`);
    
    if (!template) {
        console.error(`Template ${sectionId}-template not found`);
        // Fallback to home if not found
        if (sectionId !== 'home') navigateTo('home');
        return;
    }

    // Hide mobile menu on navigation
    document.getElementById('mobile-menu').classList.add('hidden');

    // Update window hash
    window.location.hash = sectionId;
    state.currentSection = sectionId;

    // Transition effect
    root.classList.add('opacity-0');
    
    setTimeout(() => {
        root.innerHTML = '';
        const clone = template.content.cloneNode(true);
        root.appendChild(clone);
        root.classList.remove('opacity-0');
        
        // Post-render initializations
        lucide.createIcons();
        window.scrollTo(0, 0);

        // Section specific initializations
        if (sectionId === 'home') animateStats();
        if (sectionId === 'grow') initGrow();
        if (sectionId === 'reduce') initMap();
        if (sectionId === 'save') initSave();
        if (sectionId === 'impact') initDashboard();
    }, 150);
}

// --- Grow Page Logic ---
function initGrow() {
    // Reset quiz if needed
}

function selectQuizOption(step, option) {
    const container = document.getElementById('quiz-container');
    if (step === 1) {
        state.userResults.space = option;
        container.innerHTML = `
            <div class="flex items-center gap-4 mb-8">
                <span class="w-10 h-10 rounded-full bg-forest text-white flex items-center justify-center font-bold">2</span>
                <div>
                    <h3 class="font-bold text-xl">Budget</h3>
                    <p class="text-sm text-dark/40">How much can you invest right now?</p>
                </div>
            </div>
            <div class="quiz-step">
                <h4 class="text-lg font-bold mb-6">What is your starting budget?</h4>
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <button onclick="selectQuizOption(2, 'low')" class="p-6 border-2 border-forest/10 rounded-2xl hover:border-forest hover:bg-forest/5 transition-all text-left">
                        <div class="font-bold mb-1 italic text-forest">Zero-Low</div>
                        <div class="text-sm text-dark/60">R0 - R100 (Upcycling focus)</div>
                    </button>
                    <button onclick="selectQuizOption(2, 'medium')" class="p-6 border-2 border-forest/10 rounded-2xl hover:border-forest hover:bg-forest/5 transition-all text-left">
                        <div class="font-bold mb-1 italic text-forest">Standard</div>
                        <div class="text-sm text-dark/60">R100 - R500 (Seeds & Soil)</div>
                    </button>
                    <button onclick="selectQuizOption(2, 'pro')" class="p-6 border-2 border-forest/10 rounded-2xl hover:border-forest hover:bg-forest/5 transition-all text-left">
                        <div class="font-bold mb-1 italic text-forest">Serious</div>
                        <div class="text-sm text-dark/60">R500+ (Tools & Systems)</div>
                    </button>
                </div>
            </div>
        `;
    } else if (step === 2) {
        container.innerHTML = `
            <div class="text-center py-12">
                <div class="w-20 h-20 bg-growth/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <i data-lucide="check-circle" class="w-12 h-12 text-forest"></i>
                </div>
                <h3 class="text-2xl font-black mb-2">We found your fit!</h3>
                <p class="text-dark/60 mb-8">Based on your space and budget, we recommend starting with <b>Swiss Chard</b> and <b>Spring Onions</b> using <b>Upcycled 2L bottles</b>.</p>
                <button onclick="navigateTo('grow')" class="bg-forest text-white px-8 py-3 rounded-xl font-bold">Start Guide</button>
            </div>
        `;
        lucide.createIcons();
    }
}

// --- Save Page Logic ---
function initSave() {
    const appliance = document.getElementById('energy-appliance');
    const hours = document.getElementById('energy-hours');
    const display = document.getElementById('hours-display');
    const result = document.getElementById('energy-result');

    const update = () => {
        const val = hours.value;
        display.innerText = `${val} Hours`;
        
        // Eskom Calculation: Watts * hours * 30 days / 1000 = kWh per month
        // kWh * R3.20 (avg tariff) = Rand cost
        const kwh = (appliance.value * val * 30) / 1000;
        const rand = kwh * 3.20;
        result.innerText = `R${rand.toFixed(2)}`;
    };

    if (appliance && hours) {
        appliance.addEventListener('change', update);
        hours.addEventListener('input', update);
    }
}

function logWater(liters) {
    state.impact.water += liters;
    saveState();
    
    // Show Toast or Update UI
    const totalEl = document.getElementById('water-weekly-total');
    if (totalEl) {
        totalEl.innerText = `${state.impact.water.toLocaleString()} Liters`;
    }
    
    // Visual feedback
    const btn = event.currentTarget;
    const originalText = btn.innerHTML;
    btn.classList.add('bg-blue-600', 'text-white');
    btn.innerHTML = '<div class="font-bold">Logged! +'+liters+'L</div>';
    setTimeout(() => {
        btn.classList.remove('bg-blue-600', 'text-white');
        btn.innerHTML = originalText;
    }, 2000);
}

// --- Utility Functions ---

function saveState() {
    localStorage.setItem('h4a_impact', JSON.stringify(state.impact));
    localStorage.setItem('h4a_user_results', JSON.stringify(state.userResults));
}

function animateStats() {
    const animate = (id, target, prefix = '', suffix = '') => {
        const el = document.getElementById(id);
        if (!el) return;
        let start = 0;
        const duration = 1500;
        const stepTime = 20;
        const steps = duration / stepTime;
        const increment = target / steps;
        
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                el.innerText = prefix + target.toLocaleString() + suffix;
                clearInterval(timer);
            } else {
                el.innerText = prefix + Math.floor(start).toLocaleString() + suffix;
            }
        }, stepTime);
    };

    animate('stat-meals', state.impact.meals);
    animate('stat-water', state.impact.water, '', 'L');
    animate('stat-money', state.impact.money, 'R');
}

// --- Placeholder Page Logic (Templates will be added to index.html) ---

// Map Logic
function initMap() {
    const mapContainer = document.getElementById('map');
    if (!mapContainer) return;
    
    // Coordinates for Cape Town
    const map = L.map('map').setView([-33.9249, 18.4241], 11);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // Mock Recycling Points (from blueprint)
    const points = [
        { name: "Kraaifontein MRF", lat: -33.8569, lng: 18.7188, type: "Integrated Waste Facility" },
        { name: "Khayelitsha Drop-off", lat: -34.0333, lng: 18.6667, type: "Community Recycling" },
        { name: "Mitchells Plain Drop-off", lat: -34.0500, lng: 18.6000, type: "General Waste/Recycling" },
        { name: "Athlone Refuse Station", lat: -33.9500, lng: 18.5000, type: "Multi-waste Drop-off" }
    ];

    points.forEach(p => {
        L.marker([p.lat, p.lng])
            .addTo(map)
            .bindPopup(`<b>${p.name}</b><br>${p.type}`);
    });
}

// Dashboard Logic
function initDashboard() {
    const ctx = document.getElementById('impactChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Savings (Rands)',
                data: [1200, 1900, 3000, 5000, 2000, 3000],
                borderColor: '#166534',
                backgroundColor: 'rgba(22, 101, 52, 0.1)',
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
}
