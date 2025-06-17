// متغيرات اللعبة الأساسية
let gameState = {
    board: Array(9).fill(''),
    currentPlayer: 'X',
    gameMode: 'ai',
    isGameActive: true,
    scores: { X: 0, O: 0 },
    currentRound: 1,
    gameHistory: []
};

// بيانات اللاعب
let playerData = {
    level: 1,
    experience: 0,
    experienceToNext: 100,
    totalPoints: 0,
    totalGems: 0,
    gamesPlayed: 0,
    gamesWon: 0,
    achievements: [],
    settings: {
        sound: true,
        music: true,
        animations: true,
        hints: true,
        theme: 'default'
    },
    inventory: {
        symbols: ['default'],
        themes: ['default'],
        tools: [],
        effects: []
    },
    equipped: {
        symbol: 'default',
        theme: 'default'
    }
};

// بيانات المتجر
const shopData = {
    symbols: [
        { id: 'classic', name: 'كلاسيكي', price: 0, currency: 'points', icon: '❌⭕', owned: true },
        { id: 'neon', name: 'نيون', price: 100, currency: 'points', icon: '🔥💧', owned: false },
        { id: 'emoji', name: 'إيموجي', price: 150, currency: 'points', icon: '😎😍', owned: false },
        { id: 'hearts', name: 'قلوب', price: 200, currency: 'points', icon: '💖💙', owned: false },
        { id: 'stars', name: 'نجوم', price: 250, currency: 'points', icon: '⭐🌟', owned: false },
        { id: 'animals', name: 'حيوانات', price: 300, currency: 'points', icon: '🦁🐱', owned: false },
        { id: 'premium', name: 'بريميوم', price: 50, currency: 'gems', icon: '💎👑', owned: false }
    ],
    themes: [
        { id: 'default', name: 'افتراضي', price: 0, currency: 'points', preview: '#667eea', owned: true },
        { id: 'dark', name: 'مظلم', price: 200, currency: 'points', preview: '#1a1a2e', owned: false },
        { id: 'purple', name: 'بنفسجي', price: 300, currency: 'points', preview: '#8e44ad', owned: false },
        { id: 'green', name: 'أخضر', price: 350, currency: 'points', preview: '#27ae60', owned: false },
        { id: 'sunset', name: 'غروب', price: 400, currency: 'points', preview: '#ff7b7b', owned: false },
        { id: 'ocean', name: 'محيط', price: 75, currency: 'gems', preview: '#3498db', owned: false }
    ],
    tools: [
        { id: 'hint', name: 'تلميح ذكي', price: 50, currency: 'points', icon: '💡', description: 'يظهر أفضل حركة ممكنة' },
        { id: 'undo', name: 'تراجع', price: 75, currency: 'points', icon: '↶', description: 'إلغاء آخر حركة' },
        { id: 'shield', name: 'درع الحماية', price: 100, currency: 'points', icon: '🛡️', description: 'حماية من الخسارة مرة واحدة' },
        { id: 'double_points', name: 'نقاط مضاعفة', price: 150, currency: 'points', icon: '⚡', description: 'مضاعفة النقاط لمباراة واحدة' },
        { id: 'auto_win', name: 'فوز تلقائي', price: 25, currency: 'gems', icon: '🏆', description: 'فوز فوري في مباراة واحدة' }
    ],
    effects: [
        { id: 'particles', name: 'جسيمات', price: 100, currency: 'points', icon: '✨', description: 'تأثيرات بصرية جميلة' },
        { id: 'glow', name: 'توهج', price: 150, currency: 'points', icon: '🌟', description: 'توهج للرموز المختارة' },
        { id: 'rainbow', name: 'قوس قزح', price: 200, currency: 'points', icon: '🌈', description: 'ألوان متغيرة' },
        { id: 'fireworks', name: 'ألعاب نارية', price: 250, currency: 'points', icon: '🎆', description: 'احتفال عند الفوز' },
        { id: 'magic', name: 'سحري', price: 50, currency: 'gems', icon: '🔮', description: 'تأثيرات سحرية متقدمة' }
    ]
};

// بيانات الإنجازات
const achievementsData = [
    { id: 'first_win', name: 'أول انتصار', description: 'فز في أول مباراة لك', icon: '🏆', reward: { points: 50, gems: 5 }, unlocked: false },
    { id: 'win_streak_5', name: 'سلسلة انتصارات', description: 'فز في 5 مباريات متتالية', icon: '🔥', reward: { points: 100, gems: 10 }, unlocked: false },
    { id: 'level_5', name: 'مستوى متقدم', description: 'وصل للمستوى 5', icon: '⭐', reward: { points: 200, gems: 15 }, unlocked: false },
    { id: 'games_50', name: 'لاعب نشط', description: 'العب 50 مباراة', icon: '🎮', reward: { points: 300, gems: 20 }, unlocked: false },
    { id: 'perfect_game', name: 'مباراة مثالية', description: 'فز بدون أن يسجل الخصم', icon: '💎', reward: { points: 150, gems: 25 }, unlocked: false },
    { id: 'shopaholic', name: 'محب التسوق', description: 'اشتر 10 عناصر من المتجر', icon: '🛍️', reward: { points: 250, gems: 30 }, unlocked: false }
];

// عناصر DOM
const elements = {
    // الشاشات
    startScreen: document.getElementById('startScreen'),
    gameScreen: document.getElementById('gameScreen'),
    shopScreen: document.getElementById('shopScreen'),
    achievementsScreen: document.getElementById('achievementsScreen'),
    settingsScreen: document.getElementById('settingsScreen'),
    resultScreen: document.getElementById('resultScreen'),
    
    // عناصر الواجهة
    playerLevel: document.getElementById('playerLevel'),
    totalPoints: document.getElementById('totalPoints'),
    totalGems: document.getElementById('totalGems'),
    expText: document.getElementById('expText'),
    expProgress: document.getElementById('expProgress'),
    
    // عناصر اللعبة
    gameBoard: document.getElementById('gameBoard'),
    currentPlayerDisplay: document.getElementById('currentPlayerDisplay'),
    scoreX: document.getElementById('scoreX'),
    scoreO: document.getElementById('scoreO'),
    currentRound: document.getElementById('currentRound'),
    winningLine: document.getElementById('winningLine'),
    
    // الأزرار
    shopBtn: document.getElementById('shopBtn'),
    achievementsBtn: document.getElementById('achievementsBtn'),
    settingsBtn: document.getElementById('settingsBtn'),
    backToMenuBtn: document.getElementById('backToMenuBtn'),
    resetGameBtn: document.getElementById('resetGameBtn'),
    hintBtn: document.getElementById('hintBtn'),
    undoBtn: document.getElementById('undoBtn'),
    
    // المتجر
    shopContent: document.getElementById('shopContent'),
    shopPoints: document.getElementById('shopPoints'),
    shopGems: document.getElementById('shopGems'),
    closeShopBtn: document.getElementById('closeShopBtn'),
    
    // الإشعارات
    notification: document.getElementById('notification'),
    notificationIcon: document.getElementById('notificationIcon'),
    notificationText: document.getElementById('notificationText'),
    
    // الجسيمات
    particleContainer: document.getElementById('particleContainer')
};

// تهيئة اللعبة
function initGame() {
    loadPlayerData();
    updateUI();
    setupEventListeners();
    applyTheme(playerData.equipped.theme);
    showScreen('startScreen');
}

// إعداد مستمعي الأحداث
function setupEventListeners() {
    // أزرار أنماط اللعب
    document.querySelectorAll('.mode-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            gameState.gameMode = btn.dataset.mode;
            startGame();
        });
    });
    
    // أزرار الشاشات
    elements.shopBtn.addEventListener('click', () => showShop());
    elements.achievementsBtn.addEventListener('click', () => showAchievements());
    elements.settingsBtn.addEventListener('click', () => showSettings());
    elements.backToMenuBtn.addEventListener('click', () => showScreen('startScreen'));
    
    // أزرار التحكم في اللعبة
    elements.resetGameBtn.addEventListener('click', resetGame);
    elements.hintBtn.addEventListener('click', showHint);
    elements.undoBtn.addEventListener('click', undoMove);
    
    // أزرار إغلاق الشاشات
    elements.closeShopBtn.addEventListener('click', () => showScreen('startScreen'));
    document.getElementById('closeAchievementsBtn').addEventListener('click', () => showScreen('startScreen'));
    document.getElementById('closeSettingsBtn').addEventListener('click', () => showScreen('startScreen'));
    
    // خلايا اللعبة
    document.querySelectorAll('.cell').forEach((cell, index) => {
        cell.addEventListener('click', () => makeMove(index));
    });
    
    // فئات المتجر
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            showShopCategory(btn.dataset.category);
        });
    });
    
    // إعدادات
    setupSettingsListeners();
}

// إعداد مستمعي إعدادات
function setupSettingsListeners() {
    document.getElementById('soundToggle').addEventListener('change', (e) => {
        playerData.settings.sound = e.target.checked;
        savePlayerData();
    });
    
    document.getElementById('musicToggle').addEventListener('change', (e) => {
        playerData.settings.music = e.target.checked;
        savePlayerData();
    });
    
    document.getElementById('animationsToggle').addEventListener('change', (e) => {
        playerData.settings.animations = e.target.checked;
        savePlayerData();
    });
    
    document.getElementById('hintsToggle').addEventListener('change', (e) => {
        playerData.settings.hints = e.target.checked;
        savePlayerData();
    });
    
    document.getElementById('exportDataBtn').addEventListener('click', exportData);
    document.getElementById('importDataBtn').addEventListener('click', () => {
        document.getElementById('importFileInput').click();
    });
    document.getElementById('resetDataBtn').addEventListener('click', resetAllData);
    
    document.getElementById('importFileInput').addEventListener('change', importData);
}

// بدء اللعبة
function startGame() {
    resetGameState();
    showScreen('gameScreen');
    updateGameUI();
    
    if (gameState.gameMode === 'ai' && gameState.currentPlayer === 'O') {
        setTimeout(makeAIMove, 500);
    }
}

// إعادة تعيين حالة اللعبة
function resetGameState() {
    gameState.board = Array(9).fill('');
    gameState.currentPlayer = 'X';
    gameState.isGameActive = true;
    gameState.gameHistory = [];
    
    // تنظيف اللوحة
    document.querySelectorAll('.cell').forEach(cell => {
        cell.textContent = '';
        cell.className = 'cell';
    });
    
    elements.winningLine.classList.remove('show');
}

// تنفيذ حركة
function makeMove(index) {
    if (!gameState.isGameActive || gameState.board[index] !== '') return;
    
    // حفظ الحركة في التاريخ
    gameState.gameHistory.push({
        board: [...gameState.board],
        player: gameState.currentPlayer
    });
    
    // تنفيذ الحركة
    gameState.board[index] = gameState.currentPlayer;
    updateCell(index, gameState.currentPlayer);
    
    // تشغيل الصوت
    playSound('move');
    
    // إضافة تأثيرات بصرية
    if (playerData.inventory.effects.includes('particles')) {
        createParticles(index);
    }
    
    // فحص الفوز
    const winner = checkWinner();
    if (winner) {
        handleGameEnd(winner);
        return;
    }
    
    // فحص التعادل
    if (gameState.board.every(cell => cell !== '')) {
        handleGameEnd('draw');
        return;
    }
    
    // تغيير اللاعب
    gameState.currentPlayer = gameState.currentPlayer === 'X' ? 'O' : 'X';
    updateGameUI();
    
    // حركة الذكاء الاصطناعي
    if (gameState.gameMode === 'ai' && gameState.currentPlayer === 'O') {
        setTimeout(makeAIMove, 500);
    }
}

// تحديث الخلية
function updateCell(index, player) {
    const cell = document.querySelectorAll('.cell')[index];
    const symbol = getPlayerSymbol(player);
    
    cell.textContent = symbol;
    cell.classList.add('filled', player.toLowerCase());
    
    // تأثير الحركة
    if (playerData.settings.animations) {
        cell.style.transform = 'scale(0)';
        setTimeout(() => {
            cell.style.transform = 'scale(1)';
        }, 50);
    }
}

// الحصول على رمز اللاعب
function getPlayerSymbol(player) {
    const symbolSet = playerData.equipped.symbol;
    const symbols = {
        default: { X: 'X', O: 'O' },
        classic: { X: '❌', O: '⭕' },
        neon: { X: '🔥', O: '💧' },
        emoji: { X: '😎', O: '😍' },
        hearts: { X: '💖', O: '💙' },
        stars: { X: '⭐', O: '🌟' },
        animals: { X: '🦁', O: '🐱' },
        premium: { X: '💎', O: '👑' }
    };
    
    return symbols[symbolSet] ? symbols[symbolSet][player] : player;
}

// حركة الذكاء الاصطناعي
function makeAIMove() {
    if (!gameState.isGameActive) return;
    
    const bestMove = getBestMove();
    if (bestMove !== -1) {
        makeMove(bestMove);
    }
}

// الحصول على أفضل حركة للذكاء الاصطناعي
function getBestMove() {
    // فحص إمكانية الفوز
    for (let i = 0; i < 9; i++) {
        if (gameState.board[i] === '') {
            gameState.board[i] = 'O';
            if (checkWinner() === 'O') {
                gameState.board[i] = '';
                return i;
            }
            gameState.board[i] = '';
        }
    }
    
    // فحص إمكانية منع فوز الخصم
    for (let i = 0; i < 9; i++) {
        if (gameState.board[i] === '') {
            gameState.board[i] = 'X';
            if (checkWinner() === 'X') {
                gameState.board[i] = '';
                return i;
            }
            gameState.board[i] = '';
        }
    }
    
    // اختيار المركز إذا كان فارغاً
    if (gameState.board[4] === '') return 4;
    
    // اختيار الزوايا
    const corners = [0, 2, 6, 8];
    const availableCorners = corners.filter(i => gameState.board[i] === '');
    if (availableCorners.length > 0) {
        return availableCorners[Math.floor(Math.random() * availableCorners.length)];
    }
    
    // اختيار أي خلية متاحة
    const availableCells = gameState.board.map((cell, index) => cell === '' ? index : null).filter(i => i !== null);
    return availableCells.length > 0 ? availableCells[Math.floor(Math.random() * availableCells.length)] : -1;
}

// فحص الفائز
function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // صفوف
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // أعمدة
        [0, 4, 8], [2, 4, 6] // أقطار
    ];
    
    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameState.board[a] && gameState.board[a] === gameState.board[b] && gameState.board[a] === gameState.board[c]) {
            showWinningLine(pattern);
            return gameState.board[a];
        }
    }
    
    return null;
}

// إظهار خط الفوز
function showWinningLine(pattern) {
    const [a, b, c] = pattern;
    const cells = document.querySelectorAll('.cell');
    const cellSize = cells[0].offsetWidth;
    const boardRect = elements.gameBoard.getBoundingClientRect();
    
    let lineStyle = {};
    
    // تحديد اتجاه الخط
    if (a === 0 && b === 1 && c === 2) { // صف أول
        lineStyle = { top: '16.67%', left: '10%', width: '80%', height: '4px' };
    } else if (a === 3 && b === 4 && c === 5) { // صف ثاني
        lineStyle = { top: '50%', left: '10%', width: '80%', height: '4px' };
    } else if (a === 6 && b === 7 && c === 8) { // صف ثالث
        lineStyle = { top: '83.33%', left: '10%', width: '80%', height: '4px' };
    } else if (a === 0 && b === 3 && c === 6) { // عمود أول
        lineStyle = { top: '10%', left: '16.67%', width: '4px', height: '80%' };
    } else if (a === 1 && b === 4 && c === 7) { // عمود ثاني
        lineStyle = { top: '10%', left: '50%', width: '4px', height: '80%' };
    } else if (a === 2 && b === 5 && c === 8) { // عمود ثالث
        lineStyle = { top: '10%', left: '83.33%', width: '4px', height: '80%' };
    } else if (a === 0 && b === 4 && c === 8) { // قطر رئيسي
        lineStyle = { top: '50%', left: '50%', width: '4px', height: '113%', transform: 'translate(-50%, -50%) rotate(45deg)' };
    } else if (a === 2 && b === 4 && c === 6) { // قطر ثانوي
        lineStyle = { top: '50%', left: '50%', width: '4px', height: '113%', transform: 'translate(-50%, -50%) rotate(-45deg)' };
    }
    
    Object.assign(elements.winningLine.style, lineStyle);
    elements.winningLine.classList.add('show');
}

// التعامل مع نهاية اللعبة
function handleGameEnd(result) {
    gameState.isGameActive = false;
    
    // تحديث النقاط
    if (result !== 'draw') {
        gameState.scores[result]++;
        
        if (result === 'X') {
            playerData.gamesWon++;
            awardPoints(50);
            awardGems(5);
            awardExperience(25);
        }
    }
    
    playerData.gamesPlayed++;
    
    // تشغيل الصوت
    playSound(result === 'X' ? 'win' : result === 'O' ? 'lose' : 'draw');
    
    // إضافة تأثيرات بصرية
    if (result === 'X' && playerData.inventory.effects.includes('fireworks')) {
        createFireworks();
    }
    
    // فحص الإنجازات
    checkAchievements();
    
    // حفظ البيانات
    savePlayerData();
    
    // إظهار النتيجة
    setTimeout(() => {
        showResult(result);
    }, 1500);
}

// إظهار النتيجة
function showResult(result) {
    const resultIcon = document.getElementById('resultIcon');
    const resultTitle = document.getElementById('resultTitle');
    const resultMessage = document.getElementById('resultMessage');
    const earnedPoints = document.getElementById('earnedPoints');
    const earnedGems = document.getElementById('earnedGems');
    const earnedExp = document.getElementById('earnedExp');
    
    if (result === 'X') {
        resultIcon.textContent = '🏆';
        resultTitle.textContent = 'فوز رائع!';
        resultMessage.textContent = 'تهانينا! لقد فزت في هذه المباراة';
        earnedPoints.textContent = '+50';
        earnedGems.textContent = '+5';
        earnedExp.textContent = '+25';
    } else if (result === 'O') {
        resultIcon.textContent = '😔';
        resultTitle.textContent = 'خسارة';
        resultMessage.textContent = 'لا تستسلم! حاول مرة أخرى';
        earnedPoints.textContent = '+10';
        earnedGems.textContent = '+1';
        earnedExp.textContent = '+5';
        awardPoints(10);
        awardGems(1);
        awardExperience(5);
    } else {
        resultIcon.textContent = '🤝';
        resultTitle.textContent = 'تعادل';
        resultMessage.textContent = 'مباراة متوازنة! أداء جيد';
        earnedPoints.textContent = '+25';
        earnedGems.textContent = '+2';
        earnedExp.textContent = '+10';
        awardPoints(25);
        awardGems(2);
        awardExperience(10);
    }
    
    showScreen('resultScreen');
    
    // إعداد أزرار النتيجة
    document.getElementById('playAgainBtn').onclick = () => {
        gameState.currentRound++;
        startGame();
    };
    
    document.getElementById('backToMenuFromResultBtn').onclick = () => {
        showScreen('startScreen');
    };
}

// منح النقاط
function awardPoints(amount) {
    playerData.totalPoints += amount;
    updateUI();
    showNotification(`+${amount} نقطة!`, '⭐');
}

// منح الجواهر
function awardGems(amount) {
    playerData.totalGems += amount;
    updateUI();
    showNotification(`+${amount} جوهرة!`, '💎');
}

// منح الخبرة
function awardExperience(amount) {
    playerData.experience += amount;
    
    // فحص رفع المستوى
    while (playerData.experience >= playerData.experienceToNext) {
        playerData.experience -= playerData.experienceToNext;
        playerData.level++;
        playerData.experienceToNext = Math.floor(playerData.experienceToNext * 1.2);
        
        // مكافآت رفع المستوى
        const levelReward = playerData.level * 20;
        awardPoints(levelReward);
        awardGems(Math.floor(playerData.level / 2));
        
        showNotification(`مستوى جديد: ${playerData.level}!`, '🎉');
    }
    
    updateUI();
}

// فحص الإنجازات
function checkAchievements() {
    achievementsData.forEach(achievement => {
        if (achievement.unlocked) return;
        
        let shouldUnlock = false;
        
        switch (achievement.id) {
            case 'first_win':
                shouldUnlock = playerData.gamesWon >= 1;
                break;
            case 'win_streak_5':
                // يحتاج تتبع سلسلة الانتصارات
                break;
            case 'level_5':
                shouldUnlock = playerData.level >= 5;
                break;
            case 'games_50':
                shouldUnlock = playerData.gamesPlayed >= 50;
                break;
            case 'perfect_game':
                // يحتاج تتبع المباريات المثالية
                break;
            case 'shopaholic':
                const purchasedItems = Object.values(playerData.inventory).flat().length;
                shouldUnlock = purchasedItems >= 10;
                break;
        }
        
        if (shouldUnlock) {
            unlockAchievement(achievement);
        }
    });
}

// فتح إنجاز
function unlockAchievement(achievement) {
    achievement.unlocked = true;
    playerData.achievements.push(achievement.id);
    
    // منح المكافآت
    awardPoints(achievement.reward.points);
    awardGems(achievement.reward.gems);
    
    showNotification(`إنجاز جديد: ${achievement.name}!`, achievement.icon);
}

// تحديث واجهة المستخدم
function updateUI() {
    elements.playerLevel.textContent = playerData.level;
    elements.totalPoints.textContent = playerData.totalPoints;
    elements.totalGems.textContent = playerData.totalGems;
    elements.expText.textContent = `${playerData.experience} / ${playerData.experienceToNext}`;
    
    const expPercentage = (playerData.experience / playerData.experienceToNext) * 100;
    elements.expProgress.style.width = `${expPercentage}%`;
    
    // تحديث عملات المتجر
    if (elements.shopPoints) elements.shopPoints.textContent = playerData.totalPoints;
    if (elements.shopGems) elements.shopGems.textContent = playerData.totalGems;
}

// تحديث واجهة اللعبة
function updateGameUI() {
    elements.currentPlayerDisplay.textContent = getPlayerSymbol(gameState.currentPlayer);
    elements.scoreX.textContent = gameState.scores.X;
    elements.scoreO.textContent = gameState.scores.O;
    elements.currentRound.textContent = gameState.currentRound;
}

// إظهار شاشة
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.add('hidden');
    });
    
    document.getElementById(screenId).classList.remove('hidden');
}

// تشغيل الصوت
function playSound(type) {
    if (!playerData.settings.sound) return;
    
    // إنشاء أصوات بسيطة باستخدام Web Audio API
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    switch (type) {
        case 'move':
            oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
            break;
        case 'win':
            oscillator.frequency.setValueAtTime(523, audioContext.currentTime);
            oscillator.frequency.setValueAtTime(659, audioContext.currentTime + 0.1);
            oscillator.frequency.setValueAtTime(784, audioContext.currentTime + 0.2);
            gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
            break;
        case 'lose':
            oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
            oscillator.frequency.setValueAtTime(300, audioContext.currentTime + 0.1);
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
            break;
    }
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
}

// إظهار إشعار
function showNotification(text, icon = 'ℹ️') {
    elements.notificationIcon.textContent = icon;
    elements.notificationText.textContent = text;
    elements.notification.classList.add('show');
    
    setTimeout(() => {
        elements.notification.classList.remove('show');
    }, 3000);
}

// إنشاء جسيمات
function createParticles(cellIndex) {
    const cell = document.querySelectorAll('.cell')[cellIndex];
    const rect = cell.getBoundingClientRect();
    
    for (let i = 0; i < 5; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.textContent = '✨';
        particle.style.left = `${rect.left + rect.width / 2}px`;
        particle.style.top = `${rect.top + rect.height / 2}px`;
        particle.style.fontSize = `${Math.random() * 20 + 10}px`;
        
        elements.particleContainer.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 2000);
    }
}

// إنشاء ألعاب نارية
function createFireworks() {
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            const firework = document.createElement('div');
            firework.className = 'particle';
            firework.textContent = '🎆';
            firework.style.left = `${Math.random() * window.innerWidth}px`;
            firework.style.top = `${Math.random() * window.innerHeight}px`;
            firework.style.fontSize = '30px';
            
            elements.particleContainer.appendChild(firework);
            
            setTimeout(() => {
                firework.remove();
            }, 2000);
        }, i * 200);
    }
}

// حفظ بيانات اللاعب
function savePlayerData() {
    localStorage.setItem('xo_game_data', JSON.stringify(playerData));
}

// تحميل بيانات اللاعب
function loadPlayerData() {
    const saved = localStorage.getItem('xo_game_data');
    if (saved) {
        const loadedData = JSON.parse(saved);
        playerData = { ...playerData, ...loadedData };
    }
}

// تطبيق الثيم
function applyTheme(themeId) {
    document.body.setAttribute('data-theme', themeId);
    playerData.equipped.theme = themeId;
    savePlayerData();
}

// تصدير البيانات
function exportData() {
    const dataStr = JSON.stringify(playerData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'xo_game_backup.json';
    link.click();
    
    URL.revokeObjectURL(url);
    showNotification('تم تصدير البيانات بنجاح!', '📤');
}

// استيراد البيانات
function importData(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const importedData = JSON.parse(e.target.result);
            playerData = { ...playerData, ...importedData };
            savePlayerData();
            updateUI();
            applyTheme(playerData.equipped.theme);
            showNotification('تم استيراد البيانات بنجاح!', '📥');
        } catch (error) {
            showNotification('خطأ في استيراد البيانات!', '❌');
        }
    };
    reader.readAsText(file);
}

// إعادة تعيين جميع البيانات
function resetAllData() {
    if (confirm('هل أنت متأكد من إعادة تعيين جميع البيانات؟ لا يمكن التراجع عن هذا الإجراء.')) {
        localStorage.removeItem('xo_game_data');
        location.reload();
    }
}

// إعادة تشغيل اللعبة
function resetGame() {
    resetGameState();
    updateGameUI();
}

// إظهار تلميح
function showHint() {
    if (!playerData.settings.hints) {
        showNotification('التلميحات معطلة في الإعدادات', '💡');
        return;
    }
    
    const bestMove = getBestMove();
    if (bestMove !== -1) {
        const cell = document.querySelectorAll('.cell')[bestMove];
        cell.style.backgroundColor = 'rgba(240, 147, 251, 0.3)';
        setTimeout(() => {
            cell.style.backgroundColor = '';
        }, 1000);
        showNotification('أفضل حركة محددة!', '💡');
    }
}

// تراجع عن الحركة
function undoMove() {
    if (gameState.gameHistory.length === 0) {
        showNotification('لا توجد حركات للتراجع عنها', '↶');
        return;
    }
    
    const lastState = gameState.gameHistory.pop();
    gameState.board = lastState.board;
    gameState.currentPlayer = lastState.player;
    
    // تحديث اللوحة
    document.querySelectorAll('.cell').forEach((cell, index) => {
        cell.textContent = gameState.board[index] ? getPlayerSymbol(gameState.board[index]) : '';
        cell.className = gameState.board[index] ? `cell filled ${gameState.board[index].toLowerCase()}` : 'cell';
    });
    
    elements.winningLine.classList.remove('show');
    gameState.isGameActive = true;
    updateGameUI();
    
    showNotification('تم التراجع عن الحركة', '↶');
}

// بدء تشغيل اللعبة
document.addEventListener('DOMContentLoaded', initGame);


// وظائف المتجر
function showShop() {
    showScreen('shopScreen');
    showShopCategory('symbols');
}

// إظهار فئة المتجر
function showShopCategory(category) {
    const content = elements.shopContent;
    content.innerHTML = '';
    
    const items = shopData[category];
    
    items.forEach(item => {
        const itemElement = createShopItem(item, category);
        content.appendChild(itemElement);
    });
}

// إنشاء عنصر متجر
function createShopItem(item, category) {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'shop-item';
    
    const isOwned = playerData.inventory[category].includes(item.id);
    const isEquipped = playerData.equipped[category === 'symbols' ? 'symbol' : 'theme'] === item.id;
    const canAfford = item.currency === 'points' ? 
        playerData.totalPoints >= item.price : 
        playerData.totalGems >= item.price;
    
    itemDiv.innerHTML = `
        <div class="shop-item-header">
            <div class="shop-item-icon">${item.icon || item.preview || '🎁'}</div>
            <div class="shop-item-info">
                <h4 class="shop-item-name">${item.name}</h4>
                ${item.description ? `<p class="shop-item-description">${item.description}</p>` : ''}
            </div>
        </div>
        <div class="shop-item-footer">
            <div class="shop-item-price">
                <span class="price-icon">${item.currency === 'points' ? '⭐' : '💎'}</span>
                <span class="price-value">${item.price}</span>
            </div>
            <button class="shop-item-btn ${isOwned ? (isEquipped ? 'equipped' : 'owned') : (canAfford ? 'buyable' : 'locked')}" 
                    ${isOwned || !canAfford ? 'disabled' : ''}>
                ${isEquipped ? 'مُجهز' : isOwned ? 'تجهيز' : canAfford ? 'شراء' : 'مقفل'}
            </button>
        </div>
    `;
    
    const button = itemDiv.querySelector('.shop-item-btn');
    button.addEventListener('click', () => {
        if (isOwned && !isEquipped) {
            equipItem(item, category);
        } else if (!isOwned && canAfford) {
            purchaseItem(item, category);
        }
    });
    
    return itemDiv;
}

// شراء عنصر
function purchaseItem(item, category) {
    if (item.currency === 'points') {
        if (playerData.totalPoints >= item.price) {
            playerData.totalPoints -= item.price;
            playerData.inventory[category].push(item.id);
            
            showNotification(`تم شراء ${item.name}!`, '🛍️');
            playSound('purchase');
            
            // تجهيز العنصر تلقائياً إذا كان ثيم أو رمز
            if (category === 'symbols' || category === 'themes') {
                equipItem(item, category);
            }
            
            savePlayerData();
            updateUI();
            showShopCategory(category);
        }
    } else {
        if (playerData.totalGems >= item.price) {
            playerData.totalGems -= item.price;
            playerData.inventory[category].push(item.id);
            
            showNotification(`تم شراء ${item.name}!`, '💎');
            playSound('purchase');
            
            if (category === 'symbols' || category === 'themes') {
                equipItem(item, category);
            }
            
            savePlayerData();
            updateUI();
            showShopCategory(category);
        }
    }
}

// تجهيز عنصر
function equipItem(item, category) {
    if (category === 'symbols') {
        playerData.equipped.symbol = item.id;
        showNotification(`تم تجهيز ${item.name}!`, '⚡');
    } else if (category === 'themes') {
        playerData.equipped.theme = item.id;
        applyTheme(item.id);
        showNotification(`تم تطبيق ثيم ${item.name}!`, '🎨');
    }
    
    savePlayerData();
    showShopCategory(category);
}

// إظهار الإنجازات
function showAchievements() {
    showScreen('achievementsScreen');
    
    const achievementsList = document.getElementById('achievementsList');
    achievementsList.innerHTML = '';
    
    // تحديث إحصائيات الإنجازات
    document.getElementById('totalAchievements').textContent = playerData.achievements.length;
    document.getElementById('totalWins').textContent = playerData.gamesWon;
    document.getElementById('totalGamesPlayed').textContent = playerData.gamesPlayed;
    
    achievementsData.forEach(achievement => {
        const achievementElement = createAchievementElement(achievement);
        achievementsList.appendChild(achievementElement);
    });
}

// إنشاء عنصر إنجاز
function createAchievementElement(achievement) {
    const achievementDiv = document.createElement('div');
    achievementDiv.className = `achievement-item ${achievement.unlocked ? 'unlocked' : 'locked'}`;
    
    achievementDiv.innerHTML = `
        <div class="achievement-icon">${achievement.icon}</div>
        <div class="achievement-info">
            <h4 class="achievement-name">${achievement.name}</h4>
            <p class="achievement-description">${achievement.description}</p>
            <div class="achievement-reward">
                <span class="reward-points">⭐ ${achievement.reward.points}</span>
                <span class="reward-gems">💎 ${achievement.reward.gems}</span>
            </div>
        </div>
        <div class="achievement-status">
            ${achievement.unlocked ? '✅' : '🔒'}
        </div>
    `;
    
    return achievementDiv;
}

// إظهار الإعدادات
function showSettings() {
    showScreen('settingsScreen');
    
    // تحديث حالة الإعدادات
    document.getElementById('soundToggle').checked = playerData.settings.sound;
    document.getElementById('musicToggle').checked = playerData.settings.music;
    document.getElementById('animationsToggle').checked = playerData.settings.animations;
    document.getElementById('hintsToggle').checked = playerData.settings.hints;
}

// إضافة أصوات الشراء
function playPurchaseSound() {
    if (!playerData.settings.sound) return;
    
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(659, audioContext.currentTime);
    oscillator.frequency.setValueAtTime(784, audioContext.currentTime + 0.1);
    oscillator.frequency.setValueAtTime(988, audioContext.currentTime + 0.2);
    
    gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
}

// تحديث playSound لإضافة صوت الشراء
const originalPlaySound = playSound;
playSound = function(type) {
    if (type === 'purchase') {
        playPurchaseSound();
        return;
    }
    originalPlaySound(type);
};

// إضافة المزيد من الثيمات المتقدمة
const additionalThemes = {
    ocean: {
        '--primary-color': '#3498db',
        '--secondary-color': '#2980b9',
        '--accent-color': '#1abc9c',
        '--bg-primary': 'linear-gradient(135deg, #3498db 0%, #2980b9 100%)'
    },
    forest: {
        '--primary-color': '#27ae60',
        '--secondary-color': '#2ecc71',
        '--accent-color': '#f39c12',
        '--bg-primary': 'linear-gradient(135deg, #27ae60 0%, #2ecc71 100%)'
    },
    fire: {
        '--primary-color': '#e74c3c',
        '--secondary-color': '#c0392b',
        '--accent-color': '#f39c12',
        '--bg-primary': 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)'
    }
};

// تحسين تطبيق الثيم
function applyTheme(themeId) {
    document.body.setAttribute('data-theme', themeId);
    
    // تطبيق ثيمات إضافية
    if (additionalThemes[themeId]) {
        const root = document.documentElement;
        Object.entries(additionalThemes[themeId]).forEach(([property, value]) => {
            root.style.setProperty(property, value);
        });
    }
    
    playerData.equipped.theme = themeId;
    savePlayerData();
}

// إضافة المزيد من أشكال الرموز
const additionalSymbols = {
    space: { X: '🚀', O: '🌍' },
    food: { X: '🍕', O: '🍔' },
    sports: { X: '⚽', O: '🏀' },
    music: { X: '🎵', O: '🎶' },
    weather: { X: '☀️', O: '🌙' }
};

// تحسين getPlayerSymbol
const originalGetPlayerSymbol = getPlayerSymbol;
getPlayerSymbol = function(player) {
    const symbolSet = playerData.equipped.symbol;
    
    if (additionalSymbols[symbolSet]) {
        return additionalSymbols[symbolSet][player];
    }
    
    return originalGetPlayerSymbol(player);
};

// إضافة نظام الكومبو
let comboCount = 0;
let lastMoveTime = 0;

function updateCombo() {
    const currentTime = Date.now();
    if (currentTime - lastMoveTime < 3000) { // 3 ثوان
        comboCount++;
        if (comboCount >= 3) {
            const bonusPoints = comboCount * 10;
            awardPoints(bonusPoints);
            showNotification(`كومبو x${comboCount}! +${bonusPoints} نقطة إضافية!`, '🔥');
        }
    } else {
        comboCount = 1;
    }
    lastMoveTime = currentTime;
}

// تحسين makeMove لإضافة الكومبو
const originalMakeMove = makeMove;
makeMove = function(index) {
    if (!gameState.isGameActive || gameState.board[index] !== '') return;
    
    updateCombo();
    originalMakeMove(index);
};

// إضافة نظام التحديات اليومية
const dailyChallenges = [
    { id: 'win_3_games', name: 'فز في 3 مباريات', reward: { points: 100, gems: 10 }, progress: 0, target: 3 },
    { id: 'play_10_games', name: 'العب 10 مباريات', reward: { points: 150, gems: 15 }, progress: 0, target: 10 },
    { id: 'perfect_win', name: 'فز بدون خسارة نقطة', reward: { points: 200, gems: 20 }, progress: 0, target: 1 }
];

// فحص التحديات اليومية
function checkDailyChallenges() {
    const today = new Date().toDateString();
    if (playerData.lastChallengeDate !== today) {
        playerData.lastChallengeDate = today;
        playerData.dailyChallenges = [...dailyChallenges];
        savePlayerData();
    }
}

// إضافة نظام الهدايا اليومية
function checkDailyReward() {
    const today = new Date().toDateString();
    if (playerData.lastRewardDate !== today) {
        playerData.lastRewardDate = today;
        const dailyReward = {
            points: 50 + (playerData.level * 10),
            gems: 5 + Math.floor(playerData.level / 2)
        };
        
        awardPoints(dailyReward.points);
        awardGems(dailyReward.gems);
        showNotification('هدية يومية! تم إضافة مكافآت لحسابك', '🎁');
        savePlayerData();
    }
}

// تحسين initGame لإضافة التحديات والهدايا
const originalInitGame = initGame;
initGame = function() {
    originalInitGame();
    checkDailyChallenges();
    checkDailyReward();
};

// إضافة نظام الإحصائيات المتقدمة
function updateAdvancedStats(result) {
    if (!playerData.stats) {
        playerData.stats = {
            totalMoves: 0,
            averageGameTime: 0,
            winStreak: 0,
            bestWinStreak: 0,
            perfectGames: 0,
            comebackWins: 0
        };
    }
    
    playerData.stats.totalMoves++;
    
    if (result === 'X') {
        playerData.stats.winStreak++;
        if (playerData.stats.winStreak > playerData.stats.bestWinStreak) {
            playerData.stats.bestWinStreak = playerData.stats.winStreak;
        }
    } else {
        playerData.stats.winStreak = 0;
    }
    
    savePlayerData();
}

// تحسين handleGameEnd لإضافة الإحصائيات
const originalHandleGameEnd = handleGameEnd;
handleGameEnd = function(result) {
    updateAdvancedStats(result);
    originalHandleGameEnd(result);
};

// إضافة نظام التقييم والمراجعات
function showRatingDialog() {
    if (playerData.gamesPlayed >= 10 && !playerData.hasRated) {
        const rating = prompt('كيف تقيم تجربتك مع اللعبة؟ (1-5 نجوم)');
        if (rating && rating >= 1 && rating <= 5) {
            playerData.hasRated = true;
            playerData.userRating = parseInt(rating);
            awardGems(25); // مكافأة للتقييم
            showNotification('شكراً لتقييمك! +25 جوهرة', '⭐');
            savePlayerData();
        }
    }
}

// إضافة نظام المشاركة
function shareScore() {
    const shareText = `لقد وصلت للمستوى ${playerData.level} في لعبة XO الاحترافية! 🎮\nالنقاط: ${playerData.totalPoints} ⭐\nالجواهر: ${playerData.totalGems} 💎`;
    
    if (navigator.share) {
        navigator.share({
            title: 'لعبة XO الاحترافية',
            text: shareText,
            url: window.location.href
        });
    } else {
        // نسخ للحافظة
        navigator.clipboard.writeText(shareText).then(() => {
            showNotification('تم نسخ النتيجة للحافظة!', '📋');
        });
    }
}

// إضافة زر المشاركة لشاشة النتائج
function addShareButton() {
    const resultButtons = document.querySelector('.result-buttons');
    if (resultButtons && !document.getElementById('shareBtn')) {
        const shareBtn = document.createElement('button');
        shareBtn.id = 'shareBtn';
        shareBtn.className = 'result-btn secondary';
        shareBtn.innerHTML = '<span>📤</span><span>مشاركة النتيجة</span>';
        shareBtn.onclick = shareScore;
        resultButtons.appendChild(shareBtn);
    }
}

// تحسين showResult لإضافة زر المشاركة
const originalShowResult = showResult;
showResult = function(result) {
    originalShowResult(result);
    addShareButton();
    
    // إظهار حوار التقييم أحياناً
    if (Math.random() < 0.1) { // 10% احتمال
        setTimeout(showRatingDialog, 2000);
    }
};

