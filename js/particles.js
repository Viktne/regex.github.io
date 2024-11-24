// particles.js
(function() {
    // 添加样式
    const style = document.createElement('style');
    style.textContent = `
        .particle {
            position: fixed;
            pointer-events: none;
            background: #fff;
            border-radius: 50%;
            z-index: 1000;
        }
    `;
    document.head.appendChild(style);

    // 创建单个粒子
    function createParticle(x, y) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // 随机属性
        const size = Math.random() * 2 + 1;
        const speedX = (Math.random() - 0.5) * 4;
        const speedY = (Math.random() - 0.5) * 4;
        
        // 设置样式
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.background = getRandomColor();
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        
        document.body.appendChild(particle);
        
        let opacity = 1;
        let posX = x;
        let posY = y;
        let life = 1;

        // 动画
        function animate() {
            if (life <= 0) {
                particle.remove();
                return;
            }

            posX += speedX;
            posY += speedY + 0.5;
            opacity -= 0.02;
            life -= 0.02;

            particle.style.transform = `translate(${posX - x}px, ${posY - y}px)`;
            particle.style.opacity = opacity;

            requestAnimationFrame(animate);
        }

        animate();
    }

    // 获取随机颜色
    function getRandomColor() {
        const colors = ['#4285f4', '#34a853', '#fbbc05', '#ea4335'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    // 创建粒子爆发效果
    function createParticles(x, y) {
        const particleCount = 15;
        for (let i = 0; i < particleCount; i++) {
            createParticle(x, y);
        }
    }

    // 判断是否应该触发粒子效果
    function shouldCreateParticles(target) {
        // 排除这些元素和它们的子元素
        const excludedSelectors = [
            'input',
            'button',
            'a',
            'textarea',
            'select',
            '.no-particles',
            '[role="button"]',
            '.btn'
        ];
        
        // 检查元素本身或其祖先元素是否匹配排除条件
        return !excludedSelectors.some(selector => 
            target.matches(selector) || target.closest(selector)
        );
    }

    // 添加点击事件
    document.addEventListener('click', function(e) {
        if (shouldCreateParticles(e.target)) {
            createParticles(e.clientX, e.clientY);
        }
    });

    // 添加滚动事件
    document.addEventListener('scroll', function() {
        const navbar = document.querySelector('.custom-navbar');
        if (window.scrollY > 10) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
})();