# ![](https://github.com/CTFd/CTFd/blob/master/CTFd/themes/core/static/img/logo.png?raw=true)

![Astrarange MySQL CI](https://github.com/CTFd/CTFd/workflows/CTFd%20MySQL%20CI/badge.svg?branch=master)
![Linting](https://github.com/CTFd/CTFd/workflows/Linting/badge.svg?branch=master)
[![MajorLeagueCyber Discourse](https://img.shields.io/discourse/status?server=https%3A%2F%2Fcommunity.majorleaguecyber.org%2F)](https://community.majorleaguecyber.org/)
[![Documentation Status](https://api.netlify.com/api/v1/badges/6d10883a-77bb-45c1-a003-22ce1284190e/deploy-status)](https://docs.ctfd.io)

## What is Astrarange?

Astrarange by Astraea is a modern, feature-rich Capture The Flag framework designed for ease of use, security, and extensive customizability. It provides everything you need to run professional CTF competitions with advanced features for both organizers and participants.

![Astrarange is a CTF in a can.](https://github.com/CTFd/CTFd/blob/master/CTFd/themes/core/static/img/scoreboard.png?raw=true)

## 🚀 Key Features

### 🎯 Challenge Management
- **Advanced Challenge Types**: Create custom challenges with dynamic scoring, unlockable content, and plugin-based architecture
- **Flag System**: Support for static flags, regex patterns, and custom flag plugins with custom validation messages
- **File Management**: Secure file uploads with SHA1 checksums, support for local storage or Amazon S3-compatible backends
- **Challenge Requirements**: Set prerequisites and dependencies between challenges with anonymized challenge support
- **Hints System**: Unlockable hints with cost management and freeze-time compatibility
- **Attempt Limits**: Configure maximum submission attempts with automatic bruteforce protection
- **Challenge Visibility**: Hide challenges, control visibility based on prerequisites, and manage challenge states

### 👥 User & Team Management
- **Flexible Modes**: Support for both individual and team-based competitions
- **Scoreboard Brackets**: Create multiple sub-scoreboards within the main scoreboard for different participant categories
- **User Profiles**: Extended profile fields including affiliation, website, country, and custom fields
- **Team Management**: Advanced team features with captain designation, member management, and team-specific settings
- **Account Controls**: Ban, hide, and manage user accounts with comprehensive admin controls
- **Registration System**: Email verification, registration codes, and domain whitelisting

### 📊 Scoring & Analytics
- **Dynamic Scoring**: Implement time-based scoring decay and custom scoring algorithms
- **Advanced Scoreboards**: Real-time scoreboards with automatic tie resolution, bracket filtering, and medal display
- **Statistics**: Comprehensive analytics including score distributions, solve statistics, and performance metrics
- **Score Freezing**: Freeze scores at specific times while maintaining challenge functionality
- **Score Visibility**: Control score visibility for different user roles and competition phases

### 🎨 Customization & Theming
- **Plugin Architecture**: Extensive plugin system for custom challenge types, integrations, and functionality
- **Theme System**: Multiple themes including core, core-beta, and admin themes with Vite-based asset compilation
- **Template Customization**: Jinja2-based templating with theme fallback support and custom template overrides
- **CSS/JS Customization**: Modern asset pipeline with SCSS support and JavaScript module system
- **Responsive Design**: Mobile-friendly interfaces with Bootstrap-based components

### 🔔 Communication & Notifications
- **Real-time Notifications**: Server-Sent Events (SSE) based notification system with sound alerts
- **Social Sharing**: Generate social media links (Twitter, Facebook, LinkedIn) after solving challenges with customizable share pages
- **Email Integration**: SMTP and Mailgun support with customizable email templates
- **Announcements**: Admin-controlled announcements and notifications with targeting options
- **Notification Tracking**: Unread notification counting and notification history management

### 🔧 Administration & Management
- **Comprehensive Admin Panel**: Modern Vue.js-based admin interface with real-time updates
- **Configuration Management**: Extensive configuration options with environment variable support
- **Import/Export**: Full CTF data backup and restore functionality with CSV support
- **Database Management**: Support for SQLite, MySQL, MariaDB, and PostgreSQL with migration system
- **File Management**: Media library with file upload, download, and management capabilities
- **User Management**: Bulk user operations, team management, and comprehensive user controls

### 🔒 Security & Infrastructure
- **Security Features**: CSRF protection, session management, password policies, and secure file downloads
- **Health Monitoring**: Built-in healthcheck endpoint and debug capabilities
- **Safe Mode**: Emergency mode to disable plugins for troubleshooting
- **Reverse Proxy Support**: Full support for nginx and other reverse proxies
- **Docker Support**: Official Docker images with ARM64 support and docker-compose configuration
- **Database Security**: Connection pooling, prepared statements, and secure database configurations
- **HTML Sanitization**: Built-in HTML sanitization for user-generated content

### 🌐 API & Integration
- **RESTful API**: Comprehensive API v1 with Swagger documentation and filtering capabilities
- **MajorLeagueCyber Integration**: Single sign-on and event integration with MLC platform
- **OAuth Support**: OAuth 2.0 integration for external authentication systems
- **API Rate Limiting**: Built-in rate limiting and API protection

### 📱 Modern Web Features
- **Real-time Updates**: Live scoreboard updates, challenge status, and notification system
- **Mobile Optimization**: Responsive design optimized for mobile devices
- **Internationalization**: Multi-language support with translation system
- **Modern JavaScript**: ES6+ support with modern browser compatibility

## 🛠 Installation & Deployment

### Quick Start

1. **Install Dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

2. **Configure Astrarange**:
   - Modify `CTFd/config.ini` to your requirements
   - Set up database and Redis connections
   - Configure email settings

3. **Run Astrarange**:
   ```bash
   python serve.py  # Development mode
   # or
   flask run        # Production mode
   ```

### Docker Deployment

**Simple Docker Run**:
```bash
docker run -p 8000:8000 -it ctfd/ctfd
```

**Docker Compose** (Recommended):
```bash
docker compose up
```

The docker-compose setup includes:
- Astrarange application
- MariaDB database
- Redis cache
- Nginx reverse proxy
- Persistent data volumes

### Production Deployment

**Environment Variables**:
```bash
# Database Configuration
DATABASE_URL=mysql+pymysql://user:pass@host:port/database
# or individual settings:
DATABASE_PROTOCOL=mysql+pymysql
DATABASE_USER=ctfd
DATABASE_PASSWORD=secure_password
DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_NAME=ctfd

# Redis Configuration
REDIS_URL=redis://user:pass@host:port/db
# or individual settings:
REDIS_PROTOCOL=redis
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=secure_password
REDIS_DB=0

# Security
SECRET_KEY=your-secret-key-here
REVERSE_PROXY=true

# Optional Features
SAFE_MODE=false
UPDATE_CHECK=true
SWAGGER_UI=false
```

**Health Monitoring**:
- Health check endpoint: `/healthcheck`
- Debug endpoint: `/debug` (when SAFE_MODE is enabled)

## 📚 Documentation & Resources

- **Official Documentation**: [docs.ctfd.io](https://docs.ctfd.io/)
- **Getting Started Guide**: [docs.ctfd.io/tutorials/getting-started/](https://docs.ctfd.io/tutorials/getting-started/)
- **Deployment Guide**: [docs.ctfd.io/docs/deployment/installation](https://docs.ctfd.io/docs/deployment/installation)
- **Plugin Development**: [docs.ctfd.io/docs/plugins/overview](https://docs.ctfd.io/docs/plugins/overview)
- **Theme Development**: [docs.ctfd.io/docs/themes/overview](https://docs.ctfd.io/docs/themes/overview)

## 🎯 Live Demo

Experience Astrarange in action: [demo.ctfd.io](https://demo.ctfd.io/)

## 🤝 Support & Community

### Community Support
- **MajorLeagueCyber Community**: [community.majorleaguecyber.org](https://community.majorleaguecyber.org/)
- **GitHub Issues**: [github.com/CTFd/CTFd/issues](https://github.com/CTFd/CTFd/issues)
- **Discussions**: [github.com/CTFd/CTFd/discussions](https://github.com/CTFd/CTFd/discussions)

### Commercial Support
For enterprise deployments, custom development, or specialized support:
- **Contact**: [ctfd.io/contact/](https://ctfd.io/contact/)
- **Managed Hosting**: [ctfd.io](https://ctfd.io/)

## 🌟 MajorLeagueCyber Integration

Astrarange is deeply integrated with [MajorLeagueCyber](https://majorleaguecyber.org/) (MLC), a comprehensive CTF stats tracker that provides:

- **Event Scheduling**: Plan and manage CTF events
- **Team Tracking**: Track team performance across multiple events
- **Single Sign-On**: Seamless authentication integration
- **Statistics**: Comprehensive performance analytics
- **Community**: Connect with the broader CTF community

To integrate with MajorLeagueCyber:
1. Register an account at [majorleaguecyber.org](https://majorleaguecyber.org/)
2. Create an event and obtain your Client ID and Client Secret
3. Configure the OAuth settings in your Astrarange instance

## 🔄 Version Information

- **Current Version**: 3.7.7
- **Channel**: Open Source (OSS)
- **Python Support**: 3.11+
- **Database Support**: SQLite, MySQL 5.7+, MariaDB 10.11+, PostgreSQL
- **Browser Support**: Modern browsers with ES6+ support

## 📄 License

Astrarange by Astraea is released under the Apache License 2.0. See the [LICENSE](LICENSE) file for details.

## 🙏 Credits

- **Logo**: [Laura Barbera](http://www.laurabb.com/)
- **Core Theme**: [Christopher Thompson](https://github.com/breadchris)
- **Notification Sound**: [Terrence Martin](https://soundcloud.com/tj-martin-composer)
- **Community Contributors**: The amazing Astrarange community of developers, organizers, and users

---

**Astrarange by Astraea** - The most advanced Capture The Flag framework for modern CTF competitions.
