// Simplified challenges.js for standalone 4x4 matrix layout
// Removed Alpine.js dependencies and external challenge card connections

// Define the 13 challenge categories
const CHALLENGE_CATEGORIES = [
  {
    id: 'all-challenges',
    name: 'All Challenges',
    description: 'Complete overview of all available challenges',
    icon: 'fas fa-trophy',
    challenges: []
  },
  {
    id: 'web-security',
    name: 'Web Security',
    description: 'Web application vulnerabilities and exploits',
    icon: 'fas fa-globe',
    challenges: []
  },
  {
    id: 'reverse-engineering',
    name: 'Reverse Engineering',
    description: 'Malware analysis and reverse engineering',
    icon: 'fas fa-bug',
    challenges: []
  },
  {
    id: 'general-information',
    name: 'General Information',
    description: 'General cybersecurity knowledge and concepts',
    icon: 'fas fa-info-circle',
    challenges: []
  },
  {
    id: 'cryptography',
    name: 'Cryptography',
    description: 'Encryption, decryption, and cryptographic attacks',
    icon: 'fas fa-key',
    challenges: []
  },
  {
    id: 'exploitation',
    name: 'Exploitation',
    description: 'System exploitation and privilege escalation',
    icon: 'fas fa-crosshairs',
    challenges: []
  },
  {
    id: 'digital-forensics',
    name: 'Digital Forensics',
    description: 'Evidence collection and digital investigation',
    icon: 'fas fa-search',
    challenges: []
  },
  {
    id: 'network-security',
    name: 'Network Security',
    description: 'Network protocols and security analysis',
    icon: 'fas fa-network-wired',
    challenges: []
  },
  {
    id: 'osint',
    name: 'OSINT',
    description: 'Open Source Cyber Intelligence gathering',
    icon: 'fas fa-eye',
    challenges: []
  },
  {
    id: 'machines',
    name: 'Machines',
    description: 'Virtual machine challenges and CTF boxes',
    icon: 'fas fa-server',
    challenges: []
  },
  {
    id: 'secure-coding',
    name: 'Secure Coding',
    description: 'Secure programming practices and code review',
    icon: 'fas fa-code',
    challenges: []
  },
  {
    id: 'bash',
    name: 'Bash',
    description: 'Command line and shell scripting challenges',
    icon: 'fas fa-terminal',
    challenges: []
  },
  {
    id: 'mobile-security',
    name: 'Mobile Security',
    description: 'Mobile application security and analysis',
    icon: 'fas fa-mobile-alt',
    challenges: []
  }
];

// Challenge management class
class ChallengeMatrix {
  constructor() {
    this.categories = CHALLENGE_CATEGORIES;
    this.selectedCategory = null;
    this.challenges = [];
    this.init();
  }

  init() {
    document.addEventListener('DOMContentLoaded', () => {
      this.bindEvents();
      this.loadChallenges();
      this.updateProgressBar();
    });
  }

  bindEvents() {
    // Bind click events to category cards
    const categoryCards = document.querySelectorAll('.category-card:not(.empty-card)');
    
    categoryCards.forEach(card => {
      card.addEventListener('click', (e) => {
        const categoryId = card.getAttribute('data-category');
        this.selectCategory(categoryId);
      });

      // Add hover effects
      card.addEventListener('mouseenter', this.onCardHover);
      card.addEventListener('mouseleave', this.onCardLeave);
    });
  }

  onCardHover(e) {
    const card = e.currentTarget;
    card.style.transform = 'translateY(-8px) scale(1.02)';
    card.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.3)';
  }

  onCardLeave(e) {
    const card = e.currentTarget;
    card.style.transform = 'translateY(-5px) scale(1)';
    card.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.2)';
  }

  selectCategory(categoryId) {
    console.log(`Selected category: ${categoryId}`);
    this.selectedCategory = categoryId;
    
    // Add visual feedback
    this.highlightSelectedCard(categoryId);
    
    // Here you can add navigation logic
    // For example: window.location.href = `/challenges/${categoryId}`;
    // Or load challenges for this category
    this.loadCategoryDetails(categoryId);
  }

  highlightSelectedCard(categoryId) {
    // Remove previous selection
    document.querySelectorAll('.category-card').forEach(card => {
      card.classList.remove('selected');
    });

    // Add selection to current card
    const selectedCard = document.querySelector(`[data-category="${categoryId}"]`);
    if (selectedCard) {
      selectedCard.classList.add('selected');
      
      // Add temporary pulse effect
      selectedCard.style.animation = 'pulse 0.6s ease-in-out';
      setTimeout(() => {
        selectedCard.style.animation = '';
      }, 600);
    }
  }

  loadCategoryDetails(categoryId) {
    const category = this.categories.find(cat => cat.id === categoryId);
    if (category) {
      console.log(`Loading details for: ${category.name}`);
      
      // Simulate loading challenges (replace with actual API call)
      this.simulateLoadingChallenges(categoryId);
    }
  }

  simulateLoadingChallenges(categoryId) {
    // Simulate API call with random challenge data
    const challengeCounts = {
      'all-challenges': 50,
      'web-security': 12,
      'reverse-engineering': 8,
      'general-information': 6,
      'cryptography': 10,
      'exploitation': 9,
      'digital-forensics': 7,
      'network-security': 11,
      'osint': 5,
      'machines': 15,
      'secure-coding': 8,
      'bash': 6,
      'mobile-security': 4
    };

    const totalChallenges = challengeCounts[categoryId] || 0;
    const solvedChallenges = Math.floor(Math.random() * totalChallenges);

    this.updateCategoryStats(categoryId, solvedChallenges, totalChallenges);
  }

  updateCategoryStats(categoryId, solved, total) {
    const card = document.querySelector(`[data-category="${categoryId}"]`);
    if (card) {
      const badge = card.querySelector('.badge');
      if (badge) {
        badge.textContent = `${solved}/${total}`;
        
        // Update badge color based on progress
        const progress = total > 0 ? (solved / total) * 100 : 0;
        badge.className = 'badge';
        
        if (progress === 100) {
          badge.classList.add('badge-success');
        } else if (progress >= 50) {
          badge.classList.add('badge-warning');
        } else {
          badge.classList.add('badge-primary');
        }
      }
    }
  }

  loadChallenges() {
    // Simulate loading all challenges with random data
    this.categories.forEach(category => {
      if (category.id !== 'all-challenges') {
        setTimeout(() => {
          this.simulateLoadingChallenges(category.id);
        }, Math.random() * 1000);
      }
    });

    // Update "All Challenges" after other categories
    setTimeout(() => {
      this.updateAllChallengesStats();
    }, 1500);
  }

  updateAllChallengesStats() {
    let totalChallenges = 0;
    let totalSolved = 0;

    this.categories.forEach(category => {
      if (category.id !== 'all-challenges') {
        const card = document.querySelector(`[data-category="${category.id}"]`);
        if (card) {
          const badge = card.querySelector('.badge');
          if (badge && badge.textContent !== '0/0') {
            const [solved, total] = badge.textContent.split('/').map(Number);
            totalSolved += solved;
            totalChallenges += total;
          }
        }
      }
    });

    this.updateCategoryStats('all-challenges', totalSolved, totalChallenges);
    this.updateOverallProgress(totalSolved, totalChallenges);
  }

  updateProgressBar() {
    // This will be called after challenges are loaded
    setTimeout(() => {
      this.updateAllChallengesStats();
    }, 2000);
  }

  updateOverallProgress(solved, total) {
    const progressBar = document.querySelector('.progress-bar');
    const progressText = progressBar.querySelector('span');
    
    if (progressBar && progressText) {
      const percentage = total > 0 ? Math.round((solved / total) * 100) : 0;
      
      progressBar.style.width = `${percentage}%`;
      progressBar.setAttribute('aria-valuenow', percentage);
      progressText.textContent = `${solved}/${total} challenges (${percentage}%)`;

      // Update progress bar color
      progressBar.className = 'progress-bar progress-bar-striped progress-bar-animated';
      if (percentage === 100) {
        progressBar.classList.add('bg-success');
      } else if (percentage >= 70) {
        progressBar.classList.add('bg-info');
      } else if (percentage >= 30) {
        progressBar.classList.add('bg-warning');
      } else {
        progressBar.classList.add('bg-danger');
      }
    }
  }

  // Utility method to get category by ID
  getCategoryById(categoryId) {
    return this.categories.find(cat => cat.id === categoryId);
  }

  // Method to handle keyboard navigation
  handleKeyNavigation(event) {
    const cards = Array.from(document.querySelectorAll('.category-card:not(.empty-card)'));
    const currentIndex = cards.findIndex(card => card.classList.contains('selected'));
    
    let newIndex;
    switch(event.key) {
      case 'ArrowRight':
        newIndex = (currentIndex + 1) % cards.length;
        break;
      case 'ArrowLeft':
        newIndex = currentIndex > 0 ? currentIndex - 1 : cards.length - 1;
        break;
      case 'ArrowDown':
        newIndex = currentIndex + 4 < cards.length ? currentIndex + 4 : currentIndex;
        break;
      case 'ArrowUp':
        newIndex = currentIndex - 4 >= 0 ? currentIndex - 4 : currentIndex;
        break;
      case 'Enter':
        if (currentIndex >= 0) {
          cards[currentIndex].click();
        }
        return;
      default:
        return;
    }
    
    if (newIndex !== undefined && cards[newIndex]) {
      const categoryId = cards[newIndex].getAttribute('data-category');
      this.highlightSelectedCard(categoryId);
    }
  }
}

// CSS animations
const style = document.createElement('style');
style.textContent = `
  @keyframes pulse {
    0% { transform: translateY(-5px) scale(1); }
    50% { transform: translateY(-8px) scale(1.05); }
    100% { transform: translateY(-5px) scale(1); }
  }
  
  .category-card.selected {
    border: 3px solid #ffd700;
    box-shadow: 0 0 20px rgba(255, 215, 0, 0.5);
  }
  
  .badge-success {
    background-color: #28a745 !important;
  }
  
  .badge-warning {
    background-color: #ffc107 !important;
    color: #212529 !important;
  }
  
  .badge-primary {
    background-color: #007bff !important;
  }
`;
document.head.appendChild(style);

// Initialize the challenge matrix
const challengeMatrix = new ChallengeMatrix();

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
  challengeMatrix.handleKeyNavigation(e);
});

// Export for potential external use
window.ChallengeMatrix = challengeMatrix;
