export interface Env {
  PASSWORD?: string;
}

const loginHtml = "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>Solara - 身份验证</title>\n    <style>\n        :root {\n            --primary: #10b981; \n            --primary-hover: #34d399;\n            --bg-dark: #0f172a;\n        }\n        * {\n            box-sizing: border-box;\n            margin: 0;\n            padding: 0;\n            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;\n        }\n        body {\n            background-color: var(--bg-dark);\n            background-image: \n                radial-gradient(at 0% 0%, rgba(16, 185, 129, 0.2) 0px, transparent 50%),\n                radial-gradient(at 100% 100%, rgba(15, 23, 42, 1) 0px, transparent 50%),\n                radial-gradient(at 100% 0%, rgba(56, 189, 248, 0.15) 0px, transparent 50%);\n            background-size: 200% 200%;\n            animation: gradientBg 15s ease infinite;\n            display: flex;\n            align-items: center;\n            justify-content: center;\n            height: 100vh;\n            color: #fff;\n            overflow: hidden;\n        }\n        @keyframes gradientBg {\n            0% { background-position: 0% 50%; }\n            50% { background-position: 100% 50%; }\n            100% { background-position: 0% 50%; }\n        }\n        .login-container {\n            background: rgba(255, 255, 255, 0.03);\n            backdrop-filter: blur(16px);\n            -webkit-backdrop-filter: blur(16px);\n            border: 1px solid rgba(255, 255, 255, 0.05);\n            padding: 3rem 2.5rem;\n            border-radius: 24px;\n            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);\n            text-align: center;\n            width: 100%;\n            max-width: 400px;\n            transform: translateY(20px);\n            opacity: 0;\n            animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;\n        }\n        @keyframes fadeInUp {\n            to {\n                transform: translateY(0);\n                opacity: 1;\n            }\n        }\n        .logo {\n            width: 64px;\n            height: 64px;\n            margin-bottom: 1.5rem;\n            filter: drop-shadow(0 0 12px rgba(16, 185, 129, 0.4));\n        }\n        h1 {\n            font-size: 1.75rem;\n            font-weight: 600;\n            margin-bottom: 0.5rem;\n            letter-spacing: -0.5px;\n        }\n        p {\n            color: #94a3b8;\n            font-size: 0.95rem;\n            margin-bottom: 2rem;\n        }\n        .input-group {\n            position: relative;\n            margin-bottom: 1.5rem;\n        }\n        input {\n            width: 100%;\n            background: rgba(15, 23, 42, 0.4);\n            border: 1px solid rgba(255, 255, 255, 0.1);\n            padding: 1rem 1.25rem;\n            border-radius: 12px;\n            color: #fff;\n            font-size: 1rem;\n            outline: none;\n            transition: all 0.3s ease;\n        }\n        input:focus {\n            border-color: var(--primary);\n            background: rgba(15, 23, 42, 0.6);\n            box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.1);\n        }\n        button {\n            width: 100%;\n            background: linear-gradient(135deg, var(--primary), var(--primary-hover));\n            color: #fff;\n            border: none;\n            padding: 1rem;\n            border-radius: 12px;\n            font-size: 1.05rem;\n            font-weight: 600;\n            cursor: pointer;\n            transition: all 0.3s ease;\n            display: flex;\n            align-items: center;\n            justify-content: center;\n            gap: 8px;\n        }\n        button:hover {\n            transform: translateY(-2px);\n            box-shadow: 0 10px 20px -10px rgba(16, 185, 129, 0.5);\n        }\n        button:active {\n            transform: translateY(1px);\n        }\n        .loader {\n            display: none;\n            width: 20px;\n            height: 20px;\n            border: 2px solid rgba(255,255,255,0.3);\n            border-radius: 50%;\n            border-top-color: #fff;\n            animation: spin 0.8s linear infinite;\n        }\n        @keyframes spin { to { transform: rotate(360deg); } }\n        .shake {\n            animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;\n        }\n        @keyframes shake {\n            10%, 90% { transform: translate3d(-1px, 0, 0); }\n            20%, 80% { transform: translate3d(2px, 0, 0); }\n            30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }\n            40%, 60% { transform: translate3d(4px, 0, 0); }\n        }\n        .error-msg {\n            color: #ef4444;\n            font-size: 0.85rem;\n            margin-top: 0.75rem;\n            min-height: 20px;\n            opacity: 0;\n            transition: opacity 0.3s;\n        }\n    </style>\n</head>\n<body>\n    <div class=\"login-container\" id=\"loginBox\">\n        <svg class=\"logo\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M12 2L3 7L12 12L21 7L12 2Z\" stroke=\"#10b981\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n            <path d=\"M3 17L12 22L21 17\" stroke=\"#10b981\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n            <path d=\"M3 12L12 17L21 12\" stroke=\"#10b981\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n        </svg>\n        <h1>Solara 光域</h1>\n        <p>请输入密码以访问私人音乐播放器</p>\n        \n        <form id=\"loginForm\">\n            <div class=\"input-group\">\n                <input type=\"password\" id=\"password\" placeholder=\"访问密码\" required autocomplete=\"current-password\">\n                <div class=\"error-msg\" id=\"errorMsg\">密码错误，请重试</div>\n            </div>\n            <button type=\"submit\" id=\"submitBtn\">\n                <span id=\"btnText\">进入播放器</span>\n                <div class=\"loader\" id=\"loader\"></div>\n            </button>\n        </form>\n    </div>\n\n    <script>\n        document.getElementById('loginForm').addEventListener('submit', async (e) => {\n            e.preventDefault();\n            const password = document.getElementById('password').value;\n            const btnText = document.getElementById('btnText');\n            const loader = document.getElementById('loader');\n            const submitBtn = document.getElementById('submitBtn');\n            const loginBox = document.getElementById('loginBox');\n            const errorMsg = document.getElementById('errorMsg');\n\n            errorMsg.style.opacity = '0';\n            btnText.style.display = 'none';\n            loader.style.display = 'block';\n            submitBtn.disabled = true;\n\n            try {\n                const res = await fetch('/api/login', {\n                    method: 'POST',\n                    headers: { 'Content-Type': 'application/json' },\n                    body: JSON.stringify({ password })\n                });\n\n                if (res.ok) {\n                    const data = await res.json();\n                    if (data.success) {\n                        document.body.style.opacity = '0';\n                        document.body.style.transition = 'opacity 0.5s ease';\n                        setTimeout(() => {\n                            window.location.reload();\n                        }, 500);\n                        return;\n                    }\n                }\n                throw new Error('Invalid');\n            } catch (err) {\n                errorMsg.style.opacity = '1';\n                loginBox.classList.remove('shake');\n                void loginBox.offsetWidth;\n                loginBox.classList.add('shake');\n                \n                btnText.style.display = 'block';\n                loader.style.display = 'none';\n                submitBtn.disabled = false;\n                document.getElementById('password').value = '';\n                document.getElementById('password').focus();\n            }\n        });\n    </script>\n</body>\n</html>";

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
      const data = await request.json(); // FIXED: removed <any> which might be parsed as JSX
      if (data.password === env.PASSWORD) {
        // 设置 Cookie
        const headers = new Headers();
        headers.set('Set-Cookie', "solara_auth=granted; Path=/; HttpOnly; Max-Age=2592000; SameSite=Lax");
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
