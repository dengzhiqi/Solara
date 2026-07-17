export interface Env {
  PASSWORD?: string;
}

const loginHtml = `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Solara - 身份验证</title>
    <style>
        :root {
            --primary: #10b981; 
            --primary-hover: #34d399;
            --bg-dark: #0f172a;
        }
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
        }
        body {
            background-color: var(--bg-dark);
            background-image: 
                radial-gradient(at 0% 0%, rgba(16, 185, 129, 0.2) 0px, transparent 50%),
                radial-gradient(at 100% 100%, rgba(15, 23, 42, 1) 0px, transparent 50%),
                radial-gradient(at 100% 0%, rgba(56, 189, 248, 0.15) 0px, transparent 50%);
            background-size: 200% 200%;
            animation: gradientBg 15s ease infinite;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh;
            color: #fff;
            overflow: hidden;
        }
        @keyframes gradientBg {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
        .login-container {
            background: rgba(255, 255, 255, 0.03);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            border: 1px solid rgba(255, 255, 255, 0.05);
            padding: 3rem 2.5rem;
            border-radius: 24px;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
            text-align: center;
            width: 100%;
            max-width: 400px;
            transform: translateY(20px);
            opacity: 0;
            animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes fadeInUp {
            to {
                transform: translateY(0);
                opacity: 1;
            }
        }
        .logo {
            width: 64px;
            height: 64px;
            margin-bottom: 1.5rem;
            filter: drop-shadow(0 0 12px rgba(16, 185, 129, 0.4));
        }
        h1 {
            font-size: 1.75rem;
            font-weight: 600;
            margin-bottom: 0.5rem;
            letter-spacing: -0.5px;
        }
        p {
            color: #94a3b8;
            font-size: 0.95rem;
            margin-bottom: 2rem;
        }
        .input-group {
            position: relative;
            margin-bottom: 1.5rem;
        }
        input {
            width: 100%;
            background: rgba(15, 23, 42, 0.4);
            border: 1px solid rgba(255, 255, 255, 0.1);
            padding: 1rem 1.25rem;
            border-radius: 12px;
            color: #fff;
            font-size: 1rem;
            outline: none;
            transition: all 0.3s ease;
        }
        input:focus {
            border-color: var(--primary);
            background: rgba(15, 23, 42, 0.6);
            box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.1);
        }
        button {
            width: 100%;
            background: linear-gradient(135deg, var(--primary), var(--primary-hover));
            color: #fff;
            border: none;
            padding: 1rem;
            border-radius: 12px;
            font-size: 1.05rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
        }
        button:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 20px -10px rgba(16, 185, 129, 0.5);
        }
        button:active {
            transform: translateY(1px);
        }
        /* Loader */
        .loader {
            display: none;
            width: 20px;
            height: 20px;
            border: 2px solid rgba(255,255,255,0.3);
            border-radius: 50%;
            border-top-color: #fff;
            animation: spin 0.8s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        /* Error Shake */
        .shake {
            animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
        }
        @keyframes shake {
            10%, 90% { transform: translate3d(-1px, 0, 0); }
            20%, 80% { transform: translate3d(2px, 0, 0); }
            30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
            40%, 60% { transform: translate3d(4px, 0, 0); }
        }
        .error-msg {
            color: #ef4444;
            font-size: 0.85rem;
            margin-top: 0.75rem;
            min-height: 20px;
            opacity: 0;
            transition: opacity 0.3s;
        }
    </style>
</head>
<body>
    <div class="login-container" id="loginBox">
        <svg class="logo" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L3 7L12 12L21 7L12 2Z" stroke="#10b981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M3 17L12 22L21 17" stroke="#10b981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M3 12L12 17L21 12" stroke="#10b981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <h1>Solara 光域</h1>
        <p>请输入密码以访问私人音乐播放器</p>
        
        <form id="loginForm">
            <div class="input-group">
                <input type="password" id="password" placeholder="访问密码" required autocomplete="current-password">
                <div class="error-msg" id="errorMsg">密码错误，请重试</div>
            </div>
            <button type="submit" id="submitBtn">
                <span id="btnText">进入播放器</span>
                <div class="loader" id="loader"></div>
            </button>
        </form>
    </div>

    <script>
        document.getElementById('loginForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            const password = document.getElementById('password').value;
            const btnText = document.getElementById('btnText');
            const loader = document.getElementById('loader');
            const submitBtn = document.getElementById('submitBtn');
            const loginBox = document.getElementById('loginBox');
            const errorMsg = document.getElementById('errorMsg');

            // Reset state
            errorMsg.style.opacity = '0';
            btnText.style.display = 'none';
            loader.style.display = 'block';
            submitBtn.disabled = true;

            try {
                const res = await fetch('/api/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ password })
                });

                if (res.ok) {
                    const data = await res.json();
                    if (data.success) {
                        // Success animation & redirect
                        document.body.style.opacity = '0';
                        document.body.style.transition = 'opacity 0.5s ease';
                        setTimeout(() => {
                            window.location.reload();
                        }, 500);
                        return;
                    }
                }
                
                // Error state
                throw new Error('Invalid');

            } catch (err) {
                // Show error
                errorMsg.style.opacity = '1';
                loginBox.classList.remove('shake');
                void loginBox.offsetWidth; // trigger reflow
                loginBox.classList.add('shake');
                
                // Reset button
                btnText.style.display = 'block';
                loader.style.display = 'none';
                submitBtn.disabled = false;
                document.getElementById('password').value = '';
                document.getElementById('password').focus();
            }
        });
    </script>
</body>
</html>
\`;

export const onRequest: PagesFunction<Env> = async (context) => {
  const { request, env, next } = context;
  const url = new URL(request.url);

  // 1. 如果没有配置密码，直接放行
  if (!env.PASSWORD) {
    return next();
  }

  // 2. 如果是登录请求
  if (url.pathname === '/api/login' && request.method === 'POST') {
    try {
      const data = await request.json<any>();
      if (data.password === env.PASSWORD) {
        // 设置 Cookie
        const headers = new Headers();
        headers.set('Set-Cookie', \`solara_auth=granted; Path=/; HttpOnly; Max-Age=2592000; SameSite=Lax\`);
        headers.set('Content-Type', 'application/json');
        return new Response(JSON.stringify({ success: true }), { headers });
      } else {
        return new Response(JSON.stringify({ success: false, message: 'Password incorrect' }), { status: 401 });
      }
    } catch (e) {
      return new Response(JSON.stringify({ success: false, message: 'Invalid request' }), { status: 400 });
    }
  }

  // 3. 检查 Cookie
  const cookieHeader = request.headers.get('Cookie');
  const isAuthenticated = cookieHeader && cookieHeader.includes('solara_auth=granted');

  if (isAuthenticated) {
    return next();
  }

  // 4. 未登录时的处理
  // 如果是发往 API 的请求，返回 401
  if (url.pathname.startsWith('/functions/') || request.headers.get('Accept')?.includes('application/json')) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  // 公共静态资源放行 (图片, 字体等)，以防登录页或其他地方需要
  if (url.pathname.endsWith('.ico') || url.pathname.endsWith('.png') || url.pathname.endsWith('.svg') || url.pathname.endsWith('.jpg') || url.pathname.endsWith('.gif')) {
    return next();
  }

  // 拦截其他 HTML/页面请求，返回登录页面
  return new Response(loginHtml, {
    headers: { 'Content-Type': 'text/html;charset=UTF-8' }
  });
};
