# Configuração do EmailJS

## Passos para configurar o EmailJS:

### 1. Criar conta no EmailJS
- Acesse: https://www.emailjs.com/
- Crie uma conta gratuita

### 2. Configurar Serviço de Email
- No dashboard, vá em "Email Services"
- Clique em "Add New Service"
- Escolha seu provedor de email (Gmail, Outlook, etc.)
- Siga as instruções para conectar sua conta

### 3. Criar Template de Email
- Vá em "Email Templates"
- Clique em "Create New Template"
- Use este template básico:

```
Nome: {{nome}}
Email: {{email}}
Telefone: {{telefone}}
Mensagem: {{mensagem}}
```

### 4. Obter as Chaves
- **Public Key**: Vá em "Account" > "API Keys"
- **Service ID**: Vá em "Email Services" e copie o ID do serviço
- **Template ID**: Vá em "Email Templates" e copie o ID do template

### 5. Atualizar o script.js
Substitua no arquivo `script.js`:

```javascript
// Linha 3: Substitua YOUR_PUBLIC_KEY pela sua chave pública
emailjs.init("SUA_CHAVE_PUBLICA_AQUI");

// Linha 95: Substitua YOUR_SERVICE_ID e YOUR_TEMPLATE_ID
emailjs.send('SEU_SERVICE_ID', 'SEU_TEMPLATE_ID', formData)
```

### Exemplo de configuração:
```javascript
emailjs.init("user_abc123def456");
emailjs.send('service_xyz789', 'template_abc123', formData)
```

## Nota:
- A conta gratuita permite 200 emails por mês
- Para mais emails, considere um plano pago
- Teste sempre em um ambiente de desenvolvimento primeiro 