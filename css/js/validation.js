const form = document.getElementById('cadastroForm');

const nome = document.getElementById('nome');
const email = document.getElementById('email');
const senha = document.getElementById('senha');
const confirmarSenha = document.getElementById('confirmarSenha');

const submitBtn = document.getElementById('submitBtn');

const strengthBar = document.getElementById('strength-bar');

nome.addEventListener('blur', () => {
  validarCampo(nome, validarNome);
});

email.addEventListener('blur', () => {
  validarCampo(email, validarEmail);
});

senha.addEventListener('input', () => {
  validarCampo(senha, validarSenha);
  atualizarForcaSenha(senha.value);
});

confirmarSenha.addEventListener('blur', () => {
  validarCampo(confirmarSenha, validarConfirmacaoSenha);
});

function validarCampo(input, funcaoValidadora) {

  const erro = document.getElementById(input.id + '-error');

  const resultado = funcaoValidadora(input.value);

  if (!resultado.valido) {

    input.classList.add('error');
    input.classList.remove('success');

    erro.textContent = resultado.mensagem;

    return false;

  } else {

    input.classList.remove('error');
    input.classList.add('success');

    erro.textContent = '';

    return true;
  }
}

function validarNome(valor) {

  if (!valor.trim()) {
    return {
      valido: false,
      mensagem: '⚠️ Nome obrigatório'
    };
  }

  if (valor.length < 3) {
    return {
      valido: false,
      mensagem: '⚠️ Mínimo 3 caracteres'
    };
  }

  return { valido: true };
}

function validarEmail(valor) {

  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!valor) {
    return {
      valido: false,
      mensagem: '⚠️ E-mail obrigatório'
    };
  }

  if (!regex.test(valor)) {
    return {
      valido: false,
      mensagem: '⚠️ E-mail inválido'
    };
  }

  return { valido: true };
}

function validarSenha(valor) {

  if (valor.length < 8) {
    return {
      valido: false,
      mensagem: '⚠️ Mínimo 8 caracteres'
    };
  }

  if (!/[A-Z]/.test(valor)) {
    return {
      valido: false,
      mensagem: '⚠️ Precisa de letra maiúscula'
    };
  }

  if (!/[0-9]/.test(valor)) {
    return {
      valido: false,
      mensagem: '⚠️ Precisa de número'
    };
  }

  return { valido: true };
}

function validarConfirmacaoSenha(valor) {

  if (valor !== senha.value) {
    return {
      valido: false,
      mensagem: '⚠️ As senhas não coincidem'
    };
  }

  return { valido: true };
}

function atualizarForcaSenha(valor) {

  let forca = 0;

  if (valor.length >= 8) forca++;
  if (/[A-Z]/.test(valor)) forca++;
  if (/[0-9]/.test(valor)) forca++;
  if (/[^A-Za-z0-9]/.test(valor)) forca++;

  if (forca === 1) {
    strengthBar.style.width = '25%';
    strengthBar.style.background = 'red';
  }

  else if (forca === 2) {
    strengthBar.style.width = '50%';
    strengthBar.style.background = 'orange';
  }

  else if (forca === 3) {
    strengthBar.style.width = '75%';
    strengthBar.style.background = 'gold';
  }

  else if (forca === 4) {
    strengthBar.style.width = '100%';
    strengthBar.style.background = 'green';
  }

  else {
    strengthBar.style.width = '0%';
  }
}

form.addEventListener('submit', (e) => {

  e.preventDefault();

  const nomeValido = validarCampo(nome, validarNome);
  const emailValido = validarCampo(email, validarEmail);
  const senhaValida = validarCampo(senha, validarSenha);
  const confirmarValido = validarCampo(confirmarSenha, validarConfirmacaoSenha);

  if (
    nomeValido &&
    emailValido &&
    senhaValida &&
    confirmarValido
  ) {

    submitBtn.disabled = true;

    submitBtn.innerHTML =
      '<span class="spinner"></span> Enviando...';

    setTimeout(() => {

      document.getElementById('success-message').textContent =
        '✅ Cadastro realizado com sucesso!';

      form.reset();

      strengthBar.style.width = '0%';

      submitBtn.disabled = false;

      submitBtn.innerHTML = 'Criar Conta';

      document.querySelectorAll('input').forEach((input) => {
        input.classList.remove('success');
      });

    }, 2000);
  }
});